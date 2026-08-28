import { groq } from 'next-sanity';
import { testimonialFields } from './page.queries';

export const testimonialsForServiceQuery = groq`
  *[_type == "testimonial" && active == true && relatedService->slug.current == $slug] | order(order asc, _createdAt desc) {
    ${testimonialFields}
  }
`;

export const testimonialsForProjectQuery = groq`
  *[_type == "testimonial" && active == true && relatedProject->slug.current == $slug] | order(order asc, _createdAt desc) {
    ${testimonialFields}
  }
`;
