import { Container } from '../../_shared'
import { Brand, Menu, stickyAttr, type HeaderProps } from '../parts'

/** Just the name and a menu button, at every width. Everything else lives in the menu. */
export function Minimal({ ctx, content, section }: HeaderProps) {
  return (
    <header data-sticky={stickyAttr(content)} className="bg-site-bg/85 backdrop-blur-md">
      <Container section={section} className="flex min-h-16 items-center justify-between gap-4 py-3 lg:min-h-20">
        <Brand ctx={ctx} content={content} nameClassName="text-lg lg:text-xl" />
        <Menu ctx={ctx} content={content} labelled />
      </Container>
    </header>
  )
}
