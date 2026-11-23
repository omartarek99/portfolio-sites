import { cn } from '@/lib/utils'
import { Btn, hasButton, hasImage, hasText, Img, itemAttrs, T } from '../../_shared'
import { FULL_HEIGHT, heroTitle, ON_MEDIA, personName, ScrollCue, type HeroProps } from './parts'

/**
 * Editorial: the portrait is the cover, the name a huge masthead across the
 * top, the headline the main cover line, the issue and date in the corner.
 * The masthead is a styled <p>; the h1 is the headline (or the name without one).
 */
export function MagazineCover({ content, ctx }: HeroProps) {
  const image = hasImage(ctx, content.image)
  const title = heroTitle(ctx, content)
  const lines = (content.coverLines ?? []).map((item, index) => ({ item, index })).filter(({ item }) => hasText(ctx, item.text))
  const masthead = 'site-display text-[clamp(3rem,11vw,12rem)] leading-[0.85] break-words ltr:uppercase rtl:leading-[1.15]'

  return (
    <div
      className={cn('relative isolate flex flex-col overflow-hidden', image ? FULL_HEIGHT : 'py-[var(--site-section-y)]')}
      style={image ? ON_MEDIA : undefined}
    >
      {image ? (
        <>
          <div className="absolute inset-0 -z-10">
            <Img
              ctx={ctx}
              path="image"
              value={content.image}
              alt={personName({ content, ctx })}
              className="size-full object-cover object-top"
              priority
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/10 to-black/80"
          />
        </>
      ) : null}

      <div className="site-container pointer-events-none flex flex-1 flex-col gap-10 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="flex flex-col gap-3">
          {hasText(ctx, content.eyebrow) || hasText(ctx, content.issue) ? (
          <div className="border-site-border flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b pb-2 text-xs font-semibold ltr:tracking-widest">
            <T ctx={ctx} path="eyebrow" value={content.eyebrow} as="p" className="pointer-events-auto ltr:uppercase" placeholder="Eyebrow" />
            <T ctx={ctx} path="issue" value={content.issue} as="p" className="pointer-events-auto ms-auto ltr:uppercase" placeholder="Issue 01 · Spring" />
          </div>
          ) : null}
          {title.named ? (
            <T ctx={ctx} path="name" value={content.name} as="p" className={cn(masthead, 'pointer-events-auto')} placeholder="Your name" />
          ) : null}
        </div>

        <div className="mt-auto grid items-end gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="flex flex-col items-start gap-5">
            {hasText(ctx, title.value) ? (
              <h1 data-reveal className={cn('pointer-events-auto max-w-full break-words', title.named ? 'site-h1' : masthead)}>
                <T ctx={ctx} path={title.path} value={title.value} placeholder={title.placeholder} />
              </h1>
            ) : null}
            <T ctx={ctx} path="tagline" value={content.tagline} as="p" className="site-lead pointer-events-auto max-w-xl" placeholder="Cover line" multiline />
            {hasButton(ctx, content.primaryCta) ? (
              <div className="pointer-events-auto">
                <Btn ctx={ctx} path="primaryCta" value={content.primaryCta} size="lg" />
              </div>
            ) : null}
          </div>
          {lines.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {lines.map(({ item, index }) => (
                <li key={item.id} data-reveal {...itemAttrs(ctx, 'coverLines', index)} className="border-site-text pointer-events-auto border-s-2 ps-4">
                  <T ctx={ctx} path={`coverLines.${index}.text`} value={item.text} className="site-h4" placeholder="Cover line" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      {image && content.scrollCue ? <ScrollCue /> : null}
    </div>
  )
}
