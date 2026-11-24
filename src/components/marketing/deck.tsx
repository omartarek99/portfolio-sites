import { getLocale, getTranslations } from 'next-intl/server'
import { dirOf, type Locale } from '@/schemas/fields'
import { DeckSlider } from './DeckSlider'
import { SectionHead, Wrap } from './site'

/** Slides of the featured presentation, exported from PowerPoint (title slide first). */
const DECK = Array.from({ length: 10 }, (_, i) => `/showcase/deck/slide-${String(i + 1).padStart(2, '0')}.webp`)

/** The featured deck in a slider, with its title and caption. */
export async function Deck({ className }: { className?: string }) {
  const [t, locale] = await Promise.all([getTranslations('marketing'), getLocale() as Promise<Locale>])
  return (
    <figure className={className ?? 'mx-auto max-w-5xl'}>
      <DeckSlider
        dir={dirOf(locale)}
        slides={DECK.map((src, i) => ({ src, alt: t('showcase.decks.slide', { n: i + 1, total: DECK.length }) }))}
        labels={{
          region: t('showcase.decks.name'),
          previous: t('showcase.decks.previous'),
          next: t('showcase.decks.next'),
          goTo: DECK.map((_, i) => t('showcase.decks.goTo', { n: i + 1 })),
        }}
      />
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-semibold">{t('showcase.decks.name')}</span>
        <span className="text-sm text-fg/50">{t('showcase.decks.caption')}</span>
      </figcaption>
    </figure>
  )
}

/** The Presentations section of the showcase page. */
export async function DeckSection() {
  const t = await getTranslations('marketing')
  return (
    <Wrap id="presentations">
      <SectionHead eyebrow={t('showcase.decks.eyebrow')} title={t('showcase.decks.title')} subtitle={t('showcase.decks.subtitle')} />
      <Deck />
    </Wrap>
  )
}
