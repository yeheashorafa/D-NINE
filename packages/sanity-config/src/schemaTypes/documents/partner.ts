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
      type: 'object',
      description: 'اسم الشريك أو العميل (العربية مطلوبة، والإنجليزية اختيارية مع اعتماد العربية كبديل)',
      fieldsets: [
        {
          name: 'languages',
          title: 'الترجمة (Translations)',
          options: { columns: 2 },
        },
      ],
      fields: [
        defineField({
          name: 'ar',
          title: 'العربية (Arabic)',
          type: 'string',
          fieldset: 'languages',
          validation: (Rule) => Rule.required().error('اسم الشريك بالعربية مطلوب'),
        }),
        defineField({
          name: 'en',
          title: 'English (اختياري / Fallback)',
          type: 'string',
          fieldset: 'languages',
          description: 'إذا تُرِك فارغاً، سيتم اعتماد الاسم العربي تلقائياً',
        }),
      ],
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
          description: 'نص بديل قديم مخفي (يُعتمد اسم الشريك تلقائياً للوصول)',
          hidden: true,
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'الموقع الإلكتروني (Legacy Website URL)',
      type: 'url',
      hidden: true,
      description: 'حقل قديم مخفي عن واجهة العميل',
    }),
    defineField({
      name: 'order',
      title: 'ترتيب العرض (Legacy Order)',
      type: 'number',
      initialValue: 0,
      hidden: true,
      description: 'حقل قديم مخفي عن واجهة العميل',
    }),
    defineField({
      name: 'active',
      title: 'حالة التفعيل (Active Status)',
      type: 'boolean',
      initialValue: true,
      hidden: true,
      description: 'يتم تفعيل أي شريك جديد تلقائياً عند النشر',
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
      const displayName = nameAr || nameEn || 'بدون اسم';
      const secondaryName = nameEn && nameAr && nameEn !== nameAr ? ` (${nameEn})` : '';
      return {
        title: `${displayName}${secondaryName}`,
        subtitle: `[ترتيب: ${order ?? 0}] ${active !== false ? '🟢 نشط' : '🔴 معطل'}`,
        media,
      };
    },
  },
});
