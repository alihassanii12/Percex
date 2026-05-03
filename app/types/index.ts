/**
 * TypeScript type definitions for Percexa Full Website
 * Defines all data models and interfaces used throughout the application
 */

import { ReactNode, ErrorInfo } from 'react';

// ============================================================================
// Site Configuration Types
// ============================================================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  contact: ContactInfo;
  social: SocialLinks;
  navigation: NavigationItem[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// ============================================================================
// Content Models
// ============================================================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  process?: ProcessStep[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  tags: string[];
  category: string;
  client?: string;
  year: number;
  url?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  featuredImage?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: SocialLinks;
  skills?: string[];
}

export interface Logo {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ============================================================================
// Form Models
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
}

export interface NewsletterSubscription {
  email: string;
  preferences?: string[];
}

export interface FormError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'length' | 'custom';
}

export interface FormState {
  errors: FormError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// Component Props Interfaces
// ============================================================================

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  variant: 'default' | 'service' | 'project' | 'team';
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment: 'left' | 'center';
  className?: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
  orientation: 'vertical' | 'horizontal';
}

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  className?: string;
}

export interface LogoStripProps {
  logos: Logo[];
  title?: string;
  animated?: boolean;
}

export interface HeaderProps {
  transparent?: boolean;
  sticky?: boolean;
}

export interface FooterProps {
  variant: 'default' | 'minimal';
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton;
  backgroundVariant: 'gradient' | 'solid';
}

export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  cta?: CTAButton;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  href: string;
}

export interface TeamMemberProps {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  social?: SocialLinks;
}

export interface CTAButton {
  text: string;
  href: string;
  variant?: ButtonProps['variant'];
  external?: boolean;
}

// ============================================================================
// Error Handling Types
// ============================================================================

export interface APIError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface ErrorLog {
  timestamp: Date;
  level: 'error' | 'warn' | 'info';
  message: string;
  context?: Record<string, unknown>;
  userAgent?: string;
  url?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ColorVariant = 'deep-navy' | 'slate-blue' | 'soft-gray' | 'muted-steel' | 'electric-blue';
export type FontWeight = '400' | '500' | '700';
export type FontFamily = 'heading' | 'body';

// ============================================================================
// SEO and Metadata Types
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: OpenGraphData;
  twitter?: TwitterCardData;
}

export interface OpenGraphData {
  title: string;
  description: string;
  type: 'website' | 'article';
  url: string;
  image?: string;
  siteName?: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image?: string;
  creator?: string;
}