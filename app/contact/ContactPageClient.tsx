'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Layout } from '@/app/components/layout';
import { Button } from '@/app/components/ui';

// Contact Page Client Component
export default function ContactPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    projectDetails: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleCardClick = (duration: string) => {
    setSelectedDuration(duration);
    setShowForm(true);
    setSubmitStatus('idle');
    
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('booking-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          duration: selectedDuration,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          projectDetails: '',
          preferredDate: '',
          preferredTime: '',
        });
        // Hide form after 3 seconds
        setTimeout(() => {
          setShowForm(false);
          setSelectedDuration(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP Timeline for smooth animations
    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.fromTo('.gsap-hero-badge', 
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
    )
    .fromTo('.gsap-hero-buttons', 
      { opacity: 0, y: 30 },
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
        .gsap-hero-badge,
        .gsap-hero-title,
        .gsap-hero-desc,
        .gsap-hero-buttons {
          opacity: 0;
        }

        /* ─── Enhanced Button Animations ─── */
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all .3s cubic-bezier(.22,1,.36,1);
        }
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left .6s ease-in-out;
        }
        .cta-button:hover::before {
          left: 100%;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
        }
      `}</style>

      {/* GSAP Animation Script - No longer needed, handled in useEffect */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // GSAP animations handled in React useEffect
          console.log('GSAP animations initialized');
        `
      }} />

      <Layout headerTransparent={false}>
        {/* ══════════════════════════════════════════════════════════
            MEETING DURATION SELECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-4 px-6 bg-white" style={{ paddingTop: '60px', paddingBottom: '20px' }}>
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="font-bold tracking-tight mb-6" style={{ fontSize:'clamp(32px,5vw,48px)', lineHeight:1.05, letterSpacing:'-1.5px', color:'#0B1120' }}>
                Select Meeting Duration
              </h1>
              
              <p className="font-satoshi text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#64748B' }}>
                Choose the duration that best fits your needs
              </p>
            </div>

            {/* 3 Duration Cards - Smaller Size */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 15 Minutes */}
              <div 
                className={`p-4 rounded-lg border-2 bg-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedDuration === '15' ? 'border-blue-500 shadow-lg' : ''}`} 
                style={{ borderColor: selectedDuration === '15' ? '#2563EB' : '#E2E8F0' }}
                onClick={() => handleCardClick('15')}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: '#F1F5F9', color: '#64748B' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#0B1120', letterSpacing: '-0.5px' }}>
                    15 Minutes
                  </h3>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                    Free
                  </span>
                </div>
                
                <p className="font-satoshi text-sm leading-relaxed mb-3" style={{ color: '#64748B' }}>
                  Quick questions and project overview
                </p>
                
                <div className="space-y-1 text-left mb-3">
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Project scope discussion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Basic timeline estimate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Technology recommendations</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full text-xs py-2"
                >
                  Select 15 Minutes
                </Button>
              </div>

              {/* 30 Minutes */}
              <div 
                className={`p-4 rounded-lg border bg-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${selectedDuration === '30' ? 'border-blue-500 shadow-lg' : ''}`} 
                style={{ borderColor: selectedDuration === '30' ? '#2563EB' : '#E2E8F0' }}
                onClick={() => handleCardClick('30')}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: '#F1F5F9', color: '#64748B' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#0B1120', letterSpacing: '-0.5px' }}>
                    30 Minutes
                  </h3>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                    Free
                  </span>
                </div>
                
                <p className="font-satoshi text-sm leading-relaxed mb-3" style={{ color: '#64748B' }}>
                  Comprehensive project requirements
                </p>
                
                <div className="space-y-1 text-left mb-3">
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Requirements analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Architecture planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Budget discussion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Q&A session</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs py-2"
                >
                  Select 30 Minutes
                </Button>
              </div>

              {/* 60 Minutes */}
              <div 
                className={`p-4 rounded-lg border bg-white text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${selectedDuration === '60' ? 'border-blue-500 shadow-lg' : ''}`} 
                style={{ borderColor: selectedDuration === '60' ? '#2563EB' : '#E2E8F0' }}
                onClick={() => handleCardClick('60')}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: '#F1F5F9', color: '#64748B' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                  </svg>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#0B1120', letterSpacing: '-0.5px' }}>
                    60 Minutes
                  </h3>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium" style={{ background: '#FEF3C7', color: '#D97706' }}>
                    Paid
                  </span>
                </div>
                
                <p className="font-satoshi text-sm leading-relaxed mb-3" style={{ color: '#64748B' }}>
                  Deep-dive technical planning
                </p>
                
                <div className="space-y-1 text-left mb-3">
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Complete project strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Documentation review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Risk assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Roadmap creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span className="font-satoshi text-xs" style={{ color: '#64748B' }}>Team planning</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs py-2"
                >
                  Select 60 Minutes
                </Button>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BOOKING FORM (Shows when a duration is selected)
        ══════════════════════════════════════════════════════════ */}
        {showForm && (
          <section id="booking-form" className="py-16 px-6 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="font-bold text-2xl mb-3" style={{ color: '#0B1120', letterSpacing: '-0.5px' }}>
                  Book Your {selectedDuration} Minute Meeting
                </h2>
                <p className="font-satoshi text-base" style={{ color: '#64748B' }}>
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              {/* Booking Form */}
              <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ borderColor: '#E2E8F0' }}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ borderColor: '#E2E8F0' }}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Company and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ borderColor: '#E2E8F0' }}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ borderColor: '#E2E8F0' }}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ borderColor: '#E2E8F0' }}
                    >
                      <option value="">Select project type</option>
                      <option value="new-storefront">New Storefront Development</option>
                      <option value="redesign">Storefront Redesign</option>
                      <option value="optimization">Conversion Optimization</option>
                      <option value="maintenance">Store Maintenance & Support</option>
                      <option value="migration">Platform Migration</option>
                      <option value="mobile-commerce">Mobile Commerce Development</option>
                      <option value="payment-integration">Payment Gateway Integration</option>
                      <option value="inventory-management">Inventory Management System</option>
                      <option value="custom-features">Custom Features Development</option>
                      <option value="api-integration">API & Third-party Integration</option>
                      <option value="performance">Performance Optimization</option>
                      <option value="seo">SEO & Digital Marketing</option>
                      <option value="security">Security Audit & Enhancement</option>
                      <option value="analytics">Analytics & Reporting Setup</option>
                      <option value="training">Team Training & Documentation</option>
                      <option value="consultation">General Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                      Project Details *
                    </label>
                    <textarea
                      name="projectDetails"
                      required
                      rows={4}
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      style={{ borderColor: '#E2E8F0' }}
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block font-medium text-sm mb-2" style={{ color: '#0B1120' }}>
                      Preferred Meeting Time
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          style={{ borderColor: '#E2E8F0', colorScheme: 'light' }}
                        />
                      </div>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ borderColor: '#E2E8F0' }}
                      >
                        <option value="">Select time</option>
                        <option value="9am">9:00 AM</option>
                        <option value="10am">10:00 AM</option>
                        <option value="11am">11:00 AM</option>
                        <option value="12pm">12:00 PM</option>
                        <option value="1pm">1:00 PM</option>
                        <option value="2pm">2:00 PM</option>
                        <option value="3pm">3:00 PM</option>
                        <option value="4pm">4:00 PM</option>
                        <option value="5pm">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full cta-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : `Book ${selectedDuration} Minute Meeting`}
                    </Button>
                  </div>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-green-800 text-sm font-medium text-center">
                        ✓ Booking request sent successfully! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-red-800 text-sm font-medium text-center">
                        ✗ Failed to send booking request. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  {/* Note */}
                  <p className="text-xs text-center" style={{ color: '#64748B' }}>
                    We'll send you a calendar invite within 24 hours with meeting details
                  </p>

                </form>
              </div>
            </div>
          </section>
        )}

      </Layout>
    </div>
)}