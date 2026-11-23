/**
 * Site content data model (SPEC §6). A site is JSON data; blocks are React
 * components. The editor edits this JSON and never generates code.
 *
 * Structural validation lives here. Per-block content validation lives with
 * each block (`src/blocks/<type>/schema.ts`) and is applied by
 * `validateSiteContent` in `src/blocks/validate.ts`.
 */
import { z } from 'zod'
import {
  hexColorSchema,
  idSchema,
  linkSchema,
  localeSchema,
  localizedSchema,
  socialLinkSchema,
  type Locale,
} from './fields'

export const CURRENT_SITE_VERSION = 1

/* ── Limits (SPEC §6) ────────────────────────────────────────────────────── */

export const MAX_PAGES_PER_SITE = 25
export const MAX_SECTIONS_PER_PAGE = 40
export const MAX_ITEMS_PER_BLOCK = 50
export const MAX_NAV_ITEMS = 12

/* ── Blocks ──────────────────────────────────────────────────────────────── */

export const BLOCK_TYPES = [
  'hero',
  'about',
  'experience',
  'education',
  'projects',
  'caseStudy',
  'skills',
  'services',
  'testimonials',
  'clients',
  'stats',
  'gallery',
  'video',
  'process',
  'faq',
  'pricing',
  'cta',
  'contact',
  'booking',
  'newsletter',
  'linkHub',
  'mediaKit',
  'publications',
  'blogList',
  'richText',
  'embed',
  'freeform',
  'divider',
  'header',
  'footer',
  'announcement',
] as const
export const blockTypeSchema = z.enum(BLOCK_TYPES)
export type BlockType = (typeof BLOCK_TYPES)[number]

/** Blocks that only live in `globalSections`, never in a page's section stack. */
export const GLOBAL_BLOCK_TYPES: readonly BlockType[] = ['header', 'footer', 'announcement']

/* ── Theme ───────────────────────────────────────────────────────────────── */

export const paletteSchema = z.object({
  background: hexColorSchema,
  surface: hexColorSchema,
  text: hexColorSchema,
  mutedText: hexColorSchema,
  primary: hexColorSchema,
  secondary: hexColorSchema,
  accent: hexColorSchema,
  border: hexColorSchema,
})
export type Palette = z.infer<typeof paletteSchema>
export const PALETTE_KEYS = [
  'background',
  'surface',
  'text',
  'mutedText',
  'primary',
  'secondary',
  'accent',
  'border',
] as const satisfies readonly (keyof Palette)[]

/** Reference to a font family from the registry in `src/themes/fonts.ts`. */
export const fontRefSchema = z.object({
  family: z.string().min(1).max(60),
})
export type FontRef = z.infer<typeof fontRefSchema>

export const THEME_MODES = ['light', 'dark'] as const
export const THEME_RADII = ['none', 'sm', 'md', 'lg', 'full'] as const
export const THEME_SPACINGS = ['compact', 'comfortable', 'airy'] as const
export const THEME_MOTIONS = ['none', 'subtle', 'expressive', 'cinematic'] as const
export const BUTTON_STYLES = ['solid', 'outline', 'pill', 'brutal', 'glass'] as const
export const BACKGROUND_TYPES = ['solid', 'gradient', 'pattern', 'noise', 'image'] as const

export const backgroundStyleSchema = z.object({
  type: z.enum(BACKGROUND_TYPES),
  /**
   * solid: hex color · gradient: CSS gradient or preset id · pattern: preset id
   * (see `src/themes/backgrounds.ts`) · noise: intensity 0–1 as string · image: URL.
   */
  value: z.string().max(2000),
})
export type BackgroundStyle = z.infer<typeof backgroundStyleSchema>

export const themeSchema = z.object({
  templateId: z.string().min(1).max(60),
  palette: paletteSchema,
  mode: z.enum(THEME_MODES),
  fonts: z.object({
    heading: fontRefSchema,
    body: fontRefSchema,
    arabicHeading: fontRefSchema,
    arabicBody: fontRefSchema,
  }),
  radius: z.enum(THEME_RADII),
  spacing: z.enum(THEME_SPACINGS),
  motion: z.enum(THEME_MOTIONS),
  backgroundStyle: backgroundStyleSchema.optional(),
  buttonStyle: z.enum(BUTTON_STYLES),
})
export type Theme = z.infer<typeof themeSchema>

/* ── Navigation ──────────────────────────────────────────────────────────── */

const navLeafSchema = z.object({
  id: idSchema,
  label: localizedSchema,
  link: linkSchema,
})
export const navItemSchema = navLeafSchema.extend({
  /** One level of nesting (dropdown). */
  children: z.array(navLeafSchema).max(MAX_NAV_ITEMS).optional(),
})
export type NavItem = z.infer<typeof navItemSchema>

