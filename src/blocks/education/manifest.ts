import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { educationSchema, type EducationContent } from './schema'

export const manifest = defineManifest<EducationContent>({
  type: 'education',
  name: loc('Education', 'التعليم'),
  description: loc('Degrees, diplomas and courses.', 'الشهادات والدبلومات والدورات.'),
  icon: 'graduation-cap',
  category: 'about',
  variants: [
    {
      id: 'list',
      name: loc('List', 'قائمة'),
      description: loc('One row per qualification, dates at the side.', 'صف لكل مؤهل، والتواريخ على الجانب.'),
      tier: 'free',
    },
    {
      id: 'cards',
      name: loc('Cards', 'بطاقات'),
      description: loc('One card per qualification.', 'بطاقة لكل مؤهل.'),
      tier: 'free',
    },
  ],
  schema: educationSchema,
  defaultContent: {
    eyebrow: loc('Education', 'التعليم'),
    heading: loc('Education and training', 'الدراسة والتدريب'),
    items: [
      {
        id: 'e1',
        qualification: loc('B.A. in Graphic Design', 'بكالوريوس في التصميم الجرافيكي'),
        institution: loc('Gulf College of Art & Design', 'كلية الخليج للفنون والتصميم'),
        period: '2013 – 2017',
        location: loc('Doha, Qatar', 'الدوحة، قطر'),
        description: loc(
          'Graduated with honours. Final project on bilingual wayfinding for public transport.',
          'تخرّجت بمرتبة الشرف. تناول مشروع التخرج اللافتات الإرشادية باللغتين في النقل العام.',
        ),
        logo: { url: '/stock/art-sea.svg', alt: loc('Gulf College of Art & Design logo', 'شعار كلية الخليج للفنون والتصميم'), width: 1600, height: 1067 },
      },
      {
        id: 'e2',
        qualification: loc('Professional Diploma in Brand Strategy', 'دبلوم مهني في استراتيجية العلامات التجارية'),
        institution: loc('Bayan Institute for Design', 'معهد بيان للتصميم'),
        period: '2019',
        location: loc('Dubai, UAE', 'دبي، الإمارات'),
        description: loc(
          'A six-month evening programme on positioning, naming and research.',
          'برنامج مسائي مدته ستة أشهر في التموضع والتسمية والبحث.',
        ),
      },
      {
        id: 'e3',
        qualification: loc('Certificate in Arabic Type Design', 'شهادة في تصميم الخطوط العربية'),
        institution: loc('Huroof Workshop', 'ورشة حروف'),
        period: '2022',
        location: loc('Online', 'عن بُعد'),
        description: loc(
          'Twelve weeks drawing a text typeface, from first sketch to working font.',
          'اثنا عشر أسبوعًا في رسم خط نصي، من المسودة الأولى حتى ملف الخط الجاهز.',
        ),
      },
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Qualifications', 'المؤهلات'),
      itemLabel: loc('Qualification', 'مؤهل'),
      titlePath: 'qualification',
      fields: [
        { kind: 'text', path: 'qualification', label: loc('Qualification', 'المؤهل') },
        { kind: 'text', path: 'institution', label: loc('Institution', 'الجهة التعليمية') },
        { kind: 'string', path: 'period', label: loc('Period', 'الفترة'), placeholder: '2013 – 2017' },
        { kind: 'text', path: 'location', label: loc('Location', 'المكان') },
        { kind: 'text', path: 'description', label: loc('Description', 'الوصف'), multiline: true },
        { kind: 'image', path: 'logo', label: loc('Logo', 'الشعار') },
      ],
      defaultItem: { qualification: loc('Degree or course', 'الشهادة أو الدورة'), institution: loc('Institution', 'اسم الجهة التعليمية'), period: '' },
    },
  ],
})
