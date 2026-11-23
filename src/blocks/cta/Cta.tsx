import type { ComponentType } from 'react'
import { hasButton, hasImage, hasText } from '../_shared'
import { Banner } from './variants/Banner'
import { Gradient } from './variants/Gradient'
import { Simple, type CtaProps } from './variants/Simple'
import { WithImage } from './variants/WithImage'

const VARIANTS: Record<string, ComponentType<CtaProps>> = { simple: Simple, 'with-image': WithImage, gradient: Gradient, banner: Banner }

export function Cta(props: CtaProps) {
  const { ctx, content } = props
  const any =
    hasText(ctx, content.eyebrow) ||
    hasText(ctx, content.heading) ||
    hasText(ctx, content.intro) ||
    hasButton(ctx, content.primaryCta) ||
    hasButton(ctx, content.secondaryCta) ||
    (props.variant === 'with-image' && hasImage(ctx, content.image))
  // An empty band is noise: render nothing (the editor always has placeholders).
  if (!any) return null
  const Variant = VARIANTS[props.variant] ?? Simple
  return <Variant {...props} />
}
