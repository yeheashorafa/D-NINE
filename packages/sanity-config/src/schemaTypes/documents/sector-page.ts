import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const sectorPage = defineType({
  name: 'sectorPage',
  title: 'القطاعات الرئيسية (Main Sectors)',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'المحتوى', default: true },
    { name: 'services', title: 'الخدمات والباقات' },
    { name: 'work', title: 'الأعمال المرتبطة' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'اسم القطاع', type: 'localizedString', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'الرابط', type: 'slug', group: 'content', options: { source: 'title.en' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'introduction', title: 'مقدمة القطاع', type: 'localizedText', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'صورة القطاع', type: 'image', group: 'content', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'النص البديل', type: 'localizedString' })] }),
    defineField({
      name: 'serviceGroups', title: 'مجموعات الخدمات', type: 'array', group: 'services',
      description: 'يمكن الإضافة والحذف وإعادة الترتيب. يمكن ترك عنوان المجموعة فارغًا في القطاع الأول.',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'title', title: 'عنوان المجموعة', type: 'localizedString' }),
        defineField({ name: 'items', title: 'الخدمات', type: 'array', of: [defineArrayMember({ type: 'localizedString' })], validation: (Rule) => Rule.min(1) }),
      ] })],
    }),
    defineField({
      name: 'packages', title: 'الباقات', type: 'array', group: 'services',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'title', title: 'اسم الباقة', type: 'localizedString', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'وصف الباقة', type: 'localizedText', validation: (Rule) => Rule.required() }),
      ] })],
    }),
    defineField({ name: 'relatedCategories', title: 'تصنيفات الأعمال المرتبطة', type: 'array', group: 'work', of: [defineArrayMember({ type: 'reference', to: [{ type: 'contentCategory' }] })] }),
    defineField({ name: 'active', title: 'ظاهر في الموقع', type: 'boolean', initialValue: true, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'الترتيب', type: 'number', initialValue: 0, validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: 'seo', title: 'إعدادات SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'الترتيب', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { titleAr: 'title.ar', titleEn: 'title.en', media: 'image', active: 'active' }, prepare: ({ titleAr, titleEn, media, active }) => ({ title: titleAr || titleEn, subtitle: active === false ? 'معطل' : 'نشط', media }) },
});
