import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'صفحة الخدمات العامة (Services Page)',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'مقدمة الصفحة (Hero Section)' },
    { name: 'seo', title: 'تحسين محركات البحث (SEO & Metadata)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'الشارة التمهيدية (Hero Badge)',
      description: 'النص الصغير في الشارة أعلى العنوان',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'عنوان الصفحة (Hero Title)',
      description: 'العنوان الرئيسي لصفحة الخدمات باللغتين',
      type: 'localizedString',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'الوصف التمهيدي (Hero Subtitle)',
      description: 'النص الوصفي تحت العنوان الرئيسي',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'filterLabels',
      title: 'Filter Labels (e.g. All, Primary, Offerings)',
      type: 'object',
      fields: [
        defineField({ name: 'all', type: 'localizedString', title: 'All Label' }),
        defineField({ name: 'primary', type: 'localizedString', title: 'Primary Services Label' }),
        defineField({ name: 'offerings', type: 'localizedString', title: 'Offerings Label' }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'testimonialsSection',
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
        title: 'Services Page (الخدمات)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
