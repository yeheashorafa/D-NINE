import React from 'react';
import { Metadata } from 'next';
import { stegaClean } from '@sanity/client/stega';
import { ContactPage } from '@/features/contact/contact-page';
import { getContactPage } from '@/sanity/services/page.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const pageData = await getContactPage({ stega: false });

  const seoTitle = stegaClean(pageData?.seo?.metaTitle?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'تواصل معنا | دي ناين' : 'Contact Us | D-NINE'));
  const seoDesc = stegaClean(pageData?.seo?.metaDescription?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'تواصل مع فريق دي ناين' : 'Get in touch with D-NINE team'));

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: pageData?.seo?.canonicalUrl || `/${locale}/contact`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <ContactPage />;
}
