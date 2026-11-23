import type { ComponentType } from 'react'
import { AnimatedText } from './variants/AnimatedText'
import { Centered } from './variants/Centered'
import { Collage } from './variants/Collage'
import { FullBleed } from './variants/FullBleed'
import { MagazineCover } from './variants/MagazineCover'
import { Minimal } from './variants/Minimal'
import type { HeroProps } from './variants/parts'
import { SplitImage } from './variants/SplitImage'
import { TiltCard } from './variants/TiltCard'
import { VideoBg } from './variants/VideoBg'

const VARIANTS: Record<string, ComponentType<HeroProps>> = {
  'split-image': SplitImage,
  centered: Centered,
  'full-bleed': FullBleed,
  'video-bg': VideoBg,
  'animated-text': AnimatedText,
  collage: Collage,
  'tilt-card': TiltCard,
  minimal: Minimal,
  'magazine-cover': MagazineCover,
}

export function Hero(props: HeroProps) {
  const Variant = VARIANTS[props.variant] ?? SplitImage
  return <Variant {...props} />
}
