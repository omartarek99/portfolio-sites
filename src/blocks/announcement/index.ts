import { defineBlock } from '../types'
import { Announcement } from './Announcement'
import { manifest } from './manifest'
import type { AnnouncementContent } from './schema'

export const announcementBlock = defineBlock<AnnouncementContent>({ manifest, Component: Announcement })
