import type { LocalizedText } from '@/types/localized';

export type SectorSlug = 'events-exhibitions-conferences' | 'media-production-marketing';
export type PortfolioGroup = 'events' | 'identity-design' | 'media-production' | 'content-marketing';

export interface SectorServiceGroup {
  title?: LocalizedText;
  items: LocalizedText[];
}

export interface SectorPackage {
  title: LocalizedText;
  description: LocalizedText;
}

export interface SectorContent {
  id: string;
  slug: SectorSlug;
  title: LocalizedText;
  introduction: LocalizedText;
  serviceGroups: SectorServiceGroup[];
  packages: SectorPackage[];
  relatedCategorySlugs: string[];
  image?: string;
  active: boolean;
  order: number;
}

export const PORTFOLIO_GROUPS: Array<{ slug: PortfolioGroup; title: LocalizedText; categorySlugs: string[] }> = [
  { slug: 'events', title: { ar: 'المعارض والملتقيات والمؤتمرات', en: 'Exhibitions, Forums & Conferences' }, categorySlugs: ['exhibitions', 'festivals'] },
  { slug: 'identity-design', title: { ar: 'الهوية والتصاميم', en: 'Brand Identity & Design' }, categorySlugs: ['brand-identity', 'print-design', 'social-media-design'] },
  { slug: 'media-production', title: { ar: 'الفيديو والإنتاج الإعلامي', en: 'Video & Media Production' }, categorySlugs: ['motion-graphics', 'video-editing', 'artificial-intelligence'] },
  { slug: 'content-marketing', title: { ar: 'المحتوى والتسويق', en: 'Content & Marketing' }, categorySlugs: ['social-media-design'] },
];

export const DEFAULT_SECTORS: SectorContent[] = [
  {
    id: 'sector-events',
    slug: 'events-exhibitions-conferences',
    title: { ar: 'تنظيم المؤتمرات والمعارض والملتقيات', en: 'Conferences, Exhibitions & Forums Management' },
    introduction: {
      ar: 'نخطط وننظم المعارض والمؤتمرات والملتقيات، من تطوير الفكرة والتصور إلى إدارة التنفيذ والتنسيق.',
      en: 'We plan and manage exhibitions, conferences, and forums—from concept development and creative direction through execution and on-site coordination.',
    },
    serviceGroups: [{
      items: [
        { ar: 'تنظيم الملتقيات والمؤتمرات', en: 'Forums and conferences management' },
        { ar: 'تنظيم المعارض والفعاليات', en: 'Exhibitions and events management' },
        { ar: 'إعداد التصورات والبرامج التنفيذية', en: 'Concept and execution programme development' },
        { ar: 'إدارة العمليات والتنسيق الميداني', en: 'Operations and on-site coordination' },
        { ar: 'تطوير تجارب الحضور', en: 'Attendee experience development' },
        { ar: 'إدارة الرعايات والشراكات ضمن نطاق المشروع', en: 'Sponsorship and partnership management within the project scope' },
      ],
    }],
    packages: [],
    relatedCategorySlugs: ['exhibitions', 'festivals'],
    image: '/media/work/project-5.jpg',
    active: true,
    order: 1,
  },
  {
    id: 'sector-media',
    slug: 'media-production-marketing',
    title: { ar: 'الإنتاج الإعلامي والتسويق', en: 'Media Production & Marketing' },
    introduction: {
      ar: 'نساعد العلامات التجارية والمنشآت على بناء حضورها الرقمي عبر الاستراتيجية والمحتوى والتصميم والإنتاج الإعلامي والتسويق الرقمي.',
      en: 'We help brands and organisations build a strong digital presence through strategy, content, design, media production, and digital marketing.',
    },
    serviceGroups: [
      { title: { ar: 'الاستراتيجية والمحتوى', en: 'Strategy & Content' }, items: [
        { ar: 'الخطط التسويقية', en: 'Marketing plans' }, { ar: 'صناعة الأفكار وكتابة المحتوى', en: 'Concept development and content writing' }, { ar: 'إدارة حسابات التواصل', en: 'Social media management' },
      ] },
      { title: { ar: 'التصميم والإبداع', en: 'Design & Creativity' }, items: [
        { ar: 'الهويات البصرية', en: 'Brand identities' }, { ar: 'التصميم الإبداعي', en: 'Creative design' }, { ar: 'الموشن جرافيك', en: 'Motion graphics' },
      ] },
      { title: { ar: 'الإنتاج الإعلامي', en: 'Media Production' }, items: [
        { ar: 'التصوير والتغطيات', en: 'Photography and coverage' }, { ar: 'المونتاج', en: 'Video editing' }, { ar: 'إنتاج الفيديوهات التعريفية', en: 'Corporate and profile video production' },
      ] },
      { title: { ar: 'التسويق الرقمي', en: 'Digital Marketing' }, items: [
        { ar: 'إدارة الحملات الإعلانية', en: 'Advertising campaign management' }, { ar: 'التسويق بالأداء', en: 'Performance marketing' }, { ar: 'التسويق عبر المؤثرين وفق احتياج المشروع', en: 'Influencer marketing tailored to project needs' },
      ] },
    ],
    packages: [
      { title: { ar: 'باقة حضور D9', en: 'D9 Presence Package' }, description: { ar: 'منظومة الحضور الرقمي التي تجمع بين الاستراتيجية والمحتوى والتصميم والفيديو وإدارة الحسابات والتحليل.', en: 'A complete digital presence system combining strategy, content, design, video, account management, and analytics.' } },
      { title: { ar: 'باقة نمو D9', en: 'D9 Growth Package' }, description: { ar: 'منظومة الحضور الرقمي والتسويق بالأداء وإدارة الحملات وتحليل النتائج وتحسين الأداء، إضافة إلى خدمات باقة حضور.', en: 'A growth system combining digital presence, performance marketing, campaign management, results analysis, and continuous optimisation, in addition to all D9 Presence services.' } },
    ],
    relatedCategorySlugs: ['motion-graphics', 'video-editing', 'social-media-design', 'print-design', 'brand-identity', 'artificial-intelligence'],
    image: '/media/services/integrated-marketing.jpg',
    active: true,
    order: 2,
  },
];

