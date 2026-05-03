/**
 * Layout Component
 * 
 * Main layout wrapper that provides consistent structure
 * with header and footer for all pages.
 */

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/app/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  headerTransparent?: boolean;
  headerSticky?: boolean;
  footerVariant?: 'default' | 'minimal';
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerTransparent = false,
  headerSticky = true,
  footerVariant = 'default',
  className,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header
        transparent={headerTransparent}
        sticky={headerSticky}
      />

      {/* Main Content */}
      <main
        id="main-content"
        className={cn(
          'flex-1',
          'flex',
          'flex-col',
          className
        )}
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer variant={footerVariant} />
    </div>
  );
};

export default Layout;