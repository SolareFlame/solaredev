<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="footer">
    <p>
      Made by <span class="footer__handle">{{ profile.handle }}</span>
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
</style>
