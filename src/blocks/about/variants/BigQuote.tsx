import { Container, hasImage, hasText, Icon, Img, T } from '../../_shared'
import type { AboutProps } from '../schema'

export function BigQuote({ content, ctx, section }: AboutProps) {
  const withAvatar = hasImage(ctx, content.image)
  const withCaption = withAvatar || hasText(ctx, content.attribution) || hasText(ctx, content.attributionRole)
  if (!withCaption && !hasText(ctx, content.heading) && !hasText(ctx, content.quote)) return null
  return (
    <Container section={section}>
      <figure className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:gap-8">
        <T ctx={ctx} path="heading" value={content.heading} as="h2" className="site-eyebrow" placeholder="Section heading" />
        {hasText(ctx, content.quote) ? <Icon name="quote" className="text-site-primary size-10 rtl:-scale-x-100" /> : null}
        <T
          ctx={ctx}
          path="quote"
          value={content.quote}
          as="blockquote"
          multiline
          className="site-h2 text-[clamp(1.6rem,2.8vw+1rem,3.4rem)]"
          placeholder="A sentence that sums you up"
        />
        {withCaption ? (
          <figcaption className="flex items-center gap-4 text-start">
            {withAvatar ? (
              <div className="site-media size-14 shrink-0 rounded-full">
                <Img ctx={ctx} path="image" value={content.image} sizes="56px" maxWidth={160} />
              </div>
            ) : null}
            <div className="min-w-0">
              <T ctx={ctx} path="attribution" value={content.attribution} as="p" className="font-semibold" placeholder="Your name" />
              <T
                ctx={ctx}
                path="attributionRole"
                value={content.attributionRole}
                as="p"
                className="site-small site-muted"
                placeholder="What you do"
              />
            </div>
          </figcaption>
        ) : null}
      </figure>
    </Container>
  )
}
