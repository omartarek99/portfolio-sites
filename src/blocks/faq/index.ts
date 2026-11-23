import { defineBlock } from '../types'
import { Faq } from './Faq'
import { manifest } from './manifest'
import type { FaqContent } from './schema'

export const faqBlock = defineBlock<FaqContent>({ manifest, Component: Faq })
