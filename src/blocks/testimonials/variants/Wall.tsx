import { cn } from '@/lib/utils'
import { Icon, itemAttrs } from '../../_shared'
import type { TestimonialsProps } from '../schema'
import { Author, Quote, Rating } from './parts'

/** Masonry wall of quote cards (CSS columns). */
export function Wall({ content, ctx }: TestimonialsProps) {
  const items = content.items ?? []
  return (
    // 4 cards balance badly in 3 columns (one column ends up empty), so they stay in 2.
    <ul className={cn('columns-1 gap-6 sm:columns-2', items.length !== 4 && 'lg:columns-3')}>
      {items.map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="mb-6 break-inside-avoid">
          <figure className="site-card flex flex-col gap-5 p-6 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <Icon name="quote" aria-hidden="true" className="text-site-primary size-7 rtl:-scale-x-100" />
              <Rating ctx={ctx} item={item} />
            </div>
            <Quote ctx={ctx} item={item} index={i} className="leading-relaxed" />
            <Author ctx={ctx} item={item} index={i} className="border-site-border border-t pt-5" />
          </figure>
        </li>
      ))}
    </ul>
  )
}
