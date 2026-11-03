"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sanitizeAnalyticsPath } from "@/lib/analytics";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  googleAnalyticsPageFields,
  isGoogleAnalyticsProductionHostname,
} from "@/lib/google-analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __waikikiGoogleAnalyticsInitialized?: boolean;
  }
}

type PageFields = ReturnType<typeof googleAnalyticsPageFields>;

function initializeGoogleAnalytics(pageFields: PageFields) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google requires each command to retain its Arguments object shape.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  if (window.__waikikiGoogleAnalyticsInitialized) return;

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_MEASUREMENT_ID, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    send_page_view: false,
    // Sanitized from the first hit onward; gtag would otherwise read
    // document.location/title/referrer for its automatic events.
    ...pageFields,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`;
  script.dataset.waikikiGoogleAnalytics = "true";
  document.head.appendChild(script);

  window.__waikikiGoogleAnalyticsInitialized = true;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastObservedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isGoogleAnalyticsProductionHostname(window.location.hostname)) return;
    if (lastObservedPath.current === pathname) return;
    lastObservedPath.current = pathname;

    const safePath = sanitizeAnalyticsPath(pathname);
    if (!safePath) return;

    // Persistent fields (config and set) never carry landing attribution, so
    // later hits such as phone_click or user_engagement keep an empty
    // referrer and no query string.
    const pageFields = googleAnalyticsPageFields(window.location.origin, safePath);
    // The first hit of a page load is the landing hit: GA4 attributes the
    // session from its campaign parameters and referrer, which go on that one
    // page_view event only.
    const landing = !window.__waikikiGoogleAnalyticsInitialized;
    const hitFields = landing
      ? googleAnalyticsPageFields(window.location.origin, safePath, {
          search: window.location.search,
          referrer: document.referrer,
          hostname: window.location.hostname,
        })
      : pageFields;
    initializeGoogleAnalytics(pageFields);
    // `set` applies to every later hit, including automatic engagement hits.
    window.gtag?.("set", pageFields);
    window.gtag?.("event", "page_view", {
      ...hitFields,
      page_path: safePath,
      send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
    });
  }, [pathname]);

  return null;
}

