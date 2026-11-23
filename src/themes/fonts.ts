/**
 * Font registry (SPEC §8.4, TEMPLATES §18). Every family here is self-hosted:
 * `npm run fonts:sync` downloads the files from Google Fonts into
 * `public/fonts/<id>/` and writes `public/fonts/<id>.css`.
 *
 * Sites load only the families their theme uses (one small CSS file each), so
 * there are no third-party font requests at runtime and no unused @font-face.
 *
 * Isomorphic.
 */
import type { Locale } from '@/schemas/fields'
import type { FontRef, Theme } from '@/schemas/site'
import manifest from './font-manifest.json'

export type FontCategory = 'sans' | 'serif' | 'display' | 'mono' | 'handwriting'
export type FontScript = 'latin' | 'arabic' | 'both'

export interface FontFamily {
  /** Kebab-case id; also the folder and CSS file name under /public/fonts. */
  id: string
  /** CSS family name, exactly as on Google Fonts. */
  family: string
  category: FontCategory
  script: FontScript
  /** Variable font weight range, or the list of static weights to download. */
  weights: { variable: [number, number] } | { static: number[] }
  /** Download italic styles too (only where the design needs them). */
  italic?: boolean
}

const v = (min: number, max: number) => ({ variable: [min, max] as [number, number] })
const s = (...weights: number[]) => ({ static: weights })

