import { TimelineItem } from '@/types/common';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { processTimelineQuery } from '@/sanity/queries/agency.queries';
import { mapSanityTimelineItem } from '@/sanity/mappers/agency.mapper';
import { SanityTimelineItemDoc } from '@/sanity/types';

export const PROCESS_TIMELINE_STEPS: TimelineItem[] = [
  {
    step: '01',
    title: {
      ar: 'الاكتشاف والاستراتيجية',
      en: 'Discovery & Strategy',
    },
    description: {
      ar: 'فهم أهداف العلامة التجارية ودراسة السوق والجمهور المستهدف لصياغة توجه مرئي مخصص.',
      en: 'Understanding brand objectives, target audience, and market landscape to establish clear direction.',
    },
  },
  {
    step: '02',
    title: {
      ar: 'التطوير والابتكار البصري',
      en: 'Creative Design & Production',
    },
    description: {
      ar: 'تحويل المفاهيم والنصوص إلى تصاميم بصرية وفيديوهات عالية الجودة ومتقنة التفاصيل.',
      en: 'Transforming ideas into high-quality visual designs, motion assets, and cinematic videos.',
    },
  },
  {
    step: '03',
    title: {
      ar: 'التنفيذ والاعتماد النهائي',
      en: 'Refinement & Delivery',
    },
    description: {
      ar: 'مراجعة المخرجات وصقلها لتسليم الملفات النهائية وفق أفضل المعايير والمواصفات.',
      en: 'Polishing deliverables to hand over production-ready master files across all formats.',
    },
  },
];

export async function getProcessTimeline(): Promise<TimelineItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTimelineItemDoc[]>({
      query: processTimelineQuery,
      tags: ['agency', 'home-page'],
    });
    return (data && data.length > 0)
      ? data.map(mapSanityTimelineItem)
      : PROCESS_TIMELINE_STEPS;
  }

  return PROCESS_TIMELINE_STEPS;
}
