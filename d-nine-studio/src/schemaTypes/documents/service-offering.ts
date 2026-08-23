import { defineType, defineField } from 'sanity';
import { MasterDetailIcon } from '@sanity/icons';

export const serviceOffering = defineType({
  name: 'serviceOffering',
  title: 'Service Offering (Sub-service)',
  type: 'document',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Offering Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Canonical Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentService',
      title: 'Parent Primary Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Content Category',
      type: 'reference',
      to: [{ type: 'contentCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Offering Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Offering',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      titleAr: 'title.ar',
      titleEn: 'title.en',
      parentService: 'parentService.title.en',
      media: 'image',
    },
    prepare({ titleAr, titleEn, parentService, media }) {
      return {
        title: `${titleEn || 'Offering'} (${titleAr || ''})`,
        subtitle: parentService ? `Under: ${parentService}` : 'Offering',
        media,
      };
    },
  },
});
