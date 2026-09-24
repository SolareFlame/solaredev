<script setup lang="ts">
import { useTemplateRef, type ComponentPublicInstance } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import InkRule from '@/components/InkRule.vue'
import { useIsOverDark } from '@/composables/useIsOverDark'
import { profile } from '@/data/profile'
import { externalLinkAttrs } from '@/utils/links'

// The pinned card scrolls over the dark sections: its bar turns off-white there.
const rule = useTemplateRef<ComponentPublicInstance>('rule')
const ruleOverDark = useIsOverDark(() => rule.value?.$el as HTMLElement | undefined)
</script>

<template>
  <aside class="profile" aria-label="Profile">
    <div class="profile__card">
      <img
        class="profile__avatar"
        :src="profile.avatar"
        :alt="profile.avatarAlt"
        width="224"
        height="224"
      />
      <p class="profile__handle">{{ profile.handle }}</p>
      <p class="profile__taglines">
        <span v-for="line in profile.taglines" :key="line" class="profile__tagline">{{ line }}</span>
      </p>
      <p class="profile__cta">{{ profile.cta }}</p>
      <ul class="profile__socials">
        <li v-for="social in profile.socials" :key="social.network">
          <a class="profile__social" :href="social.href" v-bind="externalLinkAttrs(social.href)">
            <AppIcon :name="social.network" />
            <span class="visually-hidden">{{ social.label }}</span>
          </a>
        </li>
      </ul>
    </div>
    <InkRule ref="rule" :tone="ruleOverDark ? 'white' : 'black'" class="profile__rule" />
  </aside>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: var(--space-32);
  margin-bottom: var(--space-48);
}

/* From 768px the card leaves the flow and sits in the shell's profile column. */
@media (min-width: 768px) {
  .profile {
    position: absolute;
    top: var(--content-top);
    left: max(var(--gutter), (100% - var(--shell-width)) / 2);
    z-index: 10;
    width: var(--aside-width);
    margin: 0;
  }
}

/* Pinned while scrolling, as long as the viewport is tall enough to show it whole. */
@media (min-width: 768px) and (min-height: 42rem) {
  .profile {
    position: fixed;
  }
}

.profile__card {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-32) var(--space-16) var(--space-24);
  color: var(--color-white);
  text-align: center;
}

/* Inked background, kept on a separate layer so the content stays crisp. */
.profile__card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: var(--color-primary);
  filter: var(--ink);
}

.profile__avatar {
  width: calc(100% - var(--space-32));
  max-width: 14rem;
  height: auto;
  aspect-ratio: 1;
  border: var(--border-width) solid var(--color-black);
  border-radius: 50%;
  object-fit: cover;
}

.profile__handle {
  margin-top: var(--space-32);
  font-family: var(--font-display);
  font-size: var(--text-32);
  font-weight: var(--weight-extrabold);
  line-height: 1.2;
}

.profile__taglines {
  margin-top: var(--space-16);
}

.profile__tagline {
  display: block;
}

.profile__cta {
  margin-top: var(--space-32);
}

.profile__socials {
  display: flex;
  justify-content: center;
  gap: var(--space-24);
  margin-top: var(--space-16);
}

/* Padding offset by a negative margin: the hover square overflows the icon without moving the row. */
.profile__social {
  display: block;
  margin: -0.25rem;
  padding: 0.25rem;
}

/* Inverted on hover: off-white square, icon in the card's vermillon. */
.profile__social:hover {
  background-color: var(--color-white);
  color: var(--color-primary);
}

.profile__social:focus-visible {
  outline-color: var(--color-black);
}

@media (prefers-reduced-motion: no-preference) {
  .profile__social {
    transition:
      color 0.2s ease,
      background-color 0.2s ease;
  }

  /* Black on paper, off-white over the dark part (phones: never pinned, stays black). */
  .profile .profile__rule {
    transition: background-color 0.3s ease;
  }
}
</style>
