import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post / Insight',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    { name: 'general', title: 'Post Details' },
    { name: 'content', title: 'Article Body & Sections' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
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
      name: 'category',
      title: 'Primary Category',
      type: 'reference',
      to: [{ type: 'contentCategory' }],
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      fieldset: 'general',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      fieldset: 'general',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTimeMinutes',
      title: 'Estimated Read Time (Minutes)',
      type: 'number',
      fieldset: 'general',
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      fieldset: 'general',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
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
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'localizedText',
      fieldset: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Rich Text Article Body',
      type: 'localizedPortableText',
      fieldset: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'localizedStringArray',
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
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleAr: 'title.ar',
      slug: 'slug.current',
      category: 'category.title.en',
      media: 'coverImage',
      publishedAt: 'publishedAt',
      featured: 'featured',
    },
    prepare({ titleEn, titleAr, slug, category, media, publishedAt, featured }) {
      const dateStr = publishedAt ? publishedAt.split('T')[0] : 'Draft';
      return {
        title: `${titleEn || 'Post'} (${titleAr || ''})`,
        subtitle: `[${category || 'Insight'}] /blog/${slug || ''} • ${dateStr} ${featured ? '★' : ''}`,
        media,
      };
    },
  },
});
