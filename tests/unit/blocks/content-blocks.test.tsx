/**
 * Rich text, Embed and Freeform render to static markup with default and
 * empty content, and the security-relevant output holds (SPEC §7, §15).
 */
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { embedBlock } from '@/blocks/embed'
import { freeformBlock } from '@/blocks/freeform'
import { richTextBlock } from '@/blocks/rich-text'
import { minimalContent } from '@/blocks/testing'
import type { AnyBlockDefinition, BlockContext } from '@/blocks/types'
import { buildSiteRuntime } from '@/lib/sites/runtime'
import { dirOf, type Locale } from '@/schemas/fields'
import type { Section } from '@/schemas/site'
import { starterContent } from '@/templates/starter'

function render(block: AnyBlockDefinition, variant: string, content: Record<string, unknown>, locale: Locale = 'en'): string {
  const parsed = block.manifest.schema.parse(content)
  const site = buildSiteRuntime({ siteId: 'test', content: starterContent(), locale, mode: 'live' })
  const section: Section = { id: 'sec', blockType: block.manifest.type, variant, content: parsed, style: {}, animation: { entrance: 'none' }, responsive: {} }
  const ctx: BlockContext = { site, mode: 'live', locale, dir: dirOf(locale), sectionId: 'sec', index: 1 }
  return renderToStaticMarkup(
    createElement(block.Component, { section, content: parsed, variant, theme: site.theme, locale, mode: 'live', siteId: 'test', ctx }),
  )
}

describe('content blocks', () => {
  for (const block of [richTextBlock, embedBlock, freeformBlock]) {
    for (const { id } of block.manifest.variants) {
      for (const locale of ['en', 'ar'] as const) {
        it(`${block.manifest.type}/${id} renders default and minimal content (${locale})`, () => {
          expect(render(block, id, block.manifest.defaultContent, locale)).not.toMatch(/<h[1-6][^>]*><\/h[1-6]>/)
          expect(render(block, id, minimalContent(block.manifest), locale)).not.toMatch(/<h[1-6][^>]*><\/h[1-6]>|<p[^>]*><\/p>/)
        })
      }
    }
  }

  it('sandboxes allowed frames and refuses others with a message', () => {
    const ok = render(embedBlock, 'iframe', { url: 'https://youtu.be/dQw4w9WgXcQ' })
    expect(ok).toContain('src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0"')
    expect(ok).toContain('sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"')
    expect(ok).toMatch(/loading="lazy"/)
    expect(ok).toMatch(/title="[^"]+"/)
    const bad = render(embedBlock, 'iframe', { url: 'javascript:alert(1)' })
    expect(bad).not.toContain('<iframe')
    expect(bad).toContain('role="note"')
    const gist = render(embedBlock, 'iframe', { url: 'https://gist.github.com/noura-dev/0a1b2c3d4e5f' })
    expect(gist).toContain('sandbox="allow-scripts allow-popups"')
  })

  it('refuses snippets with scripts and sanitizes the rest', () => {
    expect(render(embedBlock, 'code', { code: { en: '<p>Hi</p><script>alert(1)</script>' } })).not.toContain('<p>Hi</p>')
    const clean = render(embedBlock, 'code', { code: { en: '<p onclick="x()">Hi <a href="javascript:alert(1)">x</a></p><iframe src="https://evil.example"></iframe>' } })
    expect(clean).toContain('<p>Hi <a>x</a></p>')
    expect(clean).not.toMatch(/onclick|javascript:|iframe/)
  })

  it('uses a stored mobile layout instead of stacking', () => {
    const frame = { x: 10, y: 10, w: 50, h: 20 }
    const elements = [
      { id: 'a', type: 'text', text: { en: 'Hello' }, size: 3, frame },
      { id: 'b', type: 'text', text: { en: 'Desktop only' }, size: 3, frame: { ...frame, y: 50 } },
    ]
    const html = render(freeformBlock, 'canvas', { elements, mobile: { aspect: 0.6, frames: { a: { ...frame, size: 8 } } } })
    expect(html).toContain('--mfs:8')
    expect(html).toMatch(/Desktop only<\/p><\/div>/)
    expect(html.match(/max-md:hidden/g)?.length).toBe(1)
  })
})
