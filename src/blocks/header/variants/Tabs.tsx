import { Btn, Icon } from '../../_shared'
import { Brand, LangSwitch, Menu, NavBar, stickyAttr, type HeaderProps } from '../parts'

/** Navigation as code-editor tabs — home.tsx, projects.md, blog/ (Terminal). */
export function Tabs({ ctx, content }: HeaderProps) {
  return (
    <header
      data-sticky={stickyAttr(content)}
      className="border-site-border bg-site-surface flex min-h-12 items-stretch border-b"
    >
      <Brand
        ctx={ctx}
        content={content}
        className="border-site-border border-e px-4 py-2 sm:px-5"
        nameClassName="text-sm"
        logoClassName="h-7"
      />
      <NavBar
        ctx={ctx}
        className="flex max-lg:hidden"
        listClassName="items-stretch"
        itemClassName="font-site-heading text-site-muted hover:text-site-text border-site-border aria-[current=page]:bg-site-bg aria-[current=page]:text-site-text aria-[current=page]:border-t-site-primary h-full border-e border-t-2 border-t-transparent px-4 text-sm transition-colors"
        before={<Icon name="file-text" className="size-3.5 shrink-0 opacity-70" />}
      />
      <div className="ms-auto flex shrink-0 items-center gap-4 px-3 py-1.5 sm:px-4">
        <LangSwitch ctx={ctx} content={content} className="max-lg:hidden" />
        <Btn ctx={ctx} path="cta" value={content.cta} size="sm" variant="outline" className="max-sm:hidden" />
        <Menu ctx={ctx} content={content} className="lg:hidden" />
      </div>
    </header>
  )
}
