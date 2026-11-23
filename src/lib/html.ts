/**
 * Allow-list HTML sanitizers for user-authored text (SPEC §15: sanitize rich
 * text). Isomorphic, synchronous and dependency-free so the SAME function
 * runs at render time on the server and in the editor — content is safe by
 * construction no matter what is stored.
 *
 * - `sanitizeInlineHtml`: inline marks only (bold, italic, link, color, size,
 *   highlight, line break). Used for every Localized text field.
 * - `sanitizeRichHtml`: adds block elements (paragraphs, headings, lists,
 *   quotes, images, code). Used for rich-text sections.
 *
 * Anything not on the list is dropped: unknown tags lose their markup (text is
 * kept), unknown attributes are removed, and URLs must pass `safeUrl`.
 */
import { safeUrl } from './links'

const INLINE_TAGS = new Set(['b', 'strong', 'i', 'em', 'u', 's', 'a', 'span', 'mark', 'br', 'sub', 'sup', 'code'])
const BLOCK_TAGS = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'hr', 'pre', 'img', 'figure', 'figcaption'])
const VOID_TAGS = new Set(['br', 'hr', 'img'])
/** Elements whose entire content must go, not just the tags. */
const DROP_WITH_CONTENT = /<(script|style|iframe|object|embed|noscript|template|svg|math)\b[\s\S]*?<\/\1\s*>/gi

const TAG = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g
const ATTR = /([a-zA-Z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Text-size steps offered by the inline editor (SPEC §8.3). */
const SIZES = new Set(['sm', 'lg', 'xl'])

const COLOR = /^(#[0-9a-fA-F]{3,8}|var\(--site-(?:primary|secondary|accent|text|muted)\))$/
const ALIGN = /^(start|end|left|right|center|justify)$/

function parseAttrs(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const match of raw.matchAll(ATTR)) {
    out[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? ''
  }
  return out
}

function styleValue(style: string | undefined, property: string): string | undefined {
  if (!style) return undefined
  for (const declaration of style.split(';')) {
    const index = declaration.indexOf(':')
    if (index === -1) continue
    if (declaration.slice(0, index).trim().toLowerCase() === property) return declaration.slice(index + 1).trim()
  }
  return undefined
}

function rebuildTag(name: string, rawAttrs: string, closing: boolean): string {
  if (closing) return VOID_TAGS.has(name) ? '' : `</${name}>`
  const attrs = parseAttrs(rawAttrs)
  const kept: string[] = []

  if (name === 'a') {
    const href = safeUrl(attrs.href)
    if (href) {
      kept.push(`href="${escapeAttr(href)}"`)
      if (/^https?:\/\//i.test(href)) kept.push('target="_blank"', 'rel="noopener noreferrer"')
    }
  } else if (name === 'span' || name === 'mark') {
    const color = styleValue(attrs.style, 'color')
    if (color && COLOR.test(color)) kept.push(`style="color:${color}"`)
    if (attrs['data-size'] && SIZES.has(attrs['data-size'])) kept.push(`data-size="${attrs['data-size']}"`)
  } else if (name === 'p' || name === 'h2' || name === 'h3' || name === 'h4') {
    const align = styleValue(attrs.style, 'text-align')
    if (align && ALIGN.test(align)) kept.push(`style="text-align:${align}"`)
  } else if (name === 'img') {
    const src = safeUrl(attrs.src)
    if (!src || src.startsWith('mailto:') || src.startsWith('tel:')) return ''
    kept.push(`src="${escapeAttr(src)}"`, `alt="${escapeAttr(attrs.alt ?? '')}"`, 'loading="lazy"', 'decoding="async"')
  } else if (name === 'ol' && /^\d+$/.test(attrs.start ?? '')) {
    kept.push(`start="${attrs.start}"`)
  }

  return `<${name}${kept.length ? ' ' + kept.join(' ') : ''}>`
}

function sanitize(html: string, allowed: Set<string>): string {
  return html
    .replace(DROP_WITH_CONTENT, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(TAG, (full: string, rawName: string, rawAttrs: string) => {
      const name = rawName.toLowerCase()
      if (!allowed.has(name)) return ''
      return rebuildTag(name, rawAttrs, full.startsWith('</'))
    })
    // A lone "<" that still starts something tag-like is neutralised.
    .replace(/<(?![a-zA-Z/])/g, '&lt;')
}

/** Inline marks only. Safe for `dangerouslySetInnerHTML` inside headings, paragraphs and buttons. */
export function sanitizeInlineHtml(html: string): string {
  return sanitize(html, INLINE_TAGS)
}

const RICH_TAGS = new Set([...INLINE_TAGS, ...BLOCK_TAGS])

/** Inline marks plus paragraphs, headings (h2–h4), lists, quotes, images, code. */
export function sanitizeRichHtml(html: string): string {
  return sanitize(html, RICH_TAGS)
}

/** True when a string needs HTML rendering rather than a plain text node. */
export function hasMarkup(text: string): boolean {
  return /[<&]/.test(text)
}

/** Escape plain text for safe insertion into HTML. */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** Plain text with line breaks → paragraphs (for AI output and imported CV text). */
export function textToHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('')
}
