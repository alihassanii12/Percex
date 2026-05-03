/**
 * Card Component
 * 
 * A flexible card component with multiple variants for different use cases.
 * Provides consistent styling and hover effects across the application.
 */

import React from 'react';
import { CardProps } from '@/app/types';
import { cn } from '@/app/lib/utils';

const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  hover = false,
  ...props
}) => {
  // Base styles that apply to all cards
  const baseStyles = [
    'rounded-xl',
    'border',
    'transition-all',
    'duration-300',
    'ease-in-out',
  ];

  // Variant styles
  const variantStyles = {
    default: [
      'bg-slate-blue/10',
      'border-slate-blue/20',
      'backdrop-blur-sm',
      'p-6',
    ],
    service: [
      'bg-slate-blue/5',
      'border-slate-blue/15',
      'backdrop-blur-sm',
      'p-8',
      'text-center',
      hover && [
        'hover:bg-slate-blue/10',
        'hover:border-slate-blue/30',
        'hover:shadow-lg',
        'hover:shadow-slate-blue/10',
        'hover:-translate-y-1',
      ],
    ],
    project: [
      'bg-slate-blue/8',
      'border-slate-blue/20',
      'backdrop-blur-sm',
      'overflow-hidden',
      'group',
      hover && [
        'hover:bg-slate-blue/15',
        'hover:border-slate-blue/40',
        'hover:shadow-xl',
        'hover:shadow-slate-blue/20',
        'hover:-translate-y-2',
        'cursor-pointer',
      ],
    ],
    team: [
      'bg-slate-blue/5',
      'border-slate-blue/15',
      'backdrop-blur-sm',
      'p-6',
      'text-center',
      hover && [
        'hover:bg-slate-blue/10',
        'hover:border-slate-blue/25',
        'hover:shadow-lg',
        'hover:shadow-slate-blue/10',
        'hover:-translate-y-1',
      ],
    ],
  };

  // Hover styles (applied when hover prop is true)
  const hoverStyles = hover ? [
    'cursor-pointer',
    'transform',
    'transition-transform',
  ] : [];

  // Combine all styles
  const cardClasses = cn(
    ...baseStyles,
    ...(Array.isArray(variantStyles[variant]) ? variantStyles[variant].flat() : [variantStyles[variant]]),
    ...hoverStyles,
    className
  );

  return (
    <div
      className={cardClasses}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;