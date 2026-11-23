/**
 * Pieces shared by the Projects variants. Isomorphic — no hooks.
 */
import type { CSSProperties, ReactNode } from 'react'
import { pick, plainText, type LinkRef, type Localized } from '@/schemas/fields'
import { resolveLink } from '@/lib/links'
import { cn } from '@/lib/utils'
import {
  A,
  Btn,
  Container,
  hasButton,
  hasImage,
  hasText,
  Icon,
  Img,
  itemAttrs,
  SectionHeader,
  st,
  T,
  VideoPlayer,
  type FilterCategory,
} from '../_shared'
import type { BlockContext, BlockProps } from '../types'
import type { ProjectItem, ProjectsContent } from './schema'

export type ProjectsVariantProps = BlockProps<ProjectsContent>

/** True when the value has text in this locale — unlike `hasText`, also false in the editor. */
export function filled(ctx: BlockContext, value: Localized | string | undefined): boolean {
  return pick(value, ctx.locale).trim() !== ''
}

/** True when a LinkRef leads somewhere on this site. */
export function linkWorks(ctx: BlockContext, link: LinkRef | undefined): boolean {
  const resolved = resolveLink(ctx.site, link)
  return Boolean(resolved.href) || resolved.booking !== undefined
}

/** The link a project's title follows: its case study when there is one, else the project link. */
export function mainLink(ctx: BlockContext, item: ProjectItem): LinkRef | undefined {
  if (linkWorks(ctx, item.caseStudy)) return item.caseStudy
  if (linkWorks(ctx, item.link)) return item.link
  return undefined
}

export function hasMedia(ctx: BlockContext, item: ProjectItem): boolean {
  return Boolean(item.video?.url) || hasImage(ctx, item.image)
}

/** Item titles sit one level under the section heading, or take its place when there is none. */
export function itemHeading(ctx: BlockContext, content: ProjectsContent): 'h2' | 'h3' {
  return filled(ctx, content.heading) ? 'h3' : 'h2'
}

/** "01", "02" … Western digits in every language (AGENTS: RTL and i18n). */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, '0')
}

/** Covers the nearest positioned ancestor, so the whole card follows the link. Off in the editor, where it would swallow clicks. */
export function stretched(ctx: BlockContext): string | undefined {
  return ctx.mode === 'editor' ? undefined : 'after:absolute after:inset-0'
}

/** Categories that at least one project uses, for the filter. Empty when the filter is off or pointless. */
export function filterCategories(ctx: BlockContext, content: ProjectsContent): FilterCategory[] {
  if (content.showFilter === false) return []
  const used = new Set(content.items.map((item) => item.category))
  const categories = (content.categories ?? [])
    .filter((category) => used.has(category.id))
    .map((category) => ({ value: category.id, label: plainText(pick(category.label, ctx.locale)) }))
    .filter((category) => category.label !== '')
  return categories.length > 1 ? categories : []
}

/* ── Section shell ───────────────────────────────────────────────────────── */

export function ProjectsShell({
  ctx,
  section,
  content,
  children,
}: Pick<ProjectsVariantProps, 'ctx' | 'section' | 'content'> & { children: ReactNode }) {
  const cta = hasButton(ctx, content.cta)
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {children}
      {cta ? (
        <div className={cn('flex', content.items.length > 0 && 'mt-10 md:mt-14', section.style.textAlign === 'center' && 'justify-center')}>
          <Btn ctx={ctx} path="cta" value={content.cta} variant="outline" />
        </div>
      ) : null}
    </Container>
  )
}

/* ── Item pieces ─────────────────────────────────────────────────────────── */

export interface ItemProps {
  ctx: BlockContext
  item: ProjectItem
  index: number
  className?: string
}

/** The project's video when it has one, otherwise its image. Give it a size through `className` (an aspect ratio). */
export function ProjectMedia({
  ctx,
  item,
  index,
  className,
  style,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  maxWidth = 900,
  parallax,
}: ItemProps & { style?: CSSProperties; sizes?: string; maxWidth?: number; parallax?: boolean }) {
  if (item.video?.url) {
    return (
      <div className={cn('rounded-site-lg relative z-10', className)} style={style}>
        <VideoPlayer
          video={{ ...item.video, poster: item.video.poster ?? item.image, title: item.video.title ?? item.title }}
          locale={ctx.locale}
          ratioClassName=""
          className="size-full rounded-[inherit]"
        />
      </div>
    )
  }
  if (!hasImage(ctx, item.image)) return null
  return (
    <div className={cn('site-media', className)} style={style}>
      <Img
        ctx={ctx}
        path={`items.${index}.image`}
        value={item.image}
        sizes={sizes}
        maxWidth={maxWidth}
        alt={plainText(pick(item.title, ctx.locale))}
        parallax={parallax}
      />
    </div>
  )
}

