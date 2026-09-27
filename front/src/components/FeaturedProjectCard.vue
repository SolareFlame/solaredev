<script setup lang="ts">
import { useProjectTheme } from '@/composables/useProjectTheme'
import { cssUrl } from '@/utils/css'
import type { ProjectTheme } from '@/types/content'
import CardLink from './CardLink.vue'
import AppIcon from './icons/AppIcon.vue'

const props = defineProps<{ title: string; logo: string; theme: ProjectTheme; url?: string }>()

const themeVars = useProjectTheme(() => props.theme)
</script>

<template>
  <article class="featured" :style="themeVars">
    <span class="featured__logo" :style="{ '--logo': cssUrl(logo) }" aria-hidden="true" />
    <p class="featured__title">
      <CardLink v-if="url" :href="url">{{ title }}</CardLink>
      <template v-else>{{ title }}</template>
    </p>
    <AppIcon v-if="url" name="arrow-right" class="featured__arrow" />
  </article>
</template>

<style scoped>
.featured {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: 12rem;
  padding: var(--space-16);
  color: var(--on-accent);
}

/* Inked background, kept on a separate layer so the content stays crisp. */
.featured::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: var(--accent);
  filter: var(--ink);
}

.featured__logo {
  position: absolute;
  top: var(--space-16);
  left: var(--space-16);
  width: var(--space-32);
  height: var(--space-32);
  background-color: currentColor;
  -webkit-mask: var(--logo) center / contain no-repeat;
  mask: var(--logo) center / contain no-repeat;
}

.featured__title {
  font-family: var(--font-display);
  font-size: var(--text-32);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-none);
}

.featured__arrow {
  position: absolute;
  right: var(--space-16);
  bottom: var(--space-16);
}

.featured:hover .featured__arrow,
.featured:focus-within .featured__arrow {
  translate: var(--space-8) 0;
}

@media (prefers-reduced-motion: no-preference) {
  .featured__arrow {
    transition: translate 0.2s ease;
  }
}
</style>
