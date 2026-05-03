/**
 * Skip Link Component
 * 
 * Accessibility component that allows keyboard users to skip to main content.
 */

'use client';

export default function SkipLink() {
  const handleSkipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.focus();
      target.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-electric-blue focus:text-white focus:rounded focus:no-underline"
      onClick={handleSkipToMain}
    >
      Skip to main content
    </a>
  );
}