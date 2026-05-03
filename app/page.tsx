/**
 * Percexa — Homepage (page.tsx)
 * Full redesign: new Process section + scroll-triggered animations on every section
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from './lib/constants';
import {
  generateMetadata,
  generateCanonicalUrl,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
} from './lib/seo';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = generateMetadata({
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  canonical: generateCanonicalUrl('/'),
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    type: 'website',
    url: generateCanonicalUrl('/'),
  },
});

// Homepage Component (Server Component)
export default function HomePage() {
  return <HomePageClient />;
}