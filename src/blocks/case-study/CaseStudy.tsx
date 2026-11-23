import type { CaseStudyVariantProps } from './parts'
import { ImageStory } from './variants/ImageStory'
import { ProblemProcessResult } from './variants/ProblemProcessResult'

export function CaseStudy(props: CaseStudyVariantProps) {
  return props.variant === 'image-story' ? <ImageStory {...props} /> : <ProblemProcessResult {...props} />
}
