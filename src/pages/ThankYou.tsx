import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageCircle,
  RotateCcw,
  ArrowRight,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Home,
} from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getRouteMetaByPath } from '../lib/routeMeta';
import {
  THANK_YOU_RECEIPT_STORAGE_KEY,
  resolveThankYouReceipt,
  buildWhatsAppContactUrl,
  buildWhatsAppInquiryMessage,
  ContactFormPayload,
} from '../lib/validation';
import { siteConfig } from '../data/siteConfig';

const nextSteps = [
  {
    step: '01',
    title: 'Personal Brief & Website Review',
    description:
      'I inspect your target markets, search intent, website or landing pages, and any active tracking notes to identify the highest-leverage fixes.',
  },
  {
    step: '02',
    title: 'Clear Diagnostic & Scope Outline',
    description:
      'You receive straightforward recommendations covering campaign architecture, conversion tracking, and practical milestones—zero sales fluff.',
  },
  {
    step: '03',
    title: 'Direct Reply Within 1–2 Business Days',
    description:
      'I reply directly to your email (or WhatsApp if preferred) to share initial observations and schedule a 15-minute discovery call.',
  },
];

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(false);

  const meta = getRouteMetaByPath('/thank-you')!;

  useDocumentMeta({
    title: meta.title,
    description: meta.description,
    path: '/thank-you',
    noindex: true,
  });

  const locationReceipt = (
    location.state as { receipt?: unknown } | null | undefined
  )?.receipt;

  const storedReceiptRaw =
    typeof window !== 'undefined'
      ? window.sessionStorage.getItem(THANK_YOU_RECEIPT_STORAGE_KEY)
      : null;

  const receipt = resolveThankYouReceipt(locationReceipt, storedReceiptRaw);

  // Strict guard: Only show the Thank-You page after genuine email delivery succeeds
  if (!receipt || !receipt.emailDispatched) {
    return <Navigate to="/contact" replace />;
  }

  const fallbackFormData: ContactFormPayload = receipt.formData ?? {
    name: receipt.summary.name,
    businessName: receipt.summary.businessName,
    email: receipt.summary.email,
    phone: '',
    websiteUrl: '',
    serviceOfInterest: receipt.summary.serviceOfInterest,
    projectBudget: '',
    projectGoals: 'Submitted via GrowthPilot Contact Form.',
    consent: true,
    honeypot: '',
  };

  const whatsappFollowupHref = buildWhatsAppContactUrl(
    siteConfig.contact.whatsapp,
    buildWhatsAppInquiryMessage(fallbackFormData, receipt.inquiryId)
  );

  const fallbackMailtoHref = siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
        `GrowthPilot Inquiry [${receipt.inquiryId}] - ${receipt.summary.businessName}`
      )}&body=${encodeURIComponent(
        `Inquiry Reference: ${receipt.inquiryId}\nName: ${receipt.summary.name}\nBusiness: ${receipt.summary.businessName}\nEmail: ${receipt.summary.email}\nPhone: ${fallbackFormData.phone || 'Not provided'}\nWebsite: ${fallbackFormData.websiteUrl || 'Not provided'}\nService: ${receipt.summary.serviceOfInterest}\nBudget: ${fallbackFormData.projectBudget || 'Not specified'}\n\nProject Goals:\n${fallbackFormData.projectGoals}`
      )}`
    : null;

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(receipt.inquiryId);
      setCopiedId(true);
      window.setTimeout(() => setCopiedId(false), 2200);
    } catch {
      setCopiedId(false);
    }
  };

  const handleSubmitAnother = () => {
    try {
      window.sessionStorage.removeItem(THANK_YOU_RECEIPT_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
    navigate('/contact', { replace: true });
  };

  return (
    <section
      aria-labelledby="thank-you-heading"
      className="min-h-screen bg-[#090A0D] pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Confirmation Dossier */}
        <div
          role="status"
          aria-live="polite"
          data-testid="contact-confirmation"
          className="rounded-lg border border-[#18C4A8]/40 bg-[#111318] p-5 sm:p-10 lg:p-12"
        >
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2.5 text-[#18C4A8]">
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.12em]">
                Inquiry Confirmed · Submission Complete
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#090A0D] px-3 py-1.5 font-mono text-xs text-[#A6ADBB]">
              <span>Ref:</span>
              <strong className="text-[#F4F5F7]">{receipt.inquiryId}</strong>
              <button
                type="button"
                onClick={handleCopyReference}
                aria-label="Copy inquiry reference ID"
                className="ml-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#18C4A8] hover:bg-white/5 transition-colors"
              >
                {copiedId ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#18C4A8]" aria-hidden="true" />
                    <span className="text-[#18C4A8]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Primary Heading */}
          <div className="mt-8 max-w-3xl">
            <h1
              id="thank-you-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#F4F5F7] leading-[1.1]"
            >
              Thank you, {receipt.summary.name}.
              <span className="block mt-2 text-2xl sm:text-3xl text-[#A6ADBB] font-bold">
                Your brief has been received.
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#A6ADBB] leading-relaxed">
              {receipt.message} I will review the objectives for{' '}
              <strong className="text-[#F4F5F7] font-semibold">
                {receipt.summary.businessName}
              </strong>{' '}
              and reply directly to{' '}
              <strong className="text-[#F4F5F7] font-semibold">
                {receipt.summary.email}
              </strong>{' '}
              ({siteConfig.contact.responseWindow.toLowerCase()}).
            </p>
          </div>

          {/* Diagnostic alert only if returned */}
          {!receipt.emailDispatched && receipt.emailError && (
            <div
              role="alert"
              className="mt-6 rounded-md border border-amber-500/40 bg-amber-950/25 p-4 text-xs sm:text-sm text-amber-200 space-y-2"
            >
              <div className="flex items-start gap-2.5 font-semibold text-amber-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Direct Dispatch Notice</span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                {receipt.emailError}
              </p>
            </div>
          )}

          {/* Inquiry Dossier Grid */}
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-[#090A0D] p-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#8890A0]">
                Organization
              </div>
              <div className="mt-1.5 text-sm font-semibold text-[#F4F5F7] break-words">
                {receipt.summary.businessName}
              </div>
            </div>

            <div className="bg-[#090A0D] p-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#8890A0]">
                Service Focus
              </div>
              <div className="mt-1.5 text-sm font-semibold text-[#18C4A8] break-words">
                {receipt.summary.serviceOfInterest}
              </div>
            </div>

            <div className="bg-[#090A0D] p-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#8890A0]">
                Reply Email
              </div>
              <div className="mt-1.5 text-sm font-semibold text-[#F4F5F7] break-all">
                {receipt.summary.email}
              </div>
            </div>

            <div className="bg-[#090A0D] p-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#8890A0]">
                Dispatch Status
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#18C4A8]">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {receipt.emailDispatched
                    ? 'Delivered via EmailJS'
                    : 'Recorded & Verified'}
                </span>
              </div>
            </div>
          </div>

          {fallbackFormData.projectGoals && (
            <div className="mt-4 rounded-md border border-white/10 bg-[#090A0D] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-[#8890A0]">
                <span>Submitted Goals &amp; Context</span>
                {fallbackFormData.projectBudget && (
                  <span className="text-[#18C4A8]">
                    Estimated Budget: {fallbackFormData.projectBudget}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#F4F5F7]/90 leading-relaxed whitespace-pre-line">
                {fallbackFormData.projectGoals}
              </p>
            </div>
          )}

          {/* Direct Fast-Track Actions */}
          <div className="mt-8 rounded-md border border-white/12 bg-[#090A0D] p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
                  Need a Faster Reply?
                </div>
                <p className="text-xs sm:text-sm text-[#A6ADBB]">
                  Send your reference ID{' '}
                  <span className="font-mono text-[#F4F5F7]">({receipt.inquiryId})</span>{' '}
                  directly to Abhijit on WhatsApp for quick scheduling.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappFollowupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-xs sm:text-sm font-semibold text-[#090A0D] hover:bg-[#1ebe5d] transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Message on WhatsApp</span>
                </a>

                {fallbackMailtoHref && (
                  <a
                    href={fallbackMailtoHref}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/20 bg-[#111318] px-4 py-2 text-xs sm:text-sm font-medium text-[#F4F5F7] hover:border-white/45 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="h-4 w-4 text-[#18C4A8]" aria-hidden="true" />
                    <span>Save Copy in Email App</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#18C4A8]">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>What Happens Next</span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {nextSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-md border border-white/10 bg-[#090A0D] p-5"
                >
                  <span className="font-mono text-xs text-[#18C4A8] tabular-nums">
                    STEP {item.step}
                  </span>
                  <h2 className="mt-2 text-base font-bold text-[#F4F5F7]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#A6ADBB] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[#F4F5F7] px-5 py-2 text-xs sm:text-sm font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors whitespace-nowrap"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                <span>Back to Home</span>
              </Link>

              <Link
                to="/projects"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-2 text-xs sm:text-sm font-medium text-[#F4F5F7] hover:border-white/45 transition-colors whitespace-nowrap"
              >
                <span>Explore Blueprints</span>
                <ArrowRight className="h-4 w-4 text-[#18C4A8]" aria-hidden="true" />
              </Link>
            </div>

            <button
              type="button"
              onClick={handleSubmitAnother}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/15 bg-[#090A0D] px-4 py-2 text-xs sm:text-sm font-medium text-[#A6ADBB] hover:text-[#F4F5F7] hover:border-white/35 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Submit Another Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
