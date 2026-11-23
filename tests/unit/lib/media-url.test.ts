import { describe, expect, it } from 'vitest'
import {
  detectVideoProvider,
  imageSrcSet,
  imageUrl,
  IMAGE_WIDTHS,
  isOptimizable,
  videoEmbedUrl,
  vimeoId,
  youtubeId,
  youtubePoster,
} from '@/lib/media-url'

const CLOUDINARY = 'https://res.cloudinary.com/demo/image/upload/v1700000000/sites/desk.jpg'
const UNSPLASH = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3'

describe('isOptimizable', () => {
  it('accepts same-origin paths and the two supported CDNs', () => {
    expect(isOptimizable('/stock/desk.jpg')).toBe(true)
    expect(isOptimizable('/api/media/abc.png')).toBe(true)
    expect(isOptimizable(CLOUDINARY)).toBe(true)
    expect(isOptimizable(UNSPLASH)).toBe(true)
  })

  it('rejects data, blob, svg, protocol-relative and other hosts', () => {
    expect(isOptimizable('data:image/png;base64,iVBORw0KGgo=')).toBe(false)
    expect(isOptimizable('blob:https://ok.test/abc')).toBe(false)
    expect(isOptimizable('/logo.svg')).toBe(false)
    expect(isOptimizable('/logo.SVG?v=2')).toBe(false)
    expect(isOptimizable('https://res.cloudinary.com/demo/image/upload/logo.svg')).toBe(false)
    expect(isOptimizable('//evil.test/x.jpg')).toBe(false)
    expect(isOptimizable('https://other.test/x.jpg')).toBe(false)
    expect(isOptimizable('')).toBe(false)
  })
})

describe('imageUrl', () => {
  it('returns the source unchanged without a width', () => {
    expect(imageUrl('/stock/desk.jpg')).toBe('/stock/desk.jpg')
    expect(imageUrl(CLOUDINARY)).toBe(CLOUDINARY)
  })

  it('returns the source unchanged for an empty or non-optimizable URL', () => {
    expect(imageUrl('', { width: 800 })).toBe('')
    expect(imageUrl('/logo.svg', { width: 800 })).toBe('/logo.svg')
    expect(imageUrl('data:image/png;base64,iVBORw0KGgo=', { width: 800 })).toBe(
      'data:image/png;base64,iVBORw0KGgo=',
    )
    expect(imageUrl('https://other.test/x.jpg', { width: 800 })).toBe('https://other.test/x.jpg')
  })

  it('inserts a Cloudinary transformation after /upload/', () => {
    expect(imageUrl(CLOUDINARY, { width: 640 })).toBe(
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_640/v1700000000/sites/desk.jpg',
    )
  })

  it('does not stack Cloudinary transformations', () => {
    const once = imageUrl(CLOUDINARY, { width: 640 })
    expect(imageUrl(once, { width: 1080 })).toBe(once)
  })

  it('adds Unsplash parameters', () => {
    const url = new URL(imageUrl(UNSPLASH, { width: 640, quality: 85 }))
    expect(url.searchParams.get('w')).toBe('640')
    expect(url.searchParams.get('q')).toBe('85')
    expect(url.searchParams.get('auto')).toBe('format')
    expect(url.searchParams.get('fit')).toBe('max')
    // existing parameters survive
    expect(url.searchParams.get('ixlib')).toBe('rb-4.0.3')
  })

  it('routes same-origin images through the Next optimizer', () => {
    expect(imageUrl('/stock/desk.jpg', { width: 640 })).toBe(
      '/_next/image?url=%2Fstock%2Fdesk.jpg&w=640&q=75',
    )
    expect(imageUrl('/api/media/a b.png', { width: 360, quality: 60 })).toBe(
      '/_next/image?url=%2Fapi%2Fmedia%2Fa%20b.png&w=360&q=60',
    )
  })

  it('snaps a requested width up to the next supported width', () => {
    const widthOf = (requested: number) =>
      Number(new URL(imageUrl('/a.jpg', { width: requested }), 'https://x.test').searchParams.get('w'))
    expect(widthOf(1)).toBe(64)
    expect(widthOf(64)).toBe(64)
    expect(widthOf(65)).toBe(96)
    expect(widthOf(500)).toBe(640)
    expect(widthOf(1080)).toBe(1080)
    expect(widthOf(99_999)).toBe(IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1])
  })

  it('defaults quality to 75', () => {
    expect(imageUrl('/a.jpg', { width: 360 })).toContain('q=75')
  })
})

