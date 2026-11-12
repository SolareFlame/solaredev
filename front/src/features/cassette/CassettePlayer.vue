<script setup lang="ts">
/**
 * Easter egg: a pixel tape player and its cassettes, hidden behind a sparkly "More" in the nav.
 *
 * Self-contained: remove <CassettePlayer /> from App.vue and nothing else depends on it. The nav
 * only exposes an empty #nav-extras slot that the button is teleported into.
 *
 * - Drag the player and the cassettes (they live in the page and scroll with it), throw them.
 * - A cassette moved fast leans the way it goes.
 * - Bring a cassette to the open player: it swallows it, closes and plays its tracks in a loop,
 *   shuffled (a new mix on each visit).
 * - Shake the player side to side: next track. Up and down: it spits the cassette out.
 * - Double-click it: pause / play.
 */
import { computed, nextTick, onBeforeUnmount, reactive, ref, useTemplateRef, watch } from 'vue'
import MoreButton from './components/MoreButton.vue'
import { createShakeDetector, tiltOf } from './composables/gestures'
import { usePhysicsBody, type PhysicsBody, type Velocity } from './composables/usePhysicsBody'
import { useTapeDeck } from './composables/useTapeDeck'
import { cassettes, NOTE_SIZES, type Cassette, type Note, type Tilt } from './data/cassettes'
import playerClosed from './assets/sprites/lecteur_ferme.png'
import playerOpen from './assets/sprites/lecteur_ouvert.png'

/** Sprite sizes, in art pixels (rendered at --tape-px each). */
const CASSETTE_SIZE = { width: 20, height: 13 }
const PLAYER_OPEN_SIZE = { width: 20, height: 25 }
const PLAYER_CLOSED_SIZE = { width: 20, height: 18 }
/**
 * Where an inserted cassette sits, in art pixels from the player's top-left: its reels line up
 * with the holes of the open sprite and show through the closed one's window.
 */
const SLOT = { x: 0, y: 4 }
/** How close (share of the player width) a cassette's center must get to the mouth. */
const SWALLOW_RANGE = 0.5
const SWALLOW_MS = 180
/** A freshly ejected cassette can't be swallowed right back. */
const EJECT_COOLDOWN_MS = 800
const EJECT_SPEED = 1.8
/** A cassette keeps leaning this long after slowing down, so the sprite doesn't flicker. */
const TILT_HOLD_MS = 140
/** Notes given off on the beat while playing: at most one per NOTE_GAP_MS, NOTE_MAX on screen. */
const NOTE_GAP_MS = 300
const NOTE_MAX = 10
const NOTE_LIFE_MS = 2100

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const visible = ref(false)
const deck = useTapeDeck()
const shake = createShakeDetector()

const sizeOf = (el: HTMLElement | null | undefined) => ({
  width: el?.offsetWidth ?? 0,
  height: el?.offsetHeight ?? 0,
})

// --- Player ---------------------------------------------------------------------------------

const playerEl = useTemplateRef<HTMLElement>('playerEl')
const playerSprite = useTemplateRef<HTMLElement>('playerSprite')
const gulping = ref(false)

const player = usePhysicsBody({
  size: () => sizeOf(playerEl.value),
  onGrab: () => {
    deck.unlock()
    shake.reset(player.state)
  },
  onMove: onPlayerMove,
})

/** Center of the slot, in page coordinates (same whether the player is open or closed). */
function mouth() {
  const artPx = sizeOf(playerEl.value).width / PLAYER_OPEN_SIZE.width
  return {
    x: player.state.x + (SLOT.x + CASSETTE_SIZE.width / 2) * artPx,
    y: player.state.y + (SLOT.y + CASSETTE_SIZE.height / 2) * artPx,
  }
}

function onPlayerMove(velocity: Velocity) {
  if (!player.state.dragging) return
  if (deck.loaded.value) {
    const shaken = shake.feed(player.state)
    if (shaken === 'x') skip()
    else if (shaken === 'y') void eject(velocity)
  } else {
    // Moving the open player onto a cassette works too.
    for (const tape of tapes) tryToSwallow(tape)
  }
}

function onPlayerDoubleClick() {
  if (deck.loaded.value) deck.toggle()
}

function skip() {
  deck.next()
  gulp()
}

/** Hover text: what's playing, and how to drive it. */
const playerTitle = computed(() => {
  const cassette = deck.loaded.value
  const track = deck.track.value
  if (!cassette || !track) return undefined
  return `${track.title} (${cassette.title})\nDouble-click: play / pause\nShake side to side: next track\nShake up and down: eject`
})

// --- Cassettes ------------------------------------------------------------------------------

interface Tape {
  cassette: Cassette
  body: PhysicsBody
  view: { tilt: Tilt; swallowing: boolean; popKey: number }
}

