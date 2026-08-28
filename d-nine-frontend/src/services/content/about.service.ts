/* eslint-disable @typescript-eslint/no-explicit-any */
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';

export interface ValueItem {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: string;
}

export interface AboutPageData {
  hero: {
    badge: { ar: string; en: string };
    title: { ar: string; en: string };
    subtitle: { ar: string; en: string };
  };
  story: {
    badge: { ar: string; en: string };
    title: { ar: string; en: string };
    paragraphs: { ar: string[]; en: string[] };
  };
  mission: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
  };
  vision: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
  };
  values: {
    badge: { ar: string; en: string };
    title: { ar: string; en: string };
    items: ValueItem[];
  };
}

const aboutQuery = `*[_type == "aboutPage"][0]{
  hero,
  story,
  mission,
  vision,
  values
}`;

export async function getAboutPageData(): Promise<AboutPageData> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<any>({
      query: aboutQuery,
      tags: ['about'],
    });

    if (data) {
      return {
        hero: {
          badge: { ar: data.hero?.badge?.ar || 'من نحن', en: data.hero?.badge?.en || 'About Us' },
          title: { ar: data.hero?.title?.ar || 'وكالة إبداعية متكاملة', en: data.hero?.title?.en || 'A Complete Creative Agency' },
          subtitle: { ar: data.hero?.subtitle?.ar || 'نصنع محتوى يصنع الفارق', en: data.hero?.subtitle?.en || 'We make content that matters' },
        },
        story: {
          badge: { ar: data.story?.badge?.ar || 'قصتنا', en: data.story?.badge?.en || 'Our Story' },
          title: { ar: data.story?.title?.ar || 'كيف بدأنا', en: data.story?.title?.en || 'How we started' },
          paragraphs: {
            ar: data.story?.paragraphs?.ar || ['تأسست دي ناين كوكالة إبداعية...'],
            en: data.story?.paragraphs?.en || ['D-NINE was founded as a creative agency...'],
          },
        },
        mission: {
          title: { ar: data.mission?.title?.ar || 'رسالتنا', en: data.mission?.title?.en || 'Our Mission' },
          description: { ar: data.mission?.description?.ar || 'تقديم حلول إبداعية...', en: data.mission?.description?.en || 'To provide creative solutions...' },
        },
        vision: {
          title: { ar: data.vision?.title?.ar || 'رؤيتنا', en: data.vision?.title?.en || 'Our Vision' },
          description: { ar: data.vision?.description?.ar || 'أن نكون الخيار الأول...', en: data.vision?.description?.en || 'To be the first choice...' },
        },
        values: {
          badge: { ar: data.values?.badge?.ar || 'قيمنا', en: data.values?.badge?.en || 'Our Values' },
          title: { ar: data.values?.title?.ar || 'مبادئنا الأساسية', en: data.values?.title?.en || 'Core Principles' },
          items: (data.values?.items || []).map((item: any) => ({
            title: { ar: item.title?.ar || '', en: item.title?.en || '' },
            description: { ar: item.description?.ar || '', en: item.description?.en || '' },
            icon: item.icon || 'Palette',
          })),
        }
      };
    }
  }

  // Fallback to static, normally we could use the i18n JSON data if available, or just empty values here, and let the page handle fallback using translations.
  return {
    hero: { badge: { ar: '', en: '' }, title: { ar: '', en: '' }, subtitle: { ar: '', en: '' } },
    story: { badge: { ar: '', en: '' }, title: { ar: '', en: '' }, paragraphs: { ar: [], en: [] } },
    mission: { title: { ar: '', en: '' }, description: { ar: '', en: '' } },
    vision: { title: { ar: '', en: '' }, description: { ar: '', en: '' } },
    values: { badge: { ar: '', en: '' }, title: { ar: '', en: '' }, items: [] }
  };
}
