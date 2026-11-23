/**
 * Pieces shared by the Gallery variants. Isomorphic — no hooks.
 */
import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { pick, plainText, type Localized } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import {
  Btn,
  Container,
  FilterTabs,
  hasButton,
  hasImage,
  hasText,
  Img,
  itemAttrs,
  Lightbox,
  SectionHeader,
  T,
  type FilterCategory,
  type LightboxImage,
} from '../_shared'
import type { BlockContext, BlockProps } from '../types'
import type { GalleryContent, GalleryItem } from './schema'

export type GalleryVariantProps = BlockProps<GalleryContent>

function text(ctx: BlockContext, value: Localized | undefined): string {
  return plainText(pick(value, ctx.locale)).trim()
}

/** Categories at least one item uses. Empty when the filter is off or would offer a single choice. */
export function filterCategories(ctx: BlockContext, content: GalleryContent): FilterCategory[] {
  if (content.showFilter === false) return []
  const used = new Set(content.items.map((item) => item.category))
  const categories = (content.categories ?? [])
    .filter((category) => used.has(category.id))
    .map((category) => ({ value: category.id, label: text(ctx, category.label) }))
    .filter((category) => category.label !== '')
  return categories.length > 1 ? categories : []
}

/** "Ink on paper · 50 × 70 cm · 2025" — only the parts that are filled. */
function detailLine(ctx: BlockContext, item: GalleryItem): string {
  return [text(ctx, item.medium), text(ctx, item.size), item.year?.trim() ?? ''].filter(Boolean).join(' · ')
}

/**
 * The lightbox list and, per item, its position in it (-1 when the item has no image).
 * Off in the editor, where a click must select, not open a viewer.
 */
export function lightboxOf(ctx: BlockContext, items: GalleryItem[]): { images: LightboxImage[]; indexes: number[] } {
  const images: LightboxImage[] = []
  const indexes = items.map((item) => {
    if (ctx.mode === 'editor' || !item.image?.url) return -1
    const caption = [text(ctx, item.caption), detailLine(ctx, item)].filter(Boolean).join(' — ')
    images.push({ src: item.image.url, alt: text(ctx, item.image.alt) || text(ctx, item.caption), caption: caption || undefined })
    return images.length - 1
  })
  return { images, indexes }
}

/* ── Section shell ───────────────────────────────────────────────────────── */

export function GalleryShell({
  ctx,
  section,
  content,
  children,
}: Pick<GalleryVariantProps, 'ctx' | 'section' | 'content'> & { children: ReactNode }) {
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {children}
      {hasButton(ctx, content.cta) ? (
        <div className={cn('flex', content.items.length > 0 && 'mt-10 md:mt-14', section.style.textAlign === 'center' && 'justify-center')}>
          <Btn ctx={ctx} path="cta" value={content.cta} variant="outline" />
        </div>
      ) : null}
    </Container>
  )
}

/** Filter tabs (when there are categories) around the items, inside the lightbox. */
export function GalleryList({
  ctx,
  content,
  images,
  className,
  children,
}: {
  ctx: BlockContext
  content: GalleryContent
  images: LightboxImage[]
  className: string
  children: ReactNode
}) {
  const categories = filterCategories(ctx, content)
  const list =
    categories.length > 0 ? (
      <FilterTabs categories={categories} locale={ctx.locale} listClassName={className}>
        {children}
      </FilterTabs>
    ) : (
      <div className={className}>{children}</div>
    )
  return images.length > 0 ? (
    <Lightbox images={images} locale={ctx.locale} dir={ctx.dir}>
      {list}
    </Lightbox>
  ) : (
    list
  )
}

/* ── One picture ─────────────────────────────────────────────────────────── */

export interface TileProps {
  ctx: BlockContext
  item: GalleryItem
  index: number
  /** Position in the lightbox, -1 for none. */
  lightbox: number
  className?: string
  style?: CSSProperties
  /** Classes and style of the image frame (give it a size: aspect ratio or height). */
  mediaClassName?: string
  mediaStyle?: CSSProperties
  sizes?: string
  /** Show medium · size · year under the caption (gallery wall). */
  details?: boolean
}

/** A figure: the image (a lightbox trigger when it can open) and its caption. Renders nothing without an image outside the editor. */
export function Tile({ ctx, item, index, lightbox, className, style, mediaClassName, mediaStyle, sizes, details }: TileProps) {
  if (!hasImage(ctx, item.image)) return null
  const path = `items.${index}`
  const media = (
    <Img ctx={ctx} path={`${path}.image`} value={item.image} alt={text(ctx, item.caption)} sizes={sizes} maxWidth={1200} className="size-full object-cover" />
  )
  const frame = 'site-media block w-full'
  const parts = details
    ? ([
        ['medium', item.medium],
        ['size', item.size],
        ['year', item.year],
      ] as const).filter(([, value]) => hasText(ctx, value))
    : []
  const hasCaption = hasText(ctx, item.caption) || parts.length > 0

  return (
    <figure data-reveal data-category={item.category || undefined} className={cn('min-w-0', className)} style={style} {...itemAttrs(ctx, 'items', index)}>
      {lightbox >= 0 ? (
        <button
          type="button"
          data-lightbox-index={lightbox}
          aria-haspopup="dialog"
          className={cn(frame, 'group cursor-zoom-in [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:hover:[&_img]:scale-100', mediaClassName)}
          style={mediaStyle}
        >
          {media}
        </button>
      ) : (
        <div className={cn(frame, mediaClassName)} style={mediaStyle}>
          {media}
        </div>
      )}
      {hasCaption ? (
        <figcaption className="mt-3 flex flex-col gap-1">
          <T ctx={ctx} path={`${path}.caption`} value={item.caption} as="span" className="site-small text-site-text font-medium" placeholder="Caption" />
          {parts.length > 0 ? (
            <span className="site-small site-muted">
              {parts.map(([key, value], i) => (
                <Fragment key={key}>
                  {i > 0 ? <span aria-hidden="true"> · </span> : null}
                  <T ctx={ctx} path={`${path}.${key}`} value={value} as="span" placeholder={key} />
                </Fragment>
              ))}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
