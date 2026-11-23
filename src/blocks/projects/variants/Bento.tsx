import type { CSSProperties, ReactNode } from 'react'
import { pick, plainText, type LinkRef } from '@/schemas/fields'
import { SOCIAL_LABELS, socialUrl } from '@/lib/links'
import { cn } from '@/lib/utils'
import { A, BrandIcon, hasImage, hasText, Icon, Img, itemAttrs, SocialLinks, st, T } from '../../_shared'
import type { ProjectKind, ProjectSize } from '../schema'
import {
  filled,
  hasMedia,
  itemHeading,
  linkWorks,
  mainLink,
  ProjectActions,
  ProjectMedia,
  ProjectMeta,
  ProjectsShell,
  ProjectTags,
  stretched,
  type ItemProps,
  type ProjectsVariantProps,
} from '../parts'

/*
 * A bento grid: two columns on small screens, four from `lg`. Each card has a
 * footprint (`size`) and a `kind`. Projects are the default kind; the others
 * (intro, photo, status, location, learning, social, contact) are what the
 * Bento template builds its whole home page from.
 */

/** Kinds that still read well in a single ~150px column on a phone. */
const COMPACT: ReadonlySet<ProjectKind> = new Set(['photo', 'status', 'location', 'learning', 'social'])

/** Footprint when the item does not choose one. */
function defaultSize(kind: ProjectKind): ProjectSize {
  return kind === 'project' || kind === 'intro' ? 'md' : 'sm'
}

/** Grid placement. On phones nothing is wider than the two columns, and text-heavy cards always take both. */
function span(size: ProjectSize, compact: boolean): string {
  switch (size) {
    case 'md':
      return 'col-span-2'
    case 'lg':
      return 'col-span-2 lg:row-span-2'
    case 'wide':
      return 'col-span-2 lg:col-span-3'
    case 'tall':
      return compact ? 'row-span-2' : 'col-span-2 lg:col-span-1 lg:row-span-2'
    default:
      return compact ? '' : 'col-span-2 lg:col-span-1'
  }
}

type Heading = 'h1' | 'h2' | 'h3'
type CellProps = ItemProps & { heading: Heading; size: ProjectSize }

const PAD = 'p-4 sm:p-5'

function Label({ ctx, item, index, className = 'site-eyebrow' }: ItemProps) {
  return <T ctx={ctx} path={`items.${index}.label`} value={item.label} as="p" className={className} placeholder="Label" />
}

function Title({ ctx, item, index, heading: Tag, className, children }: ItemProps & { heading: Heading; children?: ReactNode }) {
  if (!hasText(ctx, item.title)) return null
  const text = <T ctx={ctx} path={`items.${index}.title`} value={item.title} placeholder="Title" />
  return <Tag className={className}>{children ?? text}</Tag>
}

function Description({ ctx, item, index, className }: ItemProps) {
  return (
    <T ctx={ctx} path={`items.${index}.description`} value={item.description} as="p" className={className} multiline />
  )
}

/** A small square picture (logo, cover, avatar). */
function Thumb({ ctx, item, index, className }: ItemProps) {
  return (
    <div className={cn('site-media shrink-0', className)}>
      <Img
        ctx={ctx}
        path={`items.${index}.image`}
        value={item.image}
        sizes="6rem"
        maxWidth={240}
        alt={plainText(pick(item.title, ctx.locale))}
      />
    </div>
  )
}

/* ── Kinds ───────────────────────────────────────────────────────────────── */

