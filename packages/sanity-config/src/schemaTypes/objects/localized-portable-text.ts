import { defineType, defineField, defineArrayMember } from 'sanity';

const portableTextMembers = [
  defineArrayMember({
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2 (Section Heading)', value: 'h2' },
      { title: 'H3 (Subsection Heading)', value: 'h3' },
      { title: 'H4 (Sub-heading)', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
        { title: 'Underline', value: 'underline' },
        { title: 'Code', value: 'code' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            {
              name: 'href',
              type: 'url',
              title: 'URL',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                  allowRelative: true,
                }),
            },
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative Text',
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Caption',
      },
    ],
  }),
];

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized Rich Text (AR / EN)',
  type: 'object',
  fieldsets: [
    {
      name: 'languages',
      title: 'Translations',
    },
  ],
  fields: [
    defineField({
      name: 'ar',
      title: 'العربية (Arabic Content)',
      type: 'array',
      of: portableTextMembers,
      fieldset: 'languages',
      validation: (Rule) => Rule.required().error('Arabic body is required (المحتوى العربي مطلوب)'),
    }),
    defineField({
      name: 'en',
      title: 'English Content',
      type: 'array',
      of: portableTextMembers,
      fieldset: 'languages',
      validation: (Rule) => Rule.required().error('English body is required'),
    }),
  ],
});
