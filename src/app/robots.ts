import type { MetadataRoute } from 'next'
import { APP_URL } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    // /s/ is the internal folder behind the demo sites (they are reachable at /demo/<id>).
    rules: { userAgent: '*', allow: '/', disallow: '/s/' },
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}
