import type { Metadata } from 'next';
import { Layout } from '@/app/components/layout';

export const metadata: Metadata = {
  title: 'Terms of Service - Percexa',
  description: 'Terms of Service for Percexa web development services',
};

export default function TermsPage() {
  return (
    <Layout headerTransparent={false}>
      <section className="py-20 px-6 bg-white" style={{ paddingTop: '100px' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-4xl mb-8" style={{ color: '#0B1120', letterSpacing: '-1.5px' }}>
            Terms of Service
          </h1>
          
          <div className="font-satoshi text-base leading-relaxed space-y-6" style={{ color: '#64748B' }}>
            <p>
              <strong style={{ color: '#0B1120' }}>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                1. Agreement to Terms
              </h2>
              <p>
                By accessing and using Percexa's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                2. Services
              </h2>
              <p>
                Percexa provides web development, e-commerce solutions, and related digital services. The specific scope of work will be defined in individual project agreements.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                3. Payment Terms
              </h2>
              <p>
                Payment terms will be specified in individual project agreements. Generally, projects require a deposit before work begins and milestone-based payments throughout the project.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                4. Intellectual Property
              </h2>
              <p>
                Upon full payment, clients receive ownership of the final deliverables. Percexa retains the right to showcase completed work in our portfolio unless otherwise agreed.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                5. Limitation of Liability
              </h2>
              <p>
                Percexa shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-4 mt-8" style={{ color: '#0B1120' }}>
                6. Contact
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at{' '}
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
