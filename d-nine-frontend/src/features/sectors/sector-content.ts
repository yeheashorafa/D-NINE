import type { LocalizedText } from '@/types/localized';

export type SectorSlug = 'events-exhibitions-conferences' | 'media-production-marketing';
export type PortfolioGroup = 'events' | 'identity-design' | 'media-production' | 'content-marketing';

export interface SectorServiceGroup {
  title?: LocalizedText;
  items: SectorServiceItem[];
}

export interface SectorServiceItem {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  iconName: string;
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
  { slug: 'events', title: { ar: 'المعارض والملتقيات والمؤتمرات', en: 'Exhibitions, Forums & Conferences' }, categorySlugs: ['events', 'exhibitions', 'festivals'] },
  { slug: 'identity-design', title: { ar: 'الهوية والتصاميم', en: 'Brand Identity & Design' }, categorySlugs: ['identity-design', 'brand-identity', 'print-design', 'graphic-design'] },
  { slug: 'media-production', title: { ar: 'الفيديو والإنتاج الإعلامي', en: 'Video & Media Production' }, categorySlugs: ['media-production', 'motion-graphics', 'video-editing', 'video-production', 'short-video-reels', 'artificial-intelligence'] },
  { slug: 'content-marketing', title: { ar: 'المحتوى والتسويق', en: 'Content & Marketing' }, categorySlugs: ['content-marketing', 'social-media-design', 'social-content', 'social-management', 'integrated-marketing'] },
];

