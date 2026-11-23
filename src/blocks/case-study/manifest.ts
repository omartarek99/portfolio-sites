import { loc, type ImageRef } from '@/schemas/fields'
import { defineManifest } from '../types'
import { caseStudySchema, type CaseStudyContent } from './schema'

function stock(id: string, width: number, height: number, en: string, ar: string): ImageRef {
  return { url: `/stock/${id}.svg`, width, height, alt: loc(en, ar) }
}

export const manifest = defineManifest<CaseStudyContent>({
  type: 'caseStudy',
  name: loc('Case study', 'دراسة حالة'),
  description: loc(
    'The full story of one project: the problem, how you worked and what changed.',
    'القصة الكاملة لمشروع واحد: المشكلة، وطريقة العمل، وما الذي تغيّر.',
  ),
  icon: 'file-text',
  category: 'work',
  variants: [
    {
      id: 'problem-process-result',
      name: loc('Problem, process, result', 'المشكلة، الطريقة، النتيجة'),
      description: loc('Project facts on top, then labelled sections.', 'حقائق المشروع في الأعلى ثم أقسام معنونة.'),
      tier: 'free',
    },
    {
      id: 'image-story',
      name: loc('Image story', 'قصة مصوّرة'),
      description: loc('Narrative blocks that alternate with full-width images.', 'فقرات سردية تتناوب مع صور بعرض الصفحة.'),
      tier: 'free',
    },
  ],
  schema: caseStudySchema,
  defaultContent: {
    eyebrow: loc('Case study', 'دراسة حالة'),
    title: loc('Sahra Coffee: one identity for twelve cafés', 'قهوة صحرا: هوية واحدة لاثني عشر مقهى'),
    subtitle: loc(
      'A warmer brand, new packaging and a menu system for a Doha roastery that was growing faster than its look.',
      'علامة أكثر دفئًا وتغليف جديد ونظام لقوائم الطعام لمحمصة في الدوحة كانت تكبر أسرع من مظهرها.',
    ),
    cover: stock('workspace-sand', 1600, 1067, 'Sketches and packaging samples on a desk', 'رسومات أولية ونماذج تغليف على مكتب'),
    meta: [
      { id: 'client', label: loc('Client', 'العميل'), value: loc('Sahra Coffee', 'قهوة صحرا') },
      { id: 'role', label: loc('Role', 'الدور'), value: loc('Brand and packaging design', 'تصميم الهوية والتغليف') },
      { id: 'year', label: loc('Year', 'السنة'), value: loc('2025', '2025') },
      { id: 'duration', label: loc('Duration', 'المدة'), value: loc('14 weeks', '14 أسبوعًا') },
    ],
    sections: [
      {
        id: 'problem',
        label: loc('Problem', 'المشكلة'),
        heading: loc('A loved café that looked different in every branch', 'مقهى محبوب يختلف شكله من فرع إلى آخر'),
        body: loc(
          '<p>Sahra opened its first café in 2016 with a hand-painted sign and a regular crowd. Nine years and eleven branches later, every location had its own menu, its own cups and its own idea of the logo.</p><p>Customers recognised the coffee, not the brand. With retail packaging about to reach supermarket shelves, the founders needed one identity that still felt like the first café.</p>',
          '<p>افتتحت «صحرا» مقهاها الأول عام 2016 بلافتة مرسومة باليد وزبائن دائمين. وبعد تسع سنوات وأحد عشر فرعًا، صار لكل فرع قائمته وأكوابه وتصوّره الخاص للشعار.</p><p>كان الزبائن يعرفون القهوة لا العلامة. ومع اقتراب وصول عبوات البيع إلى رفوف المتاجر، احتاج المؤسسون إلى هوية واحدة تحتفظ بروح المقهى الأول.</p>',
        ),
        images: [
          {
            id: 'before',
            image: stock('food-clay', 1400, 1400, 'A table at the first Sahra café', 'طاولة في أول مقهى لصحرا'),
            caption: loc('The first café, where the warm palette comes from.', 'المقهى الأول، ومنه جاءت الألوان الدافئة.'),
          },
        ],
      },
      {
        id: 'process',
        label: loc('Process', 'الطريقة'),
        heading: loc('Listening first, drawing second', 'الإصغاء أولًا ثم الرسم'),
        body: loc(
          '<p>I spent the first two weeks behind the counter in three branches, then ran a workshop with baristas and the founding family.</p><ul><li>Twenty-four interviews with regulars and staff</li><li>Three identity routes, tested on real cups and bags</li><li>A bilingual wordmark drawn so Arabic and Latin share one rhythm</li></ul><p>The chosen route borrows its curves from dunes at sunset and its colours from roasted beans.</p>',
          '<p>قضيت الأسبوعين الأولين خلف طاولة التحضير في ثلاثة فروع، ثم أدرت ورشة عمل مع معدّي القهوة والعائلة المؤسِّسة.</p><ul><li>أربع وعشرون مقابلة مع الزبائن الدائمين والموظفين</li><li>ثلاثة اتجاهات للهوية، جُرّبت على أكواب وأكياس حقيقية</li><li>شعار كتابي بلغتين رُسم ليتشارك الحرفان العربي واللاتيني إيقاعًا واحدًا</li></ul><p>استعار الاتجاه المختار انحناءاته من الكثبان عند الغروب وألوانه من حبوب البن المحمّصة.</p>',
        ),
        images: [
          {
            id: 'routes',
            image: stock('art-sand', 1400, 1400, 'Identity sketches in sand tones', 'رسومات الهوية بألوان رملية'),
            caption: loc('Early shapes for the wordmark.', 'أشكال أولية للشعار الكتابي.'),
          },
          {
            id: 'palette',
            image: stock('art-blush', 1400, 1400, 'Colour studies for the packaging', 'دراسات لونية للتغليف'),
            caption: loc('Colour studies for the retail bags.', 'دراسات لونية لأكياس البيع.'),
          },
        ],
      },
      {
        id: 'result',
        label: loc('Result', 'النتيجة'),
        heading: loc('One identity that travels', 'هوية واحدة تنتقل إلى كل مكان'),
        body: loc(
          '<p>The new system rolled out to all twelve cafés in nine weeks, with a guide short enough for a branch manager to read over one coffee. The retail range launched in forty stores the same month.</p>',
          '<p>طُبّق النظام الجديد في المقاهي الاثني عشر خلال تسعة أسابيع، مع دليل قصير يكفي مدير الفرع فنجان قهوة واحد لقراءته. وفي الشهر نفسه وصلت عبوات البيع إلى أربعين متجرًا.</p>',
        ),
        images: [
          {
            id: 'after',
            image: stock('interior-clay', 1200, 1600, 'The refreshed café interior', 'المقهى بعد التجديد'),
            caption: loc('The Msheireb branch after the rollout.', 'فرع مشيرب بعد تطبيق الهوية.'),
          },
        ],
      },
    ],
    resultsHeading: loc('Six months later', 'بعد ستة أشهر'),
    results: [
      { id: 'orders', value: loc('+38%', '+38%'), label: loc('repeat orders', 'زيادة في الطلبات المتكررة') },
      { id: 'branches', value: loc('12', '12'), label: loc('cafés rebranded', 'مقهى بالهوية الجديدة') },
      { id: 'stores', value: loc('40', '40'), label: loc('stores stocking the range', 'متجرًا يبيع المنتجات') },
      { id: 'rollout', value: loc('9', '9'), label: loc('weeks to roll out', 'أسابيع للتطبيق') },
    ],
    next: {
      title: loc('Museum Night campaign', 'حملة «ليلة المتاحف»'),
      link: { type: 'url', value: '#' },
      image: stock('event-dusk', 1920, 1080, 'Museum Night poster at dusk', 'ملصق ليلة المتاحف عند الغروب'),
    },
  },
  editableFields: [
    {
      kind: 'list',
      path: 'meta',
      label: loc('Project facts', 'حقائق المشروع'),
      itemLabel: loc('Fact', 'معلومة'),
      titlePath: 'label',
      max: 8,
      fields: [
        { kind: 'text', path: 'label', label: loc('Label', 'التسمية') },
        { kind: 'text', path: 'value', label: loc('Value', 'القيمة') },
      ],
      defaultItem: { label: loc('Label', 'التسمية'), value: loc('Value', 'القيمة') },
    },
    {
      kind: 'list',
      path: 'sections',
      label: loc('Sections', 'الأقسام'),
      itemLabel: loc('Section', 'قسم'),
      titlePath: 'heading',
      max: 20,
      fields: [
        { kind: 'text', path: 'label', label: loc('Label', 'التسمية'), help: loc('For example “Problem”.', 'مثل «المشكلة».') },
        { kind: 'text', path: 'heading', label: loc('Heading', 'العنوان') },
        { kind: 'richtext', path: 'body', label: loc('Text', 'النص') },
        {
          kind: 'list',
          path: 'images',
          label: loc('Images', 'الصور'),
          itemLabel: loc('Image', 'صورة'),
          titlePath: 'caption',
          max: 6,
          fields: [
            { kind: 'image', path: 'image', label: loc('Image', 'الصورة') },
            { kind: 'text', path: 'caption', label: loc('Caption', 'التعليق') },
          ],
          defaultItem: {},
        },
      ],
      defaultItem: {
        label: loc('Label', 'التسمية'),
        heading: loc('Section heading', 'عنوان القسم'),
        body: loc('<p>Tell this part of the story.</p>', '<p>اروِ هذا الجزء من القصة.</p>'),
        images: [],
      },
    },
    {
      kind: 'list',
      path: 'results',
      label: loc('Results', 'النتائج'),
      itemLabel: loc('Result', 'نتيجة'),
      titlePath: 'label',
      max: 8,
      fields: [
        { kind: 'text', path: 'value', label: loc('Number', 'الرقم') },
        { kind: 'text', path: 'label', label: loc('Label', 'التسمية') },
      ],
      defaultItem: { value: loc('100%', '100%'), label: loc('What it measures', 'ما الذي يقيسه') },
    },
    { kind: 'text', path: 'next.title', label: loc('Next project: title', 'المشروع التالي: العنوان') },
    { kind: 'link', path: 'next.link', label: loc('Next project: link', 'المشروع التالي: الرابط') },
    { kind: 'image', path: 'next.image', label: loc('Next project: image', 'المشروع التالي: الصورة') },
  ],
})
