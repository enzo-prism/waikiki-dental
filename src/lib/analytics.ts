import { track } from "@vercel/analytics";
import type { BeforeSendEvent } from "@vercel/analytics/next";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Named conversion events only. Never attach phone, email, or other PII. */
export const ANALYTICS_EVENTS = {
  appointmentPhoneClick: "Appointment Phone Click",
  appointmentEmailClick: "Appointment Email Click",
  generateLead: "generate_lead",
} as const;

export const GENERATE_LEAD_FORM_TYPES = {
  contact: "contact",
} as const;

export type GenerateLeadFormType =
  (typeof GENERATE_LEAD_FORM_TYPES)[keyof typeof GENERATE_LEAD_FORM_TYPES];

export type AllowedAnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

const allowedAnalyticsEvents = new Set<string>(Object.values(ANALYTICS_EVENTS));

export function isAllowedAnalyticsEvent(
  name: string,
): name is AllowedAnalyticsEvent {
  return allowedAnalyticsEvents.has(name);
}

/**
 * Forwards an allowlisted click to Vercel Analytics `track` and to `gtag`
 * when GA is present. The event name is the only payload.
 */
export function trackAllowedEvent(name: string) {
  if (!isAllowedAnalyticsEvent(name)) return false;
  try {
    track(name);
  } catch {
    // Script may be absent on local or when Web Analytics is off.
  }
  if (typeof window !== "undefined") {
    window.gtag?.("event", name);
  }
  return true;
}

/**
 * GA4 recommended lead event for a successful contact Formspree response.
 * Only `form_type` and the grouped `page_path` are sent — never name, email,
 * phone, message, topic, or attribution fields.
 */
export function trackGenerateLead(formType: GenerateLeadFormType) {
  switch (formType) {
    case GENERATE_LEAD_FORM_TYPES.contact:
      break;
    default: {
      const _exhaustive: never = formType;
      void _exhaustive;
      return false;
    }
  }

  if (typeof window === "undefined") return false;

  const pagePath = sanitizeAnalyticsPath(window.location.pathname);
  if (!pagePath) return false;

  const params = {
    form_type: formType,
    page_path: pagePath,
  };

  try {
    track(ANALYTICS_EVENTS.generateLead);
  } catch {
    // Script may be absent on local or when Web Analytics is off.
  }

  window.gtag?.("event", ANALYTICS_EVENTS.generateLead, params);
  return true;
}

const PRACTICE_PATHS = new Set([
  "/michael-narodovich-dmd",
  "/new-patients",
  "/roseville-dental-care",
  "/waikiki-dental-roseville",
]);

function normalizedPathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

export function sanitizeAnalyticsPath(pathname: string) {
  const normalized = normalizedPathname(pathname);

  if (normalized === "/privacy-practices") return null;
  if (normalized === "/") return "/";
  if (
    normalized === "/request-appointment" ||
    normalized === "/contact-waikiki-dental"
  ) {
    return "/conversion";
  }
  if (normalized === "/patient-testimonials") return "/reviews";
  if (PRACTICE_PATHS.has(normalized)) return "/practice";
  if (normalized.startsWith("/dental-blog/")) return "/education";
  return "/services";
}

/**
 * Keeps Vercel Web Analytics useful without retaining query strings, service
 * interests, or an exact appointment path. Never add form values, treatment
 * reasons, contact details, or attribution parameters to this event.
 */
export function sanitizeVercelAnalyticsEvent(
  event: BeforeSendEvent,
): BeforeSendEvent | null {
  try {
    const isAbsolute = /^https?:\/\//i.test(event.url);
    const url = new URL(event.url, "https://analytics.invalid");
    const path = sanitizeAnalyticsPath(url.pathname);

    if (!path) return null;

    return {
      ...event,
      url: isAbsolute ? `${url.origin}${path}` : path,
    };
  } catch {
    return null;
  }
}
