/**
 * Shared field schemas used by site content and by every block's content schema.
 * Isomorphic: safe to import from server and client code.
 */
import { z } from 'zod'

/* ── Locales ─────────────────────────────────────────────────────────────── */

export const LOCALES = ['en', 'ar'] as const
export const localeSchema = z.enum(LOCALES)
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const RTL_LOCALES: readonly Locale[] = ['ar']

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export function dirOf(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
}

/* ── Localized text ──────────────────────────────────────────────────────── */

export const MAX_TEXT_LENGTH = 20_000

/**
 * A text value per language. Strings may contain a small inline-HTML subset
 * (b, strong, i, em, u, a, span, mark, br) produced by the inline editor;
 * everything else is stripped on save by `sanitizeInlineHtml`.
 */
export const localizedSchema = z.object({
  en: z.string().max(MAX_TEXT_LENGTH).optional(),
  ar: z.string().max(MAX_TEXT_LENGTH).optional(),
})
export type Localized = z.infer<typeof localizedSchema>

/** Build a Localized value: `loc('Hello', 'مرحبا')`. */
export function loc(en: string, ar?: string): Localized {
  return ar === undefined ? { en } : { en, ar }
}

/**
 * Read a Localized (or plain string) value for a locale.
 * Falls back to the other language unless `fallback` is false.
 */
export function pick(
  value: Localized | string | null | undefined,
  locale: Locale,
  fallback: boolean = true,
): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  const own = value[locale]
  if (own !== undefined && own !== '') return own
  if (!fallback) return ''
  for (const other of LOCALES) {
    const v = value[other]
    if (v !== undefined && v !== '') return v
  }
  return ''
}

export function isLocalizedEmpty(value: Localized | string | null | undefined): boolean {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  return LOCALES.every((l) => !value[l] || value[l]!.trim() === '')
}

/** Strip tags from an inline-HTML string to get plain text (for alt, meta, aria). */
export function plainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/* ── Primitives ──────────────────────────────────────────────────────────── */

export const idSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[A-Za-z0-9_-]+$/, 'Only letters, numbers, "-" and "_"')

export const hexColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Expected a hex color like #1A2B3C')

export const urlishSchema = z.string().max(2000)

/* ── Links ───────────────────────────────────────────────────────────────── */

export const LINK_TYPES = [
  'none',
  'page', // value = page id
  'anchor', // value = section anchor (without #)
  'url', // value = absolute or relative URL
  'email', // value = email address
  'phone', // value = phone number
  'whatsapp', // value = phone number in international format
  'file', // value = file URL (e.g. CV)
  'booking', // value = meeting type id or '' for the booking modal
] as const
export const linkTypeSchema = z.enum(LINK_TYPES)
export type LinkType = (typeof LINK_TYPES)[number]

export const linkSchema = z.object({
  type: linkTypeSchema,
  value: z.string().max(2000),
  newTab: z.boolean().optional(),
})
export type LinkRef = z.infer<typeof linkSchema>

export const NO_LINK: LinkRef = { type: 'none', value: '' }

/* ── Media ───────────────────────────────────────────────────────────────── */

export const IMAGE_FILTERS = ['none', 'grayscale', 'warm', 'cool', 'duotone'] as const

export const attributionSchema = z.object({
  name: z.string().max(200),
  url: z.string().max(500).optional(),
  source: z.string().max(60).optional(),
})
export type Attribution = z.infer<typeof attributionSchema>

export const imageSchema = z.object({
  url: urlishSchema,
  alt: localizedSchema.optional(),
  assetId: z.string().max(64).optional(),
  width: z.number().int().positive().max(20000).optional(),
  height: z.number().int().positive().max(20000).optional(),
  /** Focal point as fractions (0–1) used for object-position. */
  focal: z.object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) }).optional(),
  /** Crop rectangle as fractions (0–1) of the original image. */
  crop: z
    .object({
      x: z.number().min(0).max(1),
      y: z.number().min(0).max(1),
      w: z.number().min(0).max(1),
      h: z.number().min(0).max(1),
    })
    .optional(),
  filter: z.enum(IMAGE_FILTERS).optional(),
  attribution: attributionSchema.optional(),
})
export type ImageRef = z.infer<typeof imageSchema>

export const videoSchema = z.object({
  /** mp4/webm file URL, or a YouTube / Vimeo page URL. */
  url: urlishSchema,
  provider: z.enum(['file', 'youtube', 'vimeo']).optional(),
  poster: imageSchema.optional(),
  title: localizedSchema.optional(),
})
export type VideoRef = z.infer<typeof videoSchema>

/* ── Buttons ─────────────────────────────────────────────────────────────── */

export const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'link'] as const

export const buttonSchema = z.object({
  label: localizedSchema,
  link: linkSchema,
  style: z.enum(BUTTON_VARIANTS).optional(),
  /** Lucide icon name shown after the label, e.g. "arrow-up-right". */
  icon: z.string().max(40).optional(),
})
export type ButtonRef = z.infer<typeof buttonSchema>

/* ── Social ──────────────────────────────────────────────────────────────── */

export const SOCIAL_PLATFORMS = [
  'instagram',
  'linkedin',
  'x',
  'facebook',
  'youtube',
  'tiktok',
  'github',
  'behance',
  'dribbble',
  'whatsapp',
  'telegram',
  'snapchat',
  'pinterest',
  'spotify',
  'soundcloud',
  'medium',
  'twitch',
  'discord',
  'threads',
  'website',
  'email',
] as const
export const socialPlatformSchema = z.enum(SOCIAL_PLATFORMS)
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]

export const socialLinkSchema = z.object({
  platform: socialPlatformSchema,
  url: z.string().max(500),
})
export type SocialLink = z.infer<typeof socialLinkSchema>
