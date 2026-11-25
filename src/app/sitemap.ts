import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes, siteLastUpdated } from "@/lib/site";

/** Pages whose visible content changed after `siteLastUpdated`. */
const pageUpdated: Record<string, string> = {
  "iv-sedation": "2026-11-23",
  "request-appointment": "2026-11-23",
  "patient-testimonials": "2026-11-24",
  "contact-waikiki-dental": "2026-11-24",
  "waikiki-dental-roseville": "2026-11-24",
  "": "2026-11-24",
  "roseville-dental-implants": "2026-11-24",
  "dental-crowns": "2026-11-24",
  "dental-emergencies": "2026-11-24",
  "roseville-invisalign": "2026-11-24",
  veneers: "2026-11-20",
  "teeth-whitening": "2026-11-20",
  "smile-makeover": "2026-11-20",
  "new-patients": "2026-11-24",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: new Date(pageUpdated[path] ?? siteLastUpdated),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}
