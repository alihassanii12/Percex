'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Layout } from '@/app/components/layout';
import { Button } from '@/app/components/ui';

// Schedule Page Client Component
export default function SchedulePageClient() {
  const [selectedDuration, setSelectedDuration] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP Timeline for hero section
    const heroTl = gsap.timeline();

    heroTl.fromTo('.gsap-hero-badge', 
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.gsap-hero-title', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo('.gsap-hero-desc', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
      '-=0.4'
    );

    // Animate duration cards
    if (cardsRef.current) {
      gsap.fromTo('.gsap-duration-card', 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          ease: 'back.out(1.7)',
          stagger: 0.1,
          delay: 0.5
        }
      );
    }

    return () => {
      heroTl.kill();
    };
  }, []);

  // Animate form when it appears
  useEffect(() => {
    if (selectedDuration && formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [selectedDuration]);

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Scheduling data:', { ...formData, duration: selectedDuration });
    alert('Meeting scheduled successfully! We will send you a confirmation email shortly.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      message: '',
      preferredDate: '',
      preferredTime: ''
    });
    setSelectedDuration('');
  };

  return (
    <div ref={containerRef}>
      <style>{`
        /* ─── GSAP Animation Base Styles ─── */
        .gsap-hero-badge,
        .gsap-hero-title,
        .gsap-hero-desc,
        .gsap-duration-card {
          opacity: 0;
        }

        /* ─── Duration Cards ─── */
        .duration-card {
          transition: all .4s cubic-bezier(.22,1,.36,1);
          border-radius: 20px;
          border: 2px solid #E2E8F0;
          background: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .duration-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2563EB, #3B82F6);
          transform: scaleX(0);
          transition: transform .4s cubic-bezier(.22,1,.36,1);
        }
        .duration-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.15);
          border-color: #BFDBFE;
        }
        .duration-card:hover::before {
          transform: scaleX(1);
        }
        .duration-card.selected {
          border-color: #2563EB;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.2);
        }
        .duration-card.selected::before {
          transform: scaleX(1);
        }
        .duration-card:hover .duration-icon {
          transform: scale(1.2) rotate(5deg);
          color: #2563EB;
        }
        .duration-card.selected .duration-icon {
          color: #2563EB;
          transform: scale(1.2) rotate(5deg);
        }
        .duration-icon {
          transition: all .4s cubic-bezier(.22,1,.36,1);
        }
        .duration-badge {
          transition: all .3s ease;
        }
        .duration-card.selected .duration-badge {
          background: #2563EB;
          color: #fff;
          transform: scale(1.05);
        }

        {/* ─── Form Styles ─── */
        .form-input, .form-select, .form-textarea {
          transition: all .3s ease;
          border: 2px solid #E2E8F0;
          background: #fff;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          outline: none;
        }
        .form-input:hover, .form-select:hover, .form-textarea:hover {
          border-color: #BFDBFE;
        }
        
        /* ─── Form Container ─── */
        .form-container {
          background: linear-gradient(135deg, #fff 0%, #F8FAFC 100%);
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        /* ─── Submit Button ─── */
        .submit-button {
          position: relative;
          overflow: hidden;
          transition: all .3s cubic-bezier(.22,1,.36,1);
        }
        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left .6s ease-in-out;
        }
        .submit-button:hover::before {
          left: 100%;
        }
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(37, 99, 235, 0.4);
        }
      `}</style>

      {/* Intersection Observer script - DISABLED */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Animation disabled - content shows immediately
          console.log('Animations disabled for better navigation experience');
        `
      }} />

      <Layout headerTransparent={false}>
        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden">
          <div className="w-full h-px" style={{ background: 'linear-gradient(90deg,transparent,#BFDBFE 30%,#BFDBFE 70%,transparent)' }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(#E2E8F0 1px,transparent 1px)', backgroundSize:'32px 32px', opacity:.4 }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 70% 60% at 50% 40%,#fff 30%,transparent 100%)' }} />

          <div className="relative max-w-4xl mx-auto px-6 text-center pt-20 pb-16">
            <div className="gsap-hero-badge inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-sm font-medium" style={{ borderColor:'#BFDBFE', background:'#EFF6FF', color:'#2563EB' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:'#2563EB' }} />
              <span className="font-satoshi tracking-wide">Free consultation available</span>
            </div>

            <h1 className="gsap-hero-title font-cabinet-grotesk font-bold tracking-tight mb-6" style={{ fontSize:'clamp(40px,6vw,64px)', lineHeight:1.05, letterSpacing:'-2.5px', color:'#0B1120' }}>
              Schedule Your<br />
              <span style={{ color:'#2563EB' }}>Consultation</span>
            </h1>

            <p className="gsap-hero-desc font-satoshi text-xl leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color:'#64748B' }}>
              Choose your preferred meeting duration and let's discuss how we can help bring your project to life.
            </p>
          </div>
          <div className="w-full h-px" style={{ background:'#E2E8F0' }} />
        </section>

        {/* ══════════════════════════════════════════════════════════
            DURATION SELECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto" ref={cardsRef}>
            <div className="text-center mb-12">
              <h2 className="font-cabinet-grotesk font-bold mb-4" style={{ fontSize:'clamp(28px,4vw,40px)', letterSpacing:'-1.5px', color:'#0B1120' }}>
                Select Meeting Duration
              </h2>
              <p className="font-satoshi text-lg" style={{ color:'#64748B' }}>
                Choose the duration that best fits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { 
                  duration: '15min', 
                  title: '15 Minutes', 
                  price: 'Free', 
                  description: 'Perfect for quick questions and initial project overview',
                  features: ['Project scope discussion', 'Basic timeline estimate', 'Technology recommendations'],
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                    </svg>
                  )
                },
                { 
                  duration: '30min', 
                  title: '30 Minutes', 
                  price: 'Free', 
                  description: 'Comprehensive discussion about your project requirements',
                  features: ['Detailed requirements analysis', 'Technical architecture planning', 'Budget and timeline discussion', 'Q&A session'],
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  )
                },
                { 
                  duration: '60min', 
                  title: '60 Minutes', 
                  price: 'Paid', 
                  description: 'Deep-dive consultation with comprehensive technical planning',
                  features: ['Complete project strategy', 'Technical documentation review', 'Risk assessment & mitigation', 'Detailed roadmap creation', 'Team structure planning'],
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                  )
                }
              ].map((option, index) => (
                <div
                  key={option.duration}
                  onClick={() => handleDurationSelect(option.duration)}
                  className={`gsap-duration-card duration-card p-8 text-center ${
                    selectedDuration === option.duration ? 'selected' : ''
                  }`}
                >
                  <div className="duration-icon mb-6 flex justify-center" style={{ color:'#64748B' }}>
                    {option.icon}
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <h3 className="font-cabinet-grotesk font-bold text-xl" style={{ color:'#0B1120' }}>
                      {option.title}
                    </h3>
                    <span className={`duration-badge px-3 py-1 rounded-full text-xs font-semibold ${
                      option.price === 'Free' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {option.price}
                    </span>
                  </div>
                  
                  <p className="font-satoshi text-sm leading-relaxed mb-6" style={{ color:'#64748B' }}>
                    {option.description}
                  </p>
                  
                  <div className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-left">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                        <span className="font-satoshi text-sm" style={{ color:'#64748B' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedDuration === '60min' && (
              <div className="mb-12 p-6 rounded-xl border-2 border-orange-200" style={{ background:'#FFF7ED' }}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="font-cabinet-grotesk font-bold text-orange-800">
                    Premium Consultation
                  </p>
                </div>
                <p className="font-satoshi text-sm text-orange-700 text-center">
                  60-minute consultations are premium sessions with detailed technical planning. Payment information will be provided after scheduling.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CONTACT FORM
        ══════════════════════════════════════════════════════════ */}
        {selectedDuration && (
          <section className="py-20 px-6" style={{ background:'#F8FAFC' }}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-cabinet-grotesk font-bold mb-4" style={{ fontSize:'clamp(28px,4vw,40px)', letterSpacing:'-1.5px', color:'#0B1120' }}>
                  Your Details
                </h2>
                <p className="font-satoshi text-lg" style={{ color:'#64748B' }}>
                  Please provide your information to schedule the {selectedDuration.replace('min', '-minute')} consultation
                </p>
              </div>

              <form onSubmit={handleSubmit} className="form-container space-y-8 p-10 rounded-3xl" ref={formRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="form-select w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                  >
                    <option value="">Select your project type</option>
                    <option value="web-development">Web Development</option>
                    <option value="ecommerce">E-Commerce Store</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="maintenance">Website Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="form-input w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="form-select w-full px-5 py-4 rounded-xl font-satoshi text-sm"
                    >
                      <option value="">Select preferred time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-satoshi text-sm font-semibold mb-3" style={{ color:'#0B1120' }}>
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="form-textarea w-full px-5 py-4 rounded-xl font-satoshi text-sm resize-none"
                    placeholder="Tell us about your project requirements, goals, budget range, and any specific questions you have..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1 submit-button"
                  >
                    Schedule {selectedDuration.replace('min', '-Minute')} Meeting
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    href="/contact"
                  >
                    Back to Contact
                  </Button>
                </div>
              </form>
            </div>
          </section>
        )}

      </Layout>
    </div>
  );
}