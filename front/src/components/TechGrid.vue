<script setup lang="ts">
import type { Tool } from '@/types/content'
import ToolCard from './ToolCard.vue'

withDefaults(defineProps<{ items: Tool[]; headingLevel?: 3 | 4 }>(), { headingLevel: 3 })
</script>

<template>
  <ul class="tech-grid">
    <li v-for="item in items" :key="item.id">
      <ToolCard
        :name="item.name"
        :description="item.description"
        :icon="item.icon"
        :href="item.href"
        :heading-level="headingLevel"
      />
    </li>
  </ul>
</template>

<style scoped>
.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-32);
}

/* Cards of a row share the same height, even when a name wraps. */
.tech-grid > li {
  display: grid;
  min-width: 0;
}

@container (max-width: 35rem) {
  .tech-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
