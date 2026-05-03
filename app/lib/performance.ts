/**
 * Performance Optimization Utilities
 * 
 * Helper functions for monitoring and optimizing website performance,
 * including Core Web Vitals tracking and resource optimization.
 */

// ============================================================================
// Core Web Vitals Monitoring
// ============================================================================

/**
 * Core Web Vitals thresholds
 */
export const CORE_WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint (ms)
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay (ms)
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte (ms)
} as const;

/**
 * Performance metric interface
 */
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Get performance rating based on thresholds
 * @param metricName - Name of the metric
 * @param value - Metric value
 * @returns Performance rating
 */
export function getPerformanceRating(
  metricName: keyof typeof CORE_WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = CORE_WEB_VITALS_THRESHOLDS[metricName];
  
  if (value <= thresholds.good) {
    return 'good';
  } else if (value <= thresholds.needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Measure Largest Contentful Paint (LCP)
 * @param callback - Callback function to handle LCP measurement
 */
export function measureLCP(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const metric: PerformanceMetric = {
          name: 'LCP',
          value: lastEntry.startTime,
          rating: getPerformanceRating('LCP', lastEntry.startTime),
          timestamp: Date.now(),
        };
        
        callback(metric);
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.warn('LCP measurement failed:', error);
  }
}

/**
 * Measure First Input Delay (FID)
 * @param callback - Callback function to handle FID measurement
 */
export function measureFID(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        // Type assertion for first-input entries
        const fidEntry = entry as any;
        const metric: PerformanceMetric = {
          name: 'FID',
          value: fidEntry.processingStart - fidEntry.startTime,
          rating: getPerformanceRating('FID', fidEntry.processingStart - fidEntry.startTime),
          timestamp: Date.now(),
        };
        
        callback(metric);
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
  } catch (error) {
    console.warn('FID measurement failed:', error);
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 * @param callback - Callback function to handle CLS measurement
 */
export function measureCLS(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    let clsValue = 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getPerformanceRating('CLS', clsValue),
        timestamp: Date.now(),
      };
      
      callback(metric);
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.warn('CLS measurement failed:', error);
  }
}

/**
 * Measure First Contentful Paint (FCP)
 * @param callback - Callback function to handle FCP measurement
 */
export function measureFCP(callback: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const metric: PerformanceMetric = {
            name: 'FCP',
            value: entry.startTime,
            rating: getPerformanceRating('FCP', entry.startTime),
            timestamp: Date.now(),
          };
          
          callback(metric);
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
  } catch (error) {
    console.warn('FCP measurement failed:', error);
  }
}

/**
 * Initialize all Core Web Vitals measurements
 * @param callback - Callback function to handle all metrics
 */
export function initializeCoreWebVitals(callback: (metric: PerformanceMetric) => void) {
  measureLCP(callback);
  measureFID(callback);
  measureCLS(callback);
  measureFCP(callback);
}

// ============================================================================
// Resource Loading Optimization
// ============================================================================

/**
 * Preload critical resources
 * @param resources - Array of resources to preload
 */
export function preloadResources(resources: Array<{
  href: string;
  as: string;
  type?: string;
  crossorigin?: string;
}>) {
  if (typeof document === 'undefined') return;

  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) {
      link.type = resource.type;
    }
    
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin;
    }
    
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with intersection observer
 * @param selector - CSS selector for images to lazy load
 */
export function lazyLoadImages(selector: string = 'img[data-src]') {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll(selector);
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Optimize font loading with font-display swap
 * @param fontFaces - Array of font face configurations
 */
export function optimizeFontLoading(fontFaces: Array<{
  family: string;
  src: string;
  weight?: string;
  style?: string;
}>) {
  if (typeof document === 'undefined') return;

  fontFaces.forEach((font) => {
    const fontFace = new FontFace(
      font.family,
      `url(${font.src})`,
      {
        weight: font.weight || 'normal',
        style: font.style || 'normal',
        display: 'swap',
      }
    );
    
    fontFace.load().then(() => {
      document.fonts.add(fontFace);
    }).catch((error) => {
      console.warn(`Failed to load font ${font.family}:`, error);
    });
  });
}

// ============================================================================
// Bundle Size Optimization
// ============================================================================

/**
 * Dynamically import modules for code splitting
 * @param importFn - Dynamic import function
 * @returns Promise with loaded module
 */
export async function loadModule<T>(importFn: () => Promise<T>): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    console.error('Failed to load module:', error);
    throw error;
  }
}

