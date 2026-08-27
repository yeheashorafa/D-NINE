import { defineType, defineField, defineArrayMember } from 'sanity';

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Column Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleAr: 'title.ar',
    },
    prepare({ titleEn, titleAr }) {
      return {
        title: titleEn || titleAr || 'Footer Column',
      };
    },
  },
});
