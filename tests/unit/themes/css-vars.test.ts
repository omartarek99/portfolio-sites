import { describe, expect, it } from 'vitest'
import type { Theme } from '@/schemas/site'
import { contrastRatio } from '@/lib/color'
import { onColor, paletteIsDark, siteRootAttributes, themeToCssVars } from '@/themes/css-vars'
import { getPalette } from '@/themes/palettes'

function theme(overrides: Partial<Theme> = {}): Theme {
  return {
    templateId: 'aurora',
    palette: getPalette('paper-white')!.palette,
    mode: 'light',
    fonts: {
      heading: { family: 'Space Grotesk' },
      body: { family: 'Inter' },
      arabicHeading: { family: 'El Messiri' },
      arabicBody: { family: 'IBM Plex Sans Arabic' },
    },
    radius: 'md',
    spacing: 'comfortable',
    motion: 'subtle',
    buttonStyle: 'solid',
    ...overrides,
  }
}

const EXPECTED_TOKENS = [
  '--site-heading-weight',
  '--site-heading-tracking',
  '--site-bg',
  '--site-surface',
  '--site-text',
  '--site-muted',
  '--site-primary',
  '--site-secondary',
  '--site-accent',
  '--site-border',
  '--site-bg-0',
  '--site-text-0',
  '--site-surface-0',
  '--site-muted-0',
  '--site-border-0',
  '--site-on-primary',
  '--site-on-secondary',
  '--site-on-accent',
  '--site-inv-surface',
  '--site-inv-muted',
  '--site-inv-border',
  '--site-font-heading',
  '--site-font-body',
  '--site-radius',
  '--site-radius-sm',
  '--site-radius-lg',
  '--site-radius-btn',
  '--site-section-y',
  '--site-gap',
  '--site-motion-duration',
  '--site-motion-distance',
  '--site-motion-ease',
  '--site-motion-stagger',
]

describe('themeToCssVars', () => {
  it('returns every token, with no empty values', () => {
    const vars = themeToCssVars(theme(), 'en')
    expect(Object.keys(vars).sort()).toEqual([...EXPECTED_TOKENS].sort())
    for (const [key, value] of Object.entries(vars)) {
      expect(String(value).length, key).toBeGreaterThan(0)
    }
  })

  it('maps the palette onto the color tokens', () => {
    const t = theme({ palette: getPalette('midnight')!.palette, mode: 'dark' })
    const vars = themeToCssVars(t, 'en')
    expect(vars['--site-bg']).toBe(t.palette.background)
    expect(vars['--site-primary']).toBe(t.palette.primary)
    expect(vars['--site-bg-0']).toBe(t.palette.background)
    expect(vars['--site-on-primary']).toBe(onColor(t.palette.primary, t.palette))
    expect(contrastRatio(String(vars['--site-on-primary']), t.palette.primary)).toBeGreaterThanOrEqual(4.5)
  })

  it('uses the Arabic fonts and zero heading tracking for ar', () => {
    const vars = themeToCssVars(theme(), 'ar')
    expect(vars['--site-font-heading']).toContain('"El Messiri"')
    // The Latin companion stays in the stack for names and numbers.
    expect(vars['--site-font-heading']).toContain('"Space Grotesk"')
    expect(vars['--site-font-body']).toContain('"IBM Plex Sans Arabic"')
    expect(vars['--site-heading-tracking']).toBe('0')
  })

  it('keeps negative tracking only for Latin', () => {
    expect(themeToCssVars(theme(), 'en')['--site-heading-tracking']).toBe('-0.025em')
  })

  it('never asks a single-weight display font for bold', () => {
    const singleWeight = ['Archivo Black', 'Bebas Neue', 'DM Serif Display', 'Instrument Serif', 'Lalezar']
    for (const family of singleWeight) {
      const vars = themeToCssVars(theme({ fonts: { ...theme().fonts, heading: { family } } }), 'en')
      expect(vars['--site-heading-weight'], family).toBe('400')
    }
  })

  it('picks the nearest available weight for static families', () => {
    // Poppins ships 400–700: the 700 target is available.
    const poppins = themeToCssVars(
      theme({ fonts: { ...theme().fonts, heading: { family: 'Poppins' } } }),
      'en',
    )
    expect(poppins['--site-heading-weight']).toBe('700')
    // Libre Baskerville is a serif (target 600) with only 400/700.
    const baskerville = themeToCssVars(
      theme({ fonts: { ...theme().fonts, heading: { family: 'Libre Baskerville' } } }),
      'en',
    )
    expect(['400', '700']).toContain(baskerville['--site-heading-weight'])
  })

  it('clamps the weight into a variable font range', () => {
    const vars = themeToCssVars(
      theme({ fonts: { ...theme().fonts, heading: { family: 'Markazi Text' } } }),
      'en',
    )
    expect(Number(vars['--site-heading-weight'])).toBeLessThanOrEqual(700)
    expect(Number(vars['--site-heading-weight'])).toBeGreaterThanOrEqual(400)
  })

  it('scales radius, spacing and motion with the theme knobs', () => {
    expect(themeToCssVars(theme({ radius: 'none' }), 'en')['--site-radius']).toBe('0px')
    expect(themeToCssVars(theme({ buttonStyle: 'pill', radius: 'full' }), 'en')['--site-radius-btn']).toBe(
      '9999px',
    )
    expect(themeToCssVars(theme({ motion: 'none' }), 'en')['--site-motion-duration']).toBe('0ms')
    expect(themeToCssVars(theme({ spacing: 'airy' }), 'en')['--site-section-y']).toContain('clamp')
  })
})

describe('siteRootAttributes', () => {
  it('sets direction and the data attributes blocks style on', () => {
    const attrs = siteRootAttributes(theme({ buttonStyle: 'brutal' }), 'ar')
    expect(attrs.dir).toBe('rtl')
    expect(attrs.lang).toBe('ar')
    expect(attrs['data-card']).toBe('brutal')
    expect(attrs['data-bg']).toBe('solid')
    expect(attrs['data-template']).toBe('aurora')
    expect(siteRootAttributes(theme({ buttonStyle: 'glass' }), 'en')['data-card']).toBe('glass')
    expect(siteRootAttributes(theme({ buttonStyle: 'solid' }), 'en')['data-card']).toBe('soft')
  })

  it('reports the real lightness of the palette', () => {
    expect(paletteIsDark({ palette: getPalette('midnight')!.palette })).toBe(true)
    expect(paletteIsDark({ palette: getPalette('paper-white')!.palette })).toBe(false)
  })
})
