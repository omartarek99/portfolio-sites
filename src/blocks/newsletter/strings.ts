import { createStrings } from '../_shared'

export const t = createStrings({
  en: {
    newsletter: 'Newsletter sign-up',
    checkInbox: 'Almost there — check your inbox and click the link in our email to confirm your subscription.',
    invalidEmail: 'Enter a valid email address.',
    rateLimited: 'Too many attempts. Please wait a minute and try again.',
    failed: 'We could not sign you up right now. Please try again later.',
    networkFailed: 'You seem to be offline. Check your connection and try again.',
    previewOnly: 'Sign-up does not send in preview.',
    free: 'Free',
  },
  ar: {
    newsletter: 'الاشتراك في النشرة البريدية',
    checkInbox: 'خطوة أخيرة — تحقّق من بريدك واضغط الرابط في رسالتنا لتأكيد اشتراكك.',
    invalidEmail: 'أدخل بريدًا إلكترونيًا صحيحًا.',
    rateLimited: 'محاولات كثيرة. انتظر دقيقة ثم حاول مجددًا.',
    failed: 'تعذّر تسجيل اشتراكك الآن. حاول مرة أخرى لاحقًا.',
    networkFailed: 'يبدو أنك غير متصل بالإنترنت. تحقق من الاتصال ثم حاول مجددًا.',
    previewOnly: 'لا يُرسل الاشتراك في وضع المعاينة.',
    free: 'مجانًا',
  },
})
