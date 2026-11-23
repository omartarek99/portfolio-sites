/**
 * Platform i18n (marketing, dashboard, editor chrome, team, admin) with next-intl.
 *
 * The platform locale is NOT a URL segment. It is resolved per request from,
 * in order: an explicit override, the `x-sc-locale` header that the proxy sets
 * for `/ar/...` marketing URLs, the NEXT_LOCALE cookie, then Accept-Language.
 *
 * User sites do not use next-intl at all: their locale comes from the site
 * URL (`/ar/...`) and block UI strings come from `src/blocks/_shared/strings`.
 */
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/schemas/fields'

export { DEFAULT_LOCALE, LOCALES, type Locale }

export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const LOCALE_HEADER = 'x-sc-locale'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
}

/**
 * Message namespaces. One JSON file per namespace per locale in
 * `src/i18n/messages/<locale>/<namespace>.json`.
 *
 * Each feature area owns its namespace file(s) — never add keys to a namespace
 * you do not own; put shared strings in `common`.
 */
export const NAMESPACES = [
  'common', // shared words, accessibility labels
  'nav', // header, footer
  'marketing', // page content
] as const
export type Namespace = (typeof NAMESPACES)[number]

/** Pick a supported locale from an Accept-Language header. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const preferred = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .filter((entry) => !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q)
  for (const { tag } of preferred) {
    const base = tag.split('-')[0]
    const match = LOCALES.find((l) => l === base)
    if (match) return match
  }
  return DEFAULT_LOCALE
}
