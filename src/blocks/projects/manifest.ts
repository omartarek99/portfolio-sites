import { loc, SOCIAL_PLATFORMS, type ImageRef, type LinkRef } from '@/schemas/fields'
import { SOCIAL_LABELS } from '@/lib/links'
import { defineManifest, type FieldConfig } from '../types'
import { PROJECT_KINDS, PROJECT_SIZES, projectsSchema, type ProjectsContent } from './schema'

function stock(id: string, width: number, height: number, en: string, ar: string): ImageRef {
  return { url: `/stock/${id}.svg`, width, height, alt: loc(en, ar) }
}

const DEMO_LINK: LinkRef = { type: 'url', value: '#' }

const SIZE_LABELS: Record<(typeof PROJECT_SIZES)[number], ReturnType<typeof loc>> = {
  sm: loc('Small (1×1)', 'صغيرة (1×1)'),
  md: loc('Medium (2×1)', 'متوسطة (2×1)'),
  lg: loc('Large (2×2)', 'كبيرة (2×2)'),
  wide: loc('Wide (3×1)', 'عريضة (3×1)'),
  tall: loc('Tall (1×2)', 'طويلة (1×2)'),
}

const KIND_LABELS: Record<(typeof PROJECT_KINDS)[number], ReturnType<typeof loc>> = {
  project: loc('Project', 'مشروع'),
  intro: loc('Intro', 'تعريف'),
  photo: loc('Photo', 'صورة'),
  status: loc('Currently', 'حاليًا'),
  location: loc('Location', 'الموقع'),
  learning: loc('Now learning', 'أتعلّم الآن'),
  social: loc('Social', 'حساب تواصل'),
  contact: loc('Contact', 'تواصل'),
}

const BENTO = ['bento']

const itemFields: FieldConfig[] = [
  { kind: 'text', path: 'title', label: loc('Title', 'العنوان') },
  { kind: 'text', path: 'description', label: loc('Description', 'الوصف'), multiline: true },
  { kind: 'image', path: 'image', label: loc('Image', 'الصورة') },
  {
    kind: 'video',
    path: 'video',
    label: loc('Video', 'الفيديو'),
    help: loc('Shown instead of the image.', 'يظهر بدلًا من الصورة.'),
  },
  { kind: 'link', path: 'link', label: loc('Project link', 'رابط المشروع') },
  { kind: 'link', path: 'caseStudy', label: loc('Case study page', 'صفحة دراسة الحالة') },
  { kind: 'tags', path: 'tags', label: loc('Tags', 'الوسوم') },
  { kind: 'string', path: 'year', label: loc('Year', 'السنة'), placeholder: '2026' },
  { kind: 'text', path: 'client', label: loc('Client', 'العميل') },
  {
    kind: 'string',
    path: 'category',
    label: loc('Category id', 'معرّف الفئة'),
    help: loc('The id of one of the categories of this section.', 'معرّف إحدى فئات هذا القسم.'),
  },
  {
    kind: 'select',
    path: 'kind',
    label: loc('Card type', 'نوع البطاقة'),
    variants: BENTO,
    options: PROJECT_KINDS.map((value) => ({ value, label: KIND_LABELS[value] })),
  },
  {
    kind: 'select',
    path: 'size',
    label: loc('Card size', 'حجم البطاقة'),
    variants: BENTO,
    options: PROJECT_SIZES.map((value) => ({ value, label: SIZE_LABELS[value] })),
  },
  {
    kind: 'text',
    path: 'label',
    label: loc('Small label', 'تسمية صغيرة'),
    help: loc('For example “Currently” or “Based in”.', 'مثل «حاليًا» أو «أقيم في».'),
    variants: BENTO,
  },
  {
    kind: 'select',
    path: 'platform',
    label: loc('Social platform', 'منصة التواصل'),
    help: loc('Social cards only. Leave empty to list all the site’s accounts.', 'لبطاقات التواصل فقط. اتركه فارغًا لعرض كل حسابات الموقع.'),
    variants: BENTO,
    options: SOCIAL_PLATFORMS.map((value) => ({ value, label: SOCIAL_LABELS[value] })),
  },
  {
    kind: 'string',
    path: 'handle',
    label: loc('Handle or profile URL', 'اسم الحساب أو رابطه'),
    variants: BENTO,
  },
]

