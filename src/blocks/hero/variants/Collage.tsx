import { cn } from '@/lib/utils'
import { Container, hasImage, hasText, Img, itemAttrs, T } from '../../_shared'
import { heroSlides, HeroText, personName, type HeroProps } from './parts'

/**
 * Where each tile sits on a 6×6 grid, and its tilt. Tiles overlap on purpose;
 * it is still a grid, so the whole collage scales and reflows with its box.
 */
const TILES = [
  'col-[1/5] row-[1/5] -rotate-3',
  'col-[4/7] row-[1/4] rotate-4',
  'col-[3/7] row-[4/7] rotate-2',
  'col-[1/4] row-[4/7] -rotate-5',
  'col-[5/7] row-[3/5] -rotate-2',
]
const STICKERS = [
  'col-[1/3] row-[1/2] -rotate-8 bg-site-accent text-site-on-accent',
  'col-[4/7] row-[6/7] rotate-3 bg-site-primary text-site-on-primary self-end',
  'col-[5/7] row-[1/2] rotate-6 bg-site-secondary text-site-on-secondary justify-self-end',
]

/** Grid Pop: copy beside a playful pile of 3–5 pictures and up to 3 stickers. */
export function Collage({ content, ctx, section }: HeroProps) {
  const tiles = heroSlides(ctx, content).slice(0, TILES.length)
  // No collage pictures: the portrait alone still makes a (smaller) pile.
  const single = tiles.length === 0 && hasImage(ctx, content.image)
  const stickers = (content.stickers ?? []).map((item, index) => ({ item, index })).filter(({ item }) => hasText(ctx, item.text))
  const visual = tiles.length > 0 || single

  return (
    <Container section={section}>
      <div className={cn('grid items-center gap-12 lg:gap-16', visual && 'lg:grid-cols-2')}>
        <HeroText ctx={ctx} content={content} />
        {visual ? (
          <div className="mx-auto grid aspect-square w-full max-w-xl grid-cols-6 grid-rows-6 gap-2 p-3 sm:gap-3">
            {single ? (
              <div className="site-media col-[2/6] row-[1/7] -rotate-2 shadow-xl">
                <Img ctx={ctx} path="image" value={content.image} alt={personName({ content, ctx })} sizes="(min-width: 1024px) 24rem, 70vw" maxWidth={900} priority />
              </div>
            ) : (
              tiles.map(({ item, index }, position) => (
                <div
                  key={item.id}
                  data-reveal
                  {...itemAttrs(ctx, 'images', index)}
                  className={cn('site-media border-site-bg border-4 shadow-xl sm:border-[6px]', TILES[position])}
                >
                  <Img
                    ctx={ctx}
                    path={`images.${index}.image`}
                    value={item.image}
                    sizes="(min-width: 1024px) 22rem, 60vw"
                    maxWidth={800}
                    priority={position === 0}
                  />
                </div>
              ))
            )}
            {stickers.map(({ item, index }, position) => (
              <div
                key={item.id}
                {...itemAttrs(ctx, 'stickers', index)}
                className={cn(
                  'z-10 flex max-w-full items-center self-start rounded-full px-4 py-2 text-sm font-bold shadow-lg sm:text-base',
                  position === 0 && 'site-wobble',
                  STICKERS[position],
                )}
              >
                <T ctx={ctx} path={`stickers.${index}.text`} value={item.text} placeholder="Sticker" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  )
}
