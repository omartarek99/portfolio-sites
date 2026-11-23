import { Btn, Container } from '../../_shared'
import { Brand, LangSwitch, Menu, NavBar, stickyAttr, type HeaderProps } from '../parts'

/** Name at the start, navigation and call to action at the end. */
export function TopBar({ ctx, content, section }: HeaderProps) {
  return (
    <header data-sticky={stickyAttr(content)} className="border-site-border bg-site-bg/85 border-b backdrop-blur-md">
      <Container section={section} className="flex min-h-16 items-center gap-x-8 gap-y-2 py-3">
        <Brand ctx={ctx} content={content} />
        <NavBar ctx={ctx} className="ms-auto max-lg:hidden" listClassName="justify-end gap-x-7 gap-y-1" />
        <div className="flex shrink-0 items-center gap-4 max-lg:ms-auto">
          <LangSwitch ctx={ctx} content={content} className="max-lg:hidden" />
          <Btn ctx={ctx} path="cta" value={content.cta} size="sm" className="max-sm:hidden" />
          <Menu ctx={ctx} content={content} className="lg:hidden" />
        </div>
      </Container>
    </header>
  )
}
