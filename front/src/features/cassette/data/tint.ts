import { reactive } from 'vue'

type Rgb = [number, number, number]

/** The label colours painted in the sprites: swapped at runtime, so the PNGs stay universal. */
const MAIN_KEY: Rgb = [36, 159, 222] // #249fde
const ACCENT_KEY: Rgb = [32, 214, 199] // #20d6c7

/** Without an explicit accent, the label's second colour is the main one mixed with white. */
const ACCENT_LIGHTEN = 0.3

function parseHex(hex: string): Rgb {
  let h = hex.replace('#', '')
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const mix = (a: Rgb, b: Rgb, t: number): Rgb =>
  a.map((v, i) => Math.round(v + (b[i]! - v) * t)) as Rgb

async function recolor(src: string, swaps: [Rgb, Rgb][]): Promise<string> {
  const img = new Image()
  img.src = src
  await img.decode()
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const px = data.data
  for (let i = 0; i < px.length; i += 4) {
    for (const [from, to] of swaps) {
      if (px[i] === from[0] && px[i + 1] === from[1] && px[i + 2] === from[2]) {
        px[i] = to[0]
        px[i + 1] = to[1]
        px[i + 2] = to[2]
        break
      }
    }
  }
  ctx.putImageData(data, 0, 0)
  return canvas.toDataURL()
}

/**
 * A recoloured copy of a set of tape sprites: the label takes `color` (and `accent` for its
 * lighter marks, derived from `color` when omitted). Starts out as the original sprites and swaps
 * each one in as soon as it's recoloured, which happens long before the tapes are shown.
 */
export function tintSprites<K extends string>(
  sprites: Record<K, string>,
  color: string,
  accent?: string,
): Record<K, string> {
  const main = parseHex(color)
  const second = accent ? parseHex(accent) : mix(main, [255, 255, 255], ACCENT_LIGHTEN)
  const swaps: [Rgb, Rgb][] = [
    [MAIN_KEY, main],
    [ACCENT_KEY, second],
  ]
  const out = reactive({ ...sprites }) as Record<K, string>
  for (const key of Object.keys(sprites) as K[]) {
    recolor(sprites[key], swaps)
      .then((url) => (out[key] = url))
      .catch(() => {}) // keep the original sprite
  }
  return out
}
