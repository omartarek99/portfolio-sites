/**
 * Theme- and section-level decorative backgrounds: gradients, patterns, noise
 * and images. Everything is theme-colored through CSS variables.
 * Isomorphic, no hooks.
 */
import type { CSSProperties, ReactNode } from 'react'
import type { Theme } from '@/schemas/site'
import { imageUrl } from '@/lib/media-url'

/** Only real CSS gradient functions with harmless characters are allowed inline. */
const SAFE_GRADIENT = /^(?:repeating-)?(?:linear|radial|conic)-gradient\([#%,.\w\s()/-]+\)$/i

export function isSafeGradient(value: string): boolean {
  return SAFE_GRADIENT.test(value.trim())
}

/** Named gradients built from theme tokens. Use the id as `value`. */
export const GRADIENT_PRESETS: Record<string, string> = {
  'brand-diagonal': 'linear-gradient(135deg, var(--site-primary), var(--site-secondary))',
  'brand-soft':
    'linear-gradient(160deg, color-mix(in oklab, var(--site-primary) 16%, var(--site-bg)), var(--site-bg) 55%, color-mix(in oklab, var(--site-accent) 14%, var(--site-bg)))',
  'brand-tri': 'linear-gradient(120deg, var(--site-primary), var(--site-secondary) 50%, var(--site-accent))',
  'surface-fade': 'linear-gradient(180deg, var(--site-surface), var(--site-bg))',
  spotlight:
    'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklab, var(--site-primary) 28%, transparent), transparent 70%)',
  /** Creator Hub: brand gradient that slowly pans (see `PANNING_GRADIENT`). */
  'gradient-pan':
    'linear-gradient(110deg, color-mix(in oklab, var(--site-primary) 22%, var(--site-bg)), color-mix(in oklab, var(--site-secondary) 20%, var(--site-bg)) 35%, color-mix(in oklab, var(--site-accent) 18%, var(--site-bg)) 65%, color-mix(in oklab, var(--site-primary) 22%, var(--site-bg)))',
  aurora:
    'radial-gradient(ellipse 60% 50% at 20% 10%, color-mix(in oklab, var(--site-primary) 40%, transparent), transparent 70%), radial-gradient(ellipse 50% 45% at 85% 20%, color-mix(in oklab, var(--site-secondary) 32%, transparent), transparent 70%), radial-gradient(ellipse 55% 50% at 55% 95%, color-mix(in oklab, var(--site-accent) 26%, transparent), transparent 70%)',
}

/** Resolve a gradient `value` (preset id or raw CSS) to a safe background-image. */
export function resolveGradient(value: string | undefined): string | undefined {
  if (!value) return undefined
  if (GRADIENT_PRESETS[value]) return GRADIENT_PRESETS[value]
  return isSafeGradient(value) ? value.trim() : undefined
}

/** Named CSS patterns built from theme tokens. Use the id as `value`. */
export const PATTERN_PRESETS: Record<string, CSSProperties> = {
  dots: {
    backgroundImage:
      'radial-gradient(color-mix(in oklab, var(--site-text) 16%, transparent) 1px, transparent 1.5px)',
    backgroundSize: '22px 22px',
  },
  grid: {
    backgroundImage:
      'linear-gradient(color-mix(in oklab, var(--site-text) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--site-text) 9%, transparent) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
  },
  blueprint: {
    backgroundImage:
      'linear-gradient(color-mix(in oklab, var(--site-text) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--site-text) 12%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in oklab, var(--site-text) 5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--site-text) 5%, transparent) 1px, transparent 1px)',
    backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
  },
  diagonal: {
    backgroundImage:
      'repeating-linear-gradient(135deg, color-mix(in oklab, var(--site-text) 7%, transparent) 0 1px, transparent 1px 14px)',
  },
  /** Atelier: laid paper — soft fibres plus a warm wash. Combined with noise. */
  paper: {
    backgroundImage:
      'repeating-linear-gradient(90deg, color-mix(in oklab, var(--site-text) 3%, transparent) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, color-mix(in oklab, var(--site-text) 3%, transparent) 0 1px, transparent 1px 4px), radial-gradient(ellipse 120% 80% at 50% 0%, color-mix(in oklab, var(--site-surface) 70%, transparent), transparent 70%)',
    backgroundSize: '3px 3px, 4px 4px, 100% 100%',
  },
}

/**
 * A pattern layer. CSS patterns come from PATTERN_PRESETS; SVG patterns
 * (e.g. the Islamic geometric star used by Majlis) are drawn inline with
 * `currentColor` so they follow the theme.
 */
export function PatternLayer({ id, className }: { id: string | undefined; className?: string }): ReactNode {
  if (id === 'islamic-star') return <IslamicStarPattern className={className} />
  if (id === 'blueprint') return <BlueprintPattern className={className} />
  const style = id ? PATTERN_PRESETS[id] : undefined
  if (!style) return null
  // Paper is a texture: the noise layer on top is what makes it read as paper.
  const base = id === 'paper' ? 'absolute inset-0 site-noise' : 'absolute inset-0'
  return <div aria-hidden="true" className={className ?? base} style={style} />
}

/** The octagram (khatam) tile both the pattern and the divider are drawn from. */
const KHATAM_OCTAGON = '80.3,68.4 68.4,80.3 51.6,80.3 39.7,68.4 39.7,51.6 51.6,39.7 68.4,39.7 80.3,51.6'

function IslamicStarPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className ?? 'absolute inset-0 size-full'}
      style={{ color: 'color-mix(in oklab, var(--site-accent) 38%, transparent)' }}
    >
      <defs>
        <pattern id="sc-islamic-star" width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round">
            {/* Eight-pointed star: two squares, one rotated 45°. */}
            <rect x="30" y="30" width="60" height="60" />
            <rect x="30" y="30" width="60" height="60" transform="rotate(45 60 60)" />
            <polygon points={KHATAM_OCTAGON} />
            {/* Tips reaching the tile edges, so neighbouring tiles interlock. */}
            <path d="M60 17.6V0M60 102.4V120M17.6 60H0M102.4 60H120" />
            {/* Quarter stars in the corners. */}
            <path d="M0 18L18 0M102 0l18 18M0 102l18 18M102 120l18-18" />
            <path d="M30 30L12 12M90 30l18-18M30 90l-18 18M90 90l18 18" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sc-islamic-star)" />
    </svg>
  )
}

