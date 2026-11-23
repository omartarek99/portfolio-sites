/**
 * Responsive image and video URL helpers. Isomorphic and synchronous so the
 * same code runs on live sites (server) and in the editor (client).
 *
 * Images are served through a CDN-style transform wherever one is available:
 *   - Cloudinary URLs get `f_auto,q_auto,w_<n>` transformations
 *   - Unsplash URLs get `w`/`q`/`auto=format` parameters
 *   - Same-origin files (bundled stock in /public, mock uploads under
 *     /api/media) go through Next's built-in optimizer at /_next/image
 *   - Anything else (other hosts, data:, blob:, SVG) is used as-is
 */

/** Must match `images.deviceSizes` + `images.imageSizes` in next.config.ts. */
export const IMAGE_WIDTHS = [64, 96, 128, 192, 256, 360, 480, 640, 828, 1080, 1280, 1600, 1920, 2400] as const
/** Must match `images.qualities` in next.config.ts. */
export const IMAGE_QUALITIES = [60, 75, 85] as const

export interface ImageUrlOptions {
  width?: number
  quality?: (typeof IMAGE_QUALITIES)[number]
}

function nearestWidth(width: number): number {
  return IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]
}

function isSvg(url: string): boolean {
  return /\.svg($|\?)/i.test(url)
}

export function isOptimizable(url: string): boolean {
  if (!url || url.startsWith('data:') || url.startsWith('blob:') || isSvg(url)) return false
  if (url.startsWith('/')) return !url.startsWith('//')
  return /^https:\/\/(res\.cloudinary\.com|images\.unsplash\.com)\//.test(url)
}

/** URL for an image at (at least) the given CSS-pixel width. */
export function imageUrl(src: string, options: ImageUrlOptions = {}): string {
  if (!src) return src
  const { width, quality = 75 } = options
  if (!width || !isOptimizable(src)) return src
  const w = nearestWidth(width)

  if (src.startsWith('https://res.cloudinary.com/')) {
    // …/image/upload/<existing?>/v123/id.jpg → insert our transformation after /upload/
    return src.replace(/\/upload\/(?!f_auto)/, `/upload/f_auto,q_auto,c_limit,w_${w}/`)
  }
  if (src.startsWith('https://images.unsplash.com/')) {
    const url = new URL(src)
    url.searchParams.set('w', String(w))
    url.searchParams.set('q', String(quality))
    url.searchParams.set('auto', 'format')
    url.searchParams.set('fit', 'max')
    return url.toString()
  }
  // Same-origin: Next's image optimizer (resizes, converts to AVIF/WebP, caches).
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${quality}`
}

/** `srcset` covering common display widths up to `maxWidth`. */
export function imageSrcSet(src: string, maxWidth: number = 1920, quality?: ImageUrlOptions['quality']): string | undefined {
  if (!isOptimizable(src)) return undefined
  const widths = IMAGE_WIDTHS.filter((w) => w >= 360 && w <= Math.max(360, maxWidth))
  return widths.map((w) => `${imageUrl(src, { width: w, quality })} ${w}w`).join(', ')
}

/* ── Video ───────────────────────────────────────────────────────────────── */

export type VideoProvider = 'file' | 'youtube' | 'vimeo'

export function detectVideoProvider(url: string): VideoProvider {
  if (/(?:youtube\.com|youtu\.be|youtube-nocookie\.com)/i.test(url)) return 'youtube'
  if (/vimeo\.com/i.test(url)) return 'vimeo'
  return 'file'
}

export function youtubeId(url: string): string | undefined {
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/i)
  return match?.[1]
}

export function vimeoId(url: string): string | undefined {
  const match = url.match(/vimeo\.com\/(?:video\/|channels\/[\w-]+\/|groups\/[\w-]+\/videos\/)?(\d+)/i)
  return match?.[1]
}

/**
 * Privacy-friendly embed URL for a YouTube/Vimeo page URL, or undefined for
 * file URLs and unrecognised links. No third-party request happens until the
 * visitor presses play (blocks render a poster + play button first).
 */
export function videoEmbedUrl(url: string, options: { autoplay?: boolean } = {}): string | undefined {
  const provider = detectVideoProvider(url)
  if (provider === 'youtube') {
    const id = youtubeId(url)
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0${options.autoplay ? '&autoplay=1' : ''}` : undefined
  }
  if (provider === 'vimeo') {
    const id = vimeoId(url)
    return id ? `https://player.vimeo.com/video/${id}?dnt=1${options.autoplay ? '&autoplay=1' : ''}` : undefined
  }
  return undefined
}

/** Poster image for a YouTube URL when no poster was provided. */
export function youtubePoster(url: string): string | undefined {
  const id = youtubeId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined
}
