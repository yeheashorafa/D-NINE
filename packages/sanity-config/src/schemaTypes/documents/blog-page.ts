import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const blogPage = defineType({
  name: 'blogPage',
  title: 'صفحة المدونة والمقالات (Blog Page)',
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
      description: 'نص الشارة الصغيرة أعلى عنوان صفحة المدونة',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'عنوان الصفحة (Hero Title)',
      description: 'العنوان الرئيسي لصفحة المدونة باللغتين',
      type: 'localizedString',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'الوصف التمهيدي (Hero Subtitle)',
      description: 'الوصف النصي القصير أسفل عنوان المدونة',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'blogPost' }] })],
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
        title: 'Blog Page (المدونة)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
