import type { Metadata, Viewport } from 'next'
import { Readex_Pro, Space_Grotesk } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import { APP_NAME, APP_URL } from '@/lib/config'
import { dirOf, type Locale } from '@/schemas/fields'
import '../globals.css'

/**
 * Root layout of the PLATFORM: marketing site, auth, dashboard, editor, team
 * workspace, admin and dev tools.
 *
 * `instant = false` opts the whole platform out of static-shell validation:
 * these routes read the session and the locale cookie and render per request,
 * exactly like a classic server-rendered app. (Public user sites live under
 * `(sites)` and are fully static.)
 */
export const instant = false

const platformFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-platform',
  display: 'swap',
})

// Covers Arabic glyphs when the interface is in Arabic.
const platformArabicFont = Readex_Pro({
  subsets: ['arabic'],
  variable: '--font-platform-ar',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: APP_NAME, template: `%s — ${APP_NAME}` },
  description: `${APP_NAME} designs clean, fast websites, videos and presentations for businesses and creators.`,
  applicationName: APP_NAME,
  // Large share previews; the image is opengraph-image.png / twitter-image.png next to this file.
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#191a23',
  width: 'device-width',
  initialScale: 1,
}

export default async function PlatformLayout({ children }: { children: ReactNode }) {
  const locale = (await getLocale()) as Locale
  return (
    <html suppressHydrationWarning lang={locale} dir={dirOf(locale)} className={`${platformFont.variable} ${platformArabicFont.variable} h-full`}>
      <body className="platform min-h-full bg-white text-ink antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
