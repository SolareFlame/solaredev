<script setup lang="ts">
import { profile } from '@/data/profile'
import { externalLinkAttrs } from '@/utils/links'

const COOLICONS_URL = 'https://github.com/krystonschwarze/coolicons'
const CC_BY_URL = 'https://creativecommons.org/licenses/by/4.0/'
</script>

<template>
  <footer class="footer">
    <p>
      Made by <span class="footer__handle">{{ profile.handle }}</span>
    </p>
    <p class="footer__credits">
      Icons:
      <a :href="COOLICONS_URL" v-bind="externalLinkAttrs(COOLICONS_URL)">coolicons</a>
      by Kryston Schwarze, licensed under
      <a :href="CC_BY_URL" v-bind="externalLinkAttrs(CC_BY_URL)">CC BY 4.0</a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-64) var(--gutter);
  background-color: var(--color-black);
  color: var(--color-white);
  text-align: center;
}

.footer__handle {
  color: var(--color-primary);
  font-style: italic;
  font-weight: var(--weight-semibold);
}

.footer__credits {
  margin-top: var(--space-8);
  color: var(--color-muted);
  font-size: var(--text-12);
}

.footer__credits a {
  text-decoration: underline;
}

.footer__credits a:hover {
  color: var(--color-white);
}
</style>
