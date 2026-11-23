import { cn } from '@/lib/utils'
import { Btn, hasButton, hasIcon, hasImage, hasText, Icon, Img, itemAttrs, T } from '../../_shared'
import type { ServicesProps } from '../schema'
import { Features, priceText, PriceLine } from './parts'

const COLS = ['', 'sm:max-w-md', 'sm:grid-cols-2', 'sm:grid-cols-2 lg:grid-cols-3']

/** Cards: image (or icon), name, description, features, price line and CTA. */
export function Cards({ content, ctx }: ServicesProps) {
  const items = content.items ?? []
  if (items.length === 0) return null
  return (
    <ul className={cn('grid gap-6 lg:gap-8', COLS[Math.min(items.length, 3)])}>
      {items.map((item, index) => {
        const image = hasImage(ctx, item.image)
        const footer = priceText(ctx, item) !== '' || hasText(ctx, item.duration) || hasButton(ctx, item.cta)
        return (
          <li key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" className="site-card flex flex-col overflow-hidden">
            {image ? (
              <div className="site-media aspect-[16/10] rounded-none">
                <Img
                  ctx={ctx}
                  path={`items.${index}.image`}
                  value={item.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  maxWidth={800}
                  decorative
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
              {!image && hasIcon(item.icon) ? (
                <span className="bg-site-primary/10 text-site-primary rounded-site grid size-12 place-items-center">
                  <Icon name={item.icon!} className="size-6" />
                </span>
              ) : null}
              <T ctx={ctx} path={`items.${index}.name`} value={item.name} as="h3" className="site-h3" placeholder="Service name" />
              <T ctx={ctx} path={`items.${index}.description`} value={item.description} as="p" className="site-muted" placeholder="What the client gets" multiline />
              <Features ctx={ctx} item={item} index={index} />
              {footer ? (
                <div className="border-site-border mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-5">
                  <PriceLine ctx={ctx} item={item} index={index} />
                  <Btn ctx={ctx} path={`items.${index}.cta`} value={item.cta} variant="outline" size="sm" />
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
