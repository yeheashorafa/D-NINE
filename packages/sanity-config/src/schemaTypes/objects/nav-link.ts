import { defineType, defineField } from 'sanity';

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL / Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternal',
      title: 'Is External Link',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      labelEn: 'label.en',
      labelAr: 'label.ar',
      href: 'href',
    },
    prepare({ labelEn, labelAr, href }) {
      return {
        title: labelEn || labelAr || 'Link',
        subtitle: href,
      };
    },
  },
});
