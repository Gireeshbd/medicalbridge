interface EmailService {
  sendConsultationNotification(leadData: any): Promise<void>;
  sendWelcomeEmail(leadData: any): Promise<void>;
  sendNewsletterConfirmation(email: string): Promise<void>;
  sendFollowUpSequence(leadData: any, dayNumber: number): Promise<void>;
}

class ResendEmailService implements EmailService {
  private apiKey: string;
  private fromEmail: string;
  private notificationEmail: string;

  constructor(apiKey: string, fromEmail: string, notificationEmail: string) {
    this.apiKey = apiKey;
    this.fromEmail = fromEmail; // e.g., "MedBridge USA <noreply@medbridgeusa.com>"
    this.notificationEmail = notificationEmail; // Your email to receive notifications
  }

  async sendConsultationNotification(leadData: any): Promise<void> {
    const htmlContent = this.generateNotificationHTML(leadData);
    
    await this.sendEmail({
      to: this.notificationEmail,
      subject: `🚨 New Consultation Request - ${leadData.firstName} ${leadData.lastName} - ${leadData.treatment}`,
      html: htmlContent,
      priority: 'high'
    });
  }

  async sendWelcomeEmail(leadData: any): Promise<void> {
    const htmlContent = this.generateWelcomeHTML(leadData);
    
    await this.sendEmail({
      to: leadData.email,
      subject: 'Your MedBridge USA Consultation Request Received ✅',
      html: htmlContent,
    });
  }

  async sendNewsletterConfirmation(email: string): Promise<void> {
    const htmlContent = this.generateNewsletterConfirmationHTML();
    
    await this.sendEmail({
      to: email,
      subject: 'Welcome to MedBridge USA Newsletter! 🏥',
      html: htmlContent,
    });
  }

  async sendFollowUpSequence(leadData: any, dayNumber: number): Promise<void> {
    const content = this.getFollowUpContent(dayNumber);
    
    await this.sendEmail({
      to: leadData.email,
      subject: content.subject,
      html: content.html,
    });
  }

