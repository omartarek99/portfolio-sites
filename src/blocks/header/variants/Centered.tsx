import { Btn, Container, T } from '../../_shared'
import { Brand, LangSwitch, Menu, NavBar, stickyAttr, type HeaderProps } from '../parts'

/** Name centered above a centered navigation (Editorial, Atelier). */
export function Centered({ ctx, content, section }: HeaderProps) {
  return (
    <header data-sticky={stickyAttr(content)} className="border-site-border bg-site-bg border-b">
      <Container section={section}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 lg:py-6">
          <div className="flex">
            <LangSwitch ctx={ctx} content={content} className="max-lg:hidden" />
          </div>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <Brand
              ctx={ctx}
              content={content}
              className="flex-col gap-2 text-center"
              nameClassName="text-xl lg:text-3xl"
              logoClassName="h-10 lg:h-12"
            />
            <T
              ctx={ctx}
              path="text"
              value={content.text}
              as="p"
              className="site-small site-muted max-lg:hidden"
              placeholder="What you do"
            />
          </div>
          <div className="flex justify-end">
            <Btn ctx={ctx} path="cta" value={content.cta} size="sm" variant="outline" className="max-lg:hidden" />
            <Menu ctx={ctx} content={content} className="lg:hidden" />
          </div>
        </div>
        <NavBar
          ctx={ctx}
          className="border-site-border border-t py-2 max-lg:hidden"
          listClassName="justify-center gap-x-9 gap-y-1"
        />
      </Container>
    </header>
  )
}
