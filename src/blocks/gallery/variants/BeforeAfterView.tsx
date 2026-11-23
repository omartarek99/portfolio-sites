import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { BeforeAfter, hasText, Img, itemAttrs, st, T } from '../../_shared'
import { GalleryShell, type GalleryVariantProps } from '../parts'

/** Before/after comparison sliders, one per pair (Blueprint). */
export function BeforeAfterView({ ctx, section, content }: GalleryVariantProps) {
  const editor = ctx.mode === 'editor'
  const alt = (value: Parameters<typeof pick>[0]) => plainText(pick(value, ctx.locale))
  return (
    <GalleryShell ctx={ctx} section={section} content={content}>
      {content.items.length > 0 ? (
        <div className={cn('grid gap-8 md:gap-10', content.items.length > 1 && 'md:grid-cols-2')}>
          {content.items.map((item, index) => {
            const path = `items.${index}`
            const before = item.image?.url
            const after = item.after?.url
            if (!editor && !(before && after)) return null
            return (
              <figure key={item.id} data-reveal className="min-w-0" {...itemAttrs(ctx, 'items', index)}>
                {before && after && !editor ? (
                  <BeforeAfter
                    before={{ src: before, alt: alt(item.image?.alt) || alt(item.caption) }}
                    after={{ src: after, alt: alt(item.after?.alt) || alt(item.caption) }}
                    locale={ctx.locale}
                    dir={ctx.dir}
                    sizes={content.items.length > 1 ? '(min-width: 768px) 50vw, 100vw' : '100vw'}
                  />
                ) : (
                  // The slider is not editable in place, so the editor shows both states side by side.
                  <div className="grid grid-cols-2 gap-2">
                    {(['image', 'after'] as const).map((key) => (
                      <div key={key} className="flex flex-col gap-2">
                        <div className="site-media aspect-[4/3]">
                          <Img ctx={ctx} path={`${path}.${key}`} value={item[key]} sizes="25vw" maxWidth={800} className="size-full object-cover" />
                        </div>
                        <span className="site-small site-muted">{st(ctx.locale, key === 'image' ? 'before' : 'after')}</span>
                      </div>
                    ))}
                  </div>
                )}
                {hasText(ctx, item.caption) ? (
                  <figcaption className="mt-3">
                    <T ctx={ctx} path={`${path}.caption`} value={item.caption} as="span" className="site-small text-site-text font-medium" placeholder="Caption" />
                  </figcaption>
                ) : null}
              </figure>
            )
          })}
        </div>
      ) : null}
    </GalleryShell>
  )
}
