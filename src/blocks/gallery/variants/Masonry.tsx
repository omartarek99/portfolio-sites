import { GalleryList, GalleryShell, lightboxOf, Tile, type GalleryVariantProps } from '../parts'

const COLUMNS = {
  '2': 'sm:columns-2',
  '3': 'sm:columns-2 lg:columns-3',
  '4': 'columns-2 lg:columns-4',
} as const

/** Used when an image does not say how big it is, so the wall still has rhythm. */
const FALLBACK = ['4 / 5', '4 / 3', '1 / 1', '3 / 4']

/** CSS columns: every image keeps its natural proportions. */
export function Masonry({ ctx, section, content }: GalleryVariantProps) {
  const columns = content.columns ?? '3'
  const { images, indexes } = lightboxOf(ctx, content.items)
  return (
    <GalleryShell ctx={ctx} section={section} content={content}>
      {content.items.length > 0 ? (
        <GalleryList ctx={ctx} content={content} images={images} className={`gap-4 md:gap-6 ${COLUMNS[columns]}`}>
          {content.items.map((item, index) => {
            const { width, height } = item.image ?? {}
            return (
              <Tile
                key={item.id}
                ctx={ctx}
                item={item}
                index={index}
                lightbox={indexes[index]}
                className="mb-4 break-inside-avoid md:mb-6"
                mediaStyle={{ aspectRatio: width && height ? `${width} / ${height}` : FALLBACK[index % FALLBACK.length] }}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            )
          })}
        </GalleryList>
      ) : null}
    </GalleryShell>
  )
}
