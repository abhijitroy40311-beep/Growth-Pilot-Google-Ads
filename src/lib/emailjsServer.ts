import type { EmailJsTemplateParams } from './validation.js';

export interface EmailJsServerConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
  recipientEmail: string;
}

export interface EmailJsDispatchResult {
  sent: boolean;
  err: string | null;
}

export interface DispatchEmailJsOptions {
  config: EmailJsServerConfig;
  templateParams: EmailJsTemplateParams;
  origin: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

const DEFAULT_EMAILJS_TIMEOUT_MS = 8500;

/**
 * Reads EmailJS server configuration from environment variables without
 * hardcoded secret or unconfirmed service ID fallbacks.
 */
export function readEmailJsServerConfig(
  env?: Record<string, string | undefined>
): EmailJsServerConfig {
  const sourceEnv: Record<string, string | undefined> =
    env ?? (typeof process !== 'undefined' && process.env ? process.env : {});
  return {
    serviceId: (sourceEnv.EMAILJS_SERVICE_ID || sourceEnv.VITE_EMAILJS_SERVICE_ID || '').trim(),
    templateId: (sourceEnv.EMAILJS_TEMPLATE_ID || sourceEnv.VITE_EMAILJS_TEMPLATE_ID || '').trim(),
    publicKey: (sourceEnv.EMAILJS_PUBLIC_KEY || sourceEnv.VITE_EMAILJS_PUBLIC_KEY || '').trim(),
    privateKey: (sourceEnv.EMAILJS_PRIVATE_KEY || '').trim(),
    recipientEmail: (
      sourceEnv.CONTACT_EMAIL ||
      sourceEnv.VITE_CONTACT_EMAIL ||
      'abhijitroy40311@gmail.com'
    ).trim(),
  };
}

/**
 * Dispatches an inquiry via the EmailJS REST API and awaits its genuine response
 * with an AbortController timeout. Never reports sent: true unless EmailJS returns HTTP 2xx.
 */
export async function dispatchEmailJsRest({
  config,
  templateParams,
  origin,
  timeoutMs = DEFAULT_EMAILJS_TIMEOUT_MS,
  fetchImpl = fetch,
}: DispatchEmailJsOptions): Promise<EmailJsDispatchResult> {
  const missingFields: string[] = [];
  if (!config.serviceId) missingFields.push('EMAILJS_SERVICE_ID');
  if (!config.templateId) missingFields.push('EMAILJS_TEMPLATE_ID');
  if (!config.publicKey) missingFields.push('EMAILJS_PUBLIC_KEY');

  if (missingFields.length > 0) {
    return {
      sent: false,
      err: `EmailJS server configuration is incomplete (missing ${missingFields.join(', ')}).`,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const emailResponse = await fetchImpl('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Origin: origin,
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        ...(config.privateKey ? { accessToken: config.privateKey } : {}),
        template_params: templateParams,
      }),
    });

    const responseText = (await emailResponse.text()).trim();
    if (emailResponse.ok) {
      return { sent: true, err: null };
    }

    return {
      sent: false,
      err: `EmailJS (${config.serviceId} / ${config.templateId}): ${responseText || `HTTP ${emailResponse.status}`
        }`,
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        sent: false,
        err: `EmailJS (${config.serviceId} / ${config.templateId}): Request timed out after ${timeoutMs}ms.`,
      };
    }

    return {
      sent: false,
      err: err instanceof Error ? err.message : 'Unable to reach EmailJS API.',
    };
  } finally {
    clearTimeout(timer);
  }
}

