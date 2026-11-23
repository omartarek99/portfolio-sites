import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { publicationsSchema, type PublicationsContent } from './schema'

const TYPE_OPTIONS = [
  { value: 'article', label: loc('Article', 'مقال') },
  { value: 'chapter', label: loc('Book chapter', 'فصل في كتاب') },
  { value: 'talk', label: loc('Talk', 'محاضرة') },
  { value: 'report', label: loc('Report', 'تقرير') },
]

export const manifest = defineManifest<PublicationsContent>({
  type: 'publications',
  name: loc('Publications', 'المنشورات'),
  description: loc('Articles, chapters, talks and reports with full citations.', 'مقالات وفصول ومحاضرات وتقارير مع الاستشهاد الكامل.'),
  icon: 'book-open',
  category: 'work',
  variants: [
    {
      id: 'citations',
      name: loc('Citations', 'قائمة الاستشهادات'),
      description: loc('A list with full citation, year, venue and links.', 'قائمة بالاستشهاد الكامل والسنة وجهة النشر والروابط.'),
      tier: 'free',
    },
    {
      id: 'by-year',
      name: loc('By year', 'حسب السنة'),
      description: loc('Grouped under year headings, filterable by type.', 'مجمّعة تحت عناوين السنوات، مع تصفية حسب النوع.'),
      tier: 'free',
    },
  ],
  schema: publicationsSchema,
  defaultContent: {
    eyebrow: loc('Research', 'البحث'),
    heading: loc('Publications and talks', 'المنشورات والمحاضرات'),
    intro: loc(
      'Writing on active learning, classroom practice and teacher development in the Gulf.',
      'كتابات عن التعلّم النشط والممارسة الصفية وتطوير المعلمين في الخليج.',
    ),
    items: [
      {
        id: 'p1',
        title: loc(
          'Active learning in Gulf secondary classrooms: a mixed-methods study',
          'التعلّم النشط في فصول المرحلة الثانوية بالخليج: دراسة بمنهج مختلط',
        ),
        authors: loc('Al-Hajri, F. & Mansour, S.', 'الهاجري، ف. ومنصور، س.'),
        venue: loc('Gulf Journal of Education Research, 14(2), 45–68', 'مجلة الخليج للبحوث التربوية، 14(2)، \u206645–68\u2069'),
        year: 2025,
        type: 'article',
        links: [
          { id: 'p1-doi', label: loc('DOI', 'DOI'), link: { type: 'url', value: 'https://doi.org/10.0000/gjer.2025.142' } },
          { id: 'p1-pdf', label: loc('PDF', 'PDF'), link: { type: 'url', value: 'https://example.com/papers/al-hajri.pdf' } },
        ],
        abstract: loc(
          'Surveys of 312 students and interviews with 18 teachers in Qatar show that short, structured pair tasks raised participation most, especially among quieter students.',
          'تُظهر استبانات شملت 312 طالبًا ومقابلات مع 18 معلمًا في قطر أن المهام الثنائية القصيرة والمنظّمة رفعت المشاركة أكثر من غيرها، ولا سيما بين الطلاب الأقل حديثًا.',
        ),
      },
      {
        id: 'p2',
        title: loc('Making learning joyful: classroom routines that last', 'تعلّم ممتع: روتين صفي يدوم'),
        authors: loc('Al-Hajri, F.', 'الهاجري، ف.'),
        venue: loc('Annual Teachers Forum, Doha', 'الملتقى السنوي للمعلمين، الدوحة'),
        year: 2025,
        type: 'talk',
        links: [{ id: 'p2-slides', label: loc('Slides', 'العرض التقديمي'), link: { type: 'url', value: 'https://example.com/slides/joyful-learning' } }],
      },
      {
        id: 'p3',
        title: loc('Mentoring new teachers in their first year', 'إرشاد المعلمين الجدد في عامهم الأول'),
        authors: loc('Al-Hajri, F. & Al-Kuwari, M.', 'الهاجري، ف. والكواري، م.'),
        venue: loc('In R. Haddad (Ed.), Teaching in the Gulf Today (pp. 101–124). Bayan Press', 'في: ر. حداد (محرر)، التعليم في الخليج اليوم (ص \u2066101–124\u2069). دار بيان'),
        year: 2024,
        type: 'chapter',
        abstract: loc(
          'A practical model for weekly mentoring conversations, tested with new English teachers across six schools.',
          'نموذج عملي لجلسات إرشاد أسبوعية، جُرّب مع معلمي لغة إنجليزية جدد في ست مدارس.',
        ),
      },
      {
        id: 'p4',
        title: loc('Reading for pleasure: a school-wide pilot', 'القراءة للمتعة: تجربة على مستوى المدرسة'),
        authors: loc('Al-Hajri, F., Nasser, L. & Saleh, H.', 'الهاجري، ف. وناصر، ل. وصالح، ح.'),
        venue: loc('Ministry of Education and Higher Education, Qatar', 'وزارة التربية والتعليم والتعليم العالي، قطر'),
        year: 2023,
        type: 'report',
        links: [{ id: 'p4-pdf', label: loc('PDF', 'PDF'), link: { type: 'url', value: 'https://example.com/papers/al-hajri.pdf' } }],
      },
      {
        id: 'p5',
        title: loc('Feedback that students actually read', 'ملاحظات يقرؤها الطلاب فعلًا'),
        authors: loc('Al-Hajri, F.', 'الهاجري، ف.'),
        venue: loc('English Teaching in Arabia, 9(1), 12–20', 'تدريس الإنجليزية في الجزيرة العربية، 9(1)، \u206612–20\u2069'),
        year: 2022,
        type: 'article',
        links: [{ id: 'p5-doi', label: loc('DOI', 'DOI'), link: { type: 'url', value: 'https://doi.org/10.0000/eta.2022.091' } }],
      },
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Publications', 'المنشورات'),
      itemLabel: loc('Publication', 'منشور'),
      titlePath: 'title',
      fields: [
        { kind: 'text', path: 'title', label: loc('Title', 'العنوان') },
        { kind: 'text', path: 'authors', label: loc('Authors', 'المؤلفون') },
        { kind: 'text', path: 'venue', label: loc('Venue', 'جهة النشر') },
        { kind: 'number', path: 'year', label: loc('Year', 'السنة'), min: 1900, max: 2100, step: 1 },
        { kind: 'select', path: 'type', label: loc('Type', 'النوع'), options: TYPE_OPTIONS },
        { kind: 'text', path: 'abstract', label: loc('Abstract', 'الملخّص'), multiline: true },
        {
          kind: 'list',
          path: 'links',
          label: loc('Links', 'الروابط'),
          itemLabel: loc('Link', 'رابط'),
          titlePath: 'label',
          max: 6,
          fields: [
            { kind: 'text', path: 'label', label: loc('Label', 'النص') },
            { kind: 'link', path: 'link', label: loc('Link', 'الرابط') },
          ],
          defaultItem: { label: loc('PDF', 'PDF'), link: { type: 'url', value: '' } },
        },
      ],
      defaultItem: { title: loc('New publication', 'منشور جديد'), year: 2026, type: 'article' },
    },
  ],
})
