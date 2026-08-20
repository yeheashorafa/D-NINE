'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ProjectItem } from '@/types/project';
import { WorkCard } from '@/features/work/components/work-card';

export interface RelatedServiceProjectsProps {
  serviceCategorySlug: string;
  projects: ProjectItem[];
}

export const RelatedServiceProjects: React.FC<RelatedServiceProjectsProps> = ({
  serviceCategorySlug,
  projects,
}) => {
  const t = useTranslations('serviceDetail');

  const matchingProjects = projects
    .filter((project) => {
      return (
        project.primaryCategorySlug === serviceCategorySlug ||
        (project.categorySlugs && project.categorySlugs.includes(serviceCategorySlug)) ||
        project.serviceSlug === serviceCategorySlug
      );
    })
    .slice(0, 6);

  if (matchingProjects.length === 0) return null;

  return (
    <section className="py-12 border-t border-border mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {t('relatedProjects')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {matchingProjects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
