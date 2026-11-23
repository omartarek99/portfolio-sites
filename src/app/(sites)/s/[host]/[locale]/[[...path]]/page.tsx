import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteRenderer } from '@/blocks/SiteRenderer'
import { getSiteForHost } from '@/lib/sites/load'
import { buildSiteRuntime } from '@/lib/sites/runtime'
import { isLocale, pick, plainText } from '@/schemas/fields'
import { findPageBySlug } from '@/schemas/site'
import { TEMPLATE_IDS } from '@/templates/registry'

type Params = { host: string; locale: string; path?: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  return ['starter', ...TEMPLATE_IDS].map((id) => ({ host: `tpl--${id}`, locale: 'default', path: [] }))
}

async function resolve(params: Promise<Params>) {
  const { host, locale, path } = await params
  const site = await getSiteForHost(host)
  if (!site) return null
  const slug = (path ?? []).join('/')
  const page = findPageBySlug(site.content, slug)
  if (!page) return null
  const runtime = buildSiteRuntime({
    siteId: site.siteId,
    slug: site.slug,
    content: site.content,
    locale: isLocale(locale) ? locale : null,
    mode: site.kind === 'template' ? 'preview' : 'live',
    basePath: site.basePath,
    currentSlug: page.slug,
    posts: site.posts,
    meetingTypes: site.meetingTypes,
    flags: site.flags,
  })
  return { site, page, runtime }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await resolve(params)
  if (!resolved) return { title: 'Not found', robots: { index: false } }
  const { site, page, runtime } = resolved
  const pageTitle = plainText(pick(page.seo?.title ?? page.title, runtime.locale))
  const ownerName = plainText(pick(site.content.settings.ownerName, runtime.locale))
  const template = site.content.settings.seo.titleTemplate || '%s'
  const title = page.slug === '' && ownerName ? ownerName : template.replace('%s', pageTitle)
  const description = plainText(
    pick(page.seo?.description ?? site.content.settings.seo.defaultDescription, runtime.locale),
  )
  return {
    title,
    description: description || undefined,
    robots: page.seo?.noIndex || site.kind === 'template' ? { index: false } : undefined,
  }
}

export default async function SitePage({ params }: { params: Promise<Params> }) {
  const resolved = await resolve(params)
  if (!resolved) notFound()
  const { site, page, runtime } = resolved
  return <SiteRenderer site={runtime} globalSections={site.content.globalSections} sections={page.sections} />
}
