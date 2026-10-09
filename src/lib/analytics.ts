import { track } from "@vercel/analytics";
import type { BeforeSendEvent } from "@vercel/analytics/next";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Named conversion clicks only. Never attach phone, email, or other PII. */
export const ANALYTICS_EVENTS = {
  appointmentPhoneClick: "Appointment Phone Click",
  appointmentEmailClick: "Appointment Email Click",
} as const;

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