export const FONT_FAMILIES: FontFamily[] = [
  // ── Latin: sans ────────────────────────────────────────────────────────
  { id: 'inter', family: 'Inter', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'space-grotesk', family: 'Space Grotesk', category: 'sans', script: 'latin', weights: v(300, 700) },
  { id: 'sora', family: 'Sora', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'dm-sans', family: 'DM Sans', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'poppins', family: 'Poppins', category: 'sans', script: 'latin', weights: s(400, 500, 600, 700) },
  { id: 'manrope', family: 'Manrope', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'source-sans-3', family: 'Source Sans 3', category: 'sans', script: 'latin', weights: v(300, 800) },
  {
    id: 'plus-jakarta-sans',
    family: 'Plus Jakarta Sans',
    category: 'sans',
    script: 'latin',
    weights: v(300, 800),
  },
  { id: 'outfit', family: 'Outfit', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'work-sans', family: 'Work Sans', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'montserrat', family: 'Montserrat', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'nunito', family: 'Nunito', category: 'sans', script: 'latin', weights: v(300, 800) },
  { id: 'figtree', family: 'Figtree', category: 'sans', script: 'latin', weights: v(300, 800) },
  {
    id: 'bricolage-grotesque',
    family: 'Bricolage Grotesque',
    category: 'sans',
    script: 'latin',
    weights: v(300, 800),
  },
  // ── Latin: serif ───────────────────────────────────────────────────────
  {
    id: 'playfair-display',
    family: 'Playfair Display',
    category: 'serif',
    script: 'latin',
    weights: v(400, 900),
    italic: true,
  },
  {
    id: 'source-serif-4',
    family: 'Source Serif 4',
    category: 'serif',
    script: 'latin',
    weights: v(300, 700),
    italic: true,
  },
  {
    id: 'cormorant-garamond',
    family: 'Cormorant Garamond',
    category: 'serif',
    script: 'latin',
    weights: v(400, 700),
    italic: true,
  },
  {
    id: 'fraunces',
    family: 'Fraunces',
    category: 'serif',
    script: 'latin',
    weights: v(300, 800),
    italic: true,
  },
  { id: 'lora', family: 'Lora', category: 'serif', script: 'latin', weights: v(400, 700), italic: true },
  {
    id: 'merriweather',
    family: 'Merriweather',
    category: 'serif',
    script: 'latin',
    weights: v(300, 900),
    italic: true,
  },
  {
    id: 'dm-serif-display',
    family: 'DM Serif Display',
    category: 'serif',
    script: 'latin',
    weights: s(400),
    italic: true,
  },
  {
    id: 'instrument-serif',
    family: 'Instrument Serif',
    category: 'serif',
    script: 'latin',
    weights: s(400),
    italic: true,
  },
  {
    id: 'libre-baskerville',
    family: 'Libre Baskerville',
    category: 'serif',
    script: 'latin',
    weights: s(400, 700),
    italic: true,
  },
  // ── Latin: display & mono ──────────────────────────────────────────────
  { id: 'archivo-black', family: 'Archivo Black', category: 'display', script: 'latin', weights: s(400) },
  { id: 'bebas-neue', family: 'Bebas Neue', category: 'display', script: 'latin', weights: s(400) },
  { id: 'syne', family: 'Syne', category: 'display', script: 'latin', weights: v(400, 800) },
  { id: 'unbounded', family: 'Unbounded', category: 'display', script: 'latin', weights: v(300, 800) },
  { id: 'jetbrains-mono', family: 'JetBrains Mono', category: 'mono', script: 'latin', weights: v(300, 800) },
  // ── Arabic (most also cover Latin) ─────────────────────────────────────
  { id: 'readex-pro', family: 'Readex Pro', category: 'sans', script: 'both', weights: v(200, 700) },
  {
    id: 'ibm-plex-sans-arabic',
    family: 'IBM Plex Sans Arabic',
    category: 'sans',
    script: 'both',
    weights: s(300, 400, 500, 600, 700),
  },
  { id: 'tajawal', family: 'Tajawal', category: 'sans', script: 'both', weights: s(300, 400, 500, 700, 800) },
  { id: 'cairo', family: 'Cairo', category: 'sans', script: 'both', weights: v(300, 900) },
  { id: 'almarai', family: 'Almarai', category: 'sans', script: 'arabic', weights: s(300, 400, 700, 800) },
  { id: 'rubik', family: 'Rubik', category: 'sans', script: 'both', weights: v(300, 800) },
  {
    id: 'noto-sans-arabic',
    family: 'Noto Sans Arabic',
    category: 'sans',
    script: 'arabic',
    weights: v(300, 800),
  },
  {
    id: 'noto-kufi-arabic',
    family: 'Noto Kufi Arabic',
    category: 'sans',
    script: 'arabic',
    weights: v(300, 800),
  },
  { id: 'alexandria', family: 'Alexandria', category: 'sans', script: 'both', weights: v(300, 800) },
  { id: 'changa', family: 'Changa', category: 'sans', script: 'both', weights: v(300, 800) },
  { id: 'amiri', family: 'Amiri', category: 'serif', script: 'both', weights: s(400, 700), italic: true },
  {
    id: 'noto-naskh-arabic',
    family: 'Noto Naskh Arabic',
    category: 'serif',
    script: 'arabic',
    weights: v(400, 700),
  },
  { id: 'markazi-text', family: 'Markazi Text', category: 'serif', script: 'both', weights: v(400, 700) },
  { id: 'el-messiri', family: 'El Messiri', category: 'display', script: 'both', weights: v(400, 700) },
  { id: 'reem-kufi', family: 'Reem Kufi', category: 'display', script: 'both', weights: v(400, 700) },
  { id: 'lalezar', family: 'Lalezar', category: 'display', script: 'both', weights: s(400) },
  { id: 'aref-ruqaa', family: 'Aref Ruqaa', category: 'handwriting', script: 'both', weights: s(400, 700) },
]

const BY_FAMILY = new Map(FONT_FAMILIES.map((f) => [f.family.toLowerCase(), f]))
const BY_ID = new Map(FONT_FAMILIES.map((f) => [f.id, f]))

export function getFont(familyOrId: string): FontFamily | undefined {
  return BY_FAMILY.get(familyOrId.toLowerCase()) ?? BY_ID.get(familyOrId)
}

export function isKnownFont(familyOrId: string): boolean {
  return getFont(familyOrId) !== undefined
}

