import { defineBlock } from '../types'
import { Projects } from './Projects'
import { manifest } from './manifest'
import type { ProjectsContent } from './schema'

export const projectsBlock = defineBlock<ProjectsContent>({ manifest, Component: Projects })
