import { defineLocations, DocumentResolver } from 'sanity/presentation';

export const locations = {
  homePage: defineLocations({
    locations: [
      { title: 'Home (Arabic)', href: '/ar' },
      { title: 'Home (English)', href: '/en' },
    ],
  }),
  aboutPage: defineLocations({
    locations: [
      { title: 'About (Arabic)', href: '/ar/about' },
      { title: 'About (English)', href: '/en/about' },
    ],
  }),
  servicesPage: defineLocations({
    locations: [
      { title: 'Services (Arabic)', href: '/ar/services' },
      { title: 'Services (English)', href: '/en/services' },
    ],
  }),
  workPage: defineLocations({
    locations: [
      { title: 'Work (Arabic)', href: '/ar/work' },
      { title: 'Work (English)', href: '/en/work' },
    ],
  }),
  blogPage: defineLocations({
    locations: [
      { title: 'Blog (Arabic)', href: '/ar/blog' },
      { title: 'Blog (English)', href: '/en/blog' },
    ],
  }),
  contactPage: defineLocations({
    locations: [
      { title: 'Contact (Arabic)', href: '/ar/contact' },
      { title: 'Contact (English)', href: '/en/contact' },
    ],
  }),
  privacyPage: defineLocations({
    locations: [
      { title: 'Privacy (Arabic)', href: '/ar/privacy' },
      { title: 'Privacy (English)', href: '/en/privacy' },
    ],
  }),
  termsPage: defineLocations({
    locations: [
      { title: 'Terms (Arabic)', href: '/ar/terms' },
      { title: 'Terms (English)', href: '/en/terms' },
    ],
  }),
  siteSettings: defineLocations({
    locations: [
      { title: 'Global (Arabic)', href: '/ar' },
      { title: 'Global (English)', href: '/en' },
    ],
  }),
  service: defineLocations({
    select: {
      slug: 'slug.current',
      title: 'title.en',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ? `${doc.title} (AR)` : 'Service (AR)',
          href: `/ar/services/${doc?.slug}`,
        },
        {
          title: doc?.title ? `${doc.title} (EN)` : 'Service (EN)',
          href: `/en/services/${doc?.slug}`,
        },
      ],
    }),
  }),
  project: defineLocations({
    select: {
      slug: 'slug.current',
      title: 'title.en',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ? `${doc.title} (AR)` : 'Project (AR)',
          href: `/ar/work/${doc?.slug}`,
        },
        {
          title: doc?.title ? `${doc.title} (EN)` : 'Project (EN)',
          href: `/en/work/${doc?.slug}`,
        },
      ],
    }),
  }),
  blogPost: defineLocations({
    select: {
      slug: 'slug.current',
      title: 'title.en',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ? `${doc.title} (AR)` : 'Blog Post (AR)',
          href: `/ar/blog/${doc?.slug}`,
        },
        {
          title: doc?.title ? `${doc.title} (EN)` : 'Blog Post (EN)',
          href: `/en/blog/${doc?.slug}`,
        },
      ],
    }),
  }),
  testimonial: defineLocations({
    select: {
      title: 'personName.en',
      serviceSlug: 'relatedService.slug.current',
      projectSlug: 'relatedProject.slug.current',
    },
    resolve: (doc) => {
      const locs = [
        { title: 'Home (AR)', href: '/ar' },
        { title: 'Home (EN)', href: '/en' },
        { title: 'About (AR)', href: '/ar/about' },
        { title: 'About (EN)', href: '/en/about' },
        { title: 'Services (AR)', href: '/ar/services' },
        { title: 'Services (EN)', href: '/en/services' },
      ];
      if (doc?.serviceSlug) {
        locs.push({ title: 'Related Service (AR)', href: `/ar/services/${doc.serviceSlug}` });
        locs.push({ title: 'Related Service (EN)', href: `/en/services/${doc.serviceSlug}` });
      }
      if (doc?.projectSlug) {
        locs.push({ title: 'Related Project (AR)', href: `/ar/work/${doc.projectSlug}` });
        locs.push({ title: 'Related Project (EN)', href: `/en/work/${doc.projectSlug}` });
      }
      return { locations: locs };
    },
  }),
  teamMember: defineLocations({
    select: {
      title: 'name.en',
    },
    resolve: () => ({
      locations: [
        { title: 'Home (AR)', href: '/ar' },
        { title: 'Home (EN)', href: '/en' },
        { title: 'About (AR)', href: '/ar/about' },
        { title: 'About (EN)', href: '/en/about' },
      ],
    }),
  }),
};

export const mainDocuments: DocumentResolver[] = [
  {
    route: '/:locale/services/:slug',
    filter: `_type == "service" && slug.current == $slug`,
  },
  {
    route: '/:locale/work/:slug',
    filter: `_type == "project" && slug.current == $slug`,
  },
  {
    route: '/:locale/blog/:slug',
    filter: `_type == "blogPost" && slug.current == $slug`,
  },
];
