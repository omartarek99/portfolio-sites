import { Btn, Icon, ICONS, itemAttrs, T } from '../../_shared'
import type { ServicesProps } from '../schema'
import { PriceLine } from './parts'

/** Compact icon + text list: areas of expertise, commissions, services at a glance. */
export function ListIcons({ content, ctx }: ServicesProps) {
  const items = content.items ?? []
  if (items.length === 0) return null
  return (
    <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" className="flex gap-4">
          <span className="bg-site-primary/10 text-site-primary rounded-site grid size-11 shrink-0 place-items-center">
            <Icon name={item.icon ?? ''} fallback={ICONS.sparkles} className="size-5" />
          </span>
          <div className="flex min-w-0 flex-col items-start gap-1.5">
            <T ctx={ctx} path={`items.${index}.name`} value={item.name} as="h3" className="site-h4" placeholder="Service name" />
            <T ctx={ctx} path={`items.${index}.description`} value={item.description} as="p" className="site-muted site-small" placeholder="One line about it" multiline />
            <PriceLine ctx={ctx} item={item} index={index} className="site-small mt-1" />
            <Btn ctx={ctx} path={`items.${index}.cta`} value={item.cta} variant="link" size="sm" className="mt-1" />
          </div>
        </li>
      ))}
    </ul>
  )
}
