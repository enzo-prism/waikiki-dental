export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-BKCF5MR0YN";

const PRODUCTION_HOSTNAMES = new Set([
  "waikikidental.com",
  "www.waikikidental.com",
]);

/**
 * Keeps local, preview, and generated Vercel URLs out of the production GA4
 * property. The public custom domains are the only allowed collection hosts.
 */
export function isGoogleAnalyticsProductionHostname(hostname: string) {
  return PRODUCTION_HOSTNAMES.has(hostname.toLowerCase());
}


export const GOOGLE_ANALYTICS_PAGE_TITLE = "Waikiki Dental";

/**
 * The only page fields GA4 may see: the grouped path from
 * `sanitizeAnalyticsPath`, a constant title, and an empty referrer. Used for
 * both `gtag("config")` and `gtag("set")` so automatic hits (for example
 * `user_engagement`) never fall back to the raw URL, query string, or title.
 */
export function googleAnalyticsPageFields(origin: string, safePath: string) {
  return {
    page_location: `${origin}${safePath}`,
    page_referrer: "",
    page_title: GOOGLE_ANALYTICS_PAGE_TITLE,
  };
}
