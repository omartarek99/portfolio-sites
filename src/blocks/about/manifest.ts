import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { aboutSchema, type AboutContent } from './schema'

export const manifest = defineManifest<AboutContent>({
  type: 'about',
  name: loc('About', 'نبذة'),
  description: loc('Tell your story: who you are and how you got here.', 'احكِ قصتك: من أنت وكيف وصلت إلى هنا.'),
  icon: 'users',
  category: 'about',
  variants: [
    {
      id: 'text-portrait',
      name: loc('Text + portrait', 'نص وصورة شخصية'),
      description: loc('Your story beside a portrait.', 'قصتك إلى جانب صورتك الشخصية.'),
      tier: 'free',
    },
    {
      id: 'big-quote',
      name: loc('Big quote', 'اقتباس كبير'),
      description: loc('One large pull quote with your name under it.', 'اقتباس واحد بارز يليه اسمك.'),
      tier: 'free',
    },
    {
      id: 'two-column',
      name: loc('Two-column story', 'قصة في عمودين'),
      description: loc('A longer story set in two columns, with an optional drop cap.', 'قصة أطول في عمودين، مع حرف استهلالي اختياري.'),
      tier: 'free',
    },
    {
      id: 'timeline-intro',
      name: loc('Timeline intro', 'مقدمة ومحطات'),
      description: loc('A short intro and the key moments of your path on a line.', 'مقدمة قصيرة وأبرز محطات مسيرتك على خط زمني.'),
      tier: 'free',
    },
  ],
  schema: aboutSchema,
  defaultContent: {
    eyebrow: loc('About', 'نبذة عني'),
    heading: loc('A designer who starts with the story', 'مصممة تبدأ من الحكاية'),
    intro: loc(
      'I have spent seven years helping startups and cultural institutions find their visual voice, from the first logo to full campaigns.',
      'أمضيت سبع سنوات أساعد الشركات الناشئة والمؤسسات الثقافية في إيجاد صوتها البصري، من أول شعار حتى الحملات الكاملة.',
    ),
    body: loc(
      '<p>Growing up between Amman and Doha, I sketched shop signs from the back seat of my father’s car. That habit of noticing how places speak to people is still where every project begins: before colours or typefaces, I ask what the brand should sound like in a room.</p>' +
        '<p>Since 2017 I have worked with more than forty teams, from a neighbourhood coffee roaster to a national museum. I design identities that work in Arabic and English from day one, because here a brand is rarely read in only one script.</p>' +
        '<p>Away from my desk you will find me teaching a weekend lettering class in Msheireb, or hunting for old packaging in the souq.</p>',
      '<p>نشأت بين عمّان والدوحة، وكنت أرسم لافتات المحال من المقعد الخلفي في سيارة أبي. وما زالت تلك العادة، أن ألاحظ كيف تخاطب الأماكن الناس، نقطة البداية في كل مشروع: قبل الألوان والخطوط أسأل كيف ينبغي أن يكون صوت العلامة حين تُذكر في مجلس.</p>' +
        '<p>منذ عام 2017 عملت مع أكثر من أربعين فريقًا، من محمصة قهوة في الحي إلى متحف وطني. أصمّم هويات تعمل بالعربية والإنجليزية منذ اليوم الأول، فالعلامة هنا قلّما تُقرأ بخط واحد.</p>' +
        '<p>وحين أبتعد عن مكتبي تجدونني أقدّم ورشة أسبوعية في فن الحروف في مشيرب، أو أبحث عن عبوات قديمة في السوق.</p>',
    ),
    image: {
      url: '/stock/portrait-sand.svg',
      alt: loc('Portrait of Layla Haddad', 'صورة شخصية لليلى حداد'),
      width: 1200,
      height: 1600,
    },
    imageSide: 'end',
    cta: {
      label: loc('Let’s work together', 'لنعمل معًا'),
      link: { type: 'anchor', value: 'contact' },
      style: 'outline',
      icon: 'arrow-right',
    },
    quote: loc(
      'A brand is not what you draw. It is what people repeat about you after you have left the room.',
      'العلامة ليست ما ترسمه، بل ما يردّده الناس عنك بعد أن تغادر المكان.',
    ),
    attribution: loc('Layla Haddad', 'ليلى حداد'),
    attributionRole: loc('Brand designer, Doha', 'مصممة هوية بصرية، الدوحة'),
    dropCap: true,
    milestones: [
      {
        id: 'm1',
        year: '2017',
        title: loc('First freelance identity', 'أول هوية بصرية مستقلة'),
        text: loc('A logo for a family bakery in Al Wakrah, paid for partly in bread.', 'شعار لمخبز عائلي في الوكرة، وكان جزء من الأجر خبزًا.'),
      },
      {
        id: 'm2',
        year: '2018',
        title: loc('Joined Pixel & Pine', 'الانضمام إلى «بيكسل آند باين»'),
        text: loc('Three years of campaigns for retail and hospitality clients.', 'ثلاث سنوات من الحملات لعملاء في قطاعي التجزئة والضيافة.'),
      },
      {
        id: 'm3',
        year: '2021',
        title: loc('Senior designer at Nova Studio', 'مصممة أولى في «نوفا ستوديو»'),
        text: loc('Leading identity work for cultural institutions across the Gulf.', 'قيادة مشاريع الهوية لمؤسسات ثقافية في أنحاء الخليج.'),
      },
      {
        id: 'm4',
        year: '2024',
        title: loc('Museum night campaign', 'حملة «ليلة المتحف»'),
        text: loc('Our bilingual campaign brought 12,000 visitors in a single evening.', 'حملتنا باللغتين استقطبت 12,000 زائر في أمسية واحدة.'),
      },
    ],
  },
  editableFields: [
    {
      kind: 'select',
      path: 'imageSide',
      label: loc('Portrait side', 'موضع الصورة'),
      variants: ['text-portrait'],
      options: [
        { value: 'start', label: loc('Before the text', 'قبل النص') },
        { value: 'end', label: loc('After the text', 'بعد النص') },
      ],
    },
    { kind: 'image', path: 'image', label: loc('Portrait', 'الصورة الشخصية'), variants: ['text-portrait', 'big-quote'] },
    { kind: 'button', path: 'cta', label: loc('Button', 'الزر'), variants: ['text-portrait', 'two-column'] },
    {
      kind: 'boolean',
      path: 'dropCap',
      label: loc('Drop cap', 'حرف استهلالي'),
      help: loc('Enlarges the first letter. Latin text only.', 'يكبّر الحرف الأول. للنص اللاتيني فقط.'),
      variants: ['two-column'],
    },
    {
      kind: 'list',
      path: 'milestones',
      label: loc('Milestones', 'المحطات'),
      itemLabel: loc('Milestone', 'محطة'),
      titlePath: 'title',
      variants: ['timeline-intro'],
      max: 6,
      fields: [
        { kind: 'string', path: 'year', label: loc('Year', 'السنة'), placeholder: '2024' },
        { kind: 'text', path: 'title', label: loc('Title', 'العنوان') },
        { kind: 'text', path: 'text', label: loc('Details', 'التفاصيل'), multiline: true },
      ],
      defaultItem: { year: '', title: loc('A moment worth mentioning', 'محطة تستحق الذكر') },
    },
  ],
})
