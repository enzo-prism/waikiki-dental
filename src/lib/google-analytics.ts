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

