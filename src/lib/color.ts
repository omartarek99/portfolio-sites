/**
 * Color math for themes: contrast checks (WCAG 2.1), readable text colors and
 * simple mixing. Isomorphic and dependency-free.
 */

export interface Rgb {
  r: number
  g: number
  b: number
}

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const int = Number.parseInt(full, 16)
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 }
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase()
}

/** Relative luminance per WCAG 2.1. */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const channel = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** Contrast ratio between two colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

/** AA for normal text is 4.5; for large text (≥ 24px or ≥ 18.66px bold) 3. */
export function meetsAA(foreground: string, background: string, large: boolean = false): boolean {
  return contrastRatio(foreground, background) >= (large ? 3 : 4.5)
}

export function isDark(hex: string): boolean {
  return luminance(hex) < 0.4
}

/**
 * Pick the most readable text color for a background from the candidates
 * (defaults to near-black and white).
 */
export function readableOn(background: string, candidates: string[] = ['#0B0B0F', '#FFFFFF']): string {
  let best = candidates[0]
  let bestRatio = 0
  for (const candidate of candidates) {
    const ratio = contrastRatio(candidate, background)
    if (ratio > bestRatio) {
      best = candidate
      bestRatio = ratio
    }
  }
  return best
}

/** Linear mix in sRGB: `mix('#000', '#fff', 0.25)` is 25% of the way to white. */
export function mix(a: string, b: string, amount: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  const t = Math.min(1, Math.max(0, amount))
  return rgbToHex({
    r: ca.r + (cb.r - ca.r) * t,
    g: ca.g + (cb.g - ca.g) * t,
    b: ca.b + (cb.b - ca.b) * t,
  })
}

export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)
}
