import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stegaClean } from '@sanity/client/stega';
import { SectorPage } from '@/features/services/sector-page';
import { getSectorPage, isSectorSlug } from '@/sanity/services/sector.service';
import { SECTORS } from '@/features/client-revision/client-content';
import { constructMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return SECTORS.flatMap((sector) => ['ar', 'en'].map((locale) => ({ locale, slug: sector.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSectorSlug(slug)) return {};
  const sector = await getSectorPage(slug, { stega: false });
  if (!sector) return {};
  const lang = locale === 'ar' ? 'ar' : 'en';
  return constructMetadata({
    title: stegaClean(sector.seo?.metaTitle?.[lang] || `${sector.title[lang]} | D-NINE`),
    description: stegaClean(sector.seo?.metaDescription?.[lang] || sector.intro[lang]),
    locale,
    path: `/services/sectors/${slug}`,
  });
}

export default async function SectorRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  if (!isSectorSlug(slug)) notFound();
  const sector = await getSectorPage(slug);
  if (!sector) notFound();
  return <SectorPage sector={sector} />;
}
