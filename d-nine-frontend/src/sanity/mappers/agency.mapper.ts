import { TimelineItem } from '@/types/common';
import { SanityTimelineItemDoc } from '../types';

export function mapSanityTimelineItem(doc: SanityTimelineItemDoc): TimelineItem {
  return {
    step: doc.step || doc.stepNumber || '01',
    title: {
      ar: doc.title?.ar || '',
      en: doc.title?.en || '',
    },
    description: {
      ar: doc.description?.ar || '',
      en: doc.description?.en || '',
    },
  };
}
