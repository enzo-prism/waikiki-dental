import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: new Date("2026-08-31"),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}
