export interface ProcessStep {
  stepNumber: string;
  code: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: '01',
    code: 'STEP 01 — DISCOVER',
    title: 'Discover',
    description:
      'I review your service lines, target catchment area, lead quality benchmarks, and what makes an enquiry genuinely profitable for your business.',
    deliverables: [
      'Direct specialist consultation',
      'Service-area and capacity alignment',
      'Definition of a qualified enquiry',
    ],
  },
  {
    stepNumber: '02',
    code: 'STEP 02 — AUDIT & RESEARCH',
    title: 'Audit & Research',
    description:
      'I inspect your current Google Ads history (if active), landing page clarity, competitor search landscape, and existing GA4 / GTM tracking setup.',
    deliverables: [
      'Wasted-spend & search term diagnostic',
      'High-intent commercial keyword research',
      'Landing page & conversion tracking audit',
    ],
  },
  {
    stepNumber: '03',
    code: 'STEP 03 — STRATEGY',
    title: 'Strategy',
    description:
      'Before spending budget on clicks, I map out the campaign architecture, negative keyword guardrails, landing page structure, and attribution plan.',
    deliverables: [
      'Segmented Search campaign architecture',
      'Initial negative keyword exclusion lists',
      'Written measurement & conversion plan',
    ],
  },
  {
    stepNumber: '04',
    code: 'STEP 04 — BUILD & IMPLEMENT',
    title: 'Build & Implement',
    description:
      'I configure your campaigns, build or refine focused landing pages, and wire verified GA4 and Google Tag Manager conversion triggers cleanly.',
    deliverables: [
      'Intent-matched campaigns, ad groups & copy',
      'Responsive service landing page build/updates',
      'Verified form, call & WhatsApp event tracking',
    ],
  },
  {
    stepNumber: '05',
    code: 'STEP 05 — TEST & LAUNCH',
    title: 'Test & Launch',
    description:
      'Every form submission flow, click-to-call trigger, mobile layout, geo-targeting radius, and conversion tag is QA-verified before traffic starts.',
    deliverables: [
      'End-to-end form & event firing verification',
      'Mobile viewport & speed QA checks',
      'Controlled initial campaign launch',
    ],
  },
  {
    stepNumber: '06',
    code: 'STEP 06 — MEASURE & IMPROVE',
    title: 'Measure & Improve',
    description:
      'Using real search-term logs and verified enquiry outcomes, I prune irrelevant queries and refine ad copy, bids, and page conversion paths.',
    deliverables: [
      'Weekly search-term & budget hygiene',
      'Plain-English reporting tied to real enquiries',
      'Ongoing landing page & bidding refinement',
    ],
  },
];

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export const whyGrowthPilotPrinciples: PrincipleItem[] = [
  {
    number: '01',
    title: 'Direct Specialist Execution',
    description:
      'Every strategy, campaign adjustment, and tracking check is handled directly by Abhijit Roy—never delegated to junior coordinators after onboarding.',
  },
  {
    number: '02',
    title: 'Commercial Intent Over Vanity Traffic',
    description:
      'Campaigns are structured strictly around buyers actively seeking service quotes, calls, or bookings—filtering out DIY, jobs, and broad noise early.',
  },
  {
    number: '03',
    title: 'Conversion-Focused Landing Experience',
    description:
      'Clicks go to clear, fast-loading destination pages built around customer questions and low-friction contact options rather than cluttered homepages.',
  },
  {
    number: '04',
    title: 'Honest Attribution & Measurement',
    description:
      'GA4 and Google Tag Manager are configured so primary conversions reflect genuine enquiries, never inflated by pageviews or accidental button taps.',
  },
  {
    number: '05',
    title: 'Full Client Account Ownership',
    description:
      'You retain complete administrative ownership of your Google Ads account, billing method, GA4 property, and historical campaign data at all times.',
  },
  {
    number: '06',
    title: 'Transparent Scope Without Lock-In',
    description:
      'Recommendations match your actual service capacity and budget stage, backed by clear written deliverables and zero long-term contract traps.',
  },
];
