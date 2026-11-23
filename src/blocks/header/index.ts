import { defineBlock } from '../types'
import { Header } from './Header'
import { manifest } from './manifest'
import type { HeaderContent } from './schema'

export const headerBlock = defineBlock<HeaderContent>({ manifest, Component: Header })
