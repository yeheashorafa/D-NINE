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
      description: 'Manually select and order the team members to display here.',
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Items',
      type: 'number',
      description: 'Maximum number of team members to show.',
      validation: (Rule) => Rule.min(1).max(50).integer(),
      initialValue: 8,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'localizedString',
      description: 'Optional label for a Call To Action button (e.g. "View Full Team").',
    }),
    defineField({
      name: 'ctaPath',
      title: 'CTA Internal Path',
      type: 'string',
      description: 'Optional internal path for the Call To Action button (e.g. "/about").',
    }),
  ],
});
