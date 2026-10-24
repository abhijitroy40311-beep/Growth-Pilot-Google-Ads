import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  isValidOptionalUrl,
  buildEmailJsTemplateParams,
  buildWhatsAppContactUrl,
  isValidSubmissionReceipt,
  resolveThankYouReceipt,
} from './validation';
import { filterProjects, filterFAQs, resolveJourneyStage } from './filterLogic';
import {
  easeInOutCubic,
  resolveDeviceViewportMode,
  calculateScrollTargetY,
} from './scrollLogic';
import { projectsData } from '../data/projects';
import { faqsData } from '../data/faqs';

test('validateContactForm rejects empty submission with accessible error messages', () => {
  const result = validateContactForm({});
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.businessName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.serviceOfInterest);
  assert.ok(result.errors.projectGoals);
  assert.ok(result.errors.consent);
});

test('validateContactForm accepts valid inquiry and trims fields', () => {
  const result = validateContactForm({
    name: '  Aarav Mehta  ',
    businessName: '  Meridian Precision Systems ',
    email: 'aarav@meridiansystems.com',
    phone: '+1 (555) 234-5678',
    websiteUrl: 'meridiansystems.com',
    serviceOfInterest: 'Website Design & Development',
    projectBudget: '$5,000 – $10,000',
    projectGoals: 'We want to redesign our B2B website and track RFQ enquiries properly.',
    consent: true,
    honeypot: '',
  });
  assert.equal(result.valid, true);
  assert.equal(Object.keys(result.errors).length, 0);
  assert.equal(result.sanitized.name, 'Aarav Mehta');
  assert.equal(result.sanitized.businessName, 'Meridian Precision Systems');
});

test('buildEmailJsTemplateParams formats all client inquiry fields for EmailJS', () => {
  const validation = validateContactForm({
    name: 'Aarav Mehta',
    businessName: 'Meridian Precision Systems',
    email: 'aarav@meridiansystems.com',
    serviceOfInterest: 'Website Design & Development',
    projectGoals: 'We want to redesign our B2B website and track RFQ enquiries properly.',
    consent: true,
  });
  const params = buildEmailJsTemplateParams(
    validation.sanitized,
    'GP-TEST-01',
    '2026-10-21T10:50:00.000Z'
  );
  assert.equal(params.from_name, 'Aarav Mehta');
  assert.equal(params.from_email, 'aarav@meridiansystems.com');
  assert.equal(params.reply_to, 'aarav@meridiansystems.com');
  assert.equal(params.business_name, 'Meridian Precision Systems');
  assert.equal(params.service_of_interest, 'Website Design & Development');
  assert.equal(params.inquiry_id, 'GP-TEST-01');
  assert.ok(params.message.includes('Meridian Precision Systems'));
});

test('validateContactForm blocks honeypot spam submissions', () => {
  const result = validateContactForm({
    name: 'Bot User',
    businessName: 'Bot Co',
    email: 'bot@example.com',
    serviceOfInterest: 'Digital Strategy',
    projectGoals: 'Automated spam message that is long enough.',
    consent: true,
    honeypot: 'http://spam-link.example',
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.honeypot);
});

test('isValidOptionalUrl validates optional URLs accurately', () => {
  assert.equal(isValidOptionalUrl(''), true);
  assert.equal(isValidOptionalUrl('https://growthpilot.agency'), true);
  assert.equal(isValidOptionalUrl('example.com/services'), true);
  assert.equal(isValidOptionalUrl('not a url'), false);
});

test('filterProjects filters by category and search query accurately', () => {
  const all = filterProjects(projectsData, 'All');
  assert.equal(all.length, projectsData.length);

  const webOnly = filterProjects(projectsData, 'Website Architecture');
  assert.ok(webOnly.length >= 1);
  assert.ok(webOnly.every((p) => p.category === 'Website Architecture'));

  const searched = filterProjects(projectsData, 'All', 'Veridian');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'demo-veridian-clinic');
});

