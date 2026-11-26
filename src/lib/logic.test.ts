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
import { buildCanonicalUrl, buildBreadcrumbSchema } from './seo';
import { shouldTrackLeadSubmission } from './analytics';
import { CANONICAL_ROUTE_META } from './routeMeta';
import { readEmailJsServerConfig, dispatchEmailJsRest } from './emailjsServer';
import { projectsData } from '../data/projects';
import { faqsData } from '../data/faqs';
import { siteConfig } from '../data/siteConfig';

test('siteConfig exposes connected API endpoints without private keys', () => {
  assert.equal('privateKey' in siteConfig.emailjs, false);
  assert.equal(siteConfig.contact.inquiryEndpoint, '/api/contact');
  assert.equal(siteConfig.contact.healthEndpoint, '/api/health');
  assert.equal(siteConfig.contact.email, 'abhijitroy40311@gmail.com');
});

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

  const tenDigitIndian = buildWhatsAppContactUrl('+91 8777202487', 'Hello GrowthPilot!');
  assert.equal(tenDigitIndian, 'https://wa.me/918777202487?text=Hello%20GrowthPilot!');

  const withoutPhone = buildWhatsAppContactUrl(null, 'Quick inquiry');
  assert.equal(withoutPhone, 'https://wa.me/?text=Quick%20inquiry');
});

test('resolveThankYouReceipt blocks direct unsubmitted access and failed deliveries, accepting dispatched receipts', () => {
  assert.equal(resolveThankYouReceipt(null, null), null);
  assert.equal(resolveThankYouReceipt(undefined, '{invalid-json'), null);
  assert.equal(isValidSubmissionReceipt({ inquiryId: 'INVALID' }), false);

  const failedReceipt = {
    inquiryId: 'GP-M9XYZ-0000',
    submittedAt: '2026-10-24T04:00:00.000Z',
    emailDispatched: false,
    emailError: 'EmailJS (service_test / template_test): Gmail_API: Invalid grant.',
    emailjsServiceId: 'service_test',
    message: 'Delivery failed.',
    summary: {
      name: 'Aarav Mehta',
      businessName: 'Meridian Precision Systems',
      email: 'aarav@meridiansystems.com',
      serviceOfInterest: 'Website Design & Development',
    },
  };
  assert.equal(isValidSubmissionReceipt(failedReceipt), false);
  assert.equal(resolveThankYouReceipt(failedReceipt, null), null);

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

test('buildCanonicalUrl normalizes trailing slashes, query parameters, and hash fragments', () => {
  const origin = 'https://growthpilotagency-ten.vercel.app';
  assert.equal(buildCanonicalUrl('/', origin), 'https://growthpilotagency-ten.vercel.app/');
  assert.equal(
    buildCanonicalUrl('/services/', origin),
    'https://growthpilotagency-ten.vercel.app/services'
  );
  assert.equal(
    buildCanonicalUrl('/dental-implant-marketing?utm_source=google#top', origin),
    'https://growthpilotagency-ten.vercel.app/dental-implant-marketing'
  );
  assert.equal(
    buildCanonicalUrl('about/', `${origin}/`),
    'https://growthpilotagency-ten.vercel.app/about'
  );
});

test('buildBreadcrumbSchema generates valid Schema.org BreadcrumbList with 1-indexed positions', () => {
  const schema = buildBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Dental Implant Marketing', path: '/dental-implant-marketing/' },
    ],
    'https://growthpilotagency-ten.vercel.app'
  );
  assert.equal(schema['@type'], 'BreadcrumbList');
  const items = schema.itemListElement as Array<Record<string, unknown>>;
  assert.equal(items.length, 3);
  assert.equal(items[0].position, 1);
  assert.equal(items[0].item, 'https://growthpilotagency-ten.vercel.app/');
  assert.equal(items[2].position, 3);
  assert.equal(
    items[2].item,
    'https://growthpilotagency-ten.vercel.app/dental-implant-marketing'
  );
});

