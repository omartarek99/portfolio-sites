import { A, Icon, Img, itemAttrs, T } from '../../_shared'
import type { LinkHubProps } from '../schema'
import { ItemIcon, NewBadge } from './parts'

/** Link-in-bio: big rounded full-width buttons, a comfortable centered column on desktop. */
export function Stacked({ content, ctx }: LinkHubProps) {
  return (
    <ul className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:gap-4">
      {(content.items ?? []).map((item, i) => (
        <li key={item.id} {...itemAttrs(ctx, 'items', i)} data-reveal="">
          <A
            ctx={ctx}
            link={item.link}
            className="group bg-site-surface border-site-border text-site-text rounded-site-btn hover:border-site-primary flex min-h-16 w-full items-center gap-3 border p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {item.thumbnail?.url ? (
              <span className="site-media rounded-site-btn size-12 shrink-0">
                <Img ctx={ctx} path={`items.${i}.thumbnail`} value={item.thumbnail} sizes="48px" maxWidth={160} decorative />
              </span>
            ) : (
              <span className="bg-site-primary text-site-on-primary rounded-site-btn grid size-12 shrink-0 place-items-center">
                <ItemIcon name={item.icon} className="size-5" />
              </span>
            )}
            <span className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1 text-center">
              <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <T ctx={ctx} path={`items.${i}.label`} value={item.label} className="font-semibold" placeholder="Link label" />
                <NewBadge ctx={ctx} item={item} />
              </span>
              <T ctx={ctx} path={`items.${i}.description`} value={item.description} className="site-small site-muted" placeholder="Short description" />
            </span>
            <span className="text-site-muted group-hover:text-site-primary grid w-8 shrink-0 place-items-center transition-colors sm:w-12">
              <Icon name="arrow-up-right" className="size-5 rtl:-scale-x-100" />
            </span>
          </A>
        </li>
      ))}
    </ul>
  )
}
