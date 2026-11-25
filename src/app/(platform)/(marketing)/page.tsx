import { Mail, Play } from 'lucide-react'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { Deck } from '@/components/marketing/deck'
import { FeaturedProjects } from '@/components/marketing/featured'
import { OmarBio } from '@/components/marketing/OmarBio'
import { btn, EMAIL, localePath, SectionHead, waHref, WhatsAppIcon, Wrap } from '@/components/marketing/site'

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('marketing')])
  const path = locale === 'ar' ? '/ar' : '/'
  return {
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
    alternates: { canonical: path, languages: { en: '/', ar: '/ar', 'x-default': '/' } },
  }
}

type Item = { title: string; body: string }

/** A centred service title heading one group of Recent work. */
function WorkGroup({ title, className }: { title: string; className?: string }) {
  return <h3 className={`mb-6 text-center text-2xl font-semibold tracking-tight md:text-3xl ${className ?? ''}`}>{title}</h3>
}
/** Three of the AI-built sites from the showcase. */

export default async function HomePage() {
  const [t, locale, wa] = await Promise.all([getTranslations('marketing'), getLocale(), waHref()])
  const steps = t.raw('steps.items') as Item[]
  const faq = t.raw('faq.items') as { q: string; a: string }[]
  const aboutPoints = t.raw('about.points') as string[]

  return (
    <>
      {/* Page title */}
      <div className="mx-auto flex max-w-6xl justify-center px-5 pt-20 text-center md:pt-28">
        <h1 className="vz-title vz-hero-title max-w-5xl bg-linear-to-b from-fg to-fg/55 bg-clip-text text-5xl text-balance text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
          {t('hero.title')}
        </h1>
      </div>

      {/* Project call to action */}
      <Wrap>
        <div className="relative overflow-hidden rounded-3xl border border-fg/10 px-6 py-16 text-center md:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-32 h-64 rounded-[100%] bg-[radial-gradient(closest-side,rgb(46_91_255/0.5),transparent)] blur-2xl"
          />
          <h2 className="relative text-3xl font-semibold tracking-tight text-balance md:text-4xl">{t('cta.title')}</h2>
          <p className="relative mx-auto mt-4 max-w-md text-fg/60">{t('cta.subtitle')}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className={btn.primary}>
              <WhatsAppIcon />
              {t('cta.button')}
            </a>
            <a href={`mailto:${EMAIL}`} className={btn.ghost}>
              <Mail className="size-4" aria-hidden="true" />
              {t('cta.email')}
            </a>
          </div>
        </div>
      </Wrap>

      {/* Recent work */}
      <Wrap id="work">
        <SectionHead eyebrow={t('work.eyebrow')} title={t('work.title')} subtitle={t('work.subtitle')} />
        <WorkGroup title={t('services.websites.title')} />
        <FeaturedProjects />
        <WorkGroup title={t('services.videos.title')} className="mt-14" />
        <div className="grid gap-4">
          <a
            href={localePath(locale, '/showcase#videos')}
            className="group relative overflow-hidden rounded-2xl border border-fg/10 bg-black"
          >
            <img
              src="/showcase/explainer-poster.webp"
              alt=""
              width={1280}
              height={720}
              loading="lazy"
              className="block aspect-video w-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/30 transition group-hover:bg-black/20">
              <span className="grid size-14 place-items-center rounded-full bg-white text-black">
                <Play className="size-6 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 p-5 text-start text-white">
              <span className="text-vz-accent block text-xs font-medium">{t('work.videoTag')}</span>
              <span className="mt-1 block font-semibold">{t('work.videoTitle')}</span>
            </span>
          </a>
        </div>
        <WorkGroup title={t('services.presentations.title')} className="mt-14" />
        <Deck className="w-full" />
        <div className="mt-10 text-center">
          <a href={localePath(locale, '/showcase')} className={btn.ghost}>
            {t('work.cta')}
          </a>
        </div>
      </Wrap>


      {/* How it works */}
      <Wrap>
        <SectionHead eyebrow={t('steps.eyebrow')} title={t('steps.title')} />
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-fg/10 p-6">
              <span className="text-vz-accent font-mono text-sm">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-pretty text-fg/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </Wrap>

      {/* About */}
      <Wrap id="about">
        <div className="rounded-3xl border border-fg/10 bg-fg/[0.03] p-8 md:p-12">
          <div>
            <p className="text-vz-accent text-sm font-medium">{t('about.eyebrow')}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t('about.title')}</h2>
            <OmarBio text={t('about.body1')} />
            <p className="mt-3 text-pretty text-fg/70">{t('about.body2')}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {aboutPoints.map((point) => (
                <li key={point} className="rounded-full border border-fg/10 px-3 py-1 text-xs text-fg/70">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>

      {/* FAQ — native <details>, no JavaScript */}
      <Wrap id="faq" className="max-w-3xl">
        <SectionHead eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <div className="divide-y divide-fg/10 border-y border-fg/10">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-fg/50 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-pretty text-fg/60">{item.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </>
  )
}
