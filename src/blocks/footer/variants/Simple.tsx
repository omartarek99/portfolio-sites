import { Container, SocialLinks, T } from '../../_shared'
import { BottomBar, Name, NavRow, type FooterProps } from '../parts'

/** Name, links, social accounts and the copyright line. */
export function Simple({ ctx, content, section }: FooterProps) {
  return (
    <footer className="border-site-border border-t">
      <Container section={section} className="py-10 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex max-w-sm flex-col gap-2">
            <Name ctx={ctx} content={content} className="site-h4" />
            <T
              ctx={ctx}
              path="text"
              value={content.text}
              as="p"
              className="site-small site-muted"
              placeholder="A short line about you"
            />
          </div>
          <NavRow ctx={ctx} className="lg:pt-1" />
          <SocialLinks ctx={ctx} links={ctx.site.settings.social} className="shrink-0" />
        </div>
        <BottomBar ctx={ctx} content={content} className="border-site-border mt-10 border-t pt-6" />
      </Container>
    </footer>
  )
}
