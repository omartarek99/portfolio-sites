import { Carousel, Icon, itemAttrs } from '../../_shared'
import type { TestimonialsProps } from '../schema'
import { Author, carouselLabel, Quote, Rating } from './parts'

/** One big quote at a time, with previous / next and dots. */
export function Single({ content, ctx }: TestimonialsProps) {
  const items = content.items ?? []
  return (
    <Carousel
      locale={ctx.locale}
      dir={ctx.dir}
      label={carouselLabel(ctx, content.heading)}
      autoplay={content.autoplay ? 7000 : false}
      className="mx-auto max-w-4xl"
    >
      {items.map((item, i) => (
        <figure key={item.id} {...itemAttrs(ctx, 'items', i)} className="flex flex-col items-center gap-7 px-1 text-center">
          <Icon name="quote" aria-hidden="true" className="text-site-primary size-10 rtl:-scale-x-100 md:size-12" />
          <Quote ctx={ctx} item={item} index={i} className="font-site-heading text-2xl leading-snug text-balance md:text-4xl" />
          <Rating ctx={ctx} item={item} />
          <Author ctx={ctx} item={item} index={i} center />
        </figure>
      ))}
    </Carousel>
  )
}
