/**
 * Curated palettes (TEMPLATES §18, SPEC §8.4): 30 palettes in 5 groups plus
 * every template's default palette and three alternatives.
 *
 * Every curated palette passes WCAG AA for the four pairings that decide
 * whether a site is readable (`paletteFailures`): body text and muted text on
 * the page background, body text on a card surface, and button text on the
 * primary color. The template defaults keep the exact hex values from the
 * catalog; the few that miss AA are listed in `KNOWN_CONTRAST_EXCEPTIONS`.
 *
 * Isomorphic.
 */
import type { Localized } from '@/schemas/fields'
import type { Palette } from '@/schemas/site'
import { contrastRatio } from '@/lib/color'
import { onColor } from './css-vars'

export const PALETTE_GROUPS = ['light-neutral', 'dark', 'vibrant', 'earthy', 'gulf'] as const
export type PaletteGroup = (typeof PALETTE_GROUPS)[number]

export interface CuratedPalette {
  id: string
  name: Localized
  group: PaletteGroup
  mode: 'light' | 'dark'
  palette: Palette
}

/* ── Contrast ────────────────────────────────────────────────────────────── */

export const PALETTE_CONTRAST_CHECKS = [
  'text-on-background',
  'muted-on-background',
  'text-on-surface',
  'on-primary',
] as const
export type PaletteContrastCheck = (typeof PALETTE_CONTRAST_CHECKS)[number]

/** AA for normal text. Large text and decorative pairs are not checked here. */
export const AA_RATIO = 4.5

/** The measured ratio of each checked pairing. */
export function paletteContrast(palette: Palette): Record<PaletteContrastCheck, number> {
  return {
    'text-on-background': contrastRatio(palette.text, palette.background),
    'muted-on-background': contrastRatio(palette.mutedText, palette.background),
    'text-on-surface': contrastRatio(palette.text, palette.surface),
    'on-primary': contrastRatio(onColor(palette.primary, palette), palette.primary),
  }
}

export interface ContrastFailure {
  check: PaletteContrastCheck
  ratio: number
}

/** The pairings that miss AA; empty when the palette is safe to ship. */
export function paletteFailures(palette: Palette): ContrastFailure[] {
  return Object.entries(paletteContrast(palette))
    .filter(([, ratio]) => ratio < AA_RATIO)
    .map(([check, ratio]) => ({ check: check as PaletteContrastCheck, ratio: Math.round(ratio * 100) / 100 }))
}

export function paletteMeetsAA(palette: Palette): boolean {
  return paletteFailures(palette).length === 0
}

/* ── The 30 curated palettes ─────────────────────────────────────────────── */

const p = (
  background: string,
  surface: string,
  text: string,
  mutedText: string,
  primary: string,
  secondary: string,
  accent: string,
  border: string,
): Palette => ({ background, surface, text, mutedText, primary, secondary, accent, border })

