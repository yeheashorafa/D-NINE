import { defineType, defineField } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const partner = defineType({
  name: 'partner',
  title: 'الشركاء والعملاء (Partners & Clients)',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'اسم الشريك (Partner Name)',
      type: 'localizedString',
      description: 'اسم الشريك أو العميل باللغتين العربية والإنجليزية',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'شعار الشريك (Partner Logo)',
      type: 'image',
      description: 'شعار الشريك أو العميل بخلفية شفافة (PNG أو SVG أو WebP)',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'النص البديل للشعار (Logo Alt Text)',
          description: 'نص بديل وصفي للوصول ومحركات البحث (عربي وإنجليزي)',
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'الموقع الإلكتروني (Optional Website URL)',
      type: 'url',
      description: 'رابط موقع الشريك الاختياري (يبدأ بـ https://)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'order',
      title: 'ترتيب العرض (Display Order)',
      type: 'number',
      initialValue: 0,
      description: 'الرقم الترتيبي لظهور الشريك',
    }),
    defineField({
      name: 'active',
      title: 'حالة التفعيل والظهور (Active Status)',
      type: 'boolean',
      initialValue: true,
      description: 'تفعيل أو إخفاء الشريك دون حذفه',
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
      nameAr: 'name.ar',
      nameEn: 'name.en',
      media: 'logo',
      active: 'active',
      order: 'order',
    },
    prepare({ nameAr, nameEn, media, active, order }) {
      return {
        title: `${nameAr || 'بدون اسم'} (${nameEn || 'Untitled'})`,
        subtitle: `[ترتيب: ${order ?? 0}] ${active !== false ? '🟢 نشط' : '🔴 معطل'}`,
        media,
      };
    },
  },
});
