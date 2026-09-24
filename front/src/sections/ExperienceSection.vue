<script setup lang="ts">
import ExperienceItem from '@/components/ExperienceItem.vue'
import PageSection from '@/components/PageSection.vue'
import { experience } from '@/data/experience'
import { sections } from '@/data/sections'
</script>

<template>
  <PageSection v-bind="sections.experience">
    <ul class="experience-list">
      <li v-for="item in experience" :key="item.id">
        <ExperienceItem
          :title="item.title"
          :period="item.period"
          :description="item.description"
          :highlights="item.highlights"
          :stack="item.stack"
          :url="item.url"
        />
      </li>
    </ul>
  </PageSection>
</template>

<style scoped>
.experience-list {
  display: grid;
  gap: var(--space-24);
}
</style>
