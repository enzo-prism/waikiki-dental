"use client";

import { Analytics } from "@vercel/analytics/next";
import { sanitizeVercelAnalyticsEvent } from "@/lib/analytics";

export function SiteAnalytics() {
  return <Analytics beforeSend={sanitizeVercelAnalyticsEvent} />;
}