  private async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    priority?: string;
  }): Promise<void> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: params.to,
          subject: params.subject,
          html: params.html,
          headers: params.priority ? { 'X-Priority': '1' } : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Email failed: ${error}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result.id);

    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
  }

  private generateNotificationHTML(leadData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Consultation Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .urgent { background: #fef2f2; border: 1px solid #fca5a5; padding: 15px; border-radius: 8px; }
        .details { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .cta { text-align: center; margin: 20px 0; }
        .cta a { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚨 New Consultation Request</h1>
        <p>MedBridge USA Lead Alert</p>
      </div>
      
      <div class="content">
        ${leadData.urgency === 'urgent' || leadData.urgency === 'emergency' ? 
          `<div class="urgent">
            <strong>⚠️ ${leadData.urgency.toUpperCase()} REQUEST</strong>
          </div>` : ''
        }
        
        <div class="details">
          <h2>Patient Information:</h2>
          <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${leadData.phone}">${leadData.phone}</a></p>
          <p><strong>Treatment Interest:</strong> ${leadData.treatment}</p>
          <p><strong>Urgency Level:</strong> ${leadData.urgency}</p>
          <p><strong>Preferred Date:</strong> ${leadData.preferredDate || 'Not specified'}</p>
          <p><strong>Source:</strong> ${leadData.sourceUrl}</p>
          <p><strong>UTM Source:</strong> ${leadData.utmSource || 'Direct'}</p>
        </div>
        
        ${leadData.message ? 
          `<div class="details">
            <h3>Patient Message:</h3>
            <p>"${leadData.message}"</p>
          </div>` : ''
        }
        
        <div class="cta">
          <a href="tel:${leadData.phone}">Call Patient Now</a>
          <a href="mailto:${leadData.email}">Send Email</a>
        </div>
        
        <p><small>Lead ID: ${leadData.id} | Submitted: ${new Date(leadData.createdAt).toLocaleString()}</small></p>
      </div>
    </body>
    </html>`;
  }

  private generateWelcomeHTML(leadData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to MedBridge USA</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .highlight { background: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
        .stats { display: flex; justify-content: space-around; margin: 30px 0; }
        .stat { text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #2563eb; }
        .cta { text-align: center; margin: 30px 0; }
        .cta a { background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 0.9em; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to MedBridge USA! 🏥</h1>
        <p>Your consultation request has been received</p>
      </div>
      
      <div class="content">
        <p>Dear ${leadData.firstName},</p>
        
        <p>Thank you for choosing MedBridge USA for your <strong>${leadData.treatment}</strong> consultation. We've received your request and will contact you within 24 hours.</p>
        
        <div class="highlight">
          <h3>What happens next:</h3>
          <ol>
            <li><strong>Within 24 hours:</strong> Our medical coordinator will call you at ${leadData.phone}</li>
            <li><strong>Free consultation:</strong> Discuss your medical needs and treatment options</li>
            <li><strong>Custom treatment plan:</strong> Receive personalized recommendations and cost estimates</li>
            <li><strong>Hospital matching:</strong> Get connected with the best JCI-accredited facilities</li>
          </ol>
        </div>
        
        <div class="stats">
          <div class="stat">
            <div class="stat-number">15K+</div>
            <div>Successful Treatments</div>
          </div>
          <div class="stat">
            <div class="stat-number">80%</div>
            <div>Average Savings</div>
          </div>
          <div class="stat">
            <div class="stat-number">98%</div>
            <div>Success Rate</div>
          </div>
        </div>
        
        <h3>Immediate Questions?</h3>
        <p>Don't wait for our call - reach out anytime:</p>
        <ul>
          <li><strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a> (24/7 support)</li>
          <li><strong>Email:</strong> <a href="mailto:info@medbridgeusa.com">info@medbridgeusa.com</a></li>
          <li><strong>Emergency:</strong> <a href="tel:+1555911HELP">+1 (555) 911-HELP</a></li>
        </ul>
        
        <div class="cta">
          <a href="https://medbridgeusa.com/cost-calculator">Get Instant Cost Estimate</a>
        </div>
      </div>
      
      <div class="footer">
        <p>MedBridge USA - Connecting you to world-class healthcare in India</p>
        <p>Miami, FL | Licensed Medical Tourism Facilitator</p>
        <p><a href="mailto:unsubscribe@medbridgeusa.com">Unsubscribe</a> | <a href="https://medbridgeusa.com/privacy">Privacy Policy</a></p>
      </div>
    </body>
    </html>`;
  }

  private generateNewsletterConfirmationHTML(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to MedBridge Newsletter</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .benefit { background: #f0f9ff; padding: 15px; margin: 15px 0; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to MedBridge Newsletter! 📧</h1>
      </div>
      
      <div class="content">
        <p>Thank you for subscribing to the MedBridge USA newsletter!</p>
        
        <p>You'll receive:</p>
        <div class="benefit">📊 Monthly cost comparison updates</div>
        <div class="benefit">🏥 Latest medical tourism trends</div>
        <div class="benefit">✅ Patient success stories</div>
        <div class="benefit">💰 Exclusive offers and discounts</div>
        
        <p>Your first newsletter will arrive within the next week.</p>
        
        <p>Best regards,<br>The MedBridge USA Team</p>
      </div>
    </body>
    </html>`;
  }

  private getFollowUpContent(dayNumber: number): { subject: string; html: string } {
    const contents = {
      1: {
        subject: 'Your Medical Tourism Information Packet 📋',
        html: 'Complete information packet with hospital details, surgeon credentials, and process overview...'
      },
      3: {
        subject: 'Cost Comparison: Your Treatment in India vs USA 💰',
        html: 'Detailed cost breakdown showing exact savings for your specific treatment...'
      },
      7: {
        subject: 'Success Stories: Patients Like You 🌟',
        html: 'Real patient testimonials and before/after stories for your treatment type...'
      },
      14: {
        subject: 'Limited Time: Free Consultation Expires Soon ⏰',
        html: 'Your free consultation window is closing. Book now to secure your savings...'
      }
    };

    return contents[dayNumber as keyof typeof contents] || contents[1];
  }
}

// Factory function to create email service
export function createEmailService(
  provider: 'resend' | 'sendgrid' | 'mailgun' | 'ses',
  credentials: any
): EmailService {
  switch (provider) {
    case 'resend':
      return new ResendEmailService(
        credentials.apiKey,
        credentials.fromEmail,
        credentials.notificationEmail
      );
    default:
      throw new Error(`Email provider ${provider} not implemented yet`);
  }
}

export type { EmailService };