import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes, siteLastUpdated } from "@/lib/site";

/** Pages whose visible content changed after `siteLastUpdated`. */
const pageUpdated: Record<string, string> = {
  "iv-sedation": "2026-11-18",
  "roseville-dental-implants": "2026-11-18",
  "dental-crowns": "2026-11-20",
  "dental-emergencies": "2026-11-20",
  "roseville-invisalign": "2026-11-20",
  veneers: "2026-11-20",
  "teeth-whitening": "2026-11-20",
  "smile-makeover": "2026-11-20",
  "new-patients": "2026-11-20",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: new Date(pageUpdated[path] ?? siteLastUpdated),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}
