import { describe, expect, it } from 'vitest'
import {
  allSections,
  defaultLocaleOf,
  findPageById,
  findPageBySlug,
  MAX_PAGES_PER_SITE,
  MAX_SECTIONS_PER_PAGE,
  PAGE_SLUG_REGEX,
  siteContentSchema,
} from '@/schemas/site'
import { clone, page, section, validSite } from './fixture'

/** The messages of every issue, so a test can assert on the rule that fired. */
function problems(input: unknown): string[] {
  const result = siteContentSchema.safeParse(input)
  return result.success ? [] : result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`)
}

describe('siteContentSchema', () => {
  it('parses a valid site', () => {
    const result = siteContentSchema.safeParse(validSite())
    expect(result.success).toBe(true)
  })

  it('applies section defaults for style, animation and responsive', () => {
    const parsed = siteContentSchema.parse(validSite())
    const hero = parsed.pages[0].sections[0]
    expect(hero.style).toEqual({})
    expect(hero.animation).toEqual({ entrance: 'fade' })
    expect(hero.responsive).toEqual({})
  })

  it('keeps explicit section style, animation and responsive values', () => {
    const site = clone(validSite())
    site.pages[0].sections[0] = section('s-hero', {
      style: { paddingY: 'xl', width: 'wide' },
      animation: { entrance: 'zoom', delayMs: 200 },
      responsive: { hideOn: ['mobile'], mobileVariant: 'stack' },
    })
    const parsed = siteContentSchema.parse(site)
    expect(parsed.pages[0].sections[0].animation).toEqual({ entrance: 'zoom', delayMs: 200 })
    expect(parsed.pages[0].sections[0].responsive.hideOn).toEqual(['mobile'])
  })

  it('rejects a site without a home page', () => {
    const site = clone(validSite())
    site.pages = [page('about', 'about')]
    expect(problems(site)).toContain('pages: A site needs a home page (slug "")')
  })

  it('rejects duplicate page ids', () => {
    const site = clone(validSite())
    site.pages[1].id = site.pages[0].id
    expect(problems(site).join('\n')).toMatch(/Duplicate page id "home"/)
  })

  it('rejects duplicate page slugs', () => {
    const site = clone(validSite())
    site.pages.push(page('work-2', 'work'))
    expect(problems(site).join('\n')).toMatch(/Duplicate page slug "work"/)
  })

  it('rejects duplicate section ids, on one page and across pages', () => {
    const samePage = clone(validSite())
    samePage.pages[0].sections.push(section('s-hero'))
    expect(problems(samePage).join('\n')).toMatch(/Duplicate section id "s-hero"/)

    const acrossPages = clone(validSite())
    acrossPages.pages[1].sections = [section('s-hero')]
    expect(problems(acrossPages).join('\n')).toMatch(/Duplicate section id "s-hero"/)
  })

  it('rejects a section id already used by a global section', () => {
    const site = clone(validSite())
    site.globalSections = { header: section('s-hero', { blockType: 'header', variant: 'simple' }) }
    expect(problems(site).join('\n')).toMatch(/Duplicate section id "s-hero"/)
  })

  it('rejects reserved page slugs, including as a first segment', () => {
    const site = clone(validSite())
    site.pages[1].slug = 'ar'
    expect(problems(site).join('\n')).toMatch(/"ar" is a reserved path/)

    const nested = clone(validSite())
    nested.pages[1].slug = 'api/hello'
    expect(problems(nested).join('\n')).toMatch(/"api" is a reserved path/)
  })

  it('allows a reserved word as a later segment', () => {
    const site = clone(validSite())
    site.pages[1].slug = 'work/api'
    expect(problems(site)).toEqual([])
  })

  it('rejects a global block placed on a page', () => {
    for (const blockType of ['header', 'footer', 'announcement'] as const) {
      const site = clone(validSite())
      site.pages[0].sections = [section('s-global', { blockType, variant: 'simple' })]
      expect(problems(site).join('\n')).toMatch(
        new RegExp(`"${blockType}" is a global block and cannot be placed on a page`),
      )
    }
  })

  it('accepts global blocks inside globalSections', () => {
    const site = clone(validSite())
    site.globalSections = {
      header: section('s-header', { blockType: 'header', variant: 'simple' }),
      footer: section('s-footer', { blockType: 'footer', variant: 'simple' }),
      announcementBar: section('s-bar', { blockType: 'announcement', variant: 'simple' }),
    }
    expect(problems(site)).toEqual([])
  })

  it('rejects duplicate locales', () => {
    const site = clone(validSite())
    site.locales = ['ar', 'ar']
    expect(problems(site)).toContain('locales: Locales must be unique')
  })

  it('requires at least one locale and at most two', () => {
    const none = clone(validSite())
    none.locales = []
    expect(problems(none).length).toBeGreaterThan(0)
  })

  it('enforces the page limit', () => {
    const site = clone(validSite())
    site.pages = [
      page('home', ''),
      ...Array.from({ length: MAX_PAGES_PER_SITE }, (_, i) => page(`p${i}`, `p-${i}`)),
    ]
    expect(site.pages).toHaveLength(MAX_PAGES_PER_SITE + 1)
    expect(problems(site).length).toBeGreaterThan(0)

    site.pages = site.pages.slice(0, MAX_PAGES_PER_SITE)
    expect(problems(site)).toEqual([])
  })

  it('enforces the section limit per page', () => {
    const site = clone(validSite())
    site.pages[0].sections = Array.from({ length: MAX_SECTIONS_PER_PAGE + 1 }, (_, i) => section(`s${i}`))
    expect(problems(site).length).toBeGreaterThan(0)

    site.pages[0].sections = site.pages[0].sections.slice(0, MAX_SECTIONS_PER_PAGE)
    expect(problems(site)).toEqual([])
  })

  it('rejects an unknown block type and an empty variant', () => {
    const unknown = clone(validSite())
    // @ts-expect-error — not a BlockType
    unknown.pages[0].sections[0].blockType = 'carousel'
    expect(problems(unknown).length).toBeGreaterThan(0)

    const noVariant = clone(validSite())
    noVariant.pages[0].sections[0].variant = ''
    expect(problems(noVariant).length).toBeGreaterThan(0)
  })

  it('rejects a malformed section anchor and accepts a kebab-case one', () => {
    const bad = clone(validSite())
    bad.pages[0].sections[0] = section('s-hero', { anchor: 'My Anchor' })
    expect(problems(bad).length).toBeGreaterThan(0)

    const good = clone(validSite())
    good.pages[0].sections[0] = section('s-hero', { anchor: 'about-me' })
    expect(problems(good)).toEqual([])
  })

  it('rejects a non-hex palette color', () => {
    const site = clone(validSite())
    site.theme.palette.primary = 'rebeccapurple'
    expect(problems(site).join('\n')).toMatch(/hex color/)
  })
})

describe('PAGE_SLUG_REGEX', () => {
  const valid = ['', 'about', 'case-studies', 'work/noor-studio', 'a', 'a1', 'blog/2026/post-1', 'x-1-y']
  const invalid = [
    '/about',
    'about/',
    'About',
    'about me',
    'about--me',
    '-about',
    'about-',
    'work//noor',
    'عربي',
    'about.html',
    'a_b',
  ]

  it.each(valid)('accepts %o', (slug) => {
    expect(PAGE_SLUG_REGEX.test(slug)).toBe(true)
  })

  it.each(invalid)('rejects %o', (slug) => {
    expect(PAGE_SLUG_REGEX.test(slug)).toBe(false)
  })

  it('is enforced by pageSchema', () => {
    const site = clone(validSite())
    site.pages[1].slug = 'About Us'
    expect(problems(site).join('\n')).toMatch(/lowercase letters, numbers and hyphens/)
  })
})

describe('site helpers', () => {
  it('defaultLocaleOf is the first locale', () => {
    expect(defaultLocaleOf({ locales: ['ar', 'en'] })).toBe('ar')
  })

  it('findPageBySlug trims slashes and findPageById matches ids', () => {
    const site = siteContentSchema.parse(validSite())
    expect(findPageBySlug(site, '/work/')?.id).toBe('work')
    expect(findPageBySlug(site, '')?.id).toBe('home')
    expect(findPageBySlug(site, 'nope')).toBeUndefined()
    expect(findPageById(site, 'work')?.slug).toBe('work')
  })

  it('allSections lists global sections first, then page sections', () => {
    const input = clone(validSite())
    input.globalSections = {
      header: section('s-header', { blockType: 'header', variant: 'simple' }),
      announcementBar: section('s-bar', { blockType: 'announcement', variant: 'simple' }),
    }
    const site = siteContentSchema.parse(input)
    expect(allSections(site).map((s) => s.id)).toEqual(['s-bar', 's-header', 's-hero', 's-projects'])
  })
})
