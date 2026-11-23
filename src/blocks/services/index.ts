import { defineBlock } from '../types'
import { Services } from './Services'
import { manifest } from './manifest'
import type { ServicesContent } from './schema'

export const servicesBlock = defineBlock<ServicesContent>({ manifest, Component: Services })
