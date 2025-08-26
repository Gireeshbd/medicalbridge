import { AnalyticsEventType } from '@/shared/types';

class Analytics {
  private sessionId: string;
  private userId?: string;
  private queue: AnalyticsEventType[] = [];
  private isOnline = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupOnlineListener();
    this.setupVisibilityListener();
    this.setupUnloadListener();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupOnlineListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushQueue();
      }
    });
  }

  private setupUnloadListener() {
    window.addEventListener('beforeunload', () => {
      this.flushQueue();
    });
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  track(event: string, properties: Record<string, any> = {}) {
    const eventData: AnalyticsEventType = {
      event,
      properties: {
        ...properties,
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timestamp: Date.now(),
        // UTM parameters
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'), 
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      },
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
    };

    // Add to queue
    this.queue.push(eventData);

    // Send immediately if online and queue is getting large
    if (this.isOnline && this.queue.length >= 5) {
      this.flushQueue();
    }
  }

  // Convenience methods for common events
  pageView(path?: string) {
    this.track('page_view', {
      path: path || window.location.pathname,
      title: document.title,
    });
  }

  buttonClick(buttonText: string, location: string) {
    this.track('button_click', {
      button_text: buttonText,
      location,
    });
  }

  formStart(formName: string) {
    this.track('form_start', {
      form_name: formName,
    });
  }

  formSubmit(formName: string, success: boolean, errorMessage?: string) {
    this.track('form_submit', {
      form_name: formName,
      success,
      error_message: errorMessage,
    });
  }

  consultationRequest(treatment: string, urgency: string) {
    this.track('consultation_request', {
      treatment,
      urgency,
      value: 1, // For conversion tracking
    });
  }

  newsletterSignup(source: string) {
    this.track('newsletter_signup', {
      source,
      value: 1,
    });
  }

  costCalculatorUse(procedure: string, estimatedCost: number) {
    this.track('cost_calculator_use', {
      procedure,
      estimated_cost: estimatedCost,
    });
  }

  phoneCall(phoneNumber: string, location: string) {
    this.track('phone_call', {
      phone_number: phoneNumber,
      location,
      value: 5, // Higher value for phone calls
    });
  }

  private async flushQueue() {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      // Send to our API
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });

      // Also send key events to Google Analytics if available
      events.forEach(event => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', event.event, {
            event_category: this.getEventCategory(event.event),
            event_label: event.properties.treatment || event.properties.form_name || 'general',
            value: event.properties.value || 1,
            custom_parameters: event.properties,
          });
        }
      });

    } catch (error) {
      console.error('Analytics error:', error);
      // Re-add events to queue if failed
      this.queue.unshift(...events);
    }
  }

  private getEventCategory(eventName: string): string {
    if (eventName.includes('form') || eventName.includes('consultation')) return 'engagement';
    if (eventName.includes('button') || eventName.includes('click')) return 'interaction';
    if (eventName.includes('page')) return 'navigation';
    if (eventName.includes('phone') || eventName.includes('call')) return 'conversion';
    return 'general';
  }
}

// Create singleton instance
const analytics = new Analytics();

// Auto-track page views
if (typeof window !== 'undefined') {
  // Initial page view
  analytics.pageView();
  
  // Track page changes for SPA
  let currentPath = window.location.pathname;
  const trackPageChanges = () => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      analytics.pageView();
    }
  };
  
  // Use MutationObserver to detect URL changes
  const observer = new MutationObserver(trackPageChanges);
  observer.observe(document.body, { childList: true, subtree: true });
}

export default analytics;