<script setup lang="ts">
import PageSection from '@/components/PageSection.vue'
import TechGroups from '@/components/TechGroups.vue'
import { sections } from '@/data/sections'
import { stack } from '@/data/stack'
</script>

<template>
  <PageSection v-bind="sections.stack">
    <TechGroups :groups="stack" id-prefix="stack" />
  </PageSection>
</template>
