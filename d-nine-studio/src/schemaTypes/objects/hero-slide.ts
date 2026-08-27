import { defineType, defineField } from 'sanity';

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'active',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this slide without deleting it',
    }),
    defineField({
      name: 'link',
      title: 'Optional Link',
      type: 'string',
      description: 'URL or relative path (e.g., /services or https://example.com)',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      altEn: 'image.alt.en',
      active: 'active',
    },
    prepare({ media, altEn, active }) {
      return {
        title: altEn || 'Slide Image',
        subtitle: active ? 'Active' : 'Hidden',
        media,
      };
    },
  },
});
