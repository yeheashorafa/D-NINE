import React from 'react';
import { getLocale } from 'next-intl/server';

export async function PrivacyPage() {
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-foreground">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>

        <div className="space-y-6 text-text-muted leading-relaxed text-sm sm:text-base">
          <p>
            {isArabic
              ? 'تلتزم وكالة دي ناين بحماية خصوصية زوار ومستخدمي موقعنا الإلكتروني. توضح هذه السياسة كيفية جمع البيانات والمعلومات واستخدامها.'
              : 'D-NINE Creative Agency is committed to protecting your privacy. This Privacy Policy outlines how we handle personal data collected on our website.'}
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">
            {isArabic ? '1. جمع البيانات' : '1. Data Collection'}
          </h2>
          <p>
            {isArabic
              ? 'نقوم بجمع المعلومات التي تختار تقديمها لنا طواعية عند ملء نماذج التواصل أو طلب الاستشارات الإبداعية.'
              : 'We collect information you voluntarily provide when completing contact forms or requesting creative consultations.'}
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">
            {isArabic ? '2. استخدام المعلومات' : '2. Use of Information'}
          </h2>
          <p>
            {isArabic
              ? 'تُستخدم البيانات فقط للرد على استفساراتك، تحسين خدماتنا، والتواصل بشأن المشروعات المطلوبة.'
              : 'Collected data is solely used to respond to inquiries, deliver services, and communicate project updates.'}
          </p>
        </div>
      </div>
    </main>
  );
}
