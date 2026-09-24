<script setup lang="ts">
import AccentText from './AccentText.vue'
import InkLine from './InkLine.vue'
import KanjiLabel from './kanji/KanjiLabel.vue'

defineProps<{ titleId: string; title: string; kanji: string; intro: string }>()
</script>

<template>
  <header class="section-heading">
    <InkLine />
    <div class="section-heading__row">
      <h2 :id="titleId" class="section-heading__title ink">{{ title }}</h2>
      <KanjiLabel :text="kanji" class="section-heading__kanji" />
    </div>
    <p class="section-heading__intro"><AccentText :text="intro" /></p>
  </header>
</template>

<style scoped>
/* The row is as tall as the title: the kanji column is centred on it and may overflow. */
.section-heading__row {
  position: relative;
  margin-top: calc(var(--space-48) + var(--space-8));
  padding-inline-end: var(--space-48);
}

.section-heading__title {
  color: var(--color-primary);
  font-family: var(--font-display);
  /* 64px, shrinking with the column so the longest title (EXPERIENCE) always fits. */
  font-size: min(var(--text-64), (100cqi - var(--space-48)) / 6.5);
  font-weight: var(--weight-black);
  line-height: var(--leading-none);
  text-transform: uppercase;
}

.section-heading__kanji {
  position: absolute;
  top: 50%;
  right: 0;
  translate: 0 -50%;
  color: var(--color-primary);
  font-size: var(--text-32);
}

.section-heading__intro {
  margin-top: var(--space-32);
}
</style>
