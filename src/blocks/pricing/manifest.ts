import { loc, type ButtonRef } from '@/schemas/fields'
import { defineManifest } from '../types'
import { pricingSchema, type PricingContent } from './schema'

const cta = (en: string, ar: string): ButtonRef => ({ label: loc(en, ar), link: { type: 'anchor', value: 'contact' } })
const f = (id: string, en: string, ar: string) => ({ id, text: loc(en, ar) })
const yes = (id: string) => ({ id, included: true })
const no = (id: string) => ({ id, included: false })
const txt = (id: string, en: string, ar: string) => ({ id, value: loc(en, ar), included: true })

export const manifest = defineManifest<PricingContent>({
  type: 'pricing',
  name: loc('Pricing', 'الأسعار'),
  description: loc('Two to four plans with a monthly / one-time switch.', 'من باقتين إلى أربع، مع التبديل بين الدفع الشهري والدفعة الواحدة.'),
  icon: 'gem',
  category: 'sell',
  variants: [
    { id: 'tiers', name: loc('Tiers', 'باقات'), description: loc('A card per plan with its features.', 'بطاقة لكل باقة مع مزاياها.'), tier: 'free' },
    { id: 'compare', name: loc('Comparison table', 'جدول مقارنة'), description: loc('Features side by side; stacked cards on phones.', 'المزايا جنبًا إلى جنب، وبطاقات متتالية على الهاتف.'), tier: 'free' },
  ],
  schema: pricingSchema,
  defaultContent: {
    eyebrow: loc('Pricing', 'الأسعار'),
    heading: loc('Simple plans, no surprises', 'باقات واضحة بلا مفاجآت'),
    intro: loc(
      'Pay once for the build, or spread it into a monthly plan that includes hosting and updates.',
      'ادفع مرة واحدة مقابل بناء الموقع، أو قسّط التكلفة باشتراك شهري يشمل الاستضافة والتحديثات.',
    ),
    currency: 'USD',
    defaultPeriod: 'one-time',
    tiers: [
      {
        id: 'tier-starter',
        name: loc('Starter', 'البداية'),
        description: loc('A one-page site to get you online fast.', 'موقع من صفحة واحدة لتنطلق بسرعة.'),
        oneTime: 900,
        monthly: 99,
        features: [
          f('f1', 'One landing page', 'صفحة هبوط واحدة'),
          f('f2', 'Arabic and English', 'بالعربية والإنجليزية'),
          f('f3', 'Contact form and WhatsApp button', 'نموذج تواصل وزر واتساب'),
        ],
        cta: cta('Get started', 'ابدأ الآن'),
      },
      {
        id: 'tier-growth',
        name: loc('Growth', 'النمو'),
        description: loc('A full site built to turn visitors into enquiries.', 'موقع متكامل يحوّل الزوار إلى طلبات تواصل.'),
        oneTime: 2400,
        monthly: 229,
        popular: true,
        features: [
          f('f1', 'Up to five pages', 'حتى خمس صفحات'),
          f('f2', 'Copywriting in both languages', 'كتابة المحتوى باللغتين'),
          f('f3', 'Booking and analytics set up', 'إعداد الحجز والتحليلات'),
          f('f4', 'Two rounds of revisions', 'جولتان من التعديلات'),
        ],
        cta: cta('Choose Growth', 'اختر باقة النمو'),
      },
      {
        id: 'tier-partner',
        name: loc('Partner', 'الشراكة'),
        description: loc('An ongoing partner for your site and campaigns.', 'شريك دائم لموقعك وحملاتك.'),
        monthly: 4000,
        from: true,
        features: [
          f('f1', 'Everything in Growth', 'كل ما في باقة النمو'),
          f('f2', 'New landing page every month', 'صفحة هبوط جديدة كل شهر'),
          f('f3', 'Monthly conversion report', 'تقرير شهري عن معدّل التحويل'),
        ],
        cta: cta('Book a call', 'احجز مكالمة'),
      },
    ],
    rows: [
      { id: 'r-pages', label: loc('Pages', 'عدد الصفحات'), cells: [txt('c1', '1', '1'), txt('c2', 'Up to 5', 'حتى 5'), txt('c3', 'Unlimited', 'غير محدود')] },
      { id: 'r-lang', label: loc('Arabic and English', 'العربية والإنجليزية'), cells: [yes('c1'), yes('c2'), yes('c3')] },
      { id: 'r-copy', label: loc('Copywriting', 'كتابة المحتوى'), cells: [no('c1'), yes('c2'), yes('c3')] },
      { id: 'r-booking', label: loc('Booking and analytics', 'الحجز والتحليلات'), cells: [no('c1'), yes('c2'), yes('c3')] },
      { id: 'r-revisions', label: loc('Revisions', 'التعديلات'), cells: [txt('c1', '1 round', 'جولة واحدة'), txt('c2', '2 rounds', 'جولتان'), txt('c3', 'Unlimited', 'غير محدودة')] },
      { id: 'r-report', label: loc('Monthly report', 'تقرير شهري'), cells: [no('c1'), no('c2'), yes('c3')] },
      { id: 'r-support', label: loc('Support', 'الدعم'), cells: [txt('c1', '14 days', '14 يومًا'), txt('c2', '30 days', '30 يومًا'), txt('c3', 'Ongoing', 'مستمر')] },
    ],
  },
  editableFields: [
    {
      kind: 'select',
      path: 'defaultPeriod',
      label: loc('Show first', 'العرض الافتراضي'),
      help: loc('The switch appears when a plan has both prices.', 'يظهر زر التبديل عندما يكون لإحدى الباقات سعران.'),
      options: [
        { value: 'one-time', label: loc('One-time price', 'سعر الدفعة الواحدة') },
        { value: 'monthly', label: loc('Monthly price', 'السعر الشهري') },
      ],
    },
    {
      kind: 'string',
      path: 'currency',
      label: loc('Currency code', 'رمز العملة'),
      help: loc('Three letters, e.g. QAR, AED, SAR, USD.', 'ثلاثة أحرف، مثل QAR أو AED أو SAR أو USD.'),
      placeholder: 'USD',
    },
    {
      kind: 'list',
      path: 'tiers',
      label: loc('Plans', 'الباقات'),
      itemLabel: loc('Plan', 'باقة'),
      titlePath: 'name',
      max: 4,
      fields: [
        { kind: 'number', path: 'oneTime', label: loc('One-time price', 'سعر الدفعة الواحدة'), min: 0, step: 1 },
        { kind: 'number', path: 'monthly', label: loc('Monthly price', 'السعر الشهري'), min: 0, step: 1 },
        { kind: 'boolean', path: 'from', label: loc('Show “From” before the price', 'إظهار «ابتداءً من» قبل السعر') },
        { kind: 'boolean', path: 'popular', label: loc('Mark as popular', 'تمييزها كالأكثر طلبًا') },
        {
          kind: 'list',
          path: 'features',
          label: loc('Features', 'المزايا'),
          itemLabel: loc('Feature', 'ميزة'),
          titlePath: 'text',
          max: 20,
          fields: [{ kind: 'text', path: 'text', label: loc('Text', 'النص') }],
          defaultItem: { text: loc('New feature', 'ميزة جديدة') },
          variants: ['tiers'],
        },
        { kind: 'button', path: 'cta', label: loc('Button', 'الزر') },
      ],
      defaultItem: { name: loc('New plan', 'باقة جديدة'), oneTime: 500 },
    },
    {
      kind: 'list',
      path: 'rows',
      label: loc('Comparison rows', 'صفوف المقارنة'),
      help: loc('Each row has one cell per plan, in the same order as the plans.', 'لكل صف خانة لكل باقة، بترتيب الباقات نفسه.'),
      itemLabel: loc('Row', 'صف'),
      titlePath: 'label',
      max: 30,
      variants: ['compare'],
      fields: [
        { kind: 'text', path: 'label', label: loc('Feature', 'الميزة') },
        {
          kind: 'list',
          path: 'cells',
          label: loc('Cells', 'الخانات'),
          itemLabel: loc('Cell', 'خانة'),
          titlePath: 'value',
          max: 4,
          fields: [
            { kind: 'boolean', path: 'included', label: loc('Included', 'مشمول') },
            { kind: 'text', path: 'value', label: loc('Text instead of a check', 'نص بدل علامة الصح') },
          ],
          defaultItem: { included: true },
        },
      ],
      defaultItem: { label: loc('New feature', 'ميزة جديدة'), cells: [] },
    },
  ],
})
