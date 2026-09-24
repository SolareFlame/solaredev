<script setup lang="ts">
import CardLink from './CardLink.vue'
import AppIcon from './icons/AppIcon.vue'

defineProps<{ title: string; period: string; description: string; url?: string }>()
</script>

<template>
  <article class="experience">
    <div class="experience__head">
      <h3 class="experience__title">
        <CardLink v-if="url" :href="url">{{ title }}</CardLink>
        <template v-else>{{ title }}</template>
      </h3>
      <p class="experience__period">({{ period }})</p>
    </div>
    <p class="experience__description">{{ description }}</p>
    <AppIcon v-if="url" name="arrow-up-right" class="experience__arrow" />
  </article>
</template>

<style scoped>
.experience {
  position: relative;
  min-height: 8rem;
  padding: calc(var(--space-16) - var(--border-width)) var(--space-48)
    calc(var(--space-16) - var(--border-width)) calc(var(--space-16) - var(--border-width));
  border: var(--border-width) solid var(--color-line);
  color: var(--color-white);
}

/* Accent border (hover / focus), inked like every vermillon surface. */
.experience::before {
  content: '';
  position: absolute;
  inset: calc(-1 * var(--border-width));
  border: var(--border-width) solid var(--color-primary);
  opacity: 0;
  filter: var(--ink-fine);
  pointer-events: none;
}

.experience:hover::before,
.experience:focus-within::before {
  opacity: 1;
}

.experience__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  column-gap: var(--space-16);
}

.experience__title {
  font-family: var(--font-display);
  font-size: var(--text-24);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-none);
  text-wrap: balance;
}

.experience__period {
  font-size: var(--text-12);
  white-space: nowrap;
}

.experience__description {
  margin-top: var(--space-8);
  font-size: var(--text-12);
}

.experience__arrow {
  position: absolute;
  top: calc(var(--space-8) - var(--border-width));
  right: calc(var(--space-8) - var(--border-width));
  color: var(--color-line);
}

.experience:hover .experience__arrow,
.experience:focus-within .experience__arrow {
  color: var(--color-primary);
}

@media (prefers-reduced-motion: no-preference) {
  .experience::before,
  .experience__arrow {
    transition-duration: 0.2s;
    transition-property: opacity, color;
  }
}
</style>
