import { Injectable } from '@nestjs/common';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

interface GraphqlResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

/** Outbound calls to GitHub's GraphQL API (plain fetch: the app itself only exposes REST). */
@Injectable()
export class GithubClient {
  /** Commit count per year, from the account's first year of contributions to today. */
  async fetchCommitsByYear(): Promise<Record<string, number>> {
    const login = requireEnv('GITHUB_USERNAME');

    const { user } = await this.query<{ user: { contributionsCollection: { contributionYears: number[] } } }>(
      `query ($login: String!) {
        user(login: $login) { contributionsCollection { contributionYears } }
      }`,
      { login },
    );

    // A contributions range spans at most one year: one aliased field per year, in one request.
    const now = new Date();
    const years = user.contributionsCollection.contributionYears;
    const fields = years.map((year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = year === now.getUTCFullYear() ? now.toISOString() : `${year}-12-31T23:59:59Z`;
      return `y${year}: contributionsCollection(from: "${from}", to: "${to}") { totalCommitContributions }`;
    });

    const { user: byYear } = await this.query<{
      user: Record<string, { totalCommitContributions: number }>;
    }>(`query ($login: String!) { user(login: $login) { ${fields.join('\n')} } }`, { login });

    return Object.fromEntries(
      years.map((year) => [String(year), byYear[`y${year}`]?.totalCommitContributions ?? 0]),
    );
  }

  private async query<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${requireEnv('GITHUB_TOKEN')}`,
        'Content-Type': 'application/json',
        'User-Agent': 'solaredev',
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

    const body = (await response.json()) as GraphqlResponse<T>;
    if (body.errors?.length || !body.data) {
      throw new Error(`GitHub API error: ${body.errors?.map((e) => e.message).join('; ') ?? 'no data'}`);
    }
    return body.data;
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}