export const manifest = defineManifest<ProjectsContent>({
  type: 'projects',
  name: loc('Projects', 'المشاريع'),
  description: loc('Your portfolio: projects with images, tags and links.', 'معرض أعمالك: مشاريع بصورها ووسومها وروابطها.'),
  icon: 'layout-grid',
  category: 'work',
  variants: [
    { id: 'grid', name: loc('Grid', 'شبكة'), description: loc('Cards in two or three columns, with a category filter.', 'بطاقات في عمودين أو ثلاثة مع تصفية حسب الفئة.'), tier: 'free' },
    { id: 'masonry', name: loc('Masonry', 'جدار متدرّج'), description: loc('Images keep their natural height.', 'تحتفظ الصور بارتفاعها الطبيعي.'), tier: 'free' },
    { id: 'carousel', name: loc('Carousel', 'عرض دوّار'), description: loc('Swipe through projects.', 'تصفّح المشاريع بالسحب.'), tier: 'free' },
    { id: 'alternating', name: loc('Alternating rows', 'صفوف متبادلة'), description: loc('Large image and text that swap sides.', 'صورة كبيرة ونص يتبادلان الجهة.'), tier: 'free' },
    { id: 'hover-reveal', name: loc('Hover-reveal list', 'قائمة تكشف الصور'), description: loc('A typographic list; each title reveals its image.', 'قائمة عناوين يكشف كلٌّ منها صورته.'), tier: 'free' },
    { id: 'bento', name: loc('Bento', 'بينتو'), description: loc('Cards of different sizes — or a whole home page.', 'بطاقات بأحجام مختلفة، أو صفحة رئيسية كاملة.'), tier: 'free' },
  ],
  schema: projectsSchema,
  defaultContent: {
    eyebrow: loc('Selected work', 'أعمال مختارة'),
    heading: loc('Projects I’m proud of', 'مشاريع أعتزّ بها'),
    intro: loc(
      'A few recent collaborations with founders, cultural institutions and product teams across the Gulf.',
      'نماذج من تعاونات حديثة مع مؤسسين ومؤسسات ثقافية وفرق منتجات في أنحاء الخليج.',
    ),
    categories: [
      { id: 'branding', label: loc('Branding', 'هوية بصرية') },
      { id: 'campaigns', label: loc('Campaigns', 'حملات') },
      { id: 'digital', label: loc('Digital', 'منتجات رقمية') },
    ],
    items: [
      {
        id: 'sahra-coffee',
        title: loc('Sahra Coffee rebrand', 'الهوية الجديدة لقهوة صحرا'),
        description: loc(
          'A warmer identity, new packaging and a menu system for a roastery growing from one café to twelve.',
          'هوية أكثر دفئًا وتغليف جديد ونظام لقوائم الطعام لمحمصة تكبر من مقهى واحد إلى اثني عشر فرعًا.',
        ),
        image: stock('art-sand', 1400, 1400, 'Sahra Coffee packaging in sand tones', 'عبوات قهوة صحرا بألوان رملية'),
        tags: ['Identity', 'Packaging'],
        link: DEMO_LINK,
        year: '2025',
        client: loc('Sahra Coffee', 'قهوة صحرا'),
        category: 'branding',
        size: 'lg',
      },
      {
        id: 'museum-night',
        title: loc('Museum Night campaign', 'حملة «ليلة المتاحف»'),
        description: loc(
          'Posters, motion and wayfinding that brought 18,000 visitors to one night of open museums in Doha.',
          'ملصقات ورسوم متحركة ولوحات إرشادية جذبت 18 ألف زائر إلى ليلة واحدة من المتاحف المفتوحة في الدوحة.',
        ),
        image: stock('event-dusk', 1920, 1080, 'Museum Night poster at dusk', 'ملصق ليلة المتاحف عند الغروب'),
        tags: ['Campaign', 'Motion'],
        link: DEMO_LINK,
        year: '2024',
        client: loc('Msheireb Arts Council', 'مجلس مشيرب للفنون'),
        category: 'campaigns',
        size: 'md',
      },
      {
        id: 'wavelength',
        title: loc('Wavelength app identity', 'هوية تطبيق «ويفلينث»'),
        description: loc(
          'A name, a logo and a design system for a fintech app that makes saving feel light.',
          'اسم وشعار ونظام تصميم لتطبيق مالي يجعل الادخار أمرًا خفيفًا.',
        ),
        image: stock('app-dusk', 1600, 1067, 'Wavelength app screens', 'شاشات تطبيق ويفلينث'),
        tags: ['Identity', 'UI'],
        link: DEMO_LINK,
        year: '2024',
        client: loc('Wavelength', 'ويفلينث'),
        category: 'digital',
        size: 'sm',
      },
      {
        id: 'bayt-al-noor',
        title: loc('Bayt Al Noor interiors', 'بيت النور للتصميم الداخلي'),
        description: loc(
          'A quiet, light-filled identity for a studio that designs homes around the courtyard.',
          'هوية هادئة يغمرها الضوء لاستوديو يصمّم البيوت حول الفناء.',
        ),
        image: stock('interior-clay', 1200, 1600, 'A calm interior in clay tones', 'مساحة داخلية هادئة بألوان طينية'),
        tags: ['Identity', 'Print'],
        link: DEMO_LINK,
        year: '2023',
        client: loc('Bayt Al Noor', 'بيت النور'),
        category: 'branding',
        size: 'tall',
      },
      {
        id: 'rahal-planner',
        title: loc('Rahal trip planner', 'مخطِّط الرحلات «رحّال»'),
        description: loc(
          'Illustration and interface design for a planner that turns a weekend idea into a booked trip.',
          'رسوم وتصميم واجهات لمخطِّط يحوّل فكرة عطلة نهاية الأسبوع إلى رحلة محجوزة.',
        ),
        image: stock('app-sea', 1920, 1080, 'Rahal trip planner dashboard', 'لوحة مخطِّط الرحلات رحّال'),
        tags: ['UI', 'Illustration'],
        link: DEMO_LINK,
        year: '2023',
        client: loc('Rahal Travel', 'رحّال للسفر'),
        category: 'digital',
        size: 'md',
      },
      {
        id: 'souq-season',
        title: loc('Souq Season festival', 'مهرجان «موسم السوق»'),
        description: loc(
          'A festival identity built from hand-drawn patterns found in the old market’s doors.',
          'هوية مهرجان مستوحاة من نقوش مرسومة يدويًا على أبواب السوق القديم.',
        ),
        image: stock('event-blush', 1600, 1067, 'Festival banners with confetti', 'لافتات المهرجان وقصاصات ملوّنة'),
        tags: ['Campaign', 'Pattern'],
        link: DEMO_LINK,
        year: '2022',
        client: loc('Souq Waqif Events', 'فعاليات سوق واقف'),
        category: 'campaigns',
        size: 'sm',
      },
    ],
    cta: { label: loc('See all work', 'كل الأعمال'), link: DEMO_LINK, style: 'outline', icon: 'arrow-right' },
  },
  editableFields: [
    {
      kind: 'select',
      path: 'columns',
      label: loc('Columns', 'الأعمدة'),
      variants: ['grid'],
      options: [
        { value: '2', label: loc('Two', 'عمودان') },
        { value: '3', label: loc('Three', 'ثلاثة أعمدة') },
      ],
    },
    {
      kind: 'boolean',
      path: 'showFilter',
      label: loc('Show category filter', 'إظهار التصفية حسب الفئة'),
      variants: ['grid', 'masonry'],
    },
    {
      kind: 'list',
      path: 'categories',
      label: loc('Categories', 'الفئات'),
      itemLabel: loc('Category', 'فئة'),
      titlePath: 'label',
      max: 12,
      fields: [
        { kind: 'text', path: 'label', label: loc('Name', 'الاسم') },
        { kind: 'string', path: 'id', label: loc('Id', 'المعرّف'), help: loc('Projects refer to a category by this id.', 'تشير المشاريع إلى الفئة بهذا المعرّف.') },
      ],
      defaultItem: { label: loc('New category', 'فئة جديدة') },
    },
    {
      kind: 'list',
      path: 'items',
      label: loc('Projects', 'المشاريع'),
      itemLabel: loc('Project', 'مشروع'),
      titlePath: 'title',
      fields: itemFields,
      defaultItem: {
        title: loc('New project', 'مشروع جديد'),
        description: loc('What it was, who it was for and what changed.', 'ما المشروع، ولمن كان، وما الذي تغيّر بعده.'),
        tags: [],
      },
    },
    { kind: 'button', path: 'cta', label: loc('Button under the list', 'زر أسفل القائمة') },
  ],
})
