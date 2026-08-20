import { ProjectItem } from '@/types/project';
import { PROJECTS_DATA } from '@/features/work/data/projects.data';
import { ContentPage, ContentQueryParams } from './content-page.types';

export async function getAllProjects(): Promise<ProjectItem[]> {
  return PROJECTS_DATA;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return PROJECTS_DATA.map((p) => p.slug);
}

export async function getProjects(
  params: ContentQueryParams = {}
): Promise<ContentPage<ProjectItem>> {
  const { categorySlug, limit = 6, cursor } = params;

  let items = PROJECTS_DATA;

  if (categorySlug && categorySlug !== 'all') {
    items = items.filter((p) => {
      if (p.primaryCategorySlug === categorySlug) return true;
      if (p.categorySlugs && p.categorySlugs.includes(categorySlug)) return true;
      if (p.serviceSlug === categorySlug) return true;
      return false;
    });
  }

  const offset = cursor ? parseInt(cursor, 10) : 0;
  const sliced = items.slice(offset, offset + limit);
  const nextOffset = offset + limit;
  const hasMore = nextOffset < items.length;

  return {
    items: sliced,
    nextCursor: hasMore ? nextOffset.toString() : null,
    hasMore,
    total: items.length,
  };
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  return project || null;
}

export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  return PROJECTS_DATA.filter((p) => p.featured);
}

export async function getServiceRelatedProjects(
  serviceCategorySlug: string,
  limit = 3
): Promise<ProjectItem[]> {
  return PROJECTS_DATA.filter((p) => {
    return (
      p.primaryCategorySlug === serviceCategorySlug ||
      (p.categorySlugs && p.categorySlugs.includes(serviceCategorySlug)) ||
      p.serviceSlug === serviceCategorySlug
    );
  }).slice(0, limit);
}
