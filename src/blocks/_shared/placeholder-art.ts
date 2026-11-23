/**
 * Deterministic abstract art for example content that has no image yet
 * (SPEC §7): the same seed always returns the same picture, so a template demo
 * looks identical on every render and in screenshots.
 *
 * Returns a data-URI SVG — no network request, no layout shift (the viewBox
 * carries the aspect ratio), and it works inside an <img src>.
 */

export type PlaceholderKind = 'portrait' | 'cover' | 'landscape' | 'square'

const SIZE: Record<PlaceholderKind, readonly [number, number]> = {
  portrait: [800, 1000],
  cover: [1600, 900],
  landscape: [1200, 800],
  square: [1000, 1000],
}

/** FNV-1a — small, stable across runtimes. */
function hashSeed(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32 — deterministic PRNG from a 32-bit seed. */
function makeRandom(seed: number): () => number {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const round = (n: number): string => String(Math.round(n * 10) / 10)

/** Low-saturation neutral so the art never fights the site palette. */
function tone(hue: number, saturation: number, lightness: number): string {
  return `hsl(${Math.round(hue)} ${Math.round(saturation)}% ${Math.round(lightness)}%)`
}

/**
 * A data-URI SVG of abstract art, deterministic for `seed`.
 *
 *   <img src={placeholderArt(item.id, 'portrait')} alt="" />
 */
export function placeholderArt(seed: string, kind: PlaceholderKind = 'landscape'): string {
  const [width, height] = SIZE[kind]
  const random = makeRandom(hashSeed(`${seed}:${kind}`))
  const hue = Math.round(random() * 360)
  const warm = random() > 0.5
  const hue2 = (hue + (warm ? 24 : -24) + 360) % 360
  const dark = random() > 0.65

  const base = dark ? 22 : 92
  const step = dark ? 9 : -8
  const shapes: string[] = []

  // Soft drifting blobs.
  const blobs = 3 + Math.floor(random() * 2)
  for (let i = 0; i < blobs; i++) {
    const cx = (0.12 + random() * 0.76) * width
    const cy = (0.12 + random() * 0.76) * height
    const r = (0.16 + random() * 0.26) * Math.min(width, height)
    shapes.push(
      `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" fill="${tone(
        i % 2 === 0 ? hue : hue2,
        10 + random() * 10,
        base + step * (1 + i * 0.6),
      )}" opacity="${round(0.35 + random() * 0.35)}" filter="url(#b)"/>`,
    )
  }

  // One crisp geometric accent: a ring or a long thin bar.
  const accent = tone(hue2, 16, dark ? base + 46 : base - 54)
  if (random() > 0.5) {
    const r = (0.2 + random() * 0.2) * Math.min(width, height)
    shapes.push(
      `<circle cx="${round((0.3 + random() * 0.4) * width)}" cy="${round(
        (0.3 + random() * 0.4) * height,
      )}" r="${round(r)}" fill="none" stroke="${accent}" stroke-width="${round(
        Math.min(width, height) * 0.006,
      )}" opacity="0.5"/>`,
    )
  } else {
    const y = (0.3 + random() * 0.4) * height
    shapes.push(
      `<path d="M0 ${round(y)}H${width}" stroke="${accent}" stroke-width="${round(
        Math.min(width, height) * 0.005,
      )}" opacity="0.45"/>`,
    )
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${tone(hue, 12, base)}"/>` +
    `<stop offset="1" stop-color="${tone(hue2, 14, base + step * 2)}"/>` +
    `</linearGradient>` +
    `<filter id="b" x="-30%" y="-30%" width="160%" height="160%">` +
    `<feGaussianBlur stdDeviation="${round(Math.min(width, height) * 0.07)}"/></filter></defs>` +
    `<rect width="${width}" height="${height}" fill="url(#g)"/>` +
    shapes.join('') +
    `</svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
