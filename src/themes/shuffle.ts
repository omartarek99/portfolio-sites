/**
 * "Shuffle style" (SPEC §8.4): a tasteful palette + font pair combination.
 *
 * Deterministic for a seed, so the same seed always gives the same look (the
 * editor keeps the seed in its undo history) and the palette is always one of
 * the curated, AA-checked ones. Everything else about the theme — template,
 * radius, spacing, motion, buttons, background — is kept.
 *
 * Isomorphic.
 */
import type { Theme } from '@/schemas/site'
import { FONT_PAIRS, fontPairToThemeFonts, type FontPair } from './fonts'
import { CURATED_PALETTES, paletteMeetsAA, type CuratedPalette, type PaletteGroup } from './palettes'

/** Font moods that suit each palette group. */
const MOODS_BY_GROUP: Record<PaletteGroup, FontPair['mood'][]> = {
  'light-neutral': ['modern', 'editorial', 'classic', 'technical'],
  dark: ['modern', 'bold', 'technical'],
  vibrant: ['bold', 'friendly', 'modern'],
  earthy: ['elegant', 'editorial', 'classic', 'friendly'],
  gulf: ['elegant', 'editorial', 'classic'],
}

/** FNV-1a, so a seed maps to the same look on the server and in the browser. */
function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const SAFE_PALETTES = CURATED_PALETTES.filter((entry) => paletteMeetsAA(entry.palette))

function pick<T>(items: readonly T[], seed: string): T {
  return items[hash(seed) % items.length]
}

/** The palette and font pair a seed selects — the editor labels the result with these. */
export function shuffleSelection(seed: string): { palette: CuratedPalette; pair: FontPair } {
  const palette = pick(SAFE_PALETTES, seed)
  const moods = MOODS_BY_GROUP[palette.group]
  const candidates = FONT_PAIRS.filter((pair) => moods.includes(pair.mood))
  return { palette, pair: pick(candidates.length > 0 ? candidates : FONT_PAIRS, `${seed}:fonts`) }
}

/** A new theme with a shuffled palette + font pair. The original is untouched. */
export function shuffleStyle(theme: Theme, seed: string): Theme {
  const { palette, pair } = shuffleSelection(seed)
  return {
    ...theme,
    palette: palette.palette,
    mode: palette.mode,
    fonts: fontPairToThemeFonts(pair),
  }
}
