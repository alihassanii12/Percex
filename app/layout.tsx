import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getAllFontVariables } from "./lib/fonts";
import { SITE_CONFIG, DEFAULT_SEO } from "./lib/constants";
import PerformanceMonitor from "./components/PerformanceMonitor";
import SkipLink from "./components/SkipLink";

export const metadata: Metadata = {
  title: DEFAULT_SEO.title,
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
  openGraph: {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    type: DEFAULT_SEO.openGraph.type,
    siteName: DEFAULT_SEO.openGraph.siteName,
    locale: DEFAULT_SEO.openGraph.locale,
    url: SITE_CONFIG.url,
  },
  twitter: {
    card: DEFAULT_SEO.twitter.card,
    creator: DEFAULT_SEO.twitter.creator,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${getAllFontVariables()} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {/* Skip Navigation Link */}
        <SkipLink />
        
        {/* Performance Monitoring */}
        <PerformanceMonitor />
        
        {children}
      </body>
    </html>
  );
}
