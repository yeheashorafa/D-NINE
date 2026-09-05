import { defineType, defineField } from 'sanity';
import { UserIcon } from '@sanity/icons';

export const author = defineType({
  name: 'author',
  title: 'Author / Contributor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Department / Role',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Author Biography',
      type: 'localizedText',
    }),
    defineField({
      name: 'image',
      title: 'Avatar / Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active Author',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      nameEn: 'name.en',
      nameAr: 'name.ar',
      roleEn: 'role.en',
      media: 'image',
    },
    prepare({ nameEn, nameAr, roleEn, media }) {
      return {
        title: `${nameEn || 'Author'} (${nameAr || ''})`,
        subtitle: roleEn,
        media,
      };
    },
  },
});