/** "2025 | Sahra Coffee" — only the parts that exist. */
export function ProjectMeta({ ctx, item, index, className }: ItemProps) {
  const year = filled(ctx, item.year)
  const client = filled(ctx, item.client)
  if (!year && !client) return null
  return (
    <p className={cn('site-small site-muted flex flex-wrap items-center gap-x-3 gap-y-1', className)}>
      {year ? <T ctx={ctx} path={`items.${index}.year`} value={item.year} className="tabular-nums" /> : null}
      {year && client ? <span aria-hidden="true" className="bg-site-border h-3 w-px" /> : null}
      {client ? <T ctx={ctx} path={`items.${index}.client`} value={item.client} /> : null}
    </p>
  )
}

export function ProjectTags({ ctx, item, index, className }: ItemProps) {
  if (!item.tags || item.tags.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {item.tags.map((tag, t) => (
        <T key={`${t}-${tag}`} ctx={ctx} path={`items.${index}.tags.${t}`} value={tag} as="li" className="site-tag" />
      ))}
    </ul>
  )
}

/**
 * "Read case study" and "View project" — whichever the project has. With
 * `stretch`, the first one covers the whole card.
 */
export function ProjectActions({ ctx, item, className, stretch }: Omit<ItemProps, 'index'> & { stretch?: boolean }) {
  const caseStudy = linkWorks(ctx, item.caseStudy)
  const link = linkWorks(ctx, item.link)
  if (!caseStudy && !link) return null
  const title = plainText(pick(item.title, ctx.locale))
  const name = (text: string) => (title ? `${text}: ${title}` : text)
  const base = 'site-link inline-flex items-center gap-1.5 font-semibold'
  return (
    <div className={cn('flex flex-wrap gap-x-5 gap-y-2', className)}>
      {caseStudy ? (
        <A ctx={ctx} link={item.caseStudy} label={name(st(ctx.locale, 'viewCaseStudy'))} className={cn(base, stretch && stretched(ctx))}>
          {st(ctx.locale, 'viewCaseStudy')}
          <Icon name="arrow-right" className="size-4 shrink-0 rtl:-scale-x-100" />
        </A>
      ) : null}
      {link ? (
        <A
          ctx={ctx}
          link={item.link}
          label={name(st(ctx.locale, 'viewProject'))}
          className={cn(base, stretch && (caseStudy ? 'relative z-10' : stretched(ctx)))}
        >
          {st(ctx.locale, 'viewProject')}
          <Icon name="arrow-up-right" className="size-4 shrink-0 rtl:-scale-x-100" />
        </A>
      ) : null}
    </div>
  )
}

/* ── The card used by grid, masonry and carousel ─────────────────────────── */

export function ProjectCard({
  ctx,
  item,
  index,
  className,
  heading,
  mediaClassName = 'aspect-[4/3]',
  mediaStyle,
  interactive = true,
}: ItemProps & {
  heading: 'h2' | 'h3'
  mediaClassName?: string
  mediaStyle?: CSSProperties
  interactive?: boolean
}) {
  const Heading = heading
  return (
    <article
      {...itemAttrs(ctx, 'items', index)}
      data-reveal=""
      data-category={item.category || undefined}
      data-interactive={interactive && mainLink(ctx, item) ? '' : undefined}
      className={cn('site-card relative flex h-full flex-col overflow-hidden', className)}
    >
      <ProjectMedia ctx={ctx} item={item} index={index} className={cn('rounded-none', mediaClassName)} style={mediaStyle} />
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <ProjectMeta ctx={ctx} item={item} index={index} />
        {hasText(ctx, item.title) ? (
          <Heading className="site-h3">
            <T ctx={ctx} path={`items.${index}.title`} value={item.title} placeholder="Project title" />
          </Heading>
        ) : null}
        <T
          ctx={ctx}
          path={`items.${index}.description`}
          value={item.description}
          as="p"
          className="site-muted"
          placeholder="What it was and what changed"
          multiline
        />
        <ProjectTags ctx={ctx} item={item} index={index} />
        <ProjectActions ctx={ctx} item={item} stretch className="mt-auto pt-2" />
      </div>
    </article>
  )
}
