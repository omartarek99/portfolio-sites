import { Btn, hasIcon, hasImage, Icon, Img, itemAttrs, T } from '../../_shared'
import type { ServicesProps } from '../schema'
import { Features, priceText } from './parts'

/** Packages table: one ruled row per package, details at the start, price and CTA at the end. */
export function PricingTable({ content, ctx }: ServicesProps) {
  const items = content.items ?? []
  if (items.length === 0) return null
  return (
    <ul className="border-site-border border-t">
      {items.map((item, index) => {
        const image = hasImage(ctx, item.image)
        const price = priceText(ctx, item)
        return (
          <li
            key={item.id}
            {...itemAttrs(ctx, 'items', index)}
            data-reveal=""
            className="border-site-border grid gap-6 border-b py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 md:py-10"
          >
            <div className="flex min-w-0 gap-5 md:gap-7">
              {image ? (
                <div className="site-media aspect-square w-20 shrink-0 md:w-28">
                  <Img ctx={ctx} path={`items.${index}.image`} value={item.image} sizes="112px" maxWidth={240} decorative />
                </div>
              ) : hasIcon(item.icon) ? (
                <span className="border-site-border text-site-primary rounded-site grid size-12 shrink-0 place-items-center border md:size-14">
                  <Icon name={item.icon!} className="size-6" />
                </span>
              ) : null}
              <div className="flex min-w-0 flex-col gap-3">
                <T ctx={ctx} path={`items.${index}.name`} value={item.name} as="h3" className="site-h3" placeholder="Package name" />
                <T ctx={ctx} path={`items.${index}.description`} value={item.description} as="p" className="site-muted max-w-2xl" placeholder="What is included" multiline />
                <Features ctx={ctx} item={item} index={index} className="mt-1 sm:flex-row sm:flex-wrap sm:gap-x-6" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:flex-col md:items-end md:text-end">
              {price ? <p className="font-site-heading text-site-text text-2xl font-semibold md:text-3xl">{price}</p> : null}
              <T ctx={ctx} path={`items.${index}.duration`} value={item.duration} as="p" className="site-muted site-small" placeholder="Duration" />
              <Btn ctx={ctx} path={`items.${index}.cta`} value={item.cta} variant="outline" size="sm" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
