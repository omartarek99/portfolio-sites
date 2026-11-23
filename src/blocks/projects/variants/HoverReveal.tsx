import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { A, hasImage, hasText, Icon, Img, itemAttrs, st, T } from '../../_shared'
import {
  itemHeading,
  linkWorks,
  mainLink,
  ordinal,
  ProjectMeta,
  ProjectsShell,
  stretched,
  type ProjectsVariantProps,
} from '../parts'

/*
 * A typographic list (Editorial's "Featured stories").
 *
 * Everywhere, each row shows its image as a thumbnail next to the title — so
 * touch screens and small screens need no hover at all. Only on large screens
 * with a mouse (`lg:pointer-fine:`) does the thumbnail become a floating
 * preview that fades in when its row is hovered or focused. The first row's
 * preview is visible until another row takes over, so the pictures are never a
 * secret. Pure CSS; the class names below are spelled out in full because
 * Tailwind only sees literal strings.
 */
const FLOAT =
  'lg:pointer-fine:pointer-events-none lg:pointer-fine:absolute lg:pointer-fine:end-16 lg:pointer-fine:z-10 lg:pointer-fine:w-80 lg:pointer-fine:transition-opacity lg:pointer-fine:duration-300'
const FLOAT_FIRST =
  'lg:pointer-fine:top-3 lg:pointer-fine:group-has-[li:not(:first-child):hover]/list:opacity-0 lg:pointer-fine:group-has-[li:not(:first-child):focus-within]/list:opacity-0 lg:pointer-fine:group-has-[li:not(:first-child):focus]/list:opacity-0'
const FLOAT_HIDDEN =
  'lg:pointer-fine:opacity-0 lg:pointer-fine:group-hover/row:opacity-100 lg:pointer-fine:group-focus-within/row:opacity-100 lg:pointer-fine:group-focus/row:opacity-100'
const FLOAT_MIDDLE = 'lg:pointer-fine:top-1/2 lg:pointer-fine:-translate-y-1/2'
const FLOAT_LAST = 'lg:pointer-fine:bottom-3'

export function HoverReveal({ ctx, section, content }: ProjectsVariantProps) {
  const Heading = itemHeading(ctx, content)
  const count = content.items.length
  // Floating previews need room above and below, and would hide the image slot in the editor.
  const float = ctx.mode !== 'editor' && count >= 3
  return (
    <ProjectsShell ctx={ctx} section={section} content={content}>
      {count === 0 ? null : (
        <ul className="group/list border-site-border border-t text-start">
          {content.items.map((item, index) => {
            const main = mainLink(ctx, item)
            const image = hasImage(ctx, item.image)
            const both = linkWorks(ctx, item.caseStudy) && linkWorks(ctx, item.link)
            return (
              <li
                key={item.id}
                {...itemAttrs(ctx, 'items', index)}
                data-reveal=""
                // A row without a link still has to reveal its image from the keyboard.
                tabIndex={float && image && !main ? 0 : undefined}
                className="group/row border-site-border relative border-b"
              >
                <div className="flex items-center gap-4 py-6 md:gap-8 md:py-9">
                  <span aria-hidden="true" className="site-small site-muted hidden w-8 shrink-0 tabular-nums sm:block">
                    {ordinal(index)}
                  </span>
                  <div className={cn('flex min-w-0 flex-1 flex-col gap-2', float && image && 'lg:pointer-fine:pe-88')}>
                    {hasText(ctx, item.title) ? (
                      <Heading className="site-h2 group-hover/row:text-site-primary group-focus-within/row:text-site-primary transition-colors">
                        <A ctx={ctx} link={main} className={main ? stretched(ctx) : undefined}>
                          <T ctx={ctx} path={`items.${index}.title`} value={item.title} placeholder="Project title" />
                        </A>
                      </Heading>
                    ) : null}
                    <ProjectMeta ctx={ctx} item={item} index={index} />
                    <T
                      ctx={ctx}
                      path={`items.${index}.description`}
                      value={item.description}
                      as="p"
                      className="site-muted max-w-2xl"
                      multiline
                    />
                    {both ? (
                      <A
                        ctx={ctx}
                        link={item.link}
                        label={`${st(ctx.locale, 'viewProject')}: ${plainText(pick(item.title, ctx.locale))}`}
                        className="site-link site-small relative z-10 inline-flex items-center gap-1.5 self-start font-semibold"
                      >
                        {st(ctx.locale, 'viewProject')}
                        <Icon name="arrow-up-right" className="size-4 shrink-0 rtl:-scale-x-100" />
                      </A>
                    ) : null}
                  </div>
                  {image ? (
                    <div
                      className={cn(
                        'site-media aspect-[4/3] w-24 shrink-0 sm:w-40',
                        float && FLOAT,
                        float && (index === 0 ? FLOAT_FIRST : cn(FLOAT_HIDDEN, index === count - 1 ? FLOAT_LAST : FLOAT_MIDDLE)),
                      )}
                    >
                      <Img
                        ctx={ctx}
                        path={`items.${index}.image`}
                        value={item.image}
                        sizes="(min-width: 1024px) 20rem, (min-width: 640px) 10rem, 6rem"
                        maxWidth={640}
                        alt={plainText(pick(item.title, ctx.locale))}
                      />
                    </div>
                  ) : null}
                  {main ? (
                    <Icon
                      name="arrow-up-right"
                      className="text-site-muted group-hover/row:text-site-primary hidden size-6 shrink-0 transition-colors sm:block rtl:-scale-x-100"
                    />
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </ProjectsShell>
  )
}
