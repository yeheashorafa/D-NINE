import { defineType, defineField } from 'sanity';

export const bookACallSection = defineType({
  name: 'bookACallSection',
  title: 'Book a Call Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'cta',
    }),
  ],
});
