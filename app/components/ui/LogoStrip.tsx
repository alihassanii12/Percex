/**
 * LogoStrip Component
 * 
 * An animated logo carousel component for displaying trusted by logos
 * with responsive grid layout and accessibility features.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LogoStripProps } from '@/app/types';
import { cn } from '@/app/lib/utils';

const LogoStrip: React.FC<LogoStripProps> = ({
  logos,
  title,
  animated = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate logos for seamless animation
  const duplicatedLogos = animated ? [...logos, ...logos] : logos;

  // Container styles
  const containerStyles = cn(
    'w-full',
    'overflow-hidden',
    'py-8',
    'md:py-12'
  );

  // Title styles
  const titleStyles = cn(
    'text-center',
    'mb-8',
    'md:mb-12',
    'font-satoshi',
    'font-medium',
    'text-muted-steel',
    'text-sm',
    'md:text-base',
    'uppercase',
    'tracking-wider'
  );

  // Logo container styles
  const logoContainerStyles = cn(
    'flex',
    'items-center',
    ...(animated ? [
      'animate-scroll',
      isPaused && 'animation-paused',
    ] : [
      'justify-center',
      'flex-wrap',
      'gap-8',
      'md:gap-12',
    ])
  );

  // Individual logo styles
  const logoStyles = cn(
    'flex-shrink-0',
    'flex',
    'items-center',
    'justify-center',
    'grayscale',
    'opacity-60',
    'hover:opacity-100',
    'hover:grayscale-0',
    'transition-all',
    'duration-300',
    'ease-in-out',
    ...(animated ? [
      'mx-8',
      'md:mx-12',
    ] : [])
  );

  // Handle animation pause/resume
  const handleMouseEnter = () => {
    if (animated) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (animated) setIsPaused(false);
  };

  return (
    <div className={containerStyles}>
      {title && (
        <h3 className={titleStyles}>
          {title}
        </h3>
      )}

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-label={title || "Company logos"}
      >
        <div className={logoContainerStyles}>
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className={logoStyles}
              role="img"
              aria-label={logo.alt}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="max-h-8 md:max-h-10 w-auto object-contain"
                priority={index < 5} // Prioritize first 5 logos
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays for animated version */}
        {animated && (
          <>
            <div className="absolute left-0 top-0 w-16 md:w-24 h-full bg-gradient-to-r from-deep-navy to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 w-16 md:w-24 h-full bg-gradient-to-l from-deep-navy to-transparent pointer-events-none z-10" />
          </>
        )}
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animation-paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LogoStrip;