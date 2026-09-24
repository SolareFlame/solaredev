/** Small deterministic PRNG (mulberry32): the "hand-drawn" lines are identical on every load. */
function mulberry32(seed: number): () => number {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface WavyLineOptions {
  length: number
  /** Vertical centre of the line. */
  y: number
  /** Distance between jittered points (px). */
  step: number
  /** Maximum vertical jitter (px). */
  amplitude: number
  seed: number
}

type Point = readonly [number, number]

const round = (value: number) => Math.round(value * 100) / 100

/** SVG path of a gently wavy horizontal line: a Catmull-Rom curve through jittered points. */
export function wavyLinePath({ length, y, step, amplitude, seed }: WavyLineOptions): string {
  const random = mulberry32(seed)
  const points: Point[] = []
  for (let x = 0; x <= length; x += step) {
    points.push([x, y + (random() * 2 - 1) * amplitude])
  }

  const [first] = points
  if (!first) return ''

  let path = `M${first[0]} ${round(first[1])}`
  points.forEach((p1, i) => {
    const p2 = points[i + 1]
    if (!p2) return
    const p0 = points[i - 1] ?? p1
    const p3 = points[i + 2] ?? p2
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    path += `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${p2[0]} ${round(p2[1])}`
  })
  return path
}
