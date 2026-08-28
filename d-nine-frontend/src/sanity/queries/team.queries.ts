import { groq } from 'next-sanity';
import { teamMemberFields } from './page.queries';

export const activeTeamMembersQuery = groq`
  *[_type == "teamMember" && active == true] | order(order asc, _createdAt desc) {
    ${teamMemberFields}
  }
`;
