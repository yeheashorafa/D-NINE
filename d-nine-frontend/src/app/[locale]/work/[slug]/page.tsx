import React from 'react';
import { WorkDetailPage } from '@/features/work/work-detail-page';
import { getAllProjects, getProjectBySlug } from '@/services/content/projects.service';
import { routing } from '@/i18n/routing';

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { stegaClean } from '@sanity/client/stega';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isArabic = locale === 'ar';
  
  const project = await getProjectBySlug(slug, { stega: false });
  if (!project) {
    return {
      title: isArabic ? 'مشروع غير موجود | دي ناين' : 'Project Not Found | D-NINE',
    };
  }

  const seoTitle = stegaClean(project.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || `${project.title?.[isArabic ? 'ar' : 'en']} | D-NINE`);
  const seoDesc = stegaClean(project.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || project.summary?.[isArabic ? 'ar' : 'en']);

  return constructMetadata({
    title: seoTitle,
    description: seoDesc,
    locale,
    path: `/work/${slug}`
  });
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export default async function WorkDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  return <WorkDetailPage slug={slug} />;
}
