/**
 * "Generate palette from my photo/logo" (SPEC §8.4): derives a Palette from
 * RGBA pixel data with median cut.
 *
 * A pure function — the caller does the DOM work (draw the image small on a
 * canvas, read `getImageData().data`, pass the buffer here), so this runs the
 * same in the editor, on the server and in tests.
 *
 * The result always passes the AA checks in `palettes.ts`: colors taken from
 * an image are nudged (never replaced) until text on the background, muted
 * text, text on a surface and button text on the primary are all readable.
 *
 * Isomorphic.
 */
import type { Palette } from '@/schemas/site'
import { contrastRatio, luminance, mix, rgbToHex, type Rgb } from '@/lib/color'
import { onColor } from './css-vars'
import { AA_RATIO } from './palettes'

export interface ExtractOptions {
  /** Force the result light or dark instead of following the image. */
  mode?: 'light' | 'dark' | 'auto'
  /** Use every Nth pixel (1 = every pixel). Default 1 — downsample before calling. */
  step?: number
  /** Number of median-cut boxes. Default 8. */
  colors?: number
  /** Ignore pixels below this alpha (logos on transparency). Default 128. */
  minAlpha?: number
}

/* ── Median cut ──────────────────────────────────────────────────────────── */

interface Swatch {
  color: string
  rgb: Rgb
  weight: number
}

function split(box: Rgb[][], target: number): Rgb[][] {
  while (box.length < target) {
    // Split the box with the widest single channel at that channel's median.
    let bestIndex = -1
    let bestRange = 0
    let bestChannel: keyof Rgb = 'r'
    box.forEach((samples, index) => {
      if (samples.length < 2) return
      for (const channel of ['r', 'g', 'b'] as const) {
        let min = 255
        let max = 0
        for (const sample of samples) {
          if (sample[channel] < min) min = sample[channel]
          if (sample[channel] > max) max = sample[channel]
        }
        if (max - min > bestRange) {
          bestRange = max - min
          bestIndex = index
          bestChannel = channel
        }
      }
    })
    if (bestIndex < 0 || bestRange === 0) break
    const samples = [...box[bestIndex]].sort((a, b) => a[bestChannel] - b[bestChannel])
    const middle = Math.floor(samples.length / 2)
    box.splice(bestIndex, 1, samples.slice(0, middle), samples.slice(middle))
  }
  return box
}

function average(samples: Rgb[]): Rgb {
  let r = 0
  let g = 0
  let b = 0
  for (const sample of samples) {
    r += sample.r
    g += sample.g
    b += sample.b
  }
  return { r: r / samples.length, g: g / samples.length, b: b / samples.length }
}

/** Dominant colors of an RGBA buffer, most common first. */
export function dominantColors(pixels: Uint8ClampedArray, options: ExtractOptions = {}): Swatch[] {
  const step = Math.max(1, Math.floor(options.step ?? 1))
  const minAlpha = options.minAlpha ?? 128
  const samples: Rgb[] = []
  for (let i = 0; i < pixels.length - 3; i += 4 * step) {
    if (pixels[i + 3] < minAlpha) continue
    samples.push({ r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] })
  }
  if (samples.length === 0) return []
  const boxes = split([samples], Math.max(2, options.colors ?? 8)).filter((box) => box.length > 0)
  return boxes
    .map((box) => {
      const rgb = average(box)
      return { color: rgbToHex(rgb), rgb, weight: box.length / samples.length }
    })
    .sort((a, b) => b.weight - a.weight)
}

/* ── Color helpers ───────────────────────────────────────────────────────── */

/** 0–1 saturation (HSL definition). */
function saturation({ r, g, b }: Rgb): number {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  if (max === min) return 0
  const lightness = (max + min) / 2
  return (max - min) / (lightness > 0.5 ? 2 - max - min : max + min)
}

function hue({ r, g, b }: Rgb): number {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max === min) return 0
  const d = max - min
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (h * 60) % 360
}

function hueDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

