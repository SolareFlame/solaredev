<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'

defineProps<{ id: string; title: string; kanji: string; intro: string }>()
</script>

<template>
  <section :id="id" class="page-section" :aria-labelledby="`${id}-title`">
    <div class="shell">
      <div class="page-section__body">
        <SectionHeading :title-id="`${id}-title`" :title="title" :kanji="kanji" :intro="intro" />
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-section {
  padding-block: var(--space-48) var(--space-64);
}

.page-section__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-48);
  container-type: inline-size;
}
</style>
