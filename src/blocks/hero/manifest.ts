import { loc } from '@/schemas/fields'
import type { FieldConfig } from '../types'
import { defineManifest } from '../types'
import { heroSchema, type HeroContent } from './schema'

const stock = (id: string, en: string, ar: string, width = 1200, height = 1600) => ({
  url: `/stock/${id}.svg`,
  width,
  height,
  alt: loc(en, ar),
})

/* Variant groups for `editableFields[].variants`. */
const ALL = ['split-image', 'centered', 'full-bleed', 'video-bg', 'animated-text', 'collage', 'tilt-card', 'minimal', 'magazine-cover']
const FULL_SCREEN = ['full-bleed', 'video-bg', 'magazine-cover']

const ctaFields: FieldConfig[] = [
  { kind: 'button', path: 'primaryCta', label: loc('Main button', 'الزر الرئيسي'), variants: ALL },
  {
    kind: 'button',
    path: 'secondaryCta',
    label: loc('Second button', 'الزر الثاني'),
    variants: ALL.filter((v) => v !== 'minimal' && v !== 'magazine-cover'),
  },
]

export const manifest = defineManifest<HeroContent>({
  type: 'hero',
  name: loc('Hero', 'القسم الرئيسي'),
  description: loc(
    'The first thing visitors see: who you are, what you do and where to go next.',
    'أول ما يراه الزائر: من أنت، وماذا تقدّم، وإلى أين يتجه بعد ذلك.',
  ),
  icon: 'sparkles',
  category: 'intro',
  variants: [
    {
      id: 'split-image',
      name: loc('Text and picture', 'نص وصورة'),
      description: loc('Your words beside a portrait, with an optional soft shape behind it.', 'كلماتك بجانب صورتك، مع شكل ناعم اختياري خلفها.'),
      tier: 'free',
    },
    {
      id: 'centered',
      name: loc('Centered big type', 'عنوان كبير في المنتصف'),
      description: loc('A bold centred headline, with an optional frame.', 'عنوان عريض في المنتصف مع إطار اختياري.'),
      tier: 'free',
    },
    {
      id: 'full-bleed',
      name: loc('Full-screen picture', 'صورة بملء الشاشة'),
      description: loc('One picture or a slow slideshow behind your words.', 'صورة واحدة أو عرض صور هادئ خلف كلماتك.'),
      tier: 'free',
      bleed: true,
    },
    {
      id: 'video-bg',
      name: loc('Video background', 'خلفية فيديو'),
      description: loc('Your showreel playing silently behind the headline.', 'عرض أعمالك يتحرك بصمت خلف العنوان.'),
      tier: 'pro',
      bleed: true,
    },
    {
      id: 'animated-text',
      name: loc('Animated text', 'نص متحرك'),
      description: loc('Rotating words, a typewriter or an interactive terminal.', 'كلمات متبدّلة أو آلة كاتبة أو طرفية تفاعلية.'),
      tier: 'free',
    },
    {
      id: 'collage',
      name: loc('Collage', 'كولاج'),
      description: loc('A playful pile of pictures and stickers.', 'مجموعة مرحة من الصور والملصقات.'),
      tier: 'free',
    },
    {
      id: 'tilt-card',
      name: loc('3D card', 'بطاقة ثلاثية الأبعاد'),
      description: loc('Your portrait on a glowing card that tilts with the pointer.', 'صورتك على بطاقة مضيئة تميل مع حركة المؤشر.'),
      tier: 'pro',
    },
    {
      id: 'minimal',
      name: loc('Name only', 'الاسم فقط'),
      description: loc('Name, one line, availability and your CV. Nothing else.', 'الاسم وسطر واحد والتوفر وسيرتك الذاتية، لا أكثر.'),
      tier: 'free',
    },
    {
      id: 'magazine-cover',
      name: loc('Magazine cover', 'غلاف مجلة'),
      description: loc('Your portrait as a cover, your name as the masthead.', 'صورتك غلافًا واسمك ترويسة المجلة.'),
      tier: 'pro',
      bleed: true,
    },
  ],
  schema: heroSchema,
  defaultContent: {
    eyebrow: loc('Brand designer · Doha', 'مصممة هوية بصرية · الدوحة'),
    name: loc('Layla Haddad', 'ليلى حداد'),
    heading: loc('Brands that speak Arabic and English fluently', 'علامات تتحدث العربية والإنجليزية بطلاقة'),
    tagline: loc(
      'I design identities, packaging and campaigns for cafés, studios and cultural spaces across the Gulf.',
      'أصمّم الهويات والعبوات والحملات للمقاهي والاستوديوهات والمساحات الثقافية في أنحاء الخليج.',
    ),
    primaryCta: {
      label: loc('See my work', 'شاهد أعمالي'),
      link: { type: 'anchor', value: 'work' },
      icon: 'arrow-right',
    },
    secondaryCta: {
      label: loc('Book a call', 'احجز مكالمة'),
      link: { type: 'booking', value: '' },
    },
    avatar: stock('portrait-sand', 'Portrait of Layla Haddad', 'صورة شخصية لليلى حداد'),
    image: stock('portrait-sand', 'Layla Haddad in her studio', 'ليلى حداد في الاستوديو'),
    images: [
      { id: 'img-1', image: stock('city-sand', 'Doha skyline at golden hour', 'أفق الدوحة وقت الغروب', 1600, 1067) },
      { id: 'img-2', image: stock('art-sand', 'Calligraphic poster for Souq Waqif', 'ملصق بالخط العربي لسوق واقف', 1400, 1400) },
      { id: 'img-3', image: stock('workspace-sand', 'Sketches for a coffee roaster', 'رسومات أولية لمحمصة قهوة', 1600, 1067) },
      { id: 'img-4', image: stock('food-clay', 'Packaging for Bayt Al Qahwa', 'عبوات بيت القهوة', 1400, 1400) },
    ],
    badge: loc('Booking projects from March', 'أستقبل المشاريع ابتداءً من مارس'),
    location: loc('Doha, Qatar', 'الدوحة، قطر'),
    scrollCue: true,
    imageSide: 'end',
    blob: true,
    frame: 'none',
    textStyle: 'plain',
    kenBurns: true,
    overlayLabel: loc('25.2854° N, 51.5310° E', '25.2854° شمالًا، 51.5310° شرقًا'),
    animation: 'word-rotate',
    words: [
      { id: 'w-1', text: loc('for cafés', 'للمقاهي') },
      { id: 'w-2', text: loc('for studios', 'للاستوديوهات') },
      { id: 'w-3', text: loc('for museums', 'للمتاحف') },
    ],
    commands: [
      { id: 'c-1', command: 'whoami', output: loc('Layla Haddad — brand designer in Doha.', 'ليلى حداد، مصممة هوية بصرية في الدوحة.') },
      {
        id: 'c-2',
        command: 'ls projects',
        output: loc('bayt-al-qahwa/  msheireb-type-week/  dana-tea-house/', 'bayt-al-qahwa/  msheireb-type-week/  dana-tea-house/'),
      },
      {
        id: 'c-3',
        command: 'cat skills.txt',
        output: loc('identity · bilingual type · packaging · art direction', 'الهوية · الخط ثنائي اللغة · العبوات · الإدارة الفنية'),
      },
      {
        id: 'c-4',
        command: 'projects',
        output: loc('Three selected projects are listed below. Scroll down.', 'ثلاثة مشاريع مختارة في الأسفل، تابع النزول.'),
        typed: false,
      },
      {
        id: 'c-5',
        command: 'contact',
        output: loc('layla@haddad.studio — replies within two days.', 'layla@haddad.studio — أردّ خلال يومين.'),
        typed: false,
      },
    ],
    stickers: [
      { id: 's-1', text: loc('Hello!', 'مرحبًا!') },
      { id: 's-2', text: loc('Bilingual by default', 'ثنائية اللغة دائمًا') },
      { id: 's-3', text: loc('Est. 2017', 'منذ 2017') },
    ],
    coverLines: [
      { id: 'l-1', text: loc('Forty brands, two scripts, one voice', 'أربعون علامة وخطّان وصوت واحد') },
      { id: 'l-2', text: loc('Inside the studio in Msheireb', 'جولة في الاستوديو في مشيرب') },
      { id: 'l-3', text: loc('Why every logo starts with a story', 'لماذا يبدأ كل شعار بحكاية') },
    ],
    issue: loc('Issue 07 · Spring 2026', 'العدد 07 · ربيع 2026'),
  },
  editableFields: [
    ...ctaFields,
    { kind: 'boolean', path: 'scrollCue', label: loc('Scroll arrow', 'سهم التمرير'), variants: FULL_SCREEN },

    /* split-image */
    {
      kind: 'select',
      path: 'imageSide',
      label: loc('Picture side', 'جهة الصورة'),
      variants: ['split-image'],
      options: [
        { value: 'end', label: loc('After the text', 'بعد النص') },
        { value: 'start', label: loc('Before the text', 'قبل النص') },
      ],
    },
    { kind: 'boolean', path: 'blob', label: loc('Soft shape behind the picture', 'شكل ناعم خلف الصورة'), variants: ['split-image'] },

    /* centered */
    {
      kind: 'select',
      path: 'frame',
      label: loc('Frame', 'الإطار'),
      variants: ['centered'],
      options: [
        { value: 'none', label: loc('None', 'بدون') },
        { value: 'pattern', label: loc('Geometric frame', 'إطار هندسي') },
      ],
    },
    {
      kind: 'select',
      path: 'textStyle',
      label: loc('Headline style', 'نمط العنوان'),
      variants: ['centered'],
      options: [
        { value: 'plain', label: loc('Plain', 'عادي') },
        { value: 'gradient', label: loc('Gradient', 'متدرّج') },
        { value: 'signature', label: loc('Name as a signature', 'الاسم كتوقيع') },
      ],
    },
    { kind: 'boolean', path: 'progressBar', label: loc('Reading progress bar', 'شريط تقدّم القراءة'), variants: ['centered'] },

    /* full-bleed */
    {
      kind: 'list',
      path: 'images',
      label: loc('Pictures', 'الصور'),
      itemLabel: loc('Picture', 'صورة'),
      variants: ['full-bleed', 'collage'],
      max: 6,
      fields: [{ kind: 'image', path: 'image', label: loc('Picture', 'الصورة') }],
      defaultItem: { image: { url: '/stock/nature-sand.svg', width: 1920, height: 1080 } },
    },
    { kind: 'boolean', path: 'kenBurns', label: loc('Slow zoom', 'تكبير بطيء'), variants: ['full-bleed'] },

    /* video-bg */
    {
      kind: 'video',
      path: 'video',
      label: loc('Showreel', 'عرض الأعمال'),
      help: loc('An mp4 or webm file. Keep it short and silent-friendly.', 'ملف mp4 أو webm، ويفضّل أن يكون قصيرًا ومفهومًا بلا صوت.'),
      variants: ['video-bg'],
    },

    /* animated-text */
    {
      kind: 'select',
      path: 'animation',
      label: loc('Animation', 'الحركة'),
      variants: ['animated-text'],
      options: [
        { value: 'word-rotate', label: loc('Rotating words', 'كلمات متبدّلة') },
        { value: 'typewriter', label: loc('Typewriter', 'آلة كاتبة') },
        { value: 'terminal', label: loc('Terminal', 'طرفية') },
      ],
    },
    {
      kind: 'list',
      path: 'words',
      label: loc('Animated words', 'الكلمات المتحركة'),
      itemLabel: loc('Word', 'كلمة'),
      titlePath: 'text',
      variants: ['animated-text'],
      max: 8,
      fields: [{ kind: 'text', path: 'text', label: loc('Word', 'الكلمة'), maxLength: 40 }],
      defaultItem: { text: loc('for you', 'لك') },
    },
    {
      kind: 'list',
      path: 'commands',
      label: loc('Terminal commands', 'أوامر الطرفية'),
      itemLabel: loc('Command', 'أمر'),
      titlePath: 'command',
      variants: ['animated-text'],
      max: 12,
      fields: [
        { kind: 'string', path: 'command', label: loc('Command', 'الأمر'), placeholder: 'whoami' },
        { kind: 'text', path: 'output', label: loc('Answer', 'الإجابة'), multiline: true },
        {
          kind: 'boolean',
          path: 'typed',
          label: loc('Type it on load', 'اكتبه عند فتح الصفحة'),
          help: loc('Off: it only answers when a visitor types it.', 'عند الإيقاف لا يظهر إلا إذا كتبه الزائر.'),
        },
      ],
      defaultItem: { command: 'hello', output: loc('Hi there!', 'أهلًا بك!'), typed: true },
    },

    /* collage */
    {
      kind: 'list',
      path: 'stickers',
      label: loc('Stickers', 'الملصقات'),
      itemLabel: loc('Sticker', 'ملصق'),
      titlePath: 'text',
      variants: ['collage'],
      max: 3,
      fields: [{ kind: 'text', path: 'text', label: loc('Text', 'النص'), maxLength: 30 }],
      defaultItem: { text: loc('New!', 'جديد!') },
    },

    /* magazine-cover */
    {
      kind: 'list',
      path: 'coverLines',
      label: loc('Cover lines', 'عناوين الغلاف'),
      itemLabel: loc('Cover line', 'عنوان'),
      titlePath: 'text',
      variants: ['magazine-cover'],
      max: 4,
      fields: [{ kind: 'text', path: 'text', label: loc('Text', 'النص'), maxLength: 80 }],
      defaultItem: { text: loc('A new story', 'حكاية جديدة') },
    },
  ],
})
