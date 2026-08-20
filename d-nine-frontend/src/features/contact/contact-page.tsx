import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCategories } from '@/services/content/categories.service';
import { siteConfig } from '@/config/site.config';
import { ContactForm } from './components/contact-form';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';

export async function ContactPage() {
  const t = await getTranslations('contactPage');
  const locale = await getLocale();
  const isArabic = locale === 'ar';
  const categories = await getCategories();

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {t('title')}
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            {t('subtitle')}
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

              <div className="space-y-6 text-sm text-text-muted">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{isArabic ? 'الموقع' : 'Location'}</h3>
                    <p className="text-xs mt-1">
                      {isArabic ? siteConfig.contact.locations.ar : siteConfig.contact.locations.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{isArabic ? 'البريد الإلكتروني' : 'Email'}</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs text-brand-cyan hover:underline mt-1 block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{isArabic ? 'الهاتف المباشر' : 'Phone'}</h3>
                    <a
                      href={siteConfig.contact.phone.href}
                      dir="ltr"
                      className="text-xs text-brand-cyan hover:underline mt-1 block"
                    >
                      {siteConfig.contact.phone.display}
                    </a>
                  </div>
                </div>
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