const GENERIC_FALLBACK: Record<FontCategory, string> = {
  sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  display: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  handwriting: 'ui-serif, Georgia, "Times New Roman", serif',
}

const ARABIC_SYSTEM_FALLBACK = '"Segoe UI", Tahoma, "Geeza Pro", "Noto Sans Arabic", '

function quote(family: string): string {
  return `"${family}"`
}

/**
 * CSS font-family stack for a font. For Arabic text, pass the Latin companion
 * as `latinFallback` so mixed Arabic/English text keeps the template's look.
 */
export function fontStack(ref: FontRef, latinFallback?: FontRef): string {
  const font = getFont(ref.family)
  const category = font?.category ?? 'sans'
  const parts = [quote(font?.family ?? ref.family)]
  if (latinFallback && latinFallback.family.toLowerCase() !== ref.family.toLowerCase()) {
    parts.push(quote(getFont(latinFallback.family)?.family ?? latinFallback.family))
  }
  const arabic = font?.script === 'arabic' || font?.script === 'both' ? ARABIC_SYSTEM_FALLBACK : ''
  return `${parts.join(', ')}, ${arabic}${GENERIC_FALLBACK[category]}`
}

/** URL of the self-hosted stylesheet for a family, or undefined if unknown. */
export function fontCssHref(familyOrId: string): string | undefined {
  const font = getFont(familyOrId)
  return font ? `/fonts/${font.id}.css` : undefined
}

/** The heading and body fonts a theme uses for a locale. */
export function themeFontsFor(
  theme: Pick<Theme, 'fonts'>,
  locale: Locale,
): { heading: FontRef; body: FontRef } {
  return locale === 'ar'
    ? { heading: theme.fonts.arabicHeading, body: theme.fonts.arabicBody }
    : { heading: theme.fonts.heading, body: theme.fonts.body }
}

/**
 * Stylesheets to load for a theme in a locale. Arabic pages also load the
 * Latin fonts because names, numbers and English words fall back to them.
 */
export function themeFontHrefs(theme: Pick<Theme, 'fonts'>, locale: Locale): string[] {
  const families =
    locale === 'ar'
      ? [theme.fonts.arabicHeading, theme.fonts.arabicBody, theme.fonts.heading, theme.fonts.body]
      : [theme.fonts.heading, theme.fonts.body]
  const hrefs = families.map((f) => fontCssHref(f.family)).filter((h): h is string => Boolean(h))
  return [...new Set(hrefs)]
}

/* ── Preloading (font-manifest.json, written by scripts/fonts-sync.ts) ───── */

export interface FontFileRef {
  subset: string
  weight: number | 'variable'
  style: 'normal' | 'italic'
  url: string
}

/** Every self-hosted file of a family, or an empty list if it was never synced. */
export function fontFiles(familyOrId: string): FontFileRef[] {
  const font = getFont(familyOrId)
  if (!font) return []
  const files: unknown = (manifest as Record<string, unknown>)[font.id]
  return Array.isArray(files) ? (files as FontFileRef[]) : []
}

/** The upright regular (or variable) file of a family for one subset. */
function regularFile(familyOrId: string, subset: string): FontFileRef | undefined {
  const candidates = fontFiles(familyOrId).filter((f) => f.style === 'normal' && f.subset === subset)
  return (
    candidates.find((f) => f.weight === 'variable') ??
    candidates.find((f) => f.weight === 400) ??
    // Display faces may ship a single non-400 weight (e.g. Bebas Neue).
    candidates.sort((a, b) => Math.abs(Number(a.weight) - 400) - Math.abs(Number(b.weight) - 400))[0]
  )
}

/**
 * woff2 URLs worth `<link rel="preload">`ing for a site: the heading and body
 * font of the rendered locale, in the subset that locale actually reads. One
 * file per family — the rest load on demand through the stylesheet.
 */
