import { defineType, defineField } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const workPage = defineType({
  name: 'workPage',
  title: 'Work Page',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'Hero Section' },
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
      name: 'allCategoriesLabel',
      title: '"All" Category Label',
      type: 'localizedString',
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
        title: 'Work Page (أعمالنا)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
