/**
 * Header Component
 * 
 * Main navigation header with sticky behavior, responsive design,
 * and mobile menu functionality.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '@/app/types';
import { SITE_CONFIG } from '@/app/lib/constants';
import { cn } from '@/app/lib/utils';
import Button from '@/app/components/ui/Button';

const Header: React.FC<HeaderProps> = ({
  transparent = false,
  sticky = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for sticky header
  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Header container styles
  const headerStyles = cn(
    'w-full',
    'z-40',
    'transition-all',
    'duration-300',
    'ease-in-out',
    sticky && 'sticky top-0',
    'bg-white/95 backdrop-blur-md border-b border-gray-200/50',
    isScrolled && 'shadow-lg shadow-gray-900/10'
  );

  // Navigation container styles
  const navStyles = cn(
    'max-w-7xl mx-auto px-6',
    'flex',
    'items-center',
    'justify-between',
    'py-3',
    'lg:py-4'
  );

  // Logo styles
  const logoStyles = cn(
    'font-bold',
    'text-xl',
    'text-gray-900',
    'hover:text-gray-700',
    'transition-colors',
    'duration-200'
  );

  // Desktop navigation styles
  const desktopNavStyles = cn(
    'hidden',
    'md:flex',
    'items-center',
    'space-x-8'
  );

  // Navigation link styles
  const getLinkStyles = (href: string) => cn(
    'font-medium',
    'text-sm',
    'transition-colors',
    'duration-200',
    'hover:text-blue-600',
    'relative',
    'py-2',
    pathname === href ? 'text-blue-600' : 'text-gray-700'
  );

  // Mobile navigation styles
  const mobileNavStyles = cn(
    'md:hidden',
    'flex',
    'items-center',
    'space-x-4'
  );

  return (
    <>
      <header className={headerStyles}>
        <nav className={navStyles} role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className={logoStyles} aria-label="Percexa Home">
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Navigation */}
          <div className={desktopNavStyles}>
            <ul className="flex items-center space-x-8">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={getLinkStyles(item.href)}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {pathname === item.href && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA Button */}
            <Button
              variant="primary"
              size="sm"
              href="/contact"
              className="ml-6"
            >
              Start a project
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className={mobileNavStyles}>
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // Close icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Hamburger icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Outside header */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[45] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel - Full Screen from Right */}
          <div 
            className="fixed top-0 right-0 bottom-0 w-full bg-white z-[60] md:hidden overflow-y-auto animate-slide-in-right"
            style={{
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <style jsx>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(0);
                }
              }
            `}</style>
            
            {/* Close Button */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <Link href="/" className="font-bold text-xl text-gray-900">
                {SITE_CONFIG.name}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-6">
              {/* Navigation Links */}
              <ul className="space-y-2 mb-8">
                {SITE_CONFIG.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-4 rounded-lg font-medium text-lg transition-colors',
                        pathname === item.href
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA Button */}
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="w-full"
              >
                Start a project
              </Button>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;