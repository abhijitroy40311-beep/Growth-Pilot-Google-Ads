export type ConversionEventName =
  | 'generate_lead'
  | 'phone_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'appointment_inquiry_click';

export interface ConversionEventParams {
  event_category?: string;
  event_label?: string;
  service_of_interest?: string;
  inquiry_id?: string;
  page_path?: string;
  contact_method?: 'form' | 'phone' | 'whatsapp' | 'email';
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

const dispatchedLeadIds = new Set<string>();

/**
 * Pure helper to check and record whether a form submission inquiryId
 * has already been tracked in this session, preventing duplicate conversion events.
 */
export function shouldTrackLeadSubmission(
  inquiryId: string,
  alreadyTrackedSet: Set<string> = dispatchedLeadIds
): boolean {
  const normalized = (inquiryId || '').trim();
  if (!normalized || !normalized.startsWith('GP-')) {
    return false;
  }
  if (alreadyTrackedSet.has(normalized)) {
    return false;
  }
  alreadyTrackedSet.add(normalized);
  return true;
}

/**
 * Dispatches a structured conversion or interaction event to Google Tag Manager (dataLayer)
 * and Google Analytics 4 / Google Ads (gtag) when present on the page.
 * Never fabricates tracking IDs or fires duplicate lead events.
 */
export function trackConversionEvent(
  eventName: ConversionEventName,
  params: ConversionEventParams = {}
): boolean {
  if (typeof window === 'undefined') return false;

  if (eventName === 'generate_lead') {
    if (!params.inquiry_id || !shouldTrackLeadSubmission(params.inquiry_id)) {
      return false;
    }
  }

  const payload: Record<string, unknown> = {
    event: eventName,
    page_path: params.page_path || window.location.pathname,
    timestamp: new Date().toISOString(),
    ...params,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  } else {
    window.dataLayer = [payload];
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: params.event_category || 'engagement',
      event_label: params.event_label || params.service_of_interest || eventName,
      inquiry_id: params.inquiry_id,
      service_of_interest: params.service_of_interest,
      contact_method: params.contact_method,
      page_path: payload.page_path,
    });
  }

  return true;
}