test('shouldTrackLeadSubmission deduplicates conversion events by inquiryId', () => {
  const trackerSet = new Set<string>();
  assert.equal(shouldTrackLeadSubmission('', trackerSet), false);
  assert.equal(shouldTrackLeadSubmission('INVALID-123', trackerSet), false);
  assert.equal(shouldTrackLeadSubmission('GP-LEAD-001', trackerSet), true);
  // Duplicate call with same inquiryId must return false
  assert.equal(shouldTrackLeadSubmission('GP-LEAD-001', trackerSet), false);
  // Distinct inquiryId must return true
  assert.equal(shouldTrackLeadSubmission('GP-LEAD-002', trackerSet), true);
});

test('readEmailJsServerConfig ignores VITE_EMAILJS_PRIVATE_KEY and avoids hardcoded secrets', () => {
  const cfg = readEmailJsServerConfig({
    VITE_EMAILJS_PRIVATE_KEY: 'should_never_be_used',
  });
  assert.equal(cfg.serviceId, '');
  assert.equal(cfg.templateId, '');
  assert.equal(cfg.publicKey, '');
  assert.equal(cfg.privateKey, '');
});

test('dispatchEmailJsRest reports genuine success/failure without false 450ms timeout success', async () => {
  const validation = validateContactForm({
    name: 'Alex Morgan',
    businessName: 'Summit HVAC',
    email: 'alex@summithvac.example',
    serviceOfInterest: 'Google Ads & Performance Marketing',
    projectGoals: 'Looking to generate qualified residential HVAC installation enquiries.',
    consent: true,
  });
  const params = buildEmailJsTemplateParams(
    validation.sanitized,
    'GP-TEST-99',
    '2026-11-26T12:00:00.000Z'
  );

  // Incomplete config fails accurately
  const missingRes = await dispatchEmailJsRest({
    config: { serviceId: '', templateId: '', publicKey: '', privateKey: '', recipientEmail: '' },
    templateParams: params,
    origin: 'https://growthpilotagency-ten.vercel.app',
  });
  assert.equal(missingRes.sent, false);
  assert.ok(missingRes.err?.includes('incomplete'));

  // Slow (>500ms) genuine failure must return sent: false with EmailJS error
  const failRes = await dispatchEmailJsRest({
    config: {
      serviceId: 'service_test',
      templateId: 'template_test',
      publicKey: 'pub_test',
      privateKey: '',
      recipientEmail: 'abhijitroy40311@gmail.com',
    },
    templateParams: params,
    origin: 'https://growthpilotagency-ten.vercel.app',
    timeoutMs: 2000,
    fetchImpl: (async () => {
      await new Promise((r) => setTimeout(r, 500));
      return new Response('Gmail_API: Invalid grant.', { status: 412 });
    }) as typeof fetch,
  });
  assert.equal(failRes.sent, false);
  assert.ok(failRes.err?.includes('Gmail_API: Invalid grant.'));

  // Slow (>500ms) genuine 200 OK returns sent: true
  const okRes = await dispatchEmailJsRest({
    config: {
      serviceId: 'service_test',
      templateId: 'template_test',
      publicKey: 'pub_test',
      privateKey: 'priv_test',
      recipientEmail: 'abhijitroy40311@gmail.com',
    },
    templateParams: params,
    origin: 'https://growthpilotagency-ten.vercel.app',
    timeoutMs: 2000,
    fetchImpl: (async () => {
      await new Promise((r) => setTimeout(r, 500));
      return new Response('OK', { status: 200 });
    }) as typeof fetch,
  });
  assert.equal(okRes.sent, true);
  assert.equal(okRes.err, null);
});

test('CANONICAL_ROUTE_META includes /faq, marks /thank-you noindex, and excludes redirect aliases', () => {
  const paths = CANONICAL_ROUTE_META.map((r) => r.path);
  assert.ok(paths.includes('/faq'));
  assert.equal(paths.includes('/faqs'), false);
  assert.equal(paths.includes('/work'), false);
  assert.equal(paths.includes('/about-us'), false);
  assert.equal(paths.includes('/contact-us'), false);

  const thankYou = CANONICAL_ROUTE_META.find((r) => r.path === '/thank-you');
  assert.equal(thankYou?.noindex, true);
  assert.equal(thankYou?.sitemap, undefined);
});


