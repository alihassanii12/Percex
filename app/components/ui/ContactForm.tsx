/**
 * ContactForm Component
 * 
 * A comprehensive contact form with validation, error handling,
 * and accessibility features.
 */

'use client';

import React, { useState, useCallback } from 'react';
import { ContactFormProps, ContactFormData, FormError } from '@/app/types';
import { validateContactForm, cn, generateId } from '@/app/lib/utils';
import Button from './Button';

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className,
}) => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate unique IDs for form fields
  const fieldIds = {
    name: generateId('name'),
    email: generateId('email'),
    company: generateId('company'),
    message: generateId('message'),
  };

  // Handle input changes
  const handleInputChange = useCallback((
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (errors.some(error => error.field === field)) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  }, [errors]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateContactForm(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // Focus on first error field
      const firstErrorField = validationErrors[0].field;
      const fieldElement = document.getElementById(fieldIds[firstErrorField as keyof typeof fieldIds]);
      fieldElement?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      await onSubmit(formData);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error) {
      setErrors([{
        field: 'form',
        message: 'Failed to send message. Please try again.',
        type: 'custom',
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get error message for a field
  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  // Check if field has error
  const hasFieldError = (field: string) => {
    return errors.some(error => error.field === field);
  };

  // Form container styles
  const formStyles = cn(
    'space-y-6',
    className
  );

  // Field container styles
  const fieldStyles = 'space-y-2';

  // Label styles
  const labelStyles = cn(
    'block',
    'font-satoshi',
    'font-medium',
    'text-sm',
    'text-soft-gray',
    'mb-2'
  );

  // Input base styles
  const inputBaseStyles = cn(
    'w-full',
    'px-4',
    'py-3',
    'bg-slate-blue/10',
    'border',
    'border-slate-blue/20',
    'rounded-lg',
    'text-soft-gray',
    'font-satoshi',
    'placeholder-muted-steel',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-electric-blue',
    'focus:border-electric-blue',
    'hover:border-slate-blue/40'
  );

  // Input error styles
  const inputErrorStyles = cn(
    'border-red-500',
    'focus:ring-red-500',
    'focus:border-red-500'
  );

  // Error message styles
  const errorStyles = cn(
    'text-red-400',
    'text-sm',
    'font-satoshi',
    'mt-1',
    'flex',
    'items-center',
    'space-x-1'
  );

  // Success message styles
  const successStyles = cn(
    'p-4',
    'bg-green-500/10',
    'border',
    'border-green-500/20',
    'rounded-lg',
    'text-green-400',
    'font-satoshi',
    'text-center'
  );

  if (isSubmitted) {
    return (
      <div className={successStyles}>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Message sent successfully!</span>
        </div>
        <p className="text-sm">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formStyles} noValidate>
      {/* Form-level error */}
      {errors.some(error => error.field === 'form') && (
        <div className={errorStyles}>
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{getFieldError('form')}</span>
        </div>
      )}

      {/* Name Field */}
      <div className={fieldStyles}>
        <label htmlFor={fieldIds.name} className={labelStyles}>
          Name *
        </label>
        <input
          type="text"
          id={fieldIds.name}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={cn(
            inputBaseStyles,
            hasFieldError('name') && inputErrorStyles
          )}
          placeholder="Your full name"
          required
          aria-describedby={hasFieldError('name') ? `${fieldIds.name}-error` : undefined}
          aria-invalid={hasFieldError('name')}
        />
        {hasFieldError('name') && (
          <div id={`${fieldIds.name}-error`} className={errorStyles} role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{getFieldError('name')}</span>
          </div>
        )}
      </div>

      {/* Email Field */}
      <div className={fieldStyles}>
        <label htmlFor={fieldIds.email} className={labelStyles}>
          Email *
        </label>
        <input
          type="email"
          id={fieldIds.email}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={cn(
            inputBaseStyles,
            hasFieldError('email') && inputErrorStyles
          )}
          placeholder="your.email@example.com"
          required
          aria-describedby={hasFieldError('email') ? `${fieldIds.email}-error` : undefined}
          aria-invalid={hasFieldError('email')}
        />
        {hasFieldError('email') && (
          <div id={`${fieldIds.email}-error`} className={errorStyles} role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{getFieldError('email')}</span>
          </div>
        )}
      </div>

      {/* Company Field */}
      <div className={fieldStyles}>
        <label htmlFor={fieldIds.company} className={labelStyles}>
          Company
        </label>
        <input
          type="text"
          id={fieldIds.company}
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className={cn(
            inputBaseStyles,
            hasFieldError('company') && inputErrorStyles
          )}
          placeholder="Your company name (optional)"
          aria-describedby={hasFieldError('company') ? `${fieldIds.company}-error` : undefined}
          aria-invalid={hasFieldError('company')}
        />
        {hasFieldError('company') && (
          <div id={`${fieldIds.company}-error`} className={errorStyles} role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{getFieldError('company')}</span>
          </div>
        )}
      </div>

      {/* Message Field */}
      <div className={fieldStyles}>
        <label htmlFor={fieldIds.message} className={labelStyles}>
          Message *
        </label>
        <textarea
          id={fieldIds.message}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={cn(
            inputBaseStyles,
            'min-h-[120px]',
            'resize-y',
            hasFieldError('message') && inputErrorStyles
          )}
          placeholder="Tell us about your project..."
          required
          rows={5}
          aria-describedby={hasFieldError('message') ? `${fieldIds.message}-error` : undefined}
          aria-invalid={hasFieldError('message')}
        />
        {hasFieldError('message') && (
          <div id={`${fieldIds.message}-error`} className={errorStyles} role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{getFieldError('message')}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sending...</span>
          </div>
        ) : (
          'Send Message'
        )}
      </Button>

      {/* Form Footer */}
      <p className="text-sm text-muted-steel font-satoshi text-center">
        We'll get back to you within 24 hours.
      </p>
    </form>
  );
};

export default ContactForm;