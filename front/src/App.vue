<script setup lang="ts">
import { provide, useTemplateRef } from 'vue'
import InkFilter from '@/components/InkFilter.vue'
import { darkSurfaceKey } from '@/composables/useIsOverDark'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import HeroSection from '@/sections/HeroSection.vue'
import ProfileCard from '@/sections/ProfileCard.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import SiteFooter from '@/sections/SiteFooter.vue'
import StackSection from '@/sections/StackSection.vue'
import ToolsSection from '@/sections/ToolsSection.vue'

provide(darkSurfaceKey, useTemplateRef<HTMLElement>('darkSurface'))
</script>

<template>
  <InkFilter />
  <div class="page">
    <main>
      <div class="page__paper">
        <div class="shell">
          <ProfileCard />
          <HeroSection />
        </div>
      </div>
      <div ref="darkSurface" class="page__dark">
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <ToolsSection />
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page {
  overflow-x: clip;
}

/* The paper part fills at least the first screen. */
.page__paper {
  min-height: 100svh;
  padding-block: var(--space-32) var(--space-48);
  background: var(--color-white) url('@/assets/images/paper-texture.jpg') center top / cover;
}

@media (min-width: 768px) {
  .page__paper {
    padding-top: var(--space-64);
  }
}

.page__dark {
  position: relative;
  padding-top: var(--space-24);
  background-color: var(--color-black);
  color: var(--color-white);
}

/* The dark band is "printed" too: its top edge gets the same ink roughness. */
.page__dark::before {
  content: '';
  position: absolute;
  inset-inline: calc(-1 * var(--space-8));
  top: -4px;
  height: var(--space-16);
  background-color: var(--color-black);
  filter: var(--ink);
}
</style>
