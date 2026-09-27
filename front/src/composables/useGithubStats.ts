import { onMounted, shallowRef } from 'vue'

/** Response of `GET /api/stats` (back/src/stats). */
export interface GithubStats {
  totalCommits: number
  commitsThisYear: number
  fetchedAt: string
}

/**
 * Last known GitHub stats. Stays `null` while loading or if the API is unreachable:
 * callers keep their placeholder, the page never breaks over it.
 */
export function useGithubStats() {
  const stats = shallowRef<GithubStats | null>(null)

  onMounted(async () => {
    try {
      const response = await fetch('/api/stats')
      if (response.ok) stats.value = (await response.json()) as GithubStats
    } catch {
      // Network error: keep the placeholder.
    }
  })

  return stats
}
