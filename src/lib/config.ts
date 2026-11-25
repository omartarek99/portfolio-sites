/**
 * App-wide constants that are safe to import anywhere (server and client).
 * Rename the product by setting APP_NAME in the environment (SPEC §1).
 */
export const APP_NAME: string = process.env.NEXT_PUBLIC_APP_NAME ?? 'Vizo'

/** Root domain that serves the platform, including port in development. */
export const ROOT_DOMAIN: string = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'localhost:3000'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

/** `http` for localhost-style root domains, `https` otherwise. */
export const ROOT_PROTOCOL: 'http' | 'https' = /^(localhost|127\.0\.0\.1|\[::1\]|.*\.localhost|.*\.test)(:\d+)?$/.test(
  ROOT_DOMAIN,
)
  ? 'http'
  : 'https'

/** Vercel's production domain (set automatically on Vercel), e.g. `vizo.vercel.app`. */
const VERCEL_DOMAIN = process.env.VERCEL_PROJECT_PRODUCTION_URL

/**
 * Absolute origin of the site, e.g. `https://vizo.vercel.app`: NEXT_PUBLIC_APP_URL when
 * set, else Vercel's production domain, else the local root domain.
 */
export const APP_URL: string = (
  process.env.NEXT_PUBLIC_APP_URL ||
  (VERCEL_DOMAIN ? `https://${VERCEL_DOMAIN}` : `${ROOT_PROTOCOL}://${ROOT_DOMAIN}`)
).replace(
  /\/$/,
  '',
)

/** Absolute origin of a user site on its subdomain, e.g. `http://layla.localhost:3000`. */
export function siteOrigin(slug: string): string {
  return `${ROOT_PROTOCOL}://${slug}.${ROOT_DOMAIN}`
}

/** Absolute origin for a custom domain. */
export function customDomainOrigin(hostname: string): string {
  return `https://${hostname}`
}

export const SUPPORT_EMAIL = 'support@' + ROOT_DOMAIN.replace(/:\d+$/, '')

/** Default timezone and phone country code for the product's home market (SPEC §10). */
export const DEFAULT_TIMEZONE = 'Asia/Qatar'
export const DEFAULT_PHONE_COUNTRY_CODE = '+974'
