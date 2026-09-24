<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

/** "plain *accent* plain" → odd indexes are the highlighted segments. */
const segments = computed(() => props.text.split(/\*([^*]+)\*/))
</script>

<template>
  <template v-for="(segment, index) in segments" :key="index">
    <strong v-if="index % 2 === 1" class="accent">{{ segment }}</strong>
    <template v-else>{{ segment }}</template>
  </template>
</template>

<style scoped>
.accent {
  color: var(--color-primary);
  font-weight: var(--weight-semibold);
}
</style>
