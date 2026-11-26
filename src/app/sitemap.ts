import type { MetadataRoute } from 'next'
import { APP_URL } from '@/lib/config'

const PAGES = ['', '/services', '/showcase', '/about', '/legal/privacy', '/legal/terms']

/** Every public page in English (no prefix) and Arabic (/ar), linked as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) => {
    const languages = { en: `${APP_URL}${path || '/'}`, ar: `${APP_URL}/ar${path}` }
    return [
      { url: languages.en, alternates: { languages } },
      { url: languages.ar, alternates: { languages } },
    ]
  })
}
