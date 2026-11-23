import { Carousel, itemAttrs } from '../../_shared'
import type { TestimonialsProps } from '../schema'
import { Author, carouselLabel, Quote, Rating } from './parts'

/** Speech-bubble cards with a tail, author below. */
export function Bubbles({ content, ctx }: TestimonialsProps) {
  const items = content.items ?? []
  return (
    <Carousel
      locale={ctx.locale}
      dir={ctx.dir}
      label={carouselLabel(ctx, content.heading)}
      autoplay={content.autoplay ? 6000 : false}
      slideBasis="min(26rem, 88%)"
    >
      {items.map((item, i) => (
        <figure key={item.id} {...itemAttrs(ctx, 'items', i)} className="flex h-full flex-col gap-7 pb-1">
          <div className="relative flex flex-1">
            {/* The tail: a rotated square behind the card, so only its lower half shows. */}
            <span
              aria-hidden="true"
              className="bg-site-surface border-site-border absolute -bottom-2.5 start-8 size-5 rotate-45 border"
            />
            <div className="site-card relative flex flex-1 flex-col gap-4 p-6 md:p-8">
              <Rating ctx={ctx} item={item} />
              <Quote ctx={ctx} item={item} index={i} className="text-lg leading-relaxed" />
            </div>
          </div>
          <Author ctx={ctx} item={item} index={i} className="ps-4" />
        </figure>
      ))}
    </Carousel>
  )
}
