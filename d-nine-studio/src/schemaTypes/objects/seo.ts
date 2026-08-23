import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph / Social Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image Alt Text',
        },
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'localizedStringArray',
    }),
  ],
});
