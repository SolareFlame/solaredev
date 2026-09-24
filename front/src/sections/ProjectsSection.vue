<script setup lang="ts">
import PageSection from '@/components/PageSection.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'
import { sections } from '@/data/sections'
</script>

<template>
  <PageSection v-bind="sections.projects">
    <ul class="project-list">
      <li v-for="project in projects" :key="project.id">
        <ProjectCard
          :name="project.name"
          :description="project.description"
          :logo="project.logo"
          :theme="project.theme"
          :url="project.url"
        />
      </li>
    </ul>
  </PageSection>
</template>

<style scoped>
.project-list {
  display: grid;
  gap: var(--space-32);
}
</style>
