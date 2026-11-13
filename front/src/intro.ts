/*
 * Opening sequence: the loader hands over to the page, which then "inks" itself in.
 * The choreography itself is pure CSS (styles/intro.css), keyed on `html[data-intro]`;
 * this module only starts it and lets scripts (e.g. the stat counters) sync with it.
 */

let resolveStart!: () => void

/** Resolves when the opening sequence starts (the loader begins to fade out). */
export const introStarted = new Promise<void>((resolve) => {
  resolveStart = resolve
})

/** Starts the CSS choreography and wakes up anything waiting on `introStarted`. */
export function startIntro() {
  document.documentElement.dataset.intro = ''
  resolveStart()
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** When the hero stats start counting, in ms after the intro starts (keep in sync with intro.css). */
export const STATS_AT = 1960
export const STATS_STAGGER = 160
