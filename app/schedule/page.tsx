import type { Metadata } from 'next';
import { PAGE_SEO } from '@/app/lib/constants';
import { generateMetadata, generateCanonicalUrl } from '@/app/lib/seo';
import SchedulePageClient from './SchedulePageClient';

// Metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: 'Schedule Consultation - Percexa',
  description: 'Schedule a free consultation with our team to discuss your project requirements and get expert guidance.',
  canonical: generateCanonicalUrl('/schedule'),
  openGraph: {
    title: 'Schedule Consultation - Percexa',
    description: 'Schedule a free consultation with our team to discuss your project requirements and get expert guidance.',
    type: 'website',
    url: generateCanonicalUrl('/schedule'),
  },
});

// Schedule Page Component (Server Component)
export default function SchedulePage() {
  return <SchedulePageClient />;
}