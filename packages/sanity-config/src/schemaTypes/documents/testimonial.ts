import { defineType, defineField } from 'sanity';
import { StarIcon } from '@sanity/icons';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  groups: [
    { name: 'general', title: 'Client Feedback (بيانات العميل والرأي)', default: true },
    { name: 'media', title: 'Photo & Media (الصورة)' },
    { name: 'relations', title: 'Relationships (المشاريع والخدمات المرتبطة)' },
    { name: 'display', title: 'Display Settings (إعدادات الظهور)' },
  ],
  fields: [
    defineField({
      name: 'personName',
      title: 'Client / Person Name (اسم العميل)',
      type: 'localizedString',
      description: 'Name of the reviewer/client in Arabic and English.',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'role',
      title: 'Role / Position (المسمى الوظيفي)',
      type: 'localizedString',
      description: 'e.g. "CEO" / "الرئيس التنفيذي"',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization (الشركة أو المؤسسة)',
      type: 'localizedString',
      description: 'Company or brand name in Arabic and English.',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote (نص التقييم / الرأي)',
      type: 'localizedText',
      description: 'Client review/quote text in Arabic and English.',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'image',
      title: 'Client Photo / Avatar (صورة العميل)',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo of the client or company avatar.',
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'Photo Alt Text (النص البديل للصورة)',
          description: 'Descriptive alt text for accessibility (e.g., "صورة أحمد محمود")',
        }),
      ],
      group: 'media',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (التقييم 1-5 نجوم)',
      type: 'number',
      description: 'Star rating from 1 to 5 (leave blank or select 5).',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
      group: 'display',
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Optional link to a primary service for contextual service page testimonials.',
      group: 'relations',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Optional link to a portfolio project.',
      group: 'relations',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Highlight this review in featured homepage views.',
      initialValue: false,
      group: 'display',
    }),
    defineField({
      name: 'active',
      title: 'Active / Published Status',
      type: 'boolean',
      description: 'Toggle off to temporarily hide this testimonial from the site.',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'order',
      title: 'Default Listing Order',
      type: 'number',
      description: 'Fallback numerical sorting order (lower numbers appear first).',
      initialValue: 0,
      group: 'display',
    }),
  ],
  preview: {
    select: {
      titleAr: 'personName.ar',
      titleEn: 'personName.en',
      companyAr: 'company.ar',
      companyEn: 'company.en',
      active: 'active',
      media: 'image',
    },
    prepare({ titleAr, titleEn, companyAr, companyEn, active, media }) {
      const name = titleAr && titleEn ? `${titleAr} (${titleEn})` : titleAr || titleEn || 'Unnamed Client';
      const company = companyAr && companyEn ? `${companyAr} — ${companyEn}` : companyAr || companyEn || 'No Company';
      const status = active !== false ? '🟢 Active' : '🔴 Hidden';
      return {
        title: name,
        subtitle: `${company} • ${status}`,
        media,
      };
    },
  },
});
