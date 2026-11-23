/**
 * Pieces shared by the Video variants. Isomorphic — no hooks.
 */
import type { ReactNode } from 'react'
import { Play } from 'lucide-react'
import { pick, plainText, type Localized } from '@/schemas/fields'
import { safeUrl } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Btn, Container, hasButton, hasImage, hasText, Img, SectionHeader, T } from '../_shared'
import type { BlockContext, BlockProps } from '../types'
import type { VideoContent, VideoItem } from './schema'

export type VideoVariantProps = BlockProps<VideoContent>

export function text(ctx: BlockContext, value: Localized | undefined): string {
  return plainText(pick(value, ctx.locale)).trim()
}

/** A video the visitor can actually play: a safe URL, and never inside the editor (a click there selects). */
export function playable(ctx: BlockContext, item: VideoItem | undefined): boolean {
  return ctx.mode !== 'editor' && Boolean(item && safeUrl(item.video.url))
}

/** The item's video with its title filled from the item, for the player's labels. */
export function withTitle(item: VideoItem): VideoItem['video'] {
  return { ...item.video, title: item.video.title ?? item.title }
}

export function VideoShell({
  ctx,
  section,
  content,
  hasBody,
  children,
}: Pick<VideoVariantProps, 'ctx' | 'section' | 'content'> & { hasBody: boolean; children: ReactNode }) {
  return (
    <Container section={section}>
      <SectionHeader ctx={ctx} content={content} section={section} />
      {children}
      {hasButton(ctx, content.cta) ? (
        <div className={cn('flex', hasBody && 'mt-10 md:mt-14', section.style.textAlign === 'center' && 'justify-center')}>
          <Btn ctx={ctx} path="cta" value={content.cta} variant="outline" />
        </div>
      ) : null}
    </Container>
  )
}

/** Round play glyph centred over a poster. Decorative: the surrounding control carries the label. */
export function PlayBadge({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span
        className={cn(
          'bg-site-primary text-site-on-primary flex size-14 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:size-16',
          className,
        )}
      >
        <Play className="size-6 fill-current ps-0.5 rtl:-scale-x-100 md:size-7" />
      </span>
    </span>
  )
}

/** Duration label pinned to the poster's corner ("1:45"). */
export function Duration({ ctx, item, index }: { ctx: BlockContext; item: VideoItem; index: number }) {
  if (!item.duration?.trim()) return null
  return (
    <T
      ctx={ctx}
      path={`items.${index}.duration`}
      value={item.duration}
      className="bg-site-bg/85 text-site-text site-small absolute end-3 bottom-3 rounded px-2 py-0.5 font-medium tabular-nums"
    />
  )
}

/** The poster as an editable image (editor, or a video without a usable URL). */
export function Poster({ ctx, item, index, sizes, priority }: { ctx: BlockContext; item: VideoItem; index: number; sizes: string; priority?: boolean }) {
  if (!hasImage(ctx, item.video.poster)) return <span className="bg-site-surface absolute inset-0" />
  return (
    <Img
      ctx={ctx}
      path={`items.${index}.video.poster`}
      value={item.video.poster}
      alt={text(ctx, item.title)}
      sizes={sizes}
      maxWidth={1600}
      priority={priority}
      className="absolute inset-0 size-full object-cover"
    />
  )
}

/** Title, description — only what is filled. */
export function ItemText({ ctx, item, index, large, className }: { ctx: BlockContext; item: VideoItem; index: number; large?: boolean; className?: string }) {
  const title = hasText(ctx, item.title)
  const description = hasText(ctx, item.description)
  if (!title && !description) return null
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {title ? (
        <T ctx={ctx} path={`items.${index}.title`} value={item.title} as="h3" className={large ? 'site-h3' : 'site-h4'} placeholder="Title" />
      ) : null}
      {description ? (
        <T ctx={ctx} path={`items.${index}.description`} value={item.description} as="p" className="site-muted" placeholder="Description" multiline />
      ) : null}
    </div>
  )
}