export function fontPreloads(theme: Pick<Theme, 'fonts'>, locale: Locale): string[] {
  const fonts = themeFontsFor(theme, locale)
  const subset = locale === 'ar' ? 'arabic' : 'latin'
  const urls = [fonts.heading, fonts.body].map((ref) => regularFile(ref.family, subset)?.url)
  return [...new Set(urls.filter((url): url is string => Boolean(url)))]
}

/* ── Curated pairs (SPEC §8.4: at least 20, each with an Arabic pair) ────── */

export interface FontPair {
  id: string
  name: string
  mood: 'modern' | 'elegant' | 'editorial' | 'friendly' | 'bold' | 'technical' | 'classic'
  heading: string
  body: string
  arabicHeading: string
  arabicBody: string
}

export const FONT_PAIRS: FontPair[] = [
  {
    id: 'grotesk-inter',
    name: 'Space Grotesk + Inter',
    mood: 'modern',
    heading: 'Space Grotesk',
    body: 'Inter',
    arabicHeading: 'Readex Pro',
    arabicBody: 'IBM Plex Sans Arabic',
  },
  {
    id: 'grotesk-tajawal',
    name: 'Space Grotesk + Tajawal',
    mood: 'modern',
    heading: 'Space Grotesk',
    body: 'Space Grotesk',
    arabicHeading: 'Tajawal',
    arabicBody: 'Tajawal',
  },
  {
    id: 'inter-plex',
    name: 'Inter + IBM Plex Sans Arabic',
    mood: 'modern',
    heading: 'Inter',
    body: 'Inter',
    arabicHeading: 'IBM Plex Sans Arabic',
    arabicBody: 'IBM Plex Sans Arabic',
  },
  {
    id: 'playfair-naskh',
    name: 'Playfair Display + Noto Naskh',
    mood: 'editorial',
    heading: 'Playfair Display',
    body: 'Source Serif 4',
    arabicHeading: 'Amiri',
    arabicBody: 'Noto Naskh Arabic',
  },
  {
    id: 'sora-tajawal',
    name: 'Sora + Tajawal',
    mood: 'bold',
    heading: 'Sora',
    body: 'Inter',
    arabicHeading: 'Tajawal',
    arabicBody: 'IBM Plex Sans Arabic',
  },
  {
    id: 'cormorant-messiri',
    name: 'Cormorant + El Messiri',
    mood: 'elegant',
    heading: 'Cormorant Garamond',
    body: 'Inter',
    arabicHeading: 'El Messiri',
    arabicBody: 'Noto Kufi Arabic',
  },
  {
    id: 'archivo-lalezar',
    name: 'Archivo Black + Lalezar',
    mood: 'bold',
    heading: 'Archivo Black',
    body: 'Space Grotesk',
    arabicHeading: 'Lalezar',
    arabicBody: 'Cairo',
  },
  {
    id: 'jetbrains-plex',
    name: 'JetBrains Mono + IBM Plex',
    mood: 'technical',
    heading: 'JetBrains Mono',
    body: 'Inter',
    arabicHeading: 'IBM Plex Sans Arabic',
    arabicBody: 'IBM Plex Sans Arabic',
  },
  {
    id: 'fraunces-ruqaa',
    name: 'Fraunces + Aref Ruqaa',
    mood: 'classic',
    heading: 'Fraunces',
    body: 'Lora',
    arabicHeading: 'Aref Ruqaa',
    arabicBody: 'Noto Naskh Arabic',
  },
  {
    id: 'dmserif-almarai',
    name: 'DM Serif Display + Almarai',
    mood: 'friendly',
    heading: 'DM Serif Display',
    body: 'DM Sans',
    arabicHeading: 'Almarai',
    arabicBody: 'Almarai',
  },
  {
    id: 'poppins-cairo',
    name: 'Poppins + Cairo',
    mood: 'friendly',
    heading: 'Poppins',
    body: 'Poppins',
    arabicHeading: 'Cairo',
    arabicBody: 'Cairo',
  },
  {
    id: 'manrope-readex',
    name: 'Manrope + Readex Pro',
    mood: 'modern',
    heading: 'Manrope',
    body: 'Manrope',
    arabicHeading: 'Readex Pro',
    arabicBody: 'Readex Pro',
  },
  {
    id: 'merriweather-naskh',
    name: 'Merriweather + Noto Naskh',
    mood: 'classic',
    heading: 'Merriweather',
    body: 'Source Sans 3',
    arabicHeading: 'Noto Naskh Arabic',
    arabicBody: 'Noto Sans Arabic',
  },
  {
    id: 'bebas-lalezar',
    name: 'Bebas Neue + Lalezar',
    mood: 'bold',
    heading: 'Bebas Neue',
    body: 'Inter',
    arabicHeading: 'Lalezar',
    arabicBody: 'Noto Kufi Arabic',
  },
  {
    id: 'jakarta-rubik',
    name: 'Plus Jakarta Sans + Rubik',
    mood: 'friendly',
    heading: 'Plus Jakarta Sans',
    body: 'Plus Jakarta Sans',
    arabicHeading: 'Rubik',
    arabicBody: 'Rubik',
  },
  {
    id: 'outfit-tajawal',
    name: 'Outfit + Tajawal',
    mood: 'modern',
    heading: 'Outfit',
    body: 'Inter',
    arabicHeading: 'Tajawal',
    arabicBody: 'Tajawal',
  },
  {
    id: 'instrument-markazi',
    name: 'Instrument Serif + Markazi',
    mood: 'editorial',
    heading: 'Instrument Serif',
    body: 'Inter',
    arabicHeading: 'Markazi Text',
    arabicBody: 'IBM Plex Sans Arabic',
  },
  {
    id: 'syne-alexandria',
    name: 'Syne + Alexandria',
    mood: 'bold',
    heading: 'Syne',
    body: 'Work Sans',
    arabicHeading: 'Alexandria',
    arabicBody: 'Alexandria',
  },
  {
    id: 'unbounded-changa',
    name: 'Unbounded + Changa',
    mood: 'bold',
    heading: 'Unbounded',
    body: 'Figtree',
    arabicHeading: 'Changa',
    arabicBody: 'Noto Sans Arabic',
  },
  {
    id: 'baskerville-amiri',
    name: 'Libre Baskerville + Amiri',
    mood: 'classic',
    heading: 'Libre Baskerville',
    body: 'Source Serif 4',
    arabicHeading: 'Amiri',
    arabicBody: 'Amiri',
  },
  {
    id: 'bricolage-reem',
    name: 'Bricolage Grotesque + Reem Kufi',
    mood: 'friendly',
    heading: 'Bricolage Grotesque',
    body: 'DM Sans',
    arabicHeading: 'Reem Kufi',
    arabicBody: 'Noto Sans Arabic',
  },
  {
    id: 'montserrat-cairo',
    name: 'Montserrat + Cairo',
    mood: 'modern',
    heading: 'Montserrat',
    body: 'Nunito',
    arabicHeading: 'Cairo',
    arabicBody: 'Cairo',
  },
  {
    id: 'lora-naskh',
    name: 'Lora + Noto Naskh',
    mood: 'elegant',
    heading: 'Lora',
    body: 'Lora',
    arabicHeading: 'Noto Naskh Arabic',
    arabicBody: 'Noto Naskh Arabic',
  },
  {
    id: 'worksans-kufi',
    name: 'Work Sans + Noto Kufi',
    mood: 'modern',
    heading: 'Work Sans',
    body: 'Work Sans',
    arabicHeading: 'Noto Kufi Arabic',
    arabicBody: 'Noto Sans Arabic',
  },
]

export function fontPairToThemeFonts(pair: FontPair): Theme['fonts'] {
  return {
    heading: { family: pair.heading },
    body: { family: pair.body },
    arabicHeading: { family: pair.arabicHeading },
    arabicBody: { family: pair.arabicBody },
  }
}