const tapeEls = new Map<string, HTMLElement>()
let lastEject = -Infinity

const tapes: Tape[] = cassettes.map((cassette) => {
  const view = reactive({ tilt: 'base' as Tilt, swallowing: false, popKey: 0 })
  let untilt: ReturnType<typeof setTimeout> | undefined

  const tape: Tape = {
    cassette,
    view,
    body: usePhysicsBody({
      size: () => sizeOf(tapeEls.get(cassette.id)),
      onGrab: () => deck.unlock(),
      onMove: (velocity) => {
        const tilt = tiltOf(velocity)
        if (tilt) {
          view.tilt = tilt
          clearTimeout(untilt)
          untilt = setTimeout(() => (view.tilt = 'base'), TILT_HOLD_MS)
        }
        tryToSwallow(tape)
      },
    }),
  }
  return tape
})

function setTapeEl(id: string, el: unknown) {
  if (el instanceof HTMLElement) tapeEls.set(id, el)
  else tapeEls.delete(id)
}

const isInDeck = (tape: Tape) => deck.loaded.value?.id === tape.cassette.id

function tryToSwallow(tape: Tape) {
  if (deck.loaded.value || tape.view.swallowing || isInDeck(tape)) return
  if (performance.now() - lastEject < EJECT_COOLDOWN_MS) return

  const { width, height } = sizeOf(tapeEls.get(tape.cassette.id))
  const target = mouth()
  const distance = Math.hypot(
    tape.body.state.x + width / 2 - target.x,
    tape.body.state.y + height / 2 - target.y,
  )
  if (distance > sizeOf(playerEl.value).width * SWALLOW_RANGE) return

  // Slides into the slot (CSS transition), then the player closes on it and plays.
  // (Flagged first: dropping and placing it calls back into this function.)
  tape.view.swallowing = true
  tape.view.tilt = 'base'
  tape.body.drop()
  tape.body.place(target.x - width / 2, target.y - height / 2)
  setTimeout(() => {
    tape.view.swallowing = false
    deck.insert(tape.cassette)
    gulp()
  }, SWALLOW_MS)
}

async function eject(velocity: Velocity) {
  const cassette = deck.eject()
  const tape = tapes.find((t) => t.cassette.id === cassette?.id)
  if (!tape) return
  lastEject = performance.now()
  gulp()

  await nextTick() // the cassette is rendered again, and the player is open
  const { width, height } = sizeOf(tapeEls.get(tape.cassette.id))
  const from = mouth()
  tape.body.place(from.x - width / 2, from.y - height / 2)
  tape.view.popKey++

  // Flung the way the player was going, or down out of the door if it barely moved.
  const speed = Math.hypot(velocity.x, velocity.y)
  const direction = speed > 0.1 ? { x: velocity.x / speed, y: velocity.y / speed } : { x: 0, y: 1 }
  tape.body.launch(direction.x * EJECT_SPEED, direction.y * EJECT_SPEED)
}

let gulpTimer: ReturnType<typeof setTimeout> | undefined
function gulp() {
  gulping.value = true
  clearTimeout(gulpTimer)
  gulpTimer = setTimeout(() => (gulping.value = false), 300) // animation length
}

// --- Showing / hiding -----------------------------------------------------------------------

async function toggleVisible() {
  deck.unlock()
  visible.value = !visible.value
  if (!visible.value) {
    deck.pause()
    return
  }
  preloadSprites()
  await nextTick()
  spawn()
}

/** Fetches the sprites not shown yet, so the first tilt or close doesn't flash empty. */
let spritesPreloaded = false
function preloadSprites() {
  if (spritesPreloaded) return
  spritesPreloaded = true
  const urls = [
    playerClosed,
    ...cassettes.flatMap((c) => [...Object.values(c.sprites), ...Object.values(c.notes)]),
  ]
  for (const url of new Set(urls)) new Image().src = url
}

/** Drops everything in the middle of the current screen. */
function spawn() {
  const viewportWidth = document.documentElement.clientWidth
  const { width, height } = sizeOf(playerEl.value)
  const x = window.scrollX + viewportWidth * 0.68 - width / 2
  const y = window.scrollY + window.innerHeight * 0.45 - height / 2
  player.place(x, y)

  // In a row to the left of the player, closer together when the screen is too narrow for it.
  const loose = tapes.filter((tape) => !isInDeck(tape))
  const tapeSize = sizeOf(tapeEls.get(loose[0]?.cassette.id ?? ''))
  const room = x - tapeSize.width * 1.8 - tapeSize.width * 0.1
  const step = Math.min(1.3, room / (tapeSize.width * Math.max(loose.length - 1, 1)))
  loose.forEach((tape, i) => {
    tape.body.place(
      x - tapeSize.width * (1.8 + i * Math.max(step, 0)),
      y + height * 0.45 - i * tapeSize.height * 0.6,
    )
    tape.view.popKey++
  })
}

