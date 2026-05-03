/**
 * Application constants for Percexa Full Website
 * Centralized configuration for site-wide settings and content
 */

import { SiteConfig, Service, TeamMember, Logo } from '@/app/types';

// ============================================================================
// Site Configuration
// ============================================================================

export const SITE_CONFIG: SiteConfig = {
  name: 'Percexa',
  description: 'Professional B2B web agency specializing in e-commerce and storefront development. From strategy to launch, we build your online presence.',
  url: 'https://percexa.com',
  contact: {
    email: 'ahmad@percexa.com',
    phone: '+92 371 4653595',
    whatsapp: '+92 371 4653595',
  },
  social: {
    linkedin: 'https://linkedin.com/company/percexa',
    twitter: 'https://twitter.com/percexa',
    github: 'https://github.com/percexa',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Our Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

// ============================================================================
// Design System Constants
// ============================================================================

/**
 * Brand color palette with semantic naming
 */
export const COLORS = {
  // Primary brand colors
  deepNavy: '#0B1120',
  slateBlue: '#334155',
  softGray: '#E2E8F0',
  mutedSteel: '#64748B',
  electricBlue: '#2563EB',
  electricBlueHover: '#3B82F6',
  
  // Semantic color mappings
  primary: '#2563EB',
  primaryHover: '#3B82F6',
  background: '#0B1120',
  surface: '#334155',
  textPrimary: '#E2E8F0',
  textSecondary: '#64748B',
  
  // State colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

/**
 * Responsive breakpoints matching Tailwind CSS
 */
export const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
} as const;

/**
 * Spacing scale for consistent layouts
 */
export const SPACING = {
  // Container sizes
  containerSm: '640px',
  containerMd: '768px',
  containerLg: '1024px',
  containerXl: '1280px',
  
  // Section spacing
  sectionSm: '3rem',    // 48px
  sectionMd: '4rem',    // 64px
  sectionLg: '6rem',    // 96px
  sectionXl: '8rem',    // 128px
  
  // Component spacing
  componentXs: '0.5rem', // 8px
  componentSm: '1rem',   // 16px
  componentMd: '1.5rem', // 24px
  componentLg: '2rem',   // 32px
  componentXl: '3rem',   // 48px
} as const;

/**
 * Animation durations and easing
 */
export const ANIMATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  
  // Easing functions
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  
  // Custom animations
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============================================================================
// Content Constants
// ============================================================================

/**
 * Core services offered by Percexa
 */
export const SERVICES: Service[] = [
  {
    id: 'strategy-discovery',
    title: 'Strategy & Discovery',
    description: 'We start by understanding your business goals, target audience, and competitive landscape to create a strategic foundation.',
    icon: 'strategy',
    features: [
      'Business analysis and goal setting',
      'Target audience research',
      'Competitive landscape analysis',
      'Technical requirements planning',
      'Project roadmap development',
    ],
  },
  {
    id: 'design-ux',
    title: 'Design & UX',
    description: 'Our design team creates intuitive, conversion-focused interfaces that reflect your brand and engage your customers.',
    icon: 'design',
    features: [
      'User experience design',
      'Visual identity and branding',
      'Responsive design systems',
      'Conversion optimization',
      'Accessibility compliance',
    ],
  },
  {
    id: 'development-launch',
    title: 'Development & Launch',
    description: 'We build robust, scalable e-commerce solutions using modern technologies and launch them with comprehensive testing.',
    icon: 'development',
    features: [
      'Custom e-commerce development',
      'Performance optimization',
      'Security implementation',
      'Quality assurance testing',
      'Launch and deployment',
    ],
  },
];

/**
 * Development process timeline
 */
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We analyze your business needs, research your market, and create a comprehensive project strategy.',
    icon: 'discovery',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our team designs user-centered interfaces and creates interactive prototypes for validation.',
    icon: 'design',
  },
  {
    number: '03',
    title: 'Development & Testing',
    description: 'We build your solution using modern technologies with rigorous testing throughout the process.',
    icon: 'development',
  },
  {
    number: '04',
    title: 'Launch & Optimization',
    description: 'We deploy your project and provide ongoing optimization to ensure peak performance.',
    icon: 'launch',
  },
];

/**
 * Team members (placeholder data)
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ahmad-founder',
    name: 'Ahmad',
    role: 'Founder & Lead Developer',
    avatar: '/images/team/ahmad.jpg',
    bio: 'Experienced full-stack developer with expertise in e-commerce solutions and modern web technologies.',
    social: {
      linkedin: 'https://linkedin.com/in/ahmad-percexa',
      github: 'https://github.com/ahmad-percexa',
    },
    skills: ['Next.js', 'React', 'TypeScript', 'E-commerce', 'UI/UX'],
  },
  // Additional team members can be added here
];

/**
 * Trusted by logos (placeholder data)
 */
