import type { BeforeSendEvent } from "@vercel/analytics/next";

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

function analyticsPath(pathname: string) {
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
    const path = analyticsPath(url.pathname);

    if (!path) return null;

    return {
      ...event,
      url: isAbsolute ? `${url.origin}${path}` : path,
    };
  } catch {
    return null;
  }
}
