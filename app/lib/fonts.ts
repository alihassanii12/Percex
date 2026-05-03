/**
 * Font configuration utilities for Percexa Full Website
 * Manages Cabinet Grotesk and Satoshi font loading with proper fallbacks
 */

import localFont from 'next/font/local';

// ============================================================================
// Font Definitions
// ============================================================================

/**
 * Cabinet Grotesk Bold - Primary heading font
 * Used for: H1, H2, H3 headings, hero titles, section headers
 */
export const cabinetGrotesk = localFont({
  src: '../fonts/CabinetGrotesk-Bold.woff2',
  variable: '--font-heading',
  display: 'swap',
  weight: '700',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  preload: true,
});

/**
 * Satoshi - Primary body font family
 * Used for: Body text, navigation, buttons, form labels
 * Includes Regular (400) and Medium (500) weights
 */
export const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  preload: true,
});

// ============================================================================
// Font Utility Functions
// ============================================================================

/**
 * Get font class names for use in components
 * @param fontType - The type of font to use ('heading' or 'body')
 * @param weight - Optional weight override for body font
 * @returns CSS class string
 */
export function getFontClass(
  fontType: 'heading' | 'body',
  weight?: '400' | '500' | '700'
): string {
  if (fontType === 'heading') {
    return cabinetGrotesk.className;
  }
  
  // For body font, return base class with optional weight
  const baseClass = satoshi.className;
  if (weight) {
    return `${baseClass} font-${weight === '400' ? 'normal' : weight === '500' ? 'medium' : 'bold'}`;
  }
  
  return baseClass;
}

/**
 * Get font variable names for CSS custom properties
 * @param fontType - The type of font variable needed
 * @returns CSS custom property name
 */
export function getFontVariable(fontType: 'heading' | 'body'): string {
  return fontType === 'heading' ? cabinetGrotesk.variable : satoshi.variable;
}

/**
 * Get all font variables for root layout
 * @returns Combined font variable string for className
 */
export function getAllFontVariables(): string {
  return `${cabinetGrotesk.variable} ${satoshi.variable}`;
}

/**
 * Font preload links for better performance
 * Use in layout.tsx or _document.tsx for optimal loading
 */
export const fontPreloadLinks = [
  {
    rel: 'preload',
    href: '/fonts/CabinetGrotesk-Bold.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Satoshi-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Satoshi-Medium.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];

// ============================================================================
// Typography Scale Configuration
// ============================================================================

/**
 * Typography scale configuration for consistent sizing
 * Maps semantic sizes to Tailwind classes
 */
export const typographyScale = {
  // Heading sizes (Cabinet Grotesk Bold)
  'hero-xl': 'text-5xl md:text-6xl lg:text-7xl', // 48px -> 60px -> 72px
  'hero-lg': 'text-4xl md:text-5xl lg:text-6xl', // 36px -> 48px -> 60px
  'heading-xl': 'text-3xl md:text-4xl lg:text-5xl', // 30px -> 36px -> 48px
  'heading-lg': 'text-2xl md:text-3xl lg:text-4xl', // 24px -> 30px -> 36px
  'heading-md': 'text-xl md:text-2xl lg:text-3xl', // 20px -> 24px -> 30px
  'heading-sm': 'text-lg md:text-xl lg:text-2xl', // 18px -> 20px -> 24px
  
  // Body text sizes (Satoshi)
  'body-xl': 'text-lg md:text-xl', // 18px -> 20px
  'body-lg': 'text-base md:text-lg', // 16px -> 18px
  'body-md': 'text-base', // 16px
  'body-sm': 'text-sm md:text-base', // 14px -> 16px
  'body-xs': 'text-sm', // 14px
  
  // Caption and small text
  'caption': 'text-xs md:text-sm', // 12px -> 14px
  'overline': 'text-xs uppercase tracking-wider', // 12px, uppercase, spaced
} as const;

/**
 * Get typography class for a given scale
 * @param scale - The typography scale key
 * @returns Tailwind CSS classes for the typography scale
 */
export function getTypographyClass(scale: keyof typeof typographyScale): string {
  return typographyScale[scale];
}

// ============================================================================
// Font Loading Optimization
// ============================================================================

/**
 * Font display strategies for different use cases
 */
export const fontDisplayStrategies = {
  critical: 'swap', // For above-the-fold content
  deferred: 'optional', // For below-the-fold content
  fallback: 'fallback', // For progressive enhancement
} as const;

/**
 * Check if fonts are loaded (for progressive enhancement)
 * @returns Promise that resolves when fonts are loaded
 */
export function waitForFontsLoaded(): Promise<void> {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => {});
}

/**
 * Get font loading status
 * @returns Object with loading status for each font
 */
export function getFontLoadingStatus() {
  if (typeof document === 'undefined') {
    return { cabinetGrotesk: false, satoshi: false };
  }

  return {
    cabinetGrotesk: document.fonts.check('700 16px Cabinet Grotesk'),
    satoshi: document.fonts.check('400 16px Satoshi'),
  };
}