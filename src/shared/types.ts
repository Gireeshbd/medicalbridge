import z from "zod";

// Lead/Consultation Form Schema
export const ConsultationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  treatment: z.string().min(1, "Treatment selection is required"),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
  urgency: z.enum(['normal', 'urgent', 'emergency']).default('normal'),
  sourceUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type ConsultationFormType = z.infer<typeof ConsultationFormSchema>;

// Newsletter Subscription Schema
export const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
});

export type NewsletterType = z.infer<typeof NewsletterSchema>;

// Procedure Data Schema
export const ProcedureSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  costIndia: z.number(),
  costUSA: z.number(),
  savings: z.string(),
  successRate: z.string(),
  recoveryTime: z.string(),
  hospitals: z.array(z.string()),
  surgeons: z.array(z.object({
    name: z.string(),
    experience: z.string(),
    specialization: z.string(),
  })),
  seoTitle: z.string(),
  seoDescription: z.string(),
  keywords: z.array(z.string()),
});

export type ProcedureType = z.infer<typeof ProcedureSchema>;

// Hospital Data Schema  
export const HospitalSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  country: z.string(),
  accreditation: z.array(z.string()),
  specialties: z.array(z.string()),
  established: z.number(),
  beds: z.number(),
  rating: z.number(),
  image: z.string().optional(),
});

export type HospitalType = z.infer<typeof HospitalSchema>;

// API Response Schema
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;

// Analytics Event Schema
export const AnalyticsEventSchema = z.object({
  event: z.string(),
  properties: z.record(z.string(), z.any()),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  timestamp: z.number(),
});

export type AnalyticsEventType = z.infer<typeof AnalyticsEventSchema>;
