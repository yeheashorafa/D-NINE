import { defineField, defineType } from 'sanity';

export const sectorServiceItem = defineType({
  name: 'sectorServiceItem',
  title: 'خدمة فرعية (Sub-service)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم الخدمة',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'المعرّف في الرابط',
      description: 'أحرف إنجليزية صغيرة وشرطات فقط، مثال: attendee-experience',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'slug' }),
    }),
    defineField({
      name: 'description',
      title: 'وصف مختصر',
      description: 'سطران يشرحان قيمة الخدمة في البطاقة.',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'اسم الأيقونة',
      description: 'اسم أيقونة Lucide المعتمدة. اترك القيمة الحالية إن لم تكن متأكدًا.',
      type: 'string',
      initialValue: 'Sparkles',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title.ar', subtitle: 'title.en' },
  },
});
