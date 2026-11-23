import type { CSSProperties, ReactNode } from 'react'
import type { Device, Section } from '@/schemas/site'
import { isHexColor, mix, readableOn } from '@/lib/color'
import { imageUrl } from '@/lib/media-url'
import { cn } from '@/lib/utils'
import { PatternLayer, resolveGradient } from '@/themes/backgrounds'
import { BlockBoundary } from './_shared/BlockBoundary'
import { blockRegistry } from './registry'
import type { BlockContext, SiteRuntime, VariantDef } from './types'

/** Breakpoints: mobile < 768px (md) · tablet 768–1023px · desktop ≥ 1024px (lg). */
const HIDE: Record<Device, string> = {
  mobile: 'max-md:hidden',
  tablet: 'md:max-lg:hidden',
  desktop: 'lg:hidden',
}
/** In the editor hidden sections stay visible but dimmed, so they can still be selected. */
const HIDE_IN_EDITOR: Record<Device, string> = {
  mobile: 'max-md:opacity-35',
  tablet: 'md:max-lg:opacity-35',
  desktop: 'lg:opacity-35',
}

type Vars = CSSProperties & Record<`--${string}`, string>

interface Background {
  data?: string
  style?: Vars
  layer?: ReactNode
}

function resolveBackground(section: Section, site: SiteRuntime): Background {
  const background = section.style.background
  if (!background || background.type === 'none') return {}
  const { type, value } = background
  const palette = site.theme.palette

  if (type === 'surface' || type === 'primary' || type === 'secondary' || type === 'accent') {
    return { data: type }
  }
  if (type === 'color' && isHexColor(value)) {
    const on = readableOn(value, [palette.text, palette.background, '#FFFFFF', '#0B0B0F'])
    return {
      data: 'color',
      style: {
        backgroundColor: value,
        '--site-bg': value,
        '--site-text': on,
        '--site-muted': mix(on, value, 0.28),
        '--site-border': mix(value, on, 0.22),
        '--site-surface': mix(value, on, 0.07),
      },
    }
  }
  if (type === 'gradient') {
    const image = resolveGradient(value)
    return image ? { data: 'gradient', style: { backgroundImage: image } } : {}
  }
  if (type === 'pattern') {
    return { data: 'pattern', layer: <PatternLayer id={value} /> }
  }
  if (type === 'image' && value) {
    const overlay = background.overlay ?? 0.55
    return {
      data: 'image',
      style: {
        '--site-bg': '#0B0B0F',
        '--site-text': '#FFFFFF',
        '--site-muted': 'rgb(255 255 255 / 0.82)',
        '--site-border': 'rgb(255 255 255 / 0.28)',
        '--site-surface': 'rgb(255 255 255 / 0.1)',
        color: '#FFFFFF',
      },
      layer: (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl(value, { width: 1920 })}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            decoding="async"
            data-parallax=""
          />
          <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
        </div>
      ),
    }
  }
  return {}
}

export interface SectionRendererProps {
  section: Section
  site: SiteRuntime
  /** Zero-based position on the page (0 = first section, eligible for eager images). */
  index: number
  /**
   * Global sections (header, footer, announcement) render without the
   * `<section>` wrapper, padding or entrance animation.
   */
  bare?: boolean
}

/**
 * Renders one section: validates its content against the block schema, picks
 * the variant, applies style overrides, device visibility and the entrance
 * animation, and isolates failures so a broken block never breaks the page.
 */
export function SectionRenderer({ section, site, index, bare }: SectionRendererProps) {
  const definition = blockRegistry[section.blockType]
  const editor = site.mode === 'editor'
  if (!definition) return null

  const parsed = definition.manifest.schema.safeParse(section.content)
  if (!parsed.success) {
    if (!editor) return null
    return (
      <div data-sc-section={section.id} data-sc-invalid="" className="site-section">
        <div className="site-container">
          <div className="site-card p-6 text-center">
            <p className="site-h4">This section has content the editor cannot read.</p>
            <p className="site-small site-muted">Select it to replace or delete it.</p>
          </div>
        </div>
      </div>
    )
  }

  const ctx: BlockContext = {
    site,
    mode: site.mode,
    locale: site.locale,
    dir: site.dir,
    sectionId: section.id,
    index,
  }
  const variants = definition.manifest.variants
  const variant = variants.find((v) => v.id === section.variant) ?? variants[0]
  const mobileVariant = section.responsive.mobileVariant
    ? variants.find((v) => v.id === section.responsive.mobileVariant)
    : undefined
  const Component = definition.Component

  const renderVariant = (v: VariantDef) => (
    <Component
      section={section}
      content={parsed.data}
      variant={v.id}
      theme={site.theme}
      locale={site.locale}
      mode={site.mode}
      siteId={site.siteId}
      ctx={ctx}
    />
  )

  const body =
    mobileVariant && mobileVariant.id !== variant.id ? (
      <>
        <div className="max-md:hidden">{renderVariant(variant)}</div>
        <div className="md:hidden">{renderVariant(mobileVariant)}</div>
      </>
    ) : (
      renderVariant(variant)
    )

  const label = `${section.blockType} (${section.id})`
  const brokenFallback = editor ? (
    <div data-sc-section={section.id} data-sc-invalid="" className="site-section">
      <div className="site-container">
        <div className="site-card p-6 text-center">
          <p className="site-h4">This section could not be displayed.</p>
          <p className="site-small site-muted">Select it to change its layout or delete it.</p>
        </div>
      </div>
    </div>
  ) : null

  if (bare) {
    return (
      <BlockBoundary label={label} fallback={brokenFallback}>
        <div
          data-block={section.blockType}
          data-variant={variant.id}
          data-sc-section={editor ? section.id : undefined}
          data-sc-global={editor ? '' : undefined}
          className={cn(section.style.colorScheme === 'inverted' && 'site-inverted')}
        >
          {body}
        </div>
      </BlockBoundary>
    )
  }

  const background = resolveBackground(section, site)
  const hideOn = section.responsive.hideOn ?? []
  const pad = section.style.paddingY ?? (variant.bleed ? 'none' : undefined)
  const entrance = editor ? 'none' : section.animation.entrance
  const delay = section.animation.delayMs

  return (
    <BlockBoundary label={label} fallback={brokenFallback}>
      <section
        id={section.anchor}
        data-block={section.blockType}
        data-variant={variant.id}
        data-pad={pad}
        data-bg={background.data}
        data-align={section.style.textAlign === 'center' ? 'center' : undefined}
        data-first={index === 0 ? '' : undefined}
        data-sc-section={editor ? section.id : undefined}
        data-sc-example={editor && section.example ? '' : undefined}
        className={cn(
          'site-section',
          section.style.colorScheme === 'inverted' && 'site-inverted',
          hideOn.map((device) => (editor ? HIDE_IN_EDITOR[device] : HIDE[device])),
        )}
        style={background.style}
      >
        {background.layer}
        <div
          data-entrance={entrance}
          className="relative"
          style={delay ? ({ '--site-delay': `${delay}ms` } as CSSProperties) : undefined}
        >
          {body}
        </div>
      </section>
    </BlockBoundary>
  )
}
