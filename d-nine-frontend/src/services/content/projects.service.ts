import { ProjectItem } from '@/types/project';
import { PROJECTS_DATA } from '@/features/work/data/projects.data';
import { ContentPage, ContentQueryParams } from './content-page.types';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import {
  allProjectsQuery,
  projectBySlugQuery,
  allProjectSlugsQuery,
  featuredProjectsQuery,
  paginatedProjectsQuery,
  countProjectsQuery,
} from '@/sanity/queries/projects.queries';
import { mapSanityProject } from '@/sanity/mappers/project.mapper';
import { SanityProjectDoc } from '@/sanity/types';

export async function getAllProjects(): Promise<ProjectItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityProjectDoc[]>({
      query: allProjectsQuery,
      tags: ['projects'],
    });
    return (data || []).map(mapSanityProject);
  }

  return PROJECTS_DATA;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<string[]>({
      query: allProjectSlugsQuery,
      tags: ['projects'],
      stega: false,
    });
    return data || [];
  }

  return PROJECTS_DATA.map((p) => p.slug);
}

export async function getProjects(
  params: ContentQueryParams = {}
): Promise<ContentPage<ProjectItem>> {
  const { categorySlug, limit = 6, cursor } = params;

  if (contentSource === 'sanity') {
    assertSanityConfig();
    const offset = cursor ? parseInt(cursor, 10) : 0;
    const end = offset + limit;

    const [itemsData, total] = await Promise.all([
      sanityFetch<SanityProjectDoc[]>({
        query: paginatedProjectsQuery,
        params: {
          categorySlug: categorySlug || 'all',
          offset,
          end,
        },
        tags: ['projects'],
      }),
      sanityFetch<number>({
        query: countProjectsQuery,
        params: {
          categorySlug: categorySlug || 'all',
        },
        tags: ['projects'],
      }),
    ]);

    const items = (itemsData || []).map(mapSanityProject);
    const hasMore = offset + limit < total;

    return {
      items,
      nextCursor: hasMore ? (offset + limit).toString() : null,
      hasMore,
      total,
    };
  }

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
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityProjectDoc | null>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ['projects', `project:${slug}`],
    });
    return data ? mapSanityProject(data) : null;
  }

  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  return project || null;
}

export async function getFeaturedProjects(): Promise<ProjectItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityProjectDoc[]>({
      query: featuredProjectsQuery,
      tags: ['projects'],
    });
    return (data || []).map(mapSanityProject);
  }

  return PROJECTS_DATA.filter((p) => p.featured);
}

export async function getServiceRelatedProjects(
  serviceCategorySlug: string,
  limit = 3
): Promise<ProjectItem[]> {
  const allProjects = await getAllProjects();
  return allProjects
    .filter((p) => {
      return (
        p.primaryCategorySlug === serviceCategorySlug ||
        (p.categorySlugs && p.categorySlugs.includes(serviceCategorySlug)) ||
        p.serviceSlug === serviceCategorySlug
      );
    })
    .slice(0, limit);
}