export const NAV_STYLES = ['top', 'side', 'floating', 'minimal'] as const

export const navigationSchema = z.object({
  header: z.array(navItemSchema).max(MAX_NAV_ITEMS),
  footer: z.array(navItemSchema).max(MAX_NAV_ITEMS * 2),
  style: z.enum(NAV_STYLES),
})
export type Navigation = z.infer<typeof navigationSchema>

/* ── Sections ────────────────────────────────────────────────────────────── */

export const SECTION_BACKGROUND_TYPES = [
  'none',
  'surface',
  'primary',
  'secondary',
  'accent',
  'color',
  'gradient',
  'image',
  'pattern',
] as const

export const sectionBackgroundSchema = z.object({
  type: z.enum(SECTION_BACKGROUND_TYPES),
  /** color: hex · gradient: CSS gradient or preset id · image: URL · pattern: preset id. */
  value: z.string().max(2000).optional(),
  /** Darkening overlay (0–1) for image backgrounds. */
  overlay: z.number().min(0).max(1).optional(),
})
export type SectionBackground = z.infer<typeof sectionBackgroundSchema>

export const SECTION_PADDINGS = ['none', 'sm', 'md', 'lg', 'xl'] as const
export const SECTION_WIDTHS = ['narrow', 'normal', 'wide', 'full'] as const

/** Optional overrides of theme tokens for one section. */
export const sectionStyleSchema = z.object({
  background: sectionBackgroundSchema.optional(),
  paddingY: z.enum(SECTION_PADDINGS).optional(),
  width: z.enum(SECTION_WIDTHS).optional(),
  textAlign: z.enum(['start', 'center']).optional(),
  colorScheme: z.enum(['inherit', 'inverted']).optional(),
})
export type SectionStyle = z.infer<typeof sectionStyleSchema>

export const ENTRANCES = [
  'none',
  'fade',
  'slide-up',
  'slide-start',
  'zoom',
  'blur',
  'stagger',
  'parallax',
  'reveal-mask',
] as const
export type Entrance = (typeof ENTRANCES)[number]

export const sectionAnimationSchema = z.object({
  entrance: z.enum(ENTRANCES),
  delayMs: z.number().int().min(0).max(5000).optional(),
})
export type SectionAnimation = z.infer<typeof sectionAnimationSchema>

export const DEVICES = ['mobile', 'tablet', 'desktop'] as const
export type Device = (typeof DEVICES)[number]

export const sectionResponsiveSchema = z.object({
  hideOn: z.array(z.enum(DEVICES)).max(3).optional(),
  /** Variant id used below the `md` breakpoint instead of `variant`. */
  mobileVariant: z.string().max(60).optional(),
})
export type SectionResponsive = z.infer<typeof sectionResponsiveSchema>

export const sectionSchema = z.object({
  id: idSchema,
  blockType: blockTypeSchema,
  /** Layout variant id within the block type. */
  variant: z.string().min(1).max(60),
  /** Validated by the block's own Zod schema; text fields are Localized. */
  content: z.record(z.string(), z.unknown()),
  style: sectionStyleSchema.default({}),
  animation: sectionAnimationSchema.default({ entrance: 'fade' }),
  responsive: sectionResponsiveSchema.default({}),
  /** For one-page navigation: rendered as the section's `id` attribute. */
  anchor: z
    .string()
    .max(60)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .optional(),
  /**
   * True while the section still shows template example content. Drives the
   * "Replace example" badge and the editor checklist (SPEC §9.2). Cleared on
   * first edit.
   */
  example: z.boolean().optional(),
})
export type Section = z.infer<typeof sectionSchema>

/** A section whose content has been validated against its block schema. */
export type TypedSection<C> = Omit<Section, 'content'> & { content: C }

/* ── Pages ───────────────────────────────────────────────────────────────── */

/** '' is the home page. Segments are lowercase kebab-case, nested with '/'. */
export const PAGE_SLUG_REGEX = /^$|^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/

/** First path segments a page slug may not use (routing and locale prefixes). */
export const RESERVED_PAGE_SLUGS: readonly string[] = ['ar', 'en', 'api', '_next', 'fonts', 'stock', 'rss.xml', 'sitemap.xml', 'robots.txt']

export const pageSeoSchema = z.object({
  title: localizedSchema.optional(),
  description: localizedSchema.optional(),
  ogImageUrl: z.string().max(2000).optional(),
  noIndex: z.boolean().optional(),
})
export type PageSeo = z.infer<typeof pageSeoSchema>

