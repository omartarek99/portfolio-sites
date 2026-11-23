import { hasIcon, Icon, itemAttrs, T } from '../../_shared'
import type { StatsProps } from '../schema'

/** Oversized numerals over a hairline, labels beneath. */
export function BigNumbers({ content, ctx }: StatsProps) {
  const items = content.items ?? []
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-x-10 gap-y-12">
      {items.map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="flex min-w-0 flex-col">
          <T
            ctx={ctx}
            path={`items.${i}.value`}
            value={item.value}
            className="font-site-heading text-site-primary text-[clamp(3.5rem,8vw,6.5rem)] leading-none font-bold tabular-nums"
            placeholder="10+"
          />
          <span aria-hidden="true" className="bg-site-accent mt-6 mb-5 block h-px w-16" />
          <span className="flex items-center gap-2">
            {item.icon && hasIcon(item.icon) ? <Icon name={item.icon} aria-hidden="true" className="text-site-primary size-5 shrink-0" /> : null}
            <T ctx={ctx} path={`items.${i}.label`} value={item.label} as="p" className="site-h4" placeholder="Label" />
          </span>
          <T
            ctx={ctx}
            path={`items.${i}.description`}
            value={item.description}
            as="p"
            className="site-muted mt-2 max-w-xs"
            placeholder="Short description"
          />
        </li>
      ))}
    </ul>
  )
}
