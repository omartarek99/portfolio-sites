import type { ComponentType } from 'react'
import type { HeaderProps } from './parts'
import { Centered } from './variants/Centered'
import { FloatingPill } from './variants/FloatingPill'
import { Minimal } from './variants/Minimal'
import { Side } from './variants/Side'
import { Tabs } from './variants/Tabs'
import { TopBar } from './variants/TopBar'

const VARIANTS: Record<string, ComponentType<HeaderProps>> = {
  'top-bar': TopBar,
  centered: Centered,
  side: Side,
  'floating-pill': FloatingPill,
  minimal: Minimal,
  tabs: Tabs,
}

/**
 * The renderer wraps global blocks in a `[data-block]` div that is exactly as
 * tall as the header, so `position: sticky` has to go on that wrapper — hence
 * `:has()`. The second rule locks page scroll while the menu dialog is open.
 */
const CSS = `
[data-block='header']:has([data-sticky]){position:sticky;top:0;z-index:40}
:root:has(dialog[data-site-menu][open]){overflow:hidden}
`

export function Header(props: HeaderProps) {
  // A side-navigation site reserves a narrow column for the header on desktop: only `side` fits it.
  const Variant = props.ctx.site.navigation.style === 'side' ? Side : (VARIANTS[props.variant] ?? TopBar)
  return (
    <>
      <style href="site-header" precedence="default">
        {CSS}
      </style>
      <Variant {...props} />
    </>
  )
}
