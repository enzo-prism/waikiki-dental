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
 * The only query parameters GA4 may see, and only on the landing hit: what it
 * needs to credit a visit to a tagged campaign or a Google Ads click instead
 * of "Direct". `utm_term` and `utm_content` are left out because they can
 * carry search keywords; `fbclid` and every other parameter are dropped.
 */
export const GOOGLE_ANALYTICS_CAMPAIGN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

const MAX_CAMPAIGN_VALUE_LENGTH = 256;

/** `?utm_source=...` with only the allowlisted campaign parameters, or "". */
export function googleAnalyticsCampaignQuery(search: string) {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const kept = new URLSearchParams();
  for (const name of GOOGLE_ANALYTICS_CAMPAIGN_PARAMS) {
    const value = params.get(name)?.trim();
    if (value) kept.set(name, value.slice(0, MAX_CAMPAIGN_VALUE_LENGTH));
  }
  const query = kept.toString();
  return query ? `?${query}` : "";
}

/**
 * The referring site's origin (for example `https://www.google.com/`), which
 * is all GA4 needs to tell organic search and referrals from direct visits.
 * Paths, queries, internal pages, and non-web referrers become "".
 */
export function googleAnalyticsReferrer(referrer: string, currentHostname: string) {
  try {
    const url = new URL(referrer);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    const host = url.hostname.toLowerCase();
    if (
      host === currentHostname.toLowerCase() ||
      isGoogleAnalyticsProductionHostname(host)
    ) {
      return "";
    }
    return `${url.origin}/`;
  } catch {
    return "";
  }
}

export type GoogleAnalyticsLanding = {
  /** `window.location.search` of the page the visit started on. */
  search: string;
  /** `document.referrer` of that page load. */
  referrer: string;
  /** `window.location.hostname`, so self-referrals are dropped. */
  hostname: string;
};

/**
 * The only page fields GA4 may see: the grouped path from
 * `sanitizeAnalyticsPath`, a constant title, and a referrer. Used for both
 * `gtag("config")` and `gtag("set")` so automatic hits (for example
 * `user_engagement`) never fall back to the raw URL, query string, or title.
 *
 * The landing hit of a page load (pass `landing`) also carries the
 * allowlisted campaign parameters and the referring site's origin; without
 * them GA4 files every session under "Direct". Later route changes send
 * neither, since GA4 attributes a session from its first hit.
 */
export function googleAnalyticsPageFields(
  origin: string,
  safePath: string,
  landing?: GoogleAnalyticsLanding,
) {
  return {
    page_location: `${origin}${safePath}${
      landing ? googleAnalyticsCampaignQuery(landing.search) : ""
    }`,
    page_referrer: landing
      ? googleAnalyticsReferrer(landing.referrer, landing.hostname)
      : "",
    page_title: GOOGLE_ANALYTICS_PAGE_TITLE,
  };
}
