import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  FONT_FAMILIES,
  FONT_PAIRS,
  fontCssHref,
  fontFiles,
  fontPairToThemeFonts,
  fontPreloads,
  fontStack,
  getFont,
  isKnownFont,
  themeFontHrefs,
} from '@/themes/fonts'
import manifest from '@/themes/font-manifest.json'

const THEME_FONTS = fontPairToThemeFonts(FONT_PAIRS[0])

describe('font registry', () => {
  it('has unique ids and families', () => {
    const ids = FONT_FAMILIES.map((font) => font.id)
    const families = FONT_FAMILIES.map((font) => font.family.toLowerCase())
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(families).size).toBe(families.length)
  })

  it('registers every family used by a curated pair', () => {
    for (const pair of FONT_PAIRS) {
      for (const family of [pair.heading, pair.body, pair.arabicHeading, pair.arabicBody]) {
        expect(isKnownFont(family), `${pair.id}: ${family}`).toBe(true)
      }
    }
  })

  it('gives every pair an Arabic heading and body (SPEC §8.4)', () => {
    expect(FONT_PAIRS.length).toBeGreaterThanOrEqual(20)
    for (const pair of FONT_PAIRS) {
      for (const family of [pair.arabicHeading, pair.arabicBody]) {
        expect(getFont(family)?.script, `${pair.id}: ${family}`).not.toBe('latin')
      }
    }
  })

  it('registers every font named in docs/TEMPLATES.md', () => {
    const catalog = readFileSync(path.resolve('docs/TEMPLATES.md'), 'utf8')
    const named = catalog
      .split('\n')
      .filter((line) => line.includes('Fonts:'))
      .flatMap((line) => [...line.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => match[1].trim()))
    expect(named.length).toBeGreaterThan(20)
    for (const family of new Set(named)) {
      expect(isKnownFont(family), family).toBe(true)
    }
  })
})

describe('self-hosted files', () => {
  it('has a stylesheet and manifest entry for every family', () => {
    for (const font of FONT_FAMILIES) {
      const css = path.resolve(`public/fonts/${font.id}.css`)
      expect(existsSync(css), `${font.id}.css`).toBe(true)
      expect(fontCssHref(font.family)).toBe(`/fonts/${font.id}.css`)
      const files = fontFiles(font.id)
      expect(files.length, `${font.id} manifest entry`).toBeGreaterThan(0)
      for (const file of files) {
        expect(['latin', 'latin-ext', 'arabic'], `${font.id} subset`).toContain(file.subset)
        expect(existsSync(path.resolve(`public${file.url}`)), file.url).toBe(true)
        expect(readFileSync(css, 'utf8')).toContain(file.url)
      }
    }
  })

  it('covers the Arabic subset for every Arabic family', () => {
    for (const font of FONT_FAMILIES.filter((f) => f.script !== 'latin')) {
      expect(
        fontFiles(font.id).some((file) => file.subset === 'arabic'),
        font.id,
      ).toBe(true)
    }
  })

  it('has no manifest entries for unregistered families', () => {
    const ids = new Set(FONT_FAMILIES.map((font) => font.id))
    for (const id of Object.keys(manifest)) expect(ids.has(id), id).toBe(true)
  })
})

describe('fontPreloads', () => {
  it('preloads the latin regular files of the English fonts', () => {
    const urls = fontPreloads({ fonts: THEME_FONTS }, 'en')
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) {
      expect(url).toMatch(/^\/fonts\/[a-z0-9-]+\/latin-(400|variable)-normal\.woff2$/)
    }
    const ids = urls.map((url) => url.split('/')[2])
    expect(ids).toContain(getFont(THEME_FONTS.heading.family)?.id)
    expect(ids).toContain(getFont(THEME_FONTS.body.family)?.id)
  })

  it('preloads the arabic subset of the Arabic fonts for ar', () => {
    const urls = fontPreloads({ fonts: THEME_FONTS }, 'ar')
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) expect(url).toContain('/arabic-')
    const ids = urls.map((url) => url.split('/')[2])
    expect(ids).toContain(getFont(THEME_FONTS.arabicHeading.family)?.id)
  })

  it('never repeats a file when heading and body are the same family', () => {
    const fonts = fontPairToThemeFonts(FONT_PAIRS.find((pair) => pair.heading === pair.body) ?? FONT_PAIRS[0])
    const urls = fontPreloads({ fonts }, 'en')
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('returns nothing for an unknown family instead of throwing', () => {
    const fonts = {
      heading: { family: 'Not A Font' },
      body: { family: 'Not A Font' },
      arabicHeading: { family: 'Not A Font' },
      arabicBody: { family: 'Not A Font' },
    }
    expect(fontPreloads({ fonts }, 'en')).toEqual([])
  })
})

describe('stacks and hrefs', () => {
  it('quotes the family and appends a generic fallback', () => {
    expect(fontStack({ family: 'Space Grotesk' })).toContain('"Space Grotesk"')
    expect(fontStack({ family: 'Playfair Display' })).toContain('serif')
    expect(fontStack({ family: 'Cairo' }, { family: 'Inter' })).toContain('"Inter"')
  })

  it('loads the Latin fonts too on Arabic pages', () => {
    const hrefs = themeFontHrefs({ fonts: THEME_FONTS }, 'ar')
    expect(hrefs).toContain(fontCssHref(THEME_FONTS.arabicHeading.family))
    expect(hrefs).toContain(fontCssHref(THEME_FONTS.heading.family))
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })
})