export function projectMatchesPortfolioGroup(
  project: { primaryCategorySlug: string; categorySlugs?: string[] },
  groupSlug: PortfolioGroup,
): boolean {
  const group = PORTFOLIO_GROUPS.find((item) => item.slug === groupSlug);
  if (!group) return false;
  const slugs = [project.primaryCategorySlug, ...(project.categorySlugs || [])];
  return slugs.some((slug) => group.categorySlugs.includes(slug));
}

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
        { slug: 'forums-conferences', iconName: 'Presentation', title: { ar: 'تنظيم الملتقيات والمؤتمرات', en: 'Forums & Conferences' }, description: { ar: 'نحوّل أهداف اللقاء إلى برنامج منظم وتجربة متماسكة من التسجيل حتى الختام.', en: 'We turn event objectives into a coordinated programme and a cohesive attendee journey.' } },
        { slug: 'exhibitions-events', iconName: 'PanelsTopLeft', title: { ar: 'تنظيم المعارض والفعاليات', en: 'Exhibitions & Events' }, description: { ar: 'نخطط المساحات والتجارب وننسق الموردين لإخراج فعالية واضحة الهوية.', en: 'We plan spaces, experiences, and suppliers to deliver an event with a clear identity.' } },
        { slug: 'concepts-programmes', iconName: 'ClipboardList', title: { ar: 'إعداد التصورات والبرامج التنفيذية', en: 'Concepts & Execution Programmes' }, description: { ar: 'نطوّر التصور الإبداعي وخارطة التنفيذ والجداول والمسؤوليات قبل الانطلاق.', en: 'We develop the creative concept, delivery roadmap, schedules, and responsibilities.' } },
        { slug: 'field-operations', iconName: 'RadioTower', title: { ar: 'إدارة العمليات والتنسيق الميداني', en: 'Field Operations' }, description: { ar: 'ندير فرق التنفيذ والتوقيتات والتنسيق الميداني لضمان سير العمل بسلاسة.', en: 'We manage crews, timing, and on-site coordination for reliable delivery.' } },
        { slug: 'attendee-experience', iconName: 'UsersRound', title: { ar: 'تطوير تجارب الحضور', en: 'Attendee Experience' }, description: { ar: 'نصمم رحلة حضور مريحة وتفاعلية تعزز الانطباع وقيمة المشاركة.', en: 'We design an engaging attendee journey that strengthens participation and recall.' } },
        { slug: 'sponsorships-partnerships', iconName: 'Handshake', title: { ar: 'إدارة الرعايات والشراكات ضمن نطاق المشروع', en: 'Sponsorships & Partnerships' }, description: { ar: 'ننسق فرص الرعاية والشراكات بما يخدم أهداف المشروع ويحفظ وضوح الأدوار.', en: 'We coordinate sponsorship opportunities and partnerships around clear project goals.' } },
      ],
    }],
    packages: [],
    relatedCategorySlugs: ['events'],
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
        { slug: 'marketing-plans', iconName: 'ChartNoAxesCombined', title: { ar: 'الخطط التسويقية', en: 'Marketing Plans' }, description: { ar: 'خطط عملية تربط الأهداف بالجمهور والقنوات ومؤشرات القياس.', en: 'Actionable plans connecting goals, audiences, channels, and measurement.' } },
        { slug: 'ideas-content', iconName: 'Lightbulb', title: { ar: 'صناعة الأفكار وكتابة المحتوى', en: 'Ideas & Content Writing' }, description: { ar: 'أفكار ورسائل أصيلة تُصاغ بصوت العلامة وتناسب كل منصة.', en: 'Original ideas and messages shaped in the brand voice for every channel.' } },
        { slug: 'social-management', iconName: 'MessagesSquare', title: { ar: 'إدارة حسابات التواصل', en: 'Social Media Management' }, description: { ar: 'إدارة منظمة للنشر والتفاعل والمتابعة وتحسين الأداء.', en: 'Structured publishing, community engagement, monitoring, and optimisation.' } },
      ] },
      { title: { ar: 'التصميم والإبداع', en: 'Design & Creativity' }, items: [
        { slug: 'brand-identities', iconName: 'Fingerprint', title: { ar: 'الهويات البصرية', en: 'Brand Identities' }, description: { ar: 'أنظمة بصرية متكاملة تعبّر عن شخصية العلامة وتضمن اتساق حضورها.', en: 'Complete visual systems that express the brand and keep every touchpoint consistent.' } },
        { slug: 'creative-design', iconName: 'Palette', title: { ar: 'التصميم الإبداعي', en: 'Creative Design' }, description: { ar: 'تصاميم مبتكرة للحملات والمحتوى والمطبوعات تخدم الرسالة بوضوح.', en: 'Distinctive campaign, content, and print design built around a clear message.' } },
        { slug: 'motion-graphics', iconName: 'Clapperboard', title: { ar: 'الموشن جرافيك', en: 'Motion Graphics' }, description: { ar: 'حركة بصرية مدروسة تبسّط الأفكار وتزيد جاذبية المحتوى.', en: 'Purposeful motion that simplifies ideas and makes content more engaging.' } },
      ] },
      { title: { ar: 'الإنتاج الإعلامي', en: 'Media Production' }, items: [
        { slug: 'photography-coverage', iconName: 'Camera', title: { ar: 'التصوير والتغطيات', en: 'Photography & Coverage' }, description: { ar: 'تغطية احترافية توثّق اللحظات وتنتج مادة جاهزة للنشر.', en: 'Professional coverage that captures key moments and delivers publish-ready assets.' } },
        { slug: 'video-editing', iconName: 'Film', title: { ar: 'المونتاج', en: 'Video Editing' }, description: { ar: 'بناء إيقاع بصري وسرد واضح يرفع جودة المادة المصورة.', en: 'Clear visual storytelling and pacing that elevate every filmed asset.' } },
        { slug: 'profile-videos', iconName: 'CirclePlay', title: { ar: 'إنتاج الفيديوهات التعريفية', en: 'Profile Videos' }, description: { ar: 'فيديوهات تعريفية متكاملة من الفكرة والسيناريو حتى النسخة النهائية.', en: 'End-to-end profile videos, from concept and script to final delivery.' } },
      ] },
      { title: { ar: 'التسويق الرقمي', en: 'Digital Marketing' }, items: [
        { slug: 'campaign-management', iconName: 'Megaphone', title: { ar: 'إدارة الحملات الإعلانية', en: 'Campaign Management' }, description: { ar: 'إعداد وتشغيل ومتابعة الحملات عبر القنوات المناسبة للهدف.', en: 'Planning, launching, and monitoring campaigns across the right channels.' } },
        { slug: 'performance-marketing', iconName: 'Gauge', title: { ar: 'التسويق بالأداء', en: 'Performance Marketing' }, description: { ar: 'قرارات مبنية على البيانات لتحسين التكلفة والنتائج باستمرار.', en: 'Data-led optimisation focused on efficiency and measurable outcomes.' } },
        { slug: 'influencer-marketing', iconName: 'Users', title: { ar: 'التسويق عبر المؤثرين وفق احتياج المشروع', en: 'Influencer Marketing' }, description: { ar: 'اختيار وإدارة التعاونات المؤثرة وفق الجمهور والهدف ونطاق المشروع.', en: 'Relevant creator partnerships selected and managed around audience and goals.' } },
      ] },
    ],
    packages: [
      { title: { ar: 'باقة حضور D9', en: 'D9 Presence Package' }, description: { ar: 'منظومة الحضور الرقمي التي تجمع بين الاستراتيجية والمحتوى والتصميم والفيديو وإدارة الحسابات والتحليل.', en: 'A complete digital presence system combining strategy, content, design, video, account management, and analytics.' } },
      { title: { ar: 'باقة نمو D9', en: 'D9 Growth Package' }, description: { ar: 'منظومة الحضور الرقمي والتسويق بالأداء وإدارة الحملات وتحليل النتائج وتحسين الأداء، إضافة إلى خدمات باقة حضور.', en: 'A growth system combining digital presence, performance marketing, campaign management, results analysis, and continuous optimisation, in addition to all D9 Presence services.' } },
    ],
    relatedCategorySlugs: ['identity-design', 'media-production', 'content-marketing'],
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
