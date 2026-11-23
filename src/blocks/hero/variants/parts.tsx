import type { CSSProperties, ReactNode } from 'react'
import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { Btn, hasButton, hasImage, hasText, Icon, T } from '../../_shared'
import type { BlockContext, BlockProps } from '../../types'
import type { HeroContent, HeroImage } from '../schema'

export type HeroProps = BlockProps<HeroContent>

/**
 * Copy that sits on a photograph or a video is light on a dark scrim under
 * every theme, exactly like a section with an image background.
 */
export const ON_MEDIA = {
  '--site-bg': 'black',
  '--site-text': 'white',
  '--site-muted': 'rgb(255 255 255 / 0.84)',
  '--site-border': 'rgb(255 255 255 / 0.3)',
  '--site-surface': 'rgb(255 255 255 / 0.12)',
  color: 'white',
} as CSSProperties

/** Height of the full-screen variants: the viewport, but never absurdly tall. */
export const FULL_HEIGHT = 'min-h-[min(100svh,60rem)]'

/** The person's name as plain text: the alt-text fallback for portraits. */
export function personName({ content, ctx }: Pick<HeroProps, 'content' | 'ctx'>): string {
  return plainText(pick(content.name, ctx.locale))
}

/** The pictures of `images` that have something to show, with their position in the list. */
export function heroSlides(ctx: BlockContext, content: HeroContent): { item: HeroImage; index: number }[] {
  return (content.images ?? []).map((item, index) => ({ item, index })).filter(({ item }) => hasImage(ctx, item.image))
}

/**
 * Which field is the page's h1. The headline when there is one — the name is
 * then a caption — otherwise the name itself.
 */
export function heroTitle(ctx: BlockContext, content: HeroContent) {
  const named = hasText(ctx, content.heading)
  return named
    ? { named, path: 'heading', value: content.heading, placeholder: 'Your headline' }
    : // With no name either, the site owner's name keeps the page from having no h1.
      { named, path: 'name', value: content.name ?? ctx.site.settings.ownerName, placeholder: 'Your name' }
}

export function HeroCtas({ ctx, content, center }: { ctx: BlockContext; content: HeroContent; center?: boolean }) {
  if (!hasButton(ctx, content.primaryCta) && !hasButton(ctx, content.secondaryCta)) return null
  return (
    <div data-reveal className={cn('mt-2 flex flex-wrap gap-3', center && 'justify-center')}>
      <Btn ctx={ctx} path="primaryCta" value={content.primaryCta} size="lg" />
      <Btn ctx={ctx} path="secondaryCta" value={content.secondaryCta} variant="outline" size="lg" />
    </div>
  )
}

/** Availability badge and location on one quiet line. */
export function HeroMeta({ ctx, content, center }: { ctx: BlockContext; content: HeroContent; center?: boolean }) {
  const location = hasText(ctx, content.location)
  if (!hasText(ctx, content.badge) && !location) return null
  return (
    <div data-reveal className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', center && 'justify-center')}>
      <T ctx={ctx} path="badge" value={content.badge} as="p" className="site-badge" placeholder="Availability" />
      {location ? (
        <p className="site-small text-site-muted inline-flex items-center gap-1.5">
          <Icon name="map-pin" className="size-4 shrink-0" />
          <T ctx={ctx} path="location" value={content.location} placeholder="Location" />
        </p>
      ) : null}
    </div>
  )
}

export interface HeroTextProps {
  ctx: BlockContext
  content: HeroContent
  center?: boolean
  /** The text sits on a picture: the eyebrow drops the theme colour for legibility. */
  onMedia?: boolean
  /** Classes of the h1. Default `site-h1`. */
  headingClassName?: string
  /** Extra classes for the name, whether it is the caption or the h1. */
  nameClassName?: string
  /** Rendered inside the h1, after its text (rotating words). */
  afterHeading?: ReactNode
  /** The variant shows the name somewhere else. */
  hideName?: boolean
  className?: string
}

/** Eyebrow, name, h1, tagline, buttons, badge: the copy most hero variants share. */
export function HeroText({
  ctx,
  content,
  center,
  onMedia,
  headingClassName = 'site-h1',
  nameClassName,
  afterHeading,
  hideName,
  className,
}: HeroTextProps) {
  const title = heroTitle(ctx, content)
  return (
    <div className={cn('flex min-w-0 flex-col gap-5', center ? 'items-center text-center' : 'items-start', className)}>
      <T
        ctx={ctx}
        path="eyebrow"
        value={content.eyebrow}
        as="p"
        className={cn('site-eyebrow', onMedia && 'text-site-text')}
        placeholder="Eyebrow"
      />
      {title.named && !hideName ? (
        <T ctx={ctx} path="name" value={content.name} as="p" className={cn('site-h4', nameClassName)} placeholder="Your name" />
      ) : null}
      {hasText(ctx, title.value) || afterHeading ? (
        <h1 data-reveal className={cn(headingClassName, 'max-w-full break-words', !title.named && nameClassName)}>
          <T ctx={ctx} path={title.path} value={title.value} placeholder={title.placeholder} />
          {afterHeading}
        </h1>
      ) : null}
      <T
        ctx={ctx}
        path="tagline"
        value={content.tagline}
        as="p"
        className="site-lead max-w-2xl"
        placeholder="One or two sentences about what you do"
        multiline
      />
      <HeroCtas ctx={ctx} content={content} center={center} />
      <HeroMeta ctx={ctx} content={content} center={center} />
    </div>
  )
}

/** A bobbing arrow at the bottom of a full-screen hero. Decorative. */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'site-float border-site-border pointer-events-none absolute inset-x-0 bottom-4 z-10 mx-auto flex size-10 items-center justify-center rounded-full border',
        className,
      )}
    >
      <Icon name="arrow-down" className="size-5" />
    </span>
  )
}

/**
 * Shell of the variants whose copy lies over a picture or a video
 * (`full-bleed`, `video-bg`). With no media it is an ordinary padded section.
 *
 * Stacking, back to front: media · scrim · copy (z-10) · media controls (z-20).
 * Nothing but the copy itself takes pointer events, so the picture stays
 * clickable in the editor and the media controls stay reachable.
 */
export function MediaShell({
  ctx,
  content,
  media,
  children,
}: {
  ctx: BlockContext
  content: HeroContent
  /** The background layer, or a falsy value when there is nothing to show. */
  media: ReactNode
  children?: ReactNode
}) {
  const on = Boolean(media)
  return (
    <div
      className={cn('relative isolate flex flex-col justify-end overflow-hidden', on && FULL_HEIGHT)}
      style={on ? ON_MEDIA : undefined}
    >
      {on ? (
        <>
          <div className="absolute inset-0">{media}</div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/25"
          />
        </>
      ) : null}
      {children}
      <div
        className={cn(
          'site-container pointer-events-none relative z-10',
          on ? 'pt-28 pb-20 md:pb-24' : 'py-[var(--site-section-y)]',
        )}
      >
        <HeroText ctx={ctx} content={content} onMedia={on} className="pointer-events-auto max-w-3xl" />
      </div>
      {on && content.scrollCue ? <ScrollCue /> : null}
    </div>
  )
}
