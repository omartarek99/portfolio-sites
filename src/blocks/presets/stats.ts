/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const statsPresets: SectionPreset[] = [
  {
    id: 'stats-aurora',
    name: {
      en: 'Aurora · Animated counters',
      ar: 'أورورا · عدّادات متحركة',
    },
    category: 'social-proof',
    blockType: 'stats',
    variant: 'counters',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'stagger',
    },
    content: {
      heading: {
        en: 'A few numbers',
        ar: 'بعض الأرقام',
      },
      items: [
        {
          id: 's1',
          value: '7',
          label: {
            en: 'years in brand design',
            ar: 'سنوات في تصميم الهويات',
          },
          icon: 'clock',
        },
        {
          id: 's2',
          value: '40+',
          label: {
            en: 'brands shaped',
            ar: 'علامة تجارية',
          },
          icon: 'sparkles',
        },
        {
          id: 's3',
          value: '3',
          label: {
            en: 'design awards',
            ar: 'جوائز تصميم',
          },
          icon: 'award',
        },
        {
          id: 's4',
          value: '9',
          label: {
            en: 'countries reached',
            ar: 'دول وصلت إليها الأعمال',
          },
          icon: 'globe',
        },
      ],
    },
  },
  {
    id: 'stats-majlis',
    name: {
      en: 'Majlis · Big numbers',
      ar: 'مجلس · أرقام كبيرة',
    },
    category: 'social-proof',
    blockType: 'stats',
    variant: 'big-numbers',
    tier: 'free',
    fromTemplate: 'majlis',
    style: {
      background: {
        type: 'pattern',
        value: 'islamic-star',
      },
    },
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'In numbers',
        ar: 'بالأرقام',
      },
      heading: {
        en: 'A record built over twenty years',
        ar: 'مسيرة بُنيت على مدى عشرين عامًا',
      },
      items: [
        {
          id: 'majlis-s-1',
          value: '20',
          label: {
            en: 'Years of experience',
            ar: 'عامًا من الخبرة',
          },
        },
        {
          id: 'majlis-s-2',
          value: '35',
          label: {
            en: 'National projects',
            ar: 'مشروعًا وطنيًا',
          },
        },
        {
          id: 'majlis-s-3',
          value: '12',
          label: {
            en: 'Research papers',
            ar: 'ورقة بحثية',
          },
        },
        {
          id: 'majlis-s-4',
          value: '6',
          label: {
            en: 'Countries advised',
            ar: 'دول قُدّمت لها الاستشارات',
          },
        },
      ],
    },
  },
  {
    id: 'stats-blueprint',
    name: {
      en: 'Blueprint · Row',
      ar: 'المخطط · صف',
    },
    category: 'social-proof',
    blockType: 'stats',
    variant: 'row',
    tier: 'free',
    fromTemplate: 'blueprint',
    animation: {
      entrance: 'stagger',
    },
    content: {
      items: [
        {
          id: 's-years',
          value: '11',
          label: {
            en: 'Years in practice',
            ar: 'عامًا من الممارسة',
          },
        },
        {
          id: 's-built',
          value: '38',
          label: {
            en: 'Projects built',
            ar: 'مشروعًا منفّذًا',
          },
        },
        {
          id: 's-team',
          value: '6',
          label: {
            en: 'Architects & designers',
            ar: 'معماريين ومصممين',
          },
        },
        {
          id: 's-awards',
          value: '4',
          label: {
            en: 'Design awards',
            ar: 'جوائز تصميم',
          },
        },
      ],
    },
  },
]
