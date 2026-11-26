import { Mail } from 'lucide-react'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { EnquiryForm, type EnquiryLabels } from '@/components/marketing/EnquiryForm'
import { IntroTerminal } from '@/components/marketing/IntroTerminal'
import { btn, EMAIL, SectionHead, waHref, WHATSAPP, WhatsAppIcon, Wrap } from '@/components/marketing/site'

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('marketing')])
  const path = locale === 'ar' ? '/ar' : '/'
  return {
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
    alternates: { canonical: path, languages: { en: '/', ar: '/ar', 'x-default': '/' } },
  }
}

export default async function HomePage() {
  const [t, wa] = await Promise.all([getTranslations('marketing'), waHref()])

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
            <a href="#start" className={btn.ghost}>
              {t('enquiry.link')}
            </a>
          </div>
        </div>
      </Wrap>

      {/* Intro terminal: who Omar is and what Vizo makes */}
      <Wrap>
        <IntroTerminal />
      </Wrap>

      {/* Start a project: a quick brief sent on WhatsApp */}
      <Wrap id="start" className="max-w-3xl">
        <SectionHead title={t('enquiry.title')} />
        <EnquiryForm
          phone={WHATSAPP}
          labels={t.raw('enquiry.form') as EnquiryLabels}
          buttonClass={btn.primary}
          uploads={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
        />
      </Wrap>
    </>
  )
}
