import { ProjectItem } from '@/types/project';

export function getRelatedProjects(
  currentProject: ProjectItem,
  allProjects: ProjectItem[],
  limit = 3
): ProjectItem[] {
  const currentSlugs = new Set([
    currentProject.primaryCategorySlug,
    ...(currentProject.categorySlugs || []),
  ]);

  return allProjects
    .filter((project) => {
      if (project.id === currentProject.id || project.slug === currentProject.slug) {
        return false;
      }
      const projectSlugs = [
        project.primaryCategorySlug,
        ...(project.categorySlugs || []),
      ];
      return projectSlugs.some((slug) => currentSlugs.has(slug));
    })
    .slice(0, limit);
}
