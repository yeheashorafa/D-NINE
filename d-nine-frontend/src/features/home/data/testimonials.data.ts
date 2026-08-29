import type { TestimonialItem } from '../../../types/testimonial';

export const STATIC_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    personName: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' },
    role: { ar: 'المدير التنفيذي', en: 'CEO' },
    company: { ar: 'شركة الابتكار', en: 'Innovation Co.' },
    quote: {
      ar: 'دي ناين قدمت لنا خدمة استثنائية فاقت توقعاتنا في كل شيء.',
      en: 'D-NINE provided us with exceptional service that exceeded our expectations in every way.',
    },
    rating: 5,
    featured: true,
  },
  {
    id: 't2',
    personName: { ar: 'سارة خالد', en: 'Sarah Khaled' },
    role: { ar: 'مدير التسويق', en: 'Marketing Director' },
    company: { ar: 'الرؤية الرقمية', en: 'Digital Vision' },
    quote: {
      ar: 'فريق محترف ومبدع، ساعدونا في إعادة بناء هويتنا البصرية بنجاح.',
      en: 'A professional and creative team, they helped us successfully rebuild our visual identity.',
    },
    rating: 5,
    featured: true,
  },
    {
    id: 't3',
    personName: { ar: 'ماجد العتيبي', en: 'Majed Al-Otaibi' },
    role: { ar: 'مؤسس', en: 'Founder' },
    company: { ar: 'مذاق الأصالة', en: 'Mathaq Al-Asalah' },
    quote: {
      ar: 'العمل مع دي ناين كان نقلة نوعية لهويتنا البصرية بالكامل.',
      en: 'Working with D-NINE was a complete transformation for our visual identity.',
    },
    rating: 5,
    featured: true,
  },
  {
    id: 't4',
    personName: { ar: 'دانة الحربي', en: 'Dana Al-Harbi' },
    role: { ar: 'مديرة العلامة التجارية', en: 'Brand Manager' },
    company: { ar: 'أفق للاستشارات', en: 'Ufuq Consulting' },
    quote: {
      ar: 'دقة في المواعيد واحترافية عالية من أول اجتماع حتى التسليم النهائي.',
      en: 'Punctuality and high professionalism from the first meeting to final delivery.',
    },
    rating: 5,
    featured: false,
  },
  {
    id: 't5',
    personName: { ar: 'فيصل الدوسري', en: 'Faisal Al-Dosari' },
    role: { ar: 'الرئيس التنفيذي', en: 'CEO' },
    company: { ar: 'نبض العقارية', en: 'Nabd Real Estate' },
    quote: {
      ar: 'فريق دي ناين فهم رؤيتنا بسرعة وترجمها إلى تصاميم تعكس قيمنا.',
      en: 'The D-NINE team quickly understood our vision and translated it into designs that reflect our values.',
    },
    rating: 5,
    featured: true,
  },
  {
    id: 't6',
    personName: { ar: 'ريناد القحطاني', en: 'Renad Al-Qahtani' },
    role: { ar: 'مديرة التسويق', en: 'Marketing Manager' },
    company: { ar: 'ورد للتجميل', en: 'Ward Cosmetics' },
    quote: {
      ar: 'إبداع لا محدود وتواصل ممتاز طوال فترة المشروع.',
      en: 'Unlimited creativity and excellent communication throughout the project.',
    },
    rating: 4,
    featured: false,
  },
  {
    id: 't7',
    personName: { ar: 'طارق النعيمي', en: 'Tariq Al-Naimi' },
    role: { ar: 'شريك مؤسس', en: 'Co-Founder' },
    company: { ar: 'مسار التقنية', en: 'Masar Tech' },
    quote: {
      ar: 'ساعدونا في بناء هوية رقمية قوية ساهمت في نمو أعمالنا بشكل ملحوظ.',
      en: 'They helped us build a strong digital identity that noticeably contributed to our business growth.',
    },
    rating: 5,
    featured: true,
  },
  {
    id: 't8',
    personName: { ar: 'منى العنزي', en: 'Mona Al-Anzi' },
    role: { ar: 'مديرة العمليات', en: 'Operations Director' },
    company: { ar: 'زهرة الشرق للفعاليات', en: 'Zahrat Al-Sharq Events' },
    quote: {
      ar: 'تعامل راقٍ وتصاميم عالية الجودة سلمت في الوقت المتفق عليه.',
      en: 'Refined service and high-quality designs delivered on the agreed schedule.',
    },
    rating: 5,
    featured: false,
  }
];
