import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import type { Cassette, Track } from '../data/cassettes'

/** Where a cassette is at: its running order for this visit, and where it was stopped. */
interface Reel {
  order: Track[]
  index: number
  time: number
}

/** A copy in random order (Fisher-Yates). */
function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

/**
 * The player's audio side: one <audio> element playing the inserted cassette's tracks one after
 * the other, in a loop, and an analyser on it so the player can move to the bass. The order is
 * shuffled once per cassette and per visit (a reload makes a new mix), and each cassette
 * remembers where it was stopped, like a real tape.
 */
export function useTapeDeck() {
  const audio = new Audio()
  audio.preload = 'auto'

  const loaded = shallowRef<Cassette | null>(null)
  const playing = ref(false)
  const reels = new Map<string, Reel>()
  /** The loaded cassette's reel. */
  const reel = shallowRef<Reel | null>(null)
  const index = ref(0)

  const track = computed(() => reel.value?.order[index.value] ?? null)

  audio.addEventListener('play', () => (playing.value = true))
  audio.addEventListener('pause', () => (playing.value = false))
  audio.addEventListener('ended', () => next(true))

  let context: AudioContext | null = null
  let analyser: AnalyserNode | null = null
  let spectrum: Uint8Array<ArrayBuffer> | null = null

  /**
   * Call from a user gesture (pointerdown, click): browsers only allow audio after one. Once the
   * element is routed through Web Audio, it only sounds while the context is running.
   */
  function unlock() {
    if (!context) {
      try {
        context = new AudioContext()
        analyser = context.createAnalyser()
        analyser.fftSize = 1024 // ~43Hz per bin
        analyser.smoothingTimeConstant = 0.5
        spectrum = new Uint8Array(analyser.frequencyBinCount)
        context.createMediaElementSource(audio).connect(analyser).connect(context.destination)
      } catch {
        context = analyser = spectrum = null
      }
    }
    if (context?.state === 'suspended') void context.resume()
  }

  async function play() {
    if (!loaded.value) return
    unlock()
    try {
      await audio.play()
    } catch {
      // Blocked by the autoplay policy: stays paused, a double-click on the player starts it.
    }
  }

  function pause() {
    audio.pause()
  }

  function toggle() {
    if (audio.paused) void play()
    else pause()
  }

  /** URL of the file in the player (audio.src reads back resolved, so it's kept apart). */
  let cued: string | null = null

  /** Puts the reel's current track in the player, `time` seconds in. */
  function cue(time: number) {
    const current = track.value
    if (!current) return
    if (cued !== current.src) audio.src = cued = current.src
    audio.currentTime = time
  }

  function insert(cassette: Cassette) {
    let saved = reels.get(cassette.id)
    if (!saved) {
      saved = { order: shuffle(cassette.tracks), index: 0, time: 0 }
      reels.set(cassette.id, saved)
    }
    loaded.value = cassette
    reel.value = saved
    index.value = saved.index
    cue(saved.time)
    void play()
  }

  /**
   * On to the next track (the first again after the last). Keeps playing or paused as it was,
   * unless told whether to play.
   */
  function next(andPlay = !audio.paused) {
    if (!reel.value) return
    index.value = (index.value + 1) % reel.value.order.length
    cue(0)
    // A new source stops the element without a 'pause' event.
    if (andPlay) void play()
    else playing.value = false
  }

  /** Stops and takes the cassette out, returning it. */
  function eject(): Cassette | null {
    const cassette = loaded.value
    if (!cassette || !reel.value) return null
    reel.value.index = index.value
    reel.value.time = audio.currentTime
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    cued = null
    playing.value = false // load() drops the pending 'pause' event
    loaded.value = null
    reel.value = null
    return cassette
  }

  /** Bass energy right now, 0 to 1 (null without Web Audio). */
  function bass(): number | null {
    if (!analyser || !spectrum) return null
    analyser.getByteFrequencyData(spectrum)
    let sum = 0
    for (let bin = 1; bin <= 5; bin++) sum += spectrum[bin]!
    return sum / (5 * 255)
  }

  onBeforeUnmount(() => {
    audio.pause()
    void context?.close()
  })

  return { loaded, track, playing, unlock, play, pause, toggle, insert, next, eject, bass }
}
