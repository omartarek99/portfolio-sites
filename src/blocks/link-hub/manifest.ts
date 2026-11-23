import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { linkHubSchema, type LinkHubContent } from './schema'

export const manifest = defineManifest<LinkHubContent>({
  type: 'linkHub',
  name: loc('Link hub', 'مركز الروابط'),
  description: loc('Link-in-bio buttons for your latest videos, shop and more.', 'أزرار روابط لأحدث فيديوهاتك ومتجرك وغير ذلك.'),
  icon: 'link',
  category: 'intro',
  variants: [
    {
      id: 'stacked',
      name: loc('Stacked buttons', 'أزرار متتالية'),
      description: loc('Big rounded buttons in one column, phone-first.', 'أزرار كبيرة مستديرة في عمود واحد، مصممة للهاتف أولًا.'),
      tier: 'free',
    },
    {
      id: 'icon-grid',
      name: loc('Icon grid', 'شبكة أيقونات'),
      description: loc('A grid of icon tiles.', 'شبكة من البطاقات بالأيقونات.'),
      tier: 'free',
    },
  ],
  schema: linkHubSchema,
  defaultContent: {
    heading: loc('Start here', 'ابدأ من هنا'),
    intro: loc('Easy Gulf recipes in under 30 minutes — everything I make, in one place.', 'وصفات خليجية سهلة في أقل من 30 دقيقة، وكل ما أقدّمه في مكان واحد.'),
    items: [
      {
        id: 'l1',
        label: loc('New video: 15-minute machboos', 'فيديو جديد: مجبوس في 15 دقيقة'),
        description: loc('Weeknight chicken machboos in one pot', 'مجبوس دجاج سريع في قدر واحد'),
        link: { type: 'url', value: 'https://youtube.com/@reemcooks' },
        icon: 'youtube',
        thumbnail: { url: '/stock/food-clay.svg', alt: loc('Machboos served in a bowl', 'طبق مجبوس'), width: 1400, height: 1400 },
        isNew: true,
      },
      {
        id: 'l2',
        label: loc('My recipe e-book', 'كتاب وصفاتي الإلكتروني'),
        description: loc('40 family recipes, step by step', '40 وصفة عائلية خطوة بخطوة'),
        link: { type: 'url', value: 'https://example.com/reemcooks/ebook' },
        icon: 'book-open',
        thumbnail: { url: '/stock/food-olive.svg', alt: loc('E-book cover', 'غلاف الكتاب'), width: 1400, height: 1400 },
      },
      {
        id: 'l3',
        label: loc('Podcast: Kitchen Talks', 'بودكاست: أحاديث المطبخ'),
        description: loc('New episode every Thursday', 'حلقة جديدة كل خميس'),
        link: { type: 'url', value: 'https://example.com/kitchen-talks' },
        icon: 'mic',
      },
      {
        id: 'l4',
        label: loc('Shop my kitchen tools', 'تسوّق أدوات مطبخي'),
        link: { type: 'url', value: 'https://example.com/reemcooks/shop' },
        icon: 'shopping-bag',
      },
      {
        id: 'l5',
        label: loc('Weekly recipe letter', 'رسالة الوصفات الأسبوعية'),
        description: loc('One recipe in your inbox every Sunday', 'وصفة واحدة في بريدك كل أحد'),
        link: { type: 'anchor', value: 'newsletter' },
        icon: 'mail',
      },
      {
        id: 'l6',
        label: loc('Instagram', 'إنستغرام'),
        description: loc('Daily recipes and kitchen stories', 'وصفات يومية وحكايات من المطبخ'),
        link: { type: 'url', value: 'https://instagram.com/reemcooks' },
        icon: 'instagram',
      },
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Links', 'الروابط'),
      itemLabel: loc('Link', 'رابط'),
      titlePath: 'label',
      fields: [
        { kind: 'text', path: 'label', label: loc('Label', 'النص') },
        { kind: 'text', path: 'description', label: loc('Description', 'الوصف') },
        { kind: 'link', path: 'link', label: loc('Link', 'الرابط') },
        {
          kind: 'icon',
          path: 'icon',
          label: loc('Icon', 'الأيقونة'),
          help: loc('An icon, or a platform name such as "instagram".', 'أيقونة، أو اسم منصة مثل "instagram".'),
        },
        { kind: 'image', path: 'thumbnail', label: loc('Thumbnail', 'الصورة المصغّرة') },
        { kind: 'boolean', path: 'isNew', label: loc('Mark as new', 'وسم «جديد»') },
      ],
      defaultItem: { label: loc('New link', 'رابط جديد'), link: { type: 'url', value: '' }, icon: 'link' },
    },
  ],
})