// --- Notes ---------------------------------------------------------------------------------

interface FloatingNote {
  id: number
  src: string
  kind: Note
  x: number
  y: number
}

const notes = reactive<FloatingNote[]>([])
let noteId = 0
let lastNote = -Infinity

/** A note pops out of the top of the player and floats away, in the loaded cassette's colours. */
function emitNote(now: number) {
  const cassette = deck.loaded.value
  if (!cassette || now - lastNote < NOTE_GAP_MS || notes.length >= NOTE_MAX) return
  lastNote = now

  const kind: Note = Math.random() < 0.5 ? 'double' : 'simple'
  const { width } = sizeOf(playerEl.value)
  const artPx = width / PLAYER_OPEN_SIZE.width
  // Anywhere along the top of the player, whole art pixels so it stays on the pixel grid.
  const column = Math.floor(Math.random() * (PLAYER_OPEN_SIZE.width - NOTE_SIZES[kind].width + 1))
  const note: FloatingNote = {
    id: noteId++,
    src: cassette.notes[kind],
    kind,
    x: player.state.x + column * artPx,
    y: player.state.y - Math.ceil(NOTE_SIZES[kind].height / 2) * artPx,
  }
  notes.push(note)
  setTimeout(() => {
    const i = notes.findIndex((n) => n.id === note.id)
    if (i >= 0) notes.splice(i, 1)
  }, NOTE_LIFE_MS)
}

// --- Dancing to the music -------------------------------------------------------------------

let danceFrame = 0
let bassAverage = -1
let bassPeak = 0
let pulse = 0
let lean = 1

/**
 * How much the bass is kicking right now, 0 to 1. Relative to its recent average and peak, so
 * quiet intros and loud choruses both move the player.
 */
function beat(bass: number) {
  if (bassAverage < 0) bassAverage = bass
  bassAverage += (bass - bassAverage) * 0.05
  bassPeak = Math.max(bass, bassPeak * 0.997)
  const range = Math.max(bassPeak - bassAverage, 0.05)
  return Math.min(Math.max((bass - bassAverage) / range, 0), 1)
}

function dance(now: number) {
  const bass = deck.bass()
  // Without Web Audio, a steady 120 bpm bounce.
  const hit = bass === null ? Math.max(0, Math.sin((now / 1000) * Math.PI * 4)) ** 4 : beat(bass)

  const rising = hit > pulse
  if (rising && hit > 0.5 && pulse <= 0.5) {
    lean = -lean // tilt the other way on each beat
    emitNote(now)
  }
  pulse = rising ? hit : pulse * 0.86

  if (playerSprite.value) {
    playerSprite.value.style.transform = `rotate(${lean * pulse * 4}deg) scale(${1 + pulse * 0.06}, ${1 - pulse * 0.08})`
  }
  danceFrame = requestAnimationFrame(dance)
}

function stopDancing() {
  cancelAnimationFrame(danceFrame)
  danceFrame = 0
  pulse = 0
  bassAverage = -1
  bassPeak = 0
  if (playerSprite.value) playerSprite.value.style.transform = ''
}

watch(deck.playing, (playing) => {
  stopDancing()
  if (playing && !reducedMotion) danceFrame = requestAnimationFrame(dance)
})

onBeforeUnmount(stopDancing)
</script>

