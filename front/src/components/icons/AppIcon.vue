<script setup lang="ts">
import { computed } from 'vue'
import { icons, type IconName } from './icons'

const props = withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 24 })

const icon = computed(() => icons[props.name])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    :fill="icon.stroke ? 'none' : 'currentColor'"
    :stroke="icon.stroke ? 'currentColor' : undefined"
    :stroke-width="icon.stroke ? 2 : undefined"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      v-for="d in icon.paths"
      :key="d"
      :d="d"
      :fill-rule="icon.evenOdd ? 'evenodd' : undefined"
      :clip-rule="icon.evenOdd ? 'evenodd' : undefined"
    />
  </svg>
</template>
