import type { Metadata } from 'next';
import { PAGE_SEO } from '@/app/lib/constants';
import { generateMetadata, generateCanonicalUrl } from '@/app/lib/seo';
import WorkPageClient from './WorkPageClient';

// Metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: PAGE_SEO.work.title,
  description: PAGE_SEO.work.description,
  canonical: generateCanonicalUrl('/work'),
  openGraph: {
    title: PAGE_SEO.work.title,
    description: PAGE_SEO.work.description,
    type: 'website',
    url: generateCanonicalUrl('/work'),
  },
});

// Work Page Component (Server Component)
export default function WorkPage() {
  return <WorkPageClient />;
}