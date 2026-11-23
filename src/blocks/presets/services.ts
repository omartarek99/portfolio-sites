/* Generated from src/templates/<id>/template.json (TEMPLATES §17). Edit freely. */
import type { SectionPreset } from '../types'

export const servicesPresets: SectionPreset[] = [
  {
    id: 'pricing-launch',
    name: {
      en: 'Launch · Tiers',
      ar: 'إطلاق · باقات',
    },
    category: 'sell',
    blockType: 'pricing',
    variant: 'tiers',
    tier: 'free',
    fromTemplate: 'launch',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Pricing',
        ar: 'الأسعار',
      },
      heading: {
        en: 'Simple plans, no surprises',
        ar: 'باقات واضحة بلا مفاجآت',
      },
      intro: {
        en: 'Fixed prices agreed before we start. Half up front, half on launch day.',
        ar: 'أسعار ثابتة نتفق عليها قبل البدء: النصف مقدمًا والنصف يوم الإطلاق.',
      },
      currency: 'USD',
      defaultPeriod: 'one-time',
      tiers: [
        {
          id: 'tier-starter',
          name: {
            en: 'Starter',
            ar: 'البداية',
          },
          description: {
            en: 'A one-page site to get you online fast.',
            ar: 'موقع من صفحة واحدة لتنطلق بسرعة.',
          },
          oneTime: 900,
          features: [
            {
              id: 'f1',
              text: {
                en: 'One landing page',
                ar: 'صفحة هبوط واحدة',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'Arabic and English',
                ar: 'بالعربية والإنجليزية',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Contact form and WhatsApp button',
                ar: 'نموذج تواصل وزر واتساب',
              },
            },
            {
              id: 'f4',
              text: {
                en: 'Live in 2 weeks',
                ar: 'جاهز خلال أسبوعين',
              },
            },
          ],
          cta: {
            label: {
              en: 'Get started',
              ar: 'ابدأ الآن',
            },
            link: {
              type: 'booking',
              value: '',
            },
          },
        },
        {
          id: 'tier-growth',
          name: {
            en: 'Growth',
            ar: 'النمو',
          },
          description: {
            en: 'A full site built to turn visitors into enquiries.',
            ar: 'موقع متكامل يحوّل الزوار إلى طلبات تواصل.',
          },
          oneTime: 2400,
          popular: true,
          features: [
            {
              id: 'f1',
              text: {
                en: 'Up to five pages',
                ar: 'حتى خمس صفحات',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'Copywriting in both languages',
                ar: 'كتابة المحتوى باللغتين',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Booking and analytics set up',
                ar: 'إعداد الحجز والتحليلات',
              },
            },
            {
              id: 'f4',
              text: {
                en: 'Two rounds of revisions',
                ar: 'جولتان من التعديلات',
              },
            },
            {
              id: 'f5',
              text: {
                en: '30 days of free fixes',
                ar: '30 يومًا من التعديلات المجانية',
              },
            },
          ],
          cta: {
            label: {
              en: 'Choose Growth',
              ar: 'اختر باقة النمو',
            },
            link: {
              type: 'booking',
              value: '',
            },
          },
        },
        {
          id: 'tier-partner',
          name: {
            en: 'Partner',
            ar: 'الشراكة',
          },
          description: {
            en: 'An ongoing partner for your site and campaigns.',
            ar: 'شريك دائم لموقعك وحملاتك.',
          },
          monthly: 4000,
          from: true,
          features: [
            {
              id: 'f1',
              text: {
                en: 'Everything in Growth',
                ar: 'كل ما في باقة النمو',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'A new landing page every month',
                ar: 'صفحة هبوط جديدة كل شهر',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Monthly conversion report',
                ar: 'تقرير شهري عن معدّل التحويل',
              },
            },
            {
              id: 'f4',
              text: {
                en: 'Priority WhatsApp support',
                ar: 'دعم مُقدَّم عبر واتساب',
              },
            },
          ],
          cta: {
            label: {
              en: 'Book a call',
              ar: 'احجز مكالمة',
            },
            link: {
              type: 'booking',
              value: '',
            },
          },
        },
      ],
    },
  },
  {
    id: 'services-launch',
    name: {
      en: 'Launch · Cards',
      ar: 'إطلاق · بطاقات',
    },
    category: 'sell',
    blockType: 'services',
    variant: 'cards',
    tier: 'free',
    fromTemplate: 'launch',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Services',
        ar: 'الخدمات',
      },
      heading: {
        en: 'What I do',
        ar: 'ما أقدّمه',
      },
      intro: {
        en: 'Three ways to get a website that brings in customers — pick one, or start with a strategy session.',
        ar: 'ثلاث طرق للحصول على موقع يجلب العملاء، اختر ما يناسبك أو ابدأ بجلسة استراتيجية.',
      },
      items: [
        {
          id: 'svc-strategy',
          icon: 'compass',
          name: {
            en: 'Website strategy',
            ar: 'استراتيجية الموقع',
          },
          description: {
            en: 'We map your customers, your offer and the pages you actually need before anything gets designed.',
            ar: 'نحدّد عملاءك وعرضك والصفحات التي تحتاجها فعلًا قبل البدء بأي تصميم.',
          },
          duration: {
            en: '1 week',
            ar: 'أسبوع واحد',
          },
          price: {
            amount: 600,
            currency: 'USD',
            from: true,
          },
          features: [
            {
              id: 'f1',
              text: {
                en: 'Two workshops with your team',
                ar: 'ورشتا عمل مع فريقك',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'Site map and page outlines',
                ar: 'خريطة الموقع ومخطط لكل صفحة',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Competitor teardown',
                ar: 'تحليل مواقع المنافسين',
              },
            },
          ],
        },
        {
          id: 'svc-landing',
          icon: 'layout-grid',
          name: {
            en: 'Landing page design',
            ar: 'تصميم صفحات الهبوط',
          },
          description: {
            en: 'A focused page for one product or campaign, written, designed and built in Arabic and English.',
            ar: 'صفحة مركّزة لمنتج أو حملة واحدة، أكتبها وأصمّمها وأبنيها بالعربية والإنجليزية.',
          },
          duration: {
            en: '2–3 weeks',
            ar: 'من أسبوعين إلى ثلاثة',
          },
          price: {
            amount: 1400,
            currency: 'USD',
            from: true,
          },
          features: [
            {
              id: 'f1',
              text: {
                en: 'Copy, design and build',
                ar: 'المحتوى والتصميم والتطوير',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'Two rounds of revisions',
                ar: 'جولتان من التعديلات',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Forms and WhatsApp connected',
                ar: 'ربط النماذج وواتساب',
              },
            },
          ],
        },
        {
          id: 'svc-audit',
          icon: 'line-chart',
          name: {
            en: 'Conversion audit',
            ar: 'تدقيق معدّل التحويل',
          },
          description: {
            en: 'I review your current site and hand you a ranked list of fixes that will bring in more enquiries.',
            ar: 'أراجع موقعك الحالي وأسلّمك قائمة مرتّبة بالتحسينات التي تزيد طلبات التواصل.',
          },
          duration: {
            en: '5 days',
            ar: '5 أيام',
          },
          price: {
            amount: 450,
            currency: 'USD',
          },
          features: [
            {
              id: 'f1',
              text: {
                en: 'Recorded video walkthrough',
                ar: 'شرح مصوّر بالفيديو',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'Follow-up call after 30 days',
                ar: 'مكالمة متابعة بعد 30 يومًا',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'services-bloom-coach',
    name: {
      en: 'Bloom Coach · Packages table',
      ar: 'بلوم كوتش · جدول الباقات',
    },
    category: 'sell',
    blockType: 'services',
    variant: 'pricing-table',
    tier: 'free',
    fromTemplate: 'bloom-coach',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Programs',
        ar: 'البرامج',
      },
      heading: {
        en: 'Choose what fits you today',
        ar: 'اختر ما يناسبك اليوم',
      },
      intro: {
        en: 'Prices in Qatari riyals. Teachers and recent graduates get 15% off — just mention it when you book.',
        ar: 'الأسعار بالريال القطري. للمعلمين وحديثي التخرج خصم ١٥٪، اذكر ذلك عند الحجز فقط.',
      },
      items: [
        {
          id: 'bloom-svc-clarity-p',
          name: {
            en: '1:1 career clarity session (60 min)',
            ar: 'جلسة وضوح مهني فردية (٦٠ دقيقة)',
          },
          description: {
            en: 'One focused hour to untangle where you are, what you want next and the first three steps to get there.',
            ar: 'ساعة مركّزة نفكّ فيها تشابك وضعك الحالي، ونحدد ما تريده بعد ذلك، وأول ثلاث خطوات للوصول إليه.',
          },
          icon: 'compass',
          price: {
            amount: 450,
            currency: 'QAR',
          },
          duration: {
            en: '60 minutes · online or in Doha',
            ar: '٦٠ دقيقة · عن بُعد أو في الدوحة',
          },
          features: [
            {
              id: 'bloom-f-c1',
              text: {
                en: 'Pre-session questionnaire',
                ar: 'استبيان قبل الجلسة',
              },
            },
            {
              id: 'bloom-f-c2',
              text: {
                en: 'Written action plan within 24 hours',
                ar: 'خطة عمل مكتوبة خلال ٢٤ ساعة',
              },
            },
            {
              id: 'bloom-f-c3',
              text: {
                en: 'One follow-up message',
                ar: 'رسالة متابعة واحدة',
              },
            },
          ],
          cta: {
            label: {
              en: 'Book a session',
              ar: 'احجز جلسة',
            },
            link: {
              type: 'booking',
              value: '',
            },
          },
        },
        {
          id: 'bloom-svc-cv-p',
          name: {
            en: 'CV & interview prep (3 sessions)',
            ar: 'تجهيز السيرة الذاتية والمقابلة (٣ جلسات)',
          },
          description: {
            en: 'We rewrite your CV around your strengths, then rehearse real interview questions until your answers feel natural.',
            ar: 'نعيد كتابة سيرتك الذاتية حول نقاط قوتك، ثم نتدرّب على أسئلة مقابلات حقيقية حتى تصبح إجاباتك طبيعية.',
          },
          icon: 'file-text',
          price: {
            amount: 1200,
            currency: 'QAR',
          },
          duration: {
            en: '3 × 60 minutes over three weeks',
            ar: '٣ جلسات × ٦٠ دقيقة على ثلاثة أسابيع',
          },
          features: [
            {
              id: 'bloom-f-v1',
              text: {
                en: 'CV and LinkedIn rewrite',
                ar: 'إعادة كتابة السيرة الذاتية وملف LinkedIn',
              },
            },
            {
              id: 'bloom-f-v2',
              text: {
                en: 'Two recorded mock interviews',
                ar: 'مقابلتان تجريبيتان مسجّلتان',
              },
            },
            {
              id: 'bloom-f-v3',
              text: {
                en: 'Feedback on every answer',
                ar: 'ملاحظات على كل إجابة',
              },
            },
          ],
          cta: {
            label: {
              en: 'Book a session',
              ar: 'احجز جلسة',
            },
            link: {
              type: 'booking',
              value: '',
            },
          },
        },
        {
          id: 'bloom-svc-workshop-p',
          name: {
            en: 'Group workshop: market yourself',
            ar: 'ورشة جماعية: سوّق لنفسك',
          },
          description: {
            en: 'A friendly half-day workshop for up to twelve people on telling your story, networking and personal branding.',
            ar: 'ورشة ودّية لنصف يوم تتسع لاثني عشر مشاركًا، عن رواية قصتك المهنية وبناء العلاقات والعلامة الشخصية.',
          },
          icon: 'users',
          price: {
            amount: 300,
            currency: 'QAR',
            from: true,
          },
          duration: {
            en: '4 hours · monthly in Doha',
            ar: '٤ ساعات · شهريًا في الدوحة',
          },
          features: [
            {
              id: 'bloom-f-w1',
              text: {
                en: 'Workbook and templates',
                ar: 'كرّاسة عمل وقوالب جاهزة',
              },
            },
            {
              id: 'bloom-f-w2',
              text: {
                en: 'Small groups, lots of practice',
                ar: 'مجموعات صغيرة وتطبيق كثير',
              },
            },
            {
              id: 'bloom-f-w3',
              text: {
                en: 'Team rates for schools',
                ar: 'أسعار خاصة للمدارس والفرق',
              },
            },
          ],
          cta: {
            label: {
              en: 'Book a session',
              ar: 'احجز جلسة',
            },
            link: {
              type: 'booking',
              value: '',
            },
          },
        },
      ],
    },
  },
  {
    id: 'services-atelier',
    name: {
      en: 'Atelier · List with icons',
      ar: 'أتيليه · قائمة بأيقونات',
    },
    category: 'sell',
    blockType: 'services',
    variant: 'list-icons',
    tier: 'free',
    fromTemplate: 'atelier',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Commissions',
        ar: 'أعمال بالطلب',
      },
      heading: {
        en: 'A piece made for you',
        ar: 'عمل يُصنع لأجلك',
      },
      intro: {
        en: 'Each commission begins with a conversation and a sketch you approve before ink touches the final sheet.',
        ar: 'يبدأ كل عمل بالطلب بحديث ورسم أولي توافق عليه قبل أن يلمس الحبر الورقة النهائية.',
      },
      items: [
        {
          id: 'c-name',
          name: {
            en: 'Name and verse pieces',
            ar: 'لوحات الأسماء والآيات',
          },
          icon: 'feather',
          description: {
            en: 'A name, a verse or a line of poetry, written by hand in Thuluth or Diwani and framed for your home.',
            ar: 'اسم أو آية أو بيت شعر، يُكتب باليد بخط الثلث أو الديواني ويُؤطَّر لبيتك.',
          },
          price: {
            amount: 1800,
            currency: 'SAR',
            from: true,
          },
          duration: {
            en: '3–4 weeks',
            ar: '3 إلى 4 أسابيع',
          },
        },
        {
          id: 'c-wedding',
          name: {
            en: 'Wedding and occasion gifts',
            ar: 'هدايا الأعراس والمناسبات',
          },
          icon: 'gift',
          description: {
            en: 'The couple’s names and date in ink and gold leaf, with a matching card for the invitation.',
            ar: 'اسما العروسين وتاريخ الزفاف بالحبر ورقائق الذهب، مع بطاقة مطابقة للدعوة.',
          },
          price: {
            amount: 2600,
            currency: 'SAR',
            from: true,
          },
          duration: {
            en: '4–6 weeks',
            ar: '4 إلى 6 أسابيع',
          },
        },
        {
          id: 'c-large',
          name: {
            en: 'Large works for spaces',
            ar: 'أعمال كبيرة للمساحات',
          },
          icon: 'ruler',
          description: {
            en: 'Paintings and murals for lobbies, offices and majlis walls, from first sketch to installation.',
            ar: 'لوحات وجداريات للردهات والمكاتب وجدران المجالس، من الرسم الأول حتى التركيب.',
          },
          price: {
            amount: 9000,
            currency: 'SAR',
            from: true,
          },
          duration: {
            en: '8–12 weeks',
            ar: '8 إلى 12 أسبوعًا',
          },
        },
      ],
    },
  },
  {
    id: 'services-creator-hub',
    name: {
      en: 'Creator Hub · Packages table',
      ar: 'مركز صانع المحتوى · جدول الباقات',
    },
    category: 'sell',
    blockType: 'services',
    variant: 'pricing-table',
    tier: 'free',
    fromTemplate: 'creator-hub',
    animation: {
      entrance: 'slide-up',
    },
    content: {
      eyebrow: {
        en: 'Packages',
        ar: 'الباقات',
      },
      heading: {
        en: 'Ways to partner',
        ar: 'طرق الشراكة',
      },
      intro: {
        en: 'Every package includes recipe development, filming in my kitchen and usage rights for 30 days.',
        ar: 'تشمل كل باقة تطوير الوصفة والتصوير في مطبخي وحقوق الاستخدام لمدة 30 يومًا.',
      },
      items: [
        {
          id: 'pk-reel',
          name: {
            en: 'Single recipe',
            ar: 'وصفة واحدة',
          },
          description: {
            en: 'One recipe built around your product, posted as a Reel and a TikTok.',
            ar: 'وصفة واحدة حول منتجك، تُنشر ريلز وتيك توك.',
          },
          icon: 'utensils',
          price: {
            amount: 1200,
            currency: 'USD',
            from: true,
          },
          duration: {
            en: '2 weeks',
            ar: 'أسبوعان',
          },
          features: [
            {
              id: 'f1',
              text: {
                en: '1 Reel + 1 TikTok',
                ar: 'ريلز واحد وتيك توك واحد',
              },
            },
            {
              id: 'f2',
              text: {
                en: '3 story frames',
                ar: '3 إطارات قصص',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'One round of edits',
                ar: 'جولة تعديل واحدة',
              },
            },
          ],
          cta: {
            label: {
              en: 'Enquire',
              ar: 'استفسر',
            },
            link: {
              type: 'anchor',
              value: 'contact',
            },
            icon: 'arrow-right',
          },
        },
        {
          id: 'pk-series',
          name: {
            en: 'Ramadan series',
            ar: 'سلسلة رمضان',
          },
          description: {
            en: 'Four suhoor and iftar recipes across the holy month, with a YouTube feature.',
            ar: 'أربع وصفات للسحور والإفطار خلال الشهر الكريم، مع فقرة على يوتيوب.',
          },
          icon: 'moon',
          price: {
            amount: 4500,
            currency: 'USD',
            from: true,
          },
          duration: {
            en: '1 month',
            ar: 'شهر واحد',
          },
          features: [
            {
              id: 'f1',
              text: {
                en: '4 Reels + 4 TikToks',
                ar: '4 ريلز و4 تيك توك',
              },
            },
            {
              id: 'f2',
              text: {
                en: '1 YouTube integration',
                ar: 'فقرة واحدة على يوتيوب',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Newsletter mention',
                ar: 'ذكر في الرسالة الأسبوعية',
              },
            },
          ],
          cta: {
            label: {
              en: 'Enquire',
              ar: 'استفسر',
            },
            link: {
              type: 'anchor',
              value: 'contact',
            },
            icon: 'arrow-right',
          },
        },
        {
          id: 'pk-launch',
          name: {
            en: 'Product launch',
            ar: 'إطلاق منتج',
          },
          description: {
            en: 'A launch week with a live cook-along, giveaway and a recipe card for your packaging.',
            ar: 'أسبوع إطلاق مع بث مباشر للطبخ ومسابقة وبطاقة وصفة لعبوتك.',
          },
          icon: 'rocket',
          price: {
            amount: 7000,
            currency: 'USD',
            from: true,
          },
          duration: {
            en: '3 weeks',
            ar: '3 أسابيع',
          },
          features: [
            {
              id: 'f1',
              text: {
                en: 'Live cook-along',
                ar: 'بث مباشر للطبخ',
              },
            },
            {
              id: 'f2',
              text: {
                en: 'Giveaway management',
                ar: 'إدارة المسابقة',
              },
            },
            {
              id: 'f3',
              text: {
                en: 'Recipe card artwork',
                ar: 'تصميم بطاقة الوصفة',
              },
            },
          ],
          cta: {
            label: {
              en: 'Enquire',
              ar: 'استفسر',
            },
            link: {
              type: 'anchor',
              value: 'contact',
            },
            icon: 'arrow-right',
          },
        },
      ],
    },
  },
  {
    id: 'services-majlis',
    name: {
      en: 'Majlis · List with icons',
      ar: 'مجلس · قائمة بأيقونات',
    },
    category: 'sell',
    blockType: 'services',
    variant: 'list-icons',
    tier: 'free',
    fromTemplate: 'majlis',
    animation: {
      entrance: 'stagger',
    },
    content: {
      eyebrow: {
        en: 'Areas of expertise',
        ar: 'مجالات الخبرة',
      },
      heading: {
        en: 'How I can help',
        ar: 'كيف يمكنني المساعدة',
      },
      items: [
        {
          id: 'majlis-a-1',
          icon: 'book-open',
          name: {
            en: 'Curriculum development',
            ar: 'تطوير المناهج',
          },
          description: {
            en: 'Standards-based curricula from framework to classroom materials.',
            ar: 'مناهج قائمة على المعايير، من الإطار العام إلى المواد الصفية.',
          },
        },
        {
          id: 'majlis-a-2',
          icon: 'bar-chart',
          name: {
            en: 'Institutional performance evaluation',
            ar: 'تقييم الأداء المؤسسي',
          },
          description: {
            en: 'Indicators, reviews and dashboards that leaders actually use.',
            ar: 'مؤشرات ومراجعات ولوحات متابعة يستخدمها القادة فعلًا.',
          },
        },
        {
          id: 'majlis-a-3',
          icon: 'compass',
          name: {
            en: 'Leading change',
            ar: 'قيادة التغيير',
          },
          description: {
            en: 'Guiding teams through reform with clear roles and steady communication.',
            ar: 'توجيه الفرق خلال الإصلاح بأدوار واضحة وتواصل مستمر.',
          },
        },
        {
          id: 'majlis-a-4',
          icon: 'scale',
          name: {
            en: 'Education policy',
            ar: 'السياسات التعليمية',
          },
          description: {
            en: 'Evidence reviews and policy papers for decision makers.',
            ar: 'مراجعات للأدلة وأوراق سياسات لصنّاع القرار.',
          },
        },
        {
          id: 'majlis-a-5',
          icon: 'target',
          name: {
            en: 'Strategic planning',
            ar: 'التخطيط الاستراتيجي',
          },
          description: {
            en: 'Five-year strategies with measurable, honest targets.',
            ar: 'استراتيجيات خمسية بأهداف قابلة للقياس وواقعية.',
          },
        },
        {
          id: 'majlis-a-6',
          icon: 'users',
          name: {
            en: 'Leadership capacity building',
            ar: 'بناء القدرات القيادية',
          },
          description: {
            en: 'Programs for school principals and senior officials.',
            ar: 'برامج لمديري المدارس وكبار المسؤولين.',
          },
        },
      ],
    },
  },
]
