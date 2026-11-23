import { describe, expect, it } from 'vitest'
import { placeholderArt, type PlaceholderKind } from '@/blocks/_shared/placeholder-art'

const KINDS: PlaceholderKind[] = ['portrait', 'cover', 'landscape', 'square']

function viewBox(uri: string): string {
  const svg = decodeURIComponent(uri.replace('data:image/svg+xml,', ''))
  return svg.match(/viewBox="([^"]+)"/)?.[1] ?? ''
}

describe('placeholderArt', () => {
  it('is deterministic for a seed and kind', () => {
    expect(placeholderArt('layla-haddad', 'portrait')).toBe(placeholderArt('layla-haddad', 'portrait'))
    expect(placeholderArt('atlas-bank', 'cover')).toBe(placeholderArt('atlas-bank', 'cover'))
  })

  it('differs between seeds and between kinds', () => {
    expect(placeholderArt('atlas-bank', 'cover')).not.toBe(placeholderArt('souq-lab', 'cover'))
    expect(placeholderArt('atlas-bank', 'cover')).not.toBe(placeholderArt('atlas-bank', 'square'))
  })

  it('returns an inline SVG data URI usable as an image source', () => {
    const uri = placeholderArt('najma-press')
    expect(uri.startsWith('data:image/svg+xml,')).toBe(true)
    // Encoded, so it is safe inside src="" and url().
    expect(uri).not.toContain('<')
    expect(uri).not.toContain('"')
    const svg = decodeURIComponent(uri.replace('data:image/svg+xml,', ''))
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true)
    expect(svg.endsWith('</svg>')).toBe(true)
  })

  it('carries the aspect ratio of each kind, so there is no layout shift', () => {
    expect(viewBox(placeholderArt('a', 'portrait'))).toBe('0 0 800 1000')
    expect(viewBox(placeholderArt('a', 'cover'))).toBe('0 0 1600 900')
    expect(viewBox(placeholderArt('a', 'landscape'))).toBe('0 0 1200 800')
    expect(viewBox(placeholderArt('a', 'square'))).toBe('0 0 1000 1000')
  })

  it('never produces NaN coordinates, for any kind or seed', () => {
    for (const kind of KINDS) {
      for (let i = 0; i < 40; i++) {
        const svg = decodeURIComponent(placeholderArt(`seed-${i}`, kind).replace('data:image/svg+xml,', ''))
        expect(svg).not.toContain('NaN')
        expect(svg).not.toContain('undefined')
      }
    }
  })

  it('handles an empty seed', () => {
    expect(placeholderArt('')).toBe(placeholderArt(''))
  })
})
