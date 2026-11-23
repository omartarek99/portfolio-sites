import { loc, type ButtonRef, type ImageRef } from '@/schemas/fields'
import { defineManifest } from '../types'
import { servicesSchema, type ServicesContent } from './schema'

const stock = (id: string, en: string, ar: string): ImageRef => ({ url: `/stock/${id}.svg`, width: 1600, height: 1067, alt: loc(en, ar) })
const book = (en: string, ar: string): ButtonRef => ({ label: loc(en, ar), link: { type: 'anchor', value: 'contact' }, icon: 'arrow-right' })
const f = (id: string, en: string, ar: string) => ({ id, text: loc(en, ar) })

export const manifest = defineManifest<ServicesContent>({
  type: 'services',
  name: loc('Services', 'الخدمات'),
  description: loc('What you offer, with prices, durations and a button to book.', 'ما تقدّمه من خدمات، مع الأسعار والمدد وزر للحجز.'),
  icon: 'handshake',
  category: 'sell',
  variants: [
    { id: 'cards', name: loc('Cards', 'بطاقات'), description: loc('A card per service with image or icon, price and button.', 'بطاقة لكل خدمة بصورة أو أيقونة وسعر وزر.'), tier: 'free' },
    { id: 'pricing-table', name: loc('Packages table', 'جدول الباقات'), description: loc('Ruled rows with the price and button at the end.', 'صفوف متتالية يظهر السعر والزر في نهاية كل منها.'), tier: 'free' },
    { id: 'list-icons', name: loc('List with icons', 'قائمة بأيقونات'), description: loc('A compact icon and a line of text for each service.', 'أيقونة وسطر قصير لكل خدمة في مساحة صغيرة.'), tier: 'free' },
  ],
  schema: servicesSchema,
  defaultContent: {
    eyebrow: loc('Services', 'الخدمات'),
    heading: loc('What I do', 'ما أقدّمه'),
    intro: loc(
      'Three ways to get a website that brings in customers — pick one, or start with a strategy session.',
      'ثلاث طرق للحصول على موقع يجلب العملاء، اختر ما يناسبك أو ابدأ بجلسة استراتيجية.',
    ),
    items: [
      {
        id: 'svc-strategy',
        name: loc('Website strategy', 'استراتيجية الموقع'),
        description: loc(
          'We map your customers, your offer and the pages you actually need before anything gets designed.',
          'نحدّد عملاءك وعرضك والصفحات التي تحتاجها فعلًا قبل البدء بأي تصميم.',
        ),
        icon: 'compass',
        image: stock('workspace-sand', 'Notebook and coffee on a desk', 'دفتر وكوب قهوة على مكتب'),
        price: { amount: 600, currency: 'USD', from: true },
        duration: loc('1 week', 'أسبوع واحد'),
        features: [
          f('f1', 'Two workshops with your team', 'ورشتا عمل مع فريقك'),
          f('f2', 'Site map and page outlines', 'خريطة الموقع ومخطط لكل صفحة'),
        ],
        cta: book('Book a call', 'احجز مكالمة'),
      },
      {
        id: 'svc-landing',
        name: loc('Landing page design', 'تصميم صفحات الهبوط'),
        description: loc(
          'A focused page for one product or campaign, designed and built in both Arabic and English.',
          'صفحة مركّزة لمنتج أو حملة واحدة، أصمّمها وأبنيها بالعربية والإنجليزية.',
        ),
        icon: 'layout-grid',
        image: stock('app-slate', 'Interface panels on a grey background', 'لوحات واجهة على خلفية رمادية'),
        price: { amount: 1400, currency: 'USD', from: true },
        duration: loc('2–3 weeks', 'من أسبوعين إلى ثلاثة'),
        features: [
          f('f1', 'Copy, design and build', 'المحتوى والتصميم والتطوير'),
          f('f2', 'Two rounds of revisions', 'جولتان من التعديلات'),
        ],
        cta: book('Start a project', 'ابدأ مشروعًا'),
      },
      {
        id: 'svc-audit',
        name: loc('Conversion audit', 'تدقيق معدّل التحويل'),
        description: loc(
          'I review your current site and hand you a ranked list of fixes that will bring in more enquiries.',
          'أراجع موقعك الحالي وأسلّمك قائمة مرتّبة بالتحسينات التي تزيد طلبات التواصل.',
        ),
        icon: 'line-chart',
        image: stock('app-sea', 'Dashboard panels in teal', 'لوحات بيانات بدرجات الأزرق المخضر'),
        price: { amount: 450, currency: 'USD' },
        duration: loc('5 days', '5 أيام'),
        features: [
          f('f1', 'Recorded video walkthrough', 'شرح مصوّر بالفيديو'),
          f('f2', 'Follow-up call after 30 days', 'مكالمة متابعة بعد 30 يومًا'),
        ],
        cta: book('Request an audit', 'اطلب التدقيق'),
      },
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Services', 'الخدمات'),
      itemLabel: loc('Service', 'خدمة'),
      titlePath: 'name',
      max: 24,
      fields: [
        { kind: 'icon', path: 'icon', label: loc('Icon', 'الأيقونة') },
        { kind: 'image', path: 'image', label: loc('Image', 'الصورة'), variants: ['cards', 'pricing-table'] },
        { kind: 'number', path: 'price.amount', label: loc('Price', 'السعر'), min: 0, step: 1 },
        {
          kind: 'string',
          path: 'price.currency',
          label: loc('Currency code', 'رمز العملة'),
          help: loc('Three letters, e.g. QAR, AED, SAR, USD.', 'ثلاثة أحرف، مثل QAR أو AED أو SAR أو USD.'),
          placeholder: 'USD',
        },
        { kind: 'boolean', path: 'price.from', label: loc('Show “From” before the price', 'إظهار «ابتداءً من» قبل السعر') },
        { kind: 'text', path: 'duration', label: loc('Duration', 'المدة') },
        {
          kind: 'list',
          path: 'features',
          label: loc('Features', 'المزايا'),
          itemLabel: loc('Feature', 'ميزة'),
          titlePath: 'text',
          max: 12,
          fields: [{ kind: 'text', path: 'text', label: loc('Text', 'النص') }],
          defaultItem: { text: loc('New feature', 'ميزة جديدة') },
          variants: ['cards', 'pricing-table'],
        },
        { kind: 'button', path: 'cta', label: loc('Button', 'الزر') },
      ],
      defaultItem: { name: loc('New service', 'خدمة جديدة'), icon: 'sparkles' },
    },
  ],
})
