import { useState } from 'react';
import { Phone, Mail, MessageSquare, User, Calendar, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { ConsultationFormType } from '@/shared/types';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export default function ConsultationForm() {
  const [formData, setFormData] = useState<ConsultationFormType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    treatment: '',
    message: '',
    preferredDate: '',
    urgency: 'normal'
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const treatments = [
    'Cardiac Surgery',
    'Orthopedic Surgery', 
    'Neurosurgery',
    'Cosmetic Surgery',
    'Eye Surgery',
    'Fertility Treatment',
    'Cancer Treatment',
    'Dental Procedures',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('loading');
    setErrorMessage('');
    setFieldErrors({});

    try {
      // Add tracking data
      const submissionData: ConsultationFormType = {
        ...formData,
        sourceUrl: window.location.href,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
      };

      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error && typeof result.error === 'object') {
          // Handle validation errors
          setFieldErrors(result.error);
        } else {
          setErrorMessage(result.message || 'Failed to submit consultation request');
        }
        setSubmissionState('error');
        return;
      }

      // Success!
      setSubmissionState('success');
      
      // Track successful submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'consultation_request', {
          event_category: 'engagement',
          event_label: formData.treatment,
          value: 1
        });
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          treatment: '',
          message: '',
          preferredDate: '',
          urgency: 'normal'
        });
        setSubmissionState('idle');
      }, 3000);

    } catch (error: any) {
      console.error('Form submission error:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmissionState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Information */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Book Your Free Consultation
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards affordable, world-class medical care. 
              Our medical coordinators will create a personalized treatment plan just for you.
            </p>

            {/* What to expect */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Personal Medical Coordinator</h3>
                  <p className="text-gray-600">Dedicated support throughout your medical journey</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Detailed Cost Estimate</h3>
                  <p className="text-gray-600">Transparent pricing with no hidden fees</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Treatment Timeline</h3>
                  <p className="text-gray-600">Clear schedule from consultation to recovery</p>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Prefer to speak directly?</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">info@medbridgeusa.com</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">24/7 Live Chat Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      fieldErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Interest *
                </label>
                <select
                  name="treatment"
                  required
                  value={formData.treatment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a treatment</option>
                  {treatments.map((treatment, index) => (
                    <option key={index} value={treatment}>{treatment}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent (within 2 weeks)</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your condition
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Please describe your medical condition, any previous treatments, and specific questions you have..."
                />
              </div>

              {/* Success Message */}
              {submissionState === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-green-800">Consultation Request Submitted!</h4>
                    <p className="text-sm text-green-600">We'll contact you within 24 hours to schedule your free consultation.</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submissionState === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-red-800">Submission Failed</h4>
                    <p className="text-sm text-red-600">{errorMessage || 'Please try again or call us directly.'}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submissionState === 'loading' || submissionState === 'success'}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg flex items-center justify-center ${
                  submissionState === 'loading' 
                    ? 'bg-blue-400 text-white cursor-not-allowed' 
                    : submissionState === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                }`}
              >
                {submissionState === 'loading' && (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                )}
                {submissionState === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Request Submitted!
                  </>
                )}
                {submissionState === 'idle' && 'Schedule Free Consultation'}
                {submissionState === 'error' && 'Try Again'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Your information is secure and confidential. We'll contact you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
