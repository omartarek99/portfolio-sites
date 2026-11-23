/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const contactPresets: SectionPreset[] = [
  {
    id: 'contact-aurora',
    name: {
      en: 'Aurora · Form and details',
      ar: 'أورورا · نموذج وبيانات',
    },
    category: 'contact',
    blockType: 'contact',
    variant: 'form-details',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Contact',
        ar: 'تواصل',
      },
      heading: {
        en: 'Tell me about your project',
        ar: 'حدّثني عن مشروعك',
      },
      intro: {
        en: 'A few lines are enough. I reply within two working days.',
        ar: 'بضعة أسطر تكفي. أرد خلال يومَي عمل.',
      },
      note: {
        en: 'Based in Doha, working with teams worldwide.',
        ar: 'مقيمة في الدوحة وأعمل مع فرق حول العالم.',
      },
      showDetails: true,
      showSocial: true,
    },
  },
  {
    id: 'contact-blueprint',
    name: {
      en: 'Blueprint · Form and map',
      ar: 'المخطط · نموذج وخريطة',
    },
    category: 'contact',
    blockType: 'contact',
    variant: 'split-map',
    tier: 'free',
    fromTemplate: 'blueprint',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: '05 — Contact',
        ar: '05 — تواصل',
      },
      heading: {
        en: 'Tell us about your site',
        ar: 'حدّثنا عن موقعك',
      },
      intro: {
        en: 'Share a location, a rough size and a timeline. We reply within three working days.',
        ar: 'شاركنا الموقع والمساحة التقريبية والجدول الزمني، ونردّ خلال ثلاثة أيام عمل.',
      },
      showDetails: true,
      showSocial: true,
      map: {
        enabled: false,
        query: 'Al Wakra, Qatar',
      },
    },
  },
  {
    id: 'contact-editorial',
    name: {
      en: 'Editorial · Just the details',
      ar: 'افتتاحية · البيانات فقط',
    },
    category: 'contact',
    blockType: 'contact',
    variant: 'minimal',
    tier: 'free',
    fromTemplate: 'editorial',
    animation: {
      entrance: 'fade',
    },
    content: {
      heading: {
        en: 'Commissions and conversations',
        ar: 'للتكليفات والحوارات',
      },
      intro: {
        en: 'Editors, producers and founders with a story worth telling — write to me.',
        ar: 'إلى المحررين والمنتجين والمؤسسين الذين لديهم قصة تستحق أن تُروى: راسلوني.',
      },
      note: {
        en: 'I reply to every pitch within a week.',
        ar: 'أرد على كل مقترح خلال أسبوع.',
      },
      showDetails: true,
      showSocial: true,
    },
  },
  {
    id: 'contact-terminal',
    name: {
      en: 'Terminal · Just the details',
      ar: 'تيرمينال · البيانات فقط',
    },
    category: 'contact',
    blockType: 'contact',
    variant: 'minimal',
    tier: 'free',
    fromTemplate: 'terminal',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: './contact.sh',
        ar: '‎./contact.sh‎',
      },
      heading: {
        en: 'Say hello',
        ar: 'لنتحدث',
      },
      intro: {
        en: 'Have a project, a bug or a job? Email is fastest; I reply within a day.',
        ar: 'لديك مشروع أو خلل برمجي أو فرصة عمل؟ البريد الإلكتروني أسرع وسيلة، وأرد خلال يوم.',
      },
      showDetails: true,
      showSocial: true,
      note: {
        en: 'Usually online 9:00–18:00 (GMT+3).',
        ar: 'متصل عادةً من 9:00 إلى 18:00 (بتوقيت غرينتش +3).',
      },
    },
  },
  {
    id: 'contact-majlis',
    name: {
      en: 'Majlis · Form and map',
      ar: 'مجلس · نموذج وخريطة',
    },
    category: 'contact',
    blockType: 'contact',
    variant: 'split-map',
    tier: 'free',
    fromTemplate: 'majlis',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Contact',
        ar: 'تواصل',
      },
      heading: {
        en: 'Let us discuss your project',
        ar: 'لنتحدث عن مشروعكم',
      },
      intro: {
        en: 'For consultations, speaking invitations or research collaboration, send a short note and my office will respond within two working days.',
        ar: 'للاستشارات أو دعوات المحاضرات أو التعاون البحثي، أرسلوا رسالة موجزة وسيردّ مكتبي خلال يومَي عمل.',
      },
      showDetails: true,
      showSocial: true,
      map: {
        enabled: false,
        query: '',
      },
    },
  },
]
