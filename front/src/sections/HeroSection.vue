<script setup lang="ts">
import logo from '@/assets/brand/logo.svg'
import DevWordmark from '@/components/DevWordmark.vue'
import FeaturedProjectCard from '@/components/FeaturedProjectCard.vue'
import InkRule from '@/components/InkRule.vue'
import KanjiLabel from '@/components/kanji/KanjiLabel.vue'
import { profile } from '@/data/profile'
import { featuredProjects } from '@/data/projects'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__masthead">
      <h1 id="hero-title" class="hero__title">
        <span class="hero__solare ink">SOLARE</span>
        <span class="hero__domain">
          <DevWordmark class="hero__dev" />
          <img class="hero__logo" :src="logo" alt="" width="100" height="100" />
          <KanjiLabel text="ソラル" class="hero__kana" />
        </span>
      </h1>
      <InkRule orientation="vertical" />
    </div>

    <p class="hero__bio">{{ profile.bio }}</p>

    <dl class="hero__stats">
      <div v-for="stat in profile.stats" :key="stat.label" class="hero__stat">
        <dt class="hero__stat-label">{{ stat.label }}</dt>
        <dd class="hero__stat-value">{{ stat.value }}</dd>
      </div>
    </dl>

    <ul class="hero__featured" aria-label="Featured projects">
      <li v-for="project in featuredProjects" :key="project.id" class="hero__featured-item">
        <InkRule />
        <FeaturedProjectCard
          :title="project.featured.title"
          :logo="project.logo"
          :theme="project.theme"
          :url="project.url"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.hero {
  container-type: inline-size;
}

/* ------------------------------------------------------------------ Masthead */

.hero__masthead {
  display: flex;
  justify-content: space-between;
  gap: var(--space-16);
  /* The vertical bar sits in the bleed, right of the column (desktop). */
  margin-inline-end: calc(-1 * var(--bleed));
}

/*
 * 128px on desktop, otherwise scaled down with the column.
 * Everything inside is sized in em, from the Figma values at 128px.
 */
.hero__title {
  font-family: var(--font-display);
  font-size: min(var(--text-128), (100cqi - var(--space-32)) / 4.1);
  font-weight: var(--weight-black);
  line-height: var(--leading-none);
}

@media (min-width: 768px) {
  .hero__title {
    font-size: min(var(--text-128), 100cqi / 4.1);
  }
}

.hero__solare {
  display: block;
  color: var(--color-primary);
}

.hero__domain {
  display: flex;
  align-items: center;
  height: 1em;
}

.hero__dev {
  flex: none;
  width: calc(324em / 128);
}

.hero__logo {
  flex: none;
  width: calc(100em / 128);
  height: auto;
  margin-inline: calc(46em / 128) calc(14em / 128);
}

.hero__kana {
  flex: none;
  color: var(--color-primary);
  font-size: 0.25em;
}

/* ----------------------------------------------------------------------- Bio */

.hero__bio {
  margin-top: var(--space-32);
}

/* --------------------------------------------------------------------- Stats */

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: var(--space-8);
  margin-top: var(--space-32);
}

.hero__stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.hero__stat-value {
  font-family: var(--font-display);
  font-size: min(var(--text-64), 17cqi);
  font-weight: var(--weight-black);
  line-height: var(--leading-none);
}

.hero__stat-label {
  text-transform: uppercase;
  white-space: pre-line;
}

@container (max-width: 25rem) {
  .hero__stat-label {
    font-size: var(--text-12);
  }
}

/* ---------------------------------------------------------- Featured projects */

.hero__featured {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-32) var(--space-24);
  margin-top: var(--space-16);
}

.hero__featured-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

@container (max-width: 30rem) {
  .hero__featured {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
