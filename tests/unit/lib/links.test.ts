import { describe, expect, it } from 'vitest'
import type { SiteRuntime } from '@/blocks/types'
import {
  localeHref,
  normalizePhone,
  pageHref,
  postHref,
  resolveLink,
  safeUrl,
  socialUrl,
  SOCIAL_LABELS,
  whatsappUrl,
} from '@/lib/links'
import { SOCIAL_PLATFORMS, type Locale } from '@/schemas/fields'

function runtime(overrides: Partial<SiteRuntime> = {}): SiteRuntime {
  return {
    siteId: 'site-1',
    slug: 'layla',
    locale: 'en',
    locales: ['en', 'ar'],
    dir: 'ltr',
    mode: 'live',
    theme: {} as SiteRuntime['theme'],
    basePath: '',
    currentSlug: '',
    localePrefix: '',
    pages: [
      { id: 'home', slug: '', title: { en: 'Home' }, type: 'standard', visibility: 'public' },
      { id: 'work', slug: 'work', title: { en: 'Work' }, type: 'standard', visibility: 'public' },
      { id: 'blog', slug: 'journal', title: { en: 'Journal' }, type: 'blogIndex', visibility: 'public' },
    ],
    navigation: { header: [], footer: [], style: 'top' },
    settings: {
      seo: { titleTemplate: '%s' },
      social: [],
      contact: {},
      cookieBanner: false,
    },
    posts: [],
    blogSlug: 'journal',
    meetingTypes: [],
    flags: { showBadge: false, pro: false, analytics: false },
    apiBase: '',
    ...overrides,
  }
}

describe('safeUrl', () => {
  it('keeps http(s), mailto, tel and sms URLs', () => {
    expect(safeUrl('https://ok.test/x')).toBe('https://ok.test/x')
    expect(safeUrl('http://ok.test')).toBe('http://ok.test')
    expect(safeUrl('mailto:layla@example.com')).toBe('mailto:layla@example.com')
    expect(safeUrl('tel:+962791234567')).toBe('tel:+962791234567')
    expect(safeUrl('sms:+962791234567')).toBe('sms:+962791234567')
  })

  it('keeps anchors and site-relative paths', () => {
    expect(safeUrl('#contact')).toBe('#contact')
    expect(safeUrl('/about')).toBe('/about')
    expect(safeUrl('/ar/about?x=1#y')).toBe('/ar/about?x=1#y')
  })

  it('assumes https for a bare domain', () => {
    expect(safeUrl('example.com')).toBe('https://example.com')
    expect(safeUrl('example.com/path?a=1')).toBe('https://example.com/path?a=1')
    expect(safeUrl('sub.example.co.uk')).toBe('https://sub.example.co.uk')
  })

  it('trims surrounding whitespace before deciding', () => {
    expect(safeUrl('  https://ok.test  ')).toBe('https://ok.test')
    expect(safeUrl('  javascript:alert(1)')).toBeUndefined()
  })

  it.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'java\tscript:alert(1)',
    'java\nscript:alert(1)',
    'vbscript:msgbox(1)',
    'data:text/html,<script>alert(1)</script>',
    'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
    'file:///etc/passwd',
    'blob:https://ok.test/abc',
    'about:blank',
    '//evil.test/phish',
    'not a url',
    '',
    '   ',
  ])('rejects %j', (url) => {
    expect(safeUrl(url)).toBeUndefined()
  })

  it('rejects null and undefined', () => {
    expect(safeUrl(null)).toBeUndefined()
    expect(safeUrl(undefined)).toBeUndefined()
  })
})

