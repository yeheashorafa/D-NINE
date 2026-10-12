import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'صفحة تواصل معنا (Contact Page)',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'مقدمة الصفحة (Hero Section)' },
    { name: 'content', title: 'محتوى ووسائل التواصل والمكاتب (Contact Methods & Offices)' },
    { name: 'seo', title: 'تحسين محركات البحث (SEO & Metadata)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'الشارة التمهيدية (Hero Badge)',
      description: 'نص الشارة الصغيرة أعلى عنوان الصفحة',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'عنوان الصفحة (Hero Title)',
      description: 'العنوان الرئيسي لصفحة التواصل باللغتين',
      type: 'localizedString',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'الوصف التمهيدي (Hero Subtitle)',
      description: 'الوصف النصي القصير أسفل العنوان الرئيسي',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedPortableText',
      fieldset: 'content',
    }),
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      of: [defineArrayMember({ type: 'contactMethod' })],
      fieldset: 'content',
    }),
    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [defineArrayMember({ type: 'office' })],
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
