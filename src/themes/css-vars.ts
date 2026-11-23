/**
 * Design tokens drive styling (SPEC §4.4). A site's Theme becomes CSS custom
 * properties plus a few data attributes on the site root element; swapping the
 * theme restyles the whole site instantly.
 *
 * Tailwind exposes the variables as utilities (`bg-site-primary`,
 * `font-site-heading`, `rounded-site`, …) — see `src/app/globals.css`.
 * Component classes (`site-btn`, `site-card`, `site-h1`, …) live in
 * `src/styles/site.css`.
 *
 * Isomorphic.
 */
import type { CSSProperties } from 'react'
import { dirOf, type Locale } from '@/schemas/fields'
import type { Palette, Theme } from '@/schemas/site'
import { isDark, mix, readableOn } from '@/lib/color'
import { fontStack, getFont, themeFontsFor } from './fonts'

/**
 * Readable text on a brand color (`--site-on-primary` and friends): the
 * palette's own background or text color when either is readable, otherwise
 * plain white or near-black. Palette validation uses the same rule, so what a
 * contrast check measures is what a button actually renders.
 */
export function onColor(brand: string, palette: Pick<Palette, 'background' | 'text'>): string {
  return readableOn(brand, [palette.background, palette.text, '#FFFFFF', '#0B0B0F'])
}

const RADIUS: Record<Theme['radius'], { base: string; sm: string; lg: string; btn: string }> = {
  none: { base: '0px', sm: '0px', lg: '0px', btn: '0px' },
  sm: { base: '6px', sm: '4px', lg: '10px', btn: '6px' },
  md: { base: '12px', sm: '8px', lg: '18px', btn: '10px' },
  lg: { base: '20px', sm: '12px', lg: '32px', btn: '14px' },
  full: { base: '28px', sm: '16px', lg: '44px', btn: '9999px' },
}

/** Vertical rhythm of sections and the base gap between elements. */
const SPACING: Record<Theme['spacing'], { section: string; gap: string }> = {
  compact: { section: 'clamp(2.5rem, 5vw, 4rem)', gap: '1rem' },
  comfortable: { section: 'clamp(3.5rem, 7vw, 6rem)', gap: '1.5rem' },
  airy: { section: 'clamp(4.5rem, 10vw, 9rem)', gap: '2rem' },
}

const MOTION: Record<Theme['motion'], { duration: string; distance: string; ease: string; stagger: string }> =
  {
    none: { duration: '0ms', distance: '0px', ease: 'linear', stagger: '0ms' },
    subtle: { duration: '500ms', distance: '14px', ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: '60ms' },
    expressive: {
      duration: '700ms',
      distance: '28px',
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      stagger: '90ms',
    },
    cinematic: {
      duration: '1100ms',
      distance: '44px',
      ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
      stagger: '140ms',
    },
  }

/**
 * Heading weight and tracking that suit the heading font: single-weight
 * display faces must not be faux-bolded, serifs want lighter weights, and
 * Arabic text must never get negative letter-spacing (it breaks joining).
 */
function headingMetrics(family: string, isArabic: boolean): { weight: string; tracking: string } {
  const font = getFont(family)
  const target = !font || font.category === 'sans' || font.category === 'mono' ? 700 : 600
  let weight = target
  if (font) {
    if ('variable' in font.weights) {
      const [min, max] = font.weights.variable
      weight = Math.min(max, Math.max(min, target))
    } else {
      const available = font.weights.static
      weight = available.reduce(
        (best, w) => (Math.abs(w - target) < Math.abs(best - target) ? w : best),
        available[0],
      )
    }
  }
  const tracking = isArabic
    ? '0'
    : !font || font.category === 'sans'
      ? '-0.025em'
      : font.category === 'mono'
        ? '-0.035em'
        : font.category === 'serif'
          ? '-0.012em'
          : '0'
  return { weight: String(weight), tracking }
}

export type SiteCssVars = CSSProperties & Record<`--${string}`, string>

/** CSS custom properties for a theme in a locale. Spread into `style`. */
export function themeToCssVars(theme: Theme, locale: Locale): SiteCssVars {
  const p = theme.palette
  const fonts = themeFontsFor(theme, locale)
  const radius = RADIUS[theme.radius]
  const spacing = SPACING[theme.spacing]
  const motion = MOTION[theme.motion]
  const isArabic = locale === 'ar'
  const heading = headingMetrics(fonts.heading.family, isArabic)

  return {
    '--site-heading-weight': heading.weight,
    '--site-heading-tracking': heading.tracking,
    '--site-bg': p.background,
    '--site-surface': p.surface,
    '--site-text': p.text,
    '--site-muted': p.mutedText,
    '--site-primary': p.primary,
    '--site-secondary': p.secondary,
    '--site-accent': p.accent,
    '--site-border': p.border,
    // Originals, so `.site-inverted` sections can swap and still reach them.
    '--site-bg-0': p.background,
    '--site-text-0': p.text,
    '--site-surface-0': p.surface,
    '--site-muted-0': p.mutedText,
    '--site-border-0': p.border,
    // Readable text on brand colors.
    '--site-on-primary': onColor(p.primary, p),
    '--site-on-secondary': onColor(p.secondary, p),
    '--site-on-accent': onColor(p.accent, p),
    // Inverted scheme (sections with colorScheme: 'inverted').
    '--site-inv-surface': mix(p.text, p.background, 0.1),
    '--site-inv-muted': mix(p.background, p.text, 0.3),
    '--site-inv-border': mix(p.text, p.background, 0.22),
    '--site-font-heading': fontStack(fonts.heading, isArabic ? theme.fonts.heading : undefined),
    '--site-font-body': fontStack(fonts.body, isArabic ? theme.fonts.body : undefined),
    '--site-radius': radius.base,
    '--site-radius-sm': radius.sm,
    '--site-radius-lg': radius.lg,
    '--site-radius-btn': radius.btn,
    '--site-section-y': spacing.section,
    '--site-gap': spacing.gap,
    '--site-motion-duration': motion.duration,
    '--site-motion-distance': motion.distance,
    '--site-motion-ease': motion.ease,
    '--site-motion-stagger': motion.stagger,
  }
}

export interface SiteRootAttributes {
  lang: Locale
  dir: 'ltr' | 'rtl'
  'data-site': ''
  'data-mode': Theme['mode']
  'data-btn': Theme['buttonStyle']
  'data-card': 'soft' | 'brutal' | 'glass'
  'data-motion': Theme['motion']
  'data-radius': Theme['radius']
  'data-spacing': Theme['spacing']
  'data-bg': NonNullable<Theme['backgroundStyle']>['type']
  'data-template': string
}

/** Data attributes for the site root element (`<div className="site-root" {...attrs}>`). */
export function siteRootAttributes(theme: Theme, locale: Locale): SiteRootAttributes {
  return {
    lang: locale,
    dir: dirOf(locale),
    'data-site': '',
    'data-mode': theme.mode,
    'data-btn': theme.buttonStyle,
    'data-card': theme.buttonStyle === 'brutal' ? 'brutal' : theme.buttonStyle === 'glass' ? 'glass' : 'soft',
    'data-motion': theme.motion,
    'data-radius': theme.radius,
    'data-spacing': theme.spacing,
    'data-bg': theme.backgroundStyle?.type ?? 'solid',
    'data-template': theme.templateId,
  }
}

/** Whether the palette is actually dark, regardless of the declared mode. */
export function paletteIsDark(theme: Pick<Theme, 'palette'>): boolean {
  return isDark(theme.palette.background)
}
