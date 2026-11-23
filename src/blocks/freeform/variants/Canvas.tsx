import type { CSSProperties, ReactNode } from 'react'
import { pick, plainText } from '@/schemas/fields'
import { cn } from '@/lib/utils'
import { A, Btn, Container, hasButton, hasIcon, hasImage, hasText, Icon, Img, itemAttrs, T } from '../../_shared'
import type { BlockContext, BlockProps } from '../../types'
import type { FreeformColor, FreeformContent, FreeformElement, MobileFrame } from '../schema'

const color = (token: FreeformColor | undefined) => (token ? `var(--site-${token})` : undefined)

const SHADOWS = {
  none: undefined,
  soft: '0 10px 30px -12px color-mix(in oklab, var(--site-text) 35%, transparent)',
  lifted: '0 28px 60px -24px color-mix(in oklab, var(--site-text) 50%, transparent)',
  // Mirrors in RTL through --site-shadow-x.
  hard: 'calc(6px * var(--site-shadow-x)) 6px 0 0 var(--site-text)',
} as const

const WEIGHTS = { regular: 400, medium: 500, bold: 700, black: 900 } as const

/** Blob outlines in a 100×100 box, stretched to the frame. */
const BLOBS = [
  'M50 4C70 4 92 16 95 40s-8 47-30 55S20 98 9 78 2 34 18 17 38 4 50 4Z',
  'M57 3c18 3 37 18 39 38s-10 30-12 45-19 15-35 11S12 85 6 66 5 26 20 12 45 1 57 3Z',
  'M48 2c16 0 22 14 34 20s18 22 13 38-18 34-38 38S12 88 6 70s3-28 2-43S30 2 48 2Z',
  'M42 5c13-6 32-2 42 10s14 33 8 49-22 31-42 31S10 85 5 66 10 34 18 22 29 11 42 5Z',
]
const POLYGONS = {
  triangle: 'M50 3 97 97H3Z',
  star: 'M50 2l14 31 34 4-25 23 7 34-30-17-30 17 7-34L2 37l34-4Z',
}

type Vars = CSSProperties & Record<`--${string}`, string | number | undefined>

/** Positioning variables. Desktop frame always; mobile frame only when a mobile layout exists. */
function frameVars(el: FreeformElement, mobile: MobileFrame | undefined, listIndex: number): Vars {
  const f = el.frame
  const r = f.rotation ?? 0
  const vars: Vars = {
    '--x': `${f.x}%`,
    '--y': `${f.y}%`,
    '--w': `${f.w}%`,
    '--h': `${f.h}%`,
    '--r': `${r}deg`,
    '--ri': `${-r}deg`,
    // Higher z in front; equal z keeps list order (DOM order is reading order, not paint order).
    zIndex: (f.z ?? 0) * 100 + listIndex,
  }
  if (el.type === 'text') vars['--fs'] = el.size
  if (mobile) {
    const mr = mobile.rotation ?? 0
    Object.assign(vars, {
      '--mx': `${mobile.x}%`,
      '--my': `${mobile.y}%`,
      '--mw': `${mobile.w}%`,
      '--mh': `${mobile.h}%`,
      '--mr': `${mr}deg`,
      '--mri': `${-mr}deg`,
      // ponytail: without an explicit mobile size, text grows 1.6× for the narrower canvas.
      '--mfs': mobile.size ?? (el.type === 'text' ? el.size * 1.6 : undefined),
    })
  }
  return vars
}

const DESKTOP = 'md:absolute md:start-(--x) md:top-(--y) md:w-(--w) md:h-(--h) md:rotate-(--r) md:rtl:rotate-(--ri)'
const MOBILE_LAYOUT = 'max-md:absolute max-md:start-(--mx) max-md:top-(--my) max-md:w-(--mw) max-md:h-(--mh) max-md:rotate-(--mr) max-md:rtl:rotate-(--mri)'

/** True when the element has something to render in this context. */
function visible(ctx: BlockContext, el: FreeformElement): boolean {
  if (el.hidden) return false
  switch (el.type) {
    case 'text':
      return hasText(ctx, el.text)
    case 'image':
      return hasImage(ctx, el.image)
    case 'button':
      return hasButton(ctx, el.button)
    case 'icon':
      return hasIcon(el.icon)
    default:
      return true
  }
}

function Body({ ctx, el, index }: { ctx: BlockContext; el: FreeformElement; index: number }) {
  const base = `elements.${index}`
  switch (el.type) {
    case 'text':
      return (
        <T
          ctx={ctx}
          path={`${base}.text`}
          value={el.text}
          as={el.tag ?? 'p'}
          multiline
          placeholder="Text"
          className={cn(
            'm-0 min-w-0 break-words select-text',
            el.font === 'body' ? 'font-site-body' : el.font === 'heading' ? 'font-site-heading' : undefined,
            el.align === 'center' ? 'text-center' : el.align === 'end' ? 'text-end' : 'text-start',
          )}
          style={{
            color: color(el.color),
            fontWeight: el.weight ? WEIGHTS[el.weight] : undefined,
            lineHeight: el.leading,
            backgroundColor: color(el.fill),
            padding: el.fill ? '0.3em 0.6em' : undefined,
          }}
        />
      )
    case 'image':
      return (
        <Img
          ctx={ctx}
          path={`${base}.image`}
          value={el.image}
          sizes={`(min-width: 768px) ${Math.ceil(Math.min(el.frame.w, 100))}vw, 100vw`}
          maxWidth={1600}
          priority={ctx.index === 0}
          className={el.fit === 'contain' ? 'object-contain' : undefined}
        />
      )
    case 'shape': {
      const fill = color(el.fill ?? 'primary')
      if (el.shape === 'rectangle' || el.shape === 'circle' || el.shape === 'line') {
        return <span aria-hidden="true" className={cn('block size-full', el.shape === 'circle' && 'rounded-[50%]')} style={{ backgroundColor: fill }} />
      }
      const d = el.shape === 'blob' ? BLOBS[el.blob ?? 0] : POLYGONS[el.shape]
      return (
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="block size-full" style={{ color: fill }}>
          <path d={d} fill="currentColor" />
        </svg>
      )
    }
    case 'icon':
      return <Icon name={el.icon} aria-hidden="true" className="block size-full" style={{ color: color(el.color ?? 'primary') }} />
    case 'button':
      return <Btn ctx={ctx} path={`${base}.button`} value={el.button} />
  }
}

