import type { ComponentType, SVGProps } from 'react'
import { ICONS } from './icons'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name in kebab-case from the curated set in `./icons.ts`, e.g. "arrow-up-right". */
  name: string
  /** Rendered when the name is unknown. Default: nothing. */
  fallback?: ComponentType<SVGProps<SVGSVGElement>>
}

/**
 * A Lucide icon by name. Site content stores icon names as strings (services,
 * skills, link hub, buttons), so icons resolve through a curated, tree-shaken
 * map rather than the whole Lucide set.
 */
export function Icon({ name, fallback: Fallback, ...props }: IconProps) {
  const Component = ICONS[name] ?? Fallback
  if (!Component) return null
  return <Component aria-hidden="true" focusable="false" {...props} />
}

export function hasIcon(name: string | undefined): boolean {
  return Boolean(name && ICONS[name])
}
