/**
 * Brand glyphs for the social platforms in `SOCIAL_PLATFORMS`. Lucide dropped
 * brand icons, so path data comes from `simple-icons` (CC0) except:
 *   - LinkedIn, which simple-icons does not ship (trademark policy) — drawn here
 *   - 'website' and 'email', which are generic and use the Lucide globe / mail
 *
 * The path map is typed over every platform but those two, so a new platform in
 * `src/schemas/fields.ts` becomes a type error here until it has an icon.
 */
import { Globe, Mail } from 'lucide-react'
import {
  siBehance,
  siDiscord,
  siDribbble,
  siFacebook,
  siGithub,
  siInstagram,
  siMedium,
  siPinterest,
  siSnapchat,
  siSoundcloud,
  siSpotify,
  siTelegram,
  siThreads,
  siTiktok,
  siTwitch,
  siWhatsapp,
  siX,
  siYoutube,
} from 'simple-icons'
import type { SocialPlatform } from '@/schemas/fields'
import { cn } from '@/lib/utils'

/** The 'in' mark on a rounded tile, in the 24×24 simple-icons grid. */
const LINKEDIN_PATH =
  'M3.2 8.9h3.9V21H3.2V8.9zM5.15 2.6a2.26 2.26 0 1 1 0 4.52 2.26 2.26 0 0 1 0-4.52zM9.6 8.9h3.74v1.65h.05c.6-1.1 1.97-1.95 3.85-1.95 2.95 0 4.26 1.78 4.26 5.04V21h-3.9v-6.4c0-1.6-.57-2.57-1.9-2.57-1.17 0-1.9.78-1.9 2.4V21H9.6V8.9z'

export const BRAND_PATHS: Record<Exclude<SocialPlatform, 'website' | 'email'>, string> = {
  instagram: siInstagram.path,
  linkedin: LINKEDIN_PATH,
  x: siX.path,
  facebook: siFacebook.path,
  youtube: siYoutube.path,
  tiktok: siTiktok.path,
  github: siGithub.path,
  behance: siBehance.path,
  dribbble: siDribbble.path,
  whatsapp: siWhatsapp.path,
  telegram: siTelegram.path,
  snapchat: siSnapchat.path,
  pinterest: siPinterest.path,
  spotify: siSpotify.path,
  soundcloud: siSoundcloud.path,
  medium: siMedium.path,
  twitch: siTwitch.path,
  discord: siDiscord.path,
  threads: siThreads.path,
}

export interface BrandIconProps {
  platform: SocialPlatform
  /** Size it with a class — it defaults to 1em so it follows the text. */
  className?: string
}

/** True when a string names a platform this component can draw. */
export function hasBrandIcon(platform: string): platform is SocialPlatform {
  return platform === 'website' || platform === 'email' || platform in BRAND_PATHS
}

/**
 * A platform's brand glyph, inheriting `currentColor` and the font size.
 *
 *   <BrandIcon platform="instagram" className="size-5" />
 */
export function BrandIcon({ platform, className }: BrandIconProps) {
  const classes = cn('size-[1em] shrink-0', className)
  if (platform === 'website' || platform === 'email') {
    const Lucide = platform === 'email' ? Mail : Globe
    return <Lucide aria-hidden="true" focusable="false" className={classes} />
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={classes}
      role="presentation"
    >
      <path d={BRAND_PATHS[platform]} />
    </svg>
  )
}
