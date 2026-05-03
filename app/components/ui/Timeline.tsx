/**
 * Timeline Component
 * 
 * A flexible timeline component that displays process steps
 * in vertical or horizontal orientation with responsive behavior.
 */

import React from 'react';
import { TimelineProps, TimelineStep } from '@/app/types';
import { cn } from '@/app/lib/utils';

const Timeline: React.FC<TimelineProps> = ({
  steps,
  orientation = 'vertical',
}) => {
  // Container styles based on orientation
  const containerStyles = cn(
    'relative',
    ...(orientation === 'horizontal' ? [
      'flex',
      'flex-col',
      'lg:flex-row',
      'lg:items-start',
      'lg:justify-between',
      'space-y-8',
      'lg:space-y-0',
      'lg:space-x-4',
    ] : [
      'space-y-8',
      'md:space-y-12',
    ])
  );

  // Step container styles
  const getStepStyles = (index: number, isLast: boolean) => cn(
    'relative',
    'flex',
    ...(orientation === 'horizontal' ? [
      'flex-col',
      'items-center',
      'text-center',
      'lg:flex-1',
    ] : [
      'items-start',
      'space-x-6',
    ])
  );

  // Number circle styles
  const numberStyles = cn(
    'flex',
    'items-center',
    'justify-center',
    'w-12',
    'h-12',
    'md:w-16',
    'md:h-16',
    'rounded-full',
    'bg-electric-blue',
    'text-white',
    'font-cabinet-grotesk',
    'font-bold',
    'text-lg',
    'md:text-xl',
    'flex-shrink-0',
    'relative',
    'z-10',
    'shadow-lg',
    'shadow-electric-blue/25'
  );

  // Content container styles
  const contentStyles = cn(
    'flex-1',
    ...(orientation === 'horizontal' ? [
      'mt-6',
      'lg:mt-8',
    ] : [
      'pt-1',
    ])
  );

  // Title styles
  const titleStyles = cn(
    'font-cabinet-grotesk',
    'font-bold',
    'text-xl',
    'md:text-2xl',
    'text-soft-gray',
    'mb-3',
    'leading-tight'
  );

  // Description styles
  const descriptionStyles = cn(
    'font-satoshi',
    'font-normal',
    'text-base',
    'md:text-lg',
    'text-muted-steel',
    'leading-relaxed'
  );

  // Connector line styles for vertical timeline
  const getConnectorStyles = (isLast: boolean) => {
    if (orientation === 'horizontal' || isLast) return '';
    
    return cn(
      'absolute',
      'left-6',
      'md:left-8',
      'top-12',
      'md:top-16',
      'w-0.5',
      'h-8',
      'md:h-12',
      'bg-gradient-to-b',
      'from-electric-blue',
      'to-slate-blue'
    );
  };

  // Horizontal connector styles
  const getHorizontalConnectorStyles = (index: number, isLast: boolean) => {
    if (orientation === 'vertical' || isLast) return '';
    
    return cn(
      'hidden',
      'lg:block',
      'absolute',
      'top-6',
      'md:top-8',
      'left-full',
      'w-full',
      'h-0.5',
      'bg-gradient-to-r',
      'from-electric-blue',
      'to-slate-blue',
      'transform',
      'translate-x-2'
    );
  };

  return (
    <div className={containerStyles}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div
            key={step.number}
            className={getStepStyles(index, isLast)}
          >
            {/* Step Number with Connector */}
            <div className="relative">
              <div className={numberStyles}>
                {step.icon || step.number}
              </div>
              
              {/* Vertical Connector Line */}
              <div className={getConnectorStyles(isLast)} />
              
              {/* Horizontal Connector Line */}
              <div className={getHorizontalConnectorStyles(index, isLast)} />
            </div>

            {/* Step Content */}
            <div className={contentStyles}>
              <h3 className={titleStyles}>
                {step.title}
              </h3>
              <p className={descriptionStyles}>
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;