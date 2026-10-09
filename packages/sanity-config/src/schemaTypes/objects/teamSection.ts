import { defineType, defineField, defineArrayMember } from 'sanity';

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team Section',
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
      name: 'selectedTeamMembers',
      title: 'Selected Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'teamMember' }],
        }),
      ],
      description: 'Manually select team members to display. The drag-and-drop order here defines the exact order shown on the website carousel.',
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Items',
      type: 'number',
      description: 'Maximum number of team members to display in the carousel (defaults to 8).',
      validation: (Rule) => Rule.min(1).max(50).integer(),
      initialValue: 8,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'localizedString',
      description: 'Button text for the team section CTA (e.g., "Meet the Team" / "تعرف على الفريق").',
    }),
    defineField({
      name: 'ctaPath',
      title: 'CTA Link Path',
      type: 'string',
      description: 'Internal destination URL path for the CTA button (e.g., "/about").',
    }),
  ],
});
