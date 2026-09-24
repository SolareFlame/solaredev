import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { ProjectTheme } from '@/types/content'

/** Exposes a project's palette (tokens.css) to a component as local CSS variables. */
export function useProjectTheme(theme: MaybeRefOrGetter<ProjectTheme>) {
  return computed(() => {
    const name = toValue(theme)
    return {
      '--accent': `var(--project-${name})`,
      '--accent-light': `var(--project-${name}-light)`,
      '--accent-deep': `var(--project-${name}-deep)`,
      '--on-accent': `var(--project-${name}-on)`,
    }
  })
}
