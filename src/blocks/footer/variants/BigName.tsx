import { Container, SocialLinks, T } from '../../_shared'
import { BottomBar, Name, NavRow, type FooterProps } from '../parts'

/**
 * An oversized name across the page with small links beneath (Bento).
 * ponytail: the name scales with the container width (cqi) and wraps when it
 * is long — it does not stretch to fit the width exactly, which needs JS.
 */
export function BigName({ ctx, content, section }: FooterProps) {
  return (
    <footer className="border-site-border overflow-hidden border-t">
      <Container section={section} className="py-10 lg:py-14">
        <div className="@container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <T
              ctx={ctx}
              path="text"
              value={content.text}
              as="p"
              className="site-small site-muted max-w-sm"
              placeholder="A short line about you"
            />
            <SocialLinks ctx={ctx} links={ctx.site.settings.social} className="shrink-0" />
          </div>
          <Name
            ctx={ctx}
            content={content}
            className="font-site-heading text-site-text my-8 text-[clamp(2.5rem,10.5cqi,13rem)] leading-[0.95] font-bold text-balance break-words lg:my-10 rtl:leading-[1.3]"
          />
          <NavRow ctx={ctx} className="site-small" />
          <BottomBar ctx={ctx} content={content} className="border-site-border mt-8 border-t pt-6" />
        </div>
      </Container>
    </footer>
  )
}
