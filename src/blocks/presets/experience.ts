/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const experiencePresets: SectionPreset[] = [
  {
    id: 'experience-aurora',
    name: {
      en: 'Aurora · Vertical timeline',
      ar: 'أورورا · خط زمني عمودي',
    },
    category: 'about',
    blockType: 'experience',
    variant: 'timeline',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Experience',
        ar: 'الخبرة',
      },
      heading: {
        en: 'The road so far',
        ar: 'الطريق حتى الآن',
      },
      items: [
        {
          id: 'x1',
          role: {
            en: 'Senior Brand Designer',
            ar: 'مصممة هوية أولى',
          },
          organisation: {
            en: 'Nova Studio',
            ar: 'استوديو نوفا',
          },
          start: '2021',
          current: true,
          location: {
            en: 'Doha',
            ar: 'الدوحة',
          },
          description: {
            en: 'Lead designer on identity projects for cafés, museums and fintech startups. I run discovery workshops, set the creative direction and mentor two junior designers.',
            ar: 'أقود مشاريع الهوية للمقاهي والمتاحف والشركات الناشئة في التقنية المالية. أدير ورش الاستكشاف وأحدد التوجه الإبداعي وأوجّه مصممَين مبتدئَين.',
          },
        },
        {
          id: 'x2',
          role: {
            en: 'Designer',
            ar: 'مصممة',
          },
          organisation: {
            en: 'Pixel & Pine',
            ar: 'بكسل آند باين',
          },
          start: '2018',
          end: '2021',
          location: {
            en: 'Beirut',
            ar: 'بيروت',
          },
          description: {
            en: 'Designed campaigns, packaging and social systems for regional retail and hospitality brands.',
            ar: 'صممت حملات وتغليفًا وأنظمة لمنصات التواصل لعلامات إقليمية في التجزئة والضيافة.',
          },
        },
        {
          id: 'x3',
          role: {
            en: 'Junior Designer',
            ar: 'مصممة مبتدئة',
          },
          organisation: {
            en: 'Freelance',
            ar: 'عمل حر',
          },
          start: '2017',
          end: '2018',
          description: {
            en: 'Logos, menus and event posters for small businesses — and the lesson that every brief hides a story.',
            ar: 'شعارات وقوائم طعام وملصقات فعاليات لمشاريع صغيرة، ومعها درس أن كل طلب تصميم يخفي قصة.',
          },
        },
      ],
    },
  },
  {
    id: 'experience-majlis',
    name: {
      en: 'Majlis · Cards',
      ar: 'مجلس · بطاقات',
    },
    category: 'about',
    blockType: 'experience',
    variant: 'cards',
    tier: 'free',
    fromTemplate: 'majlis',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Experience',
        ar: 'الخبرات',
      },
      heading: {
        en: 'Selected roles',
        ar: 'مناصب مختارة',
      },
      items: [
        {
          id: 'majlis-x-1',
          role: {
            en: 'Senior Education Policy Advisor',
            ar: 'مستشار أول للسياسات التعليمية',
          },
          organisation: {
            en: 'National Education Development Council',
            ar: 'المجلس الوطني لتطوير التعليم',
          },
          start: '2018',
          current: true,
          location: {
            en: 'Doha',
            ar: 'الدوحة',
          },
          description: {
            en: 'Advises leadership on national curriculum reform, school accountability and teacher licensing frameworks.',
            ar: 'يقدّم المشورة للقيادات في إصلاح المناهج الوطنية، ومساءلة المدارس، وأطر ترخيص المعلمين.',
          },
        },
        {
          id: 'majlis-x-2',
          role: {
            en: 'Director of Institutional Performance',
            ar: 'مدير الأداء المؤسسي',
          },
          organisation: {
            en: 'Gulf Institute for Public Administration',
            ar: 'المعهد الخليجي للإدارة العامة',
          },
          start: '2012',
          end: '2018',
          location: {
            en: 'Doha',
            ar: 'الدوحة',
          },
          description: {
            en: 'Built the institute’s first performance framework, adopted by eleven public bodies.',
            ar: 'بنى أول إطار للأداء المؤسسي في المعهد، واعتمدته إحدى عشرة جهة حكومية.',
          },
        },
        {
          id: 'majlis-x-3',
          role: {
            en: 'Head of Curriculum Development',
            ar: 'رئيس قسم تطوير المناهج',
          },
          organisation: {
            en: 'Ministry-affiliated Curriculum Centre',
            ar: 'مركز المناهج التابع للوزارة',
          },
          start: '2008',
          end: '2012',
          location: {
            en: 'Doha',
            ar: 'الدوحة',
          },
          description: {
            en: 'Led the redesign of the secondary science and Arabic language curricula.',
            ar: 'قاد إعادة تصميم مناهج العلوم واللغة العربية للمرحلة الثانوية.',
          },
        },
      ],
      cta: {
        label: {
          en: 'Full experience',
          ar: 'الخبرات كاملة',
        },
        link: {
          type: 'none',
          value: '',
        },
        style: 'outline',
      },
    },
  },
  {
    id: 'experience-minimal-cv',
    name: {
      en: 'Minimal CV · Compact CV list',
      ar: 'سيرة بسيطة · قائمة سيرة ذاتية مختصرة',
    },
    category: 'about',
    blockType: 'experience',
    variant: 'compact',
    tier: 'free',
    fromTemplate: 'minimal-cv',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Experience',
        ar: 'الخبرة',
      },
      heading: {
        en: 'Work history',
        ar: 'الخبرة العملية',
      },
      items: [
        {
          id: 'x1',
          role: {
            en: 'Project Engineer',
            ar: 'مهندس مشاريع',
          },
          organisation: {
            en: 'GulfBuild Co.',
            ar: 'شركة الخليج للبناء',
          },
          start: '2022',
          current: true,
          location: {
            en: 'Doha, Qatar',
            ar: 'الدوحة، قطر',
          },
          description: {
            en: '<ul><li>Lead mechanical works on a 32-storey office tower, coordinating 6 subcontractors and a QAR 18M budget.</li><li>Redesigned the chilled-water layout, cutting projected cooling load by 15%.</li><li>Introduced a weekly commissioning checklist now used on every GulfBuild site.</li></ul>',
            ar: '<ul><li>أقود الأعمال الميكانيكية في برج مكاتب من 32 طابقًا، وأنسّق مع 6 مقاولين من الباطن بميزانية 18 مليون ريال.</li><li>أعدت تصميم شبكة المياه المبرّدة فانخفض حمل التبريد المتوقع بنسبة 15%.</li><li>أطلقت قائمة فحص أسبوعية للتشغيل التجريبي تُستخدم اليوم في جميع مواقع الشركة.</li></ul>',
          },
          tags: ['HVAC', 'Revit MEP', 'Commissioning'],
        },
        {
          id: 'x2',
          role: {
            en: 'Graduate Engineer',
            ar: 'مهندس حديث التخرج',
          },
          organisation: {
            en: 'Arabian Utilities',
            ar: 'المرافق العربية',
          },
          start: '2020',
          end: '2022',
          location: {
            en: 'Riyadh, Saudi Arabia',
            ar: 'الرياض، السعودية',
          },
          description: {
            en: '<ul><li>Carried out energy audits on 14 schools and two hospitals.</li><li>Recommended retrofits that saved an average of 24% on annual electricity bills.</li></ul>',
            ar: '<ul><li>أجريت تدقيقًا للطاقة في 14 مدرسة ومستشفيين.</li><li>اقترحت تحسينات وفّرت في المتوسط 24% من فواتير الكهرباء السنوية.</li></ul>',
          },
          tags: ['Energy audits', 'AutoCAD'],
        },
        {
          id: 'x3',
          role: {
            en: 'Engineering Intern',
            ar: 'متدرب هندسي',
          },
          organisation: {
            en: 'Doha Facilities Services',
            ar: 'الدوحة لخدمات المرافق',
          },
          start: '2019',
          end: '2019',
          location: {
            en: 'Doha, Qatar',
            ar: 'الدوحة، قطر',
          },
          description: {
            en: '<p>Summer placement maintaining chillers and air-handling units across a university campus.</p>',
            ar: '<p>تدريب صيفي في صيانة المبرّدات ووحدات مناولة الهواء في حرم جامعي.</p>',
          },
        },
      ],
    },
  },
  {
    id: 'experience-grid-pop',
    name: {
      en: 'Grid Pop · Vertical timeline',
      ar: 'جريد بوب · خط زمني عمودي',
    },
    category: 'about',
    blockType: 'experience',
    variant: 'timeline',
    tier: 'free',
    fromTemplate: 'grid-pop',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Experience',
        ar: 'الخبرات',
      },
      heading: {
        en: 'Where I have worked',
        ar: 'أين عملت',
      },
      items: [
        {
          id: 'e1',
          role: {
            en: 'Lead product designer',
            ar: 'مصمم منتجات رئيسي',
          },
          organisation: {
            en: 'Qareeb',
            ar: 'قريب',
          },
          start: '2024',
          current: true,
          location: {
            en: 'Dubai',
            ar: 'دبي',
          },
          description: {
            en: 'Leading a team of three designers across the customer and shop apps.',
            ar: 'أقود فريقًا من ثلاثة مصممين لتطبيقَي الزبائن والمتاجر.',
          },
          tags: ['Mobile', 'Research'],
        },
        {
          id: 'e2',
          role: {
            en: 'Senior UX designer',
            ar: 'مصمم تجربة مستخدم أول',
          },
          organisation: {
            en: 'Souq Hub',
            ar: 'سوق هب',
          },
          start: '2022',
          end: '2024',
          location: {
            en: 'Dubai',
            ar: 'دبي',
          },
          description: {
            en: 'Redesigned the seller dashboard and built the Dukkan design system.',
            ar: 'أعدت تصميم لوحة البائعين وبنيت نظام تصميم «دكّان».',
          },
          tags: ['Web', 'Design system'],
        },
        {
          id: 'e3',
          role: {
            en: 'UI designer',
            ar: 'مصمم واجهات',
          },
          organisation: {
            en: 'Tala Bank',
            ar: 'بنك تالا',
          },
          start: '2021',
          end: '2022',
          location: {
            en: 'Abu Dhabi',
            ar: 'أبوظبي',
          },
          description: {
            en: 'Shipped the new onboarding and card management flows.',
            ar: 'أطلقت مسارات التسجيل الجديدة وإدارة البطاقات.',
          },
          tags: ['Fintech'],
        },
        {
          id: 'e4',
          role: {
            en: 'Graphic designer',
            ar: 'مصمم جرافيك',
          },
          organisation: {
            en: 'Wasl Studio',
            ar: 'استوديو وصل',
          },
          start: '2019',
          end: '2021',
          location: {
            en: 'Sharjah',
            ar: 'الشارقة',
          },
          description: {
            en: 'Posters, packaging and my first app projects.',
            ar: 'ملصقات وعبوات وأول مشاريعي في التطبيقات.',
          },
          tags: ['Branding'],
        },
      ],
    },
  },
]