describe('imageSrcSet', () => {
  it('covers display widths from 360 up to maxWidth', () => {
    const srcset = imageSrcSet('/stock/desk.jpg', 1080)
    expect(srcset).toBeDefined()
    const descriptors = srcset!.split(', ').map((entry) => entry.split(' ')[1])
    expect(descriptors).toEqual(['360w', '480w', '640w', '828w', '1080w'])
  })

  it('never goes below 360 even for a tiny maxWidth', () => {
    expect(imageSrcSet('/a.jpg', 100)).toBe('/_next/image?url=%2Fa.jpg&w=360&q=75 360w')
  })

  it('defaults to 1920', () => {
    expect(imageSrcSet('/a.jpg')).toContain('1920w')
    expect(imageSrcSet('/a.jpg')).not.toContain('2400w')
  })

  it('passes the quality through', () => {
    expect(imageSrcSet('/a.jpg', 360, 85)).toContain('q=85')
  })

  it('is undefined for images that cannot be resized', () => {
    expect(imageSrcSet('/logo.svg')).toBeUndefined()
    expect(imageSrcSet('data:image/png;base64,iVBORw0KGgo=')).toBeUndefined()
    expect(imageSrcSet('https://other.test/x.jpg')).toBeUndefined()
  })

  it('works for Cloudinary and Unsplash sources', () => {
    expect(imageSrcSet(CLOUDINARY, 640)).toContain('w_640')
    expect(imageSrcSet(UNSPLASH, 640)).toContain('w=640')
  })
})

describe('detectVideoProvider', () => {
  it.each([
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube'],
    ['https://youtu.be/dQw4w9WgXcQ', 'youtube'],
    ['https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', 'youtube'],
    ['https://vimeo.com/123456789', 'vimeo'],
    ['https://player.vimeo.com/video/123456789', 'vimeo'],
    ['/media/clip.mp4', 'file'],
    ['https://ok.test/clip.webm', 'file'],
  ] as const)('%s → %s', (url, provider) => {
    expect(detectVideoProvider(url)).toBe(provider)
  })
})

describe('youtubeId', () => {
  it.each([
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
    'https://www.youtube.com/watch?list=PL123&v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ?t=12',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    'https://www.youtube.com/live/dQw4w9WgXcQ',
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    'HTTPS://WWW.YOUTUBE.COM/WATCH?V=dQw4w9WgXcQ',
  ])('finds the id in %s', (url) => {
    expect(youtubeId(url)).toBe('dQw4w9WgXcQ')
  })

  it('is undefined when there is no 11-character id', () => {
    expect(youtubeId('https://www.youtube.com/watch?v=short')).toBeUndefined()
    expect(youtubeId('https://vimeo.com/123456789')).toBeUndefined()
    expect(youtubeId('/clip.mp4')).toBeUndefined()
    expect(youtubeId('')).toBeUndefined()
  })
})

describe('vimeoId', () => {
  it.each([
    'https://vimeo.com/123456789',
    'https://vimeo.com/video/123456789',
    'https://player.vimeo.com/video/123456789',
    'https://vimeo.com/channels/staffpicks/123456789',
    'https://vimeo.com/groups/motion/videos/123456789',
    'https://vimeo.com/123456789?share=copy',
  ])('finds the id in %s', (url) => {
    expect(vimeoId(url)).toBe('123456789')
  })

  it('is undefined for a non-Vimeo URL', () => {
    expect(vimeoId('https://youtu.be/dQw4w9WgXcQ')).toBeUndefined()
    expect(vimeoId('https://vimeo.com/layla')).toBeUndefined()
  })
})

describe('videoEmbedUrl', () => {
  it('uses the no-cookie YouTube host', () => {
    expect(videoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    )
    expect(videoEmbedUrl('https://youtu.be/dQw4w9WgXcQ', { autoplay: true })).toBe(
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1',
    )
  })

  it('uses Vimeo with do-not-track', () => {
    expect(videoEmbedUrl('https://vimeo.com/123456789')).toBe(
      'https://player.vimeo.com/video/123456789?dnt=1',
    )
    expect(videoEmbedUrl('https://vimeo.com/123456789', { autoplay: true })).toBe(
      'https://player.vimeo.com/video/123456789?dnt=1&autoplay=1',
    )
  })

  it('is undefined for file URLs and unrecognised links', () => {
    expect(videoEmbedUrl('/media/clip.mp4')).toBeUndefined()
    expect(videoEmbedUrl('https://www.youtube.com/watch?v=short')).toBeUndefined()
    expect(videoEmbedUrl('https://vimeo.com/layla')).toBeUndefined()
  })
})

describe('youtubePoster', () => {
  it('points at the YouTube thumbnail', () => {
    expect(youtubePoster('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    )
    expect(youtubePoster('/clip.mp4')).toBeUndefined()
  })
})
