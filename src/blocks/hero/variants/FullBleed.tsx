import { cn } from '@/lib/utils'
import { hasImage, hasText, Img, T } from '../../_shared'
import { ht } from '../strings'
import { heroSlides, MediaShell, personName, type HeroProps } from './parts'
import { Slideshow } from './Slideshow.client'

/**
 * Full-screen picture behind the copy. Two or more `images` become a slow
 * cross-fading slideshow (Noir Lens); otherwise `image` is used. Optional
 * technical label in the top corner (Blueprint).
 */
export function FullBleed({ content, ctx }: HeroProps) {
  const slides = heroSlides(ctx, content)
  const alt = personName({ content, ctx })
  const zoom = content.kenBurns !== false

  let media = null
  if (slides.length > 1) {
    media = (
      <Slideshow
        kenBurns={zoom}
        labels={{ pause: ht(ctx.locale, 'pauseSlides'), play: ht(ctx.locale, 'playSlides') }}
        slides={slides.map(({ item, index }) => (
          <Img
            key={item.id}
            ctx={ctx}
            path={`images.${index}.image`}
            value={item.image}
            alt={alt}
            className="size-full object-cover"
            priority={index === slides[0].index}
          />
        ))}
      />
    )
  } else if (slides.length === 1 || hasImage(ctx, content.image)) {
    const one = slides[0]
    media = (
      <div className={cn('size-full', zoom && 'site-kenburns')}>
        <Img
          ctx={ctx}
          path={one ? `images.${one.index}.image` : 'image'}
          value={one ? one.item.image : content.image}
          alt={alt}
          className="size-full object-cover"
          priority
        />
      </div>
    )
  }

  return (
    <MediaShell ctx={ctx} content={content} media={media}>
      {hasText(ctx, content.overlayLabel) ? (
        <div className="site-container pointer-events-none absolute inset-x-0 top-6 z-10 flex justify-end md:top-8">
          <p className="border-site-border pointer-events-auto flex items-center gap-3 border-s ps-3 font-mono text-xs tracking-wider text-site-muted">
            <span aria-hidden="true" className="relative size-3 shrink-0">
              <span className="bg-site-text absolute inset-x-0 top-1/2 h-px" />
              <span className="bg-site-text absolute inset-y-0 start-1/2 w-px" />
            </span>
            <T ctx={ctx} path="overlayLabel" value={content.overlayLabel} placeholder="25.28° N, 51.53° E" />
          </p>
        </div>
      ) : null}
    </MediaShell>
  )
}
