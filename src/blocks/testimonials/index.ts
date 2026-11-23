import { defineBlock } from '../types'
import { Testimonials } from './Testimonials'
import { manifest } from './manifest'
import type { TestimonialsContent } from './schema'

export const testimonialsBlock = defineBlock<TestimonialsContent>({ manifest, Component: Testimonials })