export const PAGE_TYPES = ['standard', 'blogIndex', 'link'] as const
export const PAGE_VISIBILITIES = ['public', 'password', 'hidden'] as const

export const pageSchema = z.object({
  id: idSchema,
  slug: z.string().max(120).regex(PAGE_SLUG_REGEX, 'Use lowercase letters, numbers and hyphens'),
  title: localizedSchema,
  type: z.enum(PAGE_TYPES),
  sections: z.array(sectionSchema).max(MAX_SECTIONS_PER_PAGE),
  seo: pageSeoSchema.optional(),
  visibility: z.enum(PAGE_VISIBILITIES),
  /** scrypt hash, only for `visibility: 'password'`. Never sent to the browser. */
  passwordHash: z.string().max(400).optional(),
  /** Target for `type: 'link'` pages (a navigation entry pointing elsewhere). */
  link: linkSchema.optional(),
})
export type Page = z.infer<typeof pageSchema>

/* ── Settings ────────────────────────────────────────────────────────────── */

export const FLOATING_CHANNELS = ['whatsapp', 'phone', 'email', 'telegram', 'instagram', 'linkedin'] as const

export const floatingContactSchema = z.object({
  enabled: z.boolean(),
  channels: z
    .array(
      z.object({
        type: z.enum(FLOATING_CHANNELS),
        /** Phone number, email address, username or profile URL depending on type. */
        value: z.string().max(500),
      }),
    )
    .max(6),
  /** Prefilled WhatsApp message, e.g. "Hi, I found you through your website". */
  whatsappMessage: localizedSchema.optional(),
  position: z.enum(['end', 'start']).optional(),
})
export type FloatingContact = z.infer<typeof floatingContactSchema>

export const siteSettingsSchema = z.object({
  favicon: z.string().max(2000).optional(),
  seo: z.object({
    /** `%s` is replaced by the page title, e.g. "%s — Layla Haddad". */
    titleTemplate: z.string().max(200),
    defaultDescription: localizedSchema.optional(),
    ogImageUrl: z.string().max(2000).optional(),
  }),
  social: z.array(socialLinkSchema).max(20),
  contact: z.object({
    email: z.string().max(200).optional(),
    phone: z.string().max(40).optional(),
    whatsapp: z.string().max(40).optional(),
    address: localizedSchema.optional(),
  }),
  /** Downloadable CV (PDF from the media library). */
  cvFileUrl: z.string().max(2000).optional(),
  cookieBanner: z.boolean(),
  floatingContact: floatingContactSchema.optional(),
  /** Display name used by vCard, JSON-LD and the Open Graph image. */
  ownerName: localizedSchema.optional(),
  /** Short role line used by JSON-LD and the Open Graph image. */
  ownerTitle: localizedSchema.optional(),
})
export type SiteSettings = z.infer<typeof siteSettingsSchema>

/* ── Site content ────────────────────────────────────────────────────────── */

export const globalSectionsSchema = z.object({
  header: sectionSchema.optional(),
  footer: sectionSchema.optional(),
  announcementBar: sectionSchema.optional(),
})
export type GlobalSections = z.infer<typeof globalSectionsSchema>

export const siteContentSchema = z
  .object({
    version: z.literal(CURRENT_SITE_VERSION),
    /** One or both; the first is the default locale. */
    locales: z.array(localeSchema).min(1).max(2),
    theme: themeSchema,
    navigation: navigationSchema,
    pages: z.array(pageSchema).min(1).max(MAX_PAGES_PER_SITE),
    globalSections: globalSectionsSchema,
    settings: siteSettingsSchema,
  })
  .superRefine((site, ctx) => {
    if (new Set(site.locales).size !== site.locales.length) {
      ctx.addIssue({ code: 'custom', path: ['locales'], message: 'Locales must be unique' })
    }
    if (!site.pages.some((p) => p.slug === '')) {
      ctx.addIssue({ code: 'custom', path: ['pages'], message: 'A site needs a home page (slug "")' })
    }
    const pageIds = new Set<string>()
    const slugs = new Set<string>()
    const sectionIds = new Set<string>()
    const checkSection = (id: string, path: (string | number)[]) => {
      if (sectionIds.has(id)) {
        ctx.addIssue({ code: 'custom', path, message: `Duplicate section id "${id}"` })
      }
      sectionIds.add(id)
    }
    site.pages.forEach((page, pi) => {
      if (pageIds.has(page.id)) {
        ctx.addIssue({ code: 'custom', path: ['pages', pi, 'id'], message: `Duplicate page id "${page.id}"` })
      }
      pageIds.add(page.id)
      if (slugs.has(page.slug)) {
        ctx.addIssue({ code: 'custom', path: ['pages', pi, 'slug'], message: `Duplicate page slug "${page.slug}"` })
      }
      slugs.add(page.slug)
      const first = page.slug.split('/')[0]
      if (page.slug !== '' && RESERVED_PAGE_SLUGS.includes(first)) {
        ctx.addIssue({ code: 'custom', path: ['pages', pi, 'slug'], message: `"${first}" is a reserved path` })
      }
      page.sections.forEach((section, si) => {
        checkSection(section.id, ['pages', pi, 'sections', si, 'id'])
        if (GLOBAL_BLOCK_TYPES.includes(section.blockType)) {
          ctx.addIssue({
            code: 'custom',
            path: ['pages', pi, 'sections', si, 'blockType'],
            message: `"${section.blockType}" is a global block and cannot be placed on a page`,
          })
        }
      })
    })
    for (const key of ['header', 'footer', 'announcementBar'] as const) {
      const section = site.globalSections[key]
      if (section) checkSection(section.id, ['globalSections', key, 'id'])
    }
  })

