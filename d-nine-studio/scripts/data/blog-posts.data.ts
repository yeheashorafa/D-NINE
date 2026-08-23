export type BlogPost = any;

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'future-of-brand-identity-2025',
    categorySlug: 'brand-identity',
    relatedServiceSlugs: ['brand-identity', 'graphic-design'],
    image: '/media/blog/blog-1.jpg',
    category: {
      ar: 'الهوية البصرية',
      en: 'Brand Identity',
    },
    title: {
      ar: 'مستقبل الهوية البصرية في 2025: المرونة، الحركة، والتجربة الرقمية',
      en: 'The Future of Brand Identity: Motion, Adaptability & Digital Experience',
    },
    excerpt: {
      ar: 'كيف تتطور الهويات البصرية الحديثة من التجسيد الثابت إلى الأنظمة الحركية التفاعلية عبر المنصات الرقمية.',
      en: 'Exploring how modern brand identities evolve from static marks into dynamic, motion-driven visual systems.',
    },
    publishedAt: '2025-01-15',
    readTimeMinutes: 5,
    author: {
      name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' },
      role: { ar: 'قسم استراتيجيات العلامة', en: 'Brand Strategy Dept.' },
    },
    sections: [
      {
        heading: {
          ar: 'من الشعار الثابت إلى النظام البصري الحي',
          en: 'From Static Marks to Living Visual Systems',
        },
        body: {
          ar: 'لم تعد الهوية البصرية مجرد شعار ثابت ينطبع على الأوراق الرسمية، بل أصبحت نظاماً بصرياً حياً يتفاعل مع حركة التصفح وشاشات الأجهزة الذكية. تفرض المنصات الحديثة لغة حركية تعبر عن شخصية العلامة التجارية بدقة.',
          en: 'Brand identities are no longer constrained to print stationery. Modern brands require fluid visual systems that adapt seamlessly across mobile screens, motion graphics, and interactive touchpoints.',
        },
      },
      {
        heading: {
          ar: 'أهمية اتساق العناصر عبر جميع نقاط الاتصال',
          en: 'The Value of Cross-Touchpoint Consistency',
        },
        body: {
          ar: 'يساعد الاتساق البصري على ترسيخ الثقة في أذهان المستهلكين. عندما يرى العميل نفس التوجه اللوني والطباعي على إنستغرام، الموقع، والعبوات، تترسخ صورة العلامة كمرجع موثوق.',
          en: 'Visual consistency builds consumer trust. When users experience unified color palettes, typography, and motion cues across all digital channels, brand recognition increases significantly.',
        },
      },
    ],
    featured: true,
    tags: {
      ar: ['هوية بصرية', 'تصميم', 'علامات تجارية', 'ابتكار'],
      en: ['Brand Identity', 'Graphic Design', 'Branding', 'Innovation'],
    },
  },

  {
    id: 'post-02',
    slug: 'short-form-video-reels-strategy',
    categorySlug: 'short-video-reels',
    relatedServiceSlugs: ['short-video-reels', 'video-production'],
    image: '/media/blog/blog-2.jpg',
    category: {
      ar: 'الفيديوهات القصيرة',
      en: 'Short-Form Reels',
    },
    title: {
      ar: 'كيف تبني خطاف جذب ينعش مشاهدات الريلز في الثواني الثلاث الأولى',
      en: 'Mastering the 3-Second Hook in Short-Form Video Reels',
    },
    excerpt: {
      ar: 'استراتيجيات عمل مجربة لكتابة وإنتاج فيديوهات ريلز وتيك توك تحقق أعلى نسبة مشاهدات وتفاعل.',
      en: 'Proven scripting and visual editing strategies to maximize watch time on TikTok, Reels, and Shorts.',
    },
    publishedAt: '2025-01-28',
    readTimeMinutes: 4,
    author: {
      name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' },
      role: { ar: 'قسم إنتاج الميديا', en: 'Media Production Dept.' },
    },
    sections: [
      {
        heading: {
          ar: 'سحر الثواني الأولى: الـ Hook الفعال',
          en: 'The Power of the Opening Visual Hook',
        },
        body: {
          ar: 'تحدد الثواني الثلاث الأولى ما إذا كان المشاهد يستمر أو يتجاوز الفيديو. يتطلب ذلك خطافاً بصرياً أو صوتياً سريعة يثير الفضول مباشرة.',
          en: 'The first three seconds determine whether a user continues watching or swipes away. Combining a clear visual action with engaging motion captions holds audience focus.',
        },
      },
    ],
    featured: true,
    tags: {
      ar: ['ريلز', 'تيك توك', 'فيديو عمودي', 'مونتاج'],
      en: ['Reels', 'TikTok', 'Vertical Video', 'Video Production'],
    },
  },

  {
    id: 'post-03',
    slug: 'cinematic-lighting-commercial-production',
    categorySlug: 'video-production',
    relatedServiceSlugs: ['video-production', 'short-video-reels'],
    image: '/media/blog/blog-3.png',
    category: {
      ar: 'الإنتاج الإعلامي',
      en: 'Video Production',
    },
    title: {
      ar: 'الإضاءة السينمائية ودورها في رفد جودة الإعلانات التجارية',
      en: 'How Cinematic Lighting Elevates Brand Commercial Production',
    },
    excerpt: {
      ar: 'دليل شامل لأساليب الإضاءة وتوزيع الضوء لإعطاء الفيديوهات الإعلانية طابعاً سينمائياً فخماً.',
      en: 'A comprehensive guide on lighting setups, color contrast, and atmosphere in commercial filmmaking.',
    },
    publishedAt: '2025-02-05',
    readTimeMinutes: 6,
    author: {
      name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' },
      role: { ar: 'قسم الإخراج والتصوير', en: 'Directing & Cinematography' },
    },
    sections: [
      {
        heading: {
          ar: 'الفرق بين الإضاءة العادية والإضاءة السينمائية',
          en: 'Standard vs Cinematic Lighting Setup',
        },
        body: {
          ar: 'الإضاءة السينمائية لا تكتفي بإنارة المكان، بل ترسم الظلال وتبرز زوايا المنتج والوجه لتعزيز البعد الثالث في الكاميرا.',
          en: 'Cinematic lighting does not simply illuminate a scene—it shapes shadow, depth, and texture to evoke specific emotional reactions.',
        },
      },
    ],
    featured: true,
    tags: {
      ar: ['إنتاج سينمائي', 'إضاءة', 'تصوير', 'إعلانات'],
      en: ['Cinematography', 'Lighting', 'Filmmaking', 'Commercials'],
    },
  },

  {
    id: 'post-04',
    slug: 'graphic-design-principles-for-social-media',
    categorySlug: 'graphic-design',
    relatedServiceSlugs: ['graphic-design', 'social-content'],
    image: '/media/blog/blog-4.jpg',
    category: {
      ar: 'تصميم الجرافيك',
      en: 'Graphic Design',
    },
    title: {
      ar: 'أساسيات تصميم الكاروسيل عالي التفاعل على إنستغرام ولينكد إن',
      en: 'Design Principles for High-Converting Social Media Carousels',
    },
    excerpt: {
      ar: 'كيف تبني تسلسلاً بصرياً في منشورات الكاروسيل يدفع المتابع للتنقل بين الشرائح حتى النهاية.',
      en: 'How to structure visual hierarchy, slide transitions, and typography in multi-slide social posts.',
    },
    publishedAt: '2025-02-10',
    readTimeMinutes: 4,
    author: {
      name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' },
      role: { ar: 'قسم تصميم الجرافيك', en: 'Graphic Design Dept.' },
    },
    sections: [
      {
        heading: {
          ar: 'التسلسل البصري وانسيابية القراءة',
          en: 'Visual Flow & Reading Hierarchy',
        },
        body: {
          ar: 'يجب أن تحتوي الشريحة الأولى على عنوان جذاب وتصميم يدعو للسحب للشريحة التالية بشكل طبيعي وواضح.',
          en: 'Slide one must present a compelling hook, while subsequent slides guide the reader effortlessly through visual cues.',
        },
      },
    ],
    featured: false,
    tags: {
      ar: ['تصميم الجرافيك', 'سوشيال ميديا', 'كاروسيل', 'إنستغرام'],
      en: ['Graphic Design', 'Social Media', 'Carousel', 'Instagram'],
    },
  },

  // 8 additional blog posts to reach 12 static posts
  {
    id: 'post-05',
    slug: 'color-theory-in-branding-psychology',
    categorySlug: 'brand-identity',
    relatedServiceSlugs: ['brand-identity', 'graphic-design'],
    image: '/media/blog/blog-1.jpg',
    category: { ar: 'الهوية البصرية', en: 'Brand Identity' },
    title: { ar: 'سيكولوجية الألوان في تصميم العلامات التجارية الشرق أوسطية', en: 'Color Psychology in Middle Eastern Brand Identity Design' },
    excerpt: { ar: 'دراسة تأثير اختيار الألوان والدرجات على الانطباع الذهني وقرارات الشراء لدى المستهلكين.', en: 'Analyzing the psychological impact of color palettes on consumer trust and purchase decisions.' },
    publishedAt: '2025-02-12',
    readTimeMinutes: 5,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم الأبحاث البصرية', en: 'Visual Research Dept.' } },
    sections: [{ heading: { ar: 'تأثير الألوان على الانطباع الأول', en: 'First Impression Impact' }, body: { ar: 'تؤثر الألوان بنسبة تصل إلى 80% في تشكيل الانطباع الأولي عن العلامة.', en: 'Color choices drive initial emotional brand connection before text is read.' } }],
    featured: false,
    tags: { ar: ['ألوان', 'هوية', 'علم النفس', 'تصميم'], en: ['Color Theory', 'Branding', 'Psychology', 'Design'] },
  },

  {
    id: 'post-06',
    slug: 'vertical-video-editing-software-tips',
    categorySlug: 'short-video-reels',
    relatedServiceSlugs: ['short-video-reels', 'video-production'],
    image: '/media/blog/blog-2.jpg',
    category: { ar: 'الفيديوهات القصيرة', en: 'Short-Form Reels' },
    title: { ar: 'أفضل تقنيات المونتاج السريع للفيديوهات العمودية في 2025', en: 'Top Motion Editing Techniques for Vertical Short Videos' },
    excerpt: { ar: 'ممارسات احترافية في تسريع المونتاج وإضافة النصوص الحركية وتنسيق الصوت للريلز.', en: 'Best practices for pacing, dynamic text motion, and audio mixing in mobile video editing.' },
    publishedAt: '2025-02-14',
    readTimeMinutes: 4,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم المونتاج', en: 'Video Editing Dept.' } },
    sections: [{ heading: { ar: 'النصوص الحركية والتفاعل', en: 'Kinetic Captions & Engagement' }, body: { ar: 'إضافة النصوص المتحركة تزيد من متابعة الفيديو بدون صوت.', en: 'Animated captions enable users to follow narrative video content silently.' } }],
    featured: false,
    tags: { ar: ['ريلز', 'مونتاج', 'تطبيقات', 'فيديو'], en: ['Reels', 'Editing', 'Software', 'Video'] },
  },

  {
    id: 'post-07',
    slug: 'storyboarding-for-commercial-films',
    categorySlug: 'video-production',
    relatedServiceSlugs: ['video-production', 'integrated-marketing'],
    image: '/media/blog/blog-3.png',
    category: { ar: 'الإنتاج الإعلامي', en: 'Video Production' },
    title: { ar: 'أهمية الـ Storyboard في ضمان نجاح تصوير الأفلام الإعلانية', en: 'Why Storyboarding is Crucial for Commercial Video Success' },
    excerpt: { ar: 'كيف يساعد رسم المشاهد المسبق في توفير الوقت والجهد أثناء التصوير الميداني.', en: 'How pre-visualizing scenes through detailed storyboards streamlines set production.' },
    publishedAt: '2025-02-16',
    readTimeMinutes: 5,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم الإخراج', en: 'Directing Team' } },
    sections: [{ heading: { ar: 'التخطيط البصري المسبق', en: 'Pre-Visual Planning' }, body: { ar: 'يوفر المخطط البصري التواصل الدقيق بين المخرج وطاقم التصوير.', en: 'Storyboards provide a shared visual roadmap for director, camera operator, and client.' } }],
    featured: false,
    tags: { ar: ['إخراج', 'ستوري بورد', 'إنتاج سينمائي', 'تخطيط'], en: ['Directing', 'Storyboard', 'Filmmaking', 'Planning'] },
  },

  {
    id: 'post-08',
    slug: 'social-media-content-calendar-guide',
    categorySlug: 'social-content',
    relatedServiceSlugs: ['social-content', 'social-management'],
    image: '/media/blog/blog-4.jpg',
    category: { ar: 'محتوى التواصل', en: 'Social Visual Content' },
    title: { ar: 'دليل إعداد جدول المحتوى البصري الشهري بدون عشوائية', en: 'How to Build a Seamless Monthly Social Content Calendar' },
    excerpt: { ar: 'خطوات تنظيم أفكار النشر والربط بين المحتوى التفاعلي والتسويقي المباشر.', en: 'A step-by-step framework to plan, design, and schedule social media visual posts.' },
    publishedAt: '2025-02-18',
    readTimeMinutes: 4,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم المحتوى', en: 'Content Strategy' } },
    sections: [{ heading: { ar: 'توازن أنواع المحتوى', en: 'Content Mix Balance' }, body: { ar: 'التوازن بين المحتوى التعليمي والترفييهي والتسويقي يضمن النمو الدائم.', en: 'Balancing educational, engagement, and promotional posts prevents audience fatigue.' } }],
    featured: false,
    tags: { ar: ['سوشيال ميديا', 'محتوى', 'جدولة', 'تخطيط'], en: ['Social Media', 'Content', 'Scheduling', 'Strategy'] },
  },

  {
    id: 'post-09',
    slug: 'integrated-marketing-campaign-rollout',
    categorySlug: 'integrated-marketing',
    relatedServiceSlugs: ['integrated-marketing', 'brand-identity'],
    image: '/media/blog/blog-1.jpg',
    category: { ar: 'الحملات التسويقية', en: 'Integrated Marketing' },
    title: { ar: 'كيف تضمن نجاح الحملات التسويقية الإبداعية متعددة القنوات', en: 'Executing Multi-Channel Creative Marketing Campaigns' },
    excerpt: { ar: 'استراتيجية ربط الرسائل الإعلانية البصرية بين إعلانات الطرق والمنصات الرقمية.', en: 'Strategies for harmonizing key visual messaging across outdoor and digital channels.' },
    publishedAt: '2025-02-20',
    readTimeMinutes: 6,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'إدارة الحملات', en: 'Campaign Management' } },
    sections: [{ heading: { ar: 'وحدة الرسالة البصرية', en: 'Unified Message' }, body: { ar: 'توحيد الرسالة البصرية يضاعف من تأثير الحملة الإعلانية لدى العميل.', en: 'Consistency across billboard visuals and digital reels amplifies brand recall.' } }],
    featured: false,
    tags: { ar: ['حملات', 'تسويق', 'إعلانات', 'استراتيجية'], en: ['Campaigns', 'Marketing', 'Advertising', 'Strategy'] },
  },

  {
    id: 'post-10',
    slug: 'typography-selection-arabic-english-design',
    categorySlug: 'graphic-design',
    relatedServiceSlugs: ['graphic-design', 'brand-identity'],
    image: '/media/blog/blog-2.jpg',
    category: { ar: 'تصميم الجرافيك', en: 'Graphic Design' },
    title: { ar: 'قواعد اختيار واقتران الخطوط العربية والإنجليزية في التصميم', en: 'Font Pairing Rules for Arabic & English Typography' },
    excerpt: { ar: 'كيف تختار خطوطاً عربية وإنجليزية متناسقة في الوزن والوزن البصري للتصاميم ثنائية اللغة.', en: 'Best practices for matching Latin and Arabic font weights and visual proportions.' },
    publishedAt: '2025-02-22',
    readTimeMinutes: 4,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم الطباعة والخطوط', en: 'Typography Team' } },
    sections: [{ heading: { ar: 'التكافؤ البصري بين الخطين', en: 'Visual Weight Match' }, body: { ar: 'يجب أن يحمل الخط العربي واللاتيني نفس الوزن الرمزي عند جاذبية العين.', en: 'Bilingual typography requires matching optical weight, x-height, and stroke width.' } }],
    featured: false,
    tags: { ar: ['خطوط', 'تصميم', 'تايبوجرافي', 'عربي'], en: ['Typography', 'Design', 'Fonts', 'Arabic'] },
  },

  {
    id: 'post-11',
    slug: 'sound-design-for-video-ads',
    categorySlug: 'video-production',
    relatedServiceSlugs: ['video-production', 'short-video-reels'],
    image: '/media/blog/blog-3.png',
    category: { ar: 'الإنتاج الإعلامي', en: 'Video Production' },
    title: { ar: 'دور الهندسة والمؤثرات الصوتية في زيادة تأثير الإعلانات', en: 'The Role of Sound Design & Foley in Commercial Video Impact' },
    excerpt: { ar: 'أهمية هندسة الصوت والمؤثرات السمعية في إحياء الفيديوهات وإعطائها طابعاً واقعياً.', en: 'How custom sound design and Foley layering transform flat videos into immersive ads.' },
    publishedAt: '2025-02-24',
    readTimeMinutes: 5,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم الصوت والمكساج', en: 'Sound Design Team' } },
    sections: [{ heading: { ar: 'الصوت ينصف نصف التجربة', en: 'Sound is 50% of Video' }, body: { ar: 'الهندسة الصوتية المحترفة ترفع من القيمة الإنتاجية للفيديو بشكل فوري.', en: 'High quality Foley sound effects and crisp voiceovers double perceived video quality.' } }],
    featured: false,
    tags: { ar: ['صوت', 'هندسة صوتية', 'فيديو', 'إنتاج'], en: ['Audio', 'Sound Design', 'Video', 'Production'] },
  },

  {
    id: 'post-12',
    slug: 'social-media-engagement-metrics-2025',
    categorySlug: 'social-management',
    relatedServiceSlugs: ['social-management', 'social-content'],
    image: '/media/blog/blog-4.jpg',
    category: { ar: 'إدارة حسابات التواصل', en: 'Social Management' },
    title: { ar: 'مؤشرات الأداء الحقيقية الحاكمة لنمو حسابات الشركات', en: 'True KPIs for Measuring Corporate Social Channel Growth' },
    excerpt: { ar: 'التركيز على معدلات الوصول والتفاعل الفعلي بدلاً من مقاييس المتابعين الوهميين.', en: 'Shifting focus from vanity follower counts to meaningful engagement and reach.' },
    publishedAt: '2025-02-26',
    readTimeMinutes: 4,
    author: { name: { ar: 'فريق الإنتاج الإبداعي — دي ناين', en: 'D-NINE Creative Team' }, role: { ar: 'قسم التحليل والأداء', en: 'Analytics Dept.' } },
    sections: [{ heading: { ar: 'الوصول مقابل التفاعل', en: 'Reach vs Engagement' }, body: { ar: 'معدل الحفظ والمشاركة يعبر عن قيمة المحتوى الحقيقية لدى الجمهور.', en: 'Saves and shares indicate high-value content far better than simple likes.' } }],
    featured: false,
    tags: { ar: ['تحليل', 'تقارير', 'سوشيال ميديا', 'نمو'], en: ['Analytics', 'KPIs', 'Social Media', 'Growth'] },
  },
];
