import React from 'react';
import { WorkDetailPage } from '@/features/work/work-detail-page';
import { getAllProjects } from '@/services/content/projects.service';
import { routing } from '@/i18n/routing';

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
