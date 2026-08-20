import React from 'react';
import { ContactPage } from '@/features/contact/contact-page';

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <ContactPage />;
}
