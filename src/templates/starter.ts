/**
 * The built-in starter site: a small, neutral, valid SiteContent. Used for
 * blank sites, as the last-resort fallback when AI output cannot be repaired
 * (SPEC §9.3), and as the pipeline smoke test.
 */
import { createSection } from '@/blocks/factory'
import type { Locale, Localized } from '@/schemas/fields'
import { CURRENT_SITE_VERSION, type SiteContent, type Theme } from '@/schemas/site'

export const STARTER_THEME: Theme = {
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

export interface StarterOptions {
  name?: Localized
  locales?: Locale[]
  theme?: Theme
}

export function starterContent(options: StarterOptions = {}): SiteContent {
  const name: Localized = options.name ?? { en: 'Your Name', ar: 'اسمك' }
  const hero = createSection('hero', undefined, {
    id: 'starter-hero',
    content: {
      heading: name,
      text: {
        en: 'A short line about what you do and who you help.',
        ar: 'سطر قصير عمّا تقدمه ولمن تقدمه.',
      },
    },
  })
  const about = createSection('about', undefined, {
    id: 'starter-about',
    anchor: 'about',
    content: {
      heading: { en: 'About', ar: 'نبذة' },
      text: {
        en: 'Tell your story here: where you started, what you are good at, and what you want to do next.',
        ar: 'اكتب قصتك هنا: من أين بدأت، وما الذي تجيده، وما الذي تطمح إليه.',
      },
    },
  })
  const contact = createSection('contact', undefined, {
    id: 'starter-contact',
    anchor: 'contact',
    content: {
      heading: { en: 'Get in touch', ar: 'تواصل معي' },
      text: { en: 'Add your email, phone or a contact form.', ar: 'أضف بريدك الإلكتروني أو هاتفك أو نموذج تواصل.' },
    },
  })

  return {
    version: CURRENT_SITE_VERSION,
    locales: options.locales ?? ['en', 'ar'],
    theme: options.theme ?? STARTER_THEME,
    navigation: {
      style: 'top',
      header: [
        { id: 'nav-about', label: { en: 'About', ar: 'نبذة' }, link: { type: 'anchor', value: 'about' } },
        { id: 'nav-contact', label: { en: 'Contact', ar: 'تواصل' }, link: { type: 'anchor', value: 'contact' } },
      ],
      footer: [],
    },
    pages: [
      {
        id: 'home',
        slug: '',
        title: { en: 'Home', ar: 'الرئيسية' },
        type: 'standard',
        sections: [hero, about, contact],
        visibility: 'public',
      },
    ],
    globalSections: {
      header: createSection('header', undefined, { id: 'starter-header', content: { heading: name } }),
      footer: createSection('footer', undefined, { id: 'starter-footer', content: { heading: name } }),
    },
    settings: {
      seo: { titleTemplate: '%s' },
      social: [],
      contact: {},
      cookieBanner: false,
      ownerName: name,
    },
  }
}
