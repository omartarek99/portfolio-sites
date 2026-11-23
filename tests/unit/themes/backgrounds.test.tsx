// @vitest-environment jsdom
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Theme } from '@/schemas/site'
import {
  AuroraBlobs,
  GRADIENT_PRESETS,
  IslamicDivider,
  PANNING_GRADIENT,
  PATTERN_PRESETS,
  PatternFrame,
  PatternLayer,
  SiteBackground,
  isSafeGradient,
  resolveGradient,
} from '@/themes/backgrounds'

const THEME: Theme = {
  templateId: 'majlis',
  palette: {
    background: '#FBFAF7',
    surface: '#FFFFFF',
    text: '#1F2A2E',
    mutedText: '#636D72',
    primary: '#7A1E3A',
    secondary: '#1F4E5A',
    accent: '#B8964F',
    border: '#E6DFD1',
  },
  mode: 'light',
  fonts: {
    heading: { family: 'Cormorant Garamond' },
    body: { family: 'Inter' },
    arabicHeading: { family: 'El Messiri' },
    arabicBody: { family: 'Noto Kufi Arabic' },
  },
  radius: 'sm',
  spacing: 'airy',
  motion: 'subtle',
  buttonStyle: 'outline',
}

describe('gradients', () => {
  it('accepts presets and real gradient functions only', () => {
    expect(resolveGradient('brand-diagonal')).toBe(GRADIENT_PRESETS['brand-diagonal'])
    expect(resolveGradient(PANNING_GRADIENT)).toContain('linear-gradient')
    expect(resolveGradient('linear-gradient(90deg, #fff, #000)')).toContain('linear-gradient')
    expect(resolveGradient('url(javascript:alert(1))')).toBeUndefined()
    expect(isSafeGradient('linear-gradient(90deg,#fff,#000)')).toBe(true)
    expect(isSafeGradient('red; background: url(x)')).toBe(false)
  })
})

describe('decorative layers', () => {
  it('renders every pattern preset, hidden from assistive tech', () => {
    for (const id of [...Object.keys(PATTERN_PRESETS), 'islamic-star']) {
      const { container, unmount } = render(<PatternLayer id={id} />)
      const layer = container.firstElementChild
      expect(layer, id).not.toBeNull()
      expect(layer?.getAttribute('aria-hidden'), id).toBe('true')
      unmount()
    }
  })

  it('combines the paper texture with noise', () => {
    const { container } = render(<PatternLayer id="paper" />)
    expect(container.firstElementChild?.className).toContain('site-noise')
  })

  it('labels the blueprint grid with coordinate ticks', () => {
    const { container } = render(<PatternLayer id="blueprint" />)
    const labels = [...container.querySelectorAll('text')].map((node) => node.textContent)
    expect(labels).toContain('120')
    expect(labels.length).toBeGreaterThan(4)
  })

  it('renders nothing for an unknown or missing pattern', () => {
    expect(render(<PatternLayer id="nope" />).container.firstElementChild).toBeNull()
    expect(render(<PatternLayer id={undefined} />).container.firstElementChild).toBeNull()
  })

  it('renders the Majlis divider and hero frame as decoration', () => {
    for (const node of [<IslamicDivider key="d" />, <PatternFrame key="f" />]) {
      const { container, unmount } = render(node)
      expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
      unmount()
    }
  })

  it('renders three aurora blobs that the stylesheet can freeze', () => {
    const { container } = render(<AuroraBlobs />)
    const blobs = container.querySelectorAll('.site-aurora-blob')
    expect(blobs).toHaveLength(3)
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
  })
})

describe('SiteBackground', () => {
  it('renders nothing without a background style', () => {
    expect(render(<SiteBackground theme={THEME} />).container.firstElementChild).toBeNull()
    expect(
      render(<SiteBackground theme={{ ...THEME, backgroundStyle: { type: 'solid', value: '#FFFFFF' } }} />)
        .container.firstElementChild,
    ).toBeNull()
  })

  it('renders each background type', () => {
    const cases: Theme['backgroundStyle'][] = [
      { type: 'gradient', value: 'brand-soft' },
      { type: 'gradient', value: PANNING_GRADIENT },
      { type: 'pattern', value: 'islamic-star' },
      { type: 'pattern', value: 'paper' },
      { type: 'noise', value: '0.4' },
      { type: 'image', value: 'https://images.example.com/photo.jpg' },
    ]
    for (const backgroundStyle of cases) {
      const { container, unmount } = render(<SiteBackground theme={{ ...THEME, backgroundStyle }} />)
      expect(container.querySelector('.site-bg-layer'), backgroundStyle?.value).not.toBeNull()
      unmount()
    }
  })

  it('animates only the panning gradient', () => {
    const panning = render(
      <SiteBackground theme={{ ...THEME, backgroundStyle: { type: 'gradient', value: PANNING_GRADIENT } }} />,
    )
    expect(panning.container.querySelector('.sc-gradient-pan')).not.toBeNull()
    const still = render(
      <SiteBackground theme={{ ...THEME, backgroundStyle: { type: 'gradient', value: 'aurora' } }} />,
    )
    expect(still.container.querySelector('.sc-gradient-pan')).toBeNull()
  })

  it('ignores an unsafe gradient value', () => {
    const { container } = render(
      <SiteBackground theme={{ ...THEME, backgroundStyle: { type: 'gradient', value: 'expression(x)' } }} />,
    )
    expect(container.firstElementChild).toBeNull()
  })
})
