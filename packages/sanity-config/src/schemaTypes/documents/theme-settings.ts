import { defineType, defineField } from 'sanity';
import { DropIcon } from '@sanity/icons';

export const themeSettings = defineType({
  name: 'themeSettings',
  title: 'ألوان وهوية الموقع',
  type: 'document',
  icon: DropIcon,
  fields: [
    defineField({
      name: 'lightMode',
      title: 'ألوان الوضع الفاتح',
      description: 'التحكم في الألوان العامة للموقع في الوضع الفاتح (Light Mode). الحقول الفارغة تستخدم ألوان الموقع الحالية كقيم افتراضية.',
      type: 'lightThemePalette',
    }),
    defineField({
      name: 'darkMode',
      title: 'ألوان الوضع الداكن',
      description: 'التحكم في الألوان العامة للموقع في الوضع الداكن (Dark Mode). الحقول الفارغة تستخدم ألوان الموقع الحالية كقيم افتراضية.',
      type: 'darkThemePalette',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'ألوان وهوية الموقع (Global Theme Controls)',
        subtitle: 'إعدادات ألوان الوضعين الفاتح والداكن للموقع',
      };
    },
  },
});
