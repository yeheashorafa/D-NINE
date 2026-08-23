import { defineType, defineField } from 'sanity';

export const serviceDeliverable = defineType({
  name: 'serviceDeliverable',
  title: 'Service Deliverable',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Deliverable Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deliverable Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      titleAr: 'title.ar',
      titleEn: 'title.en',
      descEn: 'description.en',
    },
    prepare({ titleAr, titleEn, descEn }) {
      return {
        title: titleEn || titleAr || 'Deliverable',
        subtitle: descEn || titleAr,
      };
    },
  },
});
