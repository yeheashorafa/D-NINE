import { ContentCategory } from '@/types/category';

export const CONTENT_CATEGORIES: ContentCategory[] = [
  {
    id: 'cat-graphic-design',
    slug: 'graphic-design',
    order: 1,
    active: true,
    title: {
      ar: 'تصميم الجرافيك والابتكار البصري',
      en: 'Graphic Design & Visual Innovation',
    },
    description: {
      ar: 'تصاميم إبداعية متميزة تعزز حضور العلامة التجارية وتخلق انطباعاً بصرياً قادراً على ترك أثر لا يُنسى.',
      en: 'Premium visual designs crafted to strengthen brand presence and capture lasting audience attention.',
    },
  },
  {
    id: 'cat-brand-identity',
    slug: 'brand-identity',
    order: 2,
    active: true,
    title: {
      ar: 'تصميم الهوية البصرية والمستندات الرقمية',
      en: 'Brand Identity & Visual Design',
    },
    description: {
      ar: 'بناء هويات بصرية متكاملة وشاملة تعكس قيم وأهداف العلامة التجارية بكل دقة واحترافية.',
      en: 'End-to-end brand identity systems designed to communicate purpose, value, and distinctiveness.',
    },
  },
  {
    id: 'cat-short-video-reels',
    slug: 'short-video-reels',
    order: 3,
    active: true,
    title: {
      ar: 'صناعة الفيديوهات القصيرة (Reels & Shorts)',
      en: 'Short-Form Video & Reels Production',
    },
    description: {
      ar: 'محتوى مرئي ديناميكي عالي الجاذبية مصمم خصيصاً للمنصات الحديثة لتحقيق أعلى نسب التفاعل.',
      en: 'High-impact vertical video content engineered for modern social platforms and fast engagement.',
    },
  },
  {
    id: 'cat-video-production',
    slug: 'video-production',
    order: 4,
    active: true,
    title: {
      ar: 'الإنتاج الإعلامي والسينمائي',
      en: 'Cinematic & Media Production',
    },
    description: {
      ar: 'إنتاج إعلامي وسينمائي احترافي يشمل الأفلام الإعلانية والوثائقية من الفكرة إلى الشاشة.',
      en: 'Full-scope video production ranging from commercial films to documentary showcases.',
    },
  },
  {
    id: 'cat-social-content',
    slug: 'social-content',
    order: 5,
    active: true,
    title: {
      ar: 'صناعة المحتوى البصري لمنصات التواصل',
      en: 'Social Media Visual Content',
    },
    description: {
      ar: 'تصميم وصناعة محتوى بصري مبتكر ومتجدد يتناسب مع كافة شبكات التواصل الاجتماعي.',
      en: 'Tailored visual content assets built to captivate audiences across social channels.',
    },
  },
  {
    id: 'cat-social-management',
    slug: 'social-management',
    order: 6,
    active: true,
    title: {
      ar: 'إدارة وتوجيه حسابات التواصل الاجتماعي',
      en: 'Social Media Management & Strategy',
    },
    description: {
      ar: 'إدارة استراتيجية وتنفيذية شاملة للحسابات تضمن استمرارية النمو والتفاعل الإيجابي.',
      en: 'Strategic social media management ensuring audience growth, consistent branding, and engagement.',
    },
  },
  {
    id: 'cat-integrated-marketing',
    slug: 'integrated-marketing',
    order: 7,
    active: true,
    title: {
      ar: 'الحملات التسويقية الإبداعية المتكاملة',
      en: 'Integrated Creative Campaigns',
    },
    description: {
      ar: 'حملات تسويقية متكاملة تجمع بين الفكرة الإبداعية والتنفيذ الاحترافي عبر كافة القنوات.',
      en: 'Cohesive, multi-channel creative marketing campaigns aligned with commercial goals.',
    },
  },
];