function ProjectCell({ ctx, item, index, heading, size }: CellProps) {
  const big = size === 'lg' || size === 'wide'
  const row = size === 'md' || size === 'wide'
  const media = hasMedia(ctx, item)
  return (
    <div className={cn('flex flex-1 flex-col', row && 'sm:flex-row')}>
      <ProjectMedia
        ctx={ctx}
        item={item}
        index={index}
        sizes="(min-width: 1024px) 50vw, 100vw"
        maxWidth={1100}
        // The image fills whatever the grid gives it instead of dictating the row height.
        className={cn('min-h-36 flex-1 rounded-none [&_img]:absolute [&_img]:inset-0', row && 'sm:min-h-0 sm:w-1/2 sm:flex-none')}
      />
      <div className={cn('flex flex-col gap-2', PAD, row && media ? 'sm:w-1/2 sm:justify-center' : !media && 'flex-1 justify-end')}>
        <Label ctx={ctx} item={item} index={index} />
        <ProjectMeta ctx={ctx} item={item} index={index} />
        <Title ctx={ctx} item={item} index={index} heading={heading} className={big ? 'site-h3' : 'site-h4'} />
        <Description
          ctx={ctx}
          item={item}
          index={index}
          className={cn('site-muted site-small', !big && ctx.mode !== 'editor' && 'line-clamp-2')}
        />
        {big ? <ProjectTags ctx={ctx} item={item} index={index} /> : null}
        <ProjectActions ctx={ctx} item={item} stretch className="site-small pt-1" />
      </div>
    </div>
  )
}

function IntroCell({ ctx, item, index, heading, size }: CellProps) {
  const big = size === 'lg' || size === 'wide'
  const link = mainLink(ctx, item)
  return (
    <div className="flex flex-1 flex-col justify-center gap-4 p-5 sm:p-7">
      {hasImage(ctx, item.image) ? <Thumb ctx={ctx} item={item} index={index} className="size-16 rounded-full sm:size-20" /> : null}
      <Label ctx={ctx} item={item} index={index} />
      <Title ctx={ctx} item={item} index={index} heading={heading} className={big ? 'site-h1' : 'site-h2'} />
      <Description ctx={ctx} item={item} index={index} className="site-lead" />
      <ProjectTags ctx={ctx} item={item} index={index} />
      {link ? (
        <A ctx={ctx} link={link} className="site-link inline-flex items-center gap-1.5 self-start font-semibold">
          {st(ctx.locale, 'learnMore')}
          <Icon name="arrow-right" className="size-4 shrink-0 rtl:-scale-x-100" />
        </A>
      ) : null}
    </div>
  )
}

/** The picture is the card; its title is a caption chip. */
function PhotoCell({ ctx, item, index }: CellProps) {
  const link = mainLink(ctx, item)
  const title = plainText(pick(item.title, ctx.locale))
  return (
    <>
      <ProjectMedia
        ctx={ctx}
        item={item}
        index={index}
        sizes="(min-width: 1024px) 50vw, 100vw"
        maxWidth={1100}
        className="absolute inset-0 rounded-none"
      />
      <T
        ctx={ctx}
        path={`items.${index}.title`}
        value={item.title}
        as="p"
        className="bg-site-surface text-site-text site-small rounded-site-sm absolute start-3 bottom-3 z-10 max-w-[calc(100%-1.5rem)] px-3 py-1.5 font-medium"
        placeholder="Caption"
      />
      {link ? (
        <A ctx={ctx} link={link} label={title || st(ctx.locale, 'open')} className={stretched(ctx)}>
          <span className="sr-only">{title || st(ctx.locale, 'open')}</span>
        </A>
      ) : null}
    </>
  )
}

/** "Currently …" — a live dot, then what and where. */
function StatusCell({ ctx, item, index, heading }: CellProps) {
  return (
    <div className={cn('flex flex-1 flex-col justify-between gap-4', PAD)}>
      <div className="flex items-start justify-between gap-3">
        <Label ctx={ctx} item={item} index={index} className="site-badge" />
        {hasImage(ctx, item.image) ? <Thumb ctx={ctx} item={item} index={index} className="rounded-site-sm size-10" /> : null}
      </div>
      <div className="flex flex-col gap-1">
        <Title ctx={ctx} item={item} index={index} heading={heading} className="site-h4" />
        <Description ctx={ctx} item={item} index={index} className="site-muted site-small" />
      </div>
    </div>
  )
}