/** Darken or lighten `color` until it reaches `target` contrast against `against`. */
function ensureContrast(color: string, against: string, target = AA_RATIO): string {
  const toward = luminance(against) > 0.4 ? '#000000' : '#FFFFFF'
  let result = color
  for (let amount = 0.05; amount <= 1 && contrastRatio(result, against) < target; amount += 0.05) {
    result = mix(color, toward, amount)
  }
  return result
}

/**
 * Make sure button text can be readable on a brand color: the mid-luminance
 * band where neither white nor near-black reaches AA is pushed out of.
 */
function ensureReadableBrand(color: string, palette: Pick<Palette, 'background' | 'text'>): string {
  const best = (candidate: string) => contrastRatio(onColor(candidate, palette), candidate)
  let result = color
  for (let i = 0; i < 24 && best(result) < AA_RATIO; i++) {
    result = mix(result, luminance(result) < 0.19 ? '#000000' : '#FFFFFF', 0.06)
  }
  return result
}

/* ── Extraction ──────────────────────────────────────────────────────────── */

/**
 * A theme palette derived from image pixels: the most saturated dominant color
 * becomes `primary`, the next (furthest in hue) becomes `accent`, and the
 * neutrals are built from the image's dominant color so the page feels tinted
 * by the photo rather than plain grey.
 */
export function extractPalette(pixels: Uint8ClampedArray, options: ExtractOptions = {}): Palette {
  const swatches = dominantColors(pixels, options)
  const FALLBACK: Palette = {
    background: '#FFFFFF',
    surface: '#F5F5F6',
    text: '#17171A',
    mutedText: '#55555E',
    primary: '#2D3B45',
    secondary: '#50606B',
    accent: '#B4530B',
    border: '#E3E3E7',
  }
  if (swatches.length === 0) return FALLBACK

  // Brand candidates: saturated and common, saturation first.
  const ranked = [...swatches].sort(
    (a, b) => saturation(b.rgb) * Math.sqrt(b.weight) - saturation(a.rgb) * Math.sqrt(a.weight),
  )
  const primarySource = ranked[0]
  const accentSource =
    ranked
      .slice(1)
      .sort(
        (a, b) =>
          hueDistance(hue(b.rgb), hue(primarySource.rgb)) - hueDistance(hue(a.rgb), hue(primarySource.rgb)),
      )
      .find((swatch) => saturation(swatch.rgb) > 0.08) ?? ranked[ranked.length - 1]
  const secondarySource = ranked[1] ?? primarySource

  const dominant = swatches[0].color
  const imageIsDark = swatches.reduce((sum, s) => sum + luminance(s.color) * s.weight, 0) < 0.4
  const dark = options.mode === 'dark' || (options.mode !== 'light' && imageIsDark)

  // Neutrals: a heavy tint of the dominant color, so the page keeps the photo's cast.
  const background = dark ? mix(dominant, '#07070A', 0.86) : mix(dominant, '#FFFFFF', 0.92)
  const surface = dark ? mix(background, '#FFFFFF', 0.07) : mix(background, '#FFFFFF', 0.6)
  const text = ensureContrast(
    dark ? mix(dominant, '#FFFFFF', 0.9) : mix(dominant, '#0A0A0C', 0.88),
    background,
  )
  const palette: Palette = {
    background,
    surface,
    text: ensureContrast(text, surface),
    mutedText: ensureContrast(mix(text, background, 0.42), background),
    primary: primarySource.color,
    secondary: secondarySource.color,
    accent: accentSource.color,
    border: mix(background, text, dark ? 0.22 : 0.14),
  }
  const base = { background: palette.background, text: palette.text }
  palette.primary = ensureReadableBrand(palette.primary, base)
  palette.secondary = ensureReadableBrand(palette.secondary, base)
  palette.accent = ensureReadableBrand(palette.accent, base)
  // `text` was fixed against the surface; re-check it against the background.
  palette.text = ensureContrast(palette.text, palette.background)
  palette.mutedText = ensureContrast(palette.mutedText, palette.background)
  return palette
}
