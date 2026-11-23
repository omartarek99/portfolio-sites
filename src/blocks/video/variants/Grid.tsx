import { safeUrl } from '@/lib/links'
import { detectVideoProvider } from '@/lib/media-url'
import { cn } from '@/lib/utils'
import { FilterTabs, itemAttrs, st, type FilterCategory } from '../../_shared'
import type { BlockContext } from '../../types'
import { Duration, ItemText, playable, PlayBadge, Poster, text, VideoShell, withTitle, type VideoVariantProps } from '../parts'
import type { VideoContent } from '../schema'
import { VideoLightbox, type GridVideo } from './VideoGrid.client'

const COLUMNS = { '2': 'sm:grid-cols-2', '3': 'sm:grid-cols-2 lg:grid-cols-3' } as const
const SIZES = { '2': '(min-width: 640px) 50vw, 100vw', '3': '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' } as const

/** Categories at least one item uses; empty when the filter is off or would offer a single choice. */
function filterCategories(ctx: BlockContext, content: VideoContent): FilterCategory[] {
  if (content.showFilter === false) return []
  const used = new Set(content.items.map((item) => item.category))
  const categories = (content.categories ?? [])
    .filter((category) => used.has(category.id))
    .map((category) => ({ value: category.id, label: text(ctx, category.label) }))
    .filter((category) => category.label !== '')
  return categories.length > 1 ? categories : []
}

/**
 * Grid of posters (Motion Reel). With a mouse, an uploaded video previews muted
 * on hover; a click (or Enter) opens it full screen. Touch and keyboard get the
 * poster and the play badge.
 */
export function Grid({ ctx, section, content }: VideoVariantProps) {
  const columns = content.columns ?? '3'
  const videos: GridVideo[] = []
  const tiles = content.items.map((item, index) => {
    const live = playable(ctx, item)
    if (!live && ctx.mode !== 'editor' && !item.video.poster?.url) return null
    const lightbox = live ? videos.push({ video: withTitle(item), title: text(ctx, item.title), description: text(ctx, item.description) }) - 1 : -1
    const url = live ? safeUrl(item.video.url) : undefined
    const preview = url && (item.video.provider ?? detectVideoProvider(url)) === 'file' ? url : undefined
    const media = (
      <>
        <Poster ctx={ctx} item={item} index={index} sizes={SIZES[columns]} />
        {preview ? (
          <video
            data-preview
            src={preview}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 data-[playing]:opacity-100 motion-reduce:transition-none"
          />
        ) : null}
        {live || ctx.mode === 'editor' ? <PlayBadge className="opacity-90 group-hover:opacity-100" /> : null}
        <Duration ctx={ctx} item={item} index={index} />
      </>
    )
    const frame = 'site-media group relative block aspect-video w-full overflow-hidden'
    const title = text(ctx, item.title)
    return (
      <article key={item.id} data-reveal data-category={item.category || undefined} className="flex min-w-0 flex-col gap-4" {...itemAttrs(ctx, 'items', index)}>
        {live ? (
          <button
            type="button"
            data-video-index={lightbox}
            aria-haspopup="dialog"
            aria-label={title ? `${st(ctx.locale, 'playVideo')}: ${title}` : st(ctx.locale, 'playVideo')}
            className={cn(frame, 'cursor-pointer')}
          >
            {media}
          </button>
        ) : (
          <div className={frame}>{media}</div>
        )}
        <ItemText ctx={ctx} item={item} index={index} />
      </article>
    )
  })
  const shown = tiles.filter(Boolean).length > 0

  const listClass = cn('grid gap-x-6 gap-y-10', COLUMNS[columns])
  const categories = filterCategories(ctx, content)
  const list =
    categories.length > 0 ? (
      <FilterTabs categories={categories} locale={ctx.locale} listClassName={listClass}>
        {tiles}
      </FilterTabs>
    ) : (
      <div className={listClass}>{tiles}</div>
    )

  return (
    <VideoShell ctx={ctx} section={section} content={content} hasBody={shown}>
      {!shown ? null : videos.length > 0 ? (
        <VideoLightbox videos={videos} locale={ctx.locale}>
          {list}
        </VideoLightbox>
      ) : (
        list
      )}
    </VideoShell>
  )
}
