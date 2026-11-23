import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { isLocale, type Locale } from '@/schemas/fields'
import { DEFAULT_TIMEZONE } from '@/lib/config'
import { LOCALE_COOKIE, LOCALE_HEADER, negotiateLocale } from './config'
import { loadMessages } from './messages'

/** Resolve the platform locale for the current request (see ./config.ts). */
export async function resolveRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers()
  const fromHeader = requestHeaders.get(LOCALE_HEADER)
  if (isLocale(fromHeader)) return fromHeader
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value
  if (isLocale(fromCookie)) return fromCookie
  return negotiateLocale(requestHeaders.get('accept-language'))
}

export default getRequestConfig(async ({ locale: override }) => {
  // An explicit locale (e.g. `getTranslations({ locale: 'ar' })` in emails)
  // wins and avoids touching request APIs.
  const locale: Locale = isLocale(override) ? override : await resolveRequestLocale()
  return {
    locale,
    messages: await loadMessages(locale),
    timeZone: DEFAULT_TIMEZONE,
  }
})
