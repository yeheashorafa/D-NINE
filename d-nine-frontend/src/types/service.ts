/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizedText } from './localized';

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categorySlug: string;
  iconName: string;
  image: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  benefits: {
    ar: string[];
    en: string[];
  };
  deliverables: {
    ar: ServiceDeliverable[];
    en: ServiceDeliverable[];
  };
  processSteps: {
    ar: ServiceProcessStep[];
    en: ServiceProcessStep[];
  };
  faqs: {
    ar: ServiceFAQ[];
    en: ServiceFAQ[];
  };
  featured: boolean;
  seo?: any;
}

export interface ServiceOffering {
  id: string;
  slug: string;
  parentServiceSlug: string;
  categorySlug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  featured: boolean;
}
