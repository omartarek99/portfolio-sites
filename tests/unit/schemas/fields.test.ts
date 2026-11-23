import { describe, expect, it } from 'vitest'
import {
  dirOf,
  hexColorSchema,
  idSchema,
  imageSchema,
  isLocale,
  isLocalizedEmpty,
  linkSchema,
  loc,
  localizedSchema,
  pick,
  plainText,
  videoSchema,
} from '@/schemas/fields'

describe('pick', () => {
  it('returns the value for the requested locale', () => {
    expect(pick({ en: 'Hello', ar: 'مرحبا' }, 'ar')).toBe('مرحبا')
    expect(pick({ en: 'Hello', ar: 'مرحبا' }, 'en')).toBe('Hello')
  })

  it('falls back to the other language when the requested one is missing or empty', () => {
    expect(pick({ en: 'Hello' }, 'ar')).toBe('Hello')
    expect(pick({ en: 'Hello', ar: '' }, 'ar')).toBe('Hello')
    expect(pick({ ar: 'مرحبا' }, 'en')).toBe('مرحبا')
  })

  it('returns an empty string instead of falling back when fallback is off', () => {
    expect(pick({ en: 'Hello' }, 'ar', false)).toBe('')
    expect(pick({ en: 'Hello', ar: 'مرحبا' }, 'ar', false)).toBe('مرحبا')
  })

  it('passes plain strings through and maps null/undefined to an empty string', () => {
    expect(pick('Plain', 'ar')).toBe('Plain')
    expect(pick('', 'en')).toBe('')
    expect(pick(null, 'en')).toBe('')
    expect(pick(undefined, 'en')).toBe('')
    expect(pick({}, 'en')).toBe('')
  })
})

describe('loc', () => {
  it('builds a Localized value, with Arabic only when given', () => {
    expect(loc('Hello', 'مرحبا')).toEqual({ en: 'Hello', ar: 'مرحبا' })
    expect(loc('Hello')).toEqual({ en: 'Hello' })
  })
})

describe('isLocalizedEmpty', () => {
  it.each([
    [undefined, true],
    [null, true],
    ['', true],
    ['   ', true],
    ['x', false],
    [{}, true],
    [{ en: '' }, true],
    [{ en: '  ', ar: '\n' }, true],
    [{ ar: 'مرحبا' }, false],
    [{ en: 'Hi', ar: '' }, false],
  ] as const)('%o → %s', (value, expected) => {
    expect(isLocalizedEmpty(value)).toBe(expected)
  })
})

describe('plainText', () => {
  it('strips inline markup and collapses whitespace', () => {
    expect(plainText('<b>Layla</b> <em>Haddad</em>')).toBe('Layla Haddad')
    expect(plainText('one<br>two')).toBe('one two')
    expect(plainText('one<br />two')).toBe('one two')
    expect(plainText('  spaced   out  ')).toBe('spaced out')
  })

  it('decodes the entities the inline editor produces', () => {
    expect(plainText('Tom&nbsp;&amp;&nbsp;Jerry')).toBe('Tom & Jerry')
    expect(plainText('&lt;script&gt;')).toBe('<script>')
    expect(plainText('&quot;quoted&quot; and &#39;single&#39;')).toBe('"quoted" and \'single\'')
  })

  it('keeps Arabic text intact', () => {
    expect(plainText('<strong>ليلى</strong> حداد')).toBe('ليلى حداد')
  })

  it('returns an empty string for markup-only input', () => {
    expect(plainText('<span></span>')).toBe('')
  })
})

describe('dirOf and isLocale', () => {
  it('maps locales to text direction', () => {
    expect(dirOf('en')).toBe('ltr')
    expect(dirOf('ar')).toBe('rtl')
  })

  it('recognises supported locales only', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('ar')).toBe(true)
    expect(isLocale('fr')).toBe(false)
    expect(isLocale(undefined)).toBe(false)
    expect(isLocale(1)).toBe(false)
  })
})

