import { Btn, Container, hasButton, T } from '../../_shared'
import { t } from '../strings'
import type { CtaProps } from './Simple'
import { StickyBar } from './StickyBar.client'

/**
 * A slim bar (Bloom Coach's "Book a session"). On phones it sticks to the
 * bottom of the screen until dismissed; never fixed inside the editor canvas.
 */
export function Banner({ content, ctx, section }: CtaProps) {
  return (
    <Container section={section}>
      <StickyBar id={ctx.sectionId} fixed={ctx.mode !== 'editor'} dismissLabel={t(ctx.locale, 'dismiss')}>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <T ctx={ctx} path="eyebrow" value={content.eyebrow} as="p" className="site-eyebrow max-md:hidden" placeholder="Eyebrow" />
          <T ctx={ctx} path="heading" value={content.heading} as="h2" className="site-h4 line-clamp-2 max-md:text-base" placeholder="Heading" />
          <T ctx={ctx} path="intro" value={content.intro} as="p" className="site-muted max-md:hidden" placeholder="One line" multiline />
        </div>
        {hasButton(ctx, content.primaryCta) || hasButton(ctx, content.secondaryCta) ? (
          <div className="flex shrink-0 items-center gap-3">
            <Btn ctx={ctx} path="secondaryCta" value={content.secondaryCta} variant="outline" className="max-md:hidden" />
            <Btn ctx={ctx} path="primaryCta" value={content.primaryCta} className="max-md:px-4 max-md:py-2 max-md:text-sm" />
          </div>
        ) : null}
      </StickyBar>
    </Container>
  )
}
