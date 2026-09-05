import { defineType, defineField, defineArrayMember } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'arabic', title: 'Arabic Content' },
    { name: 'english', title: 'English Content' },
    { name: 'media', title: 'Media' },
    { name: 'social', title: 'Social Links' },
    { name: 'settings', title: 'Display Settings' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'bio',
      title: 'Biography',
      type: 'localizedPortableText',
      group: ['arabic', 'english'],
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
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
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLinkItem',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Website', value: 'website' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            }
          }
        })
      ],
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
      titleEn: 'name.en',
      titleAr: 'name.ar',
      roleEn: 'role.en',
      roleAr: 'role.ar',
      active: 'active',
      media: 'image',
    },
    prepare({ titleEn, titleAr, roleEn, roleAr, active, media }) {
      const name = titleAr || titleEn || 'Unnamed';
      const role = roleAr || roleEn || 'No Role';
      const status = active ? '🟢 Active' : '🔴 Inactive';
      return {
        title: name,
        subtitle: `${role} | ${status}`,
        media,
      };
    },
  },
});
