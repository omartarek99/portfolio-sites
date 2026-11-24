import { Almarai, Anton, Noto_Sans_Arabic, PT_Sans, Poppins } from 'next/font/google'
import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { SiteFooter, SiteHeader, WhatsAppFab } from '@/components/marketing/site'
import { THEME_SCRIPT } from '@/components/marketing/ThemeToggle'

// Fonts (see globals.css .vz): Poppins headings and UI, PT Sans paragraphs, Anton page titles,
// Noto Sans Arabic for Arabic text and Almarai for Arabic titles and headings.
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-vz', display: 'swap' })
const ptSans = PT_Sans({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-vz-text', display: 'swap' })
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-vz-title', display: 'swap' })
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-vz-ar', display: 'swap' })
const almarai = Almarai({ weight: ['400', '700', '800'], subsets: ['arabic'], variable: '--font-vz-ar-heading', display: 'swap' })
const FONTS = [poppins, ptSans, anton, notoArabic, almarai].map((font) => font.variable).join(' ')

/** Frame shared by every public page of the Vizo site. */
export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations('common')
  return (
    <div className={`${FONTS} vz bg-vz-bg min-h-screen text-fg antialiased`}>
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
