'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Layout } from '@/app/components/layout';
import { Button } from '@/app/components/ui';

// Work Page Client Component - Coming Soon
export default function WorkPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP Timeline for smooth animations
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.fromTo('.gsap-icon', 
      { opacity: 0, scale: 0.5, rotate: -180 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo('.gsap-title', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo('.gsap-desc', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo('.gsap-buttons', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.3'
    );

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <style>{`
        /* ─── GSAP Animation Base Styles ─── */
        .gsap-icon,
        .gsap-title,
        .gsap-desc,
        .gsap-buttons {
          opacity: 0;
        }
      `}</style>

      <Layout headerTransparent={false}>
        {/* Coming Soon Section */}
        <section className="min-h-screen flex items-center justify-center px-6 bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Icon */}
            <div className="gsap-icon mb-8">
              <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="gsap-title font-bold tracking-tight mb-6" style={{ fontSize:'clamp(32px,5vw,48px)', lineHeight:1.1, letterSpacing:'-1.5px', color:'#0B1120' }}>
              Our Work Portfolio
              <br />
              <span style={{ color: '#2563EB' }}>Coming Soon</span>
            </h1>

            {/* Description */}
            <div className="gsap-desc mb-10">
              <p className="font-satoshi text-lg leading-relaxed mb-4" style={{ color: '#64748B' }}>
                We're currently working on some exciting projects and preparing our portfolio showcase.
              </p>
              <p className="font-satoshi text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                In the meantime, feel free to reach out to discuss your project requirements or learn more about our services.
              </p>
            </div>

            {/* Buttons */}
            <div className="gsap-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
              >
                Get in Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/services"
              >
                View Our Services
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: '#E2E8F0' }}>
              <p className="font-satoshi text-sm" style={{ color: '#94A3B8' }}>
                Want to see examples of our work? Contact us directly and we'll share case studies relevant to your project.
              </p>
            </div>

          </div>
        </section>
      </Layout>
    </div>
  );
}