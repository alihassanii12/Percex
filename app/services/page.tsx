import type { Metadata } from 'next';
import { PAGE_SEO } from '@/app/lib/constants';
import { generateMetadata, generateCanonicalUrl } from '@/app/lib/seo';
import ServicesPageClient from './ServicesPageClient';

// Metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: PAGE_SEO.services.title,
  description: PAGE_SEO.services.description,
  canonical: generateCanonicalUrl('/services'),
  openGraph: {
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    type: 'website',
    url: generateCanonicalUrl('/services'),
  },
});

// Services Page Component (Server Component)
export default function ServicesPage() {
  return <ServicesPageClient />;
}