function Element({
  ctx,
  el,
  index,
  mobile,
  stack,
}: {
  ctx: BlockContext
  el: FreeformElement
  index: number
  mobile: MobileFrame | undefined
  stack: boolean
}) {
  const boxed = el.type === 'image' || el.type === 'shape'
  const style: Vars = {
    ...frameVars(el, mobile, index),
    opacity: el.opacity,
    borderWidth: el.border?.width,
    borderStyle: el.border ? (el.border.style ?? 'solid') : undefined,
    borderColor: color(el.border?.color),
    borderRadius: el.radius ? `${el.radius}cqw` : undefined,
    boxShadow: el.shadow ? SHADOWS[el.shadow] : undefined,
    '--site-delay': el.animation?.delayMs ? `${el.animation.delayMs}ms` : undefined,
    // Natural shape when stacked: the frame's real aspect on a canvas of ratio --ar.
    '--ear': boxed ? `calc(${el.frame.w} * var(--ar)) / ${el.frame.h}` : undefined,
  }

  let body: ReactNode = <Body ctx={ctx} el={el} index={index} />
  if (el.link && el.type !== 'button') {
    const label = plainText(pick(el.label, ctx.locale)) || undefined
    body = (
      <A
        ctx={ctx}
        link={el.link}
        label={el.type === 'text' ? undefined : label}
        className="focus-visible:outline-site-primary block size-full rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {body}
      </A>
    )
  }

  return (
    <div
      {...itemAttrs(ctx, 'elements', index)}
      data-reveal=""
      data-entrance={el.animation && el.animation.entrance !== 'none' ? el.animation.entrance : undefined}
      data-type={el.type}
      style={style}
      className={cn(
        'min-w-0',
        boxed && 'overflow-hidden',
        el.type === 'text' && 'md:text-[length:calc(var(--fs)*1cqw)]',
        el.type === 'button' && 'flex items-start',
        DESKTOP,
        stack
          ? [
              'max-md:relative max-md:z-auto',
              el.type === 'text' && 'max-md:text-[length:clamp(1rem,calc(var(--fs)*2.2cqw),2.75rem)]',
              el.type === 'text' && !el.fill && 'max-md:w-full',
              el.type === 'image' && 'max-md:aspect-(--ear) max-md:w-full',
              // Decoration does not survive stacking; a lone icon keeps a modest size.
              el.type === 'shape' && 'max-md:hidden',
              el.type === 'icon' && 'max-md:size-12',
            ]
          : mobile
            ? [MOBILE_LAYOUT, el.type === 'text' && 'max-md:text-[length:calc(var(--mfs)*1cqw)]']
            : 'max-md:hidden',
      )}
    >
      {body}
    </div>
  )
}

/**
 * Read-only render of a stored freeform layout (SPEC §7.3). Elements sit on a
 * fixed-aspect canvas by percentage; below md the mobile layout is used when
 * there is one, otherwise the elements stack in reading order.
 */
export function Canvas({ ctx, section, content }: BlockProps<FreeformContent>) {
  const mobile = content.mobile
  const stack = !mobile
  // DOM order = reading order (by vertical centre, then from the inline start), so
  // keyboard, screen-reader and stacked order follow the picture; paint order is z-index.
  const middle = (el: FreeformElement) => el.frame.y + el.frame.h / 2
  const items = content.elements
    .map((el, index) => ({ el, index }))
    .filter(({ el }) => visible(ctx, el))
    .sort((a, b) => middle(a.el) - middle(b.el) || a.el.frame.x - b.el.frame.x)

  if (items.length === 0 && ctx.mode !== 'editor') return null

  const bg = color(content.background)
  return (
    <Container section={section}>
      <div
        className={cn(
          'relative w-full overflow-hidden @container',
          'md:aspect-(--ar)',
          stack ? 'max-md:flex max-md:flex-col max-md:items-start max-md:gap-5' : 'aspect-(--mar)',
          stack && bg && 'max-md:p-6',
          bg && 'rounded-site',
          items.length === 0 && 'border-site-border rounded-site border border-dashed max-md:min-h-48',
        )}
        style={{ '--ar': content.aspect ?? 16 / 9, '--mar': mobile?.aspect, backgroundColor: bg } as Vars}
      >
        {items.map(({ el, index }) => (
          <Element key={el.id} ctx={ctx} el={el} index={index} mobile={mobile?.frames[el.id]} stack={stack} />
        ))}
      </div>
    </Container>
  )
}
