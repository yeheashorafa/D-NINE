import { defineType, defineField } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Marketing Content & Titles' },
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
      name: 'contactInfoTitle',
      title: 'Contact Info Section Title',
      type: 'localizedString',
      fieldset: 'content',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Section Title',
      type: 'localizedString',
      fieldset: 'content',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Section Subtitle',
      type: 'localizedText',
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
        title: 'Contact Page (تواصل معنا)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
