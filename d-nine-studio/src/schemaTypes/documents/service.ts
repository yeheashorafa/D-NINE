import { defineType, defineField, defineArrayMember } from 'sanity';
import { SparklesIcon } from '@sanity/icons';

export const service = defineType({
  name: 'service',
  title: 'Primary Service',
  type: 'document',
  icon: SparklesIcon,
  fieldsets: [
    { name: 'general', title: 'General Info' },
    { name: 'content', title: 'Descriptions & Details' },
    { name: 'process', title: 'Process & Deliverables' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
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
      validation: (Rule) => Rule.required().error('Canonical slug is required'),
    }),
    defineField({
      name: 'category',
      title: 'Associated Content Category',
      type: 'reference',
      to: [{ type: 'contentCategory' }],
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g. Palette, Sparkles, Smartphone, Video, Image, Share2, Megaphone',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      fieldset: 'general',
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
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      fieldset: 'general',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      fieldset: 'general',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Cards / Summaries)',
      type: 'localizedText',
      fieldset: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (Detail Page Intro)',
      type: 'localizedText',
      fieldset: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits List',
      type: 'localizedStringArray',
      fieldset: 'content',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables List',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceDeliverable' })],
      fieldset: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps Timeline',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceProcessStep' })],
      fieldset: 'process',
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceFaq' })],
      fieldset: 'content',
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
      titleAr: 'title.ar',
      titleEn: 'title.en',
      slug: 'slug.current',
      order: 'order',
      media: 'image',
      featured: 'featured',
    },
    prepare({ titleAr, titleEn, slug, order, media, featured }) {
      return {
        title: `${titleEn || 'Service'} (${titleAr || 'خدمة'})`,
        subtitle: `[${order ?? 0}] /services/${slug || ''} ${featured ? '★ Featured' : ''}`,
        media,
      };
    },
  },
});
