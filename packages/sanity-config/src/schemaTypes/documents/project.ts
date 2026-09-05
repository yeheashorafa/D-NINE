import { defineType, defineField, defineArrayMember } from 'sanity';
import { CaseIcon } from '@sanity/icons';

export const project = defineType({
  name: 'project',
  title: 'Project / Case Study',
  type: 'document',
  icon: CaseIcon,
  fieldsets: [
    { name: 'general', title: 'General Info' },
    { name: 'story', title: 'Case Study Narrative' },
    { name: 'deliverablesMetrics', title: 'Deliverables & Metrics' },
    { name: 'mediaGallery', title: 'Media & Gallery' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'localizedString',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Canonical Slug',
      type: 'slug',
      fieldset: 'general',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name (Real or Concept)',
      type: 'localizedString',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Project Year (e.g. 2025)',
      type: 'string',
      fieldset: 'general',
      initialValue: '2025',
    }),
    defineField({
      name: 'primaryCategory',
      title: 'Primary Category',
      type: 'reference',
      to: [{ type: 'contentCategory' }],
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Additional Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'contentCategory' }] })],
      fieldset: 'general',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      fieldset: 'general',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Portfolio Project',
      type: 'boolean',
      fieldset: 'general',
      initialValue: false,
    }),
    defineField({
      name: 'colorVariant',
      title: 'Card Accent Color Variant',
      type: 'string',
      fieldset: 'general',
      options: {
        list: [
          { title: 'Purple', value: 'purple' },
          { title: 'Cyan', value: 'cyan' },
          { title: 'Amber', value: 'amber' },
          { title: 'Emerald', value: 'emerald' },
        ],
      },
      initialValue: 'purple',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      fieldset: 'general',
      initialValue: 0,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Main card and hero banner)',
      type: 'image',
      fieldset: 'mediaGallery',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alt Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary (Executive Overview)',
      type: 'localizedText',
      fieldset: 'story',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'localizedText',
      fieldset: 'story',
    }),
    defineField({
      name: 'strategy',
      title: 'The Creative Strategy',
      type: 'localizedText',
      fieldset: 'story',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution & Execution',
      type: 'localizedText',
      fieldset: 'story',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables List',
      type: 'localizedStringArray',
      fieldset: 'deliverablesMetrics',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Results & Metrics',
      type: 'array',
      of: [defineArrayMember({ type: 'projectMetric' })],
      fieldset: 'deliverablesMetrics',
    }),
    defineField({
      name: 'media',
      title: 'Media Gallery (Images & Videos)',
      type: 'array',
      of: [defineArrayMember({ type: 'projectMedia' })],
      fieldset: 'mediaGallery',
    }),
    defineField({
      name: 'credits',
      title: 'Credits & Production Notes',
      type: 'localizedText',
      fieldset: 'story',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      fieldset: 'seo',
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
      titleEn: 'title.en',
      titleAr: 'title.ar',
      slug: 'slug.current',
      category: 'primaryCategory.title.en',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({ titleEn, titleAr, slug, category, media, featured }) {
      return {
        title: `${titleEn || 'Project'} (${titleAr || ''})`,
        subtitle: `[${category || 'Category'}] /work/${slug || ''} ${featured ? '★' : ''}`,
        media,
      };
    },
  },
});
