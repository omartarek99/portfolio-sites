/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const galleryPresets: SectionPreset[] = [
  {
    id: 'gallery-atelier',
    name: {
      en: 'Atelier · Gallery wall',
      ar: 'أتيليه · جدار المعرض',
    },
    category: 'media',
    blockType: 'gallery',
    variant: 'justified',
    tier: 'pro',
    fromTemplate: 'atelier',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Selected works',
        ar: 'أعمال مختارة',
      },
      heading: {
        en: 'On the wall',
        ar: 'على الجدار',
      },
      intro: {
        en: 'Ink, reed pen and gold leaf on paper, made in the studio between 2023 and 2026. Select a work to see its details.',
        ar: 'حبر وقلم قصب ورقائق ذهب على الورق، أُنجزت في المرسم بين 2023 و2026. اختر عملًا لترى تفاصيله.',
      },
      categories: [
        {
          id: 'calligraphy',
          label: {
            en: 'Calligraphy',
            ar: 'خط عربي',
          },
        },
        {
          id: 'ink',
          label: {
            en: 'Ink paintings',
            ar: 'لوحات بالحبر',
          },
        },
      ],
      showFilter: false,
      items: [
        {
          id: 'w-lines',
          image: {
            url: '/stock/art-sand.svg',
            alt: {
              en: 'Square calligraphic composition in layered sand tones',
              ar: 'تكوين خطّي مربّع بطبقات رملية',
            },
            width: 1400,
            height: 1400,
          },
          caption: {
            en: 'Lines of Light I',
            ar: 'خطوط من نور ١',
          },
          category: 'calligraphy',
          medium: {
            en: 'Ink and gold leaf on paper',
            ar: 'حبر ورقائق ذهب على ورق',
          },
          size: {
            en: '50 × 50 cm',
            ar: '50 × 50 سم',
          },
          year: '2025',
        },
        {
          id: 'w-night',
          image: {
            url: '/stock/art-ink.svg',
            alt: {
              en: 'Tall ink composition in deep blue strokes',
              ar: 'تكوين عمودي بضربات حبر زرقاء داكنة',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Night Script',
            ar: 'كتابة الليل',
          },
          category: 'ink',
          medium: {
            en: 'Ink on paper',
            ar: 'حبر على ورق',
          },
          size: {
            en: '50 × 70 cm',
            ar: '50 × 70 سم',
          },
          year: '2025',
        },
        {
          id: 'w-breath',
          image: {
            url: '/stock/art-blush.svg',
            alt: {
              en: 'Rose-coloured arcs on a square sheet',
              ar: 'أقواس وردية على ورقة مربعة',
            },
            width: 1400,
            height: 1400,
          },
          caption: {
            en: 'Breath, study I',
            ar: 'نَفَس، دراسة أولى',
          },
          category: 'calligraphy',
          medium: {
            en: 'Gouache and ink',
            ar: 'غواش وحبر',
          },
          size: {
            en: '40 × 40 cm',
            ar: '40 × 40 سم',
          },
          year: '2024',
        },
        {
          id: 'w-tide',
          image: {
            url: '/stock/art-sea.svg',
            alt: {
              en: 'Teal abstract with flowing horizontal lines',
              ar: 'تجريد بالأزرق المخضرّ بخطوط أفقية منسابة',
            },
            width: 1600,
            height: 1067,
          },
          caption: {
            en: 'Red Sea Tide',
            ar: 'مدّ البحر الأحمر',
          },
          category: 'ink',
          medium: {
            en: 'Ink and watercolour',
            ar: 'حبر وألوان مائية',
          },
          size: {
            en: '90 × 60 cm',
            ar: '90 × 60 سم',
          },
          year: '2024',
        },
        {
          id: 'w-door',
          image: {
            url: '/stock/interior-clay.svg',
            alt: {
              en: 'Warm clay forms in a tall frame',
              ar: 'أشكال طينية دافئة في إطار عمودي',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'The Old Door',
            ar: 'الباب القديم',
          },
          category: 'calligraphy',
          medium: {
            en: 'Ink on handmade paper',
            ar: 'حبر على ورق مصنوع يدويًا',
          },
          size: {
            en: '60 × 80 cm',
            ar: '60 × 80 سم',
          },
          year: '2023',
        },
        {
          id: 'w-dunes',
          image: {
            url: '/stock/nature-sand.svg',
            alt: {
              en: 'Wide desert dunes under a pale sky',
              ar: 'كثبان صحراوية واسعة تحت سماء شاحبة',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Nafud at Dusk',
            ar: 'النفود عند الغروب',
          },
          category: 'ink',
          medium: {
            en: 'Sumi ink and wash',
            ar: 'حبر سومي ومائي',
          },
          size: {
            en: '120 × 70 cm',
            ar: '120 × 70 سم',
          },
          year: '2024',
        },
      ],
      cta: {
        label: {
          en: 'Enquire about a work',
          ar: 'استفسر عن عمل',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        style: 'outline',
      },
    },
  },
  {
    id: 'gallery-noir-lens',
    name: {
      en: 'Noir Lens · Masonry',
      ar: 'نوار لنز · جدار متدرّج',
    },
    category: 'media',
    blockType: 'gallery',
    variant: 'masonry',
    tier: 'free',
    fromTemplate: 'noir-lens',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Selected work',
        ar: 'أعمال مختارة',
      },
      heading: {
        en: 'Portfolio',
        ar: 'معرض الأعمال',
      },
      intro: {
        en: 'Weddings, portraits and events from the last two seasons.',
        ar: 'أعراس وبورتريهات ومناسبات من الموسمين الأخيرين.',
      },
      categories: [
        {
          id: 'weddings',
          label: {
            en: 'Weddings',
            ar: 'أعراس',
          },
        },
        {
          id: 'portraits',
          label: {
            en: 'Portraits',
            ar: 'بورتريه',
          },
        },
        {
          id: 'events',
          label: {
            en: 'Events',
            ar: 'مناسبات',
          },
        },
      ],
      showFilter: true,
      columns: '3',
      items: [
        {
          id: 'w1',
          image: {
            url: '/stock/event-sand.svg',
            alt: {
              en: 'Huda & Faisal, first look at the Pearl',
              ar: 'هدى وفيصل، النظرة الأولى في اللؤلؤة',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Huda & Faisal, first look at the Pearl',
            ar: 'هدى وفيصل، النظرة الأولى في اللؤلؤة',
          },
          category: 'weddings',
        },
        {
          id: 'w2',
          image: {
            url: '/stock/portrait-dusk.svg',
            alt: {
              en: 'Reem, window light study',
              ar: 'ريم، دراسة على ضوء النافذة',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Reem, window light study',
            ar: 'ريم، دراسة على ضوء النافذة',
          },
          category: 'portraits',
        },
        {
          id: 'w3',
          image: {
            url: '/stock/event-dusk.svg',
            alt: {
              en: 'Gala night at the waterfront',
              ar: 'ليلة حفل على الواجهة البحرية',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Gala night at the waterfront',
            ar: 'ليلة حفل على الواجهة البحرية',
          },
          category: 'events',
        },
        {
          id: 'w4',
          image: {
            url: '/stock/event-blush.svg',
            alt: {
              en: 'Confetti on the courtyard steps',
              ar: 'قصاصات ملوّنة على درج الفناء',
            },
            width: 1600,
            height: 1067,
          },
          caption: {
            en: 'Confetti on the courtyard steps',
            ar: 'قصاصات ملوّنة على درج الفناء',
          },
          category: 'weddings',
        },
        {
          id: 'w5',
          image: {
            url: '/stock/portrait-ink.svg',
            alt: {
              en: 'Yousef, studio portrait in black',
              ar: 'يوسف، بورتريه بالأسود في الاستوديو',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Yousef, studio portrait in black',
            ar: 'يوسف، بورتريه بالأسود في الاستوديو',
          },
          category: 'portraits',
        },
        {
          id: 'w6',
          image: {
            url: '/stock/nature-sand.svg',
            alt: {
              en: 'Engagement walk in the dunes',
              ar: 'جلسة خطوبة بين الكثبان',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Engagement walk in the dunes',
            ar: 'جلسة خطوبة بين الكثبان',
          },
          category: 'weddings',
        },
        {
          id: 'w7',
          image: {
            url: '/stock/portrait-blush.svg',
            alt: {
              en: 'Lulwa, graduation portrait',
              ar: 'لولوة، صورة التخرج',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Lulwa, graduation portrait',
            ar: 'لولوة، صورة التخرج',
          },
          category: 'portraits',
        },
        {
          id: 'w8',
          image: {
            url: '/stock/city-dusk.svg',
            alt: {
              en: 'Product launch over the skyline',
              ar: 'إطلاق منتج على خلفية الأفق',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Product launch over the skyline',
            ar: 'إطلاق منتج على خلفية الأفق',
          },
          category: 'events',
        },
        {
          id: 'w9',
          image: {
            url: '/stock/food-clay.svg',
            alt: {
              en: 'The wedding dinner table',
              ar: 'مائدة عشاء العرس',
            },
            width: 1400,
            height: 1400,
          },
          caption: {
            en: 'The wedding dinner table',
            ar: 'مائدة عشاء العرس',
          },
          category: 'events',
        },
      ],
      cta: {
        label: {
          en: 'See the full portfolio',
          ar: 'شاهدي المعرض كاملًا',
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
    id: 'gallery-blueprint',
    name: {
      en: 'Blueprint · Before / after',
      ar: 'المخطط · قبل وبعد',
    },
    category: 'media',
    blockType: 'gallery',
    variant: 'before-after',
    tier: 'pro',
    fromTemplate: 'blueprint',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Before / after',
        ar: 'قبل وبعد',
      },
      heading: {
        en: 'From drawing to built',
        ar: 'من الرسم إلى البناء',
      },
      intro: {
        en: 'Drag the line to compare the design drawing with the finished space.',
        ar: 'اسحب الخط للمقارنة بين الرسم التصميمي والمساحة بعد التنفيذ.',
      },
      items: [
        {
          id: 'ba-courtyard',
          image: {
            url: '/stock/art-sea.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Plan drawing of the courtyard house',
              ar: 'مخطط بيت الفناء',
            },
          },
          after: {
            url: '/stock/interior-clay.svg',
            width: 1200,
            height: 1600,
            alt: {
              en: 'The finished courtyard with timber screen',
              ar: 'الفناء بعد التنفيذ مع المشربية الخشبية',
            },
          },
          caption: {
            en: 'Courtyard House — ground-floor plan and courtyard',
            ar: 'بيت الفناء: مخطط الطابق الأرضي والفناء',
          },
          year: '2025',
        },
        {
          id: 'ba-cowork',
          image: {
            url: '/stock/workspace-sand.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'Sketch study of the co-working floor',
              ar: 'دراسة مبدئية لطابق العمل المشترك',
            },
          },
          after: {
            url: '/stock/workspace-slate.svg',
            width: 1600,
            height: 1067,
            alt: {
              en: 'The finished co-working floor',
              ar: 'طابق العمل المشترك بعد التنفيذ',
            },
          },
          caption: {
            en: 'Lusail co-working floor — sketch and finished space',
            ar: 'طابق العمل المشترك في لوسيل: الرسم والمساحة المنفّذة',
          },
          year: '2024',
        },
      ],
      ratio: '3/2',
    },
  },
  {
    id: 'gallery-noir-lens-portfolio',
    name: {
      en: 'Noir Lens · Masonry',
      ar: 'نوار لنز · جدار متدرّج',
    },
    category: 'media',
    blockType: 'gallery',
    variant: 'masonry',
    tier: 'free',
    fromTemplate: 'noir-lens',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Portfolio',
        ar: 'معرض الأعمال',
      },
      heading: {
        en: 'Twelve stories, told in light',
        ar: 'اثنتا عشرة قصة يرويها الضوء',
      },
      intro: {
        en: 'Choose a category, then open any image to see it full screen.',
        ar: 'اختاري تصنيفًا، ثم افتحي أي صورة لتريها بملء الشاشة.',
      },
      categories: [
        {
          id: 'weddings',
          label: {
            en: 'Weddings',
            ar: 'أعراس',
          },
        },
        {
          id: 'portraits',
          label: {
            en: 'Portraits',
            ar: 'بورتريه',
          },
        },
        {
          id: 'events',
          label: {
            en: 'Events',
            ar: 'مناسبات',
          },
        },
      ],
      showFilter: true,
      columns: '3',
      items: [
        {
          id: 'w1',
          image: {
            url: '/stock/event-sand.svg',
            alt: {
              en: 'Huda & Faisal, first look at the Pearl',
              ar: 'هدى وفيصل، النظرة الأولى في اللؤلؤة',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Huda & Faisal, first look at the Pearl',
            ar: 'هدى وفيصل، النظرة الأولى في اللؤلؤة',
          },
          category: 'weddings',
        },
        {
          id: 'w2',
          image: {
            url: '/stock/portrait-dusk.svg',
            alt: {
              en: 'Reem, window light study',
              ar: 'ريم، دراسة على ضوء النافذة',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Reem, window light study',
            ar: 'ريم، دراسة على ضوء النافذة',
          },
          category: 'portraits',
        },
        {
          id: 'w3',
          image: {
            url: '/stock/event-dusk.svg',
            alt: {
              en: 'Gala night at the waterfront',
              ar: 'ليلة حفل على الواجهة البحرية',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Gala night at the waterfront',
            ar: 'ليلة حفل على الواجهة البحرية',
          },
          category: 'events',
        },
        {
          id: 'w4',
          image: {
            url: '/stock/event-blush.svg',
            alt: {
              en: 'Confetti on the courtyard steps',
              ar: 'قصاصات ملوّنة على درج الفناء',
            },
            width: 1600,
            height: 1067,
          },
          caption: {
            en: 'Confetti on the courtyard steps',
            ar: 'قصاصات ملوّنة على درج الفناء',
          },
          category: 'weddings',
        },
        {
          id: 'w5',
          image: {
            url: '/stock/portrait-ink.svg',
            alt: {
              en: 'Yousef, studio portrait in black',
              ar: 'يوسف، بورتريه بالأسود في الاستوديو',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Yousef, studio portrait in black',
            ar: 'يوسف، بورتريه بالأسود في الاستوديو',
          },
          category: 'portraits',
        },
        {
          id: 'w6',
          image: {
            url: '/stock/nature-sand.svg',
            alt: {
              en: 'Engagement walk in the dunes',
              ar: 'جلسة خطوبة بين الكثبان',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Engagement walk in the dunes',
            ar: 'جلسة خطوبة بين الكثبان',
          },
          category: 'weddings',
        },
        {
          id: 'w7',
          image: {
            url: '/stock/portrait-blush.svg',
            alt: {
              en: 'Lulwa, graduation portrait',
              ar: 'لولوة، صورة التخرج',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Lulwa, graduation portrait',
            ar: 'لولوة، صورة التخرج',
          },
          category: 'portraits',
        },
        {
          id: 'w8',
          image: {
            url: '/stock/city-dusk.svg',
            alt: {
              en: 'Product launch over the skyline',
              ar: 'إطلاق منتج على خلفية الأفق',
            },
            width: 1920,
            height: 1080,
          },
          caption: {
            en: 'Product launch over the skyline',
            ar: 'إطلاق منتج على خلفية الأفق',
          },
          category: 'events',
        },
        {
          id: 'w9',
          image: {
            url: '/stock/food-clay.svg',
            alt: {
              en: 'The wedding dinner table',
              ar: 'مائدة عشاء العرس',
            },
            width: 1400,
            height: 1400,
          },
          caption: {
            en: 'The wedding dinner table',
            ar: 'مائدة عشاء العرس',
          },
          category: 'events',
        },
        {
          id: 'w10',
          image: {
            url: '/stock/portrait-sand.svg',
            alt: {
              en: 'Noura and her grandmother',
              ar: 'نورة وجدّتها',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Noura and her grandmother',
            ar: 'نورة وجدّتها',
          },
          category: 'portraits',
        },
        {
          id: 'w11',
          image: {
            url: '/stock/nature-sea.svg',
            alt: {
              en: 'Vows by the sea at Al Wakra',
              ar: 'عهود على البحر في الوكرة',
            },
            width: 1600,
            height: 1067,
          },
          caption: {
            en: 'Vows by the sea at Al Wakra',
            ar: 'عهود على البحر في الوكرة',
          },
          category: 'weddings',
        },
        {
          id: 'w12',
          image: {
            url: '/stock/portrait-sea.svg',
            alt: {
              en: 'Salem, family portrait session',
              ar: 'سالم، جلسة صور عائلية',
            },
            width: 1200,
            height: 1600,
          },
          caption: {
            en: 'Salem, family portrait session',
            ar: 'سالم، جلسة صور عائلية',
          },
          category: 'portraits',
        },
      ],
    },
  },
]
