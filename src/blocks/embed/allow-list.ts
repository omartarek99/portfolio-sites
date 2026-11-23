/**
 * Embed allow-list (SPEC §7.1, §15). The ONLY way a third-party frame reaches
 * a user site: a pasted page URL or <iframe>/<script> snippet is normalised to
 * a canonical embed URL we build ourselves, or rejected. Isomorphic, pure.
 */

export type EmbedProvider =
  | 'youtube'
  | 'vimeo'
  | 'spotify'
  | 'soundcloud'
  | 'googleMaps'
  | 'calendly'
  | 'figma'
  | 'behance'
  | 'dribbble'
  | 'gist'

/** Registrable domains per provider. A host matches itself or any subdomain of it. */
export const EMBED_ALLOW_LIST: Record<EmbedProvider, { name: string; domains: readonly string[] }> = {
  youtube: { name: 'YouTube', domains: ['youtube.com', 'youtu.be', 'youtube-nocookie.com'] },
  vimeo: { name: 'Vimeo', domains: ['vimeo.com'] },
  spotify: { name: 'Spotify', domains: ['open.spotify.com'] },
  soundcloud: { name: 'SoundCloud', domains: ['soundcloud.com'] },
  googleMaps: { name: 'Google Maps', domains: ['google.com'] },
  calendly: { name: 'Calendly', domains: ['calendly.com'] },
  figma: { name: 'Figma', domains: ['figma.com'] },
  behance: { name: 'Behance', domains: ['behance.net'] },
  dribbble: { name: 'Dribbble', domains: ['dribbble.com'] },
  gist: { name: 'GitHub Gist', domains: ['gist.github.com'] },
}

export type EmbedError = 'empty' | 'invalid' | 'host' | 'unsupported'

export type EmbedMatch =
  | {
      ok: true
      provider: EmbedProvider
      /** Canonical https embed URL (for gist: the gist page, rendered through `srcDoc`). */
      src: string
      /** Self-built document for providers that only offer a script embed. Render WITHOUT allow-same-origin. */
      srcDoc?: string
      /** Natural aspect ratio (CSS `aspect-ratio`) … */
      ratio?: string
      /** … or a fixed height in px for players that do not scale. */
      height?: number
    }
  | { ok: false; error: EmbedError; provider?: EmbedProvider }

const fail = (error: EmbedError): EmbedMatch => ({ ok: false, error })

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&#x2f;|&#0*47;/gi, '/')
}

/** The URL inside a pasted snippet: an iframe/script `src`, or Calendly's `data-url`. */
function snippetUrl(snippet: string): string | undefined {
  const match = snippet.match(/<(?:iframe|script|div)\b[^>]*?\s(?:src|data-url)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/i)
  const raw = match?.[1] ?? match?.[2] ?? match?.[3]
  return raw === undefined ? undefined : decodeEntities(raw).trim()
}

/** Parse an absolute http(s) URL (protocol-relative allowed); anything else is undefined. */
function parseHttpUrl(value: string): URL | undefined {
  const candidate = value.startsWith('//') ? `https:${value}` : /^[a-z][\w+.-]*:/i.test(value) ? value : `https://${value}`
  let url: URL
  try {
    url = new URL(candidate)
  } catch {
    return undefined
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined
  if (url.username || url.password || url.port) return undefined
  return url
}

function onDomain(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`)
}

export function providerOf(host: string): EmbedProvider | undefined {
  const h = host.toLowerCase().replace(/\.$/, '')
  for (const [id, entry] of Object.entries(EMBED_ALLOW_LIST) as [EmbedProvider, (typeof EMBED_ALLOW_LIST)[EmbedProvider]][]) {
    if (entry.domains.some((d) => onDomain(h, d))) return id
  }
  return undefined
}

const segments = (url: URL) => url.pathname.split('/').filter(Boolean)
const SAFE_SEGMENT = /^[\w.~%-]+$/

function youtube(url: URL): EmbedMatch {
  const parts = segments(url)
  let id: string | undefined
  if (url.hostname.endsWith('youtu.be')) id = parts[0]
  else if (['embed', 'shorts', 'live', 'v'].includes(parts[0])) id = parts[1]
  else if (parts[0] === 'watch') id = url.searchParams.get('v') ?? undefined
  if (!id || !/^[\w-]{11}$/.test(id)) return fail('unsupported')
  const start = Number.parseInt(url.searchParams.get('t') ?? url.searchParams.get('start') ?? '', 10)
  const query = Number.isFinite(start) && start > 0 ? `?rel=0&start=${start}` : '?rel=0'
  return { ok: true, provider: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}${query}`, ratio: '16/9' }
}

