<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { introStarted, prefersReducedMotion } from '@/intro'

/**
 * Shows `value`, counting up to it from 0 when it is a number. Waits for the opening
 * sequence, then `delay` ms; a value that arrives later (live stats) counts up on arrival.
 * Non-numeric values (placeholders) are shown as is.
 */
const props = withDefaults(defineProps<{ value: string; delay?: number; duration?: number }>(), {
  delay: 0,
  duration: 1400,
})

const shown = ref(props.value)
let frame = 0
let introDone = false

const parse = (value: string) => {
  const n = Number(value.replace(/[,\s]/g, ''))
  return value.trim() !== '' && Number.isFinite(n) ? n : null
}

function count(value: string, delay: number) {
  cancelAnimationFrame(frame)
  const target = parse(value)
  if (target === null || prefersReducedMotion()) {
    shown.value = value
    return
  }
  const format = (n: number) => Math.round(n).toLocaleString('en-US')
  shown.value = format(0)
  const start = performance.now() + delay
  const tick = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / props.duration))
    // Fast start, long settle — like a counter spinning down.
    shown.value = format(target * (1 - (1 - t) ** 4))
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

// Hidden behind the loader until the intro starts: just hold the value.
void introStarted.then(() => {
  introDone = true
  count(props.value, props.delay)
})

watch(
  () => props.value,
  (value) => {
    if (introDone) count(value, 0)
    else shown.value = value
  },
)

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <span>{{ shown }}</span>
</template>
