import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Send,
  Mail,
  MessageCircle,
} from 'lucide-react';
import {
  ContactFormPayload,
  ContactFormErrors,
  SubmissionReceipt,
  THANK_YOU_RECEIPT_STORAGE_KEY,
  validateContactForm,
  buildEmailJsTemplateParams,
  buildWhatsAppContactUrl,
  buildWhatsAppInquiryMessage,
} from '../../lib/validation';
import { servicesData } from '../../data/services';
import { siteConfig } from '../../data/siteConfig';
import { trackConversionEvent } from '../../lib/analytics';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const budgetOptions = [
  'Not sure yet — need guidance',
  'Under $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
];

interface FailedDeliveryContext {
  inquiryId: string;
  diagnostic: string | null;
  formData: ContactFormPayload;
}

export const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
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
  const [failedDelivery, setFailedDelivery] = useState<FailedDeliveryContext | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationReceipt, setConfirmationReceipt] = useState<SubmissionReceipt | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const errorAlertRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const submittingRef = useRef(false);
  const redirectTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current !== null) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!confirmationReceipt || typeof document === 'undefined') return;
    const htmlEl = document.documentElement;
    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    htmlEl.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const rafId = window.requestAnimationFrame(() => {
      confirmButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      htmlEl.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [confirmationReceipt]);

  const navigateToThankYou = useCallback(
    (receipt: SubmissionReceipt) => {
      if (redirectTimerRef.current !== null) {
        window.clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
      navigate('/thank-you', {
        state: { receipt },
        replace: true,
      });
    },
    [navigate]
  );

  const focusFirstErrorField = (validationErrors: ContactFormErrors) => {
    const orderedFields: (keyof ContactFormPayload)[] = [
      'name',
      'businessName',
      'email',
      'phone',
      'websiteUrl',
      'serviceOfInterest',
      'projectGoals',
      'consent',
    ];
    const firstKey = orderedFields.find((key) => Boolean(validationErrors[key]));
    if (!firstKey || !formRef.current) return;
    const fieldEl = formRef.current.querySelector<HTMLElement>(`[name="${firstKey}"]`);
    if (fieldEl) {
      fieldEl.focus({ preventScroll: true });
      fieldEl.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
    }
  };

  const finalizeAndRedirectToThankYou = (nextReceipt: SubmissionReceipt) => {
    if (!nextReceipt.emailDispatched) {
      return;
    }
    setErrors({});
    setServerError(null);
    setFailedDelivery(null);
    trackConversionEvent('generate_lead', {
      inquiry_id: nextReceipt.inquiryId,
      service_of_interest: nextReceipt.summary.serviceOfInterest,
      contact_method: 'form',
      event_category: 'lead',
      event_label: nextReceipt.summary.serviceOfInterest,
    });
    try {
      window.sessionStorage.setItem(
        THANK_YOU_RECEIPT_STORAGE_KEY,
        JSON.stringify(nextReceipt)
      );
    } catch {
      // Ignore storage quota errors
    }

    if (reducedMotion) {
      navigateToThankYou(nextReceipt);
      return;
    }

    setConfirmationReceipt(nextReceipt);
    redirectTimerRef.current = window.setTimeout(() => {
      navigateToThankYou(nextReceipt);
    }, 1150);
  };

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
    if (failedDelivery) {
      setFailedDelivery(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || confirmationReceipt !== null) {
      return;
    }
    setServerError(null);
    setFailedDelivery(null);

    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      window.requestAnimationFrame(() => focusFirstErrorField(validation.errors));
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    const { serviceId, templateId, publicKey } = siteConfig.emailjs;
    const recipientEmail = siteConfig.contact.email || 'abhijitroy40311@gmail.com';
    const clientInquiryId = `GP-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const recordDeliveryFailure = (message: string, diagnostic: string | null) => {
      setServerError(message);
      setFailedDelivery({
        inquiryId: clientInquiryId,
        diagnostic,
        formData: validation.sanitized,
      });
      window.requestAnimationFrame(() => {
        errorAlertRef.current?.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'center',
        });
        errorAlertRef.current?.focus({ preventScroll: true });
      });
    };

    try {
      // 1. Authoritative Server-Side Delivery via /api/contact (keeps private keys server-side)
      const response = await fetch(siteConfig.contact.inquiryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validation.sanitized,
          inquiryId: clientInquiryId,
          submittedAt,
        }),
      });

      const resContentType = response.headers.get('content-type') || '';
      const isJson = resContentType.includes('application/json');

      if (isJson) {
        const data = await response.json();

        if (response.status === 400 || response.status === 429) {
          if (data.errors) {
            setErrors(data.errors);
          }
          setServerError(
            data.message ||
              'Unable to submit your inquiry right now. Please verify your details and try again.'
          );
          return;
        }

        if (response.ok && data.ok && data.emailDispatched === true) {
          finalizeAndRedirectToThankYou({
            inquiryId: data.inquiryId || clientInquiryId,
            submittedAt: data.submittedAt || submittedAt,
            emailDispatched: true,
            emailError: null,
            emailjsServiceId: data.emailjsServiceId || serviceId,
            emailjsTemplateId: data.emailjsTemplateId || templateId,
            message: data.message,
            summary: data.summary,
            formData: validation.sanitized,
          });
          return;
        }

        recordDeliveryFailure(
          data.message ||
            'Your inquiry could not be delivered by email right now. Please send it via WhatsApp or Email below so nothing is lost.',
          typeof data.emailError === 'string' ? data.emailError : null
        );
        return;
      }

      // 2. Fallback to @emailjs/browser ONLY when static preview host has no backend API (404/405/HTML)
      if ((response.status === 404 || response.status === 405) && serviceId && templateId && publicKey) {
        try {
          const templateParams = buildEmailJsTemplateParams(
            validation.sanitized,
            clientInquiryId,
            submittedAt,
            recipientEmail
          );
          const emailjsModule = await import('@emailjs/browser');
          const emailjs = emailjsModule.default || emailjsModule;
          await emailjs.send(serviceId, templateId, templateParams, {
            publicKey,
          });
          finalizeAndRedirectToThankYou({
            inquiryId: clientInquiryId,
            submittedAt,
            emailDispatched: true,
            emailError: null,
            emailjsServiceId: serviceId,
            emailjsTemplateId: templateId,
            message:
              'Thank you. Your project inquiry has been sent directly to our inbox via EmailJS.',
            summary: {
              name: validation.sanitized.name,
              businessName: validation.sanitized.businessName,
              email: validation.sanitized.email,
              serviceOfInterest: validation.sanitized.serviceOfInterest,
            },
            formData: validation.sanitized,
          });
          return;
        } catch (sdkErr) {
          const sdkMsg =
            sdkErr && typeof sdkErr === 'object' && 'text' in sdkErr
              ? String((sdkErr as { text: string }).text)
              : sdkErr instanceof Error
                ? sdkErr.message
                : 'EmailJS dispatch failed';
          recordDeliveryFailure(
            'Unable to send your inquiry via email right now. Please use WhatsApp or your Email App below to send it directly.',
            `EmailJS (${serviceId} / ${templateId}): ${sdkMsg}`
          );
          return;
        }
      }

      if (response.status === 404 || response.status === 405) {
        const missingBuildVars: string[] = [];
        if (!serviceId) missingBuildVars.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missingBuildVars.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missingBuildVars.push('VITE_EMAILJS_PUBLIC_KEY');
        recordDeliveryFailure(
          'Our backend inquiry endpoint is unavailable on this static host, and browser fallback EmailJS keys are missing in this build. Please use WhatsApp or your Email App below to send your brief directly.',
          `API returned HTTP ${response.status}${missingBuildVars.length ? ` (missing fallback ${missingBuildVars.join(', ')})` : ''}`
        );
        return;
      }

      recordDeliveryFailure(
        'Our email delivery service returned an unexpected server error. Please use WhatsApp or your Email App below to send your brief directly.',
        `API returned HTTP ${response.status}`
      );
    } catch {
      recordDeliveryFailure(
        'A network error interrupted email delivery. Please use WhatsApp or your Email App below, or try again shortly.',
        null
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const fallbackMailtoHref =
    failedDelivery && siteConfig.contact.email
      ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
          `GrowthPilot Inquiry [${failedDelivery.inquiryId}] - ${failedDelivery.formData.businessName}`
        )}&body=${encodeURIComponent(
          `Inquiry Reference: ${failedDelivery.inquiryId}\nName: ${failedDelivery.formData.name}\nBusiness: ${failedDelivery.formData.businessName}\nEmail: ${failedDelivery.formData.email}\nPhone: ${failedDelivery.formData.phone || 'Not provided'}\nWebsite: ${failedDelivery.formData.websiteUrl || 'Not provided'}\nService: ${failedDelivery.formData.serviceOfInterest}\nBudget: ${failedDelivery.formData.projectBudget || 'Not specified'}\n\nProject Goals:\n${failedDelivery.formData.projectGoals}`
        )}`
      : null;

  const whatsappFollowupHref = failedDelivery
    ? buildWhatsAppContactUrl(
        siteConfig.contact.whatsapp,
        buildWhatsAppInquiryMessage(failedDelivery.formData, failedDelivery.inquiryId)
      )
    : null;

  return (
    <>
      <form
        ref={formRef}
        id="inquiry-form"
        noValidate
        aria-busy={submitting || confirmationReceipt !== null}
        onSubmit={handleSubmit}
        className="rounded-lg border border-white/12 bg-[#111318] p-5 sm:p-8 md:p-10 space-y-6"
      >
        {serverError && (
          <div
            ref={errorAlertRef}
            tabIndex={-1}
            role="alert"
            data-testid="contact-delivery-error"
            className="gp-popup-enter rounded-md border border-red-500/45 bg-red-950/35 p-4 text-sm text-red-100 space-y-3 focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-semibold text-[#F4F5F7]">Email delivery could not be completed</p>
              <p>{serverError}</p>
              {failedDelivery?.diagnostic && (
                <p className="font-mono text-xs text-red-200/80 break-words">
                  {failedDelivery.diagnostic}
                </p>
              )}
            </div>
          </div>

          {failedDelivery && (
            <div className="flex flex-wrap items-center gap-3 pt-1 pl-8">
              {whatsappFollowupHref && (
                <a
                  href={whatsappFollowupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-xs font-semibold text-[#090A0D] hover:bg-[#1ebe5d] transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send Inquiry on WhatsApp</span>
                </a>
              )}
              {fallbackMailtoHref && (
                <a
                  href={fallbackMailtoHref}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[#F4F5F7] px-4 py-2 text-xs font-semibold text-[#090A0D] hover:bg-[#18C4A8] transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Send Copy via Email App</span>
                </a>
              )}
            </div>
          )}
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
            className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
          >
            Your Name <span className="text-[#18C4A8]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g., Alex Morgan"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] placeholder-[#8890A0]/70 focus:outline-none focus:ring-2 ${errors.name
                ? 'border-red-500/70 focus:ring-red-500/40'
                : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
            className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
          >
            Business Name <span className="text-[#18C4A8]">*</span>
          </label>
          <input
            id="contact-business"
            name="businessName"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g., Summit HVAC Services"
            value={formData.businessName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? 'error-businessName' : undefined}
            className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] placeholder-[#8890A0]/70 focus:outline-none focus:ring-2 ${errors.businessName
                ? 'border-red-500/70 focus:ring-red-500/40'
                : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
            className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
          >
            Email Address <span className="text-[#18C4A8]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] placeholder-[#8890A0]/70 focus:outline-none focus:ring-2 ${errors.email
                ? 'border-red-500/70 focus:ring-red-500/40'
                : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
            className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
          >
            Phone Number <span className="text-xs font-normal text-[#8890A0]">(Optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] placeholder-[#8890A0]/70 focus:outline-none focus:ring-2 ${errors.phone
                ? 'border-red-500/70 focus:ring-red-500/40'
                : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
            className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
          >
            Current Website URL{' '}
            <span className="text-xs font-normal text-[#8890A0]">(Optional)</span>
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
            className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] placeholder-[#8890A0]/70 focus:outline-none focus:ring-2 ${errors.websiteUrl
                ? 'border-red-500/70 focus:ring-red-500/40'
                : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
            className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
          >
            Estimated Project Budget{' '}
            <span className="text-xs font-normal text-[#8890A0]">(Optional)</span>
          </label>
          <select
            id="contact-budget"
            name="projectBudget"
            value={formData.projectBudget}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-white/15 bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] focus:border-[#18C4A8] focus:outline-none focus:ring-2 focus:ring-[#18C4A8]/25"
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
          className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
        >
          Service of Interest <span className="text-[#18C4A8]">*</span>
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
          className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] focus:outline-none focus:ring-2 ${errors.serviceOfInterest
              ? 'border-red-500/70 focus:ring-red-500/40'
              : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
          className="block text-xs sm:text-sm font-medium text-[#F4F5F7]"
        >
          Project Goals &amp; Current Challenges <span className="text-[#18C4A8]">*</span>
        </label>
        <textarea
          id="contact-goals"
          name="projectGoals"
          rows={4}
          required
          placeholder="Tell me about your trade, target cities or countries, and what you want to improve (e.g., Google Ads lead quality, new landing page, or GA4 tracking)."
          value={formData.projectGoals}
          onChange={handleChange}
          aria-invalid={Boolean(errors.projectGoals)}
          aria-describedby={errors.projectGoals ? 'error-projectGoals' : undefined}
          className={`mt-2 w-full rounded-md border bg-[#090A0D] px-4 py-3 text-sm text-[#F4F5F7] placeholder-[#8890A0]/70 focus:outline-none focus:ring-2 ${errors.projectGoals
              ? 'border-red-500/70 focus:ring-red-500/40'
              : 'border-white/15 focus:border-[#18C4A8] focus:ring-[#18C4A8]/25'
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
            className="mt-1 h-4 w-4 rounded border-white/25 bg-[#090A0D] accent-[#18C4A8] focus:ring-[#18C4A8]"
          />
          <span className="text-xs sm:text-sm text-[#A6ADBB] leading-relaxed">
            I consent to GrowthPilot storing and processing the details submitted in this form to respond to my project inquiry, in accordance with the{' '}
            <Link
              to="/privacy-policy"
              className="text-[#18C4A8] underline underline-offset-4 hover:text-[#F4F5F7]"
            >
              Privacy Policy
            </Link>
            . <span className="text-[#18C4A8]">*</span>
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
        <p className="text-xs text-[#8890A0]">
          Fields marked with <span className="text-[#18C4A8]">*</span> are required.
        </p>

        <button
          type="submit"
          disabled={submitting || confirmationReceipt !== null}
          className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#F4F5F7] px-7 py-3 text-sm sm:text-base font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8] disabled:cursor-not-allowed disabled:opacity-75 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
        >
          {confirmationReceipt ? (
            <>
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Inquiry Confirmed! Opening Receipt...</span>
            </>
          ) : submitting ? (
            <>
              <Loader2
                className="h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span>Submitting Your Enquiry...</span>
            </>
          ) : (
            <>
              <span>Send Project Inquiry</span>
              <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>

      {confirmationReceipt &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-confirmation-popup-title"
            aria-describedby="inquiry-confirmation-popup-desc"
            data-testid="contact-confirmation-popup"
            className="gp-backdrop-enter fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <div className="gp-popup-enter relative w-full max-w-md rounded-lg border border-[#18C4A8]/45 bg-[#111318] p-6 sm:p-8 text-center shadow-2xl">
              <div
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-md border border-[#18C4A8]/40 bg-[#18C4A8]/12 text-[#18C4A8]"
              >
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[#18C4A8]">
                Inquiry Dispatched
              </p>
              <h2
                id="inquiry-confirmation-popup-title"
                className="mt-2 text-2xl font-bold tracking-tight text-[#F4F5F7]"
              >
                Inquiry Sent Successfully!
              </h2>
              <p
                id="inquiry-confirmation-popup-desc"
                className="mt-2.5 text-sm leading-relaxed text-[#A6ADBB]"
              >
                Thank you,{' '}
                <strong className="font-semibold text-[#F4F5F7]">
                  {confirmationReceipt.summary.name}
                </strong>
                . Your project brief has been received for{' '}
                <strong className="font-semibold text-[#F4F5F7]">
                  {confirmationReceipt.summary.businessName}
                </strong>
                .
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/12 bg-[#090A0D] px-3 py-1.5 font-mono text-xs text-[#A6ADBB]">
                <span>Ref:</span>
                <strong className="text-[#F4F5F7]">{confirmationReceipt.inquiryId}</strong>
              </div>

              <div className="mt-6 space-y-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="gp-progress-fill h-full w-full bg-[#18C4A8]" />
                </div>
                <p className="text-xs text-[#18C4A8]">
                  Opening your Thank You confirmation page...
                </p>
              </div>

              <button
                ref={confirmButtonRef}
                type="button"
                onClick={() => navigateToThankYou(confirmationReceipt)}
                className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#F4F5F7] px-5 py-2.5 text-sm font-semibold text-[#090A0D] transition-colors duration-150 hover:bg-[#18C4A8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18C4A8]"
              >
                <span>View Confirmation Now</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
