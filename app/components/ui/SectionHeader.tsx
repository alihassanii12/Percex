/**
 * SectionHeader Component
 * 
 * A reusable section header component with title, subtitle, and description.
 * Supports left and center alignment with proper typography hierarchy.
 */

import React from 'react';
import { SectionHeaderProps } from '@/app/types';
import { cn } from '@/app/lib/utils';

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  alignment = 'center',
  className,
}) => {
  // Base container styles
  const containerStyles = [
    'space-y-4',
    alignment === 'center' ? 'text-center' : 'text-left',
    alignment === 'center' ? 'mx-auto' : '',
    alignment === 'center' ? 'max-w-3xl' : '',
  ];

  // Title styles (H1/H2 depending on context)
  const titleStyles = [
    'font-cabinet-grotesk',
    'font-bold',
    'text-soft-gray',
    'leading-tight',
    'text-3xl',
    'sm:text-4xl',
    'lg:text-5xl',
  ];

  // Subtitle styles (smaller accent text above title)
  const subtitleStyles = [
    'font-satoshi',
    'font-medium',
    'text-electric-blue',
    'text-sm',
    'sm:text-base',
    'uppercase',
    'tracking-wider',
    'mb-2',
  ];

  // Description styles (body text below title)
  const descriptionStyles = [
    'font-satoshi',
    'font-normal',
    'text-muted-steel',
    'text-lg',
    'sm:text-xl',
    'leading-relaxed',
    'max-w-2xl',
    alignment === 'center' ? 'mx-auto' : '',
  ];

  return (
    <div className={cn(...containerStyles, className)}>
      {subtitle && (
        <p className={cn(...subtitleStyles)}>
          {subtitle}
        </p>
      )}
      
      <h2 className={cn(...titleStyles)}>
        {title}
      </h2>
      
      {description && (
        <p className={cn(...descriptionStyles)}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;