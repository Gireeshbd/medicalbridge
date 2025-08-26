-- MedBridge USA Database Schema for Cloudflare D1
-- Run this with: wrangler d1 execute <database-name> --file=./src/worker/schema.sql

-- Consultation leads table
CREATE TABLE IF NOT EXISTS consultation_leads (
  id TEXT PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  treatment TEXT NOT NULL,
  message TEXT DEFAULT '',
  preferredDate TEXT DEFAULT '',
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('normal', 'urgent', 'emergency')),
  sourceUrl TEXT DEFAULT '',
  utmSource TEXT DEFAULT '',
  utmMedium TEXT DEFAULT '', 
  utmCampaign TEXT DEFAULT '',
  userAgent TEXT DEFAULT '',
  ipAddress TEXT DEFAULT '',
  createdAt TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  assignedTo TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  followUpDate TEXT DEFAULT '',
  calComBookingId TEXT DEFAULT ''
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT '',
  createdAt TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced'))
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  event TEXT NOT NULL,
  properties TEXT DEFAULT '{}', -- JSON string
  userId TEXT DEFAULT '',
  sessionId TEXT DEFAULT '',
  timestamp INTEGER NOT NULL,
  userAgent TEXT DEFAULT '',
  ipAddress TEXT DEFAULT ''
);

-- Procedures table (for dynamic content)
CREATE TABLE IF NOT EXISTS procedures (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  shortDescription TEXT NOT NULL,
  costIndia INTEGER NOT NULL,
  costUSA INTEGER NOT NULL,
  savings TEXT NOT NULL,
  successRate TEXT NOT NULL,
  recoveryTime TEXT NOT NULL,
  hospitals TEXT NOT NULL, -- JSON array
  surgeons TEXT NOT NULL,  -- JSON array
  seoTitle TEXT NOT NULL,
  seoDescription TEXT NOT NULL,
  keywords TEXT NOT NULL,  -- JSON array
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  accreditation TEXT NOT NULL, -- JSON array
  specialties TEXT NOT NULL,   -- JSON array
  established INTEGER NOT NULL,
  beds INTEGER NOT NULL,
  rating REAL NOT NULL,
  image TEXT DEFAULT '',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  createdAt TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_consultation_leads_email ON consultation_leads(email);
CREATE INDEX IF NOT EXISTS idx_consultation_leads_created ON consultation_leads(createdAt);
CREATE INDEX IF NOT EXISTS idx_consultation_leads_status ON consultation_leads(status);
CREATE INDEX IF NOT EXISTS idx_consultation_leads_treatment ON consultation_leads(treatment);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscriptions(createdAt);

CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(userId);

CREATE INDEX IF NOT EXISTS idx_procedures_slug ON procedures(slug);
CREATE INDEX IF NOT EXISTS idx_procedures_status ON procedures(status);

CREATE INDEX IF NOT EXISTS idx_hospitals_city ON hospitals(city);
CREATE INDEX IF NOT EXISTS idx_hospitals_status ON hospitals(status);

-- Insert sample procedure data
INSERT OR IGNORE INTO procedures (
  id, name, slug, description, shortDescription, costIndia, costUSA, savings, 
  successRate, recoveryTime, hospitals, surgeons, seoTitle, seoDescription, keywords, 
  status, createdAt, updatedAt
) VALUES 
(
  'cardiac-surgery-001',
  'Cardiac Surgery', 
  'cardiac-surgery',
  'Comprehensive cardiac surgery including bypass, valve replacement, and complex heart procedures performed by world-renowned cardiac surgeons in JCI-accredited hospitals.',
  'World-class heart surgery with 98% success rates at 80% cost savings compared to US procedures.',
  25000,
  150000,
  '83%',
  '98%',
  '4-6 weeks',
  '["Apollo Chennai", "Fortis Escorts Delhi", "Medanta Gurgaon"]',
  '[{"name": "Dr. Ramesh Kumar", "experience": "25+ years", "specialization": "Cardiac Surgery"}, {"name": "Dr. Priya Sharma", "experience": "20+ years", "specialization": "Interventional Cardiology"}]',
  'Affordable Cardiac Surgery in India - Save 80% | MedBridge USA',
  'World-class cardiac surgery in JCI-accredited hospitals. US-trained surgeons. Save $125,000+ with 98% success rates. Free consultation available.',
  '["cardiac surgery India", "heart surgery cost India", "affordable cardiac surgery", "JCI cardiac hospitals India"]',
  'active',
  datetime('now'),
  datetime('now')
),
(
  'orthopedic-surgery-001',
  'Orthopedic Surgery',
  'orthopedic-surgery', 
  'Advanced orthopedic procedures including joint replacements, sports medicine, spine surgery, and trauma care with cutting-edge technology.',
  'Joint replacement and orthopedic surgery with faster recovery and significant cost savings.',
  15000,
  80000,
  '81%',
  '97%',
  '2-4 weeks',
  '["Apollo Chennai", "Fortis Gurgaon", "Max Saket Delhi"]',
  '[{"name": "Dr. Suresh Reddy", "experience": "22+ years", "specialization": "Joint Replacement"}, {"name": "Dr. Anita Patel", "experience": "18+ years", "specialization": "Spine Surgery"}]',
  'Affordable Orthopedic Surgery in India - Save 81% | MedBridge USA',
  'Advanced joint replacement and orthopedic surgery in India. JCI hospitals, US-trained surgeons. Save $65,000+ with 97% success rates.',
  '["orthopedic surgery India", "joint replacement cost India", "hip replacement surgery India", "knee replacement India"]',
  'active',
  datetime('now'),
  datetime('now')
);

-- Insert sample hospital data
INSERT OR IGNORE INTO hospitals (
  id, name, city, country, accreditation, specialties, established, beds, rating, 
  image, status, createdAt
) VALUES 
(
  'apollo-chennai-001',
  'Apollo Hospitals Chennai',
  'Chennai',
  'India',
  '["JCI", "NABH", "ISO 9001:2015"]',
  '["Cardiac Surgery", "Neurosurgery", "Orthopedics", "Oncology"]',
  1983,
  1000,
  4.8,
  '',
  'active',
  datetime('now')
),
(
  'fortis-delhi-001', 
  'Fortis Escorts Heart Institute Delhi',
  'New Delhi',
  'India',
  '["JCI", "NABH", "CAP"]',
  '["Cardiac Surgery", "Interventional Cardiology", "Pediatric Cardiology"]',
  1988,
  310,
  4.7,
  '',
  'active',
  datetime('now')
);