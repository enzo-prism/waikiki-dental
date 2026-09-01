"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sanitizeAnalyticsPath } from "@/lib/analytics";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  isGoogleAnalyticsProductionHostname,
} from "@/lib/google-analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __waikikiGoogleAnalyticsInitialized?: boolean;
  }
}

function initializeGoogleAnalytics() {
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

    initializeGoogleAnalytics();
    window.gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${safePath}`,
      page_path: safePath,
      page_referrer: "",
      page_title: "Waikiki Dental",
      send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
    });
  }, [pathname]);

  return null;
}

