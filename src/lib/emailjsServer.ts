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
  env: Record<string, string | undefined> = process.env
): EmailJsServerConfig {
  return {
    serviceId: (env.EMAILJS_SERVICE_ID || env.VITE_EMAILJS_SERVICE_ID || '').trim(),
    templateId: (env.EMAILJS_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID || '').trim(),
    publicKey: (env.EMAILJS_PUBLIC_KEY || env.VITE_EMAILJS_PUBLIC_KEY || '').trim(),
    privateKey: (env.EMAILJS_PRIVATE_KEY || '').trim(),
    recipientEmail: (
      env.CONTACT_EMAIL ||
      env.VITE_CONTACT_EMAIL ||
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
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    return {
      sent: false,
      err: 'EmailJS server configuration is incomplete (missing Service ID, Template ID, or Public Key).',
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

