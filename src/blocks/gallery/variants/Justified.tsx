import { GalleryList, GalleryShell, lightboxOf, Tile, type GalleryVariantProps } from '../parts'

/** Used when an image does not say how big it is. */
const FALLBACK = [4 / 5, 3 / 2, 1, 4 / 3]

/**
 * Justified "gallery wall" (Atelier, Noir Lens). Pure flexbox: every frame
 * starts at the target row height (`--row`) times its aspect ratio and grows in
 * proportion to that ratio, so the frames of a row stretch to the full width
 * while sharing one height. A filler with a huge grow factor stops the last row
 * from blowing up. No measuring, no JavaScript.
 */
export function Justified({ ctx, section, content }: GalleryVariantProps) {
  const { images, indexes } = lightboxOf(ctx, content.items)
  return (
    <GalleryShell ctx={ctx} section={section} content={content}>
      {content.items.length > 0 ? (
        <GalleryList
          ctx={ctx}
          content={content}
          images={images}
          className="flex flex-wrap gap-x-4 gap-y-8 [--row:8.5rem] sm:[--row:12rem] md:gap-x-6 md:gap-y-10 lg:[--row:16rem]"
        >
          {content.items.map((item, index) => {
            const { width, height } = item.image ?? {}
            const ratio = width && height ? width / height : FALLBACK[index % FALLBACK.length]
            return (
              <Tile
                key={item.id}
                ctx={ctx}
                item={item}
                index={index}
                lightbox={indexes[index]}
                details
                mediaClassName="rounded-none border border-site-border bg-site-surface p-1.5 shadow-[0_14px_30px_-18px_color-mix(in_oklab,var(--site-text)_55%,transparent)] sm:p-2.5"
                mediaStyle={{ aspectRatio: String(ratio) }}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                style={{ flexGrow: ratio, flexBasis: `calc(var(--row) * ${ratio.toFixed(4)})` }}
              />
            )
          })}
          <span aria-hidden="true" className="h-0" style={{ flexGrow: 1e6, flexBasis: 0 }} />
        </GalleryList>
      ) : null}
    </GalleryShell>
  )
}
