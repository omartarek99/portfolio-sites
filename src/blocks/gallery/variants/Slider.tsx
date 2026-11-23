import { pick, plainText } from '@/schemas/fields'
import { Carousel, Lightbox } from '../../_shared'
import { GalleryShell, lightboxOf, Tile, type GalleryVariantProps } from '../parts'

/** Slide width per view: the wanted fraction on wide screens, never narrower than a comfortable phone slide. */
const BASIS = {
  '1': '100%',
  '2': 'max(calc((100% - 1.25rem) / 2), min(100%, 20rem))',
  '3': 'max(calc((100% - 2.5rem) / 3), min(100%, 18rem))',
} as const

const SIZES = {
  '1': '(min-width: 1280px) 1200px, 100vw',
  '2': '(min-width: 768px) 50vw, 90vw',
  '3': '(min-width: 1024px) 33vw, 80vw',
} as const

/** Kit carousel, one or more images per view. No filter: hidden slides would break the snapping. */
export function Slider({ ctx, section, content }: GalleryVariantProps) {
  const perView = content.perView ?? '1'
  const { images, indexes } = lightboxOf(ctx, content.items)
  const label = plainText(pick(content.heading, ctx.locale)) || undefined
  const carousel = (
    <Carousel locale={ctx.locale} dir={ctx.dir} label={label} slideBasis={BASIS[perView]}>
      {content.items.map((item, index) => (
        <Tile
          key={item.id}
          ctx={ctx}
          item={item}
          index={index}
          lightbox={indexes[index]}
          mediaClassName={perView === '1' ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[4/5]'}
          sizes={SIZES[perView]}
        />
      ))}
    </Carousel>
  )
  return (
    <GalleryShell ctx={ctx} section={section} content={content}>
      {content.items.length === 0 ? null : images.length > 0 ? (
        <Lightbox images={images} locale={ctx.locale} dir={ctx.dir}>
          {carousel}
        </Lightbox>
      ) : (
        carousel
      )}
    </GalleryShell>
  )
}