export const WHY_DNINE = [
  { iconName: 'Route', title: { ar: 'التخطيط قبل التنفيذ', en: 'Planning Before Execution' }, description: { ar: 'نفهم الاحتياج والأهداف أولًا، ثم نبني التصور والخطة قبل الانتقال إلى التنفيذ.', en: 'We first understand the needs and objectives, then build the concept and plan before execution.' } },
  { iconName: 'Layers3', title: { ar: 'الجمع بين التنظيم والإبداع', en: 'Organisation Meets Creativity' }, description: { ar: 'نوازن بين الانضباط التشغيلي والفكر الإبداعي لنقدم تجربة متكاملة.', en: 'We balance operational discipline with creative thinking to deliver an integrated experience.' } },
  { iconName: 'Puzzle', title: { ar: 'حلول متكاملة وفق احتياج المشروع', en: 'Solutions Tailored to Every Project' }, description: { ar: 'نصمم الحلول وفق طبيعة كل مشروع وأهدافه، بعيدًا عن القوالب الجاهزة.', en: 'We tailor solutions to each project and its goals rather than relying on one-size-fits-all templates.' } },
  { iconName: 'BadgeCheck', title: { ar: 'الاهتمام بجودة التنفيذ والتفاصيل', en: 'Quality Execution and Attention to Detail' }, description: { ar: 'نهتم بالتفاصيل التي تصنع تجربة متماسكة ونتيجة تليق بالعلامة.', en: 'We focus on the details that create a coherent experience and a result worthy of the brand.' } },
];

