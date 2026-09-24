<script setup lang="ts">
import { useId } from 'vue'

/*
 * ".DEV" of the logo, as real (selectable) SVG text in Albert Sans Black at 128px:
 * empty letters with a 2px inside stroke, a hard shadow (no blur) offset 16px to the
 * right that stays hidden behind the letters, and a square dot.
 * SVG rather than `-webkit-text-stroke`, which can't do an inside stroke nor hide
 * the shadow behind transparent letters.
 */
const WIDTH = 324
const HEIGHT = 94
const BASELINE = 92
const TEXT_X = 39 // puts the D's left edge where the mockup has it
const SHADOW_OFFSET = 16

const id = useId()
const clipId = `${id}-dev-glyphs`
const maskId = `${id}-dev-behind`
const mainId = `${id}-dev-text`
</script>

<template>
  <svg
    class="dev-wordmark"
    :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
    :width="WIDTH"
    :height="HEIGHT"
    focusable="false"
  >
    <defs>
      <!-- Stroke width 4 clipped to the glyphs = 2px inside stroke. -->
      <clipPath :id="clipId">
        <text class="dev-wordmark__text" :x="TEXT_X" :y="BASELINE">DEV</text>
      </clipPath>
      <!-- The shadow only shows outside the (transparent) letters. -->
      <mask :id="maskId" maskUnits="userSpaceOnUse" x="0" y="0" :width="WIDTH" :height="HEIGHT">
        <rect :width="WIDTH" :height="HEIGHT" fill="white" />
        <text class="dev-wordmark__text" :x="TEXT_X" :y="BASELINE" fill="black">DEV</text>
      </mask>
    </defs>

    <!-- Clone of the main text, so the shadow has exactly the same stroke. -->
    <g class="dev-wordmark__shadow" :mask="`url(#${maskId})`" aria-hidden="true">
      <use :href="`#${mainId}`" :transform="`translate(${SHADOW_OFFSET} 0)`" />
    </g>

    <rect x="0" :y="BASELINE - 16" width="16" height="16" fill="currentColor" aria-hidden="true" />
    <text
      :id="mainId"
      class="dev-wordmark__text dev-wordmark__outline dev-wordmark__main"
      :y="BASELINE"
      :clip-path="`url(#${clipId})`"
    >
      <tspan class="dev-wordmark__dot" x="-4">.</tspan><tspan :x="TEXT_X">DEV</tspan>
    </text>
  </svg>
</template>

<style scoped>
/* Only the main text is selectable/copied, not its clip, mask and shadow copies. */
.dev-wordmark {
  display: block;
  height: auto;
  overflow: visible;
  color: var(--color-black);
  user-select: none;
}

.dev-wordmark__main {
  user-select: text;
}

.dev-wordmark__text {
  font-family: var(--font-display);
  font-size: 128px;
  font-weight: var(--weight-black);
}

.dev-wordmark__outline {
  fill: none;
  stroke: currentColor;
  stroke-width: 4px;
  vector-effect: non-scaling-stroke;
  /* Selectable over the whole glyph, not only where the stroke is painted. */
  pointer-events: visible;
}

/* Only there for copy/paste: the visible dot is the square. */
.dev-wordmark__dot {
  stroke: none;
}

.dev-wordmark__shadow {
  pointer-events: none;
}
</style>