/**
 * Majlis section divider: one thin band of the same geometry. Place it between
 * sections — it is decorative, so it carries no semantics.
 */
export function IslamicDivider({ className }: { className?: string }): ReactNode {
  return (
    <svg
      aria-hidden="true"
      className={className ?? 'block h-7 w-full'}
      preserveAspectRatio="none"
      viewBox="0 0 240 28"
      style={{ color: 'color-mix(in oklab, var(--site-accent) 55%, transparent)' }}
    >
      <defs>
        <pattern id="sc-islamic-band" width="40" height="28" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
            <rect x="8" y="4" width="20" height="20" />
            <rect x="8" y="4" width="20" height="20" transform="rotate(45 18 14)" />
            <path d="M0 14h4M36 14h4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sc-islamic-band)" />
      <path d="M0 0.5H240M0 27.5H240" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

/**
 * Majlis hero frame: a hairline rule with geometric corners. Absolutely
 * positioned, so the hero renders it inside a `relative` container.
 */
export function PatternFrame({ className }: { className?: string }): ReactNode {
  const hairline = 'color-mix(in oklab, var(--site-accent) 70%, transparent)'
  const corner: CSSProperties = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    border: `1px solid ${hairline}`,
    transform: 'rotate(45deg)',
    background: 'var(--site-bg)',
  }
  return (
    <div
      aria-hidden="true"
      className={className ?? 'pointer-events-none absolute inset-0'}
      style={{ border: `1px solid ${hairline}` }}
    >
      <div className="absolute inset-[5px]" style={{ border: `1px dotted ${hairline}`, opacity: 0.6 }} />
      <div style={{ ...corner, insetBlockStart: '-5px', insetInlineStart: '-5px' }} />
      <div style={{ ...corner, insetBlockStart: '-5px', insetInlineEnd: '-5px' }} />
      <div style={{ ...corner, insetBlockEnd: '-5px', insetInlineStart: '-5px' }} />
      <div style={{ ...corner, insetBlockEnd: '-5px', insetInlineEnd: '-5px' }} />
    </div>
  )
}

/**
 * Blueprint: the CSS grid plus small coordinate tick labels, like a technical
 * drawing. Labels are positioned in the SVG's own user units and repeat every
 * 120px to match the grid.
 */
function BlueprintPattern({ className }: { className?: string }) {
  const ticks = [120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200]
  return (
    <div aria-hidden="true" className={className ?? 'absolute inset-0'} style={PATTERN_PRESETS.blueprint}>
      <svg
        className="absolute inset-0 size-full overflow-visible"
        style={{ color: 'color-mix(in oklab, var(--site-text) 38%, transparent)' }}
        fontSize="8"
        fontFamily="var(--site-font-body)"
      >
        {ticks.map((tick) => (
          <text key={`x-${tick}`} x={tick + 4} y="12" fill="currentColor">
            {tick}
          </text>
        ))}
        {ticks.map((tick) => (
          <text key={`y-${tick}`} x="4" y={tick + 12} fill="currentColor">
            {tick}
          </text>
        ))}
      </svg>
    </div>
  )
}

/**
 * Aurora: three slow blurred blobs in the brand colors. The `site-aurora-blob`
 * class in `src/styles/site.css` carries the animation and stops it under
 * `prefers-reduced-motion` and `data-motion="none"`.
 */
export function AuroraBlobs({ className }: { className?: string }): ReactNode {
  const blobs: { color: string; style: CSSProperties }[] = [
    {
      color: 'var(--site-primary)',
      style: { insetBlockStart: '-10%', insetInlineStart: '-5%', width: '46%', aspectRatio: '1' },
    },
    {
      color: 'var(--site-secondary)',
      style: {
        insetBlockStart: '5%',
        insetInlineEnd: '-8%',
        width: '38%',
        aspectRatio: '1',
        animationDelay: '-7s',
      },
    },
    {
      color: 'var(--site-accent)',
      style: {
        insetBlockEnd: '-15%',
        insetInlineStart: '25%',
        width: '42%',
        aspectRatio: '1',
        animationDelay: '-14s',
      },
    },
  ]
  return (
    <div aria-hidden="true" className={className ?? 'pointer-events-none absolute inset-0 overflow-hidden'}>
      {blobs.map((blob) => (
        <div
          key={blob.color}
          className="site-aurora-blob"
          style={{ background: blob.color, ...blob.style }}
        />
      ))}
    </div>
  )
}

/**
 * The one gradient that moves. Its keyframes ship with this component (not in
 * `site.css`) so the layer is self-contained; React hoists and de-duplicates
 * the `<style>` on the server and in the editor alike.
 */
export const PANNING_GRADIENT = 'gradient-pan'

const GRADIENT_PAN_CSS = `
.sc-gradient-pan {
  background-size: 220% 220%;
  animation: sc-gradient-pan 26s ease-in-out infinite alternate;
}
@keyframes sc-gradient-pan {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
.site-root[data-motion='none'] .sc-gradient-pan,
.site-root[data-static] .sc-gradient-pan { animation: none; }
@media (prefers-reduced-motion: reduce) {
  .sc-gradient-pan { animation: none; }
}
`

/** The site-wide decorative background from `theme.backgroundStyle`. Rendered once by SiteRenderer. */
export function SiteBackground({ theme }: { theme: Theme }): ReactNode {
  const background = theme.backgroundStyle
  if (!background || background.type === 'solid') return null

  if (background.type === 'gradient') {
    const image = resolveGradient(background.value)
    if (!image) return null
    if (background.value === PANNING_GRADIENT) {
      return (
        <>
          <style href="sc-gradient-pan" precedence="low">
            {GRADIENT_PAN_CSS}
          </style>
          <div
            aria-hidden="true"
            className="site-bg-layer sc-gradient-pan"
            style={{ backgroundImage: image }}
          />
        </>
      )
    }
    return <div aria-hidden="true" className="site-bg-layer" style={{ backgroundImage: image }} />
  }
  if (background.type === 'pattern') {
    return (
      <div aria-hidden="true" className="site-bg-layer">
        <PatternLayer id={background.value} />
      </div>
    )
  }
  if (background.type === 'noise') {
    const opacity = Number(background.value)
    return (
      <div
        aria-hidden="true"
        className="site-bg-layer site-noise"
        style={
          Number.isFinite(opacity) && opacity > 0 && opacity <= 1
            ? ({ '--site-noise-opacity': String(opacity) } as CSSProperties)
            : undefined
        }
      />
    )
  }
  if (background.type === 'image' && background.value) {
    return (
      <div aria-hidden="true" className="site-bg-layer">
        <img
          src={imageUrl(background.value, { width: 1920, quality: 60 })}
          alt=""
          className="size-full object-cover opacity-30"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }
  return null
}