test('filterFAQs filters by category and search query accurately', () => {
  const all = filterFAQs(faqsData, 'All');
  assert.equal(all.length, 10);

  const adsFaqs = filterFAQs(faqsData, 'All', 'Google Ads');
  assert.ok(adsFaqs.length >= 1);
});

test('resolveJourneyStage maps scroll progress 0..1 across all 7 stages', () => {
  const start = resolveJourneyStage(0);
  assert.equal(start.stageIndex, 1);
  assert.equal(start.id, 'hero');

  const mid = resolveJourneyStage(0.5);
  assert.equal(mid.stageIndex, 4);
  assert.equal(mid.id, 'process');

  const end = resolveJourneyStage(1);
  assert.equal(end.stageIndex, 7);
  assert.equal(end.id, 'contact');
});

test('easeInOutCubic smoothly interpolates 0..1 with symmetric midpoint', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(0.5), 0.5);
  assert.equal(easeInOutCubic(1), 1);
  assert.ok(easeInOutCubic(0.25) < 0.25);
  assert.ok(easeInOutCubic(0.75) > 0.75);
});

test('resolveDeviceViewportMode classifies mobile, tablet, and desktop widths', () => {
  assert.equal(resolveDeviceViewportMode(390), 'mobile');
  assert.equal(resolveDeviceViewportMode(768), 'tablet');
  assert.equal(resolveDeviceViewportMode(1024), 'tablet');
  assert.equal(resolveDeviceViewportMode(1280), 'desktop');
  assert.equal(resolveDeviceViewportMode(1440), 'desktop');
});

test('calculateScrollTargetY compensates for sticky navbar and clamps to bounds', () => {
  assert.equal(calculateScrollTargetY(500, 200, 76, 3000), 624);
  assert.equal(calculateScrollTargetY(20, 0, 76, 3000), 0);
  assert.equal(calculateScrollTargetY(2500, 1000, 76, 3000), 3000);
});

test('buildWhatsAppContactUrl formats E.164 digits and encodes message cleanly', () => {
  const withPhone = buildWhatsAppContactUrl('+91 (98765) 43210', 'Hello GrowthPilot!');
  assert.equal(withPhone, 'https://wa.me/919876543210?text=Hello%20GrowthPilot!');

  const tenDigitIndian = buildWhatsAppContactUrl('8777202487', 'Hello GrowthPilot!');
  assert.equal(tenDigitIndian, 'https://wa.me/918777202487?text=Hello%20GrowthPilot!');

  const withoutPhone = buildWhatsAppContactUrl(null, 'Quick inquiry');
  assert.equal(withoutPhone, 'https://wa.me/?text=Quick%20inquiry');
});

test('resolveThankYouReceipt blocks direct unsubmitted access and accepts completed form receipts', () => {
  assert.equal(resolveThankYouReceipt(null, null), null);
  assert.equal(resolveThankYouReceipt(undefined, '{invalid-json'), null);
  assert.equal(isValidSubmissionReceipt({ inquiryId: 'INVALID' }), false);

  const validReceipt = {
    inquiryId: 'GP-M9XYZ-1234',
    submittedAt: '2026-10-24T04:00:00.000Z',
    emailDispatched: true,
    emailjsServiceId: 'service_9efxkwk',
    message: 'Thank you. Your project inquiry has been sent.',
    summary: {
      name: 'Aarav Mehta',
      businessName: 'Meridian Precision Systems',
      email: 'aarav@meridiansystems.com',
      serviceOfInterest: 'Website Design & Development',
    },
  };

  assert.equal(isValidSubmissionReceipt(validReceipt), true);
  assert.deepEqual(resolveThankYouReceipt(validReceipt, null), validReceipt);
  assert.deepEqual(
    resolveThankYouReceipt(null, JSON.stringify(validReceipt)),
    validReceipt
  );
});

