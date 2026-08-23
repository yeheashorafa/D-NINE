import { defineLocations, DocumentResolver } from 'sanity/presentation';

export const locations = {
  homePage: defineLocations({
    locations: [
      { title: 'Home (Arabic)', href: '/ar' },
      { title: 'Home (English)', href: '/en' },
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
