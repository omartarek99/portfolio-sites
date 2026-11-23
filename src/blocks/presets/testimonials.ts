/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const testimonialsPresets: SectionPreset[] = [
  {
    id: 'testimonials-aurora',
    name: {
      en: 'Aurora · Single big quote',
      ar: 'أورورا · اقتباس كبير واحد',
    },
    category: 'social-proof',
    blockType: 'testimonials',
    variant: 'single',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'fade',
    },
    content: {
      heading: {
        en: 'Kind words',
        ar: 'كلمات طيبة',
      },
      items: [
        {
          id: 't1',
          quote: {
            en: "Layla gave our brand a personality we didn't know we had.",
            ar: 'منحت ليلى علامتنا شخصية لم نكن نعرف أننا نملكها.',
          },
          name: {
            en: 'Omar K.',
            ar: 'عمر ك.',
          },
          role: {
            en: 'Founder, Sahra Coffee',
            ar: 'مؤسس قهوة صحرا',
          },
        },
        {
          id: 't2',
          quote: {
            en: 'She listened to forty curators and somehow made one campaign everyone felt was theirs.',
            ar: 'أصغت إلى أربعين قيّمًا، ثم صنعت حملة واحدة شعر كل منهم أنها تخصه.',
          },
          name: {
            en: 'Mariam S.',
            ar: 'مريم س.',
          },
          role: {
            en: 'Programme Director, Doha Culture Week',
            ar: 'مديرة البرامج، أسبوع الدوحة الثقافي',
          },
        },
        {
          id: 't3',
          quote: {
            en: 'Our app finally looks as trustworthy as the product behind it.',
            ar: 'أخيرًا صار تطبيقنا يبدو جديرًا بالثقة مثل المنتج الذي يقف خلفه.',
          },
          name: {
            en: 'Karim A.',
            ar: 'كريم أ.',
          },
          role: {
            en: 'CEO, Wavelength',
            ar: 'الرئيس التنفيذي، ويفلينث',
          },
        },
      ],
      autoplay: true,
    },
  },
  {
    id: 'testimonials-bloom-coach',
    name: {
      en: 'Bloom Coach · Carousel',
      ar: 'بلوم كوتش · شريط متحرك',
    },
    category: 'social-proof',
    blockType: 'testimonials',
    variant: 'carousel',
    tier: 'free',
    fromTemplate: 'bloom-coach',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Kind words',
        ar: 'كلمات طيبة',
      },
      heading: {
        en: 'What clients say',
        ar: 'ماذا يقول العملاء',
      },
      items: [
        {
          id: 'bloom-t-1',
          quote: {
            en: 'After two sessions I finally knew how to present myself in interviews.',
            ar: 'بعد جلستين فقط عرفتُ أخيرًا كيف أقدّم نفسي في المقابلات.',
          },
          name: {
            en: 'Dana',
            ar: 'دانة',
          },
          role: {
            en: 'Teacher',
            ar: 'معلّمة',
          },
          rating: 5,
          photo: {
            url: '/stock/portrait-sand.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Dana',
              ar: 'صورة دانة',
            },
          },
        },
        {
          id: 'bloom-t-2',
          quote: {
            en: 'Hana helped me turn three years of volunteering into a CV that got me two offers.',
            ar: 'ساعدتني هناء على تحويل ثلاث سنوات من العمل التطوعي إلى سيرة ذاتية أوصلتني إلى عرضين وظيفيين.',
          },
          name: {
            en: 'Yousef',
            ar: 'يوسف',
          },
          role: {
            en: 'Engineering graduate',
            ar: 'خريج هندسة',
          },
          rating: 5,
          photo: {
            url: '/stock/portrait-olive.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Yousef',
              ar: 'صورة يوسف',
            },
          },
        },
        {
          id: 'bloom-t-3',
          quote: {
            en: 'Kind, practical and honest. I left every session with something I could do the same day.',
            ar: 'لطيفة وعملية وصريحة. كنت أخرج من كل جلسة بخطوة أستطيع تنفيذها في اليوم نفسه.',
          },
          name: {
            en: 'Maryam',
            ar: 'مريم',
          },
          role: {
            en: 'Moving from teaching to training',
            ar: 'تنتقل من التدريس إلى التدريب',
          },
          rating: 5,
          photo: {
            url: '/stock/portrait-clay.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Maryam',
              ar: 'صورة مريم',
            },
          },
        },
        {
          id: 'bloom-t-4',
          quote: {
            en: 'The group workshop gave our new teachers a confidence boost we still talk about.',
            ar: 'منحت الورشة الجماعية معلّمينا الجدد دفعة من الثقة ما زلنا نتحدث عنها.',
          },
          name: {
            en: 'Khalid',
            ar: 'خالد',
          },
          role: {
            en: 'School principal',
            ar: 'مدير مدرسة',
          },
          rating: 5,
          photo: {
            url: '/stock/portrait-slate.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Khalid',
              ar: 'صورة خالد',
            },
          },
        },
      ],
      autoplay: true,
    },
  },
  {
    id: 'testimonials-launch',
    name: {
      en: 'Launch · Wall',
      ar: 'إطلاق · جدار',
    },
    category: 'social-proof',
    blockType: 'testimonials',
    variant: 'wall',
    tier: 'free',
    fromTemplate: 'launch',
    style: {
      background: {
        type: 'surface',
      },
    },
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Kind words',
        ar: 'كلمات طيبة',
      },
      heading: {
        en: 'Owners who launched with me',
        ar: 'أصحاب مشاريع انطلقوا معي',
      },
      items: [
        {
          id: 't1',
          rating: 5,
          quote: {
            en: 'We stopped taking orders by DM. Three times the orders, and I finally sleep before midnight.',
            ar: 'توقفنا عن استقبال الطلبات عبر الرسائل الخاصة. تضاعفت الطلبات ثلاث مرات، وصرت أنام قبل منتصف الليل أخيرًا.',
          },
          name: {
            en: 'Reem Al-Saadi',
            ar: 'ريم السعدي',
          },
          role: {
            en: 'Owner, Bayt Bakery',
            ar: 'صاحبة مخبز بيت',
          },
          photo: {
            url: '/stock/portrait-blush.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Reem Al-Saadi',
              ar: 'صورة ريم السعدي',
            },
          },
        },
        {
          id: 't2',
          rating: 5,
          quote: {
            en: 'Sara wrote our Arabic copy better than we could. 1,200 families signed up in the first month.',
            ar: 'كتبت سارة محتوانا العربي أفضل مما كنا سنكتبه. سجّلت 1,200 عائلة في الشهر الأول.',
          },
          name: {
            en: 'Khalid Nasser',
            ar: 'خالد ناصر',
          },
          role: {
            en: 'Founder, LinguaKids',
            ar: 'مؤسس لينغوا كيدز',
          },
          photo: {
            url: '/stock/portrait-sand.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Khalid Nasser',
              ar: 'صورة خالد ناصر',
            },
          },
        },
        {
          id: 't3',
          rating: 5,
          quote: {
            en: 'The audit was a to-do list we could act on the same week. Bookings doubled by the next month.',
            ar: 'كان التدقيق قائمة مهام بدأنا تنفيذها في الأسبوع نفسه، وتضاعفت الحجوزات في الشهر التالي.',
          },
          name: {
            en: 'Mona Al-Kuwari',
            ar: 'منى الكواري',
          },
          role: {
            en: 'Manager, Falcon Fitness',
            ar: 'مديرة فالكون فتنس',
          },
          photo: {
            url: '/stock/portrait-clay.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Mona Al-Kuwari',
              ar: 'صورة منى الكواري',
            },
          },
        },
        {
          id: 't4',
          rating: 5,
          quote: {
            en: 'Clear prices, clear dates, and a launch on the exact day she promised.',
            ar: 'أسعار واضحة ومواعيد واضحة، وإطلاق في اليوم الذي وعدت به تمامًا.',
          },
          name: {
            en: 'Dr. Hani Barakat',
            ar: 'د. هاني بركات',
          },
          role: {
            en: 'Director, Dar Al Tibb Clinic',
            ar: 'مدير عيادة دار الطب',
          },
        },
        {
          id: 't5',
          rating: 5,
          quote: {
            en: 'Our catering page now pays for itself every single week.',
            ar: 'صفحة الضيافة صارت تغطي تكلفتها كل أسبوع.',
          },
          name: {
            en: 'Yaser Haidar',
            ar: 'ياسر حيدر',
          },
          role: {
            en: 'Co-founder, Qahwa Corner',
            ar: 'شريك مؤسس في ركن القهوة',
          },
          photo: {
            url: '/stock/portrait-slate.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Yaser Haidar',
              ar: 'صورة ياسر حيدر',
            },
          },
        },
        {
          id: 't6',
          rating: 4,
          quote: {
            en: 'She asked about our customers before our colours. That is why it works.',
            ar: 'سألت عن عملائنا قبل أن تسأل عن ألواننا، ولهذا نجح الموقع.',
          },
          name: {
            en: 'Lina Farouk',
            ar: 'لينا فاروق',
          },
          role: {
            en: 'Owner, Noor Florist',
            ar: 'صاحبة زهور نور',
          },
        },
      ],
    },
  },
  {
    id: 'testimonials-creator-hub',
    name: {
      en: 'Creator Hub · Wall',
      ar: 'مركز صانع المحتوى · جدار',
    },
    category: 'social-proof',
    blockType: 'testimonials',
    variant: 'wall',
    tier: 'free',
    fromTemplate: 'creator-hub',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'From partners',
        ar: 'من الشركاء',
      },
      heading: {
        en: 'What brands say',
        ar: 'ماذا تقول العلامات',
      },
      items: [
        {
          id: 't1',
          quote: {
            en: 'Reem’s date-syrup series sold out our Ramadan stock in nine days.',
            ar: 'سلسلة ريم مع دبس التمر أنفدت مخزوننا الرمضاني في تسعة أيام.',
          },
          name: {
            en: 'Salma Al-Harthy',
            ar: 'سلمى الحارثي',
          },
          role: {
            en: 'Marketing lead, Nakhla Dates',
            ar: 'مسؤولة التسويق، تمور نخلة',
          },
          photo: {
            url: '/stock/portrait-sand.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Salma Al-Harthy',
              ar: 'صورة سلمى الحارثي',
            },
          },
          rating: 5,
        },
        {
          id: 't2',
          quote: {
            en: 'Her audience actually cooks. Our spice mix saves tripled after one Reel.',
            ar: 'جمهورها يطبخ فعلًا. تضاعف حفظ خلطة بهاراتنا ثلاث مرات بعد ريلز واحد.',
          },
          name: {
            en: 'Khalid Al-Mansoori',
            ar: 'خالد المنصوري',
          },
          role: {
            en: 'Founder, Bahar Spices',
            ar: 'المؤسس، بهارات بحر',
          },
          photo: {
            url: '/stock/portrait-sea.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Khalid Al-Mansoori',
              ar: 'صورة خالد المنصوري',
            },
          },
          rating: 5,
        },
        {
          id: 't3',
          quote: {
            en: 'Clear brief, on-time delivery and recipes our customers still ask about.',
            ar: 'موجز واضح وتسليم في الموعد ووصفات ما زال عملاؤنا يسألون عنها.',
          },
          name: {
            en: 'Noura Al-Balushi',
            ar: 'نورة البلوشي',
          },
          role: {
            en: 'Brand manager, Qidr Cookware',
            ar: 'مديرة العلامة، قِدر لأدوات الطبخ',
          },
          photo: {
            url: '/stock/portrait-olive.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'Portrait of Noura Al-Balushi',
              ar: 'صورة نورة البلوشي',
            },
          },
          rating: 5,
        },
      ],
    },
  },
  {
    id: 'testimonials-noir-lens',
    name: {
      en: 'Noir Lens · Carousel',
      ar: 'نوار لنز · شريط متحرك',
    },
    category: 'social-proof',
    blockType: 'testimonials',
    variant: 'carousel',
    tier: 'free',
    fromTemplate: 'noir-lens',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Kind words',
        ar: 'كلمات طيبة',
      },
      heading: {
        en: 'From the couples and families',
        ar: 'من الأزواج والعائلات',
      },
      autoplay: true,
      items: [
        {
          id: 't1',
          quote: {
            en: 'We cried looking at our photos. Every moment was there.',
            ar: 'بكينا ونحن نشاهد صورنا. كانت كل لحظة حاضرة فيها.',
          },
          name: {
            en: 'Huda & Faisal',
            ar: 'هدى وفيصل',
          },
          role: {
            en: 'Wedding, The Pearl',
            ar: 'عرس في اللؤلؤة',
          },
          rating: 5,
        },
        {
          id: 't2',
          quote: {
            en: 'Mariam made my grandmother laugh within five minutes. That portrait now hangs in every house in the family.',
            ar: 'أضحكت مريم جدتي خلال خمس دقائق. وتلك الصورة معلّقة اليوم في كل بيت من بيوت العائلة.',
          },
          name: {
            en: 'Noura S.',
            ar: 'نورة س.',
          },
          role: {
            en: 'Family portrait session',
            ar: 'جلسة صور عائلية',
          },
          rating: 5,
        },
        {
          id: 't3',
          quote: {
            en: 'Calm, discreet and always in the right place. Our guests barely noticed her, and she missed nothing.',
            ar: 'هادئة ومتحفّظة وفي المكان المناسب دائمًا. بالكاد لاحظها ضيوفنا، ولم يفُتها شيء.',
          },
          name: {
            en: 'Al-Mannai family',
            ar: 'عائلة المناعي',
          },
          role: {
            en: 'Engagement evening',
            ar: 'حفل خطوبة',
          },
          rating: 5,
        },
      ],
    },
  },
]
