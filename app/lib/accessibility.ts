/**
 * Accessibility Utility Functions
 * 
 * Helper functions for implementing WCAG AA compliance,
 * keyboard navigation, and screen reader support.
 */

// ============================================================================
// ARIA Utilities
// ============================================================================

/**
 * Generate ARIA attributes for form fields
 * @param fieldId - Unique field identifier
 * @param hasError - Whether field has validation error
 * @param isRequired - Whether field is required
 * @returns ARIA attributes object
 */
export function generateFieldAriaAttributes(
  fieldId: string,
  hasError: boolean = false,
  isRequired: boolean = false
) {
  return {
    'aria-invalid': hasError,
    'aria-required': isRequired,
    ...(hasError && { 'aria-describedby': `${fieldId}-error` }),
  };
}

/**
 * Generate ARIA attributes for buttons
 * @param isPressed - Whether button is in pressed state
 * @param isExpanded - Whether button controls expanded content
 * @param controls - ID of element controlled by button
 * @returns ARIA attributes object
 */
export function generateButtonAriaAttributes(
  isPressed?: boolean,
  isExpanded?: boolean,
  controls?: string
) {
  return {
    ...(typeof isPressed === 'boolean' && { 'aria-pressed': isPressed }),
    ...(typeof isExpanded === 'boolean' && { 'aria-expanded': isExpanded }),
    ...(controls && { 'aria-controls': controls }),
  };
}

/**
 * Generate ARIA attributes for navigation
 * @param current - Whether item is current page
 * @param label - Accessible label for navigation
 * @returns ARIA attributes object
 */
export function generateNavAriaAttributes(
  current: boolean = false,
  label?: string
) {
  return {
    ...(current && { 'aria-current': 'page' as const }),
    ...(label && { 'aria-label': label }),
  };
}

/**
 * Generate ARIA attributes for modal dialogs
 * @param labelledBy - ID of element that labels the modal
 * @param describedBy - ID of element that describes the modal
 * @returns ARIA attributes object
 */
export function generateModalAriaAttributes(
  labelledBy?: string,
  describedBy?: string
) {
  return {
    role: 'dialog' as const,
    'aria-modal': true,
    ...(labelledBy && { 'aria-labelledby': labelledBy }),
    ...(describedBy && { 'aria-describedby': describedBy }),
  };
}

// ============================================================================
// Keyboard Navigation Utilities
// ============================================================================

/**
 * Handle keyboard navigation for menus and lists
 * @param event - Keyboard event
 * @param items - Array of focusable elements
 * @param currentIndex - Current focused item index
 * @param onIndexChange - Callback when index changes
 */
export function handleArrowKeyNavigation(
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void
) {
  const { key } = event;
  
  if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
    return;
  }
  
  event.preventDefault();
  
  let newIndex = currentIndex;
  
  switch (key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      break;
    case 'ArrowDown':
    case 'ArrowRight':
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = items.length - 1;
      break;
  }
  
  onIndexChange(newIndex);
  items[newIndex]?.focus();
}

/**
 * Handle escape key for closing modals and menus
 * @param event - Keyboard event
 * @param onEscape - Callback when escape is pressed
 */
export function handleEscapeKey(
  event: KeyboardEvent,
  onEscape: () => void
) {
  if (event.key === 'Escape') {
    event.preventDefault();
    onEscape();
  }
}

/**
 * Handle enter and space key for button activation
 * @param event - Keyboard event
 * @param onActivate - Callback when button is activated
 */
export function handleButtonActivation(
  event: KeyboardEvent,
  onActivate: () => void
) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onActivate();
  }
}

// ============================================================================
// Focus Management Utilities
// ============================================================================

/**
 * Get all focusable elements within a container
 * @param container - Container element
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');
  
  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
}

/**
 * Trap focus within a container (for modals, menus, etc.)
 * @param container - Container element
 * @param event - Keyboard event
 */
export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== 'Tab') return;
  
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
}

/**
 * Set focus to first focusable element in container
 * @param container - Container element
 * @returns Whether focus was set successfully
 */
