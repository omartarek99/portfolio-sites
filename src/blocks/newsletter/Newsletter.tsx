import type { ComponentType } from 'react'
import { Card } from './variants/Card'
import { Inline } from './variants/Inline'
import type { NewsletterProps } from './variants/Inline'

const VARIANTS: Record<string, ComponentType<NewsletterProps>> = { inline: Inline, card: Card }

export function Newsletter(props: NewsletterProps) {
  const Variant = VARIANTS[props.variant] ?? Inline
  return <Variant {...props} />
}
