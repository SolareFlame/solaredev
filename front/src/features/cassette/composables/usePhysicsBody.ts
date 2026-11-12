import { onBeforeUnmount, reactive } from 'vue'

/** Pixels per millisecond. */
export interface Velocity {
  x: number
  y: number
}

interface Options {
  /** Rendered size, to keep the item inside the page. */
  size: () => { width: number; height: number }
  /** After every position change (drag or glide), with the current velocity. */
  onMove?: (velocity: Velocity) => void
  onGrab?: () => void
}

/** Pointer history used for the release velocity. */
const SAMPLE_WINDOW_MS = 80
/** Exponential slow-down while gliding, per ms (~300px of travel for a 2px/ms throw). */
const FRICTION = 0.006
const MAX_SPEED = 3
const REST_SPEED = 0.03
/** Share of speed kept when bouncing off the page edges. */
const BOUNCE = 0.4

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * An item placed in page coordinates (it scrolls with the page) that can be dragged with any
 * pointer and thrown: it keeps gliding with friction after release and bounces off the edges.
 */
export function usePhysicsBody(options: Options) {
  const state = reactive({ x: 0, y: 0, dragging: false })
  const velocity: Velocity = { x: 0, y: 0 }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let pointerId: number | null = null
  let grabOffset = { x: 0, y: 0 }
  let samples: { t: number; x: number; y: number }[] = []
  let frame = 0
  let lastFrame = 0

  function bounds() {
    const { width, height } = options.size()
    const page = document.documentElement
    return {
      maxX: Math.max(0, page.clientWidth - width),
      maxY: Math.max(0, page.scrollHeight - height),
    }
  }

  function setPosition(x: number, y: number) {
    const { maxX, maxY } = bounds()
    state.x = clamp(x, 0, maxX)
    state.y = clamp(y, 0, maxY)
    options.onMove?.(velocity)
  }

  function stopGliding() {
    cancelAnimationFrame(frame)
    frame = 0
  }

  function glide(now: number) {
    const dt = Math.min(now - lastFrame, 32)
    lastFrame = now
    const decay = Math.exp(-FRICTION * dt)
    velocity.x *= decay
    velocity.y *= decay

    const { maxX, maxY } = bounds()
    let x = state.x + velocity.x * dt
    let y = state.y + velocity.y * dt
    if (x < 0 || x > maxX) {
      x = clamp(x, 0, maxX)
      velocity.x *= -BOUNCE
    }
    if (y < 0 || y > maxY) {
      y = clamp(y, 0, maxY)
      velocity.y *= -BOUNCE
    }

    if (Math.hypot(velocity.x, velocity.y) < REST_SPEED) {
      velocity.x = velocity.y = 0
      setPosition(x, y)
      frame = 0
      return
    }
    setPosition(x, y)
    frame = requestAnimationFrame(glide)
  }

  /** Sends the item flying (ignored with reduced motion). */
  function launch(vx: number, vy: number) {
    stopGliding()
    const speed = Math.hypot(vx, vy)
    const scale = speed > MAX_SPEED ? MAX_SPEED / speed : 1
    velocity.x = vx * scale
    velocity.y = vy * scale
    if (reducedMotion || speed < REST_SPEED) {
      velocity.x = velocity.y = 0
      return
    }
    lastFrame = performance.now()
    frame = requestAnimationFrame(glide)
  }

  /** Puts the item somewhere, at rest. */
  function place(x: number, y: number) {
    stopGliding()
    velocity.x = velocity.y = 0
    setPosition(x, y)
  }

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0 || pointerId !== null) return
    event.preventDefault()
    stopGliding()
    pointerId = event.pointerId
    try {
      ;(event.currentTarget as Element).setPointerCapture(event.pointerId)
    } catch {
      // Pointer already gone: the drag still follows events that reach the item.
    }
    grabOffset = { x: event.pageX - state.x, y: event.pageY - state.y }
    samples = [{ t: event.timeStamp, x: event.pageX, y: event.pageY }]
    velocity.x = velocity.y = 0
    state.dragging = true
    options.onGrab?.()
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    const t = event.timeStamp
    samples.push({ t, x: event.pageX, y: event.pageY })
    while (samples.length > 2 && t - samples[0]!.t > SAMPLE_WINDOW_MS) samples.shift()
    const first = samples[0]!
    const dt = Math.max(t - first.t, 1)
    velocity.x = (event.pageX - first.x) / dt
    velocity.y = (event.pageY - first.y) / dt
    setPosition(event.pageX - grabOffset.x, event.pageY - grabOffset.y)
  }

  function onPointerUp(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    pointerId = null
    state.dragging = false
    // The pointer may have stopped before being released: then it's a drop, not a throw.
    const last = samples.at(-1)
    const still = !last || event.timeStamp - last.t > 60
    launch(still ? 0 : velocity.x, still ? 0 : velocity.y)
  }

  /** Lets go without throwing (e.g. the item got swallowed mid-drag). */
  function drop() {
    pointerId = null
    state.dragging = false
    place(state.x, state.y)
  }

  onBeforeUnmount(stopGliding)

  return {
    state,
    velocity,
    place,
    launch,
    drop,
    /** Bind with v-on="body.handlers" on the item. */
    handlers: {
      pointerdown: onPointerDown,
      pointermove: onPointerMove,
      pointerup: onPointerUp,
      pointercancel: onPointerUp,
    },
  }
}

export type PhysicsBody = ReturnType<typeof usePhysicsBody>
