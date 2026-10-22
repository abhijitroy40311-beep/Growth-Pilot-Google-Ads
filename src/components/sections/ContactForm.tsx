import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Send,
  RotateCcw,
  Mail,
  MessageCircle,
} from 'lucide-react';
import {
  ContactFormPayload,
  ContactFormErrors,
  validateContactForm,
  buildEmailJsTemplateParams,
  buildWhatsAppContactUrl,
  buildWhatsAppInquiryMessage,
} from '../../lib/validation';
import { servicesData } from '../../data/services';
import { siteConfig } from '../../data/siteConfig';

const budgetOptions = [
  'Not sure yet — need guidance',
  'Under $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
];

interface SubmissionReceipt {
  inquiryId: string;
  submittedAt: string;
  emailDispatched: boolean;
  emailError?: string | null;
  emailjsServiceId: string;
  emailjsTemplateId?: string;
  message: string;
  summary: {
    name: string;
    businessName: string;
    email: string;
    serviceOfInterest: string;
  };
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormPayload>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    websiteUrl: '',
    serviceOfInterest: '',
    projectBudget: '',
    projectGoals: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (errors[name as keyof ContactFormPayload]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof ContactFormPayload];
        return copy;
      });
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const { serviceId, templateId, publicKey } = siteConfig.emailjs;
      const clientInquiryId = `GP-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
      const submittedAt = new Date().toISOString();

      let clientEmailSent = false;
      let clientEmailError: string | null = null;

      // 1. Primary Client-Side EmailJS Dispatch (works directly from browser with Public Key)
      if (serviceId && templateId && publicKey) {
        try {
          const emailjsModule = await import('@emailjs/browser');
          const emailjs = emailjsModule.default || emailjsModule;
          const templateParams = buildEmailJsTemplateParams(
            validation.sanitized,
            clientInquiryId,
            submittedAt,
            siteConfig.contact.email || 'abhijitroy40311@gmail.com'
          );
          await emailjs.send(serviceId, templateId, templateParams, {
            publicKey,
          });
          clientEmailSent = true;
        } catch (err) {
          clientEmailError =
            err && typeof err === 'object' && 'text' in err
              ? String((err as { text: string }).text)
              : err instanceof Error
              ? err.message
              : 'Client-side EmailJS dispatch failed';
        }
      }

      // 2. Server-Side Inquiry Log & Automatic REST Fallback (uses Private Key if client was blocked)
      const response = await fetch(siteConfig.contact.inquiryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validation.sanitized,
          inquiryId: clientInquiryId,
          submittedAt,
          clientEmailSent,
          clientEmailError,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.message ||
            'Unable to submit your inquiry right now. Please verify your details and try again.'
        );
        setSubmitting(false);
        return;
      }

      setReceipt({
        inquiryId: data.inquiryId || clientInquiryId,
        submittedAt: data.submittedAt || submittedAt,
        emailDispatched: Boolean(data.emailDispatched || clientEmailSent),
        emailError: data.emailError || null,
        emailjsServiceId: data.emailjsServiceId || serviceId,
        emailjsTemplateId: data.emailjsTemplateId || templateId,
        message: data.message,
        summary: data.summary,
      });
      setErrors({});
    } catch {
      setServerError(
        'A network error occurred while sending your inquiry. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setReceipt(null);
    setErrors({});
    setServerError(null);
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      websiteUrl: '',
      serviceOfInterest: '',
      projectBudget: '',
      projectGoals: '',
      consent: false,
      honeypot: '',
    });
  };

  if (receipt) {
    const fallbackMailtoHref = siteConfig.contact.email
      ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
          `GrowthPilot Inquiry [${receipt.inquiryId}] - ${receipt.summary.businessName}`
        )}&body=${encodeURIComponent(
          `Inquiry Reference: ${receipt.inquiryId}\nName: ${receipt.summary.name}\nBusiness: ${receipt.summary.businessName}\nEmail: ${receipt.summary.email}\nPhone: ${formData.phone || 'Not provided'}\nWebsite: ${formData.websiteUrl || 'Not provided'}\nService: ${receipt.summary.serviceOfInterest}\nBudget: ${formData.projectBudget || 'Not specified'}\n\nProject Goals:\n${formData.projectGoals}`
        )}`
      : null;

    const whatsappFollowupHref = buildWhatsAppContactUrl(
      siteConfig.contact.whatsapp,
      buildWhatsAppInquiryMessage(formData, receipt.inquiryId)
    );

    return (
      <div
        role="status"
        aria-live="polite"
        data-testid="contact-confirmation"
        className="rounded-2xl border border-[#00E6A8]/40 bg-[#0B0D10] p-6 sm:p-10 text-white shadow-2xl"
      >
        <div className="flex items-center gap-3 text-[#00E6A8]">
          <CheckCircle2 className="h-7 w-7 shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs">
            Inquiry Confirmed · Reference {receipt.inquiryId}
          </span>
        </div>

        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
          Thank you, {receipt.summary.name}.
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#A5AAB4] leading-relaxed">
          {receipt.message} We will review the objectives for{' '}
          <strong className="text-white">{receipt.summary.businessName}</strong> and follow up at{' '}
          <strong className="text-white">{receipt.summary.email}</strong> ({siteConfig.contact.responseWindow}).
        </p>

        {/* If EmailJS returned an error (e.g. Template ID not found), display clear diagnostic & 1-click mailto fallback */}
        {!receipt.emailDispatched && receipt.emailError && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-amber-500/40 bg-amber-950/25 p-4 text-xs sm:text-sm text-amber-200 space-y-2"
          >
            <div className="flex items-start gap-2.5 font-semibold text-amber-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>EmailJS Configuration Notice</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {receipt.emailError}
            </p>
            <p className="text-xs text-amber-200/80">
              Your Service ID (<code className="text-white">{receipt.emailjsServiceId}</code>) is valid, but the Template ID (<code className="text-white">{receipt.emailjsTemplateId || 'not set'}</code>) was not found in your EmailJS account. Please verify your Template ID at{' '}
              <span className="underline">dashboard.emailjs.com/admin/templates</span> and update <code className="text-white">VITE_EMAILJS_TEMPLATE_ID</code>.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-white/10 bg-[#050505] p-4 text-xs sm:text-sm space-y-1.5 font-mono text-[#A5AAB4]">
          <div>
            Inquiry Reference: <span className="text-white">{receipt.inquiryId}</span>
          </div>
          <div>
            Primary Focus:{' '}
            <span className="text-[#08D9F5]">{receipt.summary.serviceOfInterest}</span>
          </div>
          <div>
            Email Service:{' '}
            <span className="text-white">{receipt.emailjsServiceId}</span>
            {receipt.emailDispatched ? (
              <span className="text-[#00E6A8]"> · Sent to Inbox via EmailJS</span>
            ) : (
              <span className="text-amber-400"> · Pending Valid Template ID</span>
            )}
          </div>
          <div>
            Timestamp:{' '}
            <span className="text-white">
              {new Date(receipt.submittedAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={whatsappFollowupHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#050505] hover:bg-[#1ebe5d] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Send Inquiry on WhatsApp</span>
          </a>
          {fallbackMailtoHref && (
            <a
              href={fallbackMailtoHref}
              className="inline-flex items-center gap-2 rounded-lg gp-gradient-bg px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#050505] whitespace-nowrap shrink-0"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Send Copy via Email App ({siteConfig.contact.email})</span>
            </a>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#050505] px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:border-[#08D9F5]/50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Submit Another Inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="inquiry-form"
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#0B0D10] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6"
    >
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot field hidden from screen readers and visual users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-honeypot">Leave this field blank</label>
        <input
          id="contact-honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs sm:text-sm font-medium text-white"
          >
            Your Name <span className="text-[#08D9F5]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white placeholder-[#A5AAB4]/50 focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500/70 focus:ring-red-500/50'
                : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
            }`}
          />
          {errors.name && (
            <p id="error-name" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="contact-business"
            className="block text-xs sm:text-sm font-medium text-white"
          >
            Business Name <span className="text-[#08D9F5]">*</span>
          </label>
          <input
            id="contact-business"
            name="businessName"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g., Your Business"
            value={formData.businessName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? 'error-businessName' : undefined}
            className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white placeholder-[#A5AAB4]/50 focus:outline-none focus:ring-2 ${
              errors.businessName
                ? 'border-red-500/70 focus:ring-red-500/50'
                : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
            }`}
          />
          {errors.businessName && (
            <p
              id="error-businessName"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.businessName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs sm:text-sm font-medium text-white"
          >
            Email Address <span className="text-[#08D9F5]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white placeholder-[#A5AAB4]/50 focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500/70 focus:ring-red-500/50'
                : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
            }`}
          />
          {errors.email && (
            <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone (Optional) */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs sm:text-sm font-medium text-white"
          >
            Phone Number <span className="text-xs font-normal text-[#A5AAB4]">(Optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+0 (000) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white placeholder-[#A5AAB4]/50 focus:outline-none focus:ring-2 ${
              errors.phone
                ? 'border-red-500/70 focus:ring-red-500/50'
                : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
            }`}
          />
          {errors.phone && (
            <p id="error-phone" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Website URL (Optional) */}
        <div>
          <label
            htmlFor="contact-website"
            className="block text-xs sm:text-sm font-medium text-white"
          >
            Current Website URL{' '}
            <span className="text-xs font-normal text-[#A5AAB4]">(Optional)</span>
          </label>
          <input
            id="contact-website"
            name="websiteUrl"
            type="url"
            placeholder="https://yourbusiness.com"
            value={formData.websiteUrl}
            onChange={handleChange}
            aria-invalid={Boolean(errors.websiteUrl)}
            aria-describedby={errors.websiteUrl ? 'error-websiteUrl' : undefined}
            className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white placeholder-[#A5AAB4]/50 focus:outline-none focus:ring-2 ${
              errors.websiteUrl
                ? 'border-red-500/70 focus:ring-red-500/50'
                : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
            }`}
          />
          {errors.websiteUrl && (
            <p
              id="error-websiteUrl"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.websiteUrl}
            </p>
          )}
        </div>

        {/* Project Budget (Optional) */}
        <div>
          <label
            htmlFor="contact-budget"
            className="block text-xs sm:text-sm font-medium text-white"
          >
            Estimated Project Budget{' '}
            <span className="text-xs font-normal text-[#A5AAB4]">(Optional)</span>
          </label>
          <select
            id="contact-budget"
            name="projectBudget"
            value={formData.projectBudget}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-3 text-sm text-white focus:border-[#08D9F5] focus:outline-none focus:ring-2 focus:ring-[#08D9F5]/30"
          >
            <option value="">Select a budget range (optional)</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Service of Interest */}
      <div>
        <label
          htmlFor="contact-service"
          className="block text-xs sm:text-sm font-medium text-white"
        >
          Service of Interest <span className="text-[#08D9F5]">*</span>
        </label>
        <select
          id="contact-service"
          name="serviceOfInterest"
          required
          value={formData.serviceOfInterest}
          onChange={handleChange}
          aria-invalid={Boolean(errors.serviceOfInterest)}
          aria-describedby={
            errors.serviceOfInterest ? 'error-serviceOfInterest' : undefined
          }
          className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 ${
            errors.serviceOfInterest
              ? 'border-red-500/70 focus:ring-red-500/50'
              : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
          }`}
        >
          <option value="">Select the primary service you need</option>
          {servicesData.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Multiple Services / Full Digital Growth Package">
            Multiple Services / Full Digital Growth Package
          </option>
        </select>
        {errors.serviceOfInterest && (
          <p
            id="error-serviceOfInterest"
            role="alert"
            className="mt-1.5 text-xs text-red-400"
          >
            {errors.serviceOfInterest}
          </p>
        )}
      </div>

      {/* Project Goals */}
      <div>
        <label
          htmlFor="contact-goals"
          className="block text-xs sm:text-sm font-medium text-white"
        >
          Project Goals &amp; Current Challenges <span className="text-[#08D9F5]">*</span>
        </label>
        <textarea
          id="contact-goals"
          name="projectGoals"
          rows={4}
          required
          placeholder="Tell us about your business, what you want to improve (e.g., new website, better landing page conversion, Google Ads setup, or GA4 tracking), and your desired timeline."
          value={formData.projectGoals}
          onChange={handleChange}
          aria-invalid={Boolean(errors.projectGoals)}
          aria-describedby={errors.projectGoals ? 'error-projectGoals' : undefined}
          className={`mt-2 w-full rounded-xl border bg-[#050505] px-4 py-3 text-sm text-white placeholder-[#A5AAB4]/50 focus:outline-none focus:ring-2 ${
            errors.projectGoals
              ? 'border-red-500/70 focus:ring-red-500/50'
              : 'border-white/15 focus:border-[#08D9F5] focus:ring-[#08D9F5]/30'
          }`}
        />
        {errors.projectGoals && (
          <p
            id="error-projectGoals"
            role="alert"
            className="mt-1.5 text-xs text-red-400"
          >
            {errors.projectGoals}
          </p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={handleChange}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'error-consent' : undefined}
            className="mt-1 h-4 w-4 rounded border-white/25 bg-[#050505] text-[#08D9F5] focus:ring-[#08D9F5]"
          />
          <span className="text-xs sm:text-sm text-[#A5AAB4] leading-relaxed">
            I consent to GrowthPilot storing and processing the details submitted in this form to respond to my project inquiry, in accordance with the{' '}
            <Link
              to="/privacy-policy"
              className="text-[#08D9F5] underline underline-offset-4 hover:text-white"
            >
              Privacy Policy
            </Link>
            . <span className="text-[#08D9F5]">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="error-consent" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submit Action */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-[#A5AAB4]">
          Fields marked with <span className="text-[#08D9F5]">*</span> are required.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl gp-gradient-bg px-7 py-3.5 text-sm sm:text-base font-semibold text-[#050505] shadow-lg transition-transform duration-150 hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08D9F5]"
        >
          <span>{submitting ? 'Sending Inquiry...' : 'Send Project Inquiry'}</span>
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
