/**
 * Utility functions for Percexa Full Website
 * Form validation, data handling, and common helper functions
 */

import { FormError, ContactFormData, FormState } from '@/app/types';
import { FORM_VALIDATION } from './constants';

// ============================================================================
// Class Name Utilities
// ============================================================================

/**
 * Conditionally join class names together
 * @param classes - Array of class names or conditional objects
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create conditional class names based on variants
 * @param base - Base class names
 * @param variants - Object with variant conditions
 * @param className - Additional class names
 * @returns Combined class string
 */
export function createVariantClasses(
  base: string,
  variants: Record<string, boolean | undefined>,
  className?: string
): string {
  const variantClasses = Object.entries(variants)
    .filter(([, condition]) => condition)
    .map(([variant]) => variant);
  
  return cn(base, ...variantClasses, className);
}

// ============================================================================
// Form Validation Utilities
// ============================================================================

/**
 * Validate a single form field
 * @param field - Field name
 * @param value - Field value
 * @returns FormError if validation fails, null if valid
 */
export function validateField(field: keyof ContactFormData, value: string): FormError | null {
  // Skip validation for optional fields not in FORM_VALIDATION
  if (field === 'source') {
    return null;
  }
  
  const rules = FORM_VALIDATION[field as keyof typeof FORM_VALIDATION];
  
  if (!rules) {
    return null;
  }
  
  // Check required fields
  if (rules.required && (!value || value.trim().length === 0)) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
      type: 'required',
    };
  }
  
  // Skip other validations if field is empty and not required
  if (!value && !rules.required) {
    return null;
  }
  
  // Check minimum length (if rule exists)
  if ('minLength' in rules && rules.minLength && value.length < rules.minLength) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`,
      type: 'length',
    };
  }
  
  // Check maximum length (if rule exists)
  if ('maxLength' in rules && rules.maxLength && value.length > rules.maxLength) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} must be less than ${rules.maxLength} characters`,
      type: 'length',
    };
  }
  
  // Check pattern (if rule exists)
  if ('pattern' in rules && rules.pattern && !rules.pattern.test(value)) {
    return {
      field,
      message: rules.message || `Invalid ${field} format`,
      type: 'format',
    };
  }
  
  return null;
}

/**
 * Validate entire contact form
 * @param data - Form data to validate
 * @returns Array of validation errors
 */
export function validateContactForm(data: ContactFormData): FormError[] {
  const errors: FormError[] = [];
  
  // Validate each field
  (Object.keys(data) as Array<keyof ContactFormData>).forEach((field) => {
    const error = validateField(field, data[field] || '');
    if (error) {
      errors.push(error);
    }
  });
  
  return errors;
}

/**
 * Check if form is valid
 * @param errors - Array of form errors
 * @returns True if form is valid (no errors)
 */
export function isFormValid(errors: FormError[]): boolean {
  return errors.length === 0;
}

/**
 * Get error message for a specific field
 * @param errors - Array of form errors
 * @param field - Field name to get error for
 * @returns Error message or null if no error
 */
export function getFieldError(errors: FormError[], field: string): string | null {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : null;
}

/**
 * Create initial form state
 * @returns Initial FormState object
 */
export function createInitialFormState(): FormState {
  return {
    errors: [],
    isSubmitting: false,
    isValid: false,
  };
}

// ============================================================================
// Data Formatting Utilities
// ============================================================================

/**
 * Format phone number for display
 * @param phone - Raw phone number
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as international number
  if (cleaned.startsWith('92')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
}

/**
 * Format date for display
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Slugify text for URLs
 * @param text - Text to slugify
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// ============================================================================
// URL and Navigation Utilities
// ============================================================================

/**
 * Check if URL is external
 * @param url - URL to check
 * @returns True if URL is external
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Get WhatsApp chat URL
 * @param phone - Phone number
 * @param message - Optional pre-filled message
 * @returns WhatsApp URL
 */
export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Get Gmail compose URL
 * @param email - Email address
 * @param subject - Optional subject
 * @param body - Optional body text
 * @returns Gmail compose URL
 */
export function getGmailComposeUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
  });
  
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  
  return `https://mail.google.com/mail/?${params.toString()}`;
}

// ============================================================================
// Performance and Optimization Utilities
// ============================================================================

/**
 * Debounce function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Create a promise that resolves after specified delay
 * @param ms - Delay in milliseconds
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// Local Storage Utilities
// ============================================================================

/**
 * Safely get item from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Stored value or default
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

// ============================================================================
// Accessibility Utilities
// ============================================================================

/**
 * Generate unique ID for form elements
 * @param prefix - ID prefix
 * @returns Unique ID string
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if element is focusable
 * @param element - DOM element to check
 * @returns True if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  
  return focusableSelectors.some((selector) => element.matches(selector));
}

/**
 * Trap focus within a container
 * @param container - Container element
 * @param event - Keyboard event
 */
export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

// ============================================================================
// Error Handling Utilities
// ============================================================================

/**
 * Create standardized error object
 * @param message - Error message
 * @param code - Error code
 * @param details - Additional error details
 * @returns Standardized error object
 */
export function createError(message: string, code?: string, details?: unknown) {
  return {
    message,
    code,
    details,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Log error with context
 * @param error - Error to log
 * @param context - Additional context
 */
export function logError(error: Error | string, context?: Record<string, unknown>): void {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? undefined : error.stack;
  
  console.error('Application Error:', {
    message: errorMessage,
    stack: errorStack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  });
}