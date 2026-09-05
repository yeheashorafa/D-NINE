import { defineType, defineField } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const contentCategory = defineType({
  name: 'contentCategory',
  title: 'Content Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
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
      validation: (Rule) => Rule.required().error('Canonical slug is required and must be unique'),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Active / Published in Navigation',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
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
      slug: 'slug.current',
      order: 'order',
      active: 'active',
    },
    prepare({ titleAr, titleEn, slug, order, active }) {
      return {
        title: `${titleEn || 'Untitled'} (${titleAr || 'بدون عنوان'})`,
        subtitle: `[${order ?? 0}] /${slug || ''} ${active ? '🟢' : '⚪ (inactive)'}`,
      };
    },
  },
});
