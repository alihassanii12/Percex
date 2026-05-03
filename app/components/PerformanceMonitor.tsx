/**
 * Performance Monitor Component
 * 
 * Client-side component for monitoring Core Web Vitals and performance metrics.
 * Only active in development mode to avoid impacting production performance.
 */

'use client';

import { useEffect } from 'react';
import { 
  initializeCoreWebVitals, 
  logPerformanceMetric,
  checkPerformanceBudget,
  DEFAULT_PERFORMANCE_BUDGET,
  type PerformanceMetric 
} from '@/app/lib/performance';

interface PerformanceMonitorProps {
  enabled?: boolean;
  logToConsole?: boolean;
  onMetric?: (metric: PerformanceMetric) => void;
}

export default function PerformanceMonitor({
  enabled = process.env.NODE_ENV === 'development',
  logToConsole = true,
  onMetric,
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    const metrics: PerformanceMetric[] = [];

    const handleMetric = (metric: PerformanceMetric) => {
      metrics.push(metric);
      
      if (logToConsole) {
        logPerformanceMetric(metric);
      }
      
      if (onMetric) {
        onMetric(metric);
      }
      
      // Check performance budget after collecting some metrics
      if (metrics.length >= 3) {
        const budgetResults = checkPerformanceBudget(metrics, DEFAULT_PERFORMANCE_BUDGET);
        
        if (!budgetResults.passed && logToConsole) {
          console.warn('Performance budget violations:', budgetResults.violations);
        }
      }
    };

    // Initialize Core Web Vitals monitoring
    initializeCoreWebVitals(handleMetric);

    // Monitor page load performance
    if (document.readyState === 'complete') {
      measurePageLoadMetrics();
    } else {
      window.addEventListener('load', measurePageLoadMetrics);
    }

    function measurePageLoadMetrics() {
      // Measure Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        
        handleMetric({
          name: 'TTFB',
          value: ttfb,
          rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor',
          timestamp: Date.now(),
        });
      }
    }

    // Cleanup function
    return () => {
      window.removeEventListener('load', measurePageLoadMetrics);
    };
  }, [enabled, logToConsole, onMetric]);

  // This component doesn't render anything
  return null;
}