export const ABOUT_COPY = {
  introduction: { ar: 'من تنظيم الملتقيات والمؤتمرات إلى الإنتاج الإعلامي والتسويق الرقمي، تجمع دي ناين بين التخطيط والإبداع والتنفيذ لتحويل الأفكار إلى مشاريع متكاملة.', en: 'From forums and conferences to media production and digital marketing, D-NINE combines planning, creativity, and execution to transform ideas into integrated projects.' },
  vision: { ar: 'أن نكون شريكًا رائدًا في صناعة التجارب وبناء الحضور، وأن نُسهم في تطوير قطاع تنظيم الملتقيات والإنتاج الإعلامي والتسويق من خلال حلول إبداعية ومتكاملة تصنع قيمة وأثرًا مستدامًا.', en: 'To be a leading partner in creating experiences and building presence, advancing events, media production, and marketing through integrated creative solutions that deliver lasting value and impact.' },
  mission: { ar: 'تقديم حلول احترافية ومتكاملة في تنظيم الملتقيات والإنتاج الإعلامي والتسويق الرقمي، من خلال توظيف التخطيط والإبداع والخبرة في تحويل الأفكار إلى مشاريع ناجحة، وبناء شراكات فاعلة، وتحقيق قيمة حقيقية لعملائنا ومجتمعاتهم.', en: 'To deliver professional, integrated solutions in events, media production, and digital marketing—using planning, creativity, and expertise to turn ideas into successful projects, build effective partnerships, and create genuine value for our clients and their communities.' },
  whyIntroduction: { ar: 'لأننا نرى أن نجاح المشاريع يبدأ من الفكرة، ويتحقق بالتخطيط، ويكتمل بجودة التنفيذ. في دي ناين، نجمع بين التنظيم والإبداع لنقدم حلولًا متكاملة تتجاوز التنفيذ التقليدي، ونرافق عملاءنا من التصور الأولي إلى تحقيق النتائج.', en: 'We believe successful projects begin with an idea, take shape through planning, and are completed through quality execution. At D-NINE, we combine organisation and creativity to support our clients from the first concept through measurable results.' },
  advantages: [
    { iconName: 'Layers3', title: { ar: 'رؤية متكاملة', en: 'Integrated Vision' }, description: { ar: 'نجمع بين تنظيم الفعاليات والإنتاج الإعلامي والتسويق الرقمي لنقدم حلولًا مترابطة تخدم أهداف المشروع.', en: 'We connect events, media production, and digital marketing to deliver integrated solutions aligned with project goals.' } },
    { iconName: 'Route', title: { ar: 'التخطيط قبل التنفيذ', en: 'Planning Before Execution' }, description: { ar: 'نبدأ بفهم احتياج العميل وأهدافه، ثم نبني التصورات والخطط المناسبة قبل التنفيذ.', en: 'We start by understanding the client’s needs and goals, then build the right concept and plan before execution.' } },
    { iconName: 'Sparkles', title: { ar: 'الإبداع في التفاصيل', en: 'Creativity in Every Detail' }, description: { ar: 'نحوّل الأفكار إلى تجارب ومخرجات تعكس هوية المشروع وتحقق أهدافه.', en: 'We transform ideas into experiences and outputs that reflect the project identity and achieve its goals.' } },
    { iconName: 'Puzzle', title: { ar: 'حلول تناسب احتياجك', en: 'Solutions Built Around You' }, description: { ar: 'نصمم خدماتنا وفق طبيعة كل مشروع وأهدافه بعيدًا عن الحلول الجاهزة.', en: 'We tailor our services to every project rather than relying on generic solutions.' } },
    { iconName: 'Handshake', title: { ar: 'شريك من الفكرة إلى الإنجاز', en: 'Your Partner from Idea to Delivery' }, description: { ar: 'نعمل كشريك من تطوير الفكرة والتخطيط إلى التنفيذ والمتابعة، مع الاهتمام بجودة المخرجات.', en: 'We work as a partner from concept and planning through execution and follow-up, with close attention to quality.' } },
    { iconName: 'Target', title: { ar: 'التركيز على الأثر', en: 'Focused on Impact' }, description: { ar: 'نقيس النجاح بالقيمة التي يضيفها المشروع والنتائج التي يسهم في تحقيقها.', en: 'We measure success by the value a project creates and the results it helps achieve.' } },
  ],
};
