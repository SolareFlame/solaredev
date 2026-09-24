<script setup lang="ts">
import { computed } from 'vue'
import { externalLinkAttrs, isExternal } from '@/utils/links'

const props = defineProps<{ href: string }>()

const external = computed(() => isExternal(props.href))
</script>

<template>
  <!-- Stretched link: its ::after covers the closest positioned ancestor (the card). -->
  <a class="card-link" :href="href" v-bind="externalLinkAttrs(href)">
    <slot /><span v-if="external" class="visually-hidden"> (opens in a new tab)</span>
  </a>
</template>

<style scoped>
.card-link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.card-link:focus-visible {
  outline: none;
}

.card-link:focus-visible::after {
  outline: var(--border-width) solid var(--color-primary);
  outline-offset: 4px;
}
</style>
