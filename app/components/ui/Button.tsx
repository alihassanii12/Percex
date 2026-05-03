/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Supports both button and link functionality with consistent styling.
 */

import React from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/app/types';
import { cn } from '@/app/lib/utils';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  disabled = false,
  className,
  type = 'button',
  ...props
}) => {
  // Base styles that apply to all buttons
  const baseStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-electric-blue',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
    'rounded-lg',
    'border',
    'font-satoshi',
  ];

  // Variant styles
  const variantStyles = {
    primary: [
      'bg-electric-blue',
      'text-white',
      'border-electric-blue',
      'hover:bg-electric-blue-hover',
      'hover:border-electric-blue-hover',
      'active:bg-blue-700',
      'shadow-sm',
      'hover:shadow-md',
    ],
    secondary: [
      'bg-slate-blue',
      'text-soft-gray',
      'border-slate-blue',
      'hover:bg-slate-600',
      'hover:border-slate-600',
      'active:bg-slate-700',
      'shadow-sm',
      'hover:shadow-md',
    ],
    outline: [
      'bg-transparent',
      'text-electric-blue',
      'border-electric-blue',
      'hover:bg-electric-blue',
      'hover:text-white',
      'active:bg-blue-700',
      'active:border-blue-700',
    ],
    ghost: [
      'bg-transparent',
      'text-soft-gray',
      'border-transparent',
      'hover:bg-slate-blue/20',
      'hover:text-white',
      'active:bg-slate-blue/30',
    ],
  };

  // Size styles
  const sizeStyles = {
    sm: [
      'px-3',
      'py-1.5',
      'text-sm',
      'gap-1.5',
      'min-h-[32px]',
    ],
    md: [
      'px-4',
      'py-2',
      'text-base',
      'gap-2',
      'min-h-[40px]',
    ],
    lg: [
      'px-6',
      'py-3',
      'text-lg',
      'gap-2.5',
      'min-h-[48px]',
    ],
  };

  // Combine all styles
  const buttonClasses = cn(
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    className
  );

  // Common props for both button and link
  const commonProps = {
    className: buttonClasses,
    'aria-disabled': disabled,
    ...props,
  };

  // If href is provided, render as Link
  if (href && !disabled) {
    // Check if it's an external link
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...commonProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} {...commonProps}>
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...commonProps}
    >
      {children}
    </button>
  );
};

export default Button;