import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCategories } from '@/services/content/categories.service';
import { getContactPage } from '@/sanity/services/page.service';
import { ContactForm } from './components/contact-form';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { PortableText } from '@portabletext/react';

const getIconComponent = (type: string) => {
  if (type === 'email') return Mail;
  if (type === 'phone') return Phone;
  if (type === 'whatsapp') return Phone;
  return MapPin;
};

export async function ContactPage() {
  const t = await getTranslations('contactPage');
  const locale = await getLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';
  
  const [categories, pageData] = await Promise.all([
    getCategories({ stega: false }),
    getContactPage(),
  ]);

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{pageData?.heroBadge?.[locale] || t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {pageData?.heroTitle?.[locale]}
          </h1>
          <p className="text-text-muted text-base sm:text-lg whitespace-pre-wrap">
            {pageData?.heroSubtitle?.[locale]}
          </p>
        </RevealSection>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-6">
              <h2 className="text-xl font-bold text-foreground">
                {isArabic ? 'معلومات التواصل المباشر' : 'Direct Contact Info'}
              </h2>
              
              {pageData?.description?.[locale] && (
                <div className="text-text-muted text-sm prose prose-sm dark:prose-invert">
                  <PortableText value={pageData.description[locale]} />
                </div>
              )}

              <div className="space-y-6 text-sm text-text-muted">
                {pageData?.offices?.map((office: { title?: { en?: string; ar?: string }; address?: { en?: string; ar?: string }; phone?: string; email?: string }, idx: number) => (
                  <div key={`office-${idx}`} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{office.title?.[locale] || office.title?.en}</h3>
                      <p className="text-xs mt-1 whitespace-pre-wrap">
                        {office.address?.[locale] || office.address?.en}
                      </p>
                      {office.phone && (
                        <p className="text-xs mt-1" dir="ltr">{office.phone}</p>
                      )}
                      {office.email && (
                        <p className="text-xs mt-1">{office.email}</p>
                      )}
                    </div>
                  </div>
                ))}

                {pageData?.contactMethods?.map((method: { type: string; title?: { en?: string; ar?: string }; link?: string; value: string }, idx: number) => {
                  const Icon = getIconComponent(method.type);
                  const isLink = !!method.link;
                  return (
                    <div key={`method-${idx}`} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{method.title?.[locale] || method.title?.en}</h3>
                        {isLink ? (
                          <a
                            href={method.link}
                            className="text-xs text-brand-cyan hover:underline mt-1 block"
                            dir={method.type === 'phone' || method.type === 'whatsapp' ? 'ltr' : 'auto'}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-xs mt-1 block">{method.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm categories={categories} />
          </div>
        </div>
      </div>
    </main>
  );
}
