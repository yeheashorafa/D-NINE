import { LocalizedText } from './localized';

export interface TimelineItem {
  step: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface TeamMember {
  id: string;
  image: string;
  name: LocalizedText;
  role: LocalizedText;
  bio: LocalizedText;
  colorVariant: string;
}

export interface TestimonialItem {
  id: string;
  quote: LocalizedText;
  authorName: LocalizedText;
  authorRole: LocalizedText;
  companyName: LocalizedText;
  rating: number;
  avatarInitials: string;
}

export interface StatItem {
  id: string;
  numericValue: number;
  suffix: string;
  label: LocalizedText;
}

export interface ClientLogo {
  id: string;
  name: string;
  category: string;
}
