export const messages = {
  ar: {
    HEALTH_OK: 'الخدمة تعمل بشكل طبيعي.',
    READINESS_OK: 'الخدمة وقاعدة البيانات جاهزتان.',
    CONTACT_SUBMITTED: 'تم استلام رسالتك بنجاح، وسيتواصل معك فريقنا قريبًا.',
    BOOK_CALL_SUBMITTED: 'تم استلام طلب حجز المكالمة، وسيتواصل معك فريقنا لتأكيد الموعد.',
    NEWSLETTER_SUBSCRIBED: 'تم الاشتراك في النشرة البريدية بنجاح.',
    NEWSLETTER_ALREADY_SUBSCRIBED: 'هذا البريد مشترك بالفعل في النشرة البريدية.',
    INVALID_JSON: 'البيانات المرسلة غير صالحة.',
    VALIDATION_ERROR: 'يوجد خطأ في البيانات المدخلة.',
    HONEYPOT_REJECTED: 'تم رفض الطلب.',
    NOT_FOUND: 'المسار المطلوب غير موجود.',
    METHOD_NOT_ALLOWED: 'الطريقة غير مسموحة.',
    ORIGIN_NOT_ALLOWED: 'المصدر غير مسموح.',
    RATE_LIMITED: 'تم تجاوز الحد المسموح به للطلبات.',
    DATABASE_UNAVAILABLE: 'قاعدة البيانات غير متاحة حالياً.',
    EMAIL_DELIVERY_FAILED: 'فشل في إرسال البريد الإلكتروني.',
    INTERNAL_ERROR: 'حدث خطأ داخلي في الخادم.',
  },
  en: {
    HEALTH_OK: 'The service is running normally.',
    READINESS_OK: 'The service and database are ready.',
    CONTACT_SUBMITTED: 'Your message has been received. Our team will contact you soon.',
    BOOK_CALL_SUBMITTED: 'Your call request has been received. Our team will contact you to confirm the appointment.',
    NEWSLETTER_SUBSCRIBED: 'You have successfully subscribed to the newsletter.',
    NEWSLETTER_ALREADY_SUBSCRIBED: 'This email address is already subscribed to the newsletter.',
    INVALID_JSON: 'Invalid JSON payload.',
    VALIDATION_ERROR: 'The submitted data is invalid.',
    HONEYPOT_REJECTED: 'Request rejected.',
    NOT_FOUND: 'The requested route was not found.',
    METHOD_NOT_ALLOWED: 'Method not allowed.',
    ORIGIN_NOT_ALLOWED: 'Origin not allowed.',
    RATE_LIMITED: 'Too many requests, please try again later.',
    DATABASE_UNAVAILABLE: 'Database is currently unavailable.',
    EMAIL_DELIVERY_FAILED: 'Failed to deliver email.',
    INTERNAL_ERROR: 'An internal server error occurred.',
  },
};

export function getMessage(code: keyof typeof messages.en, locale: string = 'ar') {
  const lang = locale === 'en' ? 'en' : 'ar';
  return messages[lang][code] || messages[lang].INTERNAL_ERROR;
}
