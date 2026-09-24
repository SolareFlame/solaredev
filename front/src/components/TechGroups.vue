<script setup lang="ts">
import type { ToolGroup } from '@/types/content'
import TechGrid from './TechGrid.vue'

/** Tech cards split into labelled sub-categories (Stack, Tools). */
defineProps<{ groups: ToolGroup[]; idPrefix: string }>()
</script>

<template>
  <div class="tech-groups">
    <section
      v-for="group in groups"
      :key="group.id"
      :aria-labelledby="`${idPrefix}-${group.id}`"
    >
      <h3 :id="`${idPrefix}-${group.id}`" class="tech-groups__label">{{ group.label }}</h3>
      <TechGrid :items="group.items" :heading-level="4" />
    </section>
  </div>
</template>

<style scoped>
.tech-groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-48);
}

.tech-groups__label {
  margin-bottom: var(--space-24);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: var(--text-24);
  font-weight: var(--weight-extrabold);
  line-height: var(--leading-none);
  text-transform: uppercase;
}
</style>
