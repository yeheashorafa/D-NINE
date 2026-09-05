import { defineType, defineField } from 'sanity';

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'URL or relative path (e.g., /services or https://example.com)',
    }),
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
  ],
  preview: {
    select: {
      media: 'image',
      titleEn: 'title.en',
      titleAr: 'title.ar',
      active: 'active',
    },
    prepare({ media, titleEn, titleAr, active }) {
      return {
        title: titleEn || titleAr || 'Slide',
        subtitle: active ? 'Active' : 'Hidden',
        media,
      };
    },
  },
});
