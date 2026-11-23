/**
 * Pieces shared by the Case study variants. Isomorphic — no hooks.
 */
import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { A, hasImage, hasText, Icon, Img, itemAttrs, T } from '../_shared'
import { filled, stretched } from '../projects/parts'
import type { BlockContext, BlockProps } from '../types'
import type { CaseSection, CaseStudyContent } from './schema'
import { t } from './strings'

export type CaseStudyVariantProps = BlockProps<CaseStudyContent>

/**
 * A case study usually is the page, so its title is the h1 — unless something
 * else (a hero) already opened the page.
 */
export function headingTags(ctx: BlockContext): { Title: 'h1' | 'h2'; Sub: 'h2' | 'h3' } {
  return ctx.index === 0 ? { Title: 'h1', Sub: 'h2' } : { Title: 'h2', Sub: 'h3' }
}

export function hasHeader(ctx: BlockContext, content: CaseStudyContent): boolean {
  return (
    hasText(ctx, content.eyebrow) ||
    hasText(ctx, content.title) ||
    hasText(ctx, content.subtitle) ||
    (content.meta ?? []).length > 0
  )
}

export function Cover({ ctx, content, className }: { ctx: BlockContext; content: CaseStudyContent; className: string }) {
  if (!hasImage(ctx, content.cover)) return null
  return (
    <div className={cn('site-media', className)}>
      <Img
        ctx={ctx}
        path="cover"
        value={content.cover}
        sizes="(min-width: 1280px) 1200px, 100vw"
        priority={ctx.index === 0}
        alt={plainText(pick(content.title, ctx.locale))}
      />
    </div>
  )
}

/** A section's pictures: one runs full width, several pair up (an odd first one still runs full width). */
export function Figures({ ctx, section, sectionIndex }: { ctx: BlockContext; section: CaseSection; sectionIndex: number }) {
  const images = (section.images ?? [])
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => hasImage(ctx, entry.image))
  if (images.length === 0) return null
  const fallbackAlt = plainText(pick(section.heading, ctx.locale))
  return (
    <div className={cn('grid gap-4 md:gap-6', images.length > 1 && 'sm:grid-cols-2')}>
      {images.map(({ entry, index }, position) => {
        const full = images.length === 1 || (images.length % 2 === 1 && position === 0)
        return (
          <figure
            key={entry.id}
            {...itemAttrs(ctx, `sections.${sectionIndex}.images`, index)}
            className={cn('flex min-w-0 flex-col gap-3', full && 'sm:col-span-2')}
          >
            <div className={cn('site-media', full ? 'aspect-[4/3] sm:aspect-[16/9]' : 'aspect-[4/3]')}>
              <Img
                ctx={ctx}
                path={`sections.${sectionIndex}.images.${index}.image`}
                value={entry.image}
                sizes={full ? '(min-width: 1280px) 1200px, 100vw' : '(min-width: 640px) 50vw, 100vw'}
                maxWidth={full ? 1920 : 1100}
                alt={plainText(pick(entry.caption, ctx.locale)) || fallbackAlt}
              />
            </div>
            <T
              ctx={ctx}
              path={`sections.${sectionIndex}.images.${index}.caption`}
              value={entry.caption}
              as="figcaption"
              className="site-small site-muted"
              placeholder="Caption"
            />
          </figure>
        )
      })}
    </div>
  )
}

/** Headline numbers. The number comes first for the eye, the label first for screen readers. */
export function Results({
  ctx,
  content,
  Sub,
  center,
}: {
  ctx: BlockContext
  content: CaseStudyContent
  Sub: 'h2' | 'h3'
  center?: boolean
}) {
  const results = content.results ?? []
  // The heading alone says nothing: without numbers there is no results band (outside the editor).
  if (results.length === 0 && ctx.mode !== 'editor') return null
  return (
    <div className={cn('border-site-border flex flex-col gap-8 border-y py-10 md:py-14', center ? 'items-center text-center' : 'text-start')}>
      <T ctx={ctx} path="resultsHeading" value={content.resultsHeading} as={Sub} className="site-h3" placeholder="Results" />
      {results.length > 0 ? (
        <dl className="grid w-full grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-x-6 gap-y-8">
          {results.map((result, index) => (
            <div key={result.id} {...itemAttrs(ctx, 'results', index)} data-reveal="" className="flex min-w-0 flex-col-reverse gap-1">
              <T ctx={ctx} path={`results.${index}.label`} value={result.label} as="dt" className="site-muted" placeholder="Label" />
              <T
                ctx={ctx}
                path={`results.${index}.value`}
                value={result.value}
                as="dd"
                className="site-h1 text-site-primary tabular-nums"
                placeholder="0"
              />
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  )
}

/** The way out of the page: one large link to the next project. */
export function NextProject({ ctx, content }: { ctx: BlockContext; content: CaseStudyContent }) {
  const next = content.next
  if (!hasText(ctx, next?.title)) return null
  const label = t(ctx.locale, 'nextProject')
  return (
    <nav aria-label={label} className="group relative flex items-center gap-5 text-start md:gap-8">
      {hasImage(ctx, next?.image) ? (
        <div className="site-media hidden aspect-[4/3] w-36 shrink-0 sm:block md:w-52">
          <Img
            ctx={ctx}
            path="next.image"
            value={next?.image}
            sizes="13rem"
            maxWidth={480}
            alt={plainText(pick(next?.title, ctx.locale))}
          />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {filled(ctx, next?.label) || ctx.mode === 'editor' ? (
          <T ctx={ctx} path="next.label" value={next?.label} as="p" className="site-eyebrow" placeholder={label} />
        ) : (
          <p className="site-eyebrow">{label}</p>
        )}
        <p className="site-h2 group-hover:text-site-primary group-focus-within:text-site-primary transition-colors">
          <A ctx={ctx} link={next?.link} className={stretched(ctx)}>
            <T ctx={ctx} path="next.title" value={next?.title} placeholder="Project title" />
          </A>
        </p>
      </div>
      <Icon name="arrow-right" className="text-site-primary size-8 shrink-0 md:size-10 rtl:-scale-x-100" />
    </nav>
  )
}
