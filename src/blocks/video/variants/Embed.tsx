import { cn } from '@/lib/utils'
import { itemAttrs, VideoPlayer } from '../../_shared'
import { ItemText, playable, PlayBadge, Poster, VideoShell, withTitle, type VideoVariantProps } from '../parts'

/**
 * One video in the kit player. YouTube / Vimeo show the poster and load the
 * third-party iframe only after the visitor presses play.
 * `big` (reel) = a wider frame, larger title, and muted autoplay when asked.
 */
export function Embed({ ctx, section, content, big }: VideoVariantProps & { big?: boolean }) {
  const item = content.items[0]
  const live = playable(ctx, item)
  // Nothing to show outside the editor: no item, or neither a video nor a poster.
  const visible = item && (ctx.mode === 'editor' || live || Boolean(item.video.poster?.url))
  return (
    <VideoShell ctx={ctx} section={section} content={content} hasBody={Boolean(visible)}>
      {visible ? (
        <figure data-reveal className={cn('min-w-0', !big && 'max-w-5xl')} {...itemAttrs(ctx, 'items', 0)}>
          {live ? (
            <VideoPlayer
              video={withTitle(item)}
              locale={ctx.locale}
              mode={big && content.autoplay ? 'background' : 'player'}
              ratioClassName={big ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'}
            />
          ) : (
            <div className={cn('site-media group relative overflow-hidden', big ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video')}>
              <Poster ctx={ctx} item={item} index={0} sizes="100vw" priority={ctx.index === 0} />
              {ctx.mode === 'editor' ? <PlayBadge /> : null}
            </div>
          )}
          <figcaption className="empty:hidden">
            <ItemText ctx={ctx} item={item} index={0} large={big} className={cn('mt-5', big && 'md:mt-7')} />
          </figcaption>
        </figure>
      ) : null}
    </VideoShell>
  )
}
