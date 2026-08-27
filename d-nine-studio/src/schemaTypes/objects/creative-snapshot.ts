import { defineType, defineField } from 'sanity';

export const creativeSnapshot = defineType({
  name: 'creativeSnapshot',
  title: 'Creative Snapshot',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'capabilities',
      title: 'Capability Indicators',
      type: 'localizedStringArray',
    }),
    defineField({
      name: 'showreelVideo',
      title: 'Showreel Video File',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cta',
      title: 'CTA Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'modalLabels',
      title: 'Modal Labels (e.g., Watch Showreel, Close)',
      type: 'object',
      fields: [
        defineField({ name: 'watch', title: 'Watch Text', type: 'localizedString' }),
        defineField({ name: 'close', title: 'Close Text', type: 'localizedString' }),
      ],
    }),
  ],
});
