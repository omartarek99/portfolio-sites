'use client'

/**
 * Plays a `VideoRef` (SPEC §7): an uploaded file, YouTube or Vimeo.
 *
 * - file + `mode="player"`: a plain <video controls>
 * - file + `mode="background"`: muted, looping wallpaper with a "play with
 *   sound" button. It never autoplays under reduced motion.
 * - YouTube / Vimeo: the poster and a play button. The third-party iframe is
 *   requested only after the visitor presses play, so no tracker loads on page
 *   view and the embed never blocks the LCP.
 */
import { useEffect, useRef, useState } from 'react'
import { Play, Volume2 } from 'lucide-react'
import { pick, plainText, type Locale, type VideoRef } from '@/schemas/fields'
import { detectVideoProvider, imageSrcSet, imageUrl, videoEmbedUrl, youtubePoster } from '@/lib/media-url'
import { safeUrl } from '@/lib/links'
import { cn } from '@/lib/utils'
import { st } from './strings'

export interface VideoPlayerProps {
  video: VideoRef
  locale: Locale
  /** background = muted autoplaying wallpaper. Default player. */
  mode?: 'player' | 'background'
  /** Aspect-ratio class. Default `aspect-video` (16:9). Pass '' to fill the parent. */
  ratioClassName?: string
  className?: string
}

export function VideoPlayer({
  video,
  locale,
  mode = 'player',
  ratioClassName = 'aspect-video',
  className,
}: VideoPlayerProps) {
  const url = safeUrl(video.url)
  const provider = video.provider ?? (url ? detectVideoProvider(url) : 'file')
  const title = plainText(pick(video.title, locale))
  const videoRef = useRef<HTMLVideoElement>(null)
  const [withSound, setWithSound] = useState(false)
  const [playing, setPlaying] = useState(false)

  const background = mode === 'background' && provider === 'file'

  // Background videos start themselves — but only if the visitor welcomes motion.
  useEffect(() => {
    if (!background) return
    const element = videoRef.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    void element.play().catch(() => undefined)
  }, [background])

  if (!url) return null

  const wrapper = cn('site-media relative overflow-hidden', ratioClassName, className)

  if (provider === 'file') {
    return (
      <div className={wrapper}>
        <video
          ref={videoRef}
          src={url}
          poster={video.poster?.url ? imageUrl(video.poster.url, { width: 1280 }) : undefined}
          controls={!background || withSound}
          muted={background && !withSound}
          loop={background}
          playsInline
          preload={background ? 'auto' : 'metadata'}
          title={title || undefined}
          className="size-full object-cover"
        />
        {background && !withSound ? (
          <button
            type="button"
            onClick={() => {
              setWithSound(true)
              const element = videoRef.current
              if (element) {
                element.muted = false
                void element.play().catch(() => undefined)
              }
            }}
            className="site-btn absolute bottom-4 end-4"
            data-variant="secondary"
            data-size="sm"
          >
            <Volume2 aria-hidden="true" className="size-4" />
            <span>{st(locale, 'playWithSound')}</span>
          </button>
        ) : null}
      </div>
    )
  }

  const embed = videoEmbedUrl(url, { autoplay: true })
  const poster = video.poster?.url ?? (provider === 'youtube' ? youtubePoster(url) : undefined)

  return (
    <div className={wrapper}>
      {playing && embed ? (
        <iframe
          src={embed}
          title={title || st(locale, 'playVideo')}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={title ? `${st(locale, 'playVideo')}: ${title}` : st(locale, 'playVideo')}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          {poster ? (
            <img
              src={imageUrl(poster, { width: 1280 })}
              srcSet={imageSrcSet(poster, 1600)}
              sizes="100vw"
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <span className="bg-site-surface absolute inset-0" />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="bg-site-primary text-site-on-primary flex size-16 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <Play aria-hidden="true" className="size-7 fill-current ps-0.5 rtl:-scale-x-100" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