describe('pageHref', () => {
  it('builds a root-relative path', () => {
    expect(pageHref({ basePath: '', localePrefix: '' }, '')).toBe('/')
    expect(pageHref({ basePath: '', localePrefix: '' }, 'work')).toBe('/work')
    expect(pageHref({ basePath: '', localePrefix: '' }, 'work/noor')).toBe('/work/noor')
  })

  it('adds the locale prefix', () => {
    expect(pageHref({ basePath: '', localePrefix: 'ar' }, '')).toBe('/ar')
    expect(pageHref({ basePath: '', localePrefix: 'ar' }, 'work')).toBe('/ar/work')
  })

  it('adds the base path for demos and previews', () => {
    expect(pageHref({ basePath: '/demo/aurora', localePrefix: '' }, 'work')).toBe('/demo/aurora/work')
    expect(pageHref({ basePath: '/preview/tok', localePrefix: 'ar' }, '')).toBe('/preview/tok/ar')
    expect(pageHref({ basePath: '/demo/aurora/', localePrefix: '' }, '/work/')).toBe('/demo/aurora/work')
  })
})

describe('localeHref', () => {
  it('drops the prefix for the default locale and adds it for the other', () => {
    const site = { basePath: '', locales: ['en', 'ar'] as Locale[], currentSlug: 'work' }
    expect(localeHref(site, 'en')).toBe('/work')
    expect(localeHref(site, 'ar')).toBe('/ar/work')
  })

  it('works on the home page', () => {
    const site = { basePath: '', locales: ['en', 'ar'] as Locale[], currentSlug: '' }
    expect(localeHref(site, 'en')).toBe('/')
    expect(localeHref(site, 'ar')).toBe('/ar')
  })

  it('respects an Arabic-first site', () => {
    const site = { basePath: '', locales: ['ar', 'en'] as Locale[], currentSlug: 'work' }
    expect(localeHref(site, 'ar')).toBe('/work')
    expect(localeHref(site, 'en')).toBe('/en/work')
  })

  it('keeps the base path', () => {
    const site = { basePath: '/demo/aurora', locales: ['en', 'ar'] as Locale[], currentSlug: 'work' }
    expect(localeHref(site, 'ar')).toBe('/demo/aurora/ar/work')
  })
})

describe('postHref', () => {
  it('nests the post under the blog index page', () => {
    expect(postHref({ basePath: '', localePrefix: '', blogSlug: 'journal' }, 'first-post')).toBe(
      '/journal/first-post',
    )
  })

  it('falls back to "blog" when the site has no blog page', () => {
    expect(postHref({ basePath: '', localePrefix: '' }, 'first-post')).toBe('/blog/first-post')
  })

  it('keeps base path and locale prefix', () => {
    expect(postHref({ basePath: '/demo/aurora', localePrefix: 'ar', blogSlug: 'journal' }, 'p1')).toBe(
      '/demo/aurora/ar/journal/p1',
    )
  })
})

