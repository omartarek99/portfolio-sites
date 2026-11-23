import type { ComponentType } from 'react'
import type { FooterProps } from './parts'
import { BigName } from './variants/BigName'
import { Columns } from './variants/Columns'
import { Simple } from './variants/Simple'

const VARIANTS: Record<string, ComponentType<FooterProps>> = {
  simple: Simple,
  columns: Columns,
  'big-name': BigName,
}

export function Footer(props: FooterProps) {
  const Variant = VARIANTS[props.variant] ?? Simple
  return <Variant {...props} />
}
