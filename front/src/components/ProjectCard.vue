<script setup lang="ts">
import { useProjectTheme } from '@/composables/useProjectTheme'
import { cssUrl } from '@/utils/css'
import type { ProjectTheme } from '@/types/content'
import CardLink from './CardLink.vue'
import AppIcon from './icons/AppIcon.vue'

const props = defineProps<{
  name: string
  description: string
  logo: string
  theme: ProjectTheme
  url?: string
}>()

const themeVars = useProjectTheme(() => props.theme)
</script>

<template>
  <article class="project" :style="themeVars">
    <span class="project__tile" aria-hidden="true">
      <span class="project__logo" :style="{ '--logo': cssUrl(logo) }" />
    </span>
    <div class="project__body">
      <h3 class="project__name">
        <CardLink v-if="url" :href="url">{{ name }}</CardLink>
        <template v-else>{{ name }}</template>
      </h3>
      <p class="project__description">{{ description }}</p>
    </div>
    <AppIcon v-if="url" name="arrow-up-right" class="project__arrow" />
  </article>
</template>

<style scoped>
.project {
  --_state: var(--color-line);
  --_logo: var(--color-white);

  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-32);
  min-height: 8rem;
  padding: calc(var(--space-16) - var(--border-width)) var(--space-48)
    calc(var(--space-16) - var(--border-width)) calc(var(--space-16) - var(--border-width));
  border: var(--border-width) solid var(--color-line);
  color: var(--color-white);
}

.project:hover,
.project:focus-within {
  --_state: var(--accent);
  --_logo: var(--on-accent);
}

/* Accent border in the project's own color, inked. */
.project::before {
  content: '';
  position: absolute;
  inset: calc(-1 * var(--border-width));
  border: var(--border-width) solid var(--accent);
  opacity: 0;
  filter: var(--ink-fine);
  pointer-events: none;
}

.project:hover::before,
.project:focus-within::before {
  opacity: 1;
}

.project__tile {
  position: relative;
  isolation: isolate;
  display: grid;
  flex: none;
  place-items: center;
  width: 6rem;
  height: 6rem;
}

.project__tile::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: var(--_state);
  filter: var(--ink);
}

.project__logo {
  width: 4rem;
  height: 4rem;
  background-color: var(--_logo);
  -webkit-mask: var(--logo) center / contain no-repeat;
  mask: var(--logo) center / contain no-repeat;
}

.project__name {
  font-family: var(--font-display);
  font-size: var(--text-24);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-none);
  text-wrap: balance;
}

.project__description {
  margin-top: var(--space-8);
  font-size: var(--text-12);
}

.project__arrow {
  position: absolute;
  top: calc(var(--space-8) - var(--border-width));
  right: calc(var(--space-8) - var(--border-width));
  color: var(--_state);
}

@container (max-width: 25rem) {
  .project {
    gap: var(--space-16);
  }

  .project__tile {
    width: 4rem;
    height: 4rem;
  }

  .project__logo {
    width: 3rem;
    height: 3rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .project::before,
  .project__tile::before,
  .project__logo,
  .project__arrow {
    transition-duration: 0.2s;
    transition-property: opacity, color, background-color;
  }
}
</style>
