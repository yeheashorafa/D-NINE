import { defineType, defineField } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'X (Twitter)', value: 'x' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Behance', value: 'behance' },
          { title: 'Snapchat', value: 'snapchat' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({ platform, url }) {
      return {
        title: platform ? platform.toUpperCase() : 'Social Link',
        subtitle: url,
      };
    },
  },
});
