import { ContentCategory } from '@/types/category';

export const CANONICAL_CATEGORIES: ContentCategory[] = [
  {
    id: 'cat-motion-graphics',
    slug: 'motion-graphics',
    order: 1,
    active: true,
    title: {
      ar: 'الموشن جرافيك',
      en: 'Motion Graphics',
    },
    description: {
      ar: 'رسوم متحركة إبداعية ومؤثرات بصرية تنبض بالحياة وتبسط المفاهيم المعقدة بجاذبية فائقة.',
      en: 'Dynamic motion graphics and 2D/3D visual animations crafted to tell stories and engage audiences.',
    },
  },
  {
    id: 'cat-video-editing',
    slug: 'video-editing',
    order: 2,
    active: true,
    title: {
      ar: 'المونتاج وتحرير الفيديو',
      en: 'Video Editing',
    },
    description: {
      ar: 'مونتاج سينمائي وإيقاع بصري متقن وتلوين احترافي يمنح فيديوهاتك طابعاً استثنائياً.',
      en: 'High-end video editing, pacing, color grading, and sound design tailored for impactful narratives.',
    },
  },
  {
    id: 'cat-social-media-design',
    slug: 'social-media-design',
    order: 3,
    active: true,
    title: {
      ar: 'تصاميم السوشيال ميديا',
      en: 'Social Media Design',
    },
    description: {
      ar: 'تصاميم سوشيال ميديا مبتكرة تعزز تفاعل الجمهور وتبرز حضور علامتك الرقمية.',
      en: 'High-converting, visually striking social media assets designed for modern digital feeds.',
    },
  },
  {
    id: 'cat-print-design',
    slug: 'print-design',
    order: 4,
    active: true,
    title: {
      ar: 'التصاميم والمطبوعات',
      en: 'Print Design',
    },
    description: {
      ar: 'تصاميم مطبوعات فاخرة ومنشورات وكتيبات دعائية تضمن أعلى معايير الجودة والتميز الملموس.',
      en: 'Premium editorial, packaging, publication, and tangible collateral built for flawless print execution.',
    },
  },
  {
    id: 'cat-brand-identity',
    slug: 'brand-identity',
    order: 5,
    active: true,
    title: {
      ar: 'تصميم الشعارات والهويات البصرية',
      en: 'Logos & Brand Identities',
    },
    description: {
      ar: 'بناء أنظمة هوية متكاملة وشعارات استراتيجية تعبر عن روح العلامة التجارية وتدوم في الذاكرة.',
      en: 'Comprehensive brand identity systems, logo systems, and visual guidelines that stand the test of time.',
    },
  },
  {
    id: 'cat-artificial-intelligence',
    slug: 'artificial-intelligence',
    order: 6,
    active: true,
    title: {
      ar: 'الذكاء الاصطناعي والإنتاج الرقمي',
      en: 'Artificial Intelligence',
    },
    description: {
      ar: 'تسخير أدوات وتقنيات الذكاء الاصطناعي التوليدي لابتكار أعمال بصرية رائدة وغير مسبوقة.',
      en: 'Cutting-edge generative AI workflows and visual synthesis pushing the boundaries of creative innovation.',
    },
  },
  {
    id: 'cat-exhibitions',
    slug: 'exhibitions',
    order: 7,
    active: true,
    title: {
      ar: 'المعارض وتجهيز المساحات',
      en: 'Exhibitions',
    },
    description: {
      ar: 'تصميم أجنحة المعارض وتجهيز المساحات التفاعلية لتقديم تجارب حضور غامرة ومميزة.',
      en: 'Immersive exhibition booths, spatial branding, and interactive environmental design.',
    },
  },
  {
    id: 'cat-festivals',
    slug: 'festivals',
    order: 8,
    active: true,
    title: {
      ar: 'المهرجانات والفعاليات',
      en: 'Festivals',
    },
    description: {
      ar: 'هويات بصرية وتغطيات شاملة للمهرجانات والفعاليات الكبرى تصنع زخماً جماهيرياً لا يُنسى.',
      en: 'Complete visual identity and experiential branding for grand-scale festivals and cultural celebrations.',
    },
  },
];

export const CONTENT_CATEGORIES: ContentCategory[] = CANONICAL_CATEGORIES;
