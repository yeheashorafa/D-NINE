export const PRIMARY_SERVICES = [
  {
    id: 'srv-graphic-design',
    slug: 'graphic-design',
    categorySlug: 'graphic-design',
    iconName: 'Palette',
    image: '/media/services/graphic-design.jpg',
    featured: true,
    title: {
      ar: 'تصميم الجرافيك والابتكار البصري',
      en: 'Graphic Design & Visual Innovation',
    },
    shortDescription: {
      ar: 'ابتكار تصاميم جرافيك استثنائية تعزز الهوية البصرية وتجذب انتباه الجمهور المستهدف.',
      en: 'Crafting exceptional graphic design assets that amplify visual presence and engage audiences.',
    },
    fullDescription: {
      ar: 'نقدم خدمات تصميم الجرافيك المتكاملة للعلامات التجارية التي تسعى للتميز والابتكار في الشرق الأوسط. تشمل خدماتنا الإعلانات المطبوعة والأنشطة الرقمية، وتصميم الكتيبات والملصقات، وتطوير التصاميم التسويقية.',
      en: 'We provide full-spectrum graphic design services for ambitious brands in the Middle East. Our work covers digital key visuals, marketing collateral, publications, and campaign assets.',
    },
    benefits: {
      ar: ['تعزيز الحضور البصري للعلامة', 'تصاميم مبتكرة وفريدة', 'متوافقة مع كافة المطبوعات والمنصات'],
      en: ['Enhanced brand visual impact', 'Distinctive creative concepts', 'Cross-platform print and digital ready'],
    },
    deliverables: {
      ar: [
        { title: 'الملفات المصدرية المتكاملة', description: 'توفير كافة التصاميم بصيغ AI, PSD, PDF high-res.' },
        { title: 'دليل القياسات والمطبوعات', description: 'تحديد الألوان الدقيقة للأوفست والأجهزة الرقمية.' },
      ],
      en: [
        { title: 'Master Source Files', description: 'Full deliverables in AI, PSD, and print-ready PDF formats.' },
        { title: 'Color & Print Guidelines', description: 'Exact CMYK and RGB color specs for consistent reproduction.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'دراسة المتطلبات', description: 'تحليل أهداف المشروع وشخصية العلامة التجارية.' },
        { stepNumber: '02', title: 'التطوير الإبداعي', description: 'تقديم عدة مفاهيم بصرية مبتكرة للاختيار من بينها.' },
        { stepNumber: '03', title: 'التسليم المعتمد', description: 'تجهيز كافة النسخ بدقة عالية للتنفيذ والطباعة.' },
      ],
      en: [
        { stepNumber: '01', title: 'Discovery & Brief', description: 'Analyzing creative goals and brand direction.' },
        { stepNumber: '02', title: 'Concept Creation', description: 'Developing distinct visual options for review.' },
        { stepNumber: '03', title: 'Final Handover', description: 'Exporting production-ready vector and raster files.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'ما هي مدة تنفيذ مشروع تصميم الجرافيك؟', answer: 'تتراوح عادة بين 3 إلى 7 أيام عمل حسب حجم ونوعية المخرجات المطلوبة.' },
      ],
      en: [
        { question: 'What is the typical design delivery timeline?', answer: 'Delivery ranges from 3 to 7 working days depending on project scope.' },
      ],
    },
  },

  {
    id: 'srv-brand-identity',
    slug: 'brand-identity',
    categorySlug: 'brand-identity',
    iconName: 'Sparkles',
    image: '/media/services/brand-identity.jpg',
    featured: true,
    title: {
      ar: 'تصميم الهوية البصرية والمستندات الرقمية',
      en: 'Brand Identity & Visual Design',
    },
    shortDescription: {
      ar: 'بناء هويات بصرية متكاملة وشاملة تعكس قيم وأهداف العلامة التجارية بكل دقة واحترافية.',
      en: 'Designing comprehensive brand identities that express core business values and personality.',
    },
    fullDescription: {
      ar: 'نصمم الهويات البصرية الشاملة بدءاً من تطوير الشعار، اختيار الخطوط والألوان، وحتى بناء الدليل الإرشادي الكامل للهوية البصرية (Brand Guidelines) لضمان اتساقها في جميع الأنشطة.',
      en: 'We craft complete brand identity systems, including logo design, typography scale, color harmony, and comprehensive brand guidelines ensuring long-term consistency.',
    },
    benefits: {
      ar: ['اتساق كامل للهوية عبر كل المنصات', 'دليل إرشادي شامل ومفصل', 'حماية واحترافية صورة الشركة'],
      en: ['Complete identity consistency', 'Comprehensive brand design manual', 'Strong market differentiation'],
    },
    deliverables: {
      ar: [
        { title: 'دليل الهوية البصرية (Brand Book)', description: 'كتيب كامل يشرح قواعد استخدام الشعار والألوان والخطوط.' },
        { title: 'حزمة المطبوعات والمستندات الرقمية', description: 'بطاقات العمل، الورق الرسمي، القوالب العرض.' },
      ],
      en: [
        { title: 'Brand Guidelines Book', description: 'Complete reference document governing logo usage, fonts, and colors.' },
        { title: 'Corporate Identity Kit', description: 'Business cards, letterheads, presentation decks, and templates.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'البحث والاستراتيجية', description: 'دراسة السوق والمنافسين وتحديد موقع العلامة.' },
        { stepNumber: '02', title: 'تصميم الشعار والعناصر', description: 'ابتكار أفكار الشعار والألوان والهوية المساعدة.' },
        { stepNumber: '03', title: 'صياغة الدليل الإرشادي', description: 'تجميع كافة القواعد وتوثيقها في كتاب الهوية.' },
      ],
      en: [
        { stepNumber: '01', title: 'Research & Strategy', description: 'Analyzing market positioning and audience perception.' },
        { stepNumber: '02', title: 'Identity & Symbol Design', description: 'Crafting the core mark, palette, and graphic assets.' },
        { stepNumber: '03', title: 'Guideline Compilation', description: 'Documenting all application rules in the brand manual.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'هل يشمل المشروع تصميم المستندات الإدارية؟', answer: 'نعم، يشمل القوالب الرسمية، العروض التقديمية، وتصاميم السوشيال ميديا.' },
      ],
      en: [
        { question: 'Does the package include document templates?', answer: 'Yes, it includes presentation decks, stationery, and template layouts.' },
      ],
    },
  },

  {
    id: 'srv-short-video-reels',
    slug: 'short-video-reels',
    categorySlug: 'short-video-reels',
    iconName: 'Smartphone',
    image: '/media/services/reels-content.jpg',
    featured: true,
    title: {
      ar: 'صناعة الفيديوهات القصيرة (Reels & Shorts)',
      en: 'Short-Form Video & Reels Production',
    },
    shortDescription: {
      ar: 'إنتاج فيديوهات قصيرة عمودية عالية التفاعل لمنصات تيك توك، إنستغرام، وسناب شات.',
      en: 'Producing high-converting vertical video content optimized for Instagram Reels, TikTok, and Shorts.',
    },
    fullDescription: {
      ar: 'نصنع فيديوهات قصيرة سريعة الإيقاع وعالية التفاعل تتضمن كتابة السيناريو، التصوير العمودي الاحترافي، واللمسات المونتاجية الجذابة مع المؤثرات الصوتية والبصرية المعززة للتفاعل.',
      en: 'We script, film, and edit engaging short-form vertical videos engineered to hook viewers within the first 3 seconds and drive virality on TikTok, Instagram, and Shorts.',
    },
    benefits: {
      ar: ['زيادة وصول الحسابات والانتشار', 'تصوير ومونتاج مخصص للموبايل (9:16)', 'أفكار كتابة سيناريو مواكبة للتريند'],
      en: ['Maximized organic reach', 'Native 9:16 mobile filming & editing', 'Trend-responsive scripting'],
    },
    deliverables: {
      ar: [
        { title: 'فيديوهات Reels بدقة HD/4K', description: 'نسخ جاهزة للنشر الفوري مع المؤثرات الصوتية والمؤثرات النصية.' },
        { title: 'نصوص وسيناريوهات تفاعلية', description: 'سيناريوهات مقسمة بالثواني مع خطة النشر.' },
      ],
      en: [
        { title: 'Rendered Vertical Videos (4K)', description: 'Ready-to-publish MP4 reels with animated captions and audio.' },
        { title: 'Script & Shot Lists', description: 'Second-by-second script breakdown and storyboard hooks.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'ابتكار الأفكار والـ Hooks', description: 'تحديد خطاف الجذب الأولي وكتابة السيناريو.' },
        { stepNumber: '02', title: 'التصوير العمودي', description: 'استخدام إضاءة وعدسات احترافية مخصصة للريلز.' },
        { stepNumber: '03', title: 'المونتاج والتأثيرات', description: 'إضافة الترانزيشنز، النصوص المتحركة، والمؤثرات.' },
      ],
      en: [
        { stepNumber: '01', title: 'Idea & Hook Development', description: 'Designing strong opening visual and verbal hooks.' },
        { stepNumber: '02', title: 'Vertical Production', description: 'Filming on dedicated 9:16 mobile production rigs.' },
        { stepNumber: '03', title: 'Dynamic Motion Editing', description: 'Pacing cuts, motion text overlay, and sound design.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'ما هو الأسلوب المناسب لفيديوهات المنتجات؟', answer: 'نعتمد أسلوب UGC والـ Close-up التفاعلي الذي يعرض قيمة المنتج بشكل طبيعي وسريع.' },
      ],
      en: [
        { question: 'What video format works best for products?', answer: 'We combine UGC-style dynamic hooks with macro product feature shots.' },
      ],
    },
  },

  {
    id: 'srv-video-production',
    slug: 'video-production',
    categorySlug: 'video-production',
    iconName: 'Video',
    image: '/media/services/video-production.jpg',
    featured: true,
    title: {
      ar: 'الإنتاج الإعلامي والسينمائي',
      en: 'Cinematic & Media Production',
    },
    shortDescription: {
      ar: 'إنتاج إعلانات سينمائية وأفلام وثائقية وتسجيلية تعكس احترافية المؤسسات والشركات.',
      en: 'Creating high-end commercial films, corporate documentaries, and brand advertisements.',
    },
    fullDescription: {
      ar: 'نقدم خدمات إنتاج فيديو سينمائي متكاملة تشمل كتابة السيناريو، الإخراج، التصوير بأحدث الكاميرات والإضاءة، بالإضافة إلى المونتاج والهندسة الصوتية والتلوين السينمائي (Color Grading).',
      en: 'Full-service video production delivering broadcast-quality commercials and corporate films. Our team manages scriptwriting, directing, filming, color grading, and audio mastering.',
    },
    benefits: {
      ar: ['جودة إنتاجية سينمائية متقدمة', 'طاقم عمل وإخراج محترف', 'سرد قصصي مؤنس ومؤثر'],
      en: ['Cinematic production value', 'Experienced director & crew', 'Impactful storytelling'],
    },
    deliverables: {
      ar: [
        { title: 'الفيلم الرئيسي (Main Cut)', description: 'النسخة الكاملة للفيلم الإعلاني أو الوثائقي عالية الجودة.' },
        { title: 'نسخ اختصار للمنصات (Teasers)', description: 'نسخ قصيرة 15s و30s مخصصة للإعلانات الممولة.' },
      ],
      en: [
        { title: 'Master Commercial Cut', description: 'Full HD/4K master commercial video delivered in high bitrate.' },
        { title: 'Social Cutdowns & Teasers', description: '15-second and 30-second promo edits tailored for ad campaigns.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'ما قبل الإنتاج (Pre-production)', description: 'إعداد النص، المخطط الزمني، واختيار مواقع التصوير.' },
        { stepNumber: '02', title: 'مرحلة التصوير (Production)', description: 'تنفيذ التصوير الميداني وفق أعلى المعايير السينمائية.' },
        { stepNumber: '03', title: 'ما بعد الإنتاج (Post-production)', description: 'المونتاج، تصحيح الألوان، الهندسة الصوتية والـ VFX.' },
      ],
      en: [
        { stepNumber: '01', title: 'Pre-Production', description: 'Script development, storyboarding, location scouting, and talent booking.' },
        { stepNumber: '02', title: 'Production Filming', description: 'Principal photography with cinema cameras and professional lighting.' },
        { stepNumber: '03', title: 'Post-Production', description: 'Editing, color grading, voiceover recording, and audio mixing.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'هل نوفر المعلقين الصوتیين والممثلین؟', answer: 'نعم، نملك شبكة واسعة من المواهب والمعلقين الصوتیين باللغتين العربية والإنجلیزية.' },
      ],
      en: [
        { question: 'Do you provide voiceovers and actors?', answer: 'Yes, we source professional voice talent and actors across multiple accents.' },
      ],
    },
  },

  {
    id: 'srv-social-content',
    slug: 'social-content',
    categorySlug: 'social-content',
    iconName: 'Image',
    image: '/media/services/social-content.jpg',
    featured: true,
    title: {
      ar: 'صناعة المحتوى البصري لمنصات التواصل',
      en: 'Social Media Visual Content',
    },
    shortDescription: {
      ar: 'تصميم وصناعة محتوى بصري مبتكر ومتجدد يتناسب مع كافة شبكات التواصل الاجتماعي.',
      en: 'Designing tailored visual content strategies and assets built for high engagement on social channels.',
    },
    fullDescription: {
      ar: 'نصمم وننتج منشورات السوشيال ميديا اليومية والأسبوعية، بما يشمل الكاروسيل (Carousel)، الإنفوجرافيك التفاعلي، والتصاميم المتحركة المجهزة لجذب الجمهور وتثبيت حضور العلامة التجارية.',
      en: 'We create monthly content calendars and design high-performing social assets including carousel posts, infomarketing designs, animated posts, and interactive stories.',
    },
    benefits: {
      ar: ['محتوى بصري متجدد وجذاب', 'زيادة معدلات التفشيل والتفاعل', 'التزام تام بهوية العلامة التجارية'],
      en: ['Consistently fresh visual feed', 'Higher click-through and engagement', '100% brand guideline adherence'],
    },
    deliverables: {
      ar: [
        { title: 'شبكة محتوى شهري متكاملة', description: 'تصاميم جاهزة للنشر مصحوبة بالعناوين والنصوص المفاهيمية.' },
        { title: 'قوالب تصاميم قابلة للتعديل', description: 'قوالب مخصصة تسهل عملية النشر السريع عند الحاجة.' },
      ],
      en: [
        { title: 'Monthly Visual Content Pack', description: 'Fully formatted social posts ready for scheduled publication.' },
        { title: 'Reusable Graphic Templates', description: 'Custom editable templates for rapid news updates.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'خطة المحتوى', description: 'صياغة أفكار المحتوى الشهرية بناءً على أهداف العميل.' },
        { stepNumber: '02', title: 'التصميم البصري', description: 'تنفيذ منشورات الكاروسيل والتصاميم الفردية.' },
        { stepNumber: '03', title: 'المراجعة واعتماد الجدولة', description: 'تسليم الملفات النهائية وفق جدول زمني محدد.' },
      ],
      en: [
        { stepNumber: '01', title: 'Content Calendar Planning', description: 'Developing monthly theme calendars and messaging hooks.' },
        { stepNumber: '02', title: 'Visual Asset Creation', description: 'Designing carousels, statics, and motion posts.' },
        { stepNumber: '03', title: 'Approval & Scheduling', description: 'Delivering final optimized files for account managers.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'كم عدد المنشورات المتاحة شهرياً؟', answer: 'نوفر باقات مرنة تشمل 12، 20، أو 30 تصميم شهرياً حسلب حاجة العميل.' },
      ],
      en: [
        { question: 'How many posts are included in monthly packages?', answer: 'We offer flexible packages covering 12, 20, or 30 visual assets per month.' },
      ],
    },
  },

  {
    id: 'srv-social-management',
    slug: 'social-management',
    categorySlug: 'social-management',
    iconName: 'Share2',
    image: '/media/services/social-management.jpg',
    featured: false,
    title: {
      ar: 'إدارة وتوجيه حسابات التواصل الاجتماعي',
      en: 'Social Media Management & Strategy',
    },
    shortDescription: {
      ar: 'إدارة استراتيجية وتنفيذية شاملة للحسابات تضمن استمرارية النمو والتفاعل الإيجابي.',
      en: 'Comprehensive management of brand channels ensuring strategic messaging and channel growth.',
    },
    fullDescription: {
      ar: 'نتولى التوجيه الاستراتيجي والنشر الفعلي وتنسيق الحسابات عبر المنصات الرئيسية مثل X (تويتر)، لينكد إن، إنستغرام، وتيك توك مع تقديم تقارير تحليلية دورية لأداء القنوات.',
      en: 'We manage full channel execution including posting schedule coordination, caption copywriting, audience interaction guidelines, and monthly growth analytics reporting.',
    },
    benefits: {
      ar: ['إدارة احترافية منظمة للنشر', 'تحليل الأداء وتقارير دورية', 'تفاعل إيجابي مع الجمهور'],
      en: ['Streamlined posting workflow', 'Actionable analytics reporting', 'Consistent brand voice'],
    },
    deliverables: {
      ar: [
        { title: 'جدول النشر التفاعلي', description: 'جدولة دقيقة للمنشورات مع اختيار أوقات الذروة.' },
        { title: 'تقرير أداء شهري تفصيلي', description: 'تحليل معدلات الوصول والتفاعل ونمو المتابعين.' },
      ],
      en: [
        { title: 'Interactive Content Schedule', description: 'Structured publishing schedule optimized for audience peak hours.' },
        { title: 'Monthly Performance Analytics', description: 'Comprehensive metric reports tracking reach and engagement.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'ضبط الحسابات', description: 'تحسين الملفات الشخصية وتحديث معلومات التواصل.' },
        { stepNumber: '02', title: 'النشر المبرمج', description: 'متابعة نشر المحتوى بشكل يومي وبأعلى دقة.' },
        { stepNumber: '03', title: 'التقييم والتطوير', description: 'تحليل نتائج الشهر وتعديل الاستراتيجية للشهر القادم.' },
      ],
      en: [
        { stepNumber: '01', title: 'Profile Optimization', description: 'Auditing and perfecting account bio, highlights, and links.' },
        { stepNumber: '02', title: 'Scheduled Execution', description: 'Publishing content reliably during peak engagement windows.' },
        { stepNumber: '03', title: 'Monthly Strategy Review', description: 'Reviewing KPI reports and optimizing upcoming campaigns.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'هل تتضمن الخدمة الرد على الرسائل والتعليقات؟', answer: 'نوفر باقات متخصصة تشمل التفاعل المباشر وخدمة العملاء على المنصات.' },
      ],
      en: [
        { question: 'Do you manage comments and inbox responses?', answer: 'Community management and response handling can be included in custom tiers.' },
      ],
    },
  },

  {
    id: 'srv-integrated-marketing',
    slug: 'integrated-marketing',
    categorySlug: 'integrated-marketing',
    iconName: 'Megaphone',
    image: '/media/services/integrated-marketing.jpg',
    featured: false,
    title: {
      ar: 'الحملات التسويقية الإبداعية المتكاملة',
      en: 'Integrated Creative Campaigns',
    },
    shortDescription: {
      ar: 'حملات تسويقية متكاملة تجمع بين الفكرة الإبداعية والتنفيذ الاحترافي عبر كافة القنوات.',
      en: 'Designing unified creative marketing campaigns that link visual media with strategic outcome.',
    },
    fullDescription: {
      ar: 'نصمم حملات إبداعية موسيقية أو إعلانية متكاملة لتدشين المنتجات الجديدة، مواسم الأعياد، والفعاليات الكبرى. ندمج بين الإنتاج المرئي، تصاميم المطبوعات، والمحتوى التفاعلي لضمان أقصى تمدد إعلامي.',
      en: 'We plan and execute end-to-end creative marketing campaigns for product launches, seasonal activations, and brand milestones, harmonizing visual media, key visuals, and digital touchpoints.',
    },
    benefits: {
      ar: ['انتشار قوي في السوق', 'رسالة تسويقية موحدة', 'تأثير إيجابي مباشر على المبيعات والوعي'],
      en: ['High market saturation', 'Single cohesive campaign message', 'Measurable brand lift'],
    },
    deliverables: {
      ar: [
        { title: 'دليل الحملة الإعلانية الكامل', description: 'الفكرة العامة، النصوص، المفاهيم البصرية، وخطة التنفيذ.' },
        { title: 'أصول الحملة متعددة المقاسات', description: 'تصاميم مخصصة للطرق، والشاشات، ومواقع التواصل.' },
      ],
      en: [
        { title: 'Campaign Master Strategy', description: 'Creative direction book, copy messaging framework, and rollout plan.' },
        { title: 'Multi-Format Campaign Assets', description: 'Visual assets adapted for digital banners, OOH billboards, and social.' },
      ],
    },
    processSteps: {
      ar: [
        { stepNumber: '01', title: 'المفهوم الإبداعي', description: 'توليد الفكرة الرئيسية للحملة وصياغة الشعار الإعلاني.' },
        { stepNumber: '02', title: 'إنتاج الأصول المرئية', description: 'تصوير الفيديو وتصميم المفاتيح البصرية الرئيسية.' },
        { stepNumber: '03', title: 'إطلاق الحملة', description: 'تنسيق النشر الموحد عبر جميع المسارات التسويقية.' },
      ],
      en: [
        { stepNumber: '01', title: 'Creative Concept', description: 'Developing the central campaign narrative and tagline.' },
        { stepNumber: '02', title: 'Asset Production', description: 'Producing key visuals, commercial teasers, and print graphics.' },
        { stepNumber: '03', title: 'Multi-Channel Rollout', description: 'Coordinating simultaneous asset deployment across touchpoints.' },
      ],
    },
    faqs: {
      ar: [
        { question: 'ما هو الوقت الموصى به للتخطيط للحملات الموسيقية أو الموسمية؟', answer: 'نوصي بالبدء قبل 4 إلى 6 أسابيع من موعد الإطلاق المحدد.' },
      ],
      en: [
        { question: 'How far in advance should we plan seasonal campaigns?', answer: 'We recommend initiating campaign discovery 4 to 6 weeks prior to launch.' },
      ],
    },
  },
];
