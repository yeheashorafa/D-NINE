import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';

export interface Slide {
  id: string;
  image: string;
  videoUrl?: string;
  category: { ar: string; en: string };
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  ctaText: { ar: string; en: string };
  ctaLink: string;
}

export interface SnapshotStat {
  value: string;
  label: { ar: string; en: string };
}

export interface HomePageData {
  hero: {
    slides: Slide[];
  };
  creativeSnapshot: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    stats: SnapshotStat[];
    videoUrl?: string;
  };
  featuredProjects: {
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    projectSlugs: string[];
  };
  featuredServices: {
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    serviceSlugs: string[];
  };
  featuredPosts: {
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
    postSlugs: string[];
  };
}

const homeQuery = `*[_type == "homePage"][0]{
  hero{
    slides[]{
      _key,
      "image": image.asset->url,
      videoUrl,
      category,
      title,
      description,
      ctaText,
      ctaLink
    }
  },
  creativeSnapshot{
    title,
    description,
    stats[]{
      value,
      label
    },
    videoUrl
  },
  featuredProjects{
    title,
    subtitle,
    "projectSlugs": projects[]->slug.current
  },
  featuredServices{
    title,
    subtitle,
    "serviceSlugs": services[]->slug.current
  },
  featuredPosts{
    title,
    subtitle,
    "postSlugs": posts[]->slug.current
  }
}`;

export async function getHomePageData(): Promise<HomePageData | null> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<any>({
      query: homeQuery,
      tags: ['homePage'],
    });

    if (data) {
      return {
        hero: {
          slides: (data.hero?.slides || []).map((slide: any) => ({
            id: slide._key,
            image: slide.image || '',
            videoUrl: slide.videoUrl,
            category: { ar: slide.category?.ar || '', en: slide.category?.en || '' },
            title: { ar: slide.title?.ar || '', en: slide.title?.en || '' },
            description: { ar: slide.description?.ar || '', en: slide.description?.en || '' },
            ctaText: { ar: slide.ctaText?.ar || '', en: slide.ctaText?.en || '' },
            ctaLink: slide.ctaLink || '',
          })),
        },
        creativeSnapshot: {
          title: { ar: data.creativeSnapshot?.title?.ar || '', en: data.creativeSnapshot?.title?.en || '' },
          description: { ar: data.creativeSnapshot?.description?.ar || '', en: data.creativeSnapshot?.description?.en || '' },
          stats: (data.creativeSnapshot?.stats || []).map((stat: any) => ({
            value: stat.value || '',
            label: { ar: stat.label?.ar || '', en: stat.label?.en || '' },
          })),
          videoUrl: data.creativeSnapshot?.videoUrl,
        },
        featuredProjects: {
          title: { ar: data.featuredProjects?.title?.ar || '', en: data.featuredProjects?.title?.en || '' },
          subtitle: { ar: data.featuredProjects?.subtitle?.ar || '', en: data.featuredProjects?.subtitle?.en || '' },
          projectSlugs: data.featuredProjects?.projectSlugs?.filter(Boolean) || [],
        },
        featuredServices: {
          title: { ar: data.featuredServices?.title?.ar || '', en: data.featuredServices?.title?.en || '' },
          subtitle: { ar: data.featuredServices?.subtitle?.ar || '', en: data.featuredServices?.subtitle?.en || '' },
          serviceSlugs: data.featuredServices?.serviceSlugs?.filter(Boolean) || [],
        },
        featuredPosts: {
          title: { ar: data.featuredPosts?.title?.ar || '', en: data.featuredPosts?.title?.en || '' },
          subtitle: { ar: data.featuredPosts?.subtitle?.ar || '', en: data.featuredPosts?.subtitle?.en || '' },
          postSlugs: data.featuredPosts?.postSlugs?.filter(Boolean) || [],
        },
      };
    }
  }

  // Fallback to null to use static inside the components
  return null;
}
