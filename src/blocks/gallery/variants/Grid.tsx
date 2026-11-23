import { GalleryList, GalleryShell, lightboxOf, Tile, type GalleryVariantProps } from '../parts'

const COLUMNS = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-2 lg:grid-cols-4',
} as const

const SIZES = {
  '2': '(min-width: 640px) 50vw, 100vw',
  '3': '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  '4': '(min-width: 1024px) 25vw, 50vw',
} as const

/** Uniform tiles in the chosen aspect ratio. */
export function Grid({ ctx, section, content }: GalleryVariantProps) {
  const columns = content.columns ?? '3'
  const aspectRatio = (content.ratio ?? '1/1').replace('/', ' / ')
  const { images, indexes } = lightboxOf(ctx, content.items)
  return (
    <GalleryShell ctx={ctx} section={section} content={content}>
      {content.items.length > 0 ? (
        <GalleryList ctx={ctx} content={content} images={images} className={`grid gap-4 md:gap-6 ${COLUMNS[columns]}`}>
          {content.items.map((item, index) => (
            <Tile key={item.id} ctx={ctx} item={item} index={index} lightbox={indexes[index]} mediaStyle={{ aspectRatio }} sizes={SIZES[columns]} />
          ))}
        </GalleryList>
      ) : null}
    </GalleryShell>
  )
}
