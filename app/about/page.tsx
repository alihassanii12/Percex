import type { Metadata } from 'next';
import { PAGE_SEO } from '@/app/lib/constants';
import { generateMetadata, generateCanonicalUrl } from '@/app/lib/seo';
import AboutPageClient from './AboutPageClient';

// Metadata for SEO (Server Component)
export const metadata: Metadata = generateMetadata({
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  canonical: generateCanonicalUrl('/about'),
  openGraph: {
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    type: 'website',
    url: generateCanonicalUrl('/about'),
  },
});

// Server Component that renders the Client Component
export default function AboutPage() {
  return <AboutPageClient />;
}