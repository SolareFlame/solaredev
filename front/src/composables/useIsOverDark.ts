import {
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  type InjectionKey,
  type ShallowRef,
} from 'vue'

/** The dark part of the page, provided by App.vue. */
export const darkSurfaceKey: InjectionKey<Readonly<ShallowRef<HTMLElement | null>>> =
  Symbol('dark-surface')

/**
 * Whether the middle of `target` currently sits over the dark part of the page,
 * kept up to date while scrolling (for pinned elements that must switch colour).
 */
export function useIsOverDark(target: () => HTMLElement | null | undefined) {
  const surface = inject(darkSurfaceKey, null)
  const isOverDark = ref(false)

  // Two layout reads, no writes: cheap enough to run on every scroll event.
  const measure = () => {
    const element = target()
    const dark = surface?.value
    if (!element || !dark) return
    const box = element.getBoundingClientRect()
    isOverDark.value = dark.getBoundingClientRect().top <= box.top + box.height / 2
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    // Web fonts can change the height of the hero, hence where the dark part starts.
    void document.fonts.ready.then(measure)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', measure)
    window.removeEventListener('resize', measure)
  })

  return isOverDark
}