<template>
  <Teleport defer to="#nav-extras">
    <MoreButton :active="visible" @toggle="toggleVisible" />
  </Teleport>

  <Teleport to="body">
    <div v-if="visible" class="tape-layer">
      <img
        v-for="note in notes"
        :key="note.id"
        class="tape-note"
        :src="note.src"
        alt=""
        draggable="false"
        :style="{
          transform: `translate(${note.x}px, ${note.y}px)`,
          '--_w': NOTE_SIZES[note.kind].width,
          '--_h': NOTE_SIZES[note.kind].height,
          '--_life': `${NOTE_LIFE_MS}ms`,
        }"
      />

      <div
        ref="playerEl"
        class="tape-item tape-item--player"
        :class="{ 'tape-item--held': player.state.dragging }"
        :style="{ transform: `translate(${player.state.x}px, ${player.state.y}px)` }"
        :title="playerTitle"
        v-on="player.handlers"
        @dblclick="onPlayerDoubleClick"
      >
        <div ref="playerSprite" class="tape-sprite" :class="{ 'tape-sprite--gulp': gulping }">
          <!-- The loaded cassette, seen through the closed player's window. -->
          <img
            v-if="deck.loaded.value"
            class="tape-sprite__inside"
            :src="deck.loaded.value.sprites.base"
            alt=""
            draggable="false"
            :style="{
              '--_w': CASSETTE_SIZE.width,
              '--_h': CASSETTE_SIZE.height,
              '--_x': SLOT.x,
              '--_y': SLOT.y,
            }"
          />
          <img
            v-if="deck.loaded.value"
            :src="playerClosed"
            alt="Tape player"
            draggable="false"
            :style="{ '--_w': PLAYER_CLOSED_SIZE.width, '--_h': PLAYER_CLOSED_SIZE.height }"
          />
          <img
            v-else
            :src="playerOpen"
            alt="Tape player, open and empty"
            draggable="false"
            :style="{ '--_w': PLAYER_OPEN_SIZE.width, '--_h': PLAYER_OPEN_SIZE.height }"
          />
        </div>
      </div>

      <template v-for="tape in tapes" :key="tape.cassette.id">
        <div
          v-if="!isInDeck(tape)"
          :ref="(el) => setTapeEl(tape.cassette.id, el)"
          class="tape-item tape-item--cassette"
          :class="{
            'tape-item--held': tape.body.state.dragging,
            'tape-item--swallowed': tape.view.swallowing,
          }"
          :style="{ transform: `translate(${tape.body.state.x}px, ${tape.body.state.y}px)` }"
          :title="`${tape.cassette.title} · ${tape.cassette.tracks.length} track${tape.cassette.tracks.length > 1 ? 's' : ''}`"
          v-on="tape.body.handlers"
        >
          <div :key="tape.view.popKey" class="tape-sprite tape-sprite--pop">
            <img
              :src="tape.cassette.sprites[tape.view.tilt]"
              :alt="`Cassette: ${tape.cassette.title}`"
              draggable="false"
              :style="{ '--_w': CASSETTE_SIZE.width, '--_h': CASSETTE_SIZE.height }"
            />
          </div>
        </div>
      </template>
    </div>
  </Teleport>
</template>

<style scoped>
/* Page-sized origin: items are placed in page coordinates and scroll with it. Under the nav. */
.tape-layer {
  --tape-px: 0.2rem;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 15;
  width: 0;
  height: 0;
}

@media (min-width: 768px) {
  .tape-layer {
    --tape-px: 0.25rem;
  }
}

.tape-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.tape-item--cassette {
  z-index: 2;
}

.tape-item--held {
  z-index: 3;
  cursor: grabbing;
}

/* Slides under the player, into its slot (where the closed player then shows it). */
.tape-item--swallowed {
  z-index: 0;
  pointer-events: none;
  transition: transform 0.18s ease-in;
}

.tape-sprite {
  position: relative;
  transform-origin: 50% 100%;
}

/* Behind the closed player, which only shows it through its window. */
.tape-item .tape-sprite img.tape-sprite__inside {
  position: absolute;
  top: calc(var(--_y) * var(--tape-px));
  left: calc(var(--_x) * var(--tape-px));
  filter: none;
}

.tape-sprite__inside + img {
  position: relative;
}

.tape-sprite img {
  display: block;
  width: calc(var(--_w) * var(--tape-px));
  max-width: none;
  height: calc(var(--_h) * var(--tape-px));
  image-rendering: pixelated;
  filter: drop-shadow(0 var(--tape-px) 0 rgb(0 0 0 / 0.25));
  pointer-events: none;
}

/* Lifted while held: higher, with a longer shadow. */
.tape-item--held .tape-sprite img {
  translate: 0 calc(-1 * var(--tape-px));
  filter: drop-shadow(0 calc(3 * var(--tape-px)) 0 rgb(0 0 0 / 0.2));
}

/* Behind the player, so they come out of it. */
.tape-note {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  display: block;
  width: calc(var(--_w) * var(--tape-px));
  max-width: none;
  height: calc(var(--_h) * var(--tape-px));
  image-rendering: pixelated;
  pointer-events: none;
  /* One art pixel per step: straight up, on the pixel grid. */
  animation: tape-note var(--_life) steps(16) forwards;
}

@keyframes tape-note {
  from {
    translate: 0 0;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  to {
    translate: 0 calc(-16 * var(--tape-px));
    opacity: 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .tape-sprite--pop {
    animation: tape-pop 0.24s steps(4);
  }

  .tape-sprite--gulp {
    animation: tape-gulp 0.3s steps(5);
  }
}

@keyframes tape-pop {
  from {
    scale: 0.2;
  }

  60% {
    scale: 1.15;
  }
}

@keyframes tape-gulp {
  30% {
    scale: 1.12 0.86;
  }

  70% {
    scale: 0.94 1.08;
  }
}
</style>
