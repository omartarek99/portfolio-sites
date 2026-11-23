/**
 * Generates the bundled placeholder art library in `public/stock/`.
 *
 *   npx tsx scripts/stock-art.ts
 *
 * TEMPLATES.md §0 allows templates to ship either Unsplash photos (with
 * attribution) or bundled placeholder art. These are the bundled set: original,
 * license-free, deterministic SVG compositions, one per subject a template
 * needs (portraits, workspaces, architecture, food, nature, events, art, tech).
 *
 * They are deliberately abstract — never a fake photograph of a person — so
 * example content never implies a real human, and they stay small (a few KB)
 * and crisp at any size.
 *
 * The stockMedia mock searches `public/stock/library.json`, so these also back
 * the media library's "stock photos" tab when there is no Unsplash key.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/* ── Deterministic randomness ────────────────────────────────────────────── */

function makeRandom(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return ((h >>> 0) % 100000) / 100000
  }
}

/* ── Palettes ────────────────────────────────────────────────────────────── */

interface Palette {
  /** Background, lightest to darkest. */
  bg: [string, string]
  shapes: string[]
  ink: string
}

const PALETTES: Record<string, Palette> = {
  sand: { bg: ['#F3EDE4', '#E4D9C8'], shapes: ['#C8A882', '#8C6A4A', '#D9C3A5', '#6E5944'], ink: '#4A3B2E' },
  dusk: { bg: ['#2A2440', '#171427'], shapes: ['#6B5CA5', '#C98BA0', '#3E3669', '#8E7FC4'], ink: '#EDE9F8' },
  sea: { bg: ['#E8F0F2', '#CBDDE2'], shapes: ['#4A8A96', '#2B5B66', '#8FC0C9', '#1F3F47'], ink: '#1F3F47' },
  olive: { bg: ['#EFF1E8', '#DDE1CE'], shapes: ['#6E8257', '#3E4A32', '#A8B78C', '#2A331F'], ink: '#2A331F' },
  clay: { bg: ['#F6EDE9', '#EBD8CF'], shapes: ['#C97B5A', '#8A4A33', '#E0A98D', '#5E3324'], ink: '#4A2A1E' },
  slate: { bg: ['#EDEEF0', '#D8DBE0'], shapes: ['#6B7280', '#394150', '#A3ABB8', '#20262F'], ink: '#20262F' },
  ink: { bg: ['#1A1A1C', '#0C0C0E'], shapes: ['#3A3A40', '#5C5C66', '#26262B', '#7A7A86'], ink: '#F2F2F4' },
  blush: { bg: ['#F8EFF1', '#EEDCE1'], shapes: ['#C98BA0', '#8E5367', '#E3BCC7', '#5E3243'], ink: '#4A2A36' },
}

type PaletteName = keyof typeof PALETTES

/* ── Composition helpers ─────────────────────────────────────────────────── */

const round = (n: number) => Math.round(n * 10) / 10

