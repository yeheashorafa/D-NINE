import { defineType, defineField } from 'sanity';

export const contactMethod = defineType({
  name: 'contactMethod',
  title: 'Contact Method',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Method Type',
      type: 'string',
      options: {
        list: [
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title (e.g. For General Inquiries)',
      type: 'localizedString',
    }),
    defineField({
      name: 'value',
      title: 'Value (e.g. info@d-nine.com)',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link (e.g. mailto:...)',
      type: 'string',
    }),
  ],
});
