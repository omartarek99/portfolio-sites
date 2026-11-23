/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const projectsPresets: SectionPreset[] = [
  {
    id: 'projects-aurora',
    name: {
      en: 'Aurora · Alternating rows',
      ar: 'أورورا · صفوف متبادلة',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'alternating',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'parallax',
    },
    content: {
      eyebrow: {
        en: 'Selected work',
        ar: 'أعمال مختارة',
      },
      heading: {
        en: 'Stories I helped tell',
        ar: 'قصص ساعدت في روايتها',
      },
      items: [
        {
          id: 'p1',
          title: {
            en: 'Sahra Coffee rebrand',
            ar: 'إعادة تصميم هوية قهوة صحرا',
          },
          description: {
            en: 'One warm identity for twelve cafés: a new wordmark, packaging and a menu system baristas actually like using.',
            ar: 'هوية دافئة واحدة لاثني عشر مقهى: شعار كتابي جديد وتغليف ونظام قوائم يحب معدّو القهوة استخدامه.',
          },
          image: {
            url: '/stock/food-clay.svg',
            width: 1400,
            height: 1400,
            alt: {
              en: 'Coffee cups and packaging from above',
              ar: 'أكواب قهوة وتغليف من الأعلى',
            },
          },
          client: {
            en: 'Sahra Coffee',
            ar: 'قهوة صحرا',
          },
          year: '2025',
          caseStudy: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'p2',
          title: {
            en: 'Museum night campaign',
            ar: 'حملة ليلة المتاحف',
          },
          description: {
            en: 'Posters, motion and wayfinding for a city-wide night of open museums that drew 18,000 visitors.',
            ar: 'ملصقات ورسوم متحركة ولافتات إرشاد لليلة مفتوحة في متاحف المدينة استقطبت ثمانية عشر ألف زائر.',
          },
          image: {
            url: '/stock/event-dusk.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Evening lights over a museum square',
              ar: 'أضواء مسائية فوق ساحة متحف',
            },
          },
          client: {
            en: 'Doha Culture Week',
            ar: 'أسبوع الدوحة الثقافي',
          },
          year: '2024',
        },
        {
          id: 'p3',
          title: {
            en: 'Wavelength fintech app identity',
            ar: 'هوية تطبيق ويفلينث المالي',
          },
          description: {
            en: 'A calm, confident identity for a savings app — from app icon to onboarding illustrations.',
            ar: 'هوية هادئة وواثقة لتطبيق ادخار، من أيقونة التطبيق حتى رسومات التعريف.',
          },
          image: {
            url: '/stock/app-dusk.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Dark app screens on a desk',
              ar: 'شاشات تطبيق داكنة على مكتب',
            },
          },
          client: {
            en: 'Wavelength',
            ar: 'ويفلينث',
          },
          year: '2023',
        },
      ],
    },
  },
  {
    id: 'projects-bento',
    name: {
      en: 'Bento · Bento',
      ar: 'بينتو · بينتو',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'bento',
    tier: 'free',
    fromTemplate: 'bento',
    style: {
      paddingY: 'md',
      width: 'wide',
    },
    animation: {
      entrance: 'stagger',
    },
    content: {
      items: [
        {
          id: 'bento-intro',
          kind: 'intro',
          size: 'lg',
          label: {
            en: 'Hello, I’m',
            ar: 'مرحبًا، أنا',
          },
          title: {
            en: 'Mona Al-Sayed',
            ar: 'منى السيد',
          },
          description: {
            en: 'Product manager. I turn messy problems into simple products.',
            ar: 'مديرة منتجات. أحوّل المشكلات المعقّدة إلى منتجات بسيطة.',
          },
          image: {
            url: '/stock/portrait-sea.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Mona Al-Sayed',
              ar: 'صورة شخصية لمنى السيد',
            },
          },
          tags: ['Product', 'Research', 'Travel tech'],
        },
        {
          id: 'bento-photo',
          kind: 'photo',
          size: 'tall',
          title: {
            en: 'Weekends on the Corniche',
            ar: 'عطلات نهاية الأسبوع على الكورنيش',
          },
          image: {
            url: '/stock/nature-sea.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Calm sea along the coast',
              ar: 'بحر هادئ على امتداد الساحل',
            },
          },
        },
        {
          id: 'bento-status',
          kind: 'status',
          label: {
            en: 'Currently',
            ar: 'حاليًا',
          },
          title: {
            en: 'PM at Rahal Travel',
            ar: 'مديرة منتج في «رحّال للسفر»',
          },
          description: {
            en: 'Leading the trip-planning team of nine.',
            ar: 'أقود فريق تخطيط الرحلات المؤلف من تسعة أشخاص.',
          },
        },
        {
          id: 'bento-location',
          kind: 'location',
          label: {
            en: 'Based in',
            ar: 'أقيم في',
          },
          title: {
            en: 'Doha, Qatar',
            ar: 'الدوحة، قطر',
          },
        },
        {
          id: 'bento-latest',
          kind: 'project',
          size: 'md',
          label: {
            en: 'Latest',
            ar: 'أحدث عمل',
          },
          title: {
            en: 'Launched trip-planner v2',
            ar: 'إطلاق النسخة الثانية من مخطِّط الرحلات',
          },
          description: {
            en: 'A weekend idea becomes a booked trip in under four minutes — bookings up 38% in the first month.',
            ar: 'فكرة عطلة نهاية الأسبوع تصبح رحلة محجوزة في أقل من أربع دقائق، وارتفعت الحجوزات 38٪ في الشهر الأول.',
          },
          image: {
            url: '/stock/app-sea.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Trip planner dashboard',
              ar: 'لوحة مخطِّط الرحلات',
            },
          },
          link: {
            type: 'url',
            value: 'https://example.com/rahal-planner',
            newTab: true,
          },
          year: '2026',
        },
        {
          id: 'bento-learning',
          kind: 'learning',
          label: {
            en: 'Now learning',
            ar: 'أتعلّم الآن',
          },
          title: {
            en: 'Data analytics',
            ar: 'تحليل البيانات',
          },
          description: {
            en: 'SQL and experiment design, one evening a week.',
            ar: 'لغة SQL وتصميم التجارب، مساءً كل أسبوع.',
          },
        },
        {
          id: 'bento-linkedin',
          kind: 'social',
          platform: 'linkedin',
          handle: 'example-mona-alsayed',
        },
        {
          id: 'bento-x',
          kind: 'social',
          platform: 'x',
          handle: '@example_mona',
        },
        {
          id: 'bento-github',
          kind: 'social',
          platform: 'github',
          handle: 'example-mona',
        },
        {
          id: 'bento-contact',
          kind: 'contact',
          size: 'md',
          label: {
            en: 'Open to coffee chats',
            ar: 'متاحة لفنجان قهوة وحديث',
          },
          title: {
            en: 'Say hi',
            ar: 'قل مرحبًا',
          },
          description: {
            en: 'mona@example.com — I reply within a day.',
            ar: 'mona@example.com — أردّ خلال يوم واحد.',
          },
          link: {
            type: 'email',
            value: 'mona@example.com',
          },
        },
      ],
    },
  },
  {
    id: 'projects-editorial',
    name: {
      en: 'Editorial · Hover-reveal list',
      ar: 'افتتاحية · قائمة تكشف الصور',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'hover-reveal',
    tier: 'free',
    fromTemplate: 'editorial',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Features',
        ar: 'تحقيقات',
      },
      heading: {
        en: 'Featured stories',
        ar: 'قصص مختارة',
      },
      items: [
        {
          id: 'f1',
          title: {
            en: "The quiet rise of Doha's indie game studios",
            ar: 'الصعود الهادئ لاستوديوهات الألعاب المستقلة في الدوحة',
          },
          description: {
            en: 'Six studios, forty developers and a shared office above a car showroom. A long read on the city’s newest creative scene.',
            ar: 'ستة استوديوهات وأربعون مطورًا ومكتب مشترك فوق معرض سيارات. قراءة مطوّلة في أحدث مشهد إبداعي في المدينة.',
          },
          image: {
            url: '/stock/workspace-sand.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'A shared studio desk with sketches',
              ar: 'مكتب استوديو مشترك عليه رسومات',
            },
          },
          client: {
            en: 'The Gulf Review',
            ar: 'مجلة الخليج',
          },
          year: '2026',
          link: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'f2',
          title: {
            en: 'Why Arabic UX writing needs its own rules',
            ar: 'لماذا تحتاج كتابة واجهات الاستخدام العربية إلى قواعدها الخاصة',
          },
          description: {
            en: 'Translated buttons, broken plurals and the gender of “you”: what product teams get wrong, and how to fix it.',
            ar: 'أزرار مترجمة وجموع مكسورة وتذكير المخاطَب وتأنيثه: ما الذي تخطئ فيه فرق المنتجات، وكيف يُصلَح.',
          },
          image: {
            url: '/stock/app-sea.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Interface panels in teal',
              ar: 'لوحات واجهة بلون أخضر مزرق',
            },
          },
          client: {
            en: 'Desert Tech Weekly',
            ar: 'أسبوعية تقنية الصحراء',
          },
          year: '2026',
          link: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'f3',
          title: {
            en: 'Inside a 48-hour startup weekend',
            ar: 'من داخل عطلة نهاية أسبوع لريادة الأعمال مدتها 48 ساعة',
          },
          description: {
            en: 'Ninety strangers, twelve ideas and one very tired jury. I joined a team and stayed until the final pitch.',
            ar: 'تسعون غريبًا واثنتا عشرة فكرة ولجنة تحكيم منهكة. انضممت إلى أحد الفرق وبقيت حتى العرض الأخير.',
          },
          image: {
            url: '/stock/event-sand.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Warm celebration shapes',
              ar: 'أشكال احتفالية دافئة',
            },
          },
          client: {
            en: 'Majaz Magazine',
            ar: 'مجلة مجاز',
          },
          year: '2025',
          link: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'f4',
          title: {
            en: 'The last bookbinder of Souq Waqif',
            ar: 'آخر مجلّد كتب في سوق واقف',
          },
          description: {
            en: 'A portrait of a craft that refuses to go digital, and the apprentice who might keep it alive.',
            ar: 'صورة قلمية لحرفة ترفض التحول الرقمي، وللمتدرّب الذي قد يبقيها حية.',
          },
          image: {
            url: '/stock/interior-clay.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'A warm workshop interior',
              ar: 'ورشة دافئة من الداخل',
            },
          },
          client: {
            en: 'The Gulf Review',
            ar: 'مجلة الخليج',
          },
          year: '2025',
          link: {
            type: 'none',
            value: '',
          },
        },
      ],
    },
  },
  {
    id: 'projects-grid-pop',
    name: {
      en: 'Grid Pop · Grid',
      ar: 'جريد بوب · شبكة',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'grid',
    tier: 'free',
    fromTemplate: 'grid-pop',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Selected work',
        ar: 'أعمال مختارة',
      },
      heading: {
        en: 'Projects',
        ar: 'المشاريع',
      },
      intro: {
        en: 'Apps and dashboards I have designed end to end.',
        ar: 'تطبيقات ولوحات صمّمتها من الفكرة حتى الإطلاق.',
      },
      columns: '3',
      items: [
        {
          id: 'qareeb',
          title: {
            en: 'Qareeb delivery app',
            ar: 'تطبيق «قريب» للتوصيل',
          },
          description: {
            en: 'Ordering from the corner shop in one minute flat.',
            ar: 'الطلب من بقالة الحيّ في دقيقة واحدة.',
          },
          image: {
            url: '/stock/app-sea.svg',
            alt: {
              en: 'Qareeb app screens',
              ar: 'شاشات تطبيق قريب',
            },
            width: 1920,
            height: 1080,
          },
          tags: ['Mobile', 'Research', 'Design system'],
          caseStudy: {
            type: 'none',
            value: '',
          },
          year: '2025',
        },
        {
          id: 'souq',
          title: {
            en: 'Souq dashboard redesign',
            ar: 'إعادة تصميم لوحة «سوق»',
          },
          description: {
            en: 'Forty charts became three clear answers for sellers.',
            ar: 'أربعون رسمًا بيانيًا صارت ثلاث إجابات واضحة للبائعين.',
          },
          image: {
            url: '/stock/app-slate.svg',
            alt: {
              en: 'Souq seller dashboard',
              ar: 'لوحة البائع في سوق',
            },
            width: 1600,
            height: 1067,
          },
          tags: ['Web app', 'Data', 'RTL'],
          caseStudy: {
            type: 'none',
            value: '',
          },
          year: '2024',
        },
        {
          id: 'plantly',
          title: {
            en: 'Plantly — habit tracker',
            ar: 'Plantly — متتبّع العادات',
          },
          description: {
            en: 'A habit app where your streak grows a tiny garden.',
            ar: 'تطبيق عادات تنمو فيه حديقة صغيرة مع كل يوم تلتزم فيه.',
          },
          image: {
            url: '/stock/nature-olive.svg',
            alt: {
              en: 'Green hills illustration for Plantly',
              ar: 'رسم تلال خضراء لتطبيق Plantly',
            },
            width: 1600,
            height: 1067,
          },
          tags: ['Side project', 'Motion'],
          link: {
            type: 'url',
            value: 'https://example.com/plantly',
            newTab: true,
          },
          year: '2024',
        },
        {
          id: 'masar',
          title: {
            en: 'Masar transit planner',
            ar: 'مخطّط رحلات «مسار»',
          },
          description: {
            en: 'Metro, bus and taxi in one bilingual journey planner.',
            ar: 'المترو والحافلة وسيارة الأجرة في مخطّط رحلات واحد بلغتين.',
          },
          image: {
            url: '/stock/city-slate.svg',
            alt: {
              en: 'City skyline for Masar',
              ar: 'أفق المدينة لتطبيق مسار',
            },
            width: 1600,
            height: 1067,
          },
          tags: ['Mobile', 'Maps'],
          year: '2023',
        },
        {
          id: 'tala',
          title: {
            en: 'Tala onboarding',
            ar: 'تسجيل الدخول في «تالا»',
          },
          description: {
            en: 'Opening a bank account in under four minutes.',
            ar: 'فتح حساب مصرفي في أقل من أربع دقائق.',
          },
          image: {
            url: '/stock/art-sea.svg',
            alt: {
              en: 'Abstract shapes for Tala',
              ar: 'أشكال تجريدية لتالا',
            },
            width: 1600,
            height: 1067,
          },
          tags: ['Fintech', 'Forms'],
          year: '2023',
        },
        {
          id: 'dukkan',
          title: {
            en: 'Dukkan design system',
            ar: 'نظام تصميم «دكّان»',
          },
          description: {
            en: '120 components, documented in Arabic and English.',
            ar: '120 مكوّنًا موثّقًا بالعربية والإنجليزية.',
          },
          image: {
            url: '/stock/art-blush.svg',
            alt: {
              en: 'Colourful component tiles',
              ar: 'مربعات مكوّنات ملوّنة',
            },
            width: 1400,
            height: 1400,
          },
          tags: ['Design system', 'Docs'],
          year: '2022',
        },
      ],
    },
  },
  {
    id: 'projects-launch',
    name: {
      en: 'Launch · Bento',
      ar: 'إطلاق · بينتو',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'bento',
    tier: 'free',
    fromTemplate: 'launch',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Case studies',
        ar: 'دراسات حالة',
      },
      heading: {
        en: 'Results',
        ar: 'النتائج',
      },
      intro: {
        en: 'Numbers my clients measured themselves, in the first months after launch.',
        ar: 'أرقام قاسها عملائي بأنفسهم في الأشهر الأولى بعد الإطلاق.',
      },
      items: [
        {
          id: 'bayt-bakery',
          size: 'lg',
          title: {
            en: 'Bayt Bakery — online orders up 3×',
            ar: 'مخبز بيت: الطلبات الإلكترونية تضاعفت ثلاث مرات',
          },
          description: {
            en: 'A bilingual ordering site with next-morning pickup slots, replacing a busy Instagram inbox.',
            ar: 'موقع طلبات باللغتين مع مواعيد استلام صباح اليوم التالي، بدلًا من صندوق رسائل مزدحم على إنستغرام.',
          },
          image: {
            url: '/stock/food-clay.svg',
            width: 1400,
            height: 1400,
            alt: {
              en: 'Fresh bread on a clay plate',
              ar: 'خبز طازج على طبق فخاري',
            },
          },
          tags: ['Strategy', 'E-commerce'],
          year: '2026',
          client: {
            en: 'Bayt Bakery',
            ar: 'مخبز بيت',
          },
          link: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'linguakids',
          size: 'md',
          title: {
            en: 'LinguaKids — 1,200 sign-ups in launch month',
            ar: 'لينغوا كيدز: 1,200 تسجيل في شهر الإطلاق',
          },
          description: {
            en: 'A playful landing page and trial-class funnel for an Arabic–English language school for children.',
            ar: 'صفحة هبوط مرحة ومسار حجز حصة تجريبية لمدرسة لغات للأطفال بالعربية والإنجليزية.',
          },
          image: {
            url: '/stock/art-blush.svg',
            width: 1400,
            height: 1400,
            alt: {
              en: 'Colourful abstract shapes',
              ar: 'أشكال تجريدية ملوّنة',
            },
          },
          tags: ['Landing page'],
          year: '2025',
          client: {
            en: 'LinguaKids',
            ar: 'لينغوا كيدز',
          },
        },
        {
          id: 'falcon-fitness',
          size: 'md',
          title: {
            en: 'Falcon Fitness — booking rate doubled',
            ar: 'فالكون فتنس: معدّل الحجز تضاعف',
          },
          description: {
            en: 'A conversion audit and new class timetable that halved the steps to book a session.',
            ar: 'تدقيق لمعدّل التحويل وجدول حصص جديد اختصر خطوات الحجز إلى النصف.',
          },
          image: {
            url: '/stock/app-sea.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Booking dashboard in teal',
              ar: 'لوحة حجوزات بدرجات الأزرق المخضر',
            },
          },
          tags: ['Audit', 'UX'],
          year: '2025',
          client: {
            en: 'Falcon Fitness',
            ar: 'فالكون فتنس',
          },
        },
        {
          id: 'dar-al-tibb',
          size: 'sm',
          title: {
            en: 'Dar Al Tibb — 2.5× online appointments',
            ar: 'دار الطب: المواعيد الإلكترونية زادت 2.5 مرة',
          },
          description: {
            en: 'A calm, trustworthy clinic site with doctors’ profiles and same-day booking.',
            ar: 'موقع هادئ يبعث على الثقة لعيادة، مع ملفات للأطباء وحجز في اليوم نفسه.',
          },
          image: {
            url: '/stock/app-slate.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Clinic website screens',
              ar: 'شاشات موقع العيادة',
            },
          },
          tags: ['Website'],
          year: '2024',
          client: {
            en: 'Dar Al Tibb Clinic',
            ar: 'عيادة دار الطب',
          },
        },
        {
          id: 'qahwa-corner',
          size: 'sm',
          title: {
            en: 'Qahwa Corner — +40% catering enquiries',
            ar: 'ركن القهوة: طلبات الضيافة زادت 40%',
          },
          description: {
            en: 'A catering page with a quote form that sales answers on WhatsApp the same day.',
            ar: 'صفحة للضيافة مع نموذج عرض سعر يردّ عليه فريق المبيعات عبر واتساب في اليوم نفسه.',
          },
          image: {
            url: '/stock/workspace-sand.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Coffee and notes on a desk',
              ar: 'قهوة وملاحظات على مكتب',
            },
          },
          tags: ['Landing page'],
          year: '2024',
          client: {
            en: 'Qahwa Corner',
            ar: 'ركن القهوة',
          },
        },
      ],
      cta: {
        label: {
          en: 'All case studies',
          ar: 'كل دراسات الحالة',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'outline',
        icon: 'arrow-right',
      },
    },
  },
  {
    id: 'projects-blueprint',
    name: {
      en: 'Blueprint · Alternating rows',
      ar: 'المخطط · صفوف متبادلة',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'alternating',
    tier: 'free',
    fromTemplate: 'blueprint',
    animation: {
      entrance: 'reveal-mask',
    },
    content: {
      eyebrow: {
        en: '01 — Selected projects',
        ar: '01 — مشاريع مختارة',
      },
      heading: {
        en: 'Built work',
        ar: 'أعمال منفّذة',
      },
      intro: {
        en: 'Three recent projects, from a family house to a desert pavilion.',
        ar: 'ثلاثة مشاريع حديثة، من بيت عائلي إلى جناح في الصحراء.',
      },
      items: [
        {
          id: 'courtyard-house',
          title: {
            en: 'Courtyard House, Al Wakra',
            ar: 'بيت الفناء، الوكرة',
          },
          description: {
            en: 'A family home organised around a shaded courtyard, with deep walls and a wind-catcher that cools the rooms without machines for half the year.',
            ar: 'بيت عائلي يلتفّ حول فناء مظلَّل، بجدران سميكة وملقف هواء يبرّد الغرف دون أجهزة لنصف العام.',
          },
          image: {
            url: '/stock/interior-clay.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Courtyard seen through a tall timber screen',
              ar: 'الفناء من خلف مشربية خشبية عالية',
            },
          },
          tags: ['Residential', '640 m²'],
          year: '2025',
          client: {
            en: 'Private client',
            ar: 'عميل خاص',
          },
          category: 'residential',
          caseStudy: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'lusail-cowork',
          title: {
            en: 'Lusail co-working floor',
            ar: 'طابق العمل المشترك، لوسيل',
          },
          description: {
            en: 'An open office floor for 180 people, divided by planted screens and pale oak, with quiet rooms along the façade.',
            ar: 'طابق مكتبي مفتوح يتسع لـ180 شخصًا، تقسمه حواجز نباتية وخشب بلوط فاتح، مع غرف هادئة بمحاذاة الواجهة.',
          },
          image: {
            url: '/stock/workspace-slate.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Long oak desks under a slatted ceiling',
              ar: 'مكاتب طويلة من خشب البلوط تحت سقف شرائحي',
            },
          },
          tags: ['Workplace', '2,400 m²'],
          year: '2024',
          client: {
            en: 'Marina Works',
            ar: 'مارينا ووركس',
          },
          category: 'workplace',
        },
        {
          id: 'desert-pavilion',
          title: {
            en: 'Desert retreat pavilion',
            ar: 'جناح الاستراحة الصحراوي',
          },
          description: {
            en: 'A rammed-earth pavilion near the dunes, lifted off the sand, framing the sunset through one long opening.',
            ar: 'جناح من التراب المدكوك قرب الكثبان، مرفوع عن الرمل، يؤطّر الغروب من خلال فتحة طويلة واحدة.',
          },
          image: {
            url: '/stock/nature-sand.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Low pavilion against the dunes at dusk',
              ar: 'جناح منخفض أمام الكثبان عند الغروب',
            },
          },
          tags: ['Hospitality', '320 m²'],
          year: '2023',
          client: {
            en: 'Sealine Retreats',
            ar: 'منتجعات سيلين',
          },
          category: 'hospitality',
        },
      ],
      cta: {
        label: {
          en: 'All projects',
          ar: 'كل المشاريع',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'outline',
        icon: 'arrow-right',
      },
    },
  },
  {
    id: 'projects-terminal',
    name: {
      en: 'Terminal · Grid',
      ar: 'تيرمينال · شبكة',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'grid',
    tier: 'free',
    fromTemplate: 'terminal',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: '~/projects',
        ar: '‎~/projects‎',
      },
      heading: {
        en: 'Things I have shipped',
        ar: 'ما أطلقته من مشاريع',
      },
      intro: {
        en: 'Open-source tools and products for learners and teachers. Stars are from GitHub.',
        ar: 'أدوات مفتوحة المصدر ومنتجات للمتعلّمين والمعلّمين. النجوم من GitHub.',
      },
      columns: '3',
      items: [
        {
          id: 'reellearn',
          title: {
            en: 'ReelLearn — short-video learning platform',
            ar: 'ReelLearn — منصة تعلّم بالفيديو القصير',
          },
          description: {
            en: 'Bite-sized lessons in a vertical feed, with quizzes between clips and progress that syncs across devices. 12k learners in the pilot. ★ 1.2k',
            ar: 'دروس قصيرة في شريط عمودي، مع اختبارات بين المقاطع وتقدّم يتزامن بين الأجهزة. 12 ألف متعلّم في المرحلة التجريبية. ★ 1.2k',
          },
          image: {
            url: '/stock/app-dusk.svg',
            alt: {
              en: 'ReelLearn feed on a phone screen',
              ar: 'شريط ReelLearn على شاشة هاتف',
            },
            width: 1600,
            height: 1067,
          },
          tags: ['TypeScript', 'React Native', 'Node.js', 'MongoDB'],
          year: '2025',
          link: {
            type: 'url',
            value: 'https://example.com/github/omarfarouk/reellearn',
            newTab: true,
          },
          caseStudy: {
            type: 'anchor',
            value: 'work',
          },
        },
        {
          id: 'quizforge',
          title: {
            en: 'QuizForge — exam generator API',
            ar: 'QuizForge — واجهة برمجية لتوليد الاختبارات',
          },
          description: {
            en: 'A REST API that turns a syllabus into balanced exams with answer keys, difficulty tags and printable PDFs. ★ 840',
            ar: 'واجهة REST تحوّل المنهج إلى اختبارات متوازنة مع مفاتيح الإجابة ومستويات الصعوبة وملفات PDF جاهزة للطباعة. ★ 840',
          },
          image: {
            url: '/stock/app-sea.svg',
            alt: {
              en: 'QuizForge API dashboard',
              ar: 'لوحة تحكم QuizForge',
            },
            width: 1920,
            height: 1080,
          },
          tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
          year: '2024',
          link: {
            type: 'url',
            value: 'https://example.com/github/omarfarouk/quizforge',
            newTab: true,
          },
        },
        {
          id: 'arabic-utils',
          title: {
            en: 'arabic-text-utils (open source)',
            ar: 'arabic-text-utils (مفتوحة المصدر)',
          },
          description: {
            en: 'Normalise, search and slugify Arabic text: diacritics, tatweel, alef variants and Arabic-Indic digits. Used by 300+ repos. ★ 2.4k',
            ar: 'توحيد النص العربي والبحث فيه وتحويله إلى روابط: التشكيل والتطويل وأشكال الألف والأرقام الهندية. تستخدمها أكثر من 300 مستودع. ★ 2.4k',
          },
          image: {
            url: '/stock/workspace-dusk.svg',
            alt: {
              en: 'Code editor at night',
              ar: 'محرر الشيفرة ليلًا',
            },
            width: 1600,
            height: 1067,
          },
          tags: ['TypeScript', 'npm', 'Open source'],
          year: '2023',
          link: {
            type: 'url',
            value: 'https://example.com/github/omarfarouk/arabic-text-utils',
            newTab: true,
          },
        },
      ],
      cta: {
        label: {
          en: 'cd projects/',
          ar: '‎cd projects/‎',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'outline',
      },
    },
  },
  {
    id: 'projects-motion-reel',
    name: {
      en: 'Motion Reel · Grid',
      ar: 'موشن ريل · شبكة',
    },
    category: 'work',
    blockType: 'projects',
    variant: 'grid',
    tier: 'free',
    fromTemplate: 'motion-reel',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Selected work',
        ar: 'أعمال مختارة',
      },
      heading: {
        en: 'Recent films',
        ar: 'أحدث الأفلام',
      },
      columns: '3',
      items: [
        {
          id: 'p-corniche',
          title: {
            en: 'Corniche Run',
            ar: 'جري الكورنيش',
          },
          description: {
            en: 'A 60-second spot for a sports brand, shot at sunrise along the waterfront.',
            ar: 'إعلان مدته 60 ثانية لعلامة رياضية، صُوّر عند الشروق على الواجهة البحرية.',
          },
          image: {
            url: '/stock/city-dusk.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Waterfront skyline at dawn',
              ar: 'أفق الواجهة البحرية عند الفجر',
            },
          },
          client: {
            en: 'Sports brand spot',
            ar: 'إعلان علامة رياضية',
          },
          year: '2026',
          tags: ['Direction', 'Edit', 'Grade'],
          caseStudy: {
            type: 'none',
            value: '',
          },
        },
        {
          id: 'p-gala',
          title: {
            en: 'Gala Night Highlights',
            ar: 'أبرز لحظات ليلة الحفل',
          },
          description: {
            en: 'Three cameras, one night, a two-minute film delivered by the next morning.',
            ar: 'ثلاث كاميرات وليلة واحدة، وفيلم من دقيقتين سُلّم في صباح اليوم التالي.',
          },
          image: {
            url: '/stock/event-dusk.svg',
            width: 1920,
            height: 1080,
            alt: {
              en: 'Evening celebration lights',
              ar: 'أضواء احتفال مسائي',
            },
          },
          client: {
            en: 'Event film',
            ar: 'فيلم مناسبة',
          },
          year: '2025',
          tags: ['Multi-cam', 'Same-day edit'],
        },
        {
          id: 'p-smartgrid',
          title: {
            en: 'Explainer: SmartGrid',
            ar: 'فيلم تعريفي: سمارت جريد',
          },
          description: {
            en: 'A 90-second motion graphics explainer for an energy start-up.',
            ar: 'فيلم موشن جرافيك تعريفي مدته 90 ثانية لشركة طاقة ناشئة.',
          },
          image: {
            url: '/stock/app-dusk.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Dark interface panels',
              ar: 'واجهات رقمية داكنة',
            },
          },
          client: {
            en: 'Motion graphics',
            ar: 'موشن جرافيك',
          },
          year: '2025',
          tags: ['2D animation', 'Sound design'],
        },
        {
          id: 'p-studio',
          title: {
            en: 'Studio Sessions',
            ar: 'جلسات الاستوديو',
          },
          description: {
            en: 'A twelve-episode interview series lit and shot in one studio day.',
            ar: 'سلسلة مقابلات من اثنتي عشرة حلقة، أُضيئت وصُوّرت في يوم استوديو واحد.',
          },
          image: {
            url: '/stock/workspace-dusk.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'A dark studio desk lit by a screen',
              ar: 'مكتب استوديو داكن يضيئه وهج الشاشة',
            },
          },
          client: {
            en: 'Interview series',
            ar: 'سلسلة مقابلات',
          },
          year: '2024',
          tags: ['Lighting', 'Multi-cam'],
        },
        {
          id: 'p-souq',
          title: {
            en: 'Faces of the Souq',
            ar: 'وجوه السوق',
          },
          description: {
            en: 'A short documentary portrait of four traders in the old market.',
            ar: 'فيلم وثائقي قصير يرسم صورة أربعة تجّار في السوق القديم.',
          },
          image: {
            url: '/stock/portrait-dusk.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait at dusk',
              ar: 'صورة شخصية عند الغروب',
            },
          },
          client: {
            en: 'Documentary short',
            ar: 'وثائقي قصير',
          },
          year: '2024',
          tags: ['Documentary', 'Sound'],
        },
        {
          id: 'p-towers',
          title: {
            en: 'Glass Towers',
            ar: 'أبراج الزجاج',
          },
          description: {
            en: 'A brand film for a property developer, built on time-lapse and slow aerials.',
            ar: 'فيلم هوية لمطوّر عقاري، مبني على التصوير المتسارع واللقطات الجوية البطيئة.',
          },
          image: {
            url: '/stock/city-slate.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Desert city towers in daylight',
              ar: 'أبراج مدينة صحراوية في النهار',
            },
          },
          client: {
            en: 'Brand film',
            ar: 'فيلم هوية',
          },
          year: '2023',
          tags: ['Time-lapse', 'Aerial'],
        },
      ],
      cta: {
        label: {
          en: 'All work',
          ar: 'كل الأعمال',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'outline',
      },
    },
  },
]
