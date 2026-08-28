import { defineType, defineField, defineArrayMember } from 'sanity';

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'localizedString',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
    }),
    defineField({
      name: 'selectedTestimonials',
      title: 'Selected Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'testimonial' }],
        }),
      ],
      description: 'Manually select and order the testimonials to display here.',
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Items',
      type: 'number',
      description: 'Maximum number of testimonials to show. Used as a fallback if no selected items are specified, or to limit the selected items.',
      validation: (Rule) => Rule.min(1).max(20).integer(),
      initialValue: 6,
    }),
  ],
});
