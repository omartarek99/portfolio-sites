import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import { FeaturedProjects } from '@/components/marketing/featured'
import { SectionHead, Wrap } from '@/components/marketing/site'
import { DeckSection } from '@/components/marketing/deck'
import { pick, type Locale } from '@/schemas/fields'
import { HIDDEN_DEMOS } from '@/templates/hidden'
import { listTemplates } from '@/templates/registry'
import { templatePreview } from '@/templates/types'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing')
  return { title: t('showcase.title'), description: t('showcase.subtitle') }
}

function SiteCard({
  href,
  cover,
  name,
  detail,
  note,
  open,
}: {
  href: string
  cover: ReactNode
  name: string
  detail: string
  note?: string
  open: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-fg/10 bg-fg/[0.03] hover:border-fg/25 block h-full overflow-hidden rounded-2xl border transition"
    >
      <span className="block overflow-hidden">{cover}</span>
      <span className="flex items-start justify-between gap-3 p-4">
        <span>
          <span className="block font-medium">{name}</span>
          <span className="text-fg/65 mt-1 block text-sm">{detail}</span>
          {note && <span className="text-fg/65 mt-1 block text-xs">{note}</span>}
        </span>
        <span className="text-fg/60 group-hover:text-fg flex shrink-0 items-center gap-1 text-xs">
          {open}
          <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
        </span>
      </span>
    </a>
  )
}

export default async function ShowcasePage() {
  const [t, locale] = await Promise.all([getTranslations('marketing'), getLocale() as Promise<Locale>])

  return (
    <>
      <header className="mx-auto max-w-3xl px-5 pt-20 text-center md:pt-28">
        <h1 className="vz-title from-fg to-fg/55 bg-linear-to-b bg-clip-text text-5xl text-transparent md:text-7xl">
          {t('showcase.title')}
        </h1>
        <p className="text-fg/60 mt-4">{t('showcase.subtitle')}</p>
      </header>

      <Wrap id="featured">
        <SectionHead title={t('showcase.featured.title')} />
        <FeaturedProjects />
      </Wrap>

      <Wrap id="videos">
        <SectionHead title={t('showcase.videos.title')} subtitle={t('showcase.videos.subtitle')} />
        <figure className="border-fg/10 mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-black">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/showcase/explainer-poster.webp"
            className="block aspect-video w-full"
          >
            <source src="/showcase-explainer.webm" type={'video/webm; codecs="vp9, opus"'} />
            <source src="/showcase-explainer.mp4" type="video/mp4" />
          </video>
          <figcaption className="bg-vz-bg border-fg/10 flex flex-wrap items-baseline justify-between gap-2 border-t p-5">
            <span className="font-semibold">{t('work.videoTitle')}</span>
            <span className="text-fg/65 text-sm">{t('showcase.videos.caption')}</span>
          </figcaption>
        </figure>
        <p className="text-fg/60 mt-6 text-center text-sm">{t('showcase.videos.more')}</p>
      </Wrap>

      <DeckSection />

      <Wrap id="websites">
        <SectionHead title={t('showcase.sites.title')} subtitle={t('showcase.sites.subtitle')} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {listTemplates()
            .filter((site) => !HIDDEN_DEMOS.has(site.id))
            .map((site) => (
              <li key={site.id}>
                <SiteCard
                  href={`/demo/${site.id}${locale === 'ar' ? '/ar' : ''}`}
                  name={pick(site.name, locale)}
                  detail={site.bestFor.map((b) => pick(b, locale)).join(' · ')}
                  open={t('showcase.sites.open')}
                  cover={
                    <img
                      src={templatePreview(site.id).thumb}
                      alt=""
                      width={720}
                      height={450}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  }
                />
              </li>
            ))}
        </ul>
      </Wrap>
    </>
  )
}
