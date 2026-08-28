import { TeamMemberItem } from '@/types/team';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { activeTeamMembersQuery } from '@/sanity/queries/team.queries';
import { SanityTeamMemberDoc } from '@/sanity/types';
import { STATIC_TEAM_MEMBERS } from '@/features/home/data/team.data';

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  if (contentSource === 'sanity') {
    assertSanityConfig();
    const data = await sanityFetch<SanityTeamMemberDoc[]>({
      query: activeTeamMembersQuery,
      tags: ['team-members'],
      stega: false,
    });
    return (data || []).map(mapSanityTeamMember);
  }

  return STATIC_TEAM_MEMBERS;
}

export function mapSanityTeamMember(doc: SanityTeamMemberDoc): TeamMemberItem {
  return {
    id: doc._id,
    name: doc.name || { ar: '', en: '' },
    role: doc.role || { ar: '', en: '' },
    bio: doc.bio,
    image: doc.image,
    socialLinks: doc.socialLinks || [],
    featured: doc.featured,
  };
}
