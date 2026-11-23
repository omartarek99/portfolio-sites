import type { ComponentType } from 'react'
import { ButtonModal } from './variants/ButtonModal'
import { InlineCalendar } from './variants/InlineCalendar'
import type { BookingProps } from './variants/parts'

const VARIANTS: Record<string, ComponentType<BookingProps>> = { 'inline-calendar': InlineCalendar, 'button-modal': ButtonModal }

export function Booking(props: BookingProps) {
  const Variant = VARIANTS[props.variant] ?? InlineCalendar
  return <Variant {...props} />
}
