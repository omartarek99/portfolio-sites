/**
 * All block manifests, WITHOUT their React components. Import this from
 * server code that only needs schemas and metadata (validation, AI
 * generation, API routes); import `./registry` when you need to render.
 */
import type { BlockType } from '@/schemas/site'
import type { AnyBlockManifest } from './types'
import { manifest as about } from './about/manifest'
import { manifest as announcement } from './announcement/manifest'
import { manifest as blogList } from './blog-list/manifest'
import { manifest as booking } from './booking/manifest'
import { manifest as caseStudy } from './case-study/manifest'
import { manifest as clients } from './clients/manifest'
import { manifest as contact } from './contact/manifest'
import { manifest as cta } from './cta/manifest'
import { manifest as divider } from './divider/manifest'
import { manifest as education } from './education/manifest'
import { manifest as embed } from './embed/manifest'
import { manifest as experience } from './experience/manifest'
import { manifest as faq } from './faq/manifest'
import { manifest as footer } from './footer/manifest'
import { manifest as freeform } from './freeform/manifest'
import { manifest as gallery } from './gallery/manifest'
import { manifest as header } from './header/manifest'
import { manifest as hero } from './hero/manifest'
import { manifest as linkHub } from './link-hub/manifest'
import { manifest as mediaKit } from './media-kit/manifest'
import { manifest as newsletter } from './newsletter/manifest'
import { manifest as pricing } from './pricing/manifest'
import { manifest as process } from './process/manifest'
import { manifest as projects } from './projects/manifest'
import { manifest as publications } from './publications/manifest'
import { manifest as richText } from './rich-text/manifest'
import { manifest as services } from './services/manifest'
import { manifest as skills } from './skills/manifest'
import { manifest as stats } from './stats/manifest'
import { manifest as testimonials } from './testimonials/manifest'
import { manifest as video } from './video/manifest'

export const blockManifests: Record<BlockType, AnyBlockManifest> = {
  hero,
  about,
  experience,
  education,
  projects,
  caseStudy,
  skills,
  services,
  testimonials,
  clients,
  stats,
  gallery,
  video,
  process,
  faq,
  pricing,
  cta,
  contact,
  booking,
  newsletter,
  linkHub,
  mediaKit,
  publications,
  blogList,
  richText,
  embed,
  freeform,
  divider,
  header,
  footer,
  announcement,
}

export function getManifest(type: BlockType): AnyBlockManifest {
  return blockManifests[type]
}

/** Manifests a user can add to a page, in library order. */
export const addableManifests: AnyBlockManifest[] = Object.values(blockManifests).filter((m) => !m.global)
