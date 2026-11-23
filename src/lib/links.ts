/**
 * Turn LinkRef values from site content into safe hrefs. Isomorphic.
 */
import type { SiteRuntime } from '@/blocks/types'
import { pick, type LinkRef, type Locale, type Localized, type SocialPlatform } from '@/schemas/fields'

export interface ResolvedLink {
  href?: string
  target?: '_blank'
  rel?: string
  /** Suggest downloading (CV and other files). */
  download?: boolean
  /** Opens the booking modal instead of navigating; value is a meeting type id or ''. */
  booking?: string
  external: boolean
}

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:', 'sms:'])

/**
 * Return the URL if it is safe to put in an href, otherwise undefined.
 * Blocks `javascript:`, `data:`, `vbscript:` and anything unparseable.
 */
export function safeUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined
  const trimmed = url.trim()
  if (trimmed === '') return undefined
  if (trimmed.startsWith('#') || (trimmed.startsWith('/') && !trimmed.startsWith('//'))) return trimmed
  try {
    const parsed = new URL(trimmed)
    return SAFE_PROTOCOLS.has(parsed.protocol) ? trimmed : undefined
  } catch {
    // Bare domains like "example.com/path" → assume https.
    if (/^[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(trimmed)) return `https://${trimmed}`
    return undefined
  }
}

/** Digits only, for wa.me links. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, '')
}

export function whatsappUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizePhone(phone)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

function joinPath(...parts: string[]): string {
  const joined = parts
    .map((p) => p.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')
  return `/${joined}`
}

/** Href of a page by slug in the current locale, honouring basePath. */
export function pageHref(site: Pick<SiteRuntime, 'basePath' | 'localePrefix'>, slug: string): string {
  return joinPath(site.basePath, site.localePrefix, slug)
}

/** Href of the same page in another locale (for the language switcher). */
export function localeHref(
  site: Pick<SiteRuntime, 'basePath' | 'locales' | 'currentSlug'>,
  locale: Locale,
): string {
  const prefix = locale === site.locales[0] ? '' : locale
  return joinPath(site.basePath, prefix, site.currentSlug)
}

/** Href of a blog post. */
export function postHref(site: Pick<SiteRuntime, 'basePath' | 'localePrefix' | 'blogSlug'>, postSlug: string): string {
  return joinPath(site.basePath, site.localePrefix, site.blogSlug ?? 'blog', postSlug)
}

/** Resolve a LinkRef for rendering. */
export function resolveLink(site: SiteRuntime, link: LinkRef | undefined | null): ResolvedLink {
  if (!link || link.type === 'none') return { external: false }
  const blank = link.newTab ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}
  switch (link.type) {
    case 'page': {
      const page = site.pages.find((p) => p.id === link.value) ?? site.pages.find((p) => p.slug === link.value)
      if (!page) return { external: false }
      return { href: pageHref(site, page.slug), external: false, ...blank }
    }
    case 'anchor': {
      const anchor = link.value.replace(/^#/, '')
      if (!anchor) return { external: false }
      // On the home page a bare hash keeps the scroll smooth; elsewhere go home first.
      return {
        href: site.currentSlug === '' ? `#${anchor}` : `${pageHref(site, '')}#${anchor}`,
        external: false,
      }
    }
    case 'url': {
      const href = safeUrl(link.value)
      if (!href) return { external: false }
      const external = /^https?:\/\//i.test(href)
      return {
        href,
        external,
        ...(external && link.newTab !== false ? { target: '_blank' as const, rel: 'noopener noreferrer' } : blank),
      }
    }
    case 'email':
      return link.value ? { href: `mailto:${link.value.trim()}`, external: true } : { external: false }
    case 'phone':
      return link.value ? { href: `tel:${link.value.replace(/[^\d+]/g, '')}`, external: true } : { external: false }
    case 'whatsapp': {
      if (!link.value) return { external: false }
      const message = pick(site.settings.floatingContact?.whatsappMessage, site.locale)
      return {
        href: whatsappUrl(link.value, message || undefined),
        external: true,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    }
    case 'file': {
      const href = safeUrl(link.value)
      return href ? { href, external: true, download: true, target: '_blank', rel: 'noopener noreferrer' } : { external: false }
    }
    case 'booking':
      return { booking: link.value, external: false }
    default:
      return { external: false }
  }
}

/** Profile URL for a social link value that may be a handle or a full URL. */
export function socialUrl(platform: SocialPlatform, value: string): string | undefined {
  const v = value.trim()
  if (!v) return undefined
  if (/^https?:\/\//i.test(v)) return safeUrl(v)
  const handle = v.replace(/^@/, '')
  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${handle}`
    case 'linkedin':
      return `https://www.linkedin.com/in/${handle}`
    case 'x':
      return `https://x.com/${handle}`
    case 'facebook':
      return `https://facebook.com/${handle}`
    case 'youtube':
      return `https://youtube.com/@${handle}`
    case 'tiktok':
      return `https://tiktok.com/@${handle}`
    case 'github':
      return `https://github.com/${handle}`
    case 'behance':
      return `https://behance.net/${handle}`
    case 'dribbble':
      return `https://dribbble.com/${handle}`
    case 'whatsapp':
      return whatsappUrl(v)
    case 'telegram':
      return `https://t.me/${handle}`
    case 'snapchat':
      return `https://snapchat.com/add/${handle}`
    case 'pinterest':
      return `https://pinterest.com/${handle}`
    case 'medium':
      return `https://medium.com/@${handle}`
    case 'twitch':
      return `https://twitch.tv/${handle}`
    case 'threads':
      return `https://threads.net/@${handle}`
    case 'email':
      return `mailto:${v}`
    default:
      return safeUrl(v)
  }
}

export const SOCIAL_LABELS: Record<SocialPlatform, Localized> = {
  instagram: { en: 'Instagram', ar: 'إنستغرام' },
  linkedin: { en: 'LinkedIn', ar: 'لينكدإن' },
  x: { en: 'X', ar: 'إكس' },
  facebook: { en: 'Facebook', ar: 'فيسبوك' },
  youtube: { en: 'YouTube', ar: 'يوتيوب' },
  tiktok: { en: 'TikTok', ar: 'تيك توك' },
  github: { en: 'GitHub', ar: 'غيت هب' },
  behance: { en: 'Behance', ar: 'بيهانس' },
  dribbble: { en: 'Dribbble', ar: 'دريبل' },
  whatsapp: { en: 'WhatsApp', ar: 'واتساب' },
  telegram: { en: 'Telegram', ar: 'تيليغرام' },
  snapchat: { en: 'Snapchat', ar: 'سناب شات' },
  pinterest: { en: 'Pinterest', ar: 'بنترست' },
  spotify: { en: 'Spotify', ar: 'سبوتيفاي' },
  soundcloud: { en: 'SoundCloud', ar: 'ساوند كلاود' },
  medium: { en: 'Medium', ar: 'ميديم' },
  twitch: { en: 'Twitch', ar: 'تويتش' },
  discord: { en: 'Discord', ar: 'ديسكورد' },
  threads: { en: 'Threads', ar: 'ثريدز' },
  website: { en: 'Website', ar: 'الموقع' },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },
}