/** Street grid, drawn with theme colours only. Decorative — the place name is the text below it. */
const MAP_LINE = 'color-mix(in oklab, var(--site-primary) 24%, transparent)'
const MAP_STYLE: CSSProperties = {
  backgroundColor: 'color-mix(in oklab, var(--site-primary) 9%, var(--site-surface))',
  backgroundImage: `linear-gradient(${MAP_LINE} 1px, transparent 1px), linear-gradient(90deg, ${MAP_LINE} 1px, transparent 1px)`,
  backgroundSize: '1.5rem 1.5rem',
}

function LocationCell({ ctx, item, index, heading }: CellProps) {
  return (
    <>
      <div aria-hidden="true" className="relative min-h-20 flex-1 overflow-hidden" style={MAP_STYLE}>
        <span className="bg-site-surface absolute -inset-x-6 top-[58%] h-2.5 -rotate-12" />
        <span className="bg-site-surface absolute -inset-y-6 start-[30%] w-2.5 rotate-12" />
        <span className="bg-site-primary text-site-on-primary ring-site-primary/25 absolute inset-0 m-auto flex size-9 items-center justify-center rounded-full ring-8">
          <Icon name="map-pin" className="size-5" />
        </span>
      </div>
      <div className={cn('flex flex-col gap-1', PAD)}>
        <Label ctx={ctx} item={item} index={index} className="site-small site-muted" />
        <Title ctx={ctx} item={item} index={index} heading={heading} className="site-h4" />
        <Description ctx={ctx} item={item} index={index} className="site-muted site-small" />
      </div>
    </>
  )
}

/** "Now learning" — laid out like a now-playing card: cover, level bars, title. */
function LearningCell({ ctx, item, index, heading }: CellProps) {
  return (
    <div className={cn('flex flex-1 flex-col justify-between gap-4', PAD)}>
      <div className="flex items-start justify-between gap-3">
        {hasImage(ctx, item.image) ? (
          <Thumb ctx={ctx} item={item} index={index} className="rounded-site-sm size-12" />
        ) : (
          <span className="bg-site-primary text-site-on-primary rounded-site-sm flex size-12 shrink-0 items-center justify-center">
            <Icon name="book-open" className="size-6" />
          </span>
        )}
        <span aria-hidden="true" className="flex h-5 items-end gap-1">
          <span className="bg-site-primary h-2/5 w-1 rounded-full" />
          <span className="bg-site-primary h-full w-1 rounded-full" />
          <span className="bg-site-primary h-3/5 w-1 rounded-full" />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <Label ctx={ctx} item={item} index={index} className="site-small site-muted" />
        <Title ctx={ctx} item={item} index={index} heading={heading} className="site-h4" />
        <Description ctx={ctx} item={item} index={index} className="site-muted site-small" />
      </div>
    </div>
  )
}

/** One account when the item names a platform; otherwise the site's own social links. */
function SocialCell({ ctx, item, index, heading: Tag }: CellProps) {
  const href = item.platform && item.handle ? socialUrl(item.platform, item.handle) : undefined
  if (!item.platform || !href) {
    return (
      <div className={cn('flex flex-1 flex-col justify-between gap-4', PAD)}>
        <div className="flex flex-col gap-1">
          <Label ctx={ctx} item={item} index={index} className="site-small site-muted" />
          <Title ctx={ctx} item={item} index={index} heading={Tag} className="site-h4" />
          <Description ctx={ctx} item={item} index={index} className="site-muted site-small" />
        </div>
        <SocialLinks ctx={ctx} links={ctx.site.settings.social} variant="icons" />
      </div>
    )
  }
  const name = pick(SOCIAL_LABELS[item.platform], ctx.locale)
  const link: LinkRef = { type: 'url', value: href, newTab: true }
  return (
    <div className={cn('flex flex-1 flex-col justify-between gap-4', PAD)}>
      <div className="flex items-start justify-between gap-3">
        <BrandIcon platform={item.platform} className="text-site-primary size-8" />
        <Icon name="arrow-up-right" className="text-site-muted size-5 shrink-0 rtl:-scale-x-100" />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <Tag className="site-h4">
          <A ctx={ctx} link={link} label={st(ctx.locale, 'followOn', { platform: name })} className={stretched(ctx)}>
            {filled(ctx, item.title) ? <T ctx={ctx} path={`items.${index}.title`} value={item.title} /> : name}
          </A>
        </Tag>
        <p className="site-muted site-small truncate">
          {/* Handles are Latin: isolate them so "@" stays in front in Arabic. */}
          <bdi>
            <T ctx={ctx} path={`items.${index}.handle`} value={item.handle} />
          </bdi>
        </p>
      </div>
    </div>
  )
}