function vimeo(url: URL): EmbedMatch {
  const parts = segments(url)
  const index = parts.findIndex((p) => /^\d+$/.test(p))
  if (index === -1) return fail('unsupported')
  // Unlisted videos carry a hash: vimeo.com/123/abc or ?h=abc.
  const hash = url.searchParams.get('h') ?? (url.hostname === 'vimeo.com' || url.hostname === 'www.vimeo.com' ? parts[index + 1] : undefined)
  const h = hash && /^[\da-f]+$/i.test(hash) ? `&h=${hash}` : ''
  return { ok: true, provider: 'vimeo', src: `https://player.vimeo.com/video/${parts[index]}?dnt=1${h}`, ratio: '16/9' }
}

const SPOTIFY_TYPES = ['track', 'album', 'playlist', 'episode', 'show', 'artist']
function spotify(url: URL): EmbedMatch {
  const parts = segments(url).filter((p) => p !== 'embed' && !p.startsWith('intl-'))
  const [type, id] = parts
  if (!SPOTIFY_TYPES.includes(type) || !id || !/^[A-Za-z0-9]{10,40}$/.test(id)) return fail('unsupported')
  const compact = type === 'track' || type === 'episode'
  return { ok: true, provider: 'spotify', src: `https://open.spotify.com/embed/${type}/${id}`, height: compact ? 152 : 352 }
}

function soundcloud(url: URL): EmbedMatch {
  let target = url
  if (url.hostname === 'w.soundcloud.com') {
    const inner = parseHttpUrl(url.searchParams.get('url') ?? '')
    if (!inner || providerOf(inner.hostname) !== 'soundcloud' || inner.hostname === 'w.soundcloud.com') return fail('unsupported')
    target = inner
  }
  const parts = segments(target)
  if (parts.length < 2 || !parts.every((p) => SAFE_SEGMENT.test(p))) return fail('unsupported')
  const host = target.hostname === 'api.soundcloud.com' ? 'api.soundcloud.com' : 'soundcloud.com'
  const track = `https://${host}/${parts.join('/')}`
  const playlist = parts.includes('sets') || parts[0] === 'playlists'
  return {
    ok: true,
    provider: 'soundcloud',
    src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(track)}&visual=false&show_comments=false`,
    height: playlist ? 450 : 166,
  }
}

function googleMaps(url: URL): EmbedMatch {
  const host = url.hostname
  if (host !== 'google.com' && host !== 'www.google.com' && host !== 'maps.google.com') return fail('host')
  const path = url.pathname
  const parts = segments(url)
  if (host !== 'maps.google.com' && parts[0] !== 'maps') return fail('unsupported')
  // Google's own "Embed a map" code.
  if (path.startsWith('/maps/embed')) {
    const pb = url.searchParams.get('pb')
    if (!pb) return fail('unsupported')
    return { ok: true, provider: 'googleMaps', src: `https://www.google.com/maps/embed?pb=${encodeURIComponent(pb)}`, ratio: '16/9' }
  }
  let q = url.searchParams.get('q') ?? url.searchParams.get('query') ?? undefined
  if (!q) {
    const place = parts.indexOf('place')
    if (place !== -1 && parts[place + 1]) q = decodeURIComponent(parts[place + 1]).replace(/\+/g, ' ')
  }
  if (!q) {
    const at = path.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
    if (at) q = `${at[1]},${at[2]}`
  }
  if (!q) return fail('unsupported')
  return { ok: true, provider: 'googleMaps', src: `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`, ratio: '16/9' }
}

function calendly(url: URL): EmbedMatch {
  const parts = segments(url)
  if (parts.length < 1 || parts.length > 2 || !parts.every((p) => SAFE_SEGMENT.test(p))) return fail('unsupported')
  return { ok: true, provider: 'calendly', src: `https://calendly.com/${parts.join('/')}?hide_gdpr_banner=1`, height: 700 }
}

