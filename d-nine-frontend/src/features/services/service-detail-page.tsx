import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getServiceBySlug } from '@/services/content/services.service';
import { getAllProjects } from '@/services/content/projects.service';
import { RelatedServiceProjects } from './components/related-service-projects';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';

export interface ServiceDetailPageProps {
  slug: string;
}

export async function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const t = await getTranslations('serviceDetail');
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  const [service, allProjects] = await Promise.all([
    getServiceBySlug(slug),
    getAllProjects(),
  ]);

  if (!service) {
    notFound();
  }

  const title = isArabic ? service.title.ar : service.title.en;
  const shortDesc = isArabic ? service.shortDescription.ar : service.shortDescription.en;
  const fullDesc = isArabic ? service.fullDescription.ar : service.fullDescription.en;
  const benefits = isArabic ? service.benefits.ar : service.benefits.en;
  const deliverables = isArabic ? service.deliverables.ar : service.deliverables.en;
  const processSteps = isArabic ? service.processSteps.ar : service.processSteps.en;
  const faqs = isArabic ? service.faqs.ar : service.faqs.en;

  const faqAccordionItems = faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-cyan transition-colors"
          >
            {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isArabic ? 'العودة لجميع الخدمات' : 'Back to Services'}</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10">
          <span className="px-3.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
            D-NINE SERVICE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg text-text-muted leading-relaxed max-w-3xl">
            {shortDesc}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-border shadow-2xl mb-12">
          <Image
            src={service.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Details & Overview */}
        <div className="space-y-12 text-foreground">
          {/* Overview */}
          <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              {t('overview')}
            </h2>
            <p className="text-text-muted leading-relaxed">{fullDesc}</p>
          </div>

          {/* Benefits & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-4">
              <h2 className="text-xl font-bold text-brand-cyan">
                {t('benefits')}
              </h2>
              <ul className="space-y-3">
                {benefits.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0" />
                    <span className="text-sm text-foreground font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-4">
              <h2 className="text-xl font-bold text-brand-purple dark:text-brand-purple-light">
                {t('deliverables')}
              </h2>
              <div className="space-y-3">
                {deliverables.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground">{d.title}</h3>
                    <p className="text-xs text-text-muted">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              {t('process')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-2xl font-black text-brand-cyan/40 font-mono">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {faqAccordionItems.length > 0 && (
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-cyan" />
                <span>{t('faqTitle')}</span>
              </h2>
              <Accordion items={faqAccordionItems} />
            </div>
          )}

          {/* Matching Projects */}
          <RelatedServiceProjects
            serviceCategorySlug={service.categorySlug}
            projects={allProjects}
          />
        </div>
      </div>
    </main>
  );
}
