'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ProjectItem } from '@/types/project';
import { WorkCard } from './work-card';
import { getRelatedProjects } from '../utils/project-relations';

export interface RelatedProjectsProps {
  currentProject: ProjectItem;
  allProjects: ProjectItem[];
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  currentProject,
  allProjects,
}) => {
  const t = useTranslations('caseStudy');

  const related = getRelatedProjects(currentProject, allProjects, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {t('relatedProjects')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {related.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