function gradient(id: string, palette: Palette, angle: number): string {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="${round(Math.cos(angle))}" y2="${round(Math.sin(angle))}"><stop offset="0" stop-color="${palette.bg[0]}"/><stop offset="1" stop-color="${palette.bg[1]}"/></linearGradient>`
}

/** Fine grain so flat fills do not look like a broken image. */
const GRAIN = `<filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/><feColorMatrix values="0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0.26 0"/></filter>`

type Draw = (random: () => number, w: number, h: number, p: Palette) => string

/** A head-and-shoulders silhouette — an honest stand-in for a portrait photo. */
const portrait: Draw = (random, w, h, p) => {
  const cx = w / 2 + (random() - 0.5) * w * 0.08
  const headR = h * 0.17
  const headY = h * 0.36
  const shoulderY = headY + headR * 2.1
  const tone = p.shapes[0]
  const dark = p.shapes[1]
  return [
    `<circle cx="${round(cx + w * 0.22)}" cy="${round(h * 0.24)}" r="${round(h * 0.13)}" fill="${p.shapes[2]}" opacity="0.5"/>`,
    `<rect x="${round(cx - w * 0.42)}" y="${round(h * 0.58)}" width="${round(w * 0.3)}" height="${round(h * 0.42)}" fill="${p.shapes[3]}" opacity="0.28"/>`,
    `<path d="M${round(cx - w * 0.34)} ${h} C ${round(cx - w * 0.34)} ${round(shoulderY)}, ${round(cx - headR * 1.5)} ${round(shoulderY - h * 0.03)}, ${round(cx)} ${round(shoulderY - h * 0.03)} C ${round(cx + headR * 1.5)} ${round(shoulderY - h * 0.03)}, ${round(cx + w * 0.34)} ${round(shoulderY)}, ${round(cx + w * 0.34)} ${h} Z" fill="${dark}"/>`,
    `<circle cx="${round(cx)}" cy="${round(headY)}" r="${round(headR)}" fill="${dark}"/>`,
    `<circle cx="${round(cx - headR * 0.3)}" cy="${round(headY - headR * 0.25)}" r="${round(headR * 0.72)}" fill="${tone}" opacity="0.45"/>`,
  ].join('')
}

/** Desk from above: rectangles, a mug, a notebook. */
const workspace: Draw = (random, w, h, p) => {
  const parts: string[] = []
  parts.push(`<rect x="${round(w * 0.12)}" y="${round(h * 0.22)}" width="${round(w * 0.5)}" height="${round(h * 0.4)}" rx="${round(h * 0.02)}" fill="${p.shapes[1]}"/>`)
  parts.push(`<rect x="${round(w * 0.16)}" y="${round(h * 0.26)}" width="${round(w * 0.42)}" height="${round(h * 0.26)}" fill="${p.shapes[2]}" opacity="0.7"/>`)
  parts.push(`<rect x="${round(w * 0.2)}" y="${round(h * 0.68)}" width="${round(w * 0.34)}" height="${round(h * 0.16)}" rx="${round(h * 0.02)}" fill="${p.shapes[0]}"/>`)
  parts.push(`<circle cx="${round(w * 0.76)}" cy="${round(h * 0.42)}" r="${round(h * 0.09)}" fill="${p.shapes[3]}"/>`)
  parts.push(`<circle cx="${round(w * 0.76)}" cy="${round(h * 0.42)}" r="${round(h * 0.055)}" fill="${p.bg[0]}" opacity="0.8"/>`)
  for (let i = 0; i < 4; i++) {
    parts.push(`<rect x="${round(w * 0.66 + random() * w * 0.2)}" y="${round(h * 0.62 + i * h * 0.07)}" width="${round(w * 0.16)}" height="${round(h * 0.015)}" fill="${p.shapes[1]}" opacity="0.6"/>`)
  }
  return parts.join('')
}

/** Skyline: towers with window grids. */
const architecture: Draw = (random, w, h, p) => {
  const parts: string[] = []
  let x = 0
  let i = 0
  while (x < w) {
    const bw = w * (0.08 + random() * 0.1)
    const bh = h * (0.3 + random() * 0.55)
    const fill = p.shapes[i % p.shapes.length]
    parts.push(`<rect x="${round(x)}" y="${round(h - bh)}" width="${round(bw)}" height="${round(bh)}" fill="${fill}" opacity="${0.55 + (i % 3) * 0.15}"/>`)
    const rows = Math.floor(bh / (h * 0.09))
    for (let r = 1; r < rows; r++) {
      if (random() > 0.45) {
        parts.push(`<rect x="${round(x + bw * 0.25)}" y="${round(h - bh + r * h * 0.09)}" width="${round(bw * 0.5)}" height="${round(h * 0.022)}" fill="${p.bg[0]}" opacity="0.45"/>`)
      }
    }
    x += bw + w * 0.012
    i++
  }
  parts.push(`<circle cx="${round(w * 0.78)}" cy="${round(h * 0.2)}" r="${round(h * 0.1)}" fill="${p.shapes[0]}" opacity="0.5"/>`)
  return parts.join('')
}

/** Layered hills with a sun. */
const nature: Draw = (random, w, h, p) => {
  const parts: string[] = [`<circle cx="${round(w * (0.2 + random() * 0.6))}" cy="${round(h * 0.26)}" r="${round(h * 0.12)}" fill="${p.shapes[0]}" opacity="0.65"/>`]
  for (let i = 0; i < 3; i++) {
    const base = h * (0.55 + i * 0.16)
    const peak = base - h * (0.18 + random() * 0.14)
    const cx = w * (0.2 + i * 0.3 + random() * 0.1)
    parts.push(`<path d="M${-w * 0.1} ${h} L ${round(cx)} ${round(peak)} L ${round(w * 1.1)} ${h} Z" fill="${p.shapes[(i + 1) % p.shapes.length]}" opacity="${0.9 - i * 0.18}"/>`)
    void base
  }
  return parts.join('')
}

/** Plate from above with a few ingredients. */
const food: Draw = (random, w, h, p) => {
  const cx = w / 2
  const cy = h / 2
  const r = Math.min(w, h) * 0.34
  const parts = [
    `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r * 1.18)}" fill="${p.shapes[2]}" opacity="0.45"/>`,
    `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" fill="${p.bg[0]}"/>`,
  ]
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + random()
    const dist = r * (0.2 + random() * 0.5)
    parts.push(
      `<circle cx="${round(cx + Math.cos(angle) * dist)}" cy="${round(cy + Math.sin(angle) * dist)}" r="${round(r * (0.09 + random() * 0.12))}" fill="${p.shapes[i % p.shapes.length]}" opacity="0.85"/>`,
    )
  }
  return parts.join('')
}

