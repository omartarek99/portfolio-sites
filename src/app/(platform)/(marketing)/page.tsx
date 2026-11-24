import { ArrowUpRight, Clapperboard, Globe, Mail, Play, Presentation } from 'lucide-react'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { DeckSection } from '@/components/marketing/deck'
import { FeaturedProjects } from '@/components/marketing/featured'
import { OmarBio } from '@/components/marketing/OmarBio'
import { btn, EMAIL, localePath, SectionHead, waHref, WhatsAppIcon, Wrap } from '@/components/marketing/site'
import { templatePreview } from '@/templates/types'

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('marketing')])
  const path = locale === 'ar' ? '/ar' : '/'
  return {
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
    alternates: { canonical: path, languages: { en: '/', ar: '/ar', 'x-default': '/' } },
    openGraph: { type: 'website', url: path, title: t('meta.title'), description: t('meta.description') },
  }
}

type Item = { title: string; body: string }

const SERVICE_ICONS = { websites: Globe, videos: Clapperboard, presentations: Presentation }
/** Three of the AI-built sites from the showcase. */
const FEATURED_SITES = ['aurora', 'founder', 'majlis']

export default async function HomePage() {
  const [t, locale, wa] = await Promise.all([getTranslations('marketing'), getLocale(), waHref()])
  const steps = t.raw('steps.items') as Item[]
  const faq = t.raw('faq.items') as { q: string; a: string }[]
  const aboutPoints = t.raw('about.points') as string[]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 pt-20 text-center md:pt-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.04] px-3 py-1 text-xs text-fg/70">
            <span className="bg-vz-yellow size-1.5 rounded-full" aria-hidden="true" />
            {t('hero.badge')}
          </p>
          <h1 className="vz-title vz-hero-title mt-6 max-w-3xl bg-linear-to-b from-fg to-fg/55 bg-clip-text text-3xl text-balance text-transparent sm:text-4xl md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-5 max-w-xl text-base text-pretty text-fg/60 md:text-lg">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className={btn.primary}>
              <WhatsAppIcon />
              {t('hero.primary')}
            </a>
            <a href={localePath(locale, '/showcase')} className={btn.ghost}>
              {t('hero.secondary')}
            </a>
          </div>

          {/* Glow + product mockup rising from the bottom, as in the Launch UI hero. */}
          <div className="relative mt-16 w-full max-w-5xl md:mt-20">
            <div
              aria-hidden="true"
              className="absolute inset-x-[10%] -top-24 h-64 rounded-[100%] bg-[radial-gradient(closest-side,rgb(46_91_255/0.55),transparent)] blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-[30%] -top-10 h-24 rounded-[100%] bg-[radial-gradient(closest-side,rgb(255_207_63/0.35),transparent)] blur-xl"
            />
            <div
              aria-hidden="true"
              className="via-vz-yellow/80 absolute inset-x-[15%] top-0 h-px bg-linear-to-r from-transparent to-transparent"
            />
            <div className="relative rounded-t-2xl border border-b-0 border-fg/10 bg-fg/[0.03] p-2 pb-0 backdrop-blur">
              <div className="flex gap-1.5 px-2 pb-2" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-fg/15" />
                <span className="size-2.5 rounded-full bg-fg/15" />
                <span className="size-2.5 rounded-full bg-fg/15" />
              </div>
              <img
                src={templatePreview('aurora').desktop}
                alt={t('hero.mockupAlt')}
                width={1440}
                height={900}
                fetchPriority="high"
                className="aspect-[16/9] w-full rounded-t-lg object-cover object-top"
              />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="to-vz-bg absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent" />
      </section>

      {/* Services */}
      <Wrap id="services">
        <SectionHead eyebrow={t('services.eyebrow')} title={t('services.title')} subtitle={t('services.subtitle')} />
        <div className="relative mx-auto max-w-5xl">
          <ul className="relative grid gap-3 md:grid-cols-3">
            {(['websites', 'videos', 'presentations'] as const).map((key) => {
              const Icon = SERVICE_ICONS[key]
              return (
                <li
                  key={key}
                  className="rounded-sm border border-fg/15 bg-vz-bg/55 p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-xl transition hover:border-fg/30"
                >
                  <span className="bg-vz-blue grid size-10 place-items-center rounded-sm text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{t(`services.${key}.title`)}</h3>
                </li>
              )
            })}
          </ul>
        </div>
      </Wrap>

      {/* Recent work */}
      <Wrap id="work">
        <SectionHead eyebrow={t('work.eyebrow')} title={t('work.title')} subtitle={t('work.subtitle')} />
        <FeaturedProjects />
        <div className="mt-4 grid gap-4">
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
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURED_SITES.slice(0, 2).map((id) => (
              <a
                key={id}
                href={`/demo/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-fg/10"
              >
                <img
                  src={templatePreview(id).thumb}
                  alt=""
                  width={720}
                  height={450}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/80 p-4 text-sm text-white">
                  <span>{t('work.siteTag')}</span>
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <a href={localePath(locale, '/showcase')} className={btn.ghost}>
            {t('work.cta')}
          </a>
        </div>
      </Wrap>

      <DeckSection />

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
        <div className="grid items-center gap-10 rounded-3xl border border-fg/10 bg-fg/[0.03] p-8 md:grid-cols-[auto_1fr] md:p-12">
          <div
            aria-hidden="true"
            className="from-vz-blue grid size-28 place-items-center rounded-3xl bg-linear-to-br to-[#1a2f8a] text-5xl font-semibold text-white shadow-[0_0_60px_-10px_rgb(46_91_255/0.7)]"
          >
            {t('about.initial')}
          </div>
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

      {/* Closing call to action */}
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
    </>
  )
}