export function focusFirstElement(container: HTMLElement): boolean {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  
  if (firstElement) {
    firstElement.focus();
    return true;
  }
  
  return false;
}

/**
 * Restore focus to previously focused element
 * @param element - Element to focus
 */
export function restoreFocus(element: HTMLElement | null) {
  if (element && document.contains(element)) {
    element.focus();
  }
}

// ============================================================================
// Screen Reader Utilities
// ============================================================================

/**
 * Announce message to screen readers
 * @param message - Message to announce
 * @param priority - Announcement priority
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Create visually hidden text for screen readers
 * @param text - Text to hide visually
 * @returns Span element with screen reader only text
 */
export function createScreenReaderText(text: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'sr-only';
  span.textContent = text;
  return span;
}

// ============================================================================
// Color Contrast Utilities
// ============================================================================

/**
 * Calculate relative luminance of a color
 * @param color - Hex color string
 * @returns Relative luminance value
 */
export function getRelativeLuminance(color: string): number {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Apply gamma correction
  const sRGB = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  // Calculate relative luminance
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns Whether combination meets requirements
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  
  const requirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };
  
  return ratio >= requirements[level][size];
}

// ============================================================================
// Form Accessibility Utilities
// ============================================================================

/**
 * Generate accessible form field configuration
 * @param fieldId - Field identifier
 * @param label - Field label
 * @param isRequired - Whether field is required
 * @param errorMessage - Error message if any
 * @returns Complete field configuration
 */
export function generateAccessibleFieldConfig(
  fieldId: string,
  label: string,
  isRequired: boolean = false,
  errorMessage?: string
) {
  return {
    id: fieldId,
    'aria-label': label,
    'aria-required': isRequired,
    'aria-invalid': !!errorMessage,
    ...(errorMessage && { 'aria-describedby': `${fieldId}-error` }),
  };
}

/**
 * Generate accessible error message configuration
 * @param fieldId - Associated field identifier
 * @param message - Error message
 * @returns Error element configuration
 */
export function generateAccessibleErrorConfig(fieldId: string, message: string) {
  return {
    id: `${fieldId}-error`,
    role: 'alert' as const,
    'aria-live': 'polite' as const,
    children: message,
  };
}

// ============================================================================
// Skip Navigation Utilities
// ============================================================================

/**
 * Create skip navigation link
 * @param targetId - ID of main content area
 * @param text - Skip link text
 * @returns Skip link element configuration
 */
export function createSkipLink(targetId: string, text: string = 'Skip to main content') {
  return {
    href: `#${targetId}`,
    className: 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-electric-blue focus:text-white focus:rounded',
    children: text,
    onClick: (e: Event) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    },
  };
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validate accessibility of an element
 * @param element - Element to validate
 * @returns Accessibility validation results
 */
export function validateElementAccessibility(element: HTMLElement) {
  const issues: string[] = [];
  
  // Check for missing alt text on images
  if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
    issues.push('Image missing alt attribute');
  }
  
  // Check for missing labels on form controls
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
    const hasLabel = element.getAttribute('aria-label') || 
                    element.getAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${element.id}"]`);
    
    if (!hasLabel) {
      issues.push('Form control missing accessible label');
    }
  }
  
  // Check for missing button text
  if (element.tagName === 'BUTTON' && !element.textContent?.trim()) {
    const hasAriaLabel = element.getAttribute('aria-label') || 
                        element.getAttribute('aria-labelledby');
    
    if (!hasAriaLabel) {
      issues.push('Button missing accessible text');
    }
  }
  
  // Check for missing heading hierarchy
  if (/^H[1-6]$/.test(element.tagName)) {
    const level = parseInt(element.tagName.charAt(1));
    const prevHeading = element.previousElementSibling;
    
    if (prevHeading && /^H[1-6]$/.test(prevHeading.tagName)) {
      const prevLevel = parseInt(prevHeading.tagName.charAt(1));
      if (level > prevLevel + 1) {
        issues.push('Heading level skipped in hierarchy');
      }
    }
  }
  
  return {
    isAccessible: issues.length === 0,
    issues,
  };
}