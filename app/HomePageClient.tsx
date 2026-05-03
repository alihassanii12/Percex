'use client';

/**
 * Percexa — Homepage
 *
 * Design: Modern SaaS · Stripe-like precision
 * Hero:   Dark navy (#0B1120) with tight grid lines
 * Body:   Clean white sections with structured layout
 * Services: Horizontal list rows
 *
 * Palette
 *   #0B1120  Deep Navy    — hero bg, headlines
 *   #334155  Slate Blue   — body text
 *   #64748B  Muted Steel  — captions / meta
 *   #E2E8F0  Soft Gray    — borders / dividers
 *   #2563EB  Electric Blue — CTAs / accents
 *   #FFFFFF  White        — body sections
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
} from './lib/seo';
import { Layout } from './components/layout';
import { Button } from './components/ui';
import { TRUSTED_LOGOS } from './lib/constants';

gsap.registerPlugin(ScrollTrigger);

// ─── Static data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    title: 'Storefront Development',
    desc: 'Custom storefronts built for maximum conversions — Shopify, WooCommerce, and headless commerce that scales without friction.',
    tags: ['Shopify', 'Next.js', 'Headless'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Store Design & UX',
    desc: 'Conversion-obsessed design systems that feel premium and guide every visitor toward purchase. Built in Figma, shipped with precision.',
    tags: ['Figma', 'Design System', 'CRO'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Conversion Optimisation',
    desc: 'Data-driven A/B testing and analytics that compound your results. We find every point of friction and eliminate it systematically.',
    tags: ['A/B Testing', 'Analytics', 'Heatmaps'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Mobile Commerce',
    desc: 'Mobile-first experiences that perform flawlessly on every device. Progressive web apps and native-quality solutions.',
    tags: ['PWA', 'React Native', 'Mobile UX'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Digital Marketing',
    desc: 'SEO, paid media, and email automation that drive qualified traffic and deliver consistently measurable ROI from day one.',
    tags: ['SEO', 'PPC', 'Klaviyo'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/>
        <path d="M22 2L15 22l-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Store Maintenance',
    desc: 'Keep your storefront at peak performance with security monitoring, continuous updates, and dedicated technical support.',
    tags: ['Monitoring', 'Updates', 'Support'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
];

const PROCESS = [
  {
    num: '01', title: 'Discover',
    desc: 'We immerse in your brand, market, and goals. Every assumption tested, every opportunity mapped before we touch a wireframe.',
  },
  {
    num: '02', title: 'Design',
    desc: 'Wireframes, a complete design system, and pixel-perfect UI — all validated with real data before a single line of code.',
  },
  {
    num: '03', title: 'Build',
    desc: 'Engineered for performance and scale. Shipped iteratively with continuous QA so nothing reaches production untested.',
  },
  {
    num: '04', title: 'Launch & Grow',
    desc: 'Full launch support, 90-day post-launch optimisation, and an ongoing growth engine to keep the numbers climbing.',
  },
];

const TESTIMONIALS = [
  {
    quote: "Percexa didn't just build us a website — they handed us a revenue machine. Our conversion rate tripled within 60 days of launch.",
    author: 'Sofia Ramirez',
    role: 'CEO, Lumière Co.',
    result: '$2.1M year one',
    initials: 'SR',
  },
  {
    quote: "Strategy call to live storefront in six weeks. The team operated like elite special forces for e-commerce. Extraordinary in every single way.",
    author: 'Marcus Chen',
    role: 'Founder, Volta Supply',
    result: 'Amazing results',
    initials: 'MC',
  },
];

const FALLBACK_LOGOS = ['Shopify', 'Stripe', 'Next.js', 'Klaviyo', 'Vercel', 'Algolia'];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebsiteStructuredData();

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.px-h-chip',  { opacity: 0, y: 14, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.5)' })
        .fromTo('.px-h-head',  { opacity: 0, y: 44 },              { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 }, '-=0.25')
        .fromTo('.px-h-sub',   { opacity: 0, y: 22 },              { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.px-h-cta',   { opacity: 0, y: 14 },              { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.3')
        .fromTo('.px-h-stat',  { opacity: 0, y: 12 },              { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, '-=0.2')
        .fromTo('.px-h-logos', { opacity: 0 },                     { opacity: 1, duration: 0.5 }, '-=0.15');

      // ── Scroll reveals ──
      gsap.utils.toArray<HTMLElement>('.px-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.px-stagger').forEach((parent) => {
        gsap.fromTo(parent.querySelectorAll(':scope > *'), { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: parent, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.px-left').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -28 }, {
          opacity: 1, x: 0, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.px-right').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: 28 }, {
          opacity: 1, x: 0, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });

    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }} />

      <style>{`
        /* hide until GSAP runs */
        .px-h-chip,.px-h-head,.px-h-sub,.px-h-cta,.px-h-stat,.px-h-logos { opacity: 0; }

        /* marquee */
        @keyframes px-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .px-marquee { animation: px-marquee 30s linear infinite; }

        /* blink dot */
        @keyframes px-blink { 0%,100%{opacity:1} 50%{opacity:.25} }

        /* scroll bounce */
        @keyframes px-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

        /* ── Hero grid lines ── */
        .px-hero-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        /* ── Service rows ── */
        .px-svc {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 24px 20px; margin: 0 -20px;
          border-radius: 12px;
          border-bottom: 1px solid #F1F5F9;
          cursor: default;
          transition: background .18s;
          position: relative;
        }
        .px-svc:last-child { border-bottom: none; }
        .px-svc::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          border-radius: 0 2px 2px 0;
          background: #2563EB;
          opacity: 0;
          transition: opacity .2s;
        }
        .px-svc:hover { background: #F8FAFC; }
        .px-svc:hover::before { opacity: 1; }
        .px-svc:hover .px-svc-icon  { background: #2563EB !important; color: #fff !important; }
        .px-svc:hover .px-svc-num   { color: #2563EB !important; }
        .px-svc:hover .px-svc-arrow { transform: translate(4px,-4px); opacity: 1 !important; color: #2563EB !important; }
        .px-svc-icon  { transition: background .2s, color .2s; }
        .px-svc-num   { transition: color .2s; }
        .px-svc-arrow { transition: transform .2s, color .2s, opacity .2s; }

        /* ── Process cards ── */
        .px-proc {
          background: #fff; border: 1px solid #E2E8F0; border-radius: 16px;
          padding: 32px 28px;
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
        }
        .px-proc:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(37,99,235,.1);
          border-color: #BFDBFE;
        }
        .px-proc:hover .px-proc-n {
          background: #2563EB !important;
          color: #fff !important;
          border-color: #2563EB !important;
          box-shadow: 0 0 0 4px #DBEAFE !important;
        }
        .px-proc-n { transition: all .25s; }

        /* ── Testimonial cards ── */
        .px-tcard {
          background: #fff; border: 1px solid #E2E8F0; border-radius: 20px;
          padding: 40px; position: relative; overflow: hidden;
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s;
        }
        .px-tcard:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(11,17,32,.08); }

        /* ── Metric cards ── */
        .px-mcard {
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
          border-radius: 16px; padding: 28px 24px;
          transition: background .2s, border-color .2s;
        }
        .px-mcard:hover { background: rgba(255,255,255,.09); border-color: rgba(37,99,235,.4); }

        /* ── CTA box ── */
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

        /* ── Eyebrow ── */
        .px-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: .15em;
          text-transform: uppercase; color: #2563EB;
          font-family: 'Satoshi', sans-serif;
        }
        .px-eyebrow-line { display:inline-block; height:1px; width:16px; background:currentColor; }

        /* ── Stat divider ── */
        .px-stat-sep { border-right: 1px solid rgba(255,255,255,.08); }
        .px-stat-sep:last-child { border-right: none; }

        /* ── Logo hover ── */
        .px-logo { transition: opacity .2s; }
        .px-logo:hover { opacity: .85 !important; }
      `}</style>

      <Layout headerTransparent={false}>

        {/* ════════════════════════════════════════════════════════
            HERO  —  white background, clean design
        ════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: '#fff', paddingTop: '60px', paddingBottom: '20px' }}
        >
          {/* Grid lines - subtle blue */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(37,99,235,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.04) 1px, transparent 1px)',
              backgroundSize: '64px 64px'
            }}
          />

          {/* Radial glow - light blue */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 800, height: 800, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,.08) 0%, transparent 68%)',
              top: '50%', left: '50%', transform: 'translate(-50%, -52%)',
            }}
          />

          {/* Top accent line - blue */}
          <div
            aria-hidden
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,.3) 30%, rgba(37,99,235,.3) 70%, transparent)' }}
          />

          <div className="relative max-w-5xl mx-auto px-6 text-center w-full py-4">

            {/* Chip / badge */}
            <div className="px-h-chip flex justify-center mb-9">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium"
                style={{ borderColor: 'rgba(37,99,235,.3)', background: 'rgba(37,99,235,.08)', color: '#2563EB' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#2563EB', animation: 'px-blink 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(37,99,235,.6)' }}
                />
                <span className="font-satoshi font-medium tracking-wide">Storefront specialists · Custom solutions delivered</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-bold mb-7"
              style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1.0, letterSpacing: '-3px' }}
            >
              <span className="px-h-head block" style={{ color: '#0B1120' }}>We build storefronts</span>
              <span
                className="px-h-head block"
                style={{ color: '#2563EB' }}
              >
                that convert visitors
              </span>
            </h1>

            {/* Sub */}
            <p
              className="px-h-sub font-satoshi text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
              style={{ color: '#64748B' }}
            >
              Custom e-commerce solutions designed to maximise every visit.
              Strategy, design, development, and growth — all under one roof,
              delivered in weeks.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <div className="px-h-cta">
                <Button variant="primary" size="lg" href="/contact">
                  Start Your Project
                  <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </Button>
              </div>
              <div className="px-h-cta">
                <Button variant="ghost" size="lg" href="/work">View Our Work</Button>
              </div>
            </div>
          </div>

          {/* Bottom fade into white */}
          <div
            aria-hidden
            className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }}
          />
        </section>


        {/* ════════════════════════════════════════════════════════
            SERVICES  —  horizontal list rows
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-28 px-6">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div
              className="px-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-10 border-b"
              style={{ borderColor: '#E2E8F0' }}
            >
              <div>
                <div className="px-eyebrow mb-3">
                  <span className="px-eyebrow-line" />
                  What we do
                </div>
                <h2
                  className="font-cabinet-grotesk font-bold"
                  style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', letterSpacing: '-1.8px', color: '#0B1120', lineHeight: 1.06 }}
                >
                  Complete storefront<br />solutions
                </h2>
              </div>
              <div className="flex-shrink-0">
                <Button variant="outline" size="md" href="/services">
                  All services
                  <svg className="ml-1.5 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </Button>
              </div>
            </div>

            {/* Rows */}
            <div className="px-stagger">
              {SERVICES.map((s) => (
                <div key={s.num} className="px-svc">
                  {/* Number */}
                  <span
                    className="px-svc-num font-cabinet-grotesk font-bold text-xs flex-shrink-0 mt-1"
                    style={{ color: '#CBD5E1', letterSpacing: '0.05em', width: 22 }}
                  >
                    {s.num}
                  </span>

                  {/* Icon */}
                  <div
                    className="px-svc-icon w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#F1F5F9', color: '#334155' }}
                  >
                    {s.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <h3
                        className="font-cabinet-grotesk font-bold text-lg"
                        style={{ letterSpacing: '-0.3px', color: '#0B1120' }}
                      >
                        {s.title}
                      </h3>
                      <div className="flex gap-1.5 flex-wrap">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-satoshi text-xs px-2.5 py-0.5 rounded-full"
                            style={{ background: '#F1F5F9', color: '#64748B' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="font-satoshi text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      {s.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="px-svc-arrow w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                    style={{ color: '#CBD5E1', opacity: 0.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            WHY CHOOSE US — white background with blue accents
        ════════════════════════════════════════════════════════ */}
        <section className="py-32 px-6 relative overflow-hidden bg-white">
          
          <div className="relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="px-eyebrow justify-center mb-8">
                <span className="px-eyebrow-line" />
                Why choose us
                <span className="px-eyebrow-line" />
              </div>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-2.5px', color: '#0B1120', lineHeight: 1.02 }}
              >
                Built different.<br />
                <span style={{ color: '#2563EB' }}>Delivered faster.</span>
              </h2>
              <p className="font-satoshi text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#64748B' }}>
                We're not just another agency. Here's what sets us apart from the competition and why leading brands choose us for their most important projects.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="px-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  ),
                  title: 'Lightning Fast Delivery',
                  desc: 'From concept to launch in 4-6 weeks. No endless revisions, no scope creep, just results that matter.'
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      <path d="M13 12h1"/>
                    </svg>
                  ),
                  title: 'Conversion-First Design',
                  desc: 'Every pixel optimized for sales. We design with data and psychology, not just aesthetics.'
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                  title: 'Dedicated Team',
                  desc: 'Your project gets a dedicated team, not freelancers. Direct communication, no middlemen.'
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  title: '90-Day Guarantee',
                  desc: 'Not happy? We\'ll fix it or refund you. Your success is our reputation on the line.'
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                    </svg>
                  ),
                  title: 'Performance Obsessed',
                  desc: 'Sub-2 second load times guaranteed. Fast sites convert better and rank higher.'
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  ),
                  title: 'Complete Handover',
                  desc: 'Full documentation, training, and ongoing support. You own everything, no vendor lock-in.'
                }
              ].map((benefit, i) => (
                <div key={i} className="px-reveal group">
                  <div
                    className="relative p-8 rounded-3xl border transition-all duration-500 hover:transform hover:scale-105 hover:border-blue-500/50 bg-white hover:shadow-xl"
                    style={{ borderColor: '#E2E8F0' }}
                  >
                    {/* Blue gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon with blue gradient background */}
                    <div className="relative mb-6 z-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10"
                        style={{ color: '#fff' }}
                      >
                        {benefit.icon}
                      </div>
                      {/* Blue glow effect - removed blur */}
                      <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                    </div>
                    
                    <h3
                      className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors duration-300 relative z-10"
                      style={{ color: '#0B1120', letterSpacing: '-0.4px' }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="font-satoshi text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300 relative z-10" style={{ color: '#64748B' }}>
                      {benefit.desc}
                    </p>

                    {/* Bottom blue accent line */}
                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border bg-white shadow-sm" style={{ borderColor: '#E2E8F0' }}>
                <span className="font-satoshi text-sm" style={{ color: '#64748B' }}>
                  Ready to experience the difference?
                </span>
                <Button variant="primary" size="md" href="/contact">
                  Let's Talk
                  <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            PROCESS  —  4 white cards on light section
        ════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <div className="px-reveal text-center mb-16">
              <div className="px-eyebrow justify-center mb-3">
                <span className="px-eyebrow-line" />
                Our process
                <span className="px-eyebrow-line" />
              </div>
              <h2
                className="font-cabinet-grotesk font-bold mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 46px)', letterSpacing: '-1.5px', color: '#0B1120' }}
              >
                From vision to live in weeks
              </h2>
              <p className="font-satoshi text-base max-w-lg mx-auto" style={{ color: '#64748B' }}>
                A proven four-step system that delivers on time, on budget, and consistently beyond expectations.
              </p>
            </div>

            {/* Connector line (desktop) */}
            <div className="relative">
              <div
                aria-hidden
                className="hidden lg:block absolute h-px"
                style={{
                  top: 34, left: '12.5%', right: '12.5%',
                  background: 'linear-gradient(90deg, transparent, #BFDBFE 15%, #BFDBFE 85%, transparent)',
                }}
              />

              <div className="px-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PROCESS.map((step, i) => (
                  <div key={step.num} className="px-proc flex flex-col items-center text-center">
                    <div
                      className="px-proc-n w-[68px] h-[68px] rounded-full flex items-center justify-center font-cabinet-grotesk font-bold text-xl mb-6 border-2 relative z-10"
                      style={{
                        background: i === 0 ? '#2563EB' : '#fff',
                        borderColor: i === 0 ? '#2563EB' : '#E2E8F0',
                        color: i === 0 ? '#fff' : '#94A3B8',
                        letterSpacing: '-0.5px',
                        boxShadow: i === 0 ? '0 0 0 5px #DBEAFE' : 'none',
                      }}
                    >
                      {step.num}
                    </div>
                    <h3
                      className="font-cabinet-grotesk font-bold text-lg mb-2"
                      style={{ letterSpacing: '-0.3px', color: '#0B1120' }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-satoshi text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            TRUSTED BY  —  light section
        ════════════════════════════════════════════════════════ */}
        <section
          className="py-16 px-6 border-y"
          style={{ background: '#F8FAFC', borderColor: '#E2E8F0' }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="px-reveal font-satoshi text-xs uppercase tracking-[.14em] mb-10"
              style={{ color: '#94A3B8' }}
            >
              Trusted by growing businesses worldwide
            </p>
            <div className="px-stagger flex flex-wrap items-center justify-center gap-10">
              {(Array.isArray(TRUSTED_LOGOS) && (TRUSTED_LOGOS as any)[0]?.src
                ? TRUSTED_LOGOS
                : FALLBACK_LOGOS
              ).map((logo: any, i: number) => (
                <div
                  key={i}
                  className="px-logo"
                  style={{ opacity: 0.35 }}
                >
                  {typeof logo === 'string'
                    ? <span className="font-cabinet-grotesk font-bold text-base" style={{ color: '#64748B' }}>{logo}</span>
                    : <img src={logo.src} alt={logo.name ?? ''} className="h-7 w-auto" style={{ filter: 'grayscale(100%)' }} />
                  }
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            TESTIMONIALS  —  white cards
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-28 px-6">
          <div className="max-w-5xl mx-auto">

            <div className="px-reveal text-center mb-16">
              <div className="px-eyebrow justify-center mb-3">
                <span className="px-eyebrow-line" />
                Client results
                <span className="px-eyebrow-line" />
              </div>
              <h2
                className="font-cabinet-grotesk font-bold"
                style={{ fontSize: 'clamp(28px, 4vw, 46px)', letterSpacing: '-1.5px', color: '#0B1120' }}
              >
                Real brands. Real revenue.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`px-tcard ${i === 0 ? 'px-left' : 'px-right'}`}>
                  {/* Decorative quote */}
                  <div
                    aria-hidden
                    className="absolute top-3 right-7 select-none pointer-events-none font-cabinet-grotesk font-bold"
                    style={{ fontSize: 130, color: '#F8FAFC', lineHeight: 1 }}
                  >
                    "
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5 relative z-10">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill="#2563EB">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  <p
                    className="font-cabinet-grotesk font-semibold text-xl leading-snug mb-8 relative z-10"
                    style={{ color: '#0B1120', letterSpacing: '-0.3px' }}
                  >
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-cabinet-grotesk font-bold text-sm flex-shrink-0"
                      style={{ background: '#DBEAFE', color: '#2563EB' }}
                    >
                      {t.initials}
                    </div>
                    <div className="flex-1">
                      <p className="font-satoshi font-semibold text-sm" style={{ color: '#0B1120' }}>{t.author}</p>
                      <p className="font-satoshi text-xs" style={{ color: '#94A3B8' }}>{t.role}</p>
                    </div>
                    <span
                      className="font-satoshi text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#DCFCE7', color: '#16A34A' }}
                    >
                      {t.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            CTA  —  dark contained panel
        ════════════════════════════════════════════════════════ */}
        <section
          className="py-16 px-6"
          style={{ background: '#F8FAFC' }}
        >
          <div className="max-w-5xl mx-auto px-reveal">
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