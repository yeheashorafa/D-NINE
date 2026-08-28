import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getProjectBySlug, getAllProjects } from '@/services/content/projects.service';
import { getTestimonialsForProject } from '@/services/content/testimonials.service';
import { ProjectGallery } from './components/project-gallery';
import { RelatedProjects } from './components/related-projects';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TestimonialsSection } from '../home/components/testimonials-section';

export interface WorkDetailPageProps {
  slug: string;
}

export async function WorkDetailPage({ slug }: WorkDetailPageProps) {
  const t = await getTranslations('caseStudy');
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  const [project, allProjects, testimonials] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
    getTestimonialsForProject(slug),
  ]);

  if (!project) {
    notFound();
  }

  const categoryLabel = isArabic ? project.category.ar : project.category.en;
  const title = isArabic ? project.title.ar : project.title.en;
  const summary = isArabic ? project.summary.ar : project.summary.en;
  const challenge = isArabic ? project.challenge.ar : project.challenge.en;
  const strategy = isArabic ? project.strategy.ar : project.strategy.en;
  const solution = isArabic ? project.solution.ar : project.solution.en;
  const deliverables = isArabic ? project.deliverables.ar : project.deliverables.en;
  const clientName = project.clientName ? (isArabic ? project.clientName.ar : project.clientName.en) : null;
  const credits = project.credits ? (isArabic ? project.credits.ar : project.credits.en) : null;

  return (
    <main className="pt-28 sm:pt-36 pb-16 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-cyan transition-colors"
          >
            {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isArabic ? 'العودة لمعرض الأعمال' : 'Back to Work'}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
              {categoryLabel}
            </span>
            <span className="text-xs text-text-muted font-mono">{project.year}</span>
            {clientName && (
              <>
                <span className="text-xs text-text-muted font-mono px-2">•</span>
                <span className="text-xs text-text-muted font-mono">{clientName}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-lg text-text-muted leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-border shadow-2xl mb-12">
          <Image
            src={project.coverImage || project.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-foreground">
          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {project.metrics.map((metric, idx) => {
                const label = isArabic ? metric.label.ar : metric.label.en;
                return (
                  <div key={idx} className="p-6 rounded-3xl bg-surface/80 dark:bg-card border border-border flex flex-col items-center justify-center text-center">
                    <span className="text-3xl sm:text-4xl font-extrabold text-brand-cyan mb-2">{metric.value}</span>
                    <span className="text-sm text-text-muted font-medium uppercase tracking-wider">{label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Challenge */}
          <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
            <h2 className="text-xl font-bold text-brand-purple dark:text-brand-purple-light">
              {t('challenge')}
            </h2>
            <p className="text-text-muted leading-relaxed">{challenge}</p>
          </div>

          {/* Strategy & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
              <h2 className="text-xl font-bold text-brand-cyan">
                {t('strategy')}
              </h2>
              <p className="text-text-muted leading-relaxed">{strategy}</p>
            </div>

            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
              <h2 className="text-xl font-bold text-foreground">
                {t('solution')}
              </h2>
              <p className="text-text-muted leading-relaxed">{solution}</p>
            </div>
          </div>

          {/* Deliverables */}
          {deliverables.length > 0 && (
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                {t('deliverables')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0" />
                    <span className="text-sm text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Gallery */}
          <ProjectGallery media={project.media} />

          {/* Credits */}
          {credits && (
            <div className="p-8 rounded-3xl bg-surface/80 dark:bg-card border border-border space-y-3">
              <h2 className="text-xl font-bold text-foreground">
                {isArabic ? 'الحقوق / فريق العمل' : 'Credits / Team'}
              </h2>
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">{credits}</p>
            </div>
          )}

          {/* Related Projects */}
          <RelatedProjects currentProject={project} allProjects={allProjects} />

          {/* Related Testimonials */}
          {testimonials.length > 0 && (
            <TestimonialsSection
              data={{
                enabled: true,
                title: { ar: 'ماذا يقول عملاؤنا', en: 'What Our Clients Say' },
                selectedTestimonials: testimonials,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
