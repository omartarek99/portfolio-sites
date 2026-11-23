/**
 * Freeform canvas content (SPEC §7.3). This is the contract the milestone-10
 * editor writes against; today the block only renders it.
 *
 * Geometry is resolution-independent: every frame is in PERCENT of the canvas
 * (x/w of its width, y/h of its height), the canvas has a fixed aspect ratio,
 * and text sizes are in percent of the canvas width, so a layout scales as one
 * picture. x is measured from the inline START edge, so a layout mirrors in RTL.
 */
import { z } from 'zod'
import { L, iconSchema, list, optL } from '@/schemas/blocks'
import { buttonSchema, idSchema, imageSchema, linkSchema } from '@/schemas/fields'

/** Theme colour tokens. Never hex: a freeform layout must survive a theme switch. */
export const FREEFORM_COLORS = [
  'bg',
  'surface',
  'text',
  'muted',
  'border',
  'primary',
  'secondary',
  'accent',
  'on-primary',
  'on-secondary',
  'on-accent',
] as const
export const freeformColorSchema = z.enum(FREEFORM_COLORS)
export type FreeformColor = z.infer<typeof freeformColorSchema>

export const frameSchema = z.object({
  /** Inline-start edge, % of canvas width. May overhang the canvas a little. */
  x: z.number().min(-50).max(150),
  /** Top edge, % of canvas height. */
  y: z.number().min(-50).max(150),
  /** Width, % of canvas width. */
  w: z.number().min(0.1).max(200),
  /** Height, % of canvas height. */
  h: z.number().min(0.1).max(200),
  /** Degrees clockwise (mirrored in RTL). */
  rotation: z.number().min(-360).max(360).optional(),
  /** Stacking order; higher is in front. Ties keep list order. */
  z: z.number().int().min(0).max(999).optional(),
})
export type Frame = z.infer<typeof frameSchema>

/** A frame in the mobile layout; may also resize text for the narrower canvas. */
export const mobileFrameSchema = frameSchema.extend({
  /** Text size override (% of the mobile canvas width). */
  size: z.number().min(0.5).max(40).optional(),
})
export type MobileFrame = z.infer<typeof mobileFrameSchema>

/** Canvas aspect ratio, width / height (16:9 = 1.7778). */
export const aspectSchema = z.number().min(0.25).max(4)

export const FREEFORM_ENTRANCES = ['none', 'fade', 'slide-up', 'slide-start', 'zoom', 'blur', 'reveal-mask'] as const
export const FREEFORM_SHADOWS = ['none', 'soft', 'lifted', 'hard'] as const

const elementBase = {
  id: idSchema,
  /** Desktop (and tablet) position. */
  frame: frameSchema,
  opacity: z.number().min(0).max(1).optional(),
  border: z
    .object({
      /** px */
      width: z.number().min(0).max(24),
      style: z.enum(['solid', 'dashed', 'dotted']).optional(),
      color: freeformColorSchema,
    })
    .optional(),
  /** Corner radius, % of the canvas width (scales with it). */
  radius: z.number().min(0).max(50).optional(),
  shadow: z.enum(FREEFORM_SHADOWS).optional(),
  /** Per-element entrance; uses the site's motion level and honours reduced motion. */
  animation: z
    .object({
      entrance: z.enum(FREEFORM_ENTRANCES),
      delayMs: z.number().int().min(0).max(5000).optional(),
    })
    .optional(),
  /** Whole-element link (not for buttons, which carry their own). */
  link: linkSchema.optional(),
  /** Accessible name for linked shapes and icons. */
  label: optL,
  /** Editor-only: cannot be selected or moved. */
  locked: z.boolean().optional(),
  /** Editor-only: elements sharing a group id move together. */
  groupId: z.string().max(64).optional(),
  /** Not rendered (kept so it can be shown again). */
  hidden: z.boolean().optional(),
}

export const textElementSchema = z.object({
  ...elementBase,
  type: z.literal('text'),
  text: L,
  /** Semantic element. Use h1 only when the canvas is the page's hero. */
  tag: z.enum(['p', 'h1', 'h2', 'h3']).optional(),
  /** Font size, % of canvas width (4 ≈ 48px on a 1200px canvas). */
  size: z.number().min(0.5).max(40),
  font: z.enum(['heading', 'body']).optional(),
  weight: z.enum(['regular', 'medium', 'bold', 'black']).optional(),
  align: z.enum(['start', 'center', 'end']).optional(),
  color: freeformColorSchema.optional(),
  /** Unitless line height. */
  leading: z.number().min(0.8).max(3).optional(),
  /** Fill behind the text box. */
  fill: freeformColorSchema.optional(),
})

export const imageElementSchema = z.object({
  ...elementBase,
  type: z.literal('image'),
  image: imageSchema,
  fit: z.enum(['cover', 'contain']).optional(),
})

export const SHAPES = ['rectangle', 'circle', 'blob', 'line', 'triangle', 'star'] as const
export const shapeElementSchema = z.object({
  ...elementBase,
  type: z.literal('shape'),
  shape: z.enum(SHAPES),
  /** Which blob outline (0–3). */
  blob: z.number().int().min(0).max(3).optional(),
  fill: freeformColorSchema.optional(),
})

export const iconElementSchema = z.object({
  ...elementBase,
  type: z.literal('icon'),
  icon: iconSchema,
  color: freeformColorSchema.optional(),
})

export const buttonElementSchema = z.object({
  ...elementBase,
  type: z.literal('button'),
  button: buttonSchema,
})

export const freeformElementSchema = z.discriminatedUnion('type', [
  textElementSchema,
  imageElementSchema,
  shapeElementSchema,
  iconElementSchema,
  buttonElementSchema,
])
export type FreeformElement = z.infer<typeof freeformElementSchema>
export type FreeformElementType = FreeformElement['type']

export const FREEFORM_MAX_ELEMENTS = 60

export const freeformSchema = z.object({
  /** Desktop canvas aspect (width / height). Default 16:9. */
  aspect: aspectSchema.optional(),
  background: freeformColorSchema.optional(),
  elements: list(freeformElementSchema, FREEFORM_MAX_ELEMENTS),
  /**
   * Separate mobile layout (below 768px). Absent → elements stack in reading
   * order. Present → elements without a mobile frame are hidden on mobile.
   */
  mobile: z
    .object({
      aspect: aspectSchema,
      frames: z.record(idSchema, mobileFrameSchema),
    })
    .optional(),
})
export type FreeformContent = z.infer<typeof freeformSchema>
