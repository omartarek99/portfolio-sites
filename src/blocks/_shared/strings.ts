/**
 * UI strings rendered INSIDE user sites (buttons, labels, aria text). Sites do
 * not use next-intl: their locale comes from the site URL and these strings
 * must work on the server and in the editor alike, synchronously.
 *
 * Shared strings live here. A block with its own strings keeps them next to
 * the block in `strings.ts`:
 *
 *   const t = createStrings({ en: { play: 'Play reel' }, ar: { play: 'تشغيل العرض' } })
 *   t(ctx.locale, 'play')
 */
import type { Locale } from '@/schemas/fields'

export type StringTable<K extends string> = Record<Locale, Record<K, string>>

/** `{name}` placeholders are replaced from `vars`. */
export function createStrings<K extends string>(table: StringTable<K>) {
  return function t(locale: Locale, key: K, vars?: Record<string, string | number>): string {
    const template = table[locale]?.[key] ?? table.en[key] ?? key
    if (!vars) return template
    return template.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match))
  }
}

export const st = createStrings({
  en: {
    readMore: 'Read more',
    learnMore: 'Learn more',
    viewProject: 'View project',
    viewCaseStudy: 'Read case study',
    viewAll: 'View all',
    all: 'All',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Sent',
    submit: 'Submit',
    required: 'Required',
    optional: 'Optional',
    previous: 'Previous',
    next: 'Next',
    close: 'Close',
    open: 'Open',
    play: 'Play',
    pause: 'Pause',
    playVideo: 'Play video',
    playWithSound: 'Play with sound',
    mute: 'Mute',
    unmute: 'Unmute',
    loading: 'Loading…',
    error: 'Something went wrong. Please try again.',
    tryAgain: 'Try again',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNavigation: 'Main navigation',
    footerNavigation: 'Footer navigation',
    language: 'Language',
    skipToContent: 'Skip to content',
    downloadCv: 'Download CV',
    bookNow: 'Book now',
    bookSession: 'Book a session',
    subscribe: 'Subscribe',
    emailPlaceholder: 'you@example.com',
    yourEmail: 'Your email',
    backToTop: 'Back to top',
    availableForWork: 'Available for work',
    present: 'Present',
    minutes: '{count} min',
    from: 'From',
    perMonth: '/month',
    oneTime: 'one-time',
    monthly: 'Monthly',
    free: 'Free',
    popular: 'Popular',
    slide: 'Slide {current} of {total}',
    goToSlide: 'Go to slide {index}',
    image: 'Image {current} of {total}',
    carousel: 'Carousel',
    filterByCategory: 'Filter by category',
    dragToCompare: 'Drag to compare before and after',
    rating: '{rating} out of 5 stars',
    photoBy: 'Photo by {name}',
    madeWith: 'Made with {app}',
    allRightsReserved: 'All rights reserved.',
    copyLink: 'Copy link',
    copied: 'Copied',
    share: 'Share',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    followOn: 'Follow on {platform}',
    exampleBadge: 'Example content',
    before: 'Before',
    after: 'After',
    showMore: 'Show more',
    showLess: 'Show less',
    publishedOn: 'Published on {date}',
    noPosts: 'No posts yet.',
    comingSoon: 'Coming soon',
  },
  ar: {
    readMore: 'اقرأ المزيد',
    learnMore: 'اعرف المزيد',
    viewProject: 'عرض المشروع',
    viewCaseStudy: 'اقرأ دراسة الحالة',
    viewAll: 'عرض الكل',
    all: 'الكل',
    send: 'إرسال',
    sending: 'جارٍ الإرسال…',
    sent: 'تم الإرسال',
    submit: 'إرسال',
    required: 'مطلوب',
    optional: 'اختياري',
    previous: 'السابق',
    next: 'التالي',
    close: 'إغلاق',
    open: 'فتح',
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    playVideo: 'تشغيل الفيديو',
    playWithSound: 'تشغيل مع الصوت',
    mute: 'كتم الصوت',
    unmute: 'تشغيل الصوت',
    loading: 'جارٍ التحميل…',
    error: 'حدث خطأ ما. حاول مرة أخرى.',
    tryAgain: 'حاول مرة أخرى',
    menu: 'القائمة',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    mainNavigation: 'التنقل الرئيسي',
    footerNavigation: 'روابط التذييل',
    language: 'اللغة',
    skipToContent: 'انتقل إلى المحتوى',
    downloadCv: 'تحميل السيرة الذاتية',
    bookNow: 'احجز الآن',
    bookSession: 'احجز جلسة',
    subscribe: 'اشترك',
    emailPlaceholder: 'you@example.com',
    yourEmail: 'بريدك الإلكتروني',
    backToTop: 'العودة إلى الأعلى',
    availableForWork: 'متاح للعمل',
    present: 'الآن',
    minutes: '{count} دقيقة',
    from: 'ابتداءً من',
    perMonth: '/شهريًا',
    oneTime: 'مرة واحدة',
    monthly: 'شهري',
    free: 'مجاني',
    popular: 'الأكثر طلبًا',
    slide: 'الشريحة {current} من {total}',
    goToSlide: 'انتقل إلى الشريحة {index}',
    image: 'الصورة {current} من {total}',
    carousel: 'عرض دوّار',
    filterByCategory: 'تصفية حسب الفئة',
    dragToCompare: 'اسحب للمقارنة بين «قبل» و«بعد»',
    rating: '{rating} من 5 نجوم',
    photoBy: 'تصوير {name}',
    madeWith: 'صُنع بواسطة {app}',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    copyLink: 'نسخ الرابط',
    copied: 'تم النسخ',
    share: 'مشاركة',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'الهاتف',
    addressLabel: 'العنوان',
    followOn: 'تابعني على {platform}',
    exampleBadge: 'محتوى تجريبي',
    before: 'قبل',
    after: 'بعد',
    showMore: 'عرض المزيد',
    showLess: 'عرض أقل',
    publishedOn: 'نُشر في {date}',
    noPosts: 'لا توجد مقالات بعد.',
    comingSoon: 'قريبًا',
  },
})

/** Locale-aware number formatting. Arabic sites use Arabic-Indic digits only when asked. */
export function formatNumber(locale: Locale, value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en', options).format(value)
}

export function formatDate(locale: Locale, date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en', options ?? { year: 'numeric', month: 'long', day: 'numeric' }).format(d)
}
