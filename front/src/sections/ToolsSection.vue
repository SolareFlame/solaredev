<script setup lang="ts">
import PageSection from '@/components/PageSection.vue'
import TechGroups from '@/components/TechGroups.vue'
import { sections } from '@/data/sections'
import { tools } from '@/data/tools'
</script>

<template>
  <PageSection v-bind="sections.tools">
    <TechGroups :groups="tools" id-prefix="tools" />
  </PageSection>
</template>
