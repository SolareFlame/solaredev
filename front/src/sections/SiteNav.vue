<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import logo from '@/assets/brand/logo.svg'
import { sections } from '@/data/sections'

const links = Object.values(sections)

// The section crossing the reading line (45% down the viewport) is the current one.
const current = ref<string | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) current.value = entry.target.id
        else if (current.value === entry.target.id) current.value = null
      }
    },
    { rootMargin: '-45% 0px -55% 0px' },
  )
  for (const link of links) {
    const section = document.getElementById(link.id)
    if (section) observer.observe(section)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <header class="nav">
    <nav class="shell nav__inner" aria-label="Main">
      <a class="nav__brand" href="#top">
        <img class="nav__logo" :src="logo" alt="" width="24" height="24" />
        <span class="nav__brand-name">solare.dev</span>
        <span class="visually-hidden">(back to top)</span>
      </a>
      <ul class="nav__links">
        <li v-for="link in links" :key="link.id">
          <a
            class="nav__link"
            :href="`#${link.id}`"
            :aria-current="current === link.id ? 'location' : undefined"
          >
            {{ link.title }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  height: var(--nav-height);
  background-color: var(--color-black);
  color: var(--color-white);
  /* Room for the inked edge below, without widening the page. */
  overflow-x: clip;
}

/* Bottom edge "printed" like the top of the dark band. */
.nav::after {
  content: '';
  position: absolute;
  inset-inline: calc(-1 * var(--space-8));
  bottom: -4px;
  z-index: -1;
  height: var(--space-16);
  background-color: var(--color-black);
  filter: var(--ink);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-16);
  height: 100%;
}

/* From 768px: brand over the profile column, links over the main column. */
@media (min-width: 768px) {
  .nav__inner {
    display: grid;
  }

  .shell > .nav__brand {
    grid-column: 1;
  }
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  justify-self: start;
  font-family: var(--font-display);
  font-weight: var(--weight-extrabold);
}

.nav__logo {
  width: var(--space-24);
  height: var(--space-24);
}

.nav__brand-name {
  display: none;
}

@media (min-width: 768px) {
  .nav__brand-name {
    display: inline;
  }
}

.nav__links {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-16);
}

@media (min-width: 768px) {
  .nav__links {
    gap: var(--space-32);
  }
}

.nav__link {
  display: block;
  padding-block: var(--space-8);
  font-size: var(--text-12);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav__link:hover,
.nav__link[aria-current] {
  color: var(--color-primary);
}

@media (prefers-reduced-motion: no-preference) {
  .nav__link {
    transition: color 0.2s ease;
  }
}
</style>
