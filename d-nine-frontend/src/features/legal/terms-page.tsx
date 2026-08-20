import React from 'react';
import { getLocale } from 'next-intl/server';

export async function TermsPage() {
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-foreground">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {isArabic ? 'الشروط والأحكام' : 'Terms of Service'}
        </h1>

        <div className="space-y-6 text-text-muted leading-relaxed text-sm sm:text-base">
          <p>
            {isArabic
              ? 'مرحباً بك في موقع وكالة دي ناين. تصفح الموقع واستخدام خدماتنا يخضع للشروط والأحكام المبينة أدناه.'
              : 'Welcome to D-NINE Creative Agency. By accessing our site, you agree to comply with the terms set forth below.'}
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">
            {isArabic ? '1. الملكية الفكرية' : '1. Intellectual Property'}
          </h2>
          <p>
            {isArabic
              ? 'جميع المحتويات والتصاميم والشعارات المنشورة على هذا الموقع مملوكة لوكالة دي ناين ولا يجوز نسخها بدون إذن كتابي.'
              : 'All content, designs, and branding featured on this site belong to D-NINE and may not be reproduced without prior written permission.'}
          </p>
        </div>
      </div>
    </main>
  );
}
