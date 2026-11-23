import type { CSSProperties } from 'react'
import { pick, plainText, type ImageRef } from '@/schemas/fields'
import { imageSrcSet, imageUrl } from '@/lib/media-url'
import { cn } from '@/lib/utils'
import type { BlockContext } from '../types'
import { getEditorSlots } from './slots'

export interface ImgProps {
  ctx: BlockContext
  /** Dot path of the ImageRef relative to `section.content`, e.g. "image" or "items.0.image". */
  path: string
  value: ImageRef | undefined
  /** Classes for the <img>. It fills its container by default (`site-img`). */
  className?: string
  /**
   * The `sizes` attribute: how wide the image is displayed, e.g.
   * "(min-width: 1024px) 50vw, 100vw". Be accurate — it decides which file loads.
   */
  sizes?: string
  /** Largest width ever needed (px). Default 1920. Use ~800 for cards, ~200 for avatars. */
  maxWidth?: number
  /** Above-the-fold image: load eagerly with high priority (hero only). */
  priority?: boolean
  /** Fallback alt text when the image has none (e.g. the item's title). */
  alt?: string
  /** Decorative image: empty alt and hidden from assistive tech. */
  decorative?: boolean
  /** Mark the image for scroll-linked parallax. */
  parallax?: boolean
  style?: CSSProperties
}

/**
 * Image slot. Renders a responsive <img> for an ImageRef; inside the editor it
 * becomes click-to-replace (upload, library, stock, crop, focal point, filter, alt).
 *
 * Wrap it in a sized container — the image fills it:
 *
 *   <div className="site-media aspect-[4/3]">
 *     <Img ctx={ctx} path="image" value={content.image} sizes="(min-width: 1024px) 50vw, 100vw" />
 *   </div>
 *
 * Renders nothing when there is no image (outside the editor): check
 * `hasImage(ctx, value)` to adapt the layout.
 */
export function Img({ ctx, path, value, className, sizes = '100vw', maxWidth = 1920, priority, alt, decorative, parallax, style }: ImgProps) {
  const url = value?.url
  const focal = value?.focal
  const altText = decorative ? '' : plainText(pick(value?.alt, ctx.locale)) || alt || ''
  const filter = value?.filter && value.filter !== 'none' ? value.filter : undefined

  const image = url ? (
    <img
      src={imageUrl(url, { width: Math.min(maxWidth, 1280) })}
      srcSet={imageSrcSet(url, maxWidth)}
      sizes={sizes}
      alt={altText}
      aria-hidden={decorative ? true : undefined}
      width={value?.width}
      height={value?.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      draggable={false}
      data-filter={filter && filter !== 'duotone' ? filter : undefined}
      data-parallax={parallax ? '' : undefined}
      className={cn('site-img', className)}
      style={focal ? { objectPosition: `${focal.x * 100}% ${focal.y * 100}%`, ...style } : style}
    />
  ) : null

  const rendered = image && filter === 'duotone' ? <span className="site-duotone block size-full">{image}</span> : image

  if (ctx.mode === 'editor') {
    const slots = getEditorSlots()
    if (slots) {
      return (
        <slots.Image ctx={ctx} path={path} value={value} className={className}>
          {rendered}
        </slots.Image>
      )
    }
  }
  return rendered
}

/** True when there is an image to show in this context (always true in the editor, which shows a placeholder). */
export function hasImage(ctx: BlockContext, value: ImageRef | undefined): boolean {
  return ctx.mode === 'editor' || Boolean(value?.url)
}
