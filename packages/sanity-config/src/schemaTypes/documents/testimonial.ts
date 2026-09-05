import { defineType, defineField } from 'sanity';
import { StarIcon } from '@sanity/icons';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  groups: [
    { name: 'arabic', title: 'Arabic Content' },
    { name: 'english', title: 'English Content' },
    { name: 'media', title: 'Media' },
    { name: 'relations', title: 'Relationships' },
    { name: 'settings', title: 'Display Settings' },
  ],
  fields: [
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
      group: ['arabic', 'english'],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
      group: ['arabic', 'english'],
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
      group: ['arabic', 'english'],
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
      group: ['arabic', 'english'],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative Text',
        })
      ],
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      group: 'settings',
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      group: 'relations',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'relations',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      titleEn: 'personName.en',
      titleAr: 'personName.ar',
      companyEn: 'company.en',
      companyAr: 'company.ar',
      active: 'active',
      media: 'image',
    },
    prepare({ titleEn, titleAr, companyEn, companyAr, active, media }) {
      const name = titleAr || titleEn || 'Unnamed';
      const company = companyAr || companyEn || 'No Company';
      const status = active ? '🟢 Active' : '🔴 Inactive';
      return {
        title: name,
        subtitle: `${company} | ${status}`,
        media,
      };
    },
  },
});
