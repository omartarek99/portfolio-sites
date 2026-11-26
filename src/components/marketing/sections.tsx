import { Play } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Deck } from './deck'
import { FeaturedProjects } from './featured'
import { OmarBio } from './OmarBio'
import { btn, localePath, SectionHead, Wrap } from './site'

/** Sections shared by the Vizo pages (home, services, about). */

/** A centred service title heading one group of Recent work. */
function WorkGroup({ title, className }: { title: string; className?: string }) {
  return <h3 className={`mb-6 text-center text-2xl font-semibold tracking-tight md:text-3xl ${className ?? ''}`}>{title}</h3>
}

/** Recent work, grouped by service: websites, videos, presentations. */
export async function WorkSection() {
  const [t, locale] = await Promise.all([getTranslations('marketing'), getLocale()])
  return (
    <Wrap id="work">
      <SectionHead title={t('work.title')} subtitle={t('work.subtitle')} />
      <WorkGroup title={t('services.websites.title')} />
      <FeaturedProjects />
      <WorkGroup title={t('services.videos.title')} className="mt-14" />
      <a
        href={localePath(locale, '/showcase#videos')}
        className="group relative block overflow-hidden rounded-2xl border border-fg/10 bg-black"
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
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 p-5 text-start font-semibold text-white">
          {t('work.videoTitle')}
        </span>
      </a>
      <WorkGroup title={t('services.presentations.title')} className="mt-14" />
      <Deck className="w-full" />
      <div className="mt-10 text-center">
        <a href={localePath(locale, '/showcase')} className={btn.ghost}>
          {t('work.cta')}
        </a>
      </div>
    </Wrap>
  )
}

/** How it works: three steps. */
export async function StepsSection() {
  const t = await getTranslations('marketing')
  const steps = t.raw('steps.items') as { title: string; body: string }[]
  return (
    <Wrap>
      <SectionHead title={t('steps.title')} />
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
  )
}

/** About Omar. The heading uses the page-title font. */
export async function AboutSection() {
  const t = await getTranslations('marketing')
  return (
    <Wrap id="about">
      <div className="rounded-3xl border border-fg/10 bg-fg/[0.03] p-8 md:p-12">
        <h2 className="vz-title text-4xl md:text-5xl">{t('about.title')}</h2>
        <OmarBio text={t('about.body1')} />
        <OmarBio text={t('about.body2')} className="mt-3" />
      </div>
    </Wrap>
  )
}
