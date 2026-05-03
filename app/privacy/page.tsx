import type { Metadata } from 'next';
import { Layout } from '@/app/components/layout';

export const metadata: Metadata = {
  title: 'Privacy Policy - Percexa',
  description: 'Privacy Policy for Percexa web development services',
};

export default function PrivacyPage() {
  return (
    <Layout headerTransparent={false}>
      <section className="py-20 px-6 bg-white" style={{ paddingTop: '100px' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-4xl mb-8" style={{ color: '#0B1120', letterSpacing: '-1.5px' }}>
            Privacy Policy
          </h1>
          
          <div className="font-satoshi text-base leading-relaxed space-y-6" style={{ color: '#64748B' }}>
            <p>
              <strong style={{ color: '#0B1120' }}>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, company name, and project details.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Process and fulfill your requests</li>
                <li>Send you project updates and communications</li>
                <li>Improve our services and website</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                3. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                4. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                5. Cookies
              </h2>
              <p>
                Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                8. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="/contact" className="text-blue-600 hover:underline">
                  ahmad@percexa.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