export const TRUSTED_LOGOS: Logo[] = [
  {
    name: 'Company A',
    src: '/images/logos/company-a.svg',
    alt: 'Company A Logo',
    width: 120,
    height: 40,
  },
  {
    name: 'Company B',
    src: '/images/logos/company-b.svg',
    alt: 'Company B Logo',
    width: 140,
    height: 40,
  },
  {
    name: 'Company C',
    src: '/images/logos/company-c.svg',
    alt: 'Company C Logo',
    width: 100,
    height: 40,
  },
  {
    name: 'Company D',
    src: '/images/logos/company-d.svg',
    alt: 'Company D Logo',
    width: 130,
    height: 40,
  },
  {
    name: 'Company E',
    src: '/images/logos/company-e.svg',
    alt: 'Company E Logo',
    width: 110,
    height: 40,
  },
];

// ============================================================================
// SEO and Metadata Constants
// ============================================================================

/**
 * Default SEO metadata for pages
 */
export const DEFAULT_SEO = {
  title: 'Percexa - Professional Web Agency | E-commerce & Storefront Development',
  description: 'Transform your business with custom e-commerce solutions. Percexa specializes in strategy, design, and development of high-converting online storefronts.',
  keywords: [
    'web agency',
    'e-commerce development',
    'storefront design',
    'online store',
    'web development',
    'digital agency',
    'custom websites',
    'B2B web solutions',
  ] as string[],
  openGraph: {
    type: 'website' as const,
    siteName: 'Percexa',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image' as const,
    creator: '@percexa',
  },
} as const;

/**
 * Page-specific SEO metadata
 */
export const PAGE_SEO = {
  home: {
    title: 'Percexa - Your Online Storefront, Built From The Ground Up',
    description: 'Professional B2B web agency specializing in e-commerce development. From strategy to launch, we build high-converting online storefronts.',
  },
  services: {
    title: 'Our Services - Strategy, Design & Development | Percexa',
    description: 'Comprehensive web development services including strategy & discovery, design & UX, and development & launch for e-commerce businesses.',
  },
  work: {
    title: 'Our Work - E-commerce Portfolio & Case Studies | Percexa',
    description: 'Explore our portfolio of successful e-commerce projects and case studies showcasing our expertise in storefront development.',
  },
  about: {
    title: 'About Percexa - Professional Web Development Team',
    description: 'Learn about Percexa\'s mission, values, and expert team dedicated to building exceptional e-commerce experiences.',
  },
  contact: {
    title: 'Contact Percexa - Start Your E-commerce Project Today',
    description: 'Ready to build your online storefront? Contact Percexa for a consultation and discover how we can transform your business.',
  },
  blog: {
    title: 'Blog - Web Development Insights & E-commerce Tips | Percexa',
    description: 'Stay updated with the latest web development trends, e-commerce best practices, and industry insights from the Percexa team.',
  },
} as const;

// ============================================================================
// Form Configuration
// ============================================================================

/**
 * Contact form validation rules
 */
export const FORM_VALIDATION = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Please enter a valid name (2-50 characters, letters only)',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  company: {
    required: false,
    maxLength: 100,
    message: 'Company name must be less than 100 characters',
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: 'Please enter a message (10-1000 characters)',
  },
} as const;

/**
 * Form submission endpoints
 */
export const FORM_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
} as const;

// ============================================================================
// Performance Constants
// ============================================================================

/**
 * Performance optimization settings
 */
export const PERFORMANCE = {
  // Image optimization
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  imageDeviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  
  // Loading priorities
  criticalImages: ['hero', 'logo'],
  lazyLoadOffset: '200px',
  
  // Bundle optimization
  chunkSizeWarningLimit: 500,
  
  // Core Web Vitals targets
  targetLCP: 2500, // Largest Contentful Paint (ms)
  targetFID: 100,  // First Input Delay (ms)
  targetCLS: 0.1,  // Cumulative Layout Shift
} as const;

// ============================================================================
// API Configuration
// ============================================================================

/**
 * API endpoints and configuration
 */
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.percexa.com',
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

/**
 * External service URLs
 */
export const EXTERNAL_URLS = {
  whatsapp: `https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}`,
  email: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.contact.email}`, // Gmail compose in browser
  gmailCompose: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.contact.email}`,
} as const;