describe('primitive schemas', () => {
  it('idSchema accepts letters, numbers, dash and underscore only', () => {
    expect(idSchema.safeParse('s_hero-1').success).toBe(true)
    expect(idSchema.safeParse('').success).toBe(false)
    expect(idSchema.safeParse('has space').success).toBe(false)
    expect(idSchema.safeParse('a'.repeat(65)).success).toBe(false)
  })

  it('hexColorSchema requires a 6-digit hex color', () => {
    expect(hexColorSchema.safeParse('#B9FF66').success).toBe(true)
    expect(hexColorSchema.safeParse('#b9ff66').success).toBe(true)
    expect(hexColorSchema.safeParse('#fff').success).toBe(false)
    expect(hexColorSchema.safeParse('B9FF66').success).toBe(false)
    expect(hexColorSchema.safeParse('rgb(0,0,0)').success).toBe(false)
  })

  it('localizedSchema makes both languages optional and caps length', () => {
    expect(localizedSchema.safeParse({}).success).toBe(true)
    expect(localizedSchema.safeParse({ en: 'Hi' }).success).toBe(true)
    expect(localizedSchema.safeParse({ en: 'a'.repeat(20_001) }).success).toBe(false)
    expect(localizedSchema.safeParse({ en: 42 }).success).toBe(false)
  })
})

describe('linkSchema', () => {
  it('accepts every link type', () => {
    for (const type of [
      'none',
      'page',
      'anchor',
      'url',
      'email',
      'phone',
      'whatsapp',
      'file',
      'booking',
    ] as const) {
      expect(linkSchema.safeParse({ type, value: '' }).success).toBe(true)
    }
  })

  it('rejects an unknown type and a missing value', () => {
    expect(linkSchema.safeParse({ type: 'magic', value: '' }).success).toBe(false)
    expect(linkSchema.safeParse({ type: 'url' }).success).toBe(false)
  })

  it('accepts the optional newTab flag', () => {
    expect(linkSchema.parse({ type: 'url', value: '/x', newTab: true })).toEqual({
      type: 'url',
      value: '/x',
      newTab: true,
    })
  })
})

describe('imageSchema and videoSchema', () => {
  it('needs only a url', () => {
    expect(imageSchema.safeParse({ url: '/stock/desk.jpg' }).success).toBe(true)
    expect(imageSchema.safeParse({}).success).toBe(false)
  })

  it('accepts alt, focal point, crop, filter and attribution', () => {
    const parsed = imageSchema.safeParse({
      url: '/stock/desk.jpg',
      alt: { en: 'A desk', ar: 'مكتب' },
      width: 1600,
      height: 900,
      focal: { x: 0.5, y: 0.25 },
      crop: { x: 0, y: 0, w: 1, h: 0.5 },
      filter: 'grayscale',
      attribution: { name: 'Nour Rahal', url: 'https://example.com', source: 'unsplash' },
    })
    expect(parsed.success).toBe(true)
  })

  it('rejects out-of-range focal points, non-integer sizes and unknown filters', () => {
    expect(imageSchema.safeParse({ url: '/a.jpg', focal: { x: 1.5, y: 0 } }).success).toBe(false)
    expect(imageSchema.safeParse({ url: '/a.jpg', width: 12.5 }).success).toBe(false)
    expect(imageSchema.safeParse({ url: '/a.jpg', width: 0 }).success).toBe(false)
    expect(imageSchema.safeParse({ url: '/a.jpg', filter: 'sepia' }).success).toBe(false)
  })

  it('videoSchema accepts a provider and a poster image', () => {
    expect(videoSchema.safeParse({ url: 'https://youtu.be/dQw4w9WgXcQ', provider: 'youtube' }).success).toBe(
      true,
    )
    expect(videoSchema.safeParse({ url: '/clip.mp4', poster: { url: '/poster.jpg' } }).success).toBe(true)
    expect(videoSchema.safeParse({ url: '/clip.mp4', provider: 'dailymotion' }).success).toBe(false)
  })
})
