import type { ProjectsVariantProps } from './parts'
import { Alternating } from './variants/Alternating'
import { Bento } from './variants/Bento'
import { CarouselView } from './variants/CarouselView'
import { Grid } from './variants/Grid'
import { HoverReveal } from './variants/HoverReveal'
import { Masonry } from './variants/Masonry'

export function Projects(props: ProjectsVariantProps) {
  switch (props.variant) {
    case 'masonry':
      return <Masonry {...props} />
    case 'carousel':
      return <CarouselView {...props} />
    case 'alternating':
      return <Alternating {...props} />
    case 'hover-reveal':
      return <HoverReveal {...props} />
    case 'bento':
      return <Bento {...props} />
    default:
      return <Grid {...props} />
  }
}
