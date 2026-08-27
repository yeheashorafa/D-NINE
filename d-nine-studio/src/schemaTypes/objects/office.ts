import { defineType, defineField } from 'sanity';

export const office = defineType({
  name: 'office',
  title: 'Office Location',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Office Title (e.g. Riyadh HQ)',
      type: 'localizedString',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'localizedString',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Google Maps Link or Coordinates',
      type: 'string',
    }),
  ],
});
