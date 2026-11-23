import { z } from 'zod'
import { list, optL, L, textItemSchema } from '@/schemas/blocks'
import { buttonSchema, idSchema, imageSchema, videoSchema } from '@/schemas/fields'

export const HERO_ANIMATIONS = ['word-rotate', 'typewriter', 'terminal'] as const
export const HERO_TEXT_STYLES = ['plain', 'gradient', 'signature'] as const

/** One picture of the slideshow / collage. */
export const heroImageSchema = z.object({ id: idSchema, image: imageSchema })
export type HeroImage = z.infer<typeof heroImageSchema>

/** One line of the terminal: a command and what it prints. */
export const heroCommandSchema = z.object({
  id: idSchema,
  /** What is typed after the prompt, e.g. `whoami`. Not translated. */
  command: z.string().max(80),
  output: L,
  /** Typed automatically on load. When false, it only answers when a visitor types it. Default true. */
  typed: z.boolean().optional(),
})
export type HeroCommand = z.infer<typeof heroCommandSchema>

/**
 * One content model for every hero variant, so switching variants keeps the
 * user's words and pictures. A variant simply ignores what it has no place for
 * (see `editableFields[].variants` in the manifest).
 */
export const heroSchema = z.object({
  /** Small label above the headline. */
  eyebrow: optL,
  /** The person's name: masthead of `magazine-cover`, title of `minimal`, caption elsewhere. */
  name: optL,
  /** The headline. It is the page's h1 (the name takes over when it is empty). */
  heading: optL,
  tagline: optL,
  primaryCta: buttonSchema.optional(),
  secondaryCta: buttonSchema.optional(),
  /** Small round portrait (`centered`). */
  avatar: imageSchema.optional(),
  /** Portrait or cover. Also the poster of `video-bg`. */
  image: imageSchema.optional(),
  /** Slideshow of `full-bleed` (when there are 2+), tiles of `collage`. */
  images: list(heroImageSchema, 6).optional(),
  /** Showreel of `video-bg`: an uploaded mp4/webm file. */
  video: videoSchema.optional(),
  /** Availability badge, e.g. "Available from March". */
  badge: optL,
  location: optL,
  /** Animated arrow inviting to scroll (full-height variants). */
  scrollCue: z.boolean().optional(),

  /* split-image */
  imageSide: z.enum(['end', 'start']).optional(),
  /** Soft organic shapes floating behind the picture. */
  blob: z.boolean().optional(),

  /* centered */
  frame: z.enum(['none', 'pattern']).optional(),
  /** gradient: gradient headline · signature: the name written like a signature. */
  textStyle: z.enum(HERO_TEXT_STYLES).optional(),
  /** A reading-progress bar pinned to the top of the page. */
  progressBar: z.boolean().optional(),

  /* full-bleed */
  kenBurns: z.boolean().optional(),
  /** Small technical label over the picture: coordinates, a place, a project number. */
  overlayLabel: optL,

  /* animated-text */
  animation: z.enum(HERO_ANIMATIONS).optional(),
  /** The words that rotate / are typed after the headline. */
  words: list(textItemSchema, 8).optional(),
  commands: list(heroCommandSchema, 12).optional(),

  /* collage */
  stickers: list(textItemSchema, 3).optional(),

  /* magazine-cover */
  coverLines: list(textItemSchema, 4).optional(),
  /** Issue number and date in the corner, e.g. "Issue 07 · Spring 2026". */
  issue: optL,
})
export type HeroContent = z.infer<typeof heroSchema>
