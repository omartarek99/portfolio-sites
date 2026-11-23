import { Btn, SocialLinks, T } from '../../_shared'
import { Brand, LangSwitch, Menu, NavTree, stickyAttr, type HeaderProps } from '../parts'

/**
 * A vertical sidebar on desktop — the site layout gives it a sticky,
 * full-height column when `navigation.style` is "side" (see site.css) — and a
 * top bar with a menu button below that (Blueprint).
 */
export function Side({ ctx, content }: HeaderProps) {
  return (
    <header
      data-sticky={stickyAttr(content)}
      className="border-site-border bg-site-bg flex items-center gap-4 border-b px-5 py-3 max-lg:min-h-16 lg:min-h-full lg:w-full lg:max-w-[19rem] lg:flex-col lg:items-stretch lg:gap-10 lg:border-e lg:border-b-0 lg:px-8 lg:py-10"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <Brand
          ctx={ctx}
          content={content}
          className="lg:flex-col lg:items-start"
          nameClassName="text-lg lg:text-2xl"
          logoClassName="h-9 lg:h-12"
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
      <NavTree ctx={ctx} className="border-site-border border-s max-lg:hidden" />
      <div className="flex flex-col items-start gap-5 max-lg:hidden lg:mt-auto">
        <Btn ctx={ctx} path="cta" value={content.cta} size="sm" />
        <LangSwitch ctx={ctx} content={content} />
        <SocialLinks ctx={ctx} links={ctx.site.settings.social} />
      </div>
      <Menu ctx={ctx} content={content} className="ms-auto lg:hidden" />
    </header>
  )
}
