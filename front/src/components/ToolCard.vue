<script setup lang="ts">
import { externalLinkAttrs } from '@/utils/links'

withDefaults(
  defineProps<{
    name: string
    description: string
    icon: string
    href?: string
    headingLevel?: 3 | 4
  }>(),
  { headingLevel: 3 },
)
</script>

<template>
  <!-- Linked cards (tools) get the hover state; plain ones (stack) stay static. -->
  <component
    :is="href ? 'a' : 'article'"
    class="tool"
    :class="{ 'tool--link': href }"
    :href="href"
    v-bind="href ? externalLinkAttrs(href) : {}"
  >
    <span class="tool__tile">
      <img class="tool__icon" :src="icon" alt="" width="48" height="48" loading="lazy" />
    </span>
    <div>
      <component :is="`h${headingLevel}`" class="tool__name">{{ name }}</component>
      <p class="tool__description">{{ description }}</p>
    </div>
  </component>
</template>

<style scoped>
.tool {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-24);
  min-height: 6rem;
  padding: calc(var(--space-16) - var(--border-width));
  border: var(--border-width) solid var(--color-line);
  color: var(--color-white);
  text-decoration: none;
}

/* Hover: inked vermillon border + a marker bar next to the card. */
.tool::before,
.tool::after {
  content: '';
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.tool::before {
  inset: calc(-1 * var(--border-width));
  border: var(--border-width) solid var(--color-primary);
  filter: var(--ink-fine);
}

.tool::after {
  --_pad: 2px; /* room for the ink filter, see InkRule */

  top: calc(-1 * var(--border-width));
  bottom: calc(-1 * var(--border-width));
  left: calc(100% + var(--border-width) + var(--space-8) - var(--_pad));
  width: calc(var(--space-8) + 2 * var(--_pad));
  padding-inline: var(--_pad);
  background: var(--color-primary) content-box;
  filter: var(--ink);
}

.tool--link:hover::before,
.tool--link:hover::after,
.tool--link:focus-visible::before,
.tool--link:focus-visible::after {
  opacity: 1;
}

.tool__tile {
  display: grid;
  flex: none;
  place-items: center;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-white);
}

.tool__icon {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.tool__name {
  font-family: var(--font-display);
  font-size: var(--text-24);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-none);
  letter-spacing: -0.01em; /* keeps the longest names (KUBERNETES) on one line */
  text-transform: uppercase;
}

.tool__description {
  margin-top: var(--space-8);
  font-size: var(--text-12);
}

@media (prefers-reduced-motion: no-preference) {
  .tool::before,
  .tool::after {
    transition: opacity 0.2s ease;
  }
}
</style>
