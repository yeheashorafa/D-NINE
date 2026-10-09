import { defineType, defineField, defineArrayMember } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'general', title: 'Member Info (البيانات الأساسية)', default: true },
    { name: 'media', title: 'Photo & Media (الصورة)' },
    { name: 'social', title: 'Social Links (حسابات التواصل)' },
    { name: 'display', title: 'Display Settings (إعدادات الظهور)' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name (الاسم الكامل)',
      type: 'localizedString',
      description: 'Enter member name in Arabic and English.',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'role',
      title: 'Job Role / Title (المسمى الوظيفي)',
      type: 'localizedString',
      description: 'e.g. "Creative Director" / "المدير الإبداعي"',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'bio',
      title: 'Biography (نبذة مختصرة)',
      type: 'localizedPortableText',
      description: 'Brief career summary or introduction in Arabic and English.',
      group: 'general',
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo (الصورة الشخصية)',
      type: 'image',
      options: { hotspot: true },
      description: 'High-quality professional portrait or photo of the team member.',
      validation: (Rule) => Rule.required(),
      group: 'media',
      fields: [
        defineField({
          name: 'alt',
          type: 'localizedString',
          title: 'Photo Alt Text (النص البديل للصورة)',
          description: 'Descriptive alt text for accessibility (e.g., "صورة محمد علي")',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Profiles',
      type: 'array',
      description: 'Add social media accounts for this team member.',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLinkItem',
          title: 'Social Link',
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
              title: 'Profile URL',
              type: 'url',
              description: 'Full profile web link starting with https://',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Member',
      type: 'boolean',
      description: 'Highlight this member across featured listings.',
      initialValue: false,
      group: 'display',
    }),
    defineField({
      name: 'active',
      title: 'Active / Published Status',
      type: 'boolean',
      description: 'Toggle off to temporarily hide this team member from the site.',
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
      titleAr: 'name.ar',
      titleEn: 'name.en',
      roleAr: 'role.ar',
      roleEn: 'role.en',
      active: 'active',
      media: 'image',
    },
    prepare({ titleAr, titleEn, roleAr, roleEn, active, media }) {
      const name = titleAr && titleEn ? `${titleAr} (${titleEn})` : titleAr || titleEn || 'Unnamed Member';
      const role = roleAr && roleEn ? `${roleAr} — ${roleEn}` : roleAr || roleEn || 'No Role';
      const status = active !== false ? '🟢 Active' : '🔴 Hidden';
      return {
        title: name,
        subtitle: `${role} • ${status}`,
        media,
      };
    },
  },
});
