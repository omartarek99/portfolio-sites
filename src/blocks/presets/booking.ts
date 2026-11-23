/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const bookingPresets: SectionPreset[] = [
  {
    id: 'booking-bloom-coach',
    name: {
      en: 'Bloom Coach · Inline calendar',
      ar: 'بلوم كوتش · تقويم في الصفحة',
    },
    category: 'contact',
    blockType: 'booking',
    variant: 'inline-calendar',
    tier: 'free',
    fromTemplate: 'bloom-coach',
    style: {
      background: {
        type: 'surface',
      },
    },
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Book a session',
        ar: 'احجز جلسة',
      },
      heading: {
        en: "Let's find your next step together",
        ar: 'لنكتشف خطوتك التالية معًا',
      },
      intro: {
        en: 'Pick a time that suits you. Your first 20-minute call is free.',
        ar: 'اختر الوقت الذي يناسبك، فمكالمتك الأولى لمدة ٢٠ دقيقة مجانية.',
      },
      buttonLabel: {
        en: 'See available times',
        ar: 'اطّلع على المواعيد المتاحة',
      },
      cta: {
        label: {
          en: 'Message me instead',
          ar: 'أو راسلني',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        icon: 'arrow-right',
      },
      note: {
        en: 'Sessions in Arabic or English, Sunday to Thursday.',
        ar: 'الجلسات بالعربية أو الإنجليزية، من الأحد إلى الخميس.',
      },
    },
  },
  {
    id: 'booking-noir-lens',
    name: {
      en: 'Noir Lens · Button and window',
      ar: 'نوار لنز · زر ونافذة',
    },
    category: 'contact',
    blockType: 'booking',
    variant: 'button-modal',
    tier: 'free',
    fromTemplate: 'noir-lens',
    style: {
      background: {
        type: 'surface',
      },
    },
    animation: {
      entrance: 'zoom',
    },
    content: {
      eyebrow: {
        en: '2026 – 2027 dates',
        ar: 'مواعيد 2026 – 2027',
      },
      heading: {
        en: 'Is your date still open?',
        ar: 'هل ما زال موعدك متاحًا؟',
      },
      intro: {
        en: 'I photograph a limited number of weddings each season so every couple gets my full attention.',
        ar: 'أصوّر عددًا محدودًا من الأعراس في كل موسم، ليحظى كل زوجين باهتمامي الكامل.',
      },
      buttonLabel: {
        en: 'Check my availability',
        ar: 'تحقّق من المواعيد المتاحة',
      },
      note: {
        en: 'Replies within one working day.',
        ar: 'أردّ خلال يوم عمل واحد.',
      },
    },
  },
]
