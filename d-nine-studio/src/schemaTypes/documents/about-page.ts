import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Agency Story & Identity' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localizedString',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'agencyStory',
      title: 'Agency Story',
      type: 'localizedPortableText',
      fieldset: 'content',
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'localizedText',
      fieldset: 'content',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'localizedText',
      fieldset: 'content',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueItem',
          fields: [
            defineField({ name: 'title', type: 'localizedString', title: 'Title' }),
            defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
            defineField({ name: 'iconName', type: 'string', title: 'Icon Name (Lucide)' }),
          ],
        }),
      ],
      fieldset: 'content',
    }),
    defineField({
      name: 'media',
      title: 'Visual Assets',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      fieldset: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
      fieldset: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page (من نحن)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
