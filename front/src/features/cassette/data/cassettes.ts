import base from '../assets/sprites/cassette_base.png'
import down from '../assets/sprites/cassette_bas.png'
import right from '../assets/sprites/cassette_droite.png'
import left from '../assets/sprites/cassette_gauche.png'
import up from '../assets/sprites/cassette_haut.png'
import noteDouble from '../assets/sprites/note_double.png'
import noteSimple from '../assets/sprites/note_simple.png'
import { tintSprites } from './tint'

/** Which way a cassette is being flung: each one has a tilted sprite for it. */
export type Tilt = 'base' | 'up' | 'down' | 'left' | 'right'

/** The music notes the player gives off while a cassette plays. */
export type Note = 'double' | 'simple'

/** Art size of each note sprite, in pixels. */
export const NOTE_SIZES: Record<Note, { width: number; height: number }> = {
  double: { width: 6, height: 5 },
  simple: { width: 4, height: 5 },
}

export interface Track {
  /** The file name, without its extension. */
  title: string
  /** Audio file URL. */
  src: string
}

export interface Cassette {
  id: string
  title: string
  /** At least one. Played as a loop, in an order shuffled on each visit (see useTapeDeck). */
  tracks: Track[]
  sprites: Record<Tilt, string>
  /** Notes in the cassette's colours. */
  notes: Record<Note, string>
}

/**
 * The music isn't in this repo: assets/tracks/ is gitignored, meant to be a clone of a separate
 * (private) repo. Whatever is in it gets bundled. Each cassette plays the files in its own folder
 * (assets/tracks/<id>/), so filling a cassette is just dropping files in there; the file name is
 * the title shown. A cassette with an empty or missing folder (fresh clone, CI) is left out, so the
 * site builds and runs without any music.
 */
const TRACKS_DIR = '../assets/tracks/'
const trackUrls = import.meta.glob<string>('../assets/tracks/**/*.{mp3,ogg,m4a,opus,wav,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** The tracks in a cassette's folder, by title. */
function tracksIn(folder: string): Track[] {
  const prefix = `${TRACKS_DIR}${folder}/`
  return Object.entries(trackUrls)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, src]) => ({
      title: path.slice(path.lastIndexOf('/') + 1).replace(/\.[^.]+$/, ''),
      src,
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

interface CassetteSpec {
  /** Also the name of its folder in assets/tracks/. */
  id: string
  title: string
  /** Label colour, e.g. '#e8743b'. */
  color: string
  /** Colour of the label's lighter marks: `color` lightened when omitted. */
  accent?: string
}

/** The universal sprites: their key colours are recoloured per cassette with tintSprites(). */
const tape: Record<Tilt, string> = { base, up, down, left, right }
const notes: Record<Note, string> = { double: noteDouble, simple: noteSimple }

function cassette({ color, accent, ...spec }: CassetteSpec): Cassette | null {
  const tracks = tracksIn(spec.id)
  if (tracks.length === 0) {
    if (import.meta.env.DEV) {
      console.warn(`[cassette] "${spec.id}": nothing in assets/tracks/${spec.id}/, skipped`)
    }
    return null
  }
  return {
    ...spec,
    tracks,
    sprites: tintSprites(tape, color, accent),
    notes: tintSprites(notes, color, accent),
  }
}

// One entry per cassette lying around the page (colours from the sprites' AAP-64 palette).
// Add a line here and a folder of the same name in assets/tracks/.
const specs: CassetteSpec[] = [
  { id: 'jpop', title: 'Miku · Ado · J-pop', color: '#249fde', accent: '#20d6c7' },
  { id: 'metal', title: 'Metal', color: '#bc4a9b', accent: '#e86a73' },
  { id: 'terraria', title: 'Terraria', color: '#14a02e', accent: '#59c135' },
]

export const cassettes: Cassette[] = specs
  .map(cassette)
  .filter((c): c is Cassette => c !== null)

if (import.meta.env.DEV) {
  const folders = new Set(specs.map((s) => `${TRACKS_DIR}${s.id}/`))
  for (const path of Object.keys(trackUrls)) {
    if (![...folders].some((folder) => path.startsWith(folder))) {
      console.warn(`[cassette] ${path.slice(TRACKS_DIR.length)} isn't in a cassette's folder`)
    }
  }
}
