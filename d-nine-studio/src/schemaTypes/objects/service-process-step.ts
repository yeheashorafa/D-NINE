import { defineType, defineField } from 'sanity';

export const serviceProcessStep = defineType({
  name: 'serviceProcessStep',
  title: 'Service Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number (e.g. 01, 02)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Step Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      step: 'stepNumber',
      titleEn: 'title.en',
      titleAr: 'title.ar',
    },
    prepare({ step, titleEn, titleAr }) {
      return {
        title: `${step || '##'} — ${titleEn || titleAr || 'Step'}`,
        subtitle: titleAr,
      };
    },
  },
});