export type SiteContent = z.infer<typeof siteContentSchema>
/** The shape accepted before defaults are applied (e.g. hand-written template JSON). */
export type SiteContentInput = z.input<typeof siteContentSchema>

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export function defaultLocaleOf(site: Pick<SiteContent, 'locales'>): Locale {
  return site.locales[0]
}

export function findPageBySlug(site: Pick<SiteContent, 'pages'>, slug: string): Page | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, '')
  return site.pages.find((p) => p.slug === normalized)
}

export function findPageById(site: Pick<SiteContent, 'pages'>, id: string): Page | undefined {
  return site.pages.find((p) => p.id === id)
}

/** Every section of a site, including global sections. */
export function allSections(site: Pick<SiteContent, 'pages' | 'globalSections'>): Section[] {
  const globals = [site.globalSections.announcementBar, site.globalSections.header, site.globalSections.footer].filter(
    (s): s is Section => Boolean(s),
  )
  return [...globals, ...site.pages.flatMap((p) => p.sections)]
}

/* ── Migrations ──────────────────────────────────────────────────────────── */

type RawSite = Record<string, unknown>

/**
 * Each entry upgrades content from `version` to `version + 1`.
 * Add a new entry whenever CURRENT_SITE_VERSION is bumped.
 */
const MIGRATIONS: Record<number, (raw: RawSite) => RawSite> = {
  // v0 (pre-release drafts): no `version`, no `globalSections`, `settings.cookieBanner`
  // missing, and `locales` stored as a single `locale` string.
  0: (raw) => {
    const next: RawSite = { ...raw, version: 1 }
    if (!Array.isArray(next.locales)) {
      next.locales = typeof raw.locale === 'string' ? [raw.locale] : ['en']
    }
    delete next.locale
    if (typeof next.globalSections !== 'object' || next.globalSections === null) {
      next.globalSections = {}
    }
    const settings = (typeof next.settings === 'object' && next.settings !== null ? next.settings : {}) as RawSite
    next.settings = {
      ...settings,
      seo: (settings.seo as RawSite | undefined) ?? { titleTemplate: '%s' },
      social: Array.isArray(settings.social) ? settings.social : [],
      contact: (settings.contact as RawSite | undefined) ?? {},
      cookieBanner: typeof settings.cookieBanner === 'boolean' ? settings.cookieBanner : false,
    }
    return next
  },
}

export class SiteContentError extends Error {
  constructor(
    message: string,
    public readonly issues: z.core.$ZodIssue[] = [],
  ) {
    super(message)
    this.name = 'SiteContentError'
  }
}

/**
 * Upgrade stored content of any past version to the current schema and
 * validate its structure. Throws `SiteContentError` when it cannot.
 */
export function migrateSiteContent(raw: unknown): SiteContent {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new SiteContentError('Site content must be an object')
  }
  let current = raw as RawSite
  let version = typeof current.version === 'number' ? current.version : 0
  if (version > CURRENT_SITE_VERSION) {
    throw new SiteContentError(
      `Site content version ${version} is newer than this app supports (${CURRENT_SITE_VERSION})`,
    )
  }
  while (version < CURRENT_SITE_VERSION) {
    const migrate = MIGRATIONS[version]
    if (!migrate) throw new SiteContentError(`No migration from site content version ${version}`)
    current = migrate(current)
    version += 1
  }
  const parsed = siteContentSchema.safeParse(current)
  if (!parsed.success) {
    throw new SiteContentError('Site content is invalid', parsed.error.issues)
  }
  return parsed.data
}
