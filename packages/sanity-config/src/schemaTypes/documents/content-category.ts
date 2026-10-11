import { defineType, defineField } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const contentCategory = defineType({
  name: 'contentCategory',
  title: 'التصنيف والتخصص الإبداعي (Category & Specialty)',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'اسم التصنيف (Category Name)',
      description: 'الاسم المعروض في فلاتر صفحة الأعمال والصفحة الرئيسية (عربي وإنجليزي)',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'المعرف البرمجي الثابت (Protected Slug)',
      description: 'معرف نظامي محمي غير قابل للتعديل للحفاظ على استقرار الفلاتر والمشاريع',
      type: 'slug',
      readOnly: true,
      validation: (Rule) => Rule.required().error('Canonical slug is required and protected'),
    }),
    defineField({
      name: 'description',
      title: 'الوصف التعريفي (Homepage Specialty Description)',
      description: 'الوصف المعروض في بطاقة التخصص في الصفحة الرئيسية (عربي وإنجليزي)',
      type: 'localizedText',
    }),
    defineField({
      name: 'icon',
      title: 'الأيقونة أو الصورة التوضيحية (Icon / Image)',
      description: 'أيقونة أو صورة رمزية للتخصص لعرضها في بطاقات الصفحة الرئيسية',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'النص البديل (Alt Text)',
        }),
      ],
    }),
    defineField({
      name: 'targetLink',
      title: 'رابط التوجيه المخصص (Optional Link)',
      description: 'رابط اختياري عند النقر على بطاقة التخصص (افتراضياً يوجه إلى /work)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'ترتيب الظهور (Display Order)',
      description: 'الرقم الترتيبي للتخصص والفئة (الرقم الأصغر يظهر أولاً)',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'active',
      title: 'حالة التفعيل والظهور (Active Status)',
      description: 'تحديد ما إذا كان التصنيف يظهر في فلاتر الأعمال والصفحة الرئيسية',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'الترتيب (Display Order)',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      titleAr: 'title.ar',
      titleEn: 'title.en',
      slug: 'slug.current',
      order: 'order',
      active: 'active',
      media: 'icon',
    },
    prepare({ titleAr, titleEn, slug, order, active, media }) {
      return {
        title: `${titleAr || 'بدون عنوان'} (${titleEn || 'Untitled'})`,
        subtitle: `[ترتيب: ${order ?? 0}] #${slug || ''} ${active !== false ? '🟢 نشط' : '🔴 معطل'}`,
        media,
      };
    },
  },
});
