import type { ReactNode } from 'react'
import type { GlobalSections, Section } from '@/schemas/site'
import { siteRootAttributes, themeToCssVars } from '@/themes/css-vars'
import { SiteBackground } from '@/themes/backgrounds'
import { RevealRoot } from './_shared/RevealRoot'
import { st } from './_shared/strings'
import { SectionRenderer } from './SectionRenderer'
import type { SiteRuntime } from './types'

export interface SiteRendererProps {
  site: SiteRuntime
  globalSections: GlobalSections
  /** The current page's sections. */
  sections: Section[]
  /** Replaces the page sections: blog post, password gate, 404 … */
  main?: ReactNode
  /** DOM id of the site root. Must be unique per document. */
  rootId?: string
  /** No motion at all (thumbnails, screenshots). The editor is always static. */
  static?: boolean
  /** Widgets rendered inside the site root after the footer: badge, floating contact, chat, cookie banner. */
  children?: ReactNode
}

/**
 * Renders a whole site page from JSON: theme tokens on the root, global
 * sections around the page's section stack. The same component serves live
 * sites, previews, template demos and the editor canvas.
 *
 * Fonts are NOT loaded here — the caller adds the stylesheets from
 * `themeFontHrefs(theme, locale)` to the document head.
 */
export function SiteRenderer({
  site,
  globalSections,
  sections,
  main,
  rootId = 'site-root',
  static: isStatic,
  children,
}: SiteRendererProps) {
  const editor = site.mode === 'editor'
  const noMotion = editor || isStatic
  const { announcementBar, header, footer } = globalSections

  return (
    <div
      id={rootId}
      className="site-root"
      {...siteRootAttributes(site.theme, site.locale)}
      data-nav={site.navigation.style}
      data-static={noMotion ? '' : undefined}
      style={themeToCssVars(site.theme, site.locale)}
    >
      {!editor ? (
        <a href="#site-main" className="site-skip">
          {st(site.locale, 'skipToContent')}
        </a>
      ) : null}
      <SiteBackground theme={site.theme} />
      {announcementBar ? <SectionRenderer section={announcementBar} site={site} index={-1} bare /> : null}
      <div className="site-layout">
        {header ? <SectionRenderer section={header} site={site} index={-1} bare /> : null}
        <div className="site-layout-main">
          <main id="site-main" tabIndex={-1} className="outline-none">
            {main ?? sections.map((section, index) => <SectionRenderer key={section.id} section={section} site={site} index={index} />)}
          </main>
          {footer ? <SectionRenderer section={footer} site={site} index={-1} bare /> : null}
        </div>
      </div>
      {children}
      {!noMotion ? <RevealRoot rootId={rootId} /> : null}
    </div>
  )
}
