import type { Tilt } from '../data/cassettes'
import type { Velocity } from './usePhysicsBody'

/** Speed (px/ms) from which a cassette leans the way it's moving. */
const TILT_SPEED = 1.1

/** The way a fast-moving item leans, along its dominant axis (null when it's slow). */
export function tiltOf({ x, y }: Velocity): Exclude<Tilt, 'base'> | null {
  if (Math.hypot(x, y) < TILT_SPEED) return null
  if (Math.abs(x) > Math.abs(y)) return x > 0 ? 'right' : 'left'
  return y > 0 ? 'down' : 'up'
}

/** How far (px) the item must come back the other way for it to count as a back-and-forth. */
const SHAKE_DISTANCE = 24
const SHAKE_WINDOW_MS = 700
/** Direction changes along one axis, within the window, that make a shake. */
const SHAKE_REVERSALS = 4

/** 'x': side to side, 'y': up and down. */
export type ShakeAxis = 'x' | 'y'

interface AxisTrack {
  /** The way it's going: 1, -1, or 0 before it has moved far enough. */
  direction: number
  /** Furthest point reached the current way. */
  extreme: number
  /** Where the current run started (the last turning point). */
  from: number
  /** Completed runs: when they turned around, and how far they went. */
  swings: { t: number; distance: number }[]
}

const AXES: ShakeAxis[] = ['x', 'y']

/**
 * Spots a shake: quick back-and-forths along one axis. Works on positions rather than speed, so
 * it doesn't depend on how often the pointer reports. Returns the axis once a shake is complete,
 * and null until then. A diagonal shake counts for whichever axis it moved most along.
 */
export function createShakeDetector() {
  const start = (p: number): AxisTrack => ({ direction: 0, extreme: p, from: p, swings: [] })
  const axes: Record<ShakeAxis, AxisTrack> = { x: start(0), y: start(0) }

  function feed(position: { x: number; y: number }, now = performance.now()): ShakeAxis | null {
    for (const key of AXES) {
      const axis = axes[key]
      const p = position[key]
      if (axis.direction === 0) {
        if (Math.abs(p - axis.extreme) > SHAKE_DISTANCE) {
          axis.direction = Math.sign(p - axis.extreme)
          axis.extreme = p
        }
      } else if ((p - axis.extreme) * axis.direction > 0) {
        axis.extreme = p // still going the same way
      } else if ((axis.extreme - p) * axis.direction > SHAKE_DISTANCE) {
        axis.swings.push({ t: now, distance: Math.abs(axis.extreme - axis.from) })
        axis.direction = -axis.direction
        axis.from = axis.extreme
        axis.extreme = p
      }
      axis.swings = axis.swings.filter((swing) => now - swing.t < SHAKE_WINDOW_MS)
    }

    const shaken = AXES.filter((key) => axes[key].swings.length >= SHAKE_REVERSALS)
    if (shaken.length === 0) return null
    const travel = (key: ShakeAxis) => axes[key].swings.reduce((sum, s) => sum + s.distance, 0)
    const axis = shaken.reduce((a, b) => (travel(b) > travel(a) ? b : a))
    reset(position)
    return axis
  }

  /** Starts over from where the item is (call when it's grabbed). */
  function reset(position: { x: number; y: number }) {
    for (const key of AXES) axes[key] = start(position[key])
  }

  return { feed, reset }
}
