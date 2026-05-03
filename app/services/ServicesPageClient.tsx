'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout } from '@/app/components/layout';
import { Button } from '@/app/components/ui';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES_DATA = [
  {
    num: '01',
    title: 'Storefront Development',
    subtitle: 'Custom Online Stores',
    description: 'We build high-converting storefronts using the latest e-commerce platforms. From Shopify to headless commerce, we create stores that sell.',
    features: [
      'Shopify & Shopify Plus Development',
      'WooCommerce & WordPress',
      'Headless Commerce Solutions',
      'Custom E-commerce Platforms',
      'Payment Gateway Integration',
      'Inventory Management Systems',
    ],
    timeline: '3–8 weeks',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Store Design & UX',
    subtitle: 'Conversion-Focused Design',
    description: 'Beautiful, user-friendly designs that guide customers to purchase. Every element is crafted to maximise conversions and sales.',
    features: [
      'Conversion-Focused Design',
      'Mobile-First Approach',
      'User Experience Research',
      'A/B Testing & Optimisation',
      'Brand Identity Integration',
      'Accessibility Compliance',
    ],
    timeline: '2–4 weeks',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Conversion Optimisation',
    subtitle: 'Data-Driven Growth',
    description: 'Turn more visitors into customers with our proven optimisation strategies. We analyse, test, and improve every aspect of your store.',
    features: [
      'Conversion Rate Analysis',
      'A/B Testing Implementation',
      'Customer Journey Mapping',
      'Checkout Optimisation',
      'Product Page Enhancement',
      'Performance Analytics',
    ],
    timeline: '2–6 weeks ongoing',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Digital Marketing',
    subtitle: 'Traffic & Sales Growth',
    description: 'Drive qualified traffic to your storefront with comprehensive digital marketing strategies that deliver measurable ROI.',
    features: [
      'Search Engine Optimisation',
      'Google Ads & Shopping',
      'Social Media Marketing',
      'Email Marketing Automation',
      'Content Marketing Strategy',
      'Influencer Partnerships',
    ],
    timeline: '2–4 weeks + ongoing',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Mobile Commerce',
    subtitle: 'Mobile-First Shopping',
    description: 'Optimise your storefront for mobile shoppers with responsive design, progressive web apps, and native mobile solutions.',
    features: [
      'Responsive Storefront Design',
      'Progressive Web Apps (PWA)',
      'Mobile App Development',
      'Mobile Payment Integration',
      'Touch-Optimised Interface',
      'Mobile Performance Tuning',
    ],
    timeline: '4–10 weeks',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Store Maintenance',
    subtitle: 'Ongoing Support',
    description: 'Keep your storefront running smoothly with comprehensive maintenance, security updates, and performance optimisation.',
    features: [
      'Regular Security Updates',
      'Performance Monitoring',
      'Content & Product Updates',
      'Bug Fixes & Improvements',
      'Backup & Recovery',
      '24/7 Technical Support',
    ],
    timeline: 'Ongoing monthly',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Free 30-minute strategy call to understand your goals and requirements.',
    color: '#2563EB',
  },
  {
    step: '02',
    title: 'Proposal & Planning',
    description: 'Detailed project proposal with timeline, deliverables, and investment.',
    color: '#3B82F6',
  },
  {
    step: '03',
    title: 'Design & Development',
    description: 'Collaborative process with regular check-ins and milestone reviews.',
    color: '#60A5FA',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'Smooth deployment with comprehensive training and ongoing support.',
    color: '#93C5FD',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.h-badge',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.h-eyebrow',{ opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.h-word',   { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.08 }, '-=0.3')
        .fromTo('.h-sub',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.h-ctas',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.h-stat',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, '-=0.2');

      // ── Section reveals on scroll ──
      gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.scroll-stagger').forEach((parent) => {
        const children = parent.querySelectorAll(':scope > *');
        gsap.fromTo(children,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: parent, start: 'top 82%', once: true },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <style>{`
        /* ── Init hidden ── */
        .h-badge,.h-eyebrow,.h-word,.h-sub,.h-ctas,.h-stat { opacity:0; }

        /* ── Hero split-word wrapper ── */
        .h-words { display:flex; flex-wrap:wrap; justify-content:center; gap:0 12px; perspective:800px; }
        .h-word  { display:inline-block; transform-origin:top center; }

        /* ── Noise texture overlay for hero ── */
        .hero-noise::after {
          content:'';
          position:absolute;inset:0;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:.4;mix-blend-mode:overlay;
        }

        /* ── Animated gradient ring on hero ── */
        @keyframes ring-spin { to { transform:rotate(360deg); } }
        .hero-ring {
          position:absolute;
          width:700px;height:700px;
          border-radius:50%;
          border:1px solid rgba(37,99,235,.08);
          top:50%;left:50%;
          transform:translate(-50%,-50%);
          animation:ring-spin 40s linear infinite;
          pointer-events:none;
        }
        .hero-ring-2 {
          width:900px;height:900px;
          border-color:rgba(37,99,235,.04);
          animation-duration:60s;
          animation-direction:reverse;
        }

        /* ── Stat divider ── */
        .stat-divider { width:1px; background:#E2E8F0; align-self:stretch; }

        /* ── Services grid ── */
        .svc-card {
          background:#fff;
          border:1px solid #E2E8F0;
          border-radius:20px;
          padding:36px 32px;
          transition:border-color .3s, box-shadow .3s, transform .3s cubic-bezier(.22,1,.36,1);
          position:relative;
          overflow:hidden;
        }
        .svc-card::before {
          content:'';
          position:absolute;
          bottom:0;left:0;right:0;
          height:3px;
          background:#2563EB;
          transform:scaleX(0);
          transform-origin:left;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .svc-card:hover { border-color:#BFDBFE; box-shadow:0 16px 48px rgba(37,99,235,.1); transform:translateY(-6px); }
        .svc-card:hover::before { transform:scaleX(1); }
        .svc-card:hover .svc-icon { background:#2563EB; color:#fff; transform:scale(1.08) rotate(4deg); }
        .svc-card:hover .svc-num  { color:#2563EB; }

        .svc-icon {
          width:52px;height:52px;border-radius:14px;
          background:#F1F5F9;color:#334155;
          display:flex;align-items:center;justify-content:center;
          transition:background .3s, color .3s, transform .3s cubic-bezier(.22,1,.36,1);
          margin-bottom:20px;
        }
        .svc-num {
          font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          color:#CBD5E1;margin-bottom:10px;
          transition:color .25s;
          font-family:'Cabinet Grotesk',sans-serif;
        }
        .svc-feature {
          display:flex;align-items:center;gap:8px;
          font-size:13px;color:#64748B;padding:4px 0;
          transition:transform .2s;font-family:'Satoshi',sans-serif;
        }
        .svc-feature:hover { transform:translateX(4px); }
        .svc-feature-dot {
          width:5px;height:5px;border-radius:50%;
          background:#BFDBFE;flex-shrink:0;
          transition:background .2s;
        }
        .svc-feature:hover .svc-feature-dot { background:#2563EB; }

        /* ── Process ── */
        .proc-item {
          display:flex;align-items:flex-start;gap:24px;
          padding:32px 0;
          border-bottom:1px solid #F1F5F9;
          transition:all .25s;
        }
        .proc-item:last-child { border-bottom:none; }
        .proc-item:hover .proc-bubble { background:#2563EB; color:#fff; transform:scale(1.1); }
        .proc-item:hover .proc-title  { color:#2563EB; }
        .proc-bubble {
          width:52px;height:52px;border-radius:50%;
          background:#EFF6FF;color:#2563EB;
          display:flex;align-items:center;justify-content:center;
          font-family:'Cabinet Grotesk',sans-serif;
          font-weight:700;font-size:16px;flex-shrink:0;
          transition:background .25s,color .25s,transform .25s cubic-bezier(.22,1,.36,1);
        }
        .proc-title {
          font-family:'Cabinet Grotesk',sans-serif;
          font-size:19px;font-weight:700;letter-spacing:-.3px;
          color:#0B1120;margin-bottom:6px;transition:color .25s;
        }
        .proc-line {
          position:absolute;left:25px;top:52px;bottom:0;
          width:2px;background:linear-gradient(to bottom,#BFDBFE,transparent);
        }

        /* ── CTA section ── */
        .cta-wrap {
          background:#0B1120;border-radius:28px;
          padding:72px 56px;text-align:center;
          position:relative;overflow:hidden;
        }
        .cta-wrap::before {
          content:'';
          position:absolute;
          width:500px;height:500px;
          border-radius:50%;
          background:radial-gradient(circle,rgba(37,99,235,.15) 0%,transparent 70%);
          top:-120px;right:-120px;pointer-events:none;
        }
        .cta-wrap::after {
          content:'';
          position:absolute;
          width:400px;height:400px;
          border-radius:50%;
          background:radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%);
          bottom:-100px;left:-100px;pointer-events:none;
        }

        /* ── Label pill ── */
        .section-pill {
          display:inline-flex;align-items:center;gap:10px;
          font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;
          color:#2563EB;margin-bottom:16px;
          font-family:'Satoshi',sans-serif;
        }
        .section-pill span { display:inline-block;height:1px;width:20px;background:#2563EB; }
      `}</style>

      <Layout headerTransparent={false}>

        {/* ════════════════════════════════════════════════════════
            HERO — White background with clean design
        ════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white" style={{ paddingTop: '60px', paddingBottom: '20px' }}>

          {/* Grid lines */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage:'linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px)', backgroundSize:'80px 80px' }} />

          {/* Glow blob */}
          <div aria-hidden="true" className="absolute pointer-events-none" style={{ width:640, height:640, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-60%)' }} />

          <div className="relative max-w-6xl mx-auto px-6 py-4 w-full">

            {/* Top badge */}
            <div className="h-badge flex justify-center mb-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium" style={{ borderColor:'rgba(37,99,235,.3)', background:'rgba(37,99,235,.08)', color:'#2563EB' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:'#2563EB', boxShadow:'0 0 6px #2563EB' }} />
                <span className="font-satoshi tracking-wide">6 service verticals · end-to-end delivery</span>
              </div>
            </div>

            {/* Eyebrow */}
            <p className="h-eyebrow text-center font-satoshi text-xs font-semibold uppercase tracking-[.18em] mb-6" style={{ color:'#64748B' }}>
              What we do
            </p>

            {/* Headline — split words */}
            <h1 className="h-words font-cabinet-grotesk font-bold text-center mb-8" style={{ fontSize:'clamp(52px,7.5vw,100px)', lineHeight:.98, letterSpacing:'-3.5px', color:'#0B1120' }}>
              {['Services', 'that', 'drive'].map((w, i) => (
                <span key={i} className="h-word">{w}</span>
              ))}
              <br />
              {['storefront'].map((w, i) => (
                <span key={i} className="h-word">{w}</span>
              ))}
              &nbsp;
              <span className="h-word" style={{ color:'#2563EB' }}>success.</span>
            </h1>

            {/* Sub */}
            <p className="h-sub font-satoshi text-center text-xl leading-relaxed max-w-2xl mx-auto mb-12" style={{ color:'#64748B' }}>
              From design to development, marketing to maintenance — comprehensive storefront solutions that convert visitors into loyal customers.
            </p>

            {/* CTAs */}
            <div className="h-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Button variant="primary" size="lg" href="/contact">
                Start Your Project
                <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button variant="ghost" size="lg" href="/work">View Our Work</Button>
            </div>

          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background:'linear-gradient(to bottom,transparent,#F8FAFC)' }} />
        </section>


        {/* ════════════════════════════════════════════════════════
            SERVICES GRID — 3-col masonry-feel
        ════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background:'#F8FAFC' }}>
          <div className="max-w-6xl mx-auto">

            <div className="scroll-reveal text-center mb-20">
              <div className="section-pill"><span />Service categories<span /></div>
              <h2 className="font-cabinet-grotesk font-bold mb-5" style={{ fontSize:'clamp(32px,4.5vw,54px)', letterSpacing:'-2px', color:'#0B1120', lineHeight:1.06 }}>
                Everything you need<br />to win online
              </h2>
              <p className="font-satoshi text-lg max-w-xl mx-auto" style={{ color:'#64748B' }}>
                From initial concept to ongoing growth, we provide solutions that drive real, measurable results.
              </p>
            </div>

            <div className="scroll-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((svc) => (
                <div key={svc.num} className="svc-card">
                  <div className="svc-num">{svc.num}</div>
                  <div className="svc-icon">{svc.icon}</div>

                  <div className="font-satoshi text-xs font-semibold uppercase tracking-[.1em] mb-2" style={{ color:'#2563EB' }}>{svc.subtitle}</div>
                  <h3 className="font-cabinet-grotesk font-bold text-xl mb-4" style={{ letterSpacing:'-.4px', color:'#0B1120' }}>{svc.title}</h3>
                  <p className="font-satoshi text-sm leading-relaxed mb-6" style={{ color:'#64748B' }}>{svc.description}</p>

                  <div className="space-y-0.5 mb-6">
                    {svc.features.map((f) => (
                      <div key={f} className="svc-feature">
                        <div className="svc-feature-dot" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor:'#F1F5F9' }}>
                    <div>
                      <div className="font-satoshi text-xs" style={{ color:'#94A3B8' }}>Timeline</div>
                      <div className="font-satoshi text-sm font-semibold" style={{ color:'#0B1120' }}>{svc.timeline}</div>
                    </div>
                    <a href="/contact" className="inline-flex items-center gap-1.5 font-satoshi text-sm font-semibold" style={{ color:'#2563EB' }}>
                      Get started
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            PROCESS — Left timeline, right detail
        ════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Left: text */}
              <div className="scroll-reveal lg:sticky lg:top-28">
                <div className="section-pill"><span />Our process</div>
                <h2 className="font-cabinet-grotesk font-bold mb-6" style={{ fontSize:'clamp(32px,4.5vw,52px)', letterSpacing:'-2px', color:'#0B1120', lineHeight:1.05 }}>
                  How we work<br />
                  <span style={{ color:'#2563EB' }}>together</span>
                </h2>
                <p className="font-satoshi text-lg leading-relaxed mb-10" style={{ color:'#64748B' }}>
                  Our streamlined process ensures clear communication, timely delivery, and exceptional results at every stage — from the first call to long after launch.
                </p>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v:'30 min', l:'Free strategy call' },
                    { v:'6 wks',  l:'Avg. time to launch' },
                    { v:'100%',   l:'On-time delivery' },
                    { v:'90 day',l:'Post-launch support' },
                  ].map((s, i) => (
                    <div key={i} className="p-5 rounded-xl border" style={{ borderColor:'#E2E8F0', background:'#F8FAFC' }}>
                      <div className="font-cabinet-grotesk font-bold text-2xl mb-1" style={{ letterSpacing:'-1px', color:'#2563EB' }}>{s.v}</div>
                      <div className="font-satoshi text-xs" style={{ color:'#64748B' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: steps */}
              <div className="scroll-stagger">
                  {PROCESS_STEPS.map((step) => (
                    <div key={step.step} className="proc-item" style={{ position:'relative' }}>
                      {PROCESS_STEPS.indexOf(step) < PROCESS_STEPS.length - 1 && (
                        <div className="proc-line" />
                      )}
                      <div className="proc-bubble">{step.step}</div>
                      <div style={{ flex:1 }}>
                        <div className="proc-title">{step.title}</div>
                        <p className="font-satoshi text-base leading-relaxed" style={{ color:'#64748B' }}>{step.description}</p>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            CTA — Dark card
        ════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ background:'#F8FAFC' }}>
          <div className="max-w-5xl mx-auto scroll-reveal">
            <div className="cta-wrap">
              <div className="relative z-10">
                <div className="section-pill justify-center" style={{ color:'#60A5FA' }}>
                  <span style={{ background:'#334155' }} />
                  Ready to get started?
                  <span style={{ background:'#334155' }} />
                </div>

                <h2 className="font-cabinet-grotesk font-bold text-white mb-5" style={{ fontSize:'clamp(36px,5vw,60px)', letterSpacing:'-2.5px', lineHeight:1.02 }}>
                  Let's build your{' '}
                  <span style={{ color:'#2563EB' }}>perfect storefront</span>
                </h2>

                <p className="font-satoshi text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color:'#64748B' }}>
                  Ready to transform your storefront into a sales machine? Let's discuss your project and create a store that converts.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                  <Button variant="primary" size="lg" href="/contact">
                    Start Your Project
                    <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="lg" href="/work">View Our Portfolio</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </div>
  );
}