import { defineType, defineField } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Target Link / URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Button Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Gradient (Primary)', value: 'gradient' },
          { title: 'Outline', value: 'outline' },
          { title: 'Subtle / Ghost', value: 'ghost' },
        ],
      },
      initialValue: 'gradient',
    }),
  ],
  preview: {
    select: {
      labelEn: 'label.en',
      labelAr: 'label.ar',
      url: 'url',
    },
    prepare({ labelEn, labelAr, url }) {
      return {
        title: labelEn || labelAr || 'CTA',
        subtitle: url,
      };
    },
  },
});
