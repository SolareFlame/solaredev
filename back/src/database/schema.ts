import { integer, jsonb, pgTable, timestamp } from 'drizzle-orm/pg-core';

/** Last known GitHub commit stats: a single row (id 1), overwritten on every refresh. */
export const githubStats = pgTable('github_stats', {
  id: integer('id').primaryKey(),
  totalCommits: integer('total_commits').notNull(),
  /** Commit count per year, keyed by year ("2024": 312). */
  commitsByYear: jsonb('commits_by_year').$type<Record<string, number>>().notNull(),
  fetchedAt: timestamp('fetched_at', { withTimezone: true }).notNull(),
});
