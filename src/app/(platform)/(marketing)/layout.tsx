import { Inter } from 'next/font/google'
import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { SiteFooter, SiteHeader, WhatsAppFab } from '@/components/marketing/site'
import { THEME_SCRIPT } from '@/components/marketing/ThemeToggle'

const inter = Inter({ subsets: ['latin'], variable: '--font-vz', display: 'swap' })

/** Frame shared by every public page of the Vizo site. */
export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations('common')
  return (
    <div className={`${inter.variable} vz bg-vz-bg min-h-screen text-fg antialiased`}>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-vz-bg"
      >
        {t('a11y.skipToContent')}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  )
}
