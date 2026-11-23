import { itemAttrs, T } from '../../_shared'
import type { ExperienceProps } from '../schema'
import { OrgLine, Period } from './parts'

/** A tight CV list: role, organisation and dates on one line. Descriptions, logos and tags are left out on purpose. */
export function Compact({ content, ctx }: ExperienceProps) {
  const items = content.items ?? []
  return (
    <ul className="divide-site-border border-site-border divide-y border-y">
      {items.map((item, i) => (
        <li
          key={item.id}
          {...itemAttrs(ctx, 'items', i)}
          data-reveal=""
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3">
            <T ctx={ctx} path={`items.${i}.role`} value={item.role} as="h3" className="font-site-heading font-semibold" placeholder="Role" />
            <OrgLine ctx={ctx} item={item} index={i} className="site-muted" />
          </div>
          <Period ctx={ctx} item={item} className="site-muted shrink-0" />
        </li>
      ))}
    </ul>
  )
}
