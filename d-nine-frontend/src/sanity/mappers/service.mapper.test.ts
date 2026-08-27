import { describe, it, expect } from 'vitest';
import { mapSanityService } from './service.mapper';
import { SanityServiceDoc } from '../types';

describe('mapSanityService', () => {
  it('should correctly map localized array fields (deliverables, processSteps, faqs) to ar/en outputs', () => {
    const mockDoc: SanityServiceDoc = {
      _id: 'test-id',
      slug: 'test-slug',
      categorySlug: 'test-category',
      title: { ar: 'عنوان', en: 'Title' },
      shortDescription: { ar: 'قصير', en: 'Short' },
      fullDescription: { ar: 'كامل', en: 'Full' },
      iconName: 'Sparkles',
      deliverables: [
        {
          title: { ar: 'مخرج ١', en: 'Deliverable 1' },
          description: { ar: 'وصف ١', en: 'Desc 1' },
        },
      ],
      processSteps: [
        {
          stepNumber: '01',
          title: { ar: 'خطوة ١', en: 'Step 1' },
          description: { ar: 'وصف الخطوة', en: 'Step Desc' },
        },
      ],
      faqs: [
        {
          question: { ar: 'سؤال؟', en: 'Question?' },
          answer: { ar: 'جواب.', en: 'Answer.' },
        },
      ],
    };

    const result = mapSanityService(mockDoc);

    // Assert AR maps correctly
    expect(result.deliverables.ar).toEqual([{ title: 'مخرج ١', description: 'وصف ١' }]);
    expect(result.processSteps.ar).toEqual([{ stepNumber: '01', title: 'خطوة ١', description: 'وصف الخطوة' }]);
    expect(result.faqs.ar).toEqual([{ question: 'سؤال؟', answer: 'جواب.' }]);

    // Assert EN maps correctly
    expect(result.deliverables.en).toEqual([{ title: 'Deliverable 1', description: 'Desc 1' }]);
    expect(result.processSteps.en).toEqual([{ stepNumber: '01', title: 'Step 1', description: 'Step Desc' }]);
    expect(result.faqs.en).toEqual([{ question: 'Question?', answer: 'Answer.' }]);
  });
});
