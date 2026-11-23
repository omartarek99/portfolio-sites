import { safeUrl } from '@/lib/links'
import { hasImage, Img, VideoPlayer } from '../../_shared'
import { MediaShell, personName, type HeroProps } from './parts'

/**
 * Muted looping showreel behind the copy, with "Play with sound" (Motion Reel).
 * The kit's player shows the poster (the video's own, else `image`) until the
 * video plays and never autoplays under reduced motion. No video: the picture.
 */
export function VideoBg({ content, ctx }: HeroProps) {
  const video = content.video && safeUrl(content.video.url) ? content.video : undefined
  const poster = video?.poster ?? (content.image?.url ? content.image : undefined)

  const media = video ? (
    <VideoPlayer
      video={{ ...video, poster }}
      locale={ctx.locale}
      mode="background"
      ratioClassName=""
      className="size-full rounded-none"
    />
  ) : hasImage(ctx, content.image) ? (
    <Img ctx={ctx} path="image" value={content.image} alt={personName({ content, ctx })} className="size-full object-cover" priority />
  ) : null

  return <MediaShell ctx={ctx} content={content} media={media} />
}
