<script setup lang="ts">
/*
 * Global SVG filters reproducing Figma's "Texture" effect (size 10 × 10, radius 1):
 * edges wobble slightly, so flat colors look stamped in ink rather than perfectly printed.
 *
 * Same noise as the Figma export (fractal noise, base frequency 0.1, 3 octaves), but the
 * edge is moved by perturbing an alpha threshold instead of `feDisplacementMap`: browsers
 * sample the displacement per whole pixel, which renders the exported values (scale 2)
 * as scattered jaggies instead of Figma's smooth wobble.
 *
 * Used through `filter: var(--ink)` / `var(--ink-fine)` (tokens.css) or the `.ink` class.
 * Setting both tokens to `none` falls back to flat rendering everywhere.
 * Mounted once; never `display: none` it or the references stop resolving.
 *
 * Strength = how far the edge moves: grows with `softness` (width of the alpha ramp)
 * and `amount` (weight of the noise). `amount` above 1 starts punching holes in shapes.
 */
const filters = [
  // Shapes and display text.
  { id: 'ink', softness: 1.1, amount: 1 },
  // 2px lines and small kanji strokes, which would break up or clog at full strength.
  { id: 'ink-fine', softness: 0.8, amount: 0.5 },
] as const
</script>

<template>
  <svg class="ink-filter" aria-hidden="true" focusable="false">
    <filter v-for="filter in filters" :id="filter.id" :key="filter.id" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" seed="5356" result="noise" />
      <!-- Soft alpha ramp across the edge, shifted by the noise, then sharpened back. -->
      <feGaussianBlur in="SourceAlpha" :stdDeviation="filter.softness" result="ramp" />
      <feComposite
        in="ramp"
        in2="noise"
        operator="arithmetic"
        k2="1"
        :k3="filter.amount"
        :k4="-filter.amount / 2"
        result="rough"
      />
      <feComponentTransfer in="rough" result="mask">
        <feFuncA type="linear" slope="5" intercept="-2" />
      </feComponentTransfer>
      <!-- Paint with the source color, spread a little so outward bumps are filled too. -->
      <feMorphology in="SourceGraphic" operator="dilate" radius="3" result="paint" />
      <feComposite in="paint" in2="mask" operator="in" />
    </filter>
  </svg>
</template>

<style scoped>
.ink-filter {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
