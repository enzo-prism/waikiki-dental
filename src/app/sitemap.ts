import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes, siteLastUpdated } from "@/lib/site";

const updatedServices = new Set(["iv-sedation", "roseville-dental-implants"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: new Date(updatedServices.has(path) ? "2026-11-18" : siteLastUpdated),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}
