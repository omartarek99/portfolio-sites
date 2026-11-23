import type { ComponentType } from 'react'
import { FormDetails } from './variants/FormDetails'
import { Minimal } from './variants/Minimal'
import type { ContactProps } from './variants/parts'
import { SplitMap } from './variants/SplitMap'

const VARIANTS: Record<string, ComponentType<ContactProps>> = {
  'form-details': FormDetails,
  'split-map': SplitMap,
  minimal: Minimal,
}

export function Contact(props: ContactProps) {
  const Variant = VARIANTS[props.variant] ?? FormDetails
  return <Variant {...props} />
}
