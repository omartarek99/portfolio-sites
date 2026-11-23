import { itemAttrs, Marquee, T } from '../../_shared'
import { TEXT, visibleItems, type AnnouncementProps } from '../parts'

/**
 * The ticker fills the bar however few messages there are (each copy of the
 * loop is at least one bar wide), and shows the messages once, wrapped and
 * centred, when motion is off.
 */
const CSS = `
.site-ticker{container-type:inline-size}
.site-ticker .site-marquee-track>*{min-width:100cqi;justify-content:space-around}
.site-root:is([data-static],[data-motion='none']) .site-ticker .site-marquee-track>*{flex-wrap:wrap;flex-shrink:1;justify-content:center;row-gap:.25rem}
.site-root:is([data-static],[data-motion='none']) .site-ticker .site-marquee-track>[aria-hidden]{display:none}
.site-root:is([data-static],[data-motion='none']) .site-ticker{-webkit-mask-image:none;mask-image:none}
@media (prefers-reduced-motion:reduce){
.site-ticker .site-marquee-track>*{flex-wrap:wrap;flex-shrink:1;justify-content:center;row-gap:.25rem}
.site-ticker .site-marquee-track>[aria-hidden]{display:none}
.site-ticker{-webkit-mask-image:none;mask-image:none}
}
`

/** A marquee of short messages. */
export function Ticker({ ctx, content }: AnnouncementProps) {
  const items = visibleItems(ctx, content)
  return (
    <>
      <style href="site-announcement" precedence="default">
        {CSS}
      </style>
      <Marquee seconds={Math.max(24, items.length * 9)} gap="2.5rem" className="site-ticker min-w-0 grow py-2.5">
        {items.map(({ item, index }) => (
          <span
            key={item.id}
            {...itemAttrs(ctx, 'items', index)}
            className="inline-flex items-center gap-10 whitespace-nowrap"
          >
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current opacity-60" />
            <T ctx={ctx} path={`items.${index}.text`} value={item.text} className={TEXT} />
          </span>
        ))}
      </Marquee>
    </>
  )
}
