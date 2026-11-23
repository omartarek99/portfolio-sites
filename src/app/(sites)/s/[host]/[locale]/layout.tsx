import { host as hostParam, locale as localeParam } from 'next/root-params'
import type { ReactNode } from 'react'
import { getSiteForHost } from '@/lib/sites/load'
import { resolveSiteLocale } from '@/lib/sites/runtime'
import { dirOf, isLocale, type Locale } from '@/schemas/fields'
import { themeFontHrefs } from '@/themes/fonts'
import '../../../../globals.css'
import { TEMPLATE_IDS } from '@/templates/registry'

/**
 * Root layout of PUBLISHED USER SITES (and template demos).
 *
 * The proxy rewrites `<slug>.<root>/ar/work` to `/s/<slug>/ar/work`.
 * `host` and `locale` are root params; `locale` is `default` when the URL has
 * no language prefix.
 *
 * `ensureStatic = 'navigation'`: every page under this layout must be
 * producible without request data. The first request for a new URL waits for
 * the full static page, which is then cached until the site is republished
 * (SPEC §4.7). Do not read cookies, headers or uncached data anywhere below —
 * visitor-specific behaviour (forms, booking, chat, analytics) is client-side.
 */
export const ensureStatic = 'navigation'

export async function generateStaticParams() {
  return ['starter', ...TEMPLATE_IDS].map((id) => ({ host: `tpl--${id}`, locale: 'default' }))
}

export default async function SiteRootLayout({ children }: { children: ReactNode }) {
  const hostKey = await hostParam()
  const requested = await localeParam()
  const site = hostKey ? await getSiteForHost(hostKey) : null
  const locale: Locale = site ? resolveSiteLocale(site.content, isLocale(requested) ? requested : null) : 'en'

  return (
    <html lang={locale} dir={dirOf(locale)}>
      <body>
        {site
          ? themeFontHrefs(site.content.theme, locale).map((href) => (
              <link key={href} rel="stylesheet" href={href} precedence="default" />
            ))
          : null}
        {children}
      </body>
    </html>
  )
}
