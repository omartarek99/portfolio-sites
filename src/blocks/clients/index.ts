import { defineBlock } from '../types'
import { Clients } from './Clients'
import { manifest } from './manifest'
import type { ClientsContent } from './schema'

export const clientsBlock = defineBlock<ClientsContent>({ manifest, Component: Clients })
