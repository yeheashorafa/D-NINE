import { PartnerItem } from '@/types/partner';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { partnerFields } from '@/sanity/queries/page.queries';
import { mapSanityPartner } from '@/sanity/mappers/section.mapper';
import { SanityPartnerDoc } from '@/sanity/types';

export const STATIC_PARTNERS: PartnerItem[] = [];

export async function getPartners(): Promise<PartnerItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityPartnerDoc[]>({
      query: `*[_type == "partner" && defined(logo.asset)] | order(order asc, _createdAt asc) { ${partnerFields} }`,
      tags: ['partner', 'partners'],
    });
    return (data || []).filter((p) => p && p.logo && (p.name?.ar || p.name?.en)).map(mapSanityPartner);
  }

  return STATIC_PARTNERS;
}
