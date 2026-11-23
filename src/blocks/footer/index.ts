import { defineBlock } from '../types'
import { Footer } from './Footer'
import { manifest } from './manifest'
import type { FooterContent } from './schema'

export const footerBlock = defineBlock<FooterContent>({ manifest, Component: Footer })
