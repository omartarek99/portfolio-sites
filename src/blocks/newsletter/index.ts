import { defineBlock } from '../types'
import { Newsletter } from './Newsletter'
import { manifest } from './manifest'
import type { NewsletterContent } from './schema'

export const newsletterBlock = defineBlock<NewsletterContent>({ manifest, Component: Newsletter })
