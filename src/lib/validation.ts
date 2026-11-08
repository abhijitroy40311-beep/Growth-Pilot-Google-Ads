export interface ContactFormPayload {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  serviceOfInterest: string;
  projectBudget?: string;
  projectGoals: string;
  consent: boolean;
  /** Honeypot spam trap — must remain empty */
  honeypot?: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormPayload, string>>;

export interface ValidationResult {
  valid: boolean;
  errors: ContactFormErrors;
  sanitized: ContactFormPayload;
}

export interface EmailJsTemplateParams extends Record<string, string> {
  // Standard default EmailJS template variables
  name: string;
  from_name: string;
  user_name: string;
  email: string;
  from_email: string;
  user_email: string;
  reply_to: string;
  to_name: string;
  to_email: string;
  subject: string;
  title: string;
  // GrowthPilot specific template variables
  business_name: string;
  company: string;
  phone: string;
  website_url: string;
  service_of_interest: string;
  project_budget: string;
  project_goals: string;
  message: string;
  inquiry_id: string;
  submitted_at: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[0-9+\-() .\s]{6,25}$/;

export function isValidOptionalUrl(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return true;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    return Boolean(parsed.hostname && parsed.hostname.includes('.'));
  } catch {
    return false;
  }
}

export function validateContactForm(payload: Partial<ContactFormPayload>): ValidationResult {
  const sanitized: ContactFormPayload = {
    name: (payload.name ?? '').trim(),
    businessName: (payload.businessName ?? '').trim(),
    email: (payload.email ?? '').trim(),
    phone: (payload.phone ?? '').trim(),
    websiteUrl: (payload.websiteUrl ?? '').trim(),
    serviceOfInterest: (payload.serviceOfInterest ?? '').trim(),
    projectBudget: (payload.projectBudget ?? '').trim(),
    projectGoals: (payload.projectGoals ?? '').trim(),
    consent: Boolean(payload.consent),
    honeypot: (payload.honeypot ?? '').trim(),
  };

  const errors: ContactFormErrors = {};

  if (sanitized.honeypot && sanitized.honeypot.length > 0) {
    errors.honeypot = 'Spam check triggered.';
  }

  if (!sanitized.name || sanitized.name.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  } else if (sanitized.name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!sanitized.businessName || sanitized.businessName.length < 2) {
    errors.businessName = 'Please enter your business or organization name.';
  } else if (sanitized.businessName.length > 120) {
    errors.businessName = 'Business name must be 120 characters or fewer.';
  }

  if (!sanitized.email) {
    errors.email = 'Please enter a valid business email address.';
  } else if (!EMAIL_REGEX.test(sanitized.email)) {
    errors.email = 'Please check the format of your email address (e.g., name@company.com).';
  }

  if (sanitized.phone && !PHONE_REGEX.test(sanitized.phone)) {
    errors.phone = 'Please enter a valid phone number (6–25 digits, +, -, spaces allowed).';
  }

  if (sanitized.websiteUrl && !isValidOptionalUrl(sanitized.websiteUrl)) {
    errors.websiteUrl = 'Please enter a valid website URL (e.g., https://yourbusiness.com).';
  }

  if (!sanitized.serviceOfInterest) {
    errors.serviceOfInterest = 'Please select the primary service you are interested in.';
  }

  if (!sanitized.projectGoals || sanitized.projectGoals.length < 15) {
    errors.projectGoals =
      'Please tell us a bit more about your goals (at least 15 characters).';
  } else if (sanitized.projectGoals.length > 2500) {
    errors.projectGoals = 'Project goals must be 2,500 characters or fewer.';
  }

  if (!sanitized.consent) {
    errors.consent = 'Please confirm that you agree to our Privacy Policy so we can respond.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

export function buildEmailJsTemplateParams(
  sanitized: ContactFormPayload,
  inquiryId: string,
  submittedAt: string,
  recipientEmail: string = ''
): EmailJsTemplateParams {
  const formattedMessage = [
    `Inquiry Reference: ${inquiryId}`,
    `Name: ${sanitized.name}`,
    `Business Name: ${sanitized.businessName}`,
    `Email: ${sanitized.email}`,
    `Phone: ${sanitized.phone || 'Not provided'}`,
    `Website URL: ${sanitized.websiteUrl || 'Not provided'}`,
    `Service of Interest: ${sanitized.serviceOfInterest}`,
    `Project Budget: ${sanitized.projectBudget || 'Not specified'}`,
    `Submitted At: ${submittedAt}`,
    '',
    'Project Goals:',
    sanitized.projectGoals,
  ].join('\n');

  const subjectLine = `New GrowthPilot Inquiry: ${sanitized.businessName} (${sanitized.serviceOfInterest})`;

  return {
    name: sanitized.name,
    from_name: sanitized.name,
    user_name: sanitized.name,
    email: sanitized.email,
    from_email: sanitized.email,
    user_email: sanitized.email,
    reply_to: sanitized.email,
    to_name: 'GrowthPilot Team',
    to_email: recipientEmail || 'abhijitroy40311@gmail.com',
    subject: subjectLine,
    title: subjectLine,
    business_name: sanitized.businessName,
    company: sanitized.businessName,
    phone: sanitized.phone || 'Not provided',
    website_url: sanitized.websiteUrl || 'Not provided',
    service_of_interest: sanitized.serviceOfInterest,
    project_budget: sanitized.projectBudget || 'Not specified',
    project_goals: sanitized.projectGoals,
    message: formattedMessage,
    inquiry_id: inquiryId,
    submitted_at: submittedAt,
  };
}

/**
 * Builds a clean WhatsApp click-to-chat URL (`https://wa.me/...`)
 * sanitizing any phone number to E.164 digits (prepending 91 for 10-digit Indian mobile numbers)
 * and URL-encoding the prefilled message.
 */
export function buildWhatsAppContactUrl(
  phoneNumber?: string | null,
  defaultMessage: string = "Hi GrowthPilot team! I'd like to discuss a project and learn how we can work together."
): string {
  let digits = (phoneNumber ?? '').replace(/\D+/g, '');
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    digits = `91${digits}`;
  }
  const trimmedMsg = defaultMessage.trim();
  const query = trimmedMsg ? `?text=${encodeURIComponent(trimmedMsg)}` : '';
  return digits ? `https://wa.me/${digits}${query}` : `https://wa.me/${query}`;
}

export function buildWhatsAppInquiryMessage(
  sanitized: ContactFormPayload,
  inquiryId: string
): string {
  return [
    `Hi GrowthPilot! Here is my project inquiry (${inquiryId}):`,
    `• Name: ${sanitized.name}`,
    `• Business: ${sanitized.businessName}`,
    `• Email: ${sanitized.email}`,
    sanitized.phone ? `• Phone: ${sanitized.phone}` : null,
    `• Service: ${sanitized.serviceOfInterest}`,
    sanitized.projectBudget ? `• Budget: ${sanitized.projectBudget}` : null,
    `• Goals: ${sanitized.projectGoals}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export const THANK_YOU_RECEIPT_STORAGE_KEY = 'gp_latest_inquiry_receipt';

export interface SubmissionReceipt {
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
  formData?: ContactFormPayload;
}

export function isValidSubmissionReceipt(candidate: unknown): candidate is SubmissionReceipt {
  if (!candidate || typeof candidate !== 'object') return false;
  const obj = candidate as Record<string, unknown>;
  if (typeof obj.inquiryId !== 'string' || !obj.inquiryId.startsWith('GP-')) return false;
  if (typeof obj.submittedAt !== 'string' || !obj.submittedAt) return false;
  if (!obj.summary || typeof obj.summary !== 'object') return false;
  const summary = obj.summary as Record<string, unknown>;
  return (
    typeof summary.name === 'string' &&
    summary.name.trim().length > 0 &&
    typeof summary.businessName === 'string' &&
    summary.businessName.trim().length > 0 &&
    typeof summary.email === 'string' &&
    summary.email.trim().length > 0 &&
    typeof summary.serviceOfInterest === 'string' &&
    summary.serviceOfInterest.trim().length > 0
  );
}

export function resolveThankYouReceipt(
  locationStateReceipt: unknown,
  sessionStorageRaw?: string | null
): SubmissionReceipt | null {
  if (isValidSubmissionReceipt(locationStateReceipt)) {
    return locationStateReceipt;
  }
  if (sessionStorageRaw) {
    try {
      const parsed = JSON.parse(sessionStorageRaw);
      if (isValidSubmissionReceipt(parsed)) {
        return parsed;
      }
    } catch {
      return null;
    }
  }
  return null;
}
