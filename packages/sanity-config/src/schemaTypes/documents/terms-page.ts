import { defineType, defineField } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const termsPage = defineType({
  name: 'termsPage',
  title: 'Terms and Conditions Page',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'general', title: 'General Info' },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      fieldset: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      fieldset: 'general',
    }),
    defineField({
      name: 'body',
      title: 'Terms Content',
      type: 'localizedPortableText',
      fieldset: 'general',
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
        title: 'Terms & Conditions (الشروط والأحكام)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
