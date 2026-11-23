import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import type { PostSummary, PublicMeetingType } from '@/blocks/types'
import type { SiteContent } from '@/schemas/site'
import { getTemplate } from '@/templates/registry'
import { starterContent } from '@/templates/starter'

/**
 * Loading sites for public rendering.
 *
 * A "host key" identifies what to render:
 *   <slug>             a site on its subdomain            (cached, tag site-host:<slug>)
 *   <custom.domain>    a site on a custom domain          (cached, tag site-host:<domain>)
 *   tpl--<templateId>  a template's demo site             (cached, static JSON)
 *
 * Results are cached with `'use cache'` and invalidated on publish with
 * `revalidateSite()` — public pages never hit the database on a warm cache
 * (SPEC §4.7).
 */

export const TEMPLATE_HOST_PREFIX = 'tpl--'

export interface LoadedSite {
  /** Database id, or `tpl--<id>` for template demos. */
  siteId: string
  /** Subdomain slug (absent for template demos). */
  slug?: string
  /** The site's canonical origin, e.g. `https://layla.showcase.app`. */
  origin: string
  /** '' for live sites, `/demo/<templateId>` for template demos. */
  basePath: string
  content: SiteContent
  posts: PostSummary[]
  meetingTypes: PublicMeetingType[]
  flags: { showBadge: boolean; pro: boolean; analytics: boolean }
  /** Owner-enabled integrations that inject on the public site (analytics apps, custom code). */
  integrations: { appId: string; settings: Record<string, unknown> }[]
  status: 'published' | 'maintenance'
  kind: 'site' | 'template'
}

export function siteHostTag(hostKey: string): string {
  return `site-host:${hostKey}`
}

export function siteTag(siteId: string): string {
  return `site:${siteId}`
}

export function isTemplateHost(hostKey: string): boolean {
  return hostKey.startsWith(TEMPLATE_HOST_PREFIX)
}

/**
 * The published site for a host key, or null when there is none.
 * Cached; tagged by host key and by site id.
 */
export async function getSiteForHost(hostKey: string): Promise<LoadedSite | null> {
  'use cache'
  cacheLife('days')
  cacheTag(siteHostTag(hostKey))

  if (isTemplateHost(hostKey)) {
    const templateId = hostKey.slice(TEMPLATE_HOST_PREFIX.length)
    const template = templateId === 'starter' ? null : getTemplate(templateId)
    if (templateId !== 'starter' && !template) return null
    return {
      siteId: hostKey,
      origin: '',
      basePath: `/demo/${templateId}`,
      content: template?.content ?? starterContent(),
      posts: [],
      meetingTypes: [],
      flags: { showBadge: false, pro: true, analytics: false },
      integrations: [],
      status: 'published',
      kind: 'template',
    }
  }

  // Published sites are loaded from the database in milestone M5.
  return null
}