const FIGMA_KINDS = ['file', 'design', 'proto', 'board', 'slides', 'deck']
function figma(url: URL): EmbedMatch {
  // Classic embed wrapper: figma.com/embed?url=<figma page>
  if (url.pathname.startsWith('/embed')) {
    const inner = parseHttpUrl(url.searchParams.get('url') ?? '')
    if (!inner || providerOf(inner.hostname) !== 'figma' || inner.pathname.startsWith('/embed')) return fail('unsupported')
    return figma(inner)
  }
  const parts = segments(url)
  if (!FIGMA_KINDS.includes(parts[0]) || !parts[1] || !/^[A-Za-z0-9]{10,64}$/.test(parts[1])) return fail('unsupported')
  if (url.hostname === 'embed.figma.com') {
    return { ok: true, provider: 'figma', src: `https://embed.figma.com/${parts[0]}/${parts[1]}?embed-host=share`, ratio: '16/10' }
  }
  const page = `https://www.figma.com/${parts.slice(0, 3).filter((p) => SAFE_SEGMENT.test(p)).join('/')}${url.searchParams.get('node-id') ? `?node-id=${encodeURIComponent(url.searchParams.get('node-id')!)}` : ''}`
  return { ok: true, provider: 'figma', src: `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(page)}`, ratio: '16/10' }
}

function behance(url: URL): EmbedMatch {
  const parts = segments(url)
  const id = parts[0] === 'gallery' ? parts[1] : parts[0] === 'embed' && parts[1] === 'project' ? parts[2] : undefined
  if (!id || !/^\d+$/.test(id)) return fail('unsupported')
  return { ok: true, provider: 'behance', src: `https://www.behance.net/embed/project/${id}?ilo0=1`, ratio: '4/3' }
}

function dribbble(url: URL): EmbedMatch {
  const parts = segments(url)
  const id = parts[0] === 'shots' ? parts[1]?.match(/^(\d+)/)?.[1] : undefined
  if (!id) return fail('unsupported')
  return { ok: true, provider: 'dribbble', src: `https://dribbble.com/shots/${id}/embed`, ratio: '4/3' }
}

function gist(url: URL): EmbedMatch {
  const parts = segments(url)
  const user = parts[0]
  const id = parts[1]?.replace(/\.js$/, '')
  if (!user || !/^[A-Za-z0-9-]{1,39}$/.test(user) || !id || !/^[0-9a-f]{5,40}$/i.test(id)) return fail('unsupported')
  const page = `https://gist.github.com/${user}/${id}`
  return {
    ok: true,
    provider: 'gist',
    src: page,
    // Gist only offers a document.write script. We build the whole document; it runs in an opaque origin.
    srcDoc: `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>body{margin:0}</style></head><body><script src="${page}.js"></script></body></html>`,
    height: 420,
  }
}

const HANDLERS: Record<EmbedProvider, (url: URL) => EmbedMatch> = {
  youtube,
  vimeo,
  spotify,
  soundcloud,
  googleMaps,
  calendly,
  figma,
  behance,
  dribbble,
  gist,
}

/**
 * Normalise a pasted page URL or embed snippet into a canonical embed URL on
 * the allow-list, or say why not. Never returns a non-https or off-list URL.
 */
export function matchEmbed(input: string | undefined | null): EmbedMatch {
  const value = (input ?? '').trim()
  if (value === '') return fail('empty')
  const raw = value.startsWith('<') ? snippetUrl(value) : value
  if (!raw) return fail('invalid')
  const url = parseHttpUrl(raw)
  if (!url) return fail('invalid')
  const provider = providerOf(url.hostname)
  if (!provider) return fail('host')
  const result = HANDLERS[provider](url)
  return result.ok ? result : { ...result, provider }
}

/** Human list of allowed services, for messages. */
export const EMBED_PROVIDER_NAMES = Object.values(EMBED_ALLOW_LIST).map((p) => p.name)

/** `code` variant: any script tag (opening or closing, any case or spacing) refuses the whole snippet. */
export function hasScriptTag(code: string): boolean {
  return /<\s*\/?\s*script\b/i.test(code)
}
