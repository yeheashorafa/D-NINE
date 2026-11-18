import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const sectorPage = defineType({
  name: 'sectorPage',
  title: 'صفحات القطاعات الرئيسية (Sector Pages)',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'المحتوى (Content)', default: true },
    { name: 'services', title: 'الخدمات والباقات (Services & Packages)' },
    { name: 'work', title: 'الأعمال (Work)' },
    { name: 'seo', title: 'تحسين محركات البحث (SEO)' },
  ],
  fields: [
    defineField({ name: 'title', title: 'اسم القطاع (Sector Title)', type: 'localizedString', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug', title: 'الرابط (Slug)', type: 'slug', group: 'content',
      options: { source: 'title.en', maxLength: 96 }, validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'intro', title: 'مقدمة القطاع (Introduction)', type: 'localizedText', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'صورة القطاع (Cover Image)', type: 'image', group: 'content', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'النص البديل', type: 'localizedString' })] }),
    defineField({
      name: 'services', title: 'قائمة الخدمات (Services)', type: 'array', group: 'services',
      of: [defineArrayMember({ type: 'localizedString' })], validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'packages', title: 'الباقات (Packages)', type: 'array', group: 'services',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'title', title: 'اسم الباقة', type: 'localizedString', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'وصف الباقة', type: 'localizedText', validation: (Rule) => Rule.required() }),
      ] })],
    }),
    defineField({
      name: 'relatedCategories', title: 'تصنيفات الأعمال المرتبطة (Related Work Categories)', type: 'array', group: 'work',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'contentCategory' }] })],
    }),
    defineField({ name: 'contactTitle', title: 'عنوان دعوة التواصل', type: 'localizedString', group: 'content' }),
    defineField({ name: 'seo', title: 'إعدادات SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { titleAr: 'title.ar', titleEn: 'title.en', slug: 'slug.current', media: 'image' },
    prepare: ({ titleAr, titleEn, slug, media }) => ({ title: titleAr || titleEn || 'قطاع', subtitle: `/services/sectors/${slug || ''}`, media }),
  },
});
