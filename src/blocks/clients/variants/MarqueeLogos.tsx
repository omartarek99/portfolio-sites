import { itemAttrs, Marquee } from '../../_shared'
import type { ClientsProps } from '../schema'
import { hasLogo, Logo } from './Logo'

/** Logos scrolling continuously; pauses on hover, static under reduced motion. */
export function MarqueeLogos({ content, ctx }: ClientsProps) {
  const items = content.items ?? []
  return (
    <Marquee seconds={Math.max(20, items.length * 5)} gap="3.5rem">
      {items.map((item, i) =>
        hasLogo(ctx, item) ? (
          <div key={item.id} {...itemAttrs(ctx, 'items', i)} className="flex h-14 shrink-0 items-center">
            <Logo ctx={ctx} item={item} index={i} greyscale={content.greyscale} />
          </div>
        ) : null,
      )}
    </Marquee>
  )
}
