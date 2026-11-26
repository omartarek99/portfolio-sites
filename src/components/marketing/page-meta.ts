import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

/** Title, description and en/ar alternates for a Vizo page named in the nav (`nav.links.<key>`). */
export async function pageMetadata(path: string, key: string): Promise<Metadata> {
  const [locale, nav, t] = await Promise.all([getLocale(), getTranslations('nav'), getTranslations('marketing')])
  return {
    title: nav(`links.${key}`),
    description: t('meta.description'),
    alternates: {
      canonical: locale === 'ar' ? `/ar${path}` : path,
      languages: { en: path, ar: `/ar${path}`, 'x-default': path },
    },
  }
}