export const CURATED_PALETTES: CuratedPalette[] = [
  /* ── Light neutrals ──────────────────────────────────────────────────── */
  {
    id: 'paper-white',
    name: { en: 'Paper white', ar: 'أبيض ورقي' },
    group: 'light-neutral',
    mode: 'light',
    palette: p('#FFFFFF', '#F6F6F7', '#18181B', '#52525B', '#18181B', '#3F3F46', '#0F766E', '#E4E4E7'),
  },
  {
    id: 'warm-paper',
    name: { en: 'Warm paper', ar: 'ورق دافئ' },
    group: 'light-neutral',
    mode: 'light',
    palette: p('#FAF7F2', '#FFFFFF', '#1F1D1A', '#5A5349', '#8A5A2B', '#2F3A34', '#B3261E', '#E7DFD2'),
  },
  {
    id: 'cool-grey',
    name: { en: 'Cool grey', ar: 'رمادي بارد' },
    group: 'light-neutral',
    mode: 'light',
    palette: p('#F4F6F8', '#FFFFFF', '#111827', '#4B5563', '#1D4ED8', '#0E7490', '#B45309', '#DDE3EA'),
  },
  {
    id: 'linen',
    name: { en: 'Linen', ar: 'كتان' },
    group: 'light-neutral',
    mode: 'light',
    palette: p('#F5F1EA', '#FFFDF9', '#22201C', '#595247', '#3F5B4C', '#7A5230', '#B3261E', '#E2DACB'),
  },
  {
    id: 'mist',
    name: { en: 'Mist', ar: 'ضباب' },
    group: 'light-neutral',
    mode: 'light',
    palette: p('#F2F5F4', '#FFFFFF', '#15211F', '#4D5957', '#0F766E', '#334155', '#C2410C', '#DCE4E2'),
  },
  {
    id: 'sand-grey',
    name: { en: 'Sand grey', ar: 'رمادي رملي' },
    group: 'light-neutral',
    mode: 'light',
    palette: p('#FBFAF8', '#F2F0EC', '#1C1B19', '#55524C', '#2D3B45', '#6B6057', '#B4530B', '#E4E0D8'),
  },
  /* ── Dark ────────────────────────────────────────────────────────────── */
  {
    id: 'midnight',
    name: { en: 'Midnight', ar: 'منتصف الليل' },
    group: 'dark',
    mode: 'dark',
    palette: p('#0B0D17', '#141729', '#F4F5FB', '#9AA0BC', '#7C5CFF', '#22D3EE', '#F472B6', '#262A45'),
  },
  {
    id: 'graphite',
    name: { en: 'Graphite', ar: 'جرافيت' },
    group: 'dark',
    mode: 'dark',
    palette: p('#0F1115', '#191C22', '#F2F4F7', '#A2AAB6', '#60A5FA', '#34D399', '#FBBF24', '#272B33'),
  },
  {
    id: 'carbon-gold',
    name: { en: 'Carbon & gold', ar: 'فحمي وذهبي' },
    group: 'dark',
    mode: 'dark',
    palette: p('#0A0A0A', '#151515', '#F2F2F2', '#9C9C9C', '#C9A96E', '#F2F2F2', '#D8BE86', '#2A2A2A'),
  },
  {
    id: 'forest-night',
    name: { en: 'Forest night', ar: 'ليل الغابة' },
    group: 'dark',
    mode: 'dark',
    palette: p('#0C1512', '#13201C', '#EAF2EE', '#94A89F', '#34D399', '#7DD3FC', '#FDE68A', '#1F312A'),
  },
  {
    id: 'plum-night',
    name: { en: 'Plum night', ar: 'ليل البرقوق' },
    group: 'dark',
    mode: 'dark',
    palette: p('#140F1C', '#1E1729', '#F4EFFA', '#A79BB8', '#C084FC', '#F472B6', '#67E8F9', '#2C2340'),
  },
  {
    id: 'slate-ocean',
    name: { en: 'Slate ocean', ar: 'محيط رصاصي' },
    group: 'dark',
    mode: 'dark',
    palette: p('#0B1620', '#122230', '#ECF3F8', '#93A6B5', '#38BDF8', '#2DD4BF', '#FDBA74', '#1E3141'),
  },
  /* ── Vibrant ─────────────────────────────────────────────────────────── */
  {
    id: 'electric-lime',
    name: { en: 'Electric lime', ar: 'ليموني كهربائي' },
    group: 'vibrant',
    mode: 'light',
    palette: p('#FFFFFF', '#F4FFE3', '#14160E', '#4D5343', '#3F6212', '#111111', '#65A30D', '#E4EFD1'),
  },
  {
    id: 'hot-coral',
    name: { en: 'Hot coral', ar: 'مرجاني ساخن' },
    group: 'vibrant',
    mode: 'light',
    palette: p('#FFF8F6', '#FFFFFF', '#1C1310', '#5C4842', '#C62E1F', '#0F766E', '#F59E0B', '#F3DED8'),
  },
  {
    id: 'ultraviolet',
    name: { en: 'Ultraviolet', ar: 'بنفسجي فائق' },
    group: 'vibrant',
    mode: 'light',
    palette: p('#FFFFFF', '#F6F3FF', '#16102B', '#504A6B', '#5B21B6', '#0E7490', '#15803D', '#E6E0F7'),
  },
  {
    id: 'candy',
    name: { en: 'Candy', ar: 'حلوى' },
    group: 'vibrant',
    mode: 'light',
    palette: p('#FDF2FF', '#FFFFFF', '#1E1033', '#63547C', '#9333EA', '#BE185D', '#0E7490', '#EFD9FF'),
  },
  {
    id: 'tangerine',
    name: { en: 'Tangerine', ar: 'يوسفي' },
    group: 'vibrant',
    mode: 'light',
    palette: p('#FFFBF2', '#FFFFFF', '#1F1403', '#5C4A2D', '#C2410C', '#0F766E', '#B45309', '#F2E4CC'),
  },
  {
    id: 'neon-night',
    name: { en: 'Neon night', ar: 'ليل نيون' },
    group: 'vibrant',
    mode: 'dark',
    palette: p('#0A0F0D', '#121A17', '#ECFDF5', '#8FB3A5', '#22C55E', '#38BDF8', '#FACC15', '#1C2A24'),
  },
  /* ── Earthy / warm ───────────────────────────────────────────────────── */
  {
    id: 'terracotta',
    name: { en: 'Terracotta', ar: 'طين محروق' },
    group: 'earthy',
    mode: 'light',
    palette: p('#FDF6F0', '#FFFFFF', '#2A1C14', '#67513F', '#9A3412', '#4D7C0F', '#D97706', '#EFDFD2'),
  },
  {
    id: 'olive-grove',
    name: { en: 'Olive grove', ar: 'بستان زيتون' },
    group: 'earthy',
    mode: 'light',
    palette: p('#F6F7F1', '#FFFFFF', '#1F2516', '#525B41', '#4D7C0F', '#7C5A2E', '#A16207', '#E3E7D6'),
  },
  {
    id: 'clay-rose',
    name: { en: 'Clay rose', ar: 'وردي طيني' },
    group: 'earthy',
    mode: 'light',
    palette: p('#FBF2EF', '#FFFFFF', '#2B1A18', '#685047', '#A13D4F', '#4F6257', '#B9633F', '#EEDBD4'),
  },
  {
    id: 'coffee',
    name: { en: 'Coffee', ar: 'قهوة' },
    group: 'earthy',
    mode: 'light',
    palette: p('#F7F2EC', '#FFFEFB', '#261C14', '#615141', '#6F4518', '#2F4F4F', '#9A6B2F', '#E6D9C8'),
  },
  {
    id: 'moss-night',
    name: { en: 'Moss night', ar: 'ليل الطحلب' },
    group: 'earthy',
    mode: 'dark',
    palette: p('#15180F', '#1F2416', '#F1F4E6', '#A4AD8E', '#A3B18A', '#D9A441', '#E9C46A', '#2C3320'),
  },
  {
    id: 'sunbaked',
    name: { en: 'Sunbaked', ar: 'شمس الظهيرة' },
    group: 'earthy',
    mode: 'light',
    palette: p('#FFF7ED', '#FFFFFF', '#2B1C0E', '#66503A', '#B45309', '#7C2D12', '#0E7490', '#F2E0C9'),
  },
  /* ── Gulf-inspired (TEMPLATES §18 names the six) ─────────────────────── */
  {
    id: 'pearl',
    name: { en: 'Pearl', ar: 'لؤلؤ' },
    group: 'gulf',
    mode: 'light',
    palette: p('#F7F4EF', '#FFFFFF', '#1E2B33', '#56646C', '#0F6E7A', '#1E2B33', '#C8A464', '#E4DED2'),
  },
  {
    id: 'desert-dusk',
    name: { en: 'Desert dusk', ar: 'غروب الصحراء' },
    group: 'gulf',
    mode: 'dark',
    palette: p('#2A1E26', '#37282F', '#F3E9DC', '#C7B3AE', '#E07A5F', '#81B29A', '#F2CC8F', '#4A3842'),
  },
  {
    id: 'maroon-gold',
    name: { en: 'Maroon & gold', ar: 'عنابي وذهبي' },
    group: 'gulf',
    mode: 'light',
    palette: p('#FBFAF7', '#FFFFFF', '#1F2A2E', '#636D72', '#7A1E3A', '#1F4E5A', '#B8964F', '#E6DFD1'),
  },
  {
    id: 'sea-sand',
    name: { en: 'Sea & sand', ar: 'بحر ورمل' },
    group: 'gulf',
    mode: 'light',
    palette: p('#F5EFE6', '#FFFFFF', '#14323D', '#4F605C', '#2A9D8F', '#264653', '#E9C46A', '#E0D6C4'),
  },
  {
    id: 'night-souq',
    name: { en: 'Night souq', ar: 'سوق الليل' },
    group: 'gulf',
    mode: 'dark',
    palette: p('#121212', '#1C1C1C', '#F5F5F5', '#A8A8A8', '#E76F51', '#E9C46A', '#F4A261', '#2E2E2E'),
  },
  {
    id: 'palm',
    name: { en: 'Palm', ar: 'نخيل' },
    group: 'gulf',
    mode: 'light',
    palette: p('#F4F7F2', '#FFFFFF', '#1C2B22', '#4C5D54', '#2D6A4F', '#1B4332', '#D4A373', '#DCE5DA'),
  },
]