/** The one filled card. Falls back to the site's email when the item has no link. */
function ContactCell({ ctx, item, index, heading }: CellProps) {
  const email = ctx.site.settings.contact?.email
  const link: LinkRef | undefined = linkWorks(ctx, item.link) ? item.link : email ? { type: 'email', value: email } : undefined
  const title = plainText(pick(item.title, ctx.locale))
  return (
    <div className={cn('flex flex-1 flex-col justify-between gap-4', PAD)}>
      <div className="flex items-start justify-between gap-3">
        <Label ctx={ctx} item={item} index={index} className="site-small font-semibold opacity-85" />
        <Icon name="arrow-up-right" className="ms-auto size-6 shrink-0 rtl:-scale-x-100" />
      </div>
      <div className="flex flex-col gap-1">
        <Title ctx={ctx} item={item} index={index} heading={heading} className="site-h3">
          {link ? (
            <A ctx={ctx} link={link} label={title || undefined} className={stretched(ctx)}>
              <T ctx={ctx} path={`items.${index}.title`} value={item.title} placeholder="Title" />
            </A>
          ) : undefined}
        </Title>
        <Description ctx={ctx} item={item} index={index} className="site-small opacity-90" />
      </div>
    </div>
  )
}

const CELLS: Record<ProjectKind, (props: CellProps) => ReactNode> = {
  project: ProjectCell,
  intro: IntroCell,
  photo: PhotoCell,
  status: StatusCell,
  location: LocationCell,
  learning: LearningCell,
  social: SocialCell,
  contact: ContactCell,
}

export function Bento({ ctx, section, content }: ProjectsVariantProps) {
  const heading = itemHeading(ctx, content)
  // As a whole home page there is no hero: the first intro card carries the page's h1.
  const introH1 = ctx.index === 0 && heading === 'h2' ? content.items.findIndex((item) => item.kind === 'intro') : -1
  return (
    <ProjectsShell ctx={ctx} section={section} content={content}>
      {content.items.length === 0 ? null : (
        <div className="grid grid-flow-dense auto-rows-[minmax(11rem,auto)] grid-cols-2 gap-4 text-start lg:auto-rows-[minmax(13.5rem,auto)] lg:grid-cols-4 lg:gap-5">
          {content.items.map((item, index) => {
            // A photo card without a photo would be an empty box: show it as a plain card instead.
            const kind: ProjectKind = item.kind === 'photo' && !hasMedia(ctx, item) ? 'project' : (item.kind ?? 'project')
            const size = item.size ?? defaultSize(kind)
            const Cell = CELLS[kind]
            return (
              <article
                key={item.id}
                {...itemAttrs(ctx, 'items', index)}
                data-reveal=""
                data-interactive=""
                data-kind={kind}
                className={cn(
                  'site-card relative flex min-w-0 flex-col overflow-hidden',
                  span(size, COMPACT.has(kind)),
                  kind === 'contact' && 'bg-site-primary text-site-on-primary border-site-primary',
                )}
              >
                <Cell ctx={ctx} item={item} index={index} size={size} heading={index === introH1 ? 'h1' : heading} />
              </article>
            )
          })}
        </div>
      )}
    </ProjectsShell>
  )
}
