<script setup lang="ts">
/**
 * Decorative Japanese label stacked vertically, one character per line
 * (32px on a 36px line in the mockup, i.e. line-height 1.125 of the current font-size).
 */
defineProps<{ text: string }>()
</script>

<template>
  <span class="kanji" lang="ja" aria-hidden="true">{{ text }}</span>
</template>

<style scoped>
.kanji {
  display: block;
  width: 1em;
  font-family: var(--font-kanji);
  font-weight: var(--weight-black);
  line-height: 1.125;
  text-align: center;
  overflow-wrap: anywhere;
  filter: var(--ink-fine);
}
</style>
