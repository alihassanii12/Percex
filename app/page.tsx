import type { Metadata } from 'next';
import localFont from 'next/font/local';
import LottieAnimation from './components/LottieAnimation';

// Load custom fonts
const cabinetGrotesk = localFont({
  src: './fonts/CabinetGrotesk-Bold.woff2',
  variable: '--font-heading',
  display: 'swap',
  weight: '700',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.woff2 ',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Percexa – Under Maintenance',
  description: 'Percexa is temporarily down for scheduled maintenance. We\'ll be back shortly. Contact us via Gmail at ahmad@percexa.com or WhatsApp at +92 371 4653595.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Percexa – Under Maintenance',
    description: 'We\'re currently down for scheduled maintenance. We\'ll be back soon.',
    type: 'website',
    url: 'https://percexa.com',
  },
};

// Icon Components
function EnvelopeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="flex-shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

// Main Page Component
export default function MaintenancePage() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between bg-[#E2E8F0] p-4 ${satoshi.variable}`}>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-[600px] text-center font-[var(--font-body)]">
          {/* Lottie Animation */}
          <LottieAnimation />

          {/* Primary Heading - Cabinet Grotesk Bold */}
          <h1 className={`mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl ${cabinetGrotesk.className}`}>
            Site is Under maintenance
          </h1>

          {/* Guidance Message - Satoshi Medium */}
          <p className="mb-8 text-base font-medium leading-relaxed text-gray-600 md:text-lg">
            We're making things better behind the scenes.<br />
            We'll be back online shortly — thank you for your patience.
          </p>

          {/* Contact Section - Satoshi Medium */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {/* Email */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmad@percexa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              <EnvelopeIcon />
              <span className="text-base md:text-lg">ahmad@percexa.com</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/923714653595"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              <WhatsAppIcon />
              <span className="text-base md:text-lg">+92 371 4653595</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Footer - Satoshi Regular */}
      <footer className="w-full py-4 text-center">
        <p className="text-sm font-normal text-gray-600">
          © 2026 Percexa. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
