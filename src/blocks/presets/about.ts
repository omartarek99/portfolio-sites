/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const aboutPresets: SectionPreset[] = [
  {
    id: 'about-aurora',
    name: {
      en: 'Aurora · Two-column story',
      ar: 'أورورا · قصة في عمودين',
    },
    category: 'about',
    blockType: 'about',
    variant: 'two-column',
    tier: 'free',
    fromTemplate: 'aurora',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'About',
        ar: 'نبذة',
      },
      heading: {
        en: 'Seven years of finding the voice behind a brand',
        ar: 'سبع سنوات في البحث عن الصوت الكامن خلف كل علامة',
      },
      body: {
        en: "<p>I've spent 7 years helping startups and cultural institutions find their visual voice — from first logo to full campaigns.</p><p>My work starts with listening. I sit with founders, curators and the people who serve their customers every day, and I look for the story they already tell without noticing. Then I give it a shape: a mark, a palette, a type system and a set of rules simple enough for a busy team to keep.</p><p>I grew up between Beirut and Doha, and I design in Arabic and English with the same care. Good bilingual identity is not a translation — it is two voices that sound like the same person.</p>",
        ar: '<p>أمضيت سبع سنوات أساعد الشركات الناشئة والمؤسسات الثقافية في إيجاد صوتها البصري، من أول شعار حتى الحملات الكاملة.</p><p>يبدأ عملي بالإصغاء. أجلس مع المؤسسين والقيّمين والعاملين الذين يخدمون العملاء كل يوم، وأبحث عن القصة التي يروونها دون أن ينتبهوا. ثم أمنحها شكلًا: علامة ولوحة ألوان ونظام خطوط وقواعد بسيطة يستطيع الفريق المشغول الالتزام بها.</p><p>نشأت بين بيروت والدوحة، وأصمم بالعربية والإنجليزية بالعناية نفسها. فالهوية الثنائية اللغة الجيدة ليست ترجمة، بل صوتان يبدوان كأنهما لشخص واحد.</p>',
      },
      dropCap: true,
      cta: {
        label: {
          en: 'See selected work',
          ar: 'شاهد الأعمال المختارة',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'ghost',
        icon: 'arrow-down',
      },
    },
  },
  {
    id: 'about-editorial',
    name: {
      en: 'Editorial · Big quote',
      ar: 'افتتاحية · اقتباس كبير',
    },
    category: 'about',
    blockType: 'about',
    variant: 'big-quote',
    tier: 'free',
    fromTemplate: 'editorial',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: "Editor's letter",
        ar: 'كلمة المحرر',
      },
      quote: {
        en: 'The best stories in our region are being written in small studios, late at night, in two languages at once. I go and find them.',
        ar: 'أجمل القصص في منطقتنا تُكتب في استوديوهات صغيرة، في ساعات الليل المتأخرة، وبلغتين معًا. وأنا أذهب لأجدها.',
      },
      attribution: {
        en: 'Yousef Al-Amin',
        ar: 'يوسف الأمين',
      },
      attributionRole: {
        en: 'Writer and editor, Doha',
        ar: 'كاتب ومحرر، الدوحة',
      },
      image: {
        url: '/stock/portrait-sand.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Yousef at his desk',
          ar: 'يوسف على مكتبه',
        },
      },
    },
  },
  {
    id: 'about-bloom-coach',
    name: {
      en: 'Bloom Coach · Text + portrait',
      ar: 'بلوم كوتش · نص وصورة شخصية',
    },
    category: 'about',
    blockType: 'about',
    variant: 'text-portrait',
    tier: 'free',
    fromTemplate: 'bloom-coach',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'About',
        ar: 'نبذة',
      },
      heading: {
        en: "Hi, I'm Hana.",
        ar: 'مرحبًا، أنا هناء.',
      },
      body: {
        en: 'I taught English for eight years before moving into career guidance. I know how it feels to love your work and still wonder what comes next. Today I help teachers and new graduates find their direction, write CVs that sound like them and prepare for interviews without the panic. My sessions are warm, honest and always end with a clear next step.',
        ar: 'درّستُ اللغة الإنجليزية ثماني سنوات قبل أن أتّجه إلى الإرشاد المهني، وأعرف شعور أن تحب عملك وتتساءل مع ذلك عن الخطوة التالية. أساعد اليوم المعلمين والخريجين الجدد على تحديد وجهتهم، وكتابة سيرة ذاتية تشبههم، والاستعداد للمقابلات دون توتر. جلساتي دافئة وصريحة، وتنتهي دائمًا بخطوة واضحة.',
      },
      image: {
        url: '/stock/portrait-clay.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Hana at her desk',
          ar: 'هناء في مكتبها',
        },
      },
      imageSide: 'start',
      cta: {
        label: {
          en: 'Book a free intro call',
          ar: 'احجز مكالمة تعارف مجانية',
        },
        link: {
          type: 'booking',
          value: '',
        },
      },
    },
  },
  {
    id: 'about-blueprint',
    name: {
      en: 'Blueprint · Timeline intro',
      ar: 'المخطط · مقدمة ومحطات',
    },
    category: 'about',
    blockType: 'about',
    variant: 'timeline-intro',
    tier: 'free',
    fromTemplate: 'blueprint',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Studio',
        ar: 'الاستوديو',
      },
      heading: {
        en: 'Studio Faris',
        ar: 'استوديو فارس',
      },
      intro: {
        en: 'Six people, one long table and a wall of models in a converted warehouse in Msheireb.',
        ar: 'ستة أشخاص وطاولة طويلة وجدار من النماذج في مستودع مُعاد تأهيله في مشيرب.',
      },
      body: {
        en: '<p>We design fewer projects so we can stay close to each one, from the first site walk to the last handle on the last door.</p>',
        ar: '<p>نصمّم عددًا أقل من المشاريع لنبقى قريبين من كل منها، من أول زيارة للموقع حتى آخر مقبض على آخر باب.</p>',
      },
      image: {
        url: '/stock/workspace-sand.svg',
        width: 1600,
        height: 1067,
        alt: {
          en: 'Models and drawings on the studio table',
          ar: 'نماذج ورسومات على طاولة الاستوديو',
        },
      },
      milestones: [
        {
          id: 'm-2014',
          year: '2014',
          title: {
            en: 'Studio founded',
            ar: 'تأسيس الاستوديو',
          },
          text: {
            en: 'Faris returns to Doha and opens a two-person office.',
            ar: 'يعود فارس إلى الدوحة ويفتتح مكتبًا من شخصين.',
          },
        },
        {
          id: 'm-2018',
          year: '2018',
          title: {
            en: 'First public building',
            ar: 'أول مبنى عام',
          },
          text: {
            en: 'A neighbourhood library in Al Khor.',
            ar: 'مكتبة حيّ في الخور.',
          },
        },
        {
          id: 'm-2022',
          year: '2022',
          title: {
            en: 'Interiors studio',
            ar: 'قسم التصميم الداخلي',
          },
          text: {
            en: 'Two interior designers join the team.',
            ar: 'انضمام مصممتين داخليتين إلى الفريق.',
          },
        },
        {
          id: 'm-2025',
          year: '2025',
          title: {
            en: 'Regional award',
            ar: 'جائزة إقليمية',
          },
          text: {
            en: 'Courtyard House wins a regional prize for climate-led housing.',
            ar: 'فوز بيت الفناء بجائزة إقليمية للإسكان المستجيب للمناخ.',
          },
        },
      ],
    },
  },
  {
    id: 'about-majlis',
    name: {
      en: 'Majlis · Two-column story',
      ar: 'مجلس · قصة في عمودين',
    },
    category: 'about',
    blockType: 'about',
    variant: 'two-column',
    tier: 'free',
    fromTemplate: 'majlis',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'About',
        ar: 'نبذة',
      },
      heading: {
        en: 'Two decades in service of education',
        ar: 'عقدان في خدمة التعليم',
      },
      body: {
        en: 'For twenty years I have worked where policy meets the classroom. I began as a lecturer in educational leadership, then led curriculum teams and later built performance frameworks for public institutions across the Gulf. My conviction is simple: reform succeeds when the people who carry it understand it, believe in it and can measure it. Today I advise ministries, universities and school networks on policy, curriculum and institutional performance, and I write regularly on how evidence can shape better decisions.',
        ar: 'عملتُ عشرين عامًا في المساحة التي تلتقي فيها السياسات بالفصل الدراسي. بدأتُ محاضرًا في القيادة التربوية، ثم قدتُ فرق تطوير المناهج، وبعدها بنيتُ أطرًا للأداء المؤسسي لجهات حكومية في أنحاء الخليج. قناعتي بسيطة: ينجح الإصلاح حين يفهمه من يحملونه، ويؤمنون به، ويستطيعون قياسه. أقدّم اليوم المشورة للوزارات والجامعات وشبكات المدارس في السياسات والمناهج والأداء المؤسسي، وأكتب بانتظام عن دور الأدلة في صناعة قرارات أفضل.',
      },
      dropCap: true,
    },
  },
  {
    id: 'about-minimal-cv',
    name: {
      en: 'Minimal CV · Text + portrait',
      ar: 'سيرة بسيطة · نص وصورة شخصية',
    },
    category: 'about',
    blockType: 'about',
    variant: 'text-portrait',
    tier: 'free',
    fromTemplate: 'minimal-cv',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Profile',
        ar: 'نبذة',
      },
      heading: {
        en: 'Engineering buildings that use less',
        ar: 'هندسة مبانٍ تستهلك أقل',
      },
      intro: {
        en: 'I design and commission HVAC systems, and I find the savings hiding in buildings that are already running.',
        ar: 'أصمّم أنظمة التكييف والتهوية وأشرف على تشغيلها، وأكتشف فرص التوفير المخفية في المباني القائمة.',
      },
      body: {
        en: '<p>Since graduating in 2020 I have worked on towers, schools and hospitals in Qatar and Saudi Arabia. My audits have cut energy bills by up to 24% without a single tenant complaint.</p><p>I am a member of the Qatar Society of Engineers, hold a LEED Green Associate credential, and am looking for a project or design engineer role where efficiency is part of the brief from day one.</p>',
        ar: '<p>منذ تخرجي عام 2020 عملت على أبراج ومدارس ومستشفيات في قطر والسعودية، وخفّضت عمليات التدقيق التي أجريتها فواتير الطاقة بنسبة وصلت إلى 24% دون شكوى واحدة من الشاغلين.</p><p>أنا عضو في جمعية المهندسين القطرية وحاصل على شهادة LEED Green Associate، وأبحث عن دور مهندس مشاريع أو مهندس تصميم تكون فيه الكفاءة جزءًا من المتطلبات منذ اليوم الأول.</p>',
      },
      image: {
        url: '/stock/portrait-olive.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Portrait of Ahmed Saleh',
          ar: 'صورة شخصية لأحمد صالح',
        },
      },
      imageSide: 'end',
    },
  },
]
