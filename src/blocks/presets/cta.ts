/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const ctaPresets: SectionPreset[] = [
  {
    id: 'cta-aurora',
    name: {
      en: 'Aurora · Gradient band',
      ar: 'أورورا · شريط متدرّج',
    },
    category: 'sell',
    blockType: 'cta',
    variant: 'gradient',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'zoom',
    },
    content: {
      heading: {
        en: "Have a story to tell? Let's talk.",
        ar: 'لديك قصة ترويها؟ لنتحدث.',
      },
      intro: {
        en: 'I take on two new identity projects each quarter. Tell me about yours.',
        ar: 'أتولى مشروعَي هوية جديدين كل ربع سنة. أخبرني عن مشروعك.',
      },
      primaryCta: {
        label: {
          en: 'Start a conversation',
          ar: 'ابدأ المحادثة',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        style: 'primary',
        icon: 'arrow-right',
      },
    },
  },
  {
    id: 'cta-blueprint',
    name: {
      en: 'Blueprint · Sticky banner',
      ar: 'المخطط · شريط مثبّت',
    },
    category: 'sell',
    blockType: 'cta',
    variant: 'banner',
    tier: 'free',
    fromTemplate: 'blueprint',
    animation: {
      entrance: 'fade',
    },
    content: {
      heading: {
        en: 'Have a site in mind?',
        ar: 'لديك موقع في ذهنك؟',
      },
      intro: {
        en: 'We take on four new projects a year.',
        ar: 'نستقبل أربعة مشاريع جديدة كل عام.',
      },
      primaryCta: {
        label: {
          en: 'Start a project',
          ar: 'ابدأ مشروعًا',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        icon: 'arrow-right',
      },
    },
  },
  {
    id: 'cta-motion-reel',
    name: {
      en: 'Motion Reel · With image',
      ar: 'موشن ريل · مع صورة',
    },
    category: 'sell',
    blockType: 'cta',
    variant: 'with-image',
    tier: 'free',
    fromTemplate: 'motion-reel',
    animation: {
      entrance: 'zoom',
    },
    content: {
      heading: {
        en: "Let's make your next film",
        ar: 'لنصنع فيلمك القادم',
      },
      intro: {
        en: "Tell me about your idea, your date and your audience. I'll come back with a plan within 48 hours.",
        ar: 'أخبرني بفكرتك وموعدك وجمهورك، وسأعود إليك بخطة خلال 48 ساعة.',
      },
      primaryCta: {
        label: {
          en: 'Start a project',
          ar: 'ابدأ مشروعًا',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        style: 'primary',
      },
      secondaryCta: {
        label: {
          en: 'WhatsApp me',
          ar: 'راسلني على واتساب',
        },
        link: {
          type: 'whatsapp',
          value: '+971555012345',
        },
        style: 'outline',
      },
      image: {
        url: '/stock/art-ink.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Abstract frame in ink tones',
          ar: 'لقطة تجريدية بدرجات الحبر',
        },
      },
    },
  },
  {
    id: 'cta-grid-pop',
    name: {
      en: 'Grid Pop · Simple',
      ar: 'جريد بوب · بسيط',
    },
    category: 'sell',
    blockType: 'cta',
    variant: 'simple',
    tier: 'free',
    fromTemplate: 'grid-pop',
    style: {
      background: {
        type: 'secondary',
      },
    },
    animation: {
      entrance: 'zoom',
    },
    content: {
      heading: {
        en: 'Let’s make something loud',
        ar: 'لنصنع شيئًا لافتًا',
      },
      intro: {
        en: 'Got an app that needs more joy and fewer taps? I have room for one new project this spring.',
        ar: 'لديك تطبيق يحتاج إلى متعة أكثر ولمسات أقل؟ لديّ متّسع لمشروع جديد واحد هذا الربيع.',
      },
      primaryCta: {
        label: {
          en: 'Say hello',
          ar: 'قل مرحبًا',
        },
        link: {
          type: 'email',
          value: 'khalid@example.com',
        },
      },
      secondaryCta: {
        label: {
          en: 'See case studies',
          ar: 'دراسات الحالة',
        },
        link: {
          type: 'none',
          value: '',
        },
      },
    },
  },
  {
    id: 'cta-creator-hub',
    name: {
      en: 'Creator Hub · Gradient band',
      ar: 'مركز صانع المحتوى · شريط متدرّج',
    },
    category: 'sell',
    blockType: 'cta',
    variant: 'gradient',
    tier: 'free',
    fromTemplate: 'creator-hub',
    animation: {
      entrance: 'zoom',
    },
    content: {
      eyebrow: {
        en: 'Booking for spring 2027',
        ar: 'الحجز مفتوح لربيع 2027',
      },
      heading: {
        en: 'Have a product people should cook with?',
        ar: 'لديك منتج يستحق أن يُطبخ به؟',
      },
      intro: {
        en: 'Send a short brief and your dates. I’ll reply with ideas and availability.',
        ar: 'أرسل موجزًا قصيرًا ومواعيدك، وسأردّ بأفكار ومواعيد متاحة.',
      },
      primaryCta: {
        label: {
          en: 'Send a brief',
          ar: 'أرسل موجزًا',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        icon: 'send',
      },
      secondaryCta: {
        label: {
          en: 'Download media kit',
          ar: 'حمّل الملف الإعلامي',
        },
        link: {
          type: 'url',
          value: 'https://example.com/reemcooks-media-kit.pdf',
          newTab: true,
        },
        style: 'outline',
        icon: 'download',
      },
    },
  },
]
