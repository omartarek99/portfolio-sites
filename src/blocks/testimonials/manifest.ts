import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { testimonialsSchema, type TestimonialsContent } from './schema'

const portrait = (id: string, en: string, ar: string) => ({
  url: `/stock/portrait-${id}.svg`,
  alt: loc(en, ar),
  width: 1200,
  height: 1600,
})

export const manifest = defineManifest<TestimonialsContent>({
  type: 'testimonials',
  name: loc('Testimonials', 'آراء العملاء'),
  description: loc('What clients say about working with you.', 'ما يقوله العملاء عن العمل معك.'),
  icon: 'quote',
  category: 'social-proof',
  variants: [
    {
      id: 'carousel',
      name: loc('Carousel', 'شريط متحرك'),
      description: loc('Speech-bubble cards you can swipe through.', 'بطاقات على شكل فقاعات كلام يمكن التنقل بينها.'),
      tier: 'free',
    },
    {
      id: 'wall',
      name: loc('Wall', 'جدار'),
      description: loc('Every quote at once, in a masonry wall.', 'كل الآراء معًا في جدار متراص.'),
      tier: 'free',
    },
    {
      id: 'single',
      name: loc('Single big quote', 'اقتباس كبير واحد'),
      description: loc('One quote at a time, large.', 'اقتباس واحد في كل مرة بخط كبير.'),
      tier: 'free',
    },
  ],
  schema: testimonialsSchema,
  defaultContent: {
    eyebrow: loc('Kind words', 'كلمات طيبة'),
    heading: loc('What clients say', 'ماذا يقول العملاء'),
    intro: loc(
      'A few notes from founders and teams I have worked with across the Gulf.',
      'بعض ما كتبه مؤسسون وفرق عملت معهم في أنحاء الخليج.',
    ),
    autoplay: true,
    items: [
      {
        id: 't1',
        quote: loc(
          'Layla gave our brand a personality we didn’t know we had. Customers now recognise our cups from across the street.',
          'منحت ليلى علامتنا شخصية لم نكن نعرف أننا نملكها. صار الزبائن يعرفون أكوابنا من الطرف الآخر للشارع.',
        ),
        name: loc('Omar Al-Khatib', 'عمر الخطيب'),
        role: loc('Founder, Sahra Coffee', 'مؤسس قهوة صحرا'),
        photo: portrait('sand', 'Portrait of Omar Al-Khatib', 'صورة عمر الخطيب'),
        rating: 5,
      },
      {
        id: 't2',
        quote: loc(
          'Clear timelines, honest advice and a launch that went out on the exact day we planned. Rare in this industry.',
          'جداول زمنية واضحة ونصيحة صادقة وإطلاق في اليوم الذي خططنا له تمامًا. وهذا نادر في مجالنا.',
        ),
        name: loc('Huda Al-Mansoori', 'هدى المنصوري'),
        role: loc('Marketing Director, Marsa Ventures', 'مديرة التسويق، مرسى للاستثمار'),
        photo: portrait('blush', 'Portrait of Huda Al-Mansoori', 'صورة هدى المنصوري'),
        rating: 5,
      },
      {
        id: 't3',
        quote: loc(
          'The bilingual guidelines alone saved our team weeks. Arabic and English finally feel like one brand.',
          'وفّر علينا دليل الهوية باللغتين وحده أسابيع من العمل. أخيرًا صارت العربية والإنجليزية تبدوان علامة واحدة.',
        ),
        name: loc('Faisal Al-Harthy', 'فيصل الحارثي'),
        role: loc('Head of Product, Wadi Labs', 'رئيس المنتج، مختبرات وادي'),
        photo: portrait('sea', 'Portrait of Faisal Al-Harthy', 'صورة فيصل الحارثي'),
        rating: 4,
      },
      {
        id: 't4',
        quote: loc(
          'She listened more than she talked in our first meeting, and it shows in every detail of the result.',
          'أصغت في اجتماعنا الأول أكثر مما تحدثت، ويظهر ذلك في كل تفصيلة من النتيجة.',
        ),
        name: loc('Noura Al-Thani', 'نورة آل ثاني'),
        role: loc('General Manager, Qamar Hotels', 'المديرة العامة، فنادق قمر'),
      },
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Testimonials', 'الآراء'),
      itemLabel: loc('Testimonial', 'رأي'),
      titlePath: 'name',
      fields: [
        { kind: 'text', path: 'quote', label: loc('Quote', 'الاقتباس'), multiline: true },
        { kind: 'text', path: 'name', label: loc('Name', 'الاسم') },
        { kind: 'text', path: 'role', label: loc('Role and company', 'المنصب والجهة') },
        { kind: 'image', path: 'photo', label: loc('Photo', 'الصورة') },
        { kind: 'number', path: 'rating', label: loc('Rating (1–5)', 'التقييم (1–5)'), min: 1, max: 5, step: 0.5 },
        { kind: 'image', path: 'logo', label: loc('Company logo', 'شعار الجهة') },
      ],
      defaultItem: { quote: loc('What they said about working with you.', 'ما قاله عن العمل معك.'), name: loc('Name', 'الاسم') },
    },
    {
      kind: 'boolean',
      path: 'autoplay',
      label: loc('Play automatically', 'تشغيل تلقائي'),
      variants: ['carousel', 'single'],
    },
  ],
})
