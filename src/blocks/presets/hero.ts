/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const heroPresets: SectionPreset[] = [
  {
    id: 'hero-aurora',
    name: {
      en: 'Aurora · Animated text',
      ar: 'أورورا · نص متحرك',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'animated-text',
    tier: 'free',
    fromTemplate: 'aurora',
    style: {
      background: {
        type: 'gradient',
        value: 'aurora',
      },
      paddingY: 'xl',
    },
    animation: {
      entrance: 'blur',
    },
    content: {
      eyebrow: {
        en: 'Brand designer · Doha',
        ar: 'مصممة هوية بصرية · الدوحة',
      },
      heading: {
        en: "I'm Layla, a",
        ar: 'أنا ليلى،',
      },
      animation: 'word-rotate',
      words: [
        {
          id: 'w-1',
          text: {
            en: 'designer',
            ar: 'مصممة',
          },
        },
        {
          id: 'w-2',
          text: {
            en: 'storyteller',
            ar: 'راوية قصص',
          },
        },
        {
          id: 'w-3',
          text: {
            en: 'problem solver',
            ar: 'صانعة حلول',
          },
        },
      ],
      tagline: {
        en: 'Brand designer turning ideas into stories people remember.',
        ar: 'مصممة هوية بصرية أحوّل الأفكار إلى قصص لا تُنسى.',
      },
      badge: {
        en: 'Open to work',
        ar: 'متاحة للعمل',
      },
      location: {
        en: 'Doha, Qatar',
        ar: 'الدوحة، قطر',
      },
      primaryCta: {
        label: {
          en: 'See my work',
          ar: 'شاهد أعمالي',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'primary',
        icon: 'arrow-down',
      },
      secondaryCta: {
        label: {
          en: "Let's talk",
          ar: 'لنتحدث',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        style: 'outline',
      },
      scrollCue: true,
    },
  },
  {
    id: 'hero-editorial',
    name: {
      en: 'Editorial · Magazine cover',
      ar: 'افتتاحية · غلاف مجلة',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'magazine-cover',
    tier: 'pro',
    fromTemplate: 'editorial',
    animation: {
      entrance: 'fade',
    },
    content: {
      name: {
        en: 'Yousef Al-Amin',
        ar: 'يوسف الأمين',
      },
      eyebrow: {
        en: 'November 2026',
        ar: 'نوفمبر 2026',
      },
      issue: {
        en: 'Issue 07 — Stories that travel',
        ar: 'العدد ٠٧ — قصص تسافر',
      },
      tagline: {
        en: "Writer covering technology, culture and the Gulf's creative economy.",
        ar: 'كاتب يغطي التقنية والثقافة والاقتصاد الإبداعي في الخليج.',
      },
      coverLines: [
        {
          id: 'c1',
          text: {
            en: "The quiet rise of Doha's indie game studios",
            ar: 'الصعود الهادئ لاستوديوهات الألعاب المستقلة في الدوحة',
          },
        },
        {
          id: 'c2',
          text: {
            en: 'Why Arabic UX writing needs its own rules',
            ar: 'لماذا تحتاج كتابة واجهات الاستخدام العربية إلى قواعدها الخاصة',
          },
        },
        {
          id: 'c3',
          text: {
            en: 'Inside a 48-hour startup weekend',
            ar: 'من داخل عطلة نهاية أسبوع لريادة الأعمال مدتها 48 ساعة',
          },
        },
      ],
      image: {
        url: '/stock/portrait-sand.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Portrait of Yousef Al-Amin',
          ar: 'صورة يوسف الأمين',
        },
      },
      primaryCta: {
        label: {
          en: 'Read the latest',
          ar: 'اقرأ الجديد',
        },
        link: {
          type: 'none',
          value: '',
        },
        style: 'outline',
        icon: 'arrow-right',
      },
      scrollCue: true,
    },
  },
  {
    id: 'hero-launch',
    name: {
      en: 'Launch · 3D card',
      ar: 'إطلاق · بطاقة ثلاثية الأبعاد',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'tilt-card',
    tier: 'pro',
    fromTemplate: 'launch',
    style: {
      background: {
        type: 'gradient',
        value: 'brand-soft',
      },
      paddingY: 'xl',
    },
    animation: {
      entrance: 'zoom',
    },
    content: {
      eyebrow: {
        en: 'Web strategist & designer · Doha',
        ar: 'استراتيجية وتصميم مواقع · الدوحة',
      },
      name: {
        en: 'Sara Mansour',
        ar: 'سارة منصور',
      },
      heading: {
        en: 'I help small businesses launch websites that actually bring in customers.',
        ar: 'أساعد الشركات الصغيرة على إطلاق مواقع تجلب العملاء فعلًا.',
      },
      tagline: {
        en: 'Strategy, copy and design in Arabic and English — launched in weeks, measured in enquiries.',
        ar: 'استراتيجية ومحتوى وتصميم بالعربية والإنجليزية، يُطلق خلال أسابيع ويُقاس بعدد الطلبات.',
      },
      primaryCta: {
        label: {
          en: 'Book a call',
          ar: 'احجز مكالمة',
        },
        link: {
          type: 'booking',
          value: '',
        },
        icon: 'calendar',
      },
      secondaryCta: {
        label: {
          en: 'See work',
          ar: 'شاهد أعمالي',
        },
        link: {
          type: 'anchor',
          value: 'results',
        },
        style: 'outline',
        icon: 'arrow-right',
      },
      image: {
        url: '/stock/portrait-sea.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Portrait of Sara Mansour',
          ar: 'صورة شخصية لسارة منصور',
        },
      },
      badge: {
        en: '2 launch slots left for April',
        ar: 'بقي موعدان للإطلاق في أبريل',
      },
      location: {
        en: 'Doha, Qatar',
        ar: 'الدوحة، قطر',
      },
      overlayLabel: {
        en: 'Launch No. 48',
        ar: 'الإطلاق رقم 48',
      },
      blob: true,
    },
  },
  {
    id: 'hero-minimal-cv',
    name: {
      en: 'Minimal CV · Name only',
      ar: 'سيرة بسيطة · الاسم فقط',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'minimal',
    tier: 'free',
    fromTemplate: 'minimal-cv',
    style: {
      paddingY: 'lg',
    },
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Curriculum vitae',
        ar: 'السيرة الذاتية',
      },
      name: {
        en: 'Ahmed Saleh',
        ar: 'أحمد صالح',
      },
      heading: {
        en: 'Mechanical engineer · Energy efficiency · Open to roles in Qatar',
        ar: 'مهندس ميكانيكي · كفاءة الطاقة · متاح لفرص العمل في قطر',
      },
      tagline: {
        en: 'Mechanical engineer · Energy efficiency · Open to roles in Qatar',
        ar: 'مهندس ميكانيكي · كفاءة الطاقة · متاح لفرص العمل في قطر',
      },
      primaryCta: {
        label: {
          en: 'Download CV',
          ar: 'حمّل السيرة الذاتية',
        },
        link: {
          type: 'file',
          value: 'https://example.com/files/ahmed-saleh-cv.pdf',
        },
        icon: 'download',
      },
      badge: {
        en: 'Available from June 2026',
        ar: 'متاح ابتداءً من يونيو 2026',
      },
      location: {
        en: 'Doha, Qatar',
        ar: 'الدوحة، قطر',
      },
    },
  },
  {
    id: 'hero-noir-lens',
    name: {
      en: 'Noir Lens · Full-screen picture',
      ar: 'نوار لنز · صورة بملء الشاشة',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'full-bleed',
    tier: 'free',
    fromTemplate: 'noir-lens',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Noor Studio',
        ar: 'نور ستوديو',
      },
      name: {
        en: 'Mariam Al-Khatib',
        ar: 'مريم الخطيب',
      },
      heading: {
        en: 'Wedding & portrait photography in Doha. Quiet moments, captured honestly.',
        ar: 'تصوير أعراس وبورتريه في الدوحة. لحظات هادئة بصدق.',
      },
      primaryCta: {
        label: {
          en: 'View portfolio',
          ar: 'شاهدي الأعمال',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
      },
      secondaryCta: {
        label: {
          en: 'Check my availability',
          ar: 'تحقّق من المواعيد المتاحة',
        },
        link: {
          type: 'booking',
          value: '',
        },
      },
      images: [
        {
          id: 's1',
          image: {
            url: '/stock/event-sand.svg',
            alt: {
              en: 'Bride and groom under warm evening light',
              ar: 'عروسان تحت ضوء المساء الدافئ',
            },
            width: 1200,
            height: 1600,
          },
        },
        {
          id: 's2',
          image: {
            url: '/stock/portrait-dusk.svg',
            alt: {
              en: 'Portrait in soft dusk light',
              ar: 'بورتريه في ضوء الغسق الناعم',
            },
            width: 1200,
            height: 1600,
          },
        },
        {
          id: 's3',
          image: {
            url: '/stock/event-dusk.svg',
            alt: {
              en: 'Evening celebration by the water',
              ar: 'احتفال مسائي قرب الماء',
            },
            width: 1920,
            height: 1080,
          },
        },
        {
          id: 's4',
          image: {
            url: '/stock/nature-sand.svg',
            alt: {
              en: 'Desert dunes at golden hour',
              ar: 'كثبان الصحراء وقت الغروب',
            },
            width: 1920,
            height: 1080,
          },
        },
      ],
      kenBurns: true,
      overlayLabel: {
        en: 'Doha · since 2016',
        ar: 'الدوحة · منذ 2016',
      },
      scrollCue: true,
    },
  },
  {
    id: 'hero-grid-pop',
    name: {
      en: 'Grid Pop · Collage',
      ar: 'جريد بوب · كولاج',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'collage',
    tier: 'free',
    fromTemplate: 'grid-pop',
    animation: {
      entrance: 'zoom',
    },
    content: {
      eyebrow: {
        en: 'UI/UX designer · Dubai',
        ar: 'مصمم واجهات وتجربة مستخدم · دبي',
      },
      name: {
        en: 'Khalid Rahman',
        ar: 'خالد رحمن',
      },
      heading: {
        en: 'UI/UX designer who makes apps people actually enjoy using.',
        ar: 'مصمم واجهات وتجربة مستخدم أصنع تطبيقات يستمتع بها الناس.',
      },
      tagline: {
        en: 'Five years of turning messy flows into apps that feel obvious, for delivery, retail and fintech teams across the Gulf.',
        ar: 'خمس سنوات أحوّل فيها المسارات المعقّدة إلى تطبيقات واضحة، لفرق التوصيل والتجزئة والتقنية المالية في الخليج.',
      },
      primaryCta: {
        label: {
          en: 'See my work',
          ar: 'شاهد أعمالي',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        icon: 'arrow-right',
      },
      secondaryCta: {
        label: {
          en: 'Read the Qareeb story',
          ar: 'اقرأ قصة «قريب»',
        },
        link: {
          type: 'none',
          value: '',
        },
      },
      images: [
        {
          id: 'c1',
          image: {
            url: '/stock/app-slate.svg',
            alt: {
              en: 'Dashboard interface design',
              ar: 'تصميم واجهة لوحة تحكم',
            },
            width: 1600,
            height: 1067,
          },
        },
        {
          id: 'c2',
          image: {
            url: '/stock/portrait-olive.svg',
            alt: {
              en: 'Khalid Rahman',
              ar: 'خالد رحمن',
            },
            width: 1200,
            height: 1600,
          },
        },
        {
          id: 'c3',
          image: {
            url: '/stock/art-blush.svg',
            alt: {
              en: 'Colourful shape studies',
              ar: 'تجارب ملوّنة بالأشكال',
            },
            width: 1400,
            height: 1400,
          },
        },
        {
          id: 'c4',
          image: {
            url: '/stock/app-sea.svg',
            alt: {
              en: 'Data dashboard screens',
              ar: 'شاشات لوحة بيانات',
            },
            width: 1920,
            height: 1080,
          },
        },
      ],
      stickers: [
        {
          id: 'st1',
          text: {
            en: 'Available!',
            ar: 'متاح!',
          },
        },
        {
          id: 'st2',
          text: {
            en: 'Figma nerd',
            ar: 'مهووس فيغما',
          },
        },
        {
          id: 'st3',
          text: {
            en: '5 yrs',
            ar: '5 سنوات',
          },
        },
      ],
    },
  },
  {
    id: 'hero-terminal',
    name: {
      en: 'Terminal · Animated text',
      ar: 'تيرمينال · نص متحرك',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'animated-text',
    tier: 'free',
    fromTemplate: 'terminal',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: '// hello, world',
        ar: '// مرحبًا بالعالم',
      },
      name: {
        en: 'Omar Farouk',
        ar: 'عمر فاروق',
      },
      heading: {
        en: 'Omar Farouk',
        ar: 'عمر فاروق',
      },
      tagline: {
        en: 'Full-stack developer · React, Node, MongoDB · building tools for education',
        ar: 'مطور ويب متكامل · React وNode وMongoDB · أبني أدوات للتعليم',
      },
      animation: 'terminal',
      commands: [
        {
          id: 'c-whoami',
          command: 'whoami',
          output: {
            en: 'Omar Farouk — full-stack developer in Amman. 6 years shipping web apps for schools and edtech startups.',
            ar: 'عمر فاروق — مطور ويب متكامل في عمّان. ست سنوات في بناء تطبيقات ويب للمدارس وشركات تقنيات التعليم الناشئة.',
          },
          typed: true,
        },
        {
          id: 'c-ls',
          command: 'ls projects',
          output: {
            en: 'reellearn/  quizforge/  arabic-text-utils/',
            ar: 'reellearn/  quizforge/  arabic-text-utils/',
          },
          typed: true,
        },
        {
          id: 'c-skills',
          command: 'cat skills.txt',
          output: {
            en: 'TypeScript · React · Node.js · MongoDB · Docker · AWS',
            ar: 'TypeScript · React · Node.js · MongoDB · Docker · AWS',
          },
          typed: true,
        },
        {
          id: 'c-projects',
          command: 'projects',
          output: {
            en: 'ReelLearn (short-video learning) · QuizForge (exam API) · arabic-text-utils (open source). Scroll down for details.',
            ar: 'ReelLearn (تعلّم بالفيديو القصير) · QuizForge (واجهة اختبارات) · arabic-text-utils (مفتوحة المصدر). مرّر للأسفل لمزيد من التفاصيل.',
          },
          typed: false,
        },
        {
          id: 'c-contact',
          command: 'contact',
          output: {
            en: 'omar@example.com · github.com/omarfarouk · replies within 24h',
            ar: 'omar@example.com · github.com/omarfarouk · أرد خلال 24 ساعة',
          },
          typed: false,
        },
        {
          id: 'c-hire',
          command: 'hire',
          output: {
            en: 'Open to freelance work from February 2027. Type "contact" or use the button below.',
            ar: 'متاح للعمل الحر بدءًا من فبراير 2027. اكتب "contact" أو استخدم الزر أدناه.',
          },
          typed: false,
        },
      ],
      badge: {
        en: 'Open to freelance · Feb 2027',
        ar: 'متاح للعمل الحر · فبراير 2027',
      },
      location: {
        en: 'Amman, Jordan',
        ar: 'عمّان، الأردن',
      },
      primaryCta: {
        label: {
          en: 'ls projects',
          ar: 'ls projects',
        },
        link: {
          type: 'anchor',
          value: 'projects',
        },
        style: 'primary',
        icon: 'terminal',
      },
      secondaryCta: {
        label: {
          en: 'GitHub',
          ar: 'GitHub',
        },
        link: {
          type: 'url',
          value: 'https://example.com/github/omarfarouk',
          newTab: true,
        },
        style: 'outline',
        icon: 'external-link',
      },
    },
  },
  {
    id: 'hero-atelier',
    name: {
      en: 'Atelier · Centered big type',
      ar: 'أتيليه · عنوان كبير في المنتصف',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'centered',
    tier: 'free',
    fromTemplate: 'atelier',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Studio of calligraphy and ink · Jeddah',
        ar: 'مرسم للخط العربي والحبر · جدة',
      },
      name: {
        en: 'Rania Youssef',
        ar: 'رانيا يوسف',
      },
      heading: {
        en: 'Contemporary Arabic calligraphy and ink paintings.',
        ar: 'خط عربي معاصر ولوحات بالحبر.',
      },
      tagline: {
        en: 'Reed pen, handmade ink and gold leaf on paper — written slowly, one breath at a time.',
        ar: 'قلم قصب وحبر مصنوع يدويًا ورقائق ذهب على الورق، تُكتب ببطء، نَفَسًا بعد نَفَس.',
      },
      textStyle: 'signature',
      primaryCta: {
        label: {
          en: 'View the works',
          ar: 'شاهد الأعمال',
        },
        link: {
          type: 'none',
          value: '',
        },
        style: 'primary',
      },
      secondaryCta: {
        label: {
          en: 'Commission a piece',
          ar: 'اطلب عملًا خاصًا',
        },
        link: {
          type: 'none',
          value: '',
        },
        style: 'ghost',
      },
      badge: {
        en: 'New works on show at Riyadh Art Week',
        ar: 'أعمال جديدة معروضة في أسبوع الرياض للفنون',
      },
    },
  },
  {
    id: 'hero-bloom-coach',
    name: {
      en: 'Bloom Coach · Text and picture',
      ar: 'بلوم كوتش · نص وصورة',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'split-image',
    tier: 'free',
    fromTemplate: 'bloom-coach',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Career coach · Doha & online',
        ar: 'مرشدة مهنية · الدوحة وعن بُعد',
      },
      name: {
        en: 'Hana Ibrahim',
        ar: 'هناء إبراهيم',
      },
      heading: {
        en: 'Career coaching for teachers and graduates ready for their next step.',
        ar: 'إرشاد مهني للمعلمين والخريجين المستعدين لخطوتهم التالية.',
      },
      tagline: {
        en: 'Calm, practical sessions that help you understand your strengths, tell your story and walk into interviews with confidence.',
        ar: 'جلسات هادئة وعملية تساعدك على فهم نقاط قوتك، ورواية قصتك، ودخول المقابلات بثقة.',
      },
      primaryCta: {
        label: {
          en: 'Book a session',
          ar: 'احجز جلسة',
        },
        link: {
          type: 'booking',
          value: '',
        },
        icon: 'calendar',
      },
      secondaryCta: {
        label: {
          en: 'Ways to work with me',
          ar: 'طرق العمل معي',
        },
        link: {
          type: 'anchor',
          value: 'programs',
        },
        style: 'ghost',
      },
      image: {
        url: '/stock/portrait-blush.svg',
        width: 1200,
        height: 1600,
        alt: {
          en: 'Hana Ibrahim smiling',
          ar: 'هناء إبراهيم مبتسمة',
        },
      },
      imageSide: 'end',
      blob: true,
      badge: {
        en: 'Free 20-min intro call',
        ar: 'مكالمة تعارف مجانية ٢٠ دقيقة',
      },
      location: {
        en: 'Doha, Qatar',
        ar: 'الدوحة، قطر',
      },
    },
  },
  {
    id: 'hero-majlis',
    name: {
      en: 'Majlis · Centered big type',
      ar: 'مجلس · عنوان كبير في المنتصف',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'centered',
    tier: 'free',
    fromTemplate: 'majlis',
    animation: {
      entrance: 'fade',
    },
    content: {
      eyebrow: {
        en: 'Advisor in education policy and institutional development',
        ar: 'مستشار في السياسات التعليمية والتطوير المؤسسي',
      },
      heading: {
        en: 'د. عبدالله الكواري',
        ar: 'د. عبدالله الكواري',
      },
      tagline: {
        en: 'Dr. Abdullah Al-Kuwari',
        ar: 'Dr. Abdullah Al-Kuwari',
      },
      primaryCta: {
        label: {
          en: 'Request a consultation',
          ar: 'اطلب استشارة',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
      },
      secondaryCta: {
        label: {
          en: 'View experience',
          ar: 'استعرض الخبرات',
        },
        link: {
          type: 'none',
          value: '',
        },
        style: 'ghost',
      },
      frame: 'pattern',
      location: {
        en: 'Doha, Qatar',
        ar: 'الدوحة، قطر',
      },
    },
  },
  {
    id: 'hero-motion-reel',
    name: {
      en: 'Motion Reel · Video background',
      ar: 'موشن ريل · خلفية فيديو',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'video-bg',
    tier: 'pro',
    fromTemplate: 'motion-reel',
    animation: {
      entrance: 'blur',
    },
    content: {
      eyebrow: {
        en: 'Showreel 2026',
        ar: 'عرض الأعمال 2026',
      },
      name: {
        en: 'Tariq Films — Tariq Hamdan',
        ar: 'طارق فيلمز — طارق حمدان',
      },
      heading: {
        en: 'Commercials and event films with a cinematic eye.',
        ar: 'إعلانات وأفلام مناسبات بعين سينمائية.',
      },
      tagline: {
        en: 'Director and editor in Dubai. From the first storyboard to the final colour grade.',
        ar: 'مخرج ومونتير في دبي. من أول لوحة قصة حتى تصحيح الألوان الأخير.',
      },
      primaryCta: {
        label: {
          en: 'Watch the work',
          ar: 'شاهد الأعمال',
        },
        link: {
          type: 'anchor',
          value: 'work',
        },
        style: 'primary',
        icon: 'play',
      },
      secondaryCta: {
        label: {
          en: 'Book a shoot',
          ar: 'احجز تصويرًا',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        style: 'outline',
      },
      image: {
        url: '/stock/city-dusk.svg',
        width: 1920,
        height: 1080,
        alt: {
          en: 'A city skyline at dusk, frame from the showreel',
          ar: 'أفق مدينة عند الغروب، لقطة من عرض الأعمال',
        },
      },
      scrollCue: true,
    },
  },
  {
    id: 'hero-founder',
    name: {
      en: 'Founder · Centered big type',
      ar: 'المؤسس · عنوان كبير في المنتصف',
    },
    category: 'intro',
    blockType: 'hero',
    variant: 'centered',
    tier: 'free',
    fromTemplate: 'founder',
    style: {
      background: {
        type: 'gradient',
        value: 'brand-soft',
      },
      paddingY: 'xl',
    },
    animation: {
      entrance: 'blur',
    },
    content: {
      eyebrow: {
        en: 'Tutorly · Seed round open',
        ar: 'توتورلي · جولة التمويل التأسيسية مفتوحة',
      },
      heading: {
        en: 'One place to run your tutoring center.',
        ar: 'مكان واحد لإدارة مركزك التعليمي.',
      },
      tagline: {
        en: 'Helping tutoring centers in the Gulf run classes, payments and parent updates in one place.',
        ar: 'نساعد مراكز الدروس الخصوصية في الخليج على إدارة الحصص والمدفوعات وتواصل أولياء الأمور في مكان واحد.',
      },
      primaryCta: {
        label: {
          en: 'Book a demo',
          ar: 'احجز عرضًا تجريبيًا',
        },
        link: {
          type: 'anchor',
          value: 'contact',
        },
        style: 'primary',
        icon: 'arrow-right',
      },
      secondaryCta: {
        label: {
          en: 'Meet the team',
          ar: 'تعرّف على الفريق',
        },
        link: {
          type: 'none',
          value: '',
        },
        style: 'outline',
      },
      textStyle: 'gradient',
      progressBar: true,
      scrollCue: true,
    },
  },
]
