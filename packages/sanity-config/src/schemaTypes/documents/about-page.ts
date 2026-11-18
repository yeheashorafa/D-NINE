import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'صفحة من نحن (About Page)',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [
    { name: 'hero', title: 'مقدمة الصفحة (Hero Section)' },
    { name: 'content', title: 'قصة وهوية الوكالة والقيم (Agency Story, Values & Media)' },
    { name: 'sections', title: 'الأقسام الإضافية (Team, Testimonials & CTA)' },
    { name: 'seo', title: 'تحسين محركات البحث (SEO & Metadata)', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'localizedString',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localizedString',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localizedText',
      fieldset: 'hero',
    }),
    defineField({
      name: 'agencyStory',
      title: 'Agency Story',
      type: 'localizedPortableText',
      fieldset: 'content',
    }),
    defineField({ name: 'approvedIntroduction', title: 'النبذة المعتمدة', type: 'localizedText', fieldset: 'content' }),
    defineField({ name: 'approvedMission', title: 'الرسالة المعتمدة', type: 'localizedText', fieldset: 'content' }),
    defineField({ name: 'approvedVision', title: 'الرؤية المعتمدة', type: 'localizedText', fieldset: 'content' }),
    defineField({ name: 'whyIntroduction', title: 'مقدمة لماذا دي ناين؟', type: 'localizedText', fieldset: 'content' }),
    defineField({
      name: 'advantages', title: 'مزايا لماذا دي ناين؟', type: 'array', fieldset: 'content',
      description: 'يمكن الإضافة والحذف وإعادة الترتيب. التصميم الأنسب يعرض 6 بطاقات.',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'title', title: 'العنوان', type: 'localizedString', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'الوصف', type: 'localizedText', validation: (Rule) => Rule.required() }),
        defineField({ name: 'iconName', title: 'الأيقونة', type: 'string', options: { list: ['Layers3', 'Route', 'Sparkles', 'Puzzle', 'Handshake', 'Target'] } }),
      ] })],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'localizedPortableText',
      fieldset: 'content',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'localizedPortableText',
      fieldset: 'content',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueItem',
          fields: [
            defineField({ name: 'title', type: 'localizedString', title: 'Title' }),
            defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
            defineField({ name: 'iconName', type: 'string', title: 'Icon Name (Lucide)' }),
          ],
        }),
      ],
      fieldset: 'content',
    }),
    defineField({
      name: 'media',
      title: 'Visual Assets',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      fieldset: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
      fieldset: 'sections',
    }),
    defineField({
      name: 'team',
      title: 'Our Team Section',
      type: 'teamSection',
      fieldset: 'sections',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'testimonialsSection',
      fieldset: 'sections',
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
        title: 'About Page (من نحن)',
        subtitle: 'Singleton Content',
      };
    },
  },
});
