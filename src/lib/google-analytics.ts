export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-BKCF5MR0YN";

const PRODUCTION_HOSTNAMES = new Set([
  "waikikidental.com",
  "www.waikikidental.com",
]);

const LOCAL_TEST_HOSTS = new Set(["localhost", "127.0.0.1"]);

/**
 * Extra hosts that may load the production measurement ID. Empty in
 * production; Playwright may set `NEXT_PUBLIC_GA_TEST_HOSTNAMES` on a local
 * prod build so `/g/collect` can be intercepted without changing the
 * public-domain allowlist.
 */
function googleAnalyticsTestHostnames() {
  return (process.env.NEXT_PUBLIC_GA_TEST_HOSTNAMES ?? "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Keeps local, preview, and generated Vercel URLs out of the production GA4
 * property. The public custom domains are the only allowed collection hosts.
 */
export function isGoogleAnalyticsProductionHostname(hostname: string) {
  return PRODUCTION_HOSTNAMES.has(hostname.toLowerCase());
}

/**
 * Production custom domains, plus an explicit test-only host list, plus a
 * localhost query-param opt-in (`wd-ga-test-host=waikikidental.com`) so
 * Playwright can load gtag against a normal prod build.
 */
export function shouldCollectGoogleAnalytics(hostname: string, search = "") {
  const normalized = hostname.toLowerCase();
  if (isGoogleAnalyticsProductionHostname(normalized)) return true;
  if (googleAnalyticsTestHostnames().includes(normalized)) return true;
  if (!LOCAL_TEST_HOSTS.has(normalized)) return false;

  const requested = new URLSearchParams(search).get("wd-ga-test-host");
  return Boolean(requested && isGoogleAnalyticsProductionHostname(requested));
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
