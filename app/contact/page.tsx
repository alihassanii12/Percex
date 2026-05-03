import type { Metadata } from 'next';
import { PAGE_SEO } from '@/app/lib/constants';
import { generateMetadata, generateCanonicalUrl, generateFAQStructuredData } from '@/app/lib/seo';
import ContactPageClient from './ContactPageClient';

// Metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  canonical: generateCanonicalUrl('/contact'),
  openGraph: {
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    type: 'website',
    url: generateCanonicalUrl('/contact'),
  },
});

// Contact Page Component (Server Component)
export default function ContactPage() {
  // FAQ data for structured data
  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity, but most e-commerce projects take 4-8 weeks from start to launch.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer ongoing maintenance and support packages to keep your website running smoothly.',
    },
    {
      question: "What's included in your service?",
      answer: 'We provide end-to-end services including strategy, design, development, testing, and launch support.',
    },
  ];

  const faqStructuredData = generateFAQStructuredData(faqs);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <ContactPageClient />
    </>
  );
}