import { defineType, defineField } from 'sanity';
import { MEDIA_ASPECT_RATIOS } from '../../lib/constants';

export const projectMedia = defineType({
  name: 'projectMedia',
  title: 'Project Media Item',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video (Local / File / URL)', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAsset',
      title: 'Image Asset',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === 'video',
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Path or URL',
      type: 'string',
      description: 'Local path (e.g. /media/video/showreel.mp4) or authorized external URL',
      hidden: ({ parent }) => parent?.type === 'image',
    }),
    defineField({
      name: 'poster',
      title: 'Video Poster Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type === 'image',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: MEDIA_ASPECT_RATIOS,
      },
      initialValue: '16:9',
    }),
    defineField({
      name: 'alt',
      title: 'Media Alt Text (Fallback/Label)',
      type: 'localizedString',
    }),
    defineField({
      name: 'caption',
      title: 'Media Caption',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      alt: 'alt.en',
      altAr: 'alt.ar',
      media: 'imageAsset',
      poster: 'poster',
      aspectRatio: 'aspectRatio',
    },
    prepare({ type, alt, altAr, media, poster, aspectRatio }) {
      return {
        title: alt || altAr || (type === 'video' ? 'Video Media' : 'Image Media'),
        subtitle: `${type.toUpperCase()} • ${aspectRatio || '16:9'}`,
        media: media || poster,
      };
    },
  },
});
