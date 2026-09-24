<script setup lang="ts">
import { wavyLinePath } from '@/utils/wavyLine'

withDefaults(defineProps<{ tone?: 'black' | 'white' | 'primary' }>(), { tone: 'white' })

/*
 * Hand-drawn 2px line: a slightly wavy stroke, drawn 1:1 (not stretched) and
 * cropped to the available width, then roughened by the fine ink filter.
 */
const LENGTH = 2000
const path = wavyLinePath({ length: LENGTH, y: 3, step: 16, amplitude: 0.8, seed: 7 })
</script>

<template>
  <svg
    class="ink-line"
    :class="`ink-line--${tone}`"
    :viewBox="`0 0 ${LENGTH} 6`"
    preserveAspectRatio="xMinYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="path" />
  </svg>
</template>

<style scoped>
.ink-line {
  display: block;
  width: 100%;
  height: 6px;
  /* Only the 2px stroke counts in the flow; the rest is room for the wave. */
  margin-block: -2px;
  filter: var(--ink-fine);
}

.ink-line path {
  fill: none;
  stroke: currentColor;
  stroke-width: var(--rule-thin);
}

.ink-line--black {
  color: var(--color-black);
}

.ink-line--white {
  color: var(--color-white);
}

.ink-line--primary {
  color: var(--color-primary);
}
</style>
