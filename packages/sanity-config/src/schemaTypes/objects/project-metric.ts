import { defineType, defineField } from 'sanity';

export const projectMetric = defineType({
  name: 'projectMetric',
  title: 'Project Metric / KPI',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Metric Label',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Metric Value (e.g. 35+, 4K, 120 FPS)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: 'value',
      labelEn: 'label.en',
      labelAr: 'label.ar',
    },
    prepare({ value, labelEn, labelAr }) {
      return {
        title: `${value || ''} — ${labelEn || labelAr || 'Metric'}`,
      };
    },
  },
});
