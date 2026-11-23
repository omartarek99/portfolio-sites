import { itemAttrs } from '../../_shared'
import type { ClientsProps } from '../schema'
import { hasLogo, Logo } from './Logo'

/** Evenly spaced logos, centred and wrapping. */
export function Grid({ content, ctx }: ClientsProps) {
  const items = content.items ?? []
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
      {items.map((item, i) =>
        hasLogo(ctx, item) ? (
          <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="flex h-14 items-center">
            <Logo ctx={ctx} item={item} index={i} greyscale={content.greyscale} />
          </li>
        ) : null,
      )}
    </ul>
  )
}
