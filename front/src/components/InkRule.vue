<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    tone?: 'black' | 'white' | 'primary'
  }>(),
  { orientation: 'horizontal', tone: 'black' },
)
</script>

<template>
  <span class="ink-rule" :class="[`ink-rule--${orientation}`, `ink-rule--${tone}`]" aria-hidden="true" />
</template>

<style scoped>
/*
 * Thick hand-inked bar (16px): a flat bar roughened by the ink filter, like in the mockup.
 * The transparent padding (cancelled by the negative margin) gives the filter
 * room to push the edges outwards instead of clipping them.
 */
.ink-rule {
  --_pad: 2px;

  display: block;
  flex: none;
  margin: calc(-1 * var(--_pad));
  padding: var(--_pad);
  background: var(--_color) content-box;
  filter: var(--ink);
}

.ink-rule--horizontal {
  block-size: calc(var(--rule-thick) + 2 * var(--_pad));
}

.ink-rule--vertical {
  inline-size: calc(var(--rule-thick) + 2 * var(--_pad));
  align-self: stretch;
}

.ink-rule--black {
  --_color: var(--color-black);
}

.ink-rule--white {
  --_color: var(--color-white);
}

.ink-rule--primary {
  --_color: var(--color-primary);
}
</style>
