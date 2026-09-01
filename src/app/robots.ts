import type { MetadataRoute } from "next";
import { isPreviewDeploy, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPreviewDeploy ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: isPreviewDeploy ? undefined : `${site.baseUrl}/sitemap.xml`,
    host: site.baseUrl,
  };
}
