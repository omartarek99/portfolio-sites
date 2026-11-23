/**
 * Build the SiteRuntime handed to every block. Isomorphic: the public site
 * route, previews, template demos and the editor all go through here.
 */
import type { BlockMode, PostSummary, PublicMeetingType, SiteRuntime } from '@/blocks/types'
import { dirOf, type Locale } from '@/schemas/fields'
import type { SiteContent } from '@/schemas/site'

export interface RuntimeOptions {
  siteId: string
  slug?: string
  content: SiteContent
  /** Requested locale; falls back to the site's default when unsupported. */
  locale?: Locale | null
  mode: BlockMode
  /** URL prefix for internal links ('' on live sites). */
  basePath?: string
  /** Slug of the page being rendered ('' for home). */
  currentSlug?: string
  posts?: PostSummary[]
  meetingTypes?: PublicMeetingType[]
  flags?: Partial<SiteRuntime['flags']>
  apiBase?: string
}

/** The locale a site will actually render in for a requested locale. */
export function resolveSiteLocale(content: Pick<SiteContent, 'locales'>, requested?: Locale | null): Locale {
  return requested && content.locales.includes(requested) ? requested : content.locales[0]
}

export function buildSiteRuntime(options: RuntimeOptions): SiteRuntime {
  const { content } = options
  const locale = resolveSiteLocale(content, options.locale)
  const blogPage = content.pages.find((p) => p.type === 'blogIndex')
  return {
    siteId: options.siteId,
    slug: options.slug,
    locale,
    locales: content.locales,
    dir: dirOf(locale),
    mode: options.mode,
    theme: content.theme,
    basePath: (options.basePath ?? '').replace(/\/+$/, ''),
    currentSlug: options.currentSlug ?? '',
    localePrefix: locale === content.locales[0] ? '' : locale,
    pages: content.pages.map((p) => ({ id: p.id, slug: p.slug, title: p.title, type: p.type, visibility: p.visibility })),
    navigation: content.navigation,
    settings: content.settings,
    posts: options.posts ?? [],
    blogSlug: blogPage?.slug,
    meetingTypes: options.meetingTypes ?? [],
    flags: {
      showBadge: options.flags?.showBadge ?? false,
      pro: options.flags?.pro ?? false,
      analytics: options.flags?.analytics ?? false,
    },
    apiBase: options.apiBase ?? '',
  }
}
