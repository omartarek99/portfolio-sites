import { defineBlock } from '../types'
import { Booking } from './Booking'
import { manifest } from './manifest'
import type { BookingContent } from './schema'

export const bookingBlock = defineBlock<BookingContent>({ manifest, Component: Booking })
