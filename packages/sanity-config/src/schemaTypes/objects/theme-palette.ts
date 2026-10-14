import { defineType, defineField } from 'sanity';
import {
  DEFAULT_LIGHT_THEME_PALETTE,
  DEFAULT_DARK_THEME_PALETTE,
  type ResolvedThemePalette,
} from '@d-nine/contracts';
import { ColorInput } from '../../components/ColorInput';
import { ThemePaletteInput } from '../../components/ThemePreview';

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

function createColorValidation(fieldNameAr: string) {
  return (Rule: any) =>
    Rule.custom((value: unknown) => {
      if (!value) return true;
      if (typeof value !== 'string') return `قيمة ${fieldNameAr} يجب أن تكون نصاً`;
      if (!HEX_COLOR_REGEX.test(value.trim())) {
        return `صيغة لون ${fieldNameAr} غير صالحة. يُسمح فقط برمز HEX سداسي يبدأ بـ # (مثال: #6D2878)`;
      }
      return true;
    });
}

function buildPaletteFields(defaults: ResolvedThemePalette) {
  return [
    defineField({
      name: 'primary',
      title: 'اللون الأساسي (Primary Color)',
      description: 'اللون الرئيسي للهوية؛ يُستخدم في شريط الهيدر، والتأكيدات البصرية، وأزرار التفاعل الرئيسية.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.primary } as any,
      validation: createColorValidation('اللون الأساسي'),
    }),
    defineField({
      name: 'secondary',
      title: 'اللون الثانوي (Secondary Color)',
      description: 'اللون المساعد؛ يُستخدم في التدرجات والعناصر المرافقة والأزرار الثانوية.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.secondary } as any,
      validation: createColorValidation('اللون الثانوي'),
    }),
    defineField({
      name: 'accent',
      title: 'لون التمييز (Accent Color)',
      description: 'لون التوهج والإبراز (Glow Accents) والتفاصيل الدقيقة والحدود التفاعلية.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.accent } as any,
      validation: createColorValidation('لون التمييز'),
    }),
    defineField({
      name: 'pageBackground',
      title: 'خلفية الصفحة (Page Background)',
      description: 'الخلفية الكلية للصفحة؛ تمتد على كامل مساحة الموقع خلف جميع المحتويات.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.pageBackground } as any,
      validation: createColorValidation('خلفية الصفحة'),
    }),
    defineField({
      name: 'surfaceBackground',
      title: 'خلفية الأقسام والأسطح (Surface Background)',
      description: 'خلفية الأقسام المستقلة وشريط التنقل العلوي (Header) وخلفية الفوتر (Footer).',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.surfaceBackground } as any,
      validation: createColorValidation('خلفية الأقسام'),
    }),
    defineField({
      name: 'cardBackground',
      title: 'خلفية البطاقات (Card Background)',
      description: 'خلفية البطاقات لعرض المشاريع والخدمات والآراء والنماذج التفاعلية.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.cardBackground } as any,
      validation: createColorValidation('خلفية البطاقات'),
    }),
    defineField({
      name: 'headingColor',
      title: 'لون العناوين (Heading Color)',
      description: 'لون خط جميع العناوين الرئيسية والفرعية (H1 - H6) داخل الموقع.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.headingColor } as any,
      validation: createColorValidation('لون العناوين'),
    }),
    defineField({
      name: 'bodyTextColor',
      title: 'لون النص الأساسي (Body Text Color)',
      description: 'لون خط الفقرات والنصوص التحريرية الرئيسية لضمان قراءة مريحة.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.bodyTextColor } as any,
      validation: createColorValidation('لون النص الأساسي'),
    }),
    defineField({
      name: 'mutedTextColor',
      title: 'لون النص الثانوي (Muted Text Color)',
      description: 'لون النصوص الفرعية والبيانات الوصفية مثل التواريخ والتصنيفات وتفاصيل الخدمات.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.mutedTextColor } as any,
      validation: createColorValidation('لون النص الثانوي'),
    }),
    defineField({
      name: 'borderColor',
      title: 'لون الحدود (Border Color)',
      description: 'لون الفواصل والحدود المحيطة بالبطاقات وحقول النماذج وأشرطة التنقل.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.borderColor } as any,
      validation: createColorValidation('لون الحدود'),
    }),
    defineField({
      name: 'primaryButtonBackground',
      title: 'خلفية الزر الأساسي (Primary Button Background)',
      description: 'لون خلفية أزرار الحث على اتخاذ الإجراء (CTA) الرئيسية مثل "احجز مكالمة" أو "تواصل معنا".',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.primaryButtonBackground } as any,
      validation: createColorValidation('خلفية الزر الأساسي'),
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'نص الزر الأساسي (Primary Button Text)',
      description: 'لون النص المعروض داخل الزر الأساسي لضمان تباين بصري ممتاز وسهولة القراءة.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.primaryButtonText } as any,
      validation: createColorValidation('نص الزر الأساسي'),
    }),
    defineField({
      name: 'secondaryButtonBackground',
      title: 'خلفية الزر الثانوي (Secondary Button Background)',
      description: 'لون خلفية الأزرار المرافقة والروابط الإضافية والتنقل الفرعي.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.secondaryButtonBackground } as any,
      validation: createColorValidation('خلفية الزر الثانوي'),
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'نص الزر الثانوي (Secondary Button Text)',
      description: 'لون النص المعروض داخل الزر الثانوي.',
      type: 'string',
      components: { input: ColorInput },
      options: { defaultColor: defaults.secondaryButtonText } as any,
      validation: createColorValidation('نص الزر الثانوي'),
    }),
  ];
}

export const lightThemePalette = defineType({
  name: 'lightThemePalette',
  title: 'ألوان الوضع الفاتح (Light Mode)',
  type: 'object',
  components: {
    input: ThemePaletteInput,
  },
  fields: buildPaletteFields(DEFAULT_LIGHT_THEME_PALETTE),
});

export const darkThemePalette = defineType({
  name: 'darkThemePalette',
  title: 'ألوان الوضع الداكن (Dark Mode)',
  type: 'object',
  components: {
    input: ThemePaletteInput,
  },
  fields: buildPaletteFields(DEFAULT_DARK_THEME_PALETTE),
});
