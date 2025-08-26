import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from '@hono/zod-validator';
import { 
  ConsultationFormSchema, 
  NewsletterSchema
} from '@/shared/types';

// Define Env interface for Cloudflare Workers
interface Env {
  DB: D1Database;
  // Add other environment variables as needed
}

const app = new Hono<{ Bindings: Env }>();

// Add CORS middleware
app.use('/api/*', cors({
  origin: ['http://localhost:5173', 'https://*.pages.dev', 'https://*.workers.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ success: true, message: 'MedBridge API is healthy', timestamp: Date.now() });
});

// Consultation form submission endpoint
app.post('/api/consultation', zValidator('json', ConsultationFormSchema), async (c) => {
  try {
    const formData = c.req.valid('json');
    
    // Add server-side metadata
    const leadData = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'new',
      sourceUrl: formData.sourceUrl || c.req.header('Referer') || 'direct',
      userAgent: c.req.header('User-Agent') || '',
      ipAddress: c.req.header('CF-Connecting-IP') || 'unknown',
    };

    // Insert into D1 database
    const stmt = c.env.DB.prepare(`
      INSERT INTO consultation_leads (
        id, firstName, lastName, email, phone, treatment, message, 
        preferredDate, urgency, sourceUrl, utmSource, utmMedium, utmCampaign,
        userAgent, ipAddress, createdAt, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      leadData.id,
      leadData.firstName,
      leadData.lastName, 
      leadData.email,
      leadData.phone,
      leadData.treatment,
      leadData.message || '',
      leadData.preferredDate || '',
      leadData.urgency,
      leadData.sourceUrl,
      leadData.utmSource || '',
      leadData.utmMedium || '',
      leadData.utmCampaign || '',
      leadData.userAgent,
      leadData.ipAddress,
      leadData.createdAt,
      leadData.status
    ).run();

    // TODO: Add email notification, CRM integration, Cal.com booking
    // This will be in TYPE 2 requirements since it needs your specific integrations

    return c.json({
      success: true,
      message: 'Consultation request submitted successfully',
      data: { leadId: leadData.id }
    });

  } catch (error: any) {
    console.error('Consultation form error:', error);
    return c.json({
      success: false,
      message: 'Failed to submit consultation request',
      error: error.message
    }, 500);
  }
});

// Newsletter subscription endpoint  
app.post('/api/newsletter', zValidator('json', NewsletterSchema), async (c) => {
  try {
    const { email, source } = c.req.valid('json');
    
    const subscriptionData = {
      id: crypto.randomUUID(),
      email,
      source: source || c.req.header('Referer') || 'direct',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    const stmt = c.env.DB.prepare(`
      INSERT INTO newsletter_subscriptions (id, email, source, createdAt, status)
      VALUES (?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      subscriptionData.id,
      subscriptionData.email,
      subscriptionData.source,
      subscriptionData.createdAt,
      subscriptionData.status
    ).run();

    return c.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return c.json({
      success: false,
      message: 'Failed to subscribe to newsletter'
    }, 500);
  }
});

// Analytics endpoint for tracking user events
app.post('/api/analytics', async (c) => {
  try {
    const eventData = await c.req.json();
    
    const analyticsEvent = {
      id: crypto.randomUUID(),
      ...eventData,
      timestamp: Date.now(),
      userAgent: c.req.header('User-Agent') || '',
      ipAddress: c.req.header('CF-Connecting-IP') || 'unknown',
    };

    const stmt = c.env.DB.prepare(`
      INSERT INTO analytics_events (id, event, properties, userId, sessionId, timestamp, userAgent, ipAddress)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      analyticsEvent.id,
      analyticsEvent.event,
      JSON.stringify(analyticsEvent.properties || {}),
      analyticsEvent.userId || '',
      analyticsEvent.sessionId || '',
      analyticsEvent.timestamp,
      analyticsEvent.userAgent,
      analyticsEvent.ipAddress
    ).run();

    return c.json({ success: true, message: 'Event tracked' });

  } catch (error: any) {
    console.error('Analytics error:', error);
    return c.json({ success: false, message: 'Failed to track event' }, 500);
  }
});

// Procedures data endpoint (for dynamic content)
app.get('/api/procedures', async (c) => {
  try {
    const stmt = c.env.DB.prepare('SELECT * FROM procedures WHERE status = ?');
    const result = await stmt.bind('active').all();
    
    return c.json({
      success: true,
      data: result.results
    });
  } catch (error: any) {
    console.error('Procedures fetch error:', error);
    return c.json({
      success: false,
      message: 'Failed to fetch procedures'
    }, 500);
  }
});

// Single procedure endpoint
app.get('/api/procedures/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const stmt = c.env.DB.prepare('SELECT * FROM procedures WHERE slug = ? AND status = ?');
    const result = await stmt.bind(slug, 'active').first();
    
    if (!result) {
      return c.json({
        success: false,
        message: 'Procedure not found'
      }, 404);
    }

    return c.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Procedure fetch error:', error);
    return c.json({
      success: false,
      message: 'Failed to fetch procedure'
    }, 500);
  }
});

export default app;