/** Confetti and arcs — events and weddings. */
const celebration: Draw = (random, w, h, p) => {
  const parts: string[] = []
  for (let i = 0; i < 3; i++) {
    parts.push(
      `<path d="M${round(-w * 0.1)} ${round(h * (0.3 + i * 0.18))} Q ${round(w * 0.5)} ${round(h * (0.05 + i * 0.2))} ${round(w * 1.1)} ${round(h * (0.35 + i * 0.16))}" fill="none" stroke="${p.shapes[i % p.shapes.length]}" stroke-width="${round(h * 0.012)}" opacity="0.55"/>`,
    )
  }
  for (let i = 0; i < 22; i++) {
    const x = random() * w
    const y = random() * h
    const s = h * (0.012 + random() * 0.028)
    const fill = p.shapes[i % p.shapes.length]
    parts.push(
      random() > 0.5
        ? `<circle cx="${round(x)}" cy="${round(y)}" r="${round(s)}" fill="${fill}" opacity="0.8"/>`
        : `<rect x="${round(x)}" y="${round(y)}" width="${round(s * 1.6)}" height="${round(s * 0.7)}" transform="rotate(${round(random() * 90)} ${round(x)} ${round(y)})" fill="${fill}" opacity="0.8"/>`,
    )
  }
  return parts.join('')
}

/** Overlapping bauhaus-ish shapes — artworks and covers. */
const abstract: Draw = (random, w, h, p) => {
  const parts: string[] = []
  for (let i = 0; i < 5; i++) {
    const fill = p.shapes[i % p.shapes.length]
    const kind = Math.floor(random() * 3)
    const x = random() * w * 0.7
    const y = random() * h * 0.7
    const s = Math.min(w, h) * (0.2 + random() * 0.38)
    if (kind === 0) parts.push(`<circle cx="${round(x + s / 2)}" cy="${round(y + s / 2)}" r="${round(s / 2)}" fill="${fill}" opacity="0.72"/>`)
    else if (kind === 1) parts.push(`<rect x="${round(x)}" y="${round(y)}" width="${round(s)}" height="${round(s * (0.5 + random()))}" transform="rotate(${round((random() - 0.5) * 40)} ${round(x + s / 2)} ${round(y + s / 2)})" fill="${fill}" opacity="0.72"/>`)
    else parts.push(`<path d="M${round(x)} ${round(y + s)} L ${round(x + s / 2)} ${round(y)} L ${round(x + s)} ${round(y + s)} Z" fill="${fill}" opacity="0.72"/>`)
  }
  return parts.join('')
}

/** Browser and app windows — product and tech shots. */
const tech: Draw = (random, w, h, p) => {
  const parts: string[] = []
  for (let i = 0; i < 2; i++) {
    const ww = w * 0.52
    const wh = h * 0.46
    const x = w * (0.08 + i * 0.3)
    const y = h * (0.16 + i * 0.26)
    parts.push(`<rect x="${round(x)}" y="${round(y)}" width="${round(ww)}" height="${round(wh)}" rx="${round(h * 0.025)}" fill="${p.bg[0]}" opacity="0.96"/>`)
    parts.push(`<rect x="${round(x)}" y="${round(y)}" width="${round(ww)}" height="${round(h * 0.055)}" rx="${round(h * 0.025)}" fill="${p.shapes[1]}" opacity="0.9"/>`)
    for (let d = 0; d < 3; d++) {
      parts.push(`<circle cx="${round(x + ww * 0.05 + d * ww * 0.045)}" cy="${round(y + h * 0.028)}" r="${round(h * 0.009)}" fill="${p.bg[0]}" opacity="0.8"/>`)
    }
    parts.push(`<rect x="${round(x + ww * 0.06)}" y="${round(y + h * 0.1)}" width="${round(ww * 0.36)}" height="${round(wh * 0.52)}" fill="${p.shapes[0]}" opacity="0.6"/>`)
    for (let line = 0; line < 4; line++) {
      parts.push(`<rect x="${round(x + ww * 0.48)}" y="${round(y + h * 0.1 + line * h * 0.055)}" width="${round(ww * (0.2 + random() * 0.26))}" height="${round(h * 0.018)}" fill="${p.shapes[2]}" opacity="0.75"/>`)
    }
  }
  return parts.join('')
}

