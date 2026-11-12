<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ active: boolean }>()
const emit = defineEmits<{ toggle: [] }>()

// Twinkling stars around the label: position (% of the button), size (rem), delay (s).
const stars = [
  { x: -14, y: 8, size: 0.45, delay: 0 },
  { x: 104, y: -6, size: 0.55, delay: 0.7 },
  { x: 34, y: -18, size: 0.35, delay: 1.3 },
  { x: 82, y: 96, size: 0.4, delay: 0.35 },
  { x: -4, y: 88, size: 0.3, delay: 1.7 },
  { x: 62, y: -14, size: 0.3, delay: 1 },
]

// Burst on click: short-lived particles flying out from the center.
interface Particle {
  id: number
  dx: number
  dy: number
  size: number
  color: string
}
const colors = ['var(--_pink)', 'var(--_violet)', 'var(--_glow)']
const particles = ref<Particle[]>([])
let nextId = 0

function burst() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const born = Array.from({ length: 10 }, (_, i): Particle => {
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5
    const distance = 1.25 + Math.random() * 1.25 // rem
    return {
      id: nextId++,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: 0.25 + Math.random() * 0.25,
      color: colors[i % colors.length]!,
    }
  })
  particles.value.push(...born)
  const ids = new Set(born.map((p) => p.id))
  setTimeout(() => (particles.value = particles.value.filter((p) => !ids.has(p.id))), 700)
}

function onClick() {
  burst()
  emit('toggle')
}
</script>

<template>
  <button class="more" type="button" :aria-pressed="active" @click="onClick">
    <span class="more__label">More</span>
    <span
      v-for="(star, i) in stars"
      :key="i"
      class="more__star"
      :style="{
        left: `${star.x}%`,
        top: `${star.y}%`,
        '--_size': `${star.size}rem`,
        animationDelay: `${star.delay}s`,
      }"
      aria-hidden="true"
    />
    <span
      v-for="p in particles"
      :key="p.id"
      class="more__particle"
      :style="{
        '--_dx': `${p.dx}rem`,
        '--_dy': `${p.dy}rem`,
        '--_size': `${p.size}rem`,
        background: p.color,
      }"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.more {
  --_pink: #ff6ad5;
  --_violet: #a66bff;
  --_glow: #ffe1f7;

  position: relative;
  display: block;
  padding: var(--space-8) 0;
  border: 0;
  background: none;
  color: var(--_pink);
  font: inherit;
  font-size: var(--text-12);
  font-weight: var(--weight-semibold);
  letter-spacing: inherit; /* from the nav list */
  text-transform: uppercase;
  cursor: pointer;
}

.more__label {
  background: linear-gradient(90deg, var(--_pink), var(--_violet), var(--_glow), var(--_pink)) 0 0 /
    300% 100%;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 0.375rem color-mix(in srgb, var(--_violet) 60%, transparent));
}

/* Four-point star. */
.more__star,
.more__particle {
  position: absolute;
  width: var(--_size);
  height: var(--_size);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  pointer-events: none;
}

.more__star {
  background: linear-gradient(135deg, var(--_glow), var(--_pink) 60%, var(--_violet));
  translate: -50% -50%;
  scale: 0.6;
}

.more__particle {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.more:hover .more__label,
.more[aria-pressed='true'] .more__label {
  filter: drop-shadow(0 0 0.5rem var(--_pink));
}

@media (prefers-reduced-motion: no-preference) {
  .more__label {
    animation: more-shimmer 3s linear infinite;
  }

  .more__star {
    scale: 0;
    animation: more-twinkle 2.2s ease-in-out infinite;
  }

  .more:hover .more__star {
    animation-duration: 1.1s;
  }

  .more__particle {
    animation: more-burst 0.7s ease-out forwards;
  }
}

@keyframes more-shimmer {
  to {
    background-position: 300% 0;
  }
}

@keyframes more-twinkle {
  0%,
  100% {
    scale: 0;
    rotate: 0deg;
  }

  50% {
    scale: 1;
    rotate: 90deg;
  }
}

@keyframes more-burst {
  from {
    scale: 1;
    opacity: 1;
  }

  to {
    translate: calc(-50% + var(--_dx)) calc(-50% + var(--_dy));
    scale: 0.2;
    rotate: 180deg;
    opacity: 0;
  }
}
</style>
