import { A, Img, itemAttrs, T } from '../../_shared'
import type { LinkHubProps } from '../schema'
import { ItemIcon, NewBadge } from './parts'

/** A grid of square-ish icon tiles. */
export function IconGrid({ content, ctx }: LinkHubProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {(content.items ?? []).map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="" className="flex">
          <A
            ctx={ctx}
            link={item.link}
            className="site-card group hover:border-site-primary relative flex w-full flex-col items-center gap-3 p-4 text-center transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
          >
            <NewBadge ctx={ctx} item={item} className="absolute end-2 top-2" />
            {item.thumbnail?.url ? (
              <span className="site-media rounded-site-btn size-14 shrink-0">
                <Img ctx={ctx} path={`items.${i}.thumbnail`} value={item.thumbnail} sizes="56px" maxWidth={160} decorative />
              </span>
            ) : (
              <span className="bg-site-primary/12 text-site-primary group-hover:bg-site-primary group-hover:text-site-on-primary rounded-site-btn grid size-14 shrink-0 place-items-center transition-colors">
                <ItemIcon name={item.icon} className="size-6" />
              </span>
            )}
            <span className="flex min-w-0 flex-col gap-1">
              <T ctx={ctx} path={`items.${i}.label`} value={item.label} className="font-semibold break-words" placeholder="Link label" />
              <T ctx={ctx} path={`items.${i}.description`} value={item.description} className="site-small site-muted" placeholder="Short description" />
            </span>
          </A>
        </li>
      ))}
    </ul>
  )
}
