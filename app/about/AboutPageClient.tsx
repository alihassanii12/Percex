'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout } from '@/app/components/layout';
import { Button } from '@/app/components/ui';

gsap.registerPlugin(ScrollTrigger);

// About Page Client Component
export default function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.about-badge', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' })
        .fromTo('.about-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.3')
        .fromTo('.about-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.about-visual', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.2')
        .fromTo('.about-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.1');

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((parent) => {
        gsap.fromTo(parent.querySelectorAll(':scope > *'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: parent, start: 'top 85%', once: true },
        });
      });

    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <style>{`
        /* Hide until GSAP runs */
        .about-badge, .about-title, .about-desc, .about-visual, .about-cta { opacity: 0; }

        /* CTA box */
        .px-cta-box {
          background: #0B1120; border-radius: 24px; overflow: hidden; position: relative;
        }
        .px-cta-box::before {
          content:''; position:absolute;
          width:560px; height:560px; border-radius:50%;
          background: radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 65%);
          top:-180px; right:-120px; pointer-events:none;
        }
        .px-cta-box::after {
          content:''; position:absolute;
          width:380px; height:380px; border-radius:50%;
          background: radial-gradient(circle, rgba(37,99,235,.1) 0%, transparent 65%);
          bottom:-80px; left:-40px; pointer-events:none;
        }

        /* Eyebrow */
        .px-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: .15em;
          text-transform: uppercase; color: #2563EB;
          font-family: 'Satoshi', sans-serif;
        }
        .px-eyebrow-line { display:inline-block; height:1px; width:16px; background:currentColor; }

        /* Team card hover effects */
        .team-card {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .team-card:hover {
          transform: translateY(-4px);
          border-color: #2563EB !important;
        }
        .team-card:hover .team-avatar {
          transform: scale(1.05);
        }
        .team-avatar {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Value card hover effects */
        .value-card {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .value-card:hover {
          transform: translateY(-4px);
          border-color: #2563EB !important;
        }
        .value-card:hover .value-icon {
          background: #2563EB !important;
          color: #fff !important;
        }
        .value-icon {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Tech stack hover effects */
        .tech-item {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tech-item:hover {
          color: #2563EB !important;
          transform: translateY(-2px);
        }

        /* Storefront illustration */
        .storefront-visual {
          background: #334155;
          border: 2px solid #475569;
          position: relative;
          overflow: hidden;
        }
        .storefront-visual::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.1) 0%, transparent 50%);
        }
      `}</style>

      <Layout headerTransparent={false}>
        {/* ══════════════════════════════════════════════════════════
            HERO SECTION - Simple centered text + CTA
        ══════════════════════════════════════════════════════════ */}
        <section className="py-4 px-6 relative overflow-hidden bg-white" style={{ paddingTop: '60px', paddingBottom: '20px' }}>
          
          {/* Subtle grid pattern */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage:'linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
          
          {/* Light blue glow */}
          <div aria-hidden="true" className="absolute pointer-events-none" 
               style={{ width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,235,.06) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            
            <div className="about-badge inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium border"
                 style={{ background: 'rgba(37,99,235,.08)', color: '#2563EB', borderColor: 'rgba(37,99,235,.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563EB' }} />
              <span className="font-satoshi tracking-wide">About Percexa</span>
            </div>

            <h1 className="font-bold mb-8" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1, letterSpacing: '-2px', color: '#0B1120' }}>
              <span className="about-title block">We build the online</span>
              <span className="about-title block" style={{ color: '#2563EB' }}>storefronts that grow</span>
              <span className="about-title block">your B2B business</span>
            </h1>

            <p className="about-desc font-satoshi text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#64748B' }}>
              End-to-end strategy, design, and development — from first sketch to full-scale launch. 
              We specialize in e-commerce solutions that convert visitors into customers.
            </p>

            <div className="about-cta flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Start Your Project
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button variant="ghost" size="lg" href="/schedule">
                Book Discovery Call
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            WHAT SETS US APART - 5 values vertically stacked
        ══════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            
            <div className="reveal-section text-center mb-16">
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1.5px', color: '#0B1120' }}>
                What sets us apart
              </h2>
              <p className="font-satoshi text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#64748B' }}>
                We're not general web designers. We specialize in B2B e-commerce solutions that convert.
              </p>
            </div>

            <div className="reveal-stagger space-y-6">
              {[
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  title: 'End-to-end ownership',
                  desc: 'We never outsource or hand off. Your project stays with our core team from strategy through support.'
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                  ),
                  title: 'E-commerce native',
                  desc: 'We\'re not general web designers. We specialise in storefronts that convert (Shopify, Medusa, headless).'
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  ),
                  title: 'Transparent process',
                  desc: 'You\'ll see real progress, not a black box. Weekly updates, shared boards, direct access to developers.'
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                    </svg>
                  ),
                  title: 'Performance-first build',
                  desc: 'Every line of code is written for speed, SEO, and scalability. 95+ Lighthouse scores are standard.'
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                  title: 'Direct collaboration',
                  desc: 'You speak directly to the people writing your code and designing your store, never through layers of account managers.'
                }
              ].map((value, i) => (
                <div key={i} className="value-card flex items-start gap-4 p-6 rounded-xl border bg-white"
                     style={{ borderColor: '#E2E8F0' }}>
                  <div className="value-icon w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: '#F1F5F9', color: '#334155' }}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ letterSpacing: '-0.3px', color: '#0B1120' }}>
                      {value.title}
                    </h3>
                    <p className="font-satoshi text-base leading-relaxed" style={{ color: '#64748B' }}>
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TEAM SECTION - 3-4 profile cards in flex wrap
        ══════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            
            <div className="reveal-section text-center mb-16">
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1.5px', color: '#0B1120' }}>
                The people who will build your store
              </h2>
              <p className="font-satoshi text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#64748B' }}>
                Meet the specialists behind every successful storefront. No account managers, no middlemen—just direct access to the experts.
              </p>
            </div>

            <div className="reveal-stagger flex flex-wrap justify-center gap-8">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Lead Developer',
                  expertise: '10 years in headless commerce architecture',
                  initials: 'SC'
                },
                {
                  name: 'Marcus Rodriguez',
                  role: 'E-commerce Strategist',
                  expertise: 'Conversion optimization specialist',
                  initials: 'MR'
                },
                {
                  name: 'Emily Watson',
                  role: 'UX Designer',
                  expertise: 'B2B storefront user experience',
                  initials: 'EW'
                },
                {
                  name: 'David Kim',
                  role: 'Performance Engineer',
                  expertise: 'Site speed and SEO optimization',
                  initials: 'DK'
                }
              ].map((member, i) => (
                <div key={i} className="team-card p-6 rounded-xl border text-center bg-white w-64"
                     style={{ borderColor: '#E2E8F0' }}>
                  <div className="team-avatar w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg text-white"
                       style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}>
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ letterSpacing: '-0.3px', color: '#0B1120' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#2563EB' }}>
                    {member.role}
                  </p>
                  <p className="font-satoshi text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    {member.expertise}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TECH STACK SECTION - Technology names wrapping
        ══════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════
            TECH STACK SECTION - Technology names wrapping
        ══════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            
            <div className="reveal-section text-center mb-16">
              <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-1.5px', color: '#0B1120' }}>
                Modern tools for storefronts that scale
              </h2>
              <p className="font-satoshi text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: '#64748B' }}>
                We choose the right stack for your business, not the popular one.
              </p>
            </div>

            <div className="reveal-stagger">
              <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                {[
                  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shopify', 'Medusa', 
                  'Stripe', 'Vercel', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Python', 'Django', 'WebSockets'
                ].map((tech, i) => (
                  <div key={i} className="tech-item font-satoshi font-medium text-lg px-4 py-2 rounded-lg border"
                       style={{ color: '#64748B', borderColor: '#E2E8F0', background: '#F8FAFC' }}>
                    {tech}
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="font-satoshi text-base" style={{ color: '#64748B' }}>
                  Modern, reliable technology that grows with your business
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            STORY & NUMBERS SECTION - Centralized block with horizontal stats
        ══════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-section">
              
              <h2 className="font-bold mb-8" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-2px', lineHeight: 1.1, color: '#0B1120' }}>
                Our story is built on your success
              </h2>
              
              <p className="font-satoshi text-xl leading-relaxed mb-16 max-w-2xl mx-auto" style={{ color: '#64748B' }}>
                Founded to close the gap between B2B ambition and digital execution. We give B2B companies 
                the same level of digital storefront quality as DTC brands, without the complexity.
              </p>
              
              <div className="reveal-stagger flex flex-wrap justify-center items-center gap-16 mb-16">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#0B1120' }}>2019</div>
                  <div className="font-satoshi text-sm" style={{ color: '#64748B' }}>Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#0B1120' }}>50+</div>
                  <div className="font-satoshi text-sm" style={{ color: '#64748B' }}>Storefronts Built</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#0B1120' }}>15+</div>
                  <div className="font-satoshi text-sm" style={{ color: '#64748B' }}>Industries Served</div>
                </div>
              </div>

              <Button variant="outline" size="lg" href="/work">
                See Our Work
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CTA SECTION - Direct and Relevant
        ══════════════════════════════════════════════════════════ */}
        <section
          className="py-16 px-6"
          style={{ background: '#F8FAFC' }}
        >
          <div className="max-w-5xl mx-auto reveal-section">
            <div className="px-cta-box px-8 py-24 lg:px-20 text-center">
              <div className="relative z-10">

                <div className="px-eyebrow justify-center mb-6" style={{ color: '#334155' }}>
                  <span className="px-eyebrow-line" style={{ background: '#334155' }} />
                  Get started today
                  <span className="px-eyebrow-line" style={{ background: '#334155' }} />
                </div>

                <h2
                  className="font-cabinet-grotesk font-bold text-white mb-5"
                  style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', letterSpacing: '-2.5px', lineHeight: 1.02 }}
                >
                  Ready to build<br />
                  <span style={{ color: '#2563EB' }}>something great?</span>
                </h2>

                <p
                  className="font-satoshi text-lg leading-relaxed mb-12 max-w-lg mx-auto"
                  style={{ color: '#475569' }}
                >
                  Join growing brands that trusted Percexa to take them from zero
                  to scaled. Free consultation, no commitment required.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                  <Button variant="primary" size="lg" href="/contact">
                    Start Your Project
                    <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="lg" href="/schedule">Schedule a Call</Button>
                </div>

                <p className="font-satoshi text-xs mt-8" style={{ color: '#1E293B' }}>
                  No commitment required &nbsp;·&nbsp; 24-hour response &nbsp;·&nbsp; Free 30-min strategy call
                </p>

              </div>
            </div>
          </div>
        </section>

      </Layout>
    </div>
  );
}