import { hasIcon, Icon, itemAttrs, T } from '../../_shared'
import type { StatsProps } from '../schema'

/**
 * A simple inline row with hairline separators. Every item carries a start
 * border and the list is shifted 1px outward inside a clipping wrapper, so the
 * border at the start of each line is hidden and only separators remain.
 */
export function Row({ content, ctx }: StatsProps) {
  const items = content.items ?? []
  return (
    <div className="overflow-hidden">
      <ul className="-ms-px flex flex-wrap gap-y-6">
        {items.map((item, i) => (
          <li
            key={item.id}
            {...itemAttrs(ctx, 'items', i)}
            data-reveal=""
            className="border-site-border flex min-w-0 flex-1 basis-[9rem] flex-col gap-1 border-s px-5 md:px-8"
          >
            <span className="flex items-center gap-2">
              {item.icon && hasIcon(item.icon) ? <Icon name={item.icon} aria-hidden="true" className="text-site-primary size-5 shrink-0" /> : null}
              <T ctx={ctx} path={`items.${i}.value`} value={item.value} className="font-site-heading text-3xl font-bold tabular-nums md:text-4xl" placeholder="10+" />
            </span>
            <T ctx={ctx} path={`items.${i}.label`} value={item.label} as="p" className="site-small site-muted" placeholder="Label" />
          </li>
        ))}
      </ul>
    </div>
  )
}