const BY_ID = new Map(CURATED_PALETTES.map((entry) => [entry.id, entry]))

export function getPalette(id: string): CuratedPalette | undefined {
  return BY_ID.get(id)
}

export function palettesByGroup(): Record<PaletteGroup, CuratedPalette[]> {
  const groups = Object.fromEntries(PALETTE_GROUPS.map((group) => [group, [] as CuratedPalette[]])) as Record<
    PaletteGroup,
    CuratedPalette[]
  >
  for (const entry of CURATED_PALETTES) groups[entry.group].push(entry)
  return groups
}

/* ── Template palettes (TEMPLATES §0: default + 3 alternatives) ──────────── */

export interface TemplatePaletteSet {
  templateId: string
  /** The exact hex values from docs/TEMPLATES.md. */
  default: Palette
  /** Curated palettes that suit the template's style. */
  alternatives: CuratedPalette[]
}

/** Default palette + the ids of three curated palettes that suit the style. */
const TEMPLATE_SPECS: { templateId: string; default: Palette; alternatives: [string, string, string] }[] = [
  {
    templateId: 'aurora',
    default: p('#0A0710', '#151020', '#F5F0FF', '#A99DBF', '#C63BD6', '#7B3FE4', '#FF6FAE', '#2A1F3D'),
    alternatives: ['plum-night', 'slate-ocean', 'graphite'],
  },
  {
    templateId: 'editorial',
    default: p('#FFFFFF', '#FFF4F0', '#331811', '#76574D', '#E8603F', '#61291C', '#FFD2C7', '#F0E1DB'),
    alternatives: ['warm-paper', 'linen', 'coffee'],
  },
  {
    templateId: 'launch',
    default: p('#FFFFFF', '#F3F8FE', '#10223F', '#5A6678', '#1572D3', '#0A2A5C', '#FFB020', '#E3EBF5'),
    alternatives: ['cool-grey', 'ultraviolet', 'paper-white'],
  },
  {
    templateId: 'minimal-cv',
    default: p('#FFFFFF', '#F3F8FE', '#10223F', '#5A6678', '#1572D3', '#0A2A5C', '#FFB020', '#E3EBF5'),
    alternatives: ['paper-white', 'mist', 'cool-grey'],
  },
  {
    templateId: 'noir-lens',
    default: p('#141A12', '#1D2519', '#F3F6EF', '#A9B5A0', '#B5D98A', '#6E8F55', '#E9F2DE', '#2E3929'),
    alternatives: ['carbon-gold', 'night-souq', 'graphite'],
  },
  {
    templateId: 'grid-pop',
    default: p('#FFFFFF', '#F3F3F3', '#191A23', '#55565F', '#B9FF66', '#191A23', '#B9FF66', '#191A23'),
    alternatives: ['electric-lime', 'hot-coral', 'candy'],
  },
  {
    templateId: 'terminal',
    default: p('#0A0710', '#151020', '#F5F0FF', '#A99DBF', '#C63BD6', '#7B3FE4', '#FF6FAE', '#2A1F3D'),
    alternatives: ['graphite', 'neon-night', 'forest-night'],
  },
  {
    templateId: 'atelier',
    default: p('#FFFFFF', '#FFF4F0', '#331811', '#76574D', '#E8603F', '#61291C', '#FFD2C7', '#F0E1DB'),
    alternatives: ['linen', 'terracotta', 'coffee'],
  },
  {
    templateId: 'bloom-coach',
    default: p('#141A12', '#1D2519', '#F3F6EF', '#A9B5A0', '#B5D98A', '#6E8F55', '#E9F2DE', '#2E3929'),
    alternatives: ['clay-rose', 'sunbaked', 'terracotta'],
  },
  {
    templateId: 'majlis',
    default: p('#FFFFFF', '#FFF4F0', '#331811', '#76574D', '#E8603F', '#61291C', '#FFD2C7', '#F0E1DB'),
    alternatives: ['maroon-gold', 'pearl', 'sea-sand'],
  },
  {
    templateId: 'creator-hub',
    default: p('#181818', '#1F1F1F', '#FFFFFF', '#A3A3A3', '#EE10B0', '#0E9EEF', '#EE10B0', '#2B2B2B'),
    alternatives: ['candy', 'ultraviolet', 'hot-coral'],
  },
  {
    templateId: 'blueprint',
    default: p('#FFFFFF', '#F4F5F8', '#0F1629', '#5B6274', '#0F1629', '#141D35', '#3B6FD8', '#E2E5EC'),
    alternatives: ['sand-grey', 'paper-white', 'mist'],
  },
  {
    templateId: 'scholar',
    default: p('#FFFFFF', '#F3F8FE', '#10223F', '#5A6678', '#1572D3', '#0A2A5C', '#FFB020', '#E3EBF5'),
    alternatives: ['cool-grey', 'mist', 'pearl'],
  },
  {
    templateId: 'motion-reel',
    default: p('#181818', '#1F1F1F', '#FFFFFF', '#A3A3A3', '#EE10B0', '#0E9EEF', '#EE10B0', '#2B2B2B'),
    alternatives: ['night-souq', 'carbon-gold', 'midnight'],
  },
  {
    templateId: 'bento',
    default: p('#FFFFFF', '#F3F3F3', '#191A23', '#55565F', '#B9FF66', '#191A23', '#B9FF66', '#191A23'),
    alternatives: ['paper-white', 'cool-grey', 'graphite'],
  },
  {
    templateId: 'founder',
    default: p('#FFFFFF', '#F4F5F8', '#0F1629', '#5B6274', '#0F1629', '#141D35', '#3B6FD8', '#E2E5EC'),
    alternatives: ['ultraviolet', 'cool-grey', 'midnight'],
  },
]

export const TEMPLATE_PALETTES: Record<string, TemplatePaletteSet> = Object.fromEntries(
  TEMPLATE_SPECS.map((spec) => [
    spec.templateId,
    {
      templateId: spec.templateId,
      default: spec.default,
      alternatives: spec.alternatives.map((id) => {
        const entry = getPalette(id)
        if (!entry) throw new Error(`Unknown curated palette "${id}" for template "${spec.templateId}"`)
        return entry
      }),
    },
  ]),
)

export function templatePalettes(templateId: string): TemplatePaletteSet | undefined {
  return TEMPLATE_PALETTES[templateId]
}

/**
 * Template defaults keep the catalog's hex values even where a pairing misses
 * AA by a little. Measured, not guessed — blocks can lift those cases (larger
 * or heavier text, a darker surface) and the palette picker can warn.
 */
export interface ContrastException extends ContrastFailure {
  templateId: string
}

export const KNOWN_CONTRAST_EXCEPTIONS: ContrastException[] = TEMPLATE_SPECS.flatMap((spec) =>
  paletteFailures(spec.default).map((failure) => ({ templateId: spec.templateId, ...failure })),
)