/**
 * Preload route modules
 * @param routes - Array of route paths to preload
 */
export function preloadRoutes(routes: string[]) {
  if (typeof window === 'undefined') return;

  routes.forEach((route) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
}

// ============================================================================
// Performance Monitoring
// ============================================================================

/**
 * Performance budget configuration
 */
export interface PerformanceBudget {
  maxLCP: number;
  maxFID: number;
  maxCLS: number;
  maxBundleSize: number;
  maxImageSize: number;
}

/**
 * Default performance budget
 */
export const DEFAULT_PERFORMANCE_BUDGET: PerformanceBudget = {
  maxLCP: 2500,
  maxFID: 100,
  maxCLS: 0.1,
  maxBundleSize: 500 * 1024, // 500KB
  maxImageSize: 200 * 1024,  // 200KB
};

/**
 * Check if performance metrics meet budget
 * @param metrics - Performance metrics
 * @param budget - Performance budget
 * @returns Budget compliance results
 */
export function checkPerformanceBudget(
  metrics: PerformanceMetric[],
  budget: PerformanceBudget = DEFAULT_PERFORMANCE_BUDGET
) {
  const results = {
    passed: true,
    violations: [] as string[],
    metrics: {} as Record<string, PerformanceMetric>,
  };
  
  metrics.forEach((metric) => {
    results.metrics[metric.name] = metric;
    
    switch (metric.name) {
      case 'LCP':
        if (metric.value > budget.maxLCP) {
          results.passed = false;
          results.violations.push(`LCP (${metric.value}ms) exceeds budget (${budget.maxLCP}ms)`);
        }
        break;
      case 'FID':
        if (metric.value > budget.maxFID) {
          results.passed = false;
          results.violations.push(`FID (${metric.value}ms) exceeds budget (${budget.maxFID}ms)`);
        }
        break;
      case 'CLS':
        if (metric.value > budget.maxCLS) {
          results.passed = false;
          results.violations.push(`CLS (${metric.value}) exceeds budget (${budget.maxCLS})`);
        }
        break;
    }
  });
  
  return results;
}

/**
 * Log performance metrics to console (development only)
 * @param metric - Performance metric to log
 */
export function logPerformanceMetric(metric: PerformanceMetric) {
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? 'green' : 
                  metric.rating === 'needs-improvement' ? 'orange' : 'red';
    
    console.log(
      `%c${metric.name}: ${metric.value}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }
}

// ============================================================================
// Network Optimization
// ============================================================================

/**
 * Get network connection information
 * @returns Network connection details
 */
export function getNetworkInfo() {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return null;
  }

  const connection = (navigator as any).connection;
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
}

/**
 * Adapt content based on network conditions
 * @param callback - Callback with network-adapted configuration
 */
export function adaptToNetwork(callback: (config: {
  shouldOptimize: boolean;
  imageQuality: 'low' | 'medium' | 'high';
  enableAnimations: boolean;
}) => void) {
  const networkInfo = getNetworkInfo();
  
  if (!networkInfo) {
    // Default configuration for unknown network
    callback({
      shouldOptimize: false,
      imageQuality: 'high',
      enableAnimations: true,
    });
    return;
  }
  
  const isSlowNetwork = networkInfo.effectiveType === 'slow-2g' || 
                       networkInfo.effectiveType === '2g' ||
                       networkInfo.saveData;
  
  callback({
    shouldOptimize: isSlowNetwork,
    imageQuality: isSlowNetwork ? 'low' : 'high',
    enableAnimations: !isSlowNetwork,
  });
}

// ============================================================================
// Memory Management
// ============================================================================

/**
 * Monitor memory usage (Chrome only)
 * @param callback - Callback with memory information
 */
export function monitorMemoryUsage(callback: (memoryInfo: {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}) => void) {
  if (typeof window === 'undefined' || !('performance' in window) || !(window.performance as any).memory) {
    return;
  }

  const memory = (window.performance as any).memory;
  
  callback({
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  });
}

/**
 * Clean up event listeners and observers
 * @param cleanupFunctions - Array of cleanup functions
 */
export function cleanup(cleanupFunctions: Array<() => void>) {
  cleanupFunctions.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.warn('Cleanup function failed:', error);
    }
  });
}