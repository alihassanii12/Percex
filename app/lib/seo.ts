/**
 * SEO Utility Functions
 * 
 * Helper functions for generating SEO metadata, structured data,
 * and Open Graph content across the application.
 */

import { Metadata } from 'next';
import { SITE_CONFIG, DEFAULT_SEO } from './constants';
import { SEOMetadata, OpenGraphData, TwitterCardData } from '@/app/types';

// ============================================================================
// Metadata Generation Utilities
// ============================================================================

/**
 * Generate complete metadata for a page
 * @param seo - SEO metadata object
 * @returns Next.js Metadata object
 */
export function generateMetadata(seo: Partial<SEOMetadata>): Metadata {
  const title = seo.title || DEFAULT_SEO.title;
  const description = seo.description || DEFAULT_SEO.description;
  const keywords = seo.keywords || DEFAULT_SEO.keywords;
  const canonical = seo.canonical;

  return {
    title,
    description,
    keywords,
    ...(canonical && { alternates: { canonical } }),
    
    // Open Graph
    openGraph: {
      title: seo.openGraph?.title || title,
      description: seo.openGraph?.description || description,
      type: seo.openGraph?.type || DEFAULT_SEO.openGraph.type,
      url: seo.openGraph?.url || SITE_CONFIG.url,
      siteName: DEFAULT_SEO.openGraph.siteName,
      locale: DEFAULT_SEO.openGraph.locale,
      ...(seo.openGraph?.image && { images: [seo.openGraph.image] }),
    },
    
    // Twitter
    twitter: {
      card: seo.twitter?.card || DEFAULT_SEO.twitter.card,
      title: seo.twitter?.title || title,
      description: seo.twitter?.description || description,
      creator: seo.twitter?.creator || DEFAULT_SEO.twitter.creator,
      ...(seo.twitter?.image && { images: [seo.twitter.image] }),
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate page-specific metadata with consistent structure
 * @param page - Page identifier
 * @param customData - Custom metadata overrides
 * @returns Next.js Metadata object
 */
export function generatePageMetadata(
  page: string,
  customData?: Partial<SEOMetadata>
): Metadata {
  const baseTitle = `${page} | ${SITE_CONFIG.name}`;
  const baseDescription = `${page} page for ${SITE_CONFIG.name} - ${SITE_CONFIG.description}`;

  return generateMetadata({
    title: baseTitle,
    description: baseDescription,
    canonical: `${SITE_CONFIG.url}/${page.toLowerCase()}`,
    ...customData,
  });
}

// ============================================================================
// Structured Data Utilities
// ============================================================================

/**
 * Generate Organization structured data
 * @returns JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.contact.phone,
      contactType: 'customer service',
      email: SITE_CONFIG.contact.email,
    },
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.github,
    ].filter(Boolean),
  };
}

/**
 * Generate WebSite structured data
 * @returns JSON-LD structured data for website
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Service structured data
 * @param service - Service object
 * @returns JSON-LD structured data for service
 */
export function generateServiceStructuredData(service: {
  name: string;
  description: string;
  features: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: 'Web Development',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
        position: index + 1,
      })),
    },
  };
}

/**
 * Generate Article structured data
 * @param article - Article object
 * @returns JSON-LD structured data for article
 */
export function generateArticleStructuredData(article: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  category: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/icon.svg`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    articleSection: article.category,
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image,
      },
    }),
  };
}

/**
 * Generate FAQ structured data
 * @param faqs - Array of FAQ objects
 * @returns JSON-LD structured data for FAQ
 */
export function generateFAQStructuredData(faqs: Array<{
  question: string;
  answer: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================================
// URL and Canonical Utilities
// ============================================================================

/**
 * Generate canonical URL for a page
 * @param path - Page path
 * @returns Full canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

/**
 * Generate Open Graph URL
 * @param path - Page path
 * @returns Full Open Graph URL
 */
export function generateOpenGraphUrl(path: string): string {
  return generateCanonicalUrl(path);
}

// ============================================================================
// Meta Tag Utilities
// ============================================================================

/**
 * Generate viewport meta tag content
 * @returns Viewport meta content string
 */
export function generateViewportContent(): string {
  return 'width=device-width, initial-scale=1, shrink-to-fit=no';
}

/**
 * Generate robots meta tag content
 * @param index - Whether to index the page
 * @param follow - Whether to follow links
 * @returns Robots meta content string
 */
export function generateRobotsContent(
  index: boolean = true,
  follow: boolean = true
): string {
  const indexValue = index ? 'index' : 'noindex';
  const followValue = follow ? 'follow' : 'nofollow';
  return `${indexValue}, ${followValue}`;
}

// ============================================================================
// Breadcrumb Utilities
// ============================================================================

/**
 * Generate breadcrumb structured data
 * @param breadcrumbs - Array of breadcrumb items
 * @returns JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string;
  url: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ============================================================================
// Social Media Utilities
// ============================================================================

/**
 * Generate social media sharing URLs
 * @param url - Page URL
 * @param title - Page title
 * @param description - Page description
 * @returns Object with social sharing URLs
 */
export function generateSocialSharingUrls(
  url: string,
  title: string,
  description?: string
) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validate SEO metadata completeness
 * @param metadata - SEO metadata object
 * @returns Validation result with missing fields
 */
export function validateSEOMetadata(metadata: Partial<SEOMetadata>) {
  const required = ['title', 'description'];
  const recommended = ['keywords', 'openGraph', 'twitter'];
  
  const missing = required.filter(field => !metadata[field as keyof SEOMetadata]);
  const missingRecommended = recommended.filter(field => !metadata[field as keyof SEOMetadata]);
  
  return {
    isValid: missing.length === 0,
    missing,
    missingRecommended,
    score: ((required.length + recommended.length - missing.length - missingRecommended.length) / (required.length + recommended.length)) * 100,
  };
}

/**
 * Check if title length is optimal for SEO
 * @param title - Page title
 * @returns Validation result
 */
export function validateTitleLength(title: string) {
  const length = title.length;
  const optimal = length >= 30 && length <= 60;
  
  return {
    length,
    optimal,
    message: optimal 
      ? 'Title length is optimal' 
      : length < 30 
        ? 'Title is too short (recommended: 30-60 characters)'
        : 'Title is too long (recommended: 30-60 characters)',
  };
}

/**
 * Check if description length is optimal for SEO
 * @param description - Meta description
 * @returns Validation result
 */
export function validateDescriptionLength(description: string) {
  const length = description.length;
  const optimal = length >= 120 && length <= 160;
  
  return {
    length,
    optimal,
    message: optimal 
      ? 'Description length is optimal' 
      : length < 120 
        ? 'Description is too short (recommended: 120-160 characters)'
        : 'Description is too long (recommended: 120-160 characters)',
  };
}