const DRAWERS: Record<string, Draw> = { portrait, workspace, architecture, nature, food, celebration, abstract, tech }

/* ── The library ─────────────────────────────────────────────────────────── */

interface Piece {
  id: string
  kind: keyof typeof DRAWERS
  palette: PaletteName
  /** 'portrait' 3:4 · 'landscape' 3:2 · 'square' 1:1 · 'wide' 16:9 */
  shape: 'portrait' | 'landscape' | 'square' | 'wide'
  description: string
  tags: string[]
}

const PIECES: Piece[] = [
  { id: 'portrait-sand', kind: 'portrait', palette: 'sand', shape: 'portrait', description: 'Portrait silhouette on warm sand', tags: ['portrait', 'person', 'avatar', 'profile', 'about', 'headshot', 'team'] },
  { id: 'portrait-sea', kind: 'portrait', palette: 'sea', shape: 'portrait', description: 'Portrait silhouette on sea green', tags: ['portrait', 'person', 'avatar', 'profile', 'about', 'headshot', 'team'] },
  { id: 'portrait-dusk', kind: 'portrait', palette: 'dusk', shape: 'portrait', description: 'Portrait silhouette at dusk', tags: ['portrait', 'person', 'avatar', 'profile', 'about', 'headshot', 'dark'] },
  { id: 'portrait-clay', kind: 'portrait', palette: 'clay', shape: 'portrait', description: 'Portrait silhouette on clay', tags: ['portrait', 'person', 'avatar', 'profile', 'about', 'headshot'] },
  { id: 'portrait-slate', kind: 'portrait', palette: 'slate', shape: 'portrait', description: 'Portrait silhouette on slate', tags: ['portrait', 'person', 'avatar', 'profile', 'about', 'headshot', 'professional'] },
  { id: 'portrait-blush', kind: 'portrait', palette: 'blush', shape: 'portrait', description: 'Portrait silhouette on blush', tags: ['portrait', 'person', 'avatar', 'profile', 'about', 'headshot'] },
  { id: 'portrait-ink', kind: 'portrait', palette: 'ink', shape: 'portrait', description: 'Portrait silhouette in low light', tags: ['portrait', 'person', 'avatar', 'profile', 'dark', 'moody'] },
  { id: 'portrait-olive', kind: 'portrait', palette: 'olive', shape: 'portrait', description: 'Portrait silhouette on olive', tags: ['portrait', 'person', 'avatar', 'profile', 'about'] },

  { id: 'workspace-sand', kind: 'workspace', palette: 'sand', shape: 'landscape', description: 'Desk from above with notebook and mug', tags: ['workspace', 'desk', 'work', 'office', 'studio', 'writing', 'flatlay'] },
  { id: 'workspace-slate', kind: 'workspace', palette: 'slate', shape: 'landscape', description: 'Workspace from above in grey tones', tags: ['workspace', 'desk', 'work', 'office', 'business', 'flatlay'] },
  { id: 'workspace-dusk', kind: 'workspace', palette: 'dusk', shape: 'landscape', description: 'Evening desk with screen glow', tags: ['workspace', 'desk', 'work', 'night', 'dark', 'developer'] },

  { id: 'city-slate', kind: 'architecture', palette: 'slate', shape: 'landscape', description: 'City skyline in grey', tags: ['city', 'architecture', 'building', 'skyline', 'urban'] },
  { id: 'city-dusk', kind: 'architecture', palette: 'dusk', shape: 'wide', description: 'Skyline at dusk', tags: ['city', 'architecture', 'skyline', 'night', 'dark', 'urban'] },
  { id: 'city-sand', kind: 'architecture', palette: 'sand', shape: 'landscape', description: 'Desert city towers in daylight', tags: ['city', 'architecture', 'building', 'desert', 'doha', 'gulf'] },
  { id: 'interior-clay', kind: 'architecture', palette: 'clay', shape: 'portrait', description: 'Warm interior forms', tags: ['interior', 'architecture', 'design', 'room', 'space'] },

  { id: 'nature-olive', kind: 'nature', palette: 'olive', shape: 'landscape', description: 'Layered green hills', tags: ['nature', 'landscape', 'hills', 'outdoor', 'calm', 'green'] },
  { id: 'nature-sand', kind: 'nature', palette: 'sand', shape: 'wide', description: 'Desert dunes at midday', tags: ['nature', 'landscape', 'desert', 'dunes', 'gulf', 'warm'] },
  { id: 'nature-sea', kind: 'nature', palette: 'sea', shape: 'landscape', description: 'Coast and water', tags: ['nature', 'landscape', 'sea', 'coast', 'water', 'calm'] },

  { id: 'food-clay', kind: 'food', palette: 'clay', shape: 'square', description: 'Plated dish from above', tags: ['food', 'plate', 'cooking', 'recipe', 'restaurant', 'kitchen'] },
  { id: 'food-olive', kind: 'food', palette: 'olive', shape: 'square', description: 'Fresh plate from above', tags: ['food', 'plate', 'healthy', 'recipe', 'cooking'] },

  { id: 'event-blush', kind: 'celebration', palette: 'blush', shape: 'landscape', description: 'Celebration confetti and arcs', tags: ['event', 'wedding', 'celebration', 'party', 'confetti', 'joy'] },
  { id: 'event-dusk', kind: 'celebration', palette: 'dusk', shape: 'wide', description: 'Evening celebration lights', tags: ['event', 'party', 'night', 'celebration', 'gala', 'dark'] },
  { id: 'event-sand', kind: 'celebration', palette: 'sand', shape: 'portrait', description: 'Warm celebration shapes', tags: ['event', 'wedding', 'celebration', 'warm'] },

  { id: 'art-blush', kind: 'abstract', palette: 'blush', shape: 'square', description: 'Abstract composition in rose', tags: ['art', 'abstract', 'shapes', 'artwork', 'painting', 'creative'] },
  { id: 'art-ink', kind: 'abstract', palette: 'ink', shape: 'portrait', description: 'Abstract composition in ink', tags: ['art', 'abstract', 'ink', 'artwork', 'dark', 'creative'] },
  { id: 'art-sea', kind: 'abstract', palette: 'sea', shape: 'landscape', description: 'Abstract composition in teal', tags: ['art', 'abstract', 'shapes', 'artwork', 'creative', 'design'] },
  { id: 'art-sand', kind: 'abstract', palette: 'sand', shape: 'square', description: 'Abstract composition in sand', tags: ['art', 'abstract', 'shapes', 'artwork', 'creative', 'calligraphy'] },

  { id: 'app-slate', kind: 'tech', palette: 'slate', shape: 'landscape', description: 'App windows and interface panels', tags: ['tech', 'app', 'product', 'interface', 'ui', 'software', 'project'] },
  { id: 'app-dusk', kind: 'tech', palette: 'dusk', shape: 'landscape', description: 'Dark interface panels', tags: ['tech', 'app', 'product', 'interface', 'ui', 'dark', 'developer'] },
  { id: 'app-sea', kind: 'tech', palette: 'sea', shape: 'wide', description: 'Dashboard panels in teal', tags: ['tech', 'app', 'dashboard', 'data', 'interface', 'product'] },
]

const SIZES: Record<Piece['shape'], { w: number; h: number }> = {
  portrait: { w: 1200, h: 1600 },
  landscape: { w: 1600, h: 1067 },
  square: { w: 1400, h: 1400 },
  wide: { w: 1920, h: 1080 },
}

function renderPiece(piece: Piece): string {
  const { w, h } = SIZES[piece.shape]
  const palette = PALETTES[piece.palette]
  const random = makeRandom(piece.id)
  const angle = random() * Math.PI
  const body = DRAWERS[piece.kind](random, w, h, palette)
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${piece.description}">`,
    `<defs>${gradient('bg', palette, angle)}${GRAIN}</defs>`,
    `<rect width="${w}" height="${h}" fill="url(#bg)"/>`,
    body,
    `<rect width="${w}" height="${h}" filter="url(#g)" opacity="0.5" style="mix-blend-mode:multiply"/>`,
    '</svg>',
  ].join('')
}

function main() {
  const outDir = path.resolve('public/stock')
  mkdirSync(outDir, { recursive: true })

  const library = PIECES.map((piece) => {
    const svg = renderPiece(piece)
    writeFileSync(path.join(outDir, `${piece.id}.svg`), svg, 'utf8')
    const { w, h } = SIZES[piece.shape]
    const url = `/stock/${piece.id}.svg`
    return {
      id: piece.id,
      description: piece.description,
      width: w,
      height: h,
      color: PALETTES[piece.palette].bg[0],
      urls: { thumb: url, small: url, regular: url, full: url },
      attribution: { name: 'Showcase', url: '', source: 'bundled' as const },
      tags: piece.tags,
    }
  })

  writeFileSync(path.join(outDir, 'library.json'), JSON.stringify(library, null, 2) + '\n', 'utf8')
  console.log(`Wrote ${library.length} pieces + library.json to ${outDir}`)
}

main()
