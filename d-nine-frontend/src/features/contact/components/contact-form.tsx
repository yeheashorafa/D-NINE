'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { contactFormSchema, ContactFormData } from '../schemas/contact.schema';
import { Send, CheckCircle2 } from 'lucide-react';
import { ContentCategory } from '@/types/category';

export interface ContactFormProps {
  categories: ContentCategory[];
  formTitle?: string;
  successMessage?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ categories, formTitle, successMessage }) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('contactPage');
  const tForm = useTranslations('forms.validation');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError(null);
      const sourcePage = typeof window !== 'undefined' ? window.location.pathname : '';
      const { submitContactForm } = await import('@/services/contact.service');
      
      await submitContactForm(data, locale, sourcePage);
      
      setIsSubmitted(true);
      reset();
    } catch (error: unknown) {
      if ((error as Error).name === 'ApiError') {
        const apiError = error as { status?: number; errors?: { field?: string; message?: string }[]; message?: string };
        if (apiError.status === 422 && apiError.errors) {
          apiError.errors.forEach((err: { field?: string; message?: string }) => {
            if (err.field) {
              setError(err.field as keyof ContactFormData, { message: err.message });
            }
          });
        } else {
          setServerError(apiError.message || t('unexpectedError'));
        }
      } else {
        setServerError(t('unexpectedError'));
      }
    }
  };

  const getErrorMessage = (key?: string) => {
    if (!key) return '';
    if (key === 'forms.validation.nameRequired') return tForm('nameRequired');
    if (key === 'forms.validation.emailInvalid') return tForm('emailInvalid');
    if (key === 'forms.validation.serviceRequired') return tForm('serviceRequired');
    if (key === 'forms.validation.messageMin') return tForm('messageMin');
    return key;
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-surface/90 dark:bg-card border border-border shadow-xl">
      <h2 className="text-2xl font-bold text-foreground mb-6">{formTitle || t('formTitle')}</h2>

      {isSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-brand-cyan/10 text-brand-cyan mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-lg font-bold text-foreground">{successMessage || t('successMessage')}</p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-brand-cyan hover:underline font-semibold"
          >
            {isArabic ? 'إرسال رسالة أخرى' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div role="alert" className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
              {serverError}
            </div>
          )}
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-xs font-bold text-foreground">{t('nameLabel')}</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
            {errors.fullName && (
              <p id="fullName-error" role="alert" className="text-xs text-rose-500">{getErrorMessage(errors.fullName.message)}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-foreground">{t('emailLabel')}</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-xs text-rose-500">{getErrorMessage(errors.email.message)}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-bold text-foreground">{isArabic ? 'رقم الهاتف (مطلوب)' : 'Phone number (required)'}</label>
            <input id="phone" type="tel" autoComplete="tel" dir="ltr" required maxLength={30}
              {...register('phone')} aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan" />
            {errors.phone && <p id="phone-error" role="alert" className="text-xs text-rose-500">{isArabic ? 'أدخل رقم هاتف صالحًا من 7 إلى 15 رقمًا.' : 'Enter a phone number with 7 to 15 digits.'}</p>}
          </div>

          {/* Service Selection */}
          <div className="space-y-1.5">
            <label htmlFor="serviceSlug" className="text-xs font-bold text-foreground">{t('serviceLabel')}</label>
            <select
              id="serviceSlug"
              {...register('serviceSlug')}
              aria-invalid={Boolean(errors.serviceSlug)}
              aria-describedby={errors.serviceSlug ? 'serviceSlug-error' : undefined}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            >
              <option value="">{isArabic ? 'اختر الخدمة المطلوبة' : 'Select a service'}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {isArabic ? cat.title.ar : cat.title.en}
                </option>
              ))}
            </select>
            {errors.serviceSlug && (
              <p id="serviceSlug-error" role="alert" className="text-xs text-rose-500">{getErrorMessage(errors.serviceSlug.message)}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-bold text-foreground">{t('messageLabel')}</label>
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full px-4 py-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-rose-500">{getErrorMessage(errors.message.message)}</p>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-brand text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-purple/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? t('sending') : t('submitBtn')}</span>
          </button>
        </form>
      )}
    </div>
  );
};
