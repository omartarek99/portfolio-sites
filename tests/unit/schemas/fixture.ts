/**
 * A minimal valid SiteContent built by hand (no block library imported), so the
 * schema tests stay pure and fail for schema reasons only.
 */
import type { SiteContentInput } from '@/schemas/site'

export function validTheme(): NonNullable<SiteContentInput['theme']> {
  return {
    templateId: 'starter',
    palette: {
      background: '#FFFFFF',
      surface: '#F3F3F3',
      text: '#191A23',
      mutedText: '#595A66',
      primary: '#191A23',
      secondary: '#3D5AFE',
      accent: '#B9FF66',
      border: '#D9D9DE',
    },
    mode: 'light',
    fonts: {
      heading: { family: 'Space Grotesk' },
      body: { family: 'Inter' },
      arabicHeading: { family: 'Readex Pro' },
      arabicBody: { family: 'IBM Plex Sans Arabic' },
    },
    radius: 'lg',
    spacing: 'comfortable',
    motion: 'subtle',
    buttonStyle: 'solid',
  }
}

type SectionInput = SiteContentInput['pages'][number]['sections'][number]

export function section(id: string, overrides: Partial<SectionInput> = {}): SectionInput {
  return {
    id,
    blockType: 'hero',
    variant: 'split',
    content: { heading: { en: 'Layla Haddad', ar: 'ليلى حداد' } },
    ...overrides,
  }
}

export function page(
  id: string,
  slug: string,
  sections: SectionInput[] = [],
): SiteContentInput['pages'][number] {
  return {
    id,
    slug,
    title: { en: 'Home', ar: 'الرئيسية' },
    type: 'standard',
    sections,
    visibility: 'public',
  }
}

/** A site that parses cleanly. Mutate a clone of it to test one rule at a time. */
export function validSite(): SiteContentInput {
  return {
    version: 1,
    locales: ['en', 'ar'],
    theme: validTheme(),
    navigation: {
      style: 'top',
      header: [
        { id: 'nav-about', label: { en: 'About', ar: 'نبذة' }, link: { type: 'anchor', value: 'about' } },
      ],
      footer: [],
    },
    pages: [page('home', '', [section('s-hero')]), page('work', 'work', [section('s-projects')])],
    globalSections: {},
    settings: {
      seo: { titleTemplate: '%s' },
      social: [],
      contact: {},
      cookieBanner: false,
    },
  }
}

export const clone = <T>(value: T): T => structuredClone(value)
