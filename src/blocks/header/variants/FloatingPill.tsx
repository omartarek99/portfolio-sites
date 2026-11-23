import { Btn } from '../../_shared'
import { Brand, LangSwitch, Menu, NavBar, type HeaderProps } from '../parts'
import { Detach } from './Detach.client'

/**
 * A bar that sits flush at the top of the page and turns into a floating,
 * rounded pill once the page scrolls (Aurora). Static renders (editor,
 * thumbnails, gallery) and non-sticky headers always show the pill.
 */
export function FloatingPill({ ctx, content }: HeaderProps) {
  const sticky = content.sticky !== false
  return (
    <header data-sticky={sticky ? '' : undefined} className="pointer-events-none flow-root px-3">
      <Detach
        always={!sticky}
        className="border-site-border [&:is([data-detached],[data-static]_*)]:bg-site-surface/80 pointer-events-auto mx-auto flex min-h-16 max-w-[76rem] items-center gap-x-6 rounded-none border border-transparent px-3 py-2 transition-all duration-300 motion-reduce:transition-none sm:px-5 [&:is([data-detached],[data-static]_*)]:mt-3 [&:is([data-detached],[data-static]_*)]:max-w-5xl [&:is([data-detached],[data-static]_*)]:rounded-(--site-radius-btn) [&:is([data-detached],[data-static]_*)]:border-site-border [&:is([data-detached],[data-static]_*)]:shadow-lg [&:is([data-detached],[data-static]_*)]:backdrop-blur-xl"
      >
        <Brand ctx={ctx} content={content} />
        <NavBar ctx={ctx} className="mx-auto max-lg:hidden" listClassName="justify-center gap-x-6 gap-y-1" />
        <div className="flex shrink-0 items-center gap-4 max-lg:ms-auto">
          <LangSwitch ctx={ctx} content={content} className="max-lg:hidden" />
          <Btn ctx={ctx} path="cta" value={content.cta} size="sm" className="max-sm:hidden" />
          <Menu ctx={ctx} content={content} className="lg:hidden" />
        </div>
      </Detach>
    </header>
  )
}
