import { Inject, Injectable, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE, type Database } from '../database/database.module.js';
import { githubStats } from '../database/schema.js';
import { GithubClient } from './github.client.js';

export interface CommitStats {
  totalCommits: number;
  commitsThisYear: number;
  fetchedAt: string;
}

type StoredStats = typeof githubStats.$inferSelect;

const ROW_ID = 1;

/**
 * Stale-while-revalidate over Postgres: the last known stats are always served right away,
 * and refreshed from GitHub in the background once older than STATS_TTL_HOURS.
 */
@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);
  private readonly ttlMs = Number(process.env.STATS_TTL_HOURS ?? 6) * 3_600_000;

  /** Refresh in flight, shared so concurrent requests trigger a single GitHub call. */
  private refreshing?: Promise<StoredStats>;

  constructor(
    @Inject(DATABASE) private readonly db: Database,
    private readonly github: GithubClient,
  ) {}

  async getCommitStats(): Promise<CommitStats> {
    const [stored] = await this.db.select().from(githubStats).where(eq(githubStats.id, ROW_ID));

    // First run only: nothing to serve yet, so this request waits for GitHub.
    if (!stored) return toCommitStats(await this.refresh());

    if (Date.now() - stored.fetchedAt.getTime() > this.ttlMs) {
      // GitHub down: the old value keeps being served, the next request retries.
      this.refresh().catch((error: unknown) =>
        this.logger.warn(`Background refresh failed, serving stale stats: ${String(error)}`),
      );
    }
    return toCommitStats(stored);
  }

  private refresh(): Promise<StoredStats> {
    this.refreshing ??= this.fetchAndStore().finally(() => {
      this.refreshing = undefined;
    });
    return this.refreshing;
  }

  private async fetchAndStore(): Promise<StoredStats> {
    const commitsByYear = await this.github.fetchCommitsByYear();
    const row: StoredStats = {
      id: ROW_ID,
      totalCommits: Object.values(commitsByYear).reduce((sum, count) => sum + count, 0),
      commitsByYear,
      fetchedAt: new Date(),
    };

    await this.db
      .insert(githubStats)
      .values(row)
      .onConflictDoUpdate({ target: githubStats.id, set: row });

    this.logger.log(`GitHub stats refreshed: ${row.totalCommits} commits`);
    return row;
  }
}

function toCommitStats(stats: StoredStats): CommitStats {
  return {
    totalCommits: stats.totalCommits,
    commitsThisYear: stats.commitsByYear[String(new Date().getUTCFullYear())] ?? 0,
    fetchedAt: stats.fetchedAt.toISOString(),
  };
}
