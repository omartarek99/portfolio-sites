import { defineBlock } from '../types'
import { Contact } from './Contact'
import { manifest } from './manifest'
import type { ContactContent } from './schema'

export const contactBlock = defineBlock<ContactContent>({ manifest, Component: Contact })
