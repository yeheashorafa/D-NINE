import { defineType, defineField } from 'sanity';

export const serviceFaq = defineType({
  name: 'serviceFaq',
  title: 'Service FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      questionEn: 'question.en',
      questionAr: 'question.ar',
      answerEn: 'answer.en',
    },
    prepare({ questionEn, questionAr, answerEn }) {
      return {
        title: questionEn || questionAr || 'FAQ Item',
        subtitle: answerEn || questionAr,
      };
    },
  },
});