describe('resolveLink', () => {
  it('resolves nothing for a missing link or type "none"', () => {
    expect(resolveLink(runtime(), undefined)).toEqual({ external: false })
    expect(resolveLink(runtime(), null)).toEqual({ external: false })
    expect(resolveLink(runtime(), { type: 'none', value: '' })).toEqual({ external: false })
  })

  it('page: by id and by slug', () => {
    expect(resolveLink(runtime(), { type: 'page', value: 'work' })).toEqual({
      href: '/work',
      external: false,
    })
    expect(resolveLink(runtime(), { type: 'page', value: 'journal' })).toEqual({
      href: '/journal',
      external: false,
    })
    expect(resolveLink(runtime(), { type: 'page', value: 'home' })).toEqual({ href: '/', external: false })
  })

  it('page: unknown target resolves to no href', () => {
    expect(resolveLink(runtime(), { type: 'page', value: 'nope' })).toEqual({ external: false })
  })

  it('page: honours base path, locale prefix and newTab', () => {
    const site = runtime({ basePath: '/demo/aurora', localePrefix: 'ar', locale: 'ar' })
    expect(resolveLink(site, { type: 'page', value: 'work', newTab: true })).toEqual({
      href: '/demo/aurora/ar/work',
      external: false,
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('anchor: a bare hash on the home page', () => {
    expect(resolveLink(runtime({ currentSlug: '' }), { type: 'anchor', value: 'about' })).toEqual({
      href: '#about',
      external: false,
    })
    expect(resolveLink(runtime({ currentSlug: '' }), { type: 'anchor', value: '#about' })).toEqual({
      href: '#about',
      external: false,
    })
  })

  it('anchor: goes to the home page first from any other page', () => {
    expect(resolveLink(runtime({ currentSlug: 'work' }), { type: 'anchor', value: 'about' })).toEqual({
      href: '/#about',
      external: false,
    })
    const prefixed = runtime({ currentSlug: 'work', basePath: '/demo/aurora', localePrefix: 'ar' })
    expect(resolveLink(prefixed, { type: 'anchor', value: 'about' }).href).toBe('/demo/aurora/ar#about')
  })

  it('anchor: an empty value resolves to no href', () => {
    expect(resolveLink(runtime(), { type: 'anchor', value: '' })).toEqual({ external: false })
    expect(resolveLink(runtime(), { type: 'anchor', value: '#' })).toEqual({ external: false })
  })

  it('url: external links get target and rel by default', () => {
    expect(resolveLink(runtime(), { type: 'url', value: 'https://ok.test/x' })).toEqual({
      href: 'https://ok.test/x',
      external: true,
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('url: newTab false keeps an external link in the same tab', () => {
    expect(resolveLink(runtime(), { type: 'url', value: 'https://ok.test/x', newTab: false })).toEqual({
      href: 'https://ok.test/x',
      external: true,
    })
  })

  it('url: internal paths are not external', () => {
    expect(resolveLink(runtime(), { type: 'url', value: '/about' })).toEqual({
      href: '/about',
      external: false,
    })
  })

  it('url: an unsafe value resolves to no href', () => {
    expect(resolveLink(runtime(), { type: 'url', value: 'javascript:alert(1)' })).toEqual({ external: false })
    expect(resolveLink(runtime(), { type: 'url', value: 'data:text/html,x' })).toEqual({ external: false })
  })

  it('email and phone', () => {
    expect(resolveLink(runtime(), { type: 'email', value: ' layla@example.com ' })).toEqual({
      href: 'mailto:layla@example.com',
      external: true,
    })
    expect(resolveLink(runtime(), { type: 'phone', value: '+962 79 123 4567' })).toEqual({
      href: 'tel:+962791234567',
      external: true,
    })
    expect(resolveLink(runtime(), { type: 'email', value: '' })).toEqual({ external: false })
    expect(resolveLink(runtime(), { type: 'phone', value: '' })).toEqual({ external: false })
  })

  it('whatsapp: digits only, with the site prefilled message', () => {
    expect(resolveLink(runtime(), { type: 'whatsapp', value: '+962 79 123 4567' })).toEqual({
      href: 'https://wa.me/962791234567',
      external: true,
      target: '_blank',
      rel: 'noopener noreferrer',
    })

    const withMessage = runtime({
      locale: 'ar',
      settings: {
        ...runtime().settings,
        floatingContact: {
          enabled: true,
          channels: [],
          whatsappMessage: { en: 'Hi from your site', ar: 'مرحبًا من موقعك' },
        },
      },
    })
    expect(resolveLink(withMessage, { type: 'whatsapp', value: '962791234567' }).href).toBe(
      `https://wa.me/962791234567?text=${encodeURIComponent('مرحبًا من موقعك')}`,
    )
  })

  it('whatsapp: empty value resolves to no href', () => {
    expect(resolveLink(runtime(), { type: 'whatsapp', value: '' })).toEqual({ external: false })
  })

  it('file: downloads in a new tab', () => {
    expect(resolveLink(runtime(), { type: 'file', value: '/api/media/cv.pdf' })).toEqual({
      href: '/api/media/cv.pdf',
      external: true,
      download: true,
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(resolveLink(runtime(), { type: 'file', value: 'javascript:alert(1)' })).toEqual({
      external: false,
    })
  })

  it('booking: carries the meeting type id instead of an href', () => {
    expect(resolveLink(runtime(), { type: 'booking', value: 'intro-call' })).toEqual({
      booking: 'intro-call',
      external: false,
    })
    expect(resolveLink(runtime(), { type: 'booking', value: '' })).toEqual({ booking: '', external: false })
  })

  it('never produces an href in an executable scheme, for any link type', () => {
    // An anchor keeps the value after "#", which is inert as a fragment; what
    // must never happen is an href the browser treats as code or inline data.
    for (const type of ['page', 'anchor', 'url', 'email', 'phone', 'whatsapp', 'file', 'booking'] as const) {
      for (const value of [
        'javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'vbscript:msgbox(1)',
      ]) {
        const resolved = resolveLink(runtime(), { type, value })
        expect(resolved.href ?? '', `${type} / ${value}`).not.toMatch(/^\s*(javascript|data|vbscript):/i)
      }
    }
  })
})

describe('normalizePhone and whatsappUrl', () => {
  it('keeps digits only', () => {
    expect(normalizePhone('+962 (79) 123-4567')).toBe('962791234567')
    expect(normalizePhone('no digits')).toBe('')
  })

  it('encodes the prefilled message', () => {
    expect(whatsappUrl('+962 79 123 4567')).toBe('https://wa.me/962791234567')
    expect(whatsappUrl('962791234567', 'Hi & hello')).toBe('https://wa.me/962791234567?text=Hi%20%26%20hello')
  })
})

describe('socialUrl', () => {
  it('builds a profile URL from a handle', () => {
    expect(socialUrl('instagram', 'layla.studio')).toBe('https://instagram.com/layla.studio')
    expect(socialUrl('linkedin', 'layla-haddad')).toBe('https://www.linkedin.com/in/layla-haddad')
    expect(socialUrl('x', 'layla')).toBe('https://x.com/layla')
    expect(socialUrl('github', 'layla')).toBe('https://github.com/layla')
    expect(socialUrl('youtube', 'laylastudio')).toBe('https://youtube.com/@laylastudio')
    expect(socialUrl('tiktok', 'layla')).toBe('https://tiktok.com/@layla')
    expect(socialUrl('telegram', 'layla')).toBe('https://t.me/layla')
    expect(socialUrl('medium', 'layla')).toBe('https://medium.com/@layla')
  })

  it('strips a leading @ from the handle', () => {
    expect(socialUrl('instagram', '@layla')).toBe('https://instagram.com/layla')
    expect(socialUrl('x', ' @layla ')).toBe('https://x.com/layla')
  })

  it('passes a full URL through', () => {
    expect(socialUrl('behance', 'https://behance.net/layla')).toBe('https://behance.net/layla')
    expect(socialUrl('website', 'https://layla.test')).toBe('https://layla.test')
  })

  it('turns whatsapp into a wa.me link and email into mailto', () => {
    expect(socialUrl('whatsapp', '+962 79 123 4567')).toBe('https://wa.me/962791234567')
    expect(socialUrl('email', 'layla@example.com')).toBe('mailto:layla@example.com')
  })

  it('returns undefined for empty input and never an unsafe URL', () => {
    expect(socialUrl('instagram', '')).toBeUndefined()
    expect(socialUrl('instagram', '   ')).toBeUndefined()
    expect(socialUrl('website', 'javascript:alert(1)')).toBeUndefined()
    for (const platform of SOCIAL_PLATFORMS) {
      expect(socialUrl(platform, 'javascript:alert(1)') ?? '', platform).not.toMatch(/^javascript:/i)
    }
  })

  it('has a bilingual label for every platform', () => {
    for (const platform of SOCIAL_PLATFORMS) {
      expect(SOCIAL_LABELS[platform]?.en, platform).toBeTruthy()
      expect(SOCIAL_LABELS[platform]?.ar, platform).toBeTruthy()
    }
  })
})
