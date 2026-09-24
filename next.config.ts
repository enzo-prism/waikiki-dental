import type { NextConfig } from "next";

/** The only host that should be indexed; every other host gets noindex. */
export const productionHost = "waikikidental.com";

/**
 * Production Content-Security-Policy. The site is fully static, so there are
 * no per-request nonces: Next's inline bootstrap scripts and the inline
 * JSON-LD need 'unsafe-inline'. External origins are limited to GA4
 * (gtag.js + collection) and Formspree. Vercel Web Analytics loads from
 * /_vercel/insights on this origin in production, so 'self' covers it.
 */
export function contentSecurityPolicy() {
  const googleAnalytics = [
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    // GA4 also beacons to www.google.com/g/collect; without it hits are
    // blocked (verified against a production build on 2026-09-24).
    "https://www.google.com",
  ];
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", ...googleAnalytics],
    "font-src": ["'self'"],
    "media-src": ["'self'"],
    "connect-src": ["'self'", ...googleAnalytics, "https://formspree.io"],
    "form-action": ["'self'", "https://formspree.io"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "frame-ancestors": ["'none'"],
    "upgrade-insecure-requests": [],
  };
  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(" "))
    .join("; ");
}

export const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), browsing-topics=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    // CSP is production-only: dev HMR and React's dev tooling need eval and
    // websocket connections that the production policy intentionally blocks.
    const csp =
      process.env.NODE_ENV === "development"
        ? []
        : [{ key: "Content-Security-Policy", value: contentSecurityPolicy() }];
    return [
      { source: "/:path*", headers: [...securityHeaders, ...csp] },
      {
        // Preview/*.vercel.app hosts must never be indexed. Host values are
        // anchored regexes matched against the port-less hostname.
        source: "/:path*",
        missing: [{ type: "host", value: productionHost.replace(/\./g, "\\.") }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  // Imagery is self-hosted in /public/media, so no remote patterns are needed.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.waikikidental.com" }],
        destination: "https://waikikidental.com/:path*",
        permanent: true,
      },
      { source: "/cosmetic-dentistry/", destination: "/smile-makeover/", permanent: true },
      { source: "/roseville-family-dentist/", destination: "/cleanings-exams/", permanent: true },
      { source: "/family-dentistry/", destination: "/cleanings-exams/", permanent: true },
      {
        source: "/dental-blog/2746154-say-goodbye-to-dental-anxiety-with-iv-sedation/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      { source: "/iv-sedation-roseville/", destination: "/iv-sedation/", permanent: true },
      { source: "/orthodontist-roseville/", destination: "/orthodontics/", permanent: true },
      { source: "/roseville-dental-emergencies/", destination: "/dental-emergencies/", permanent: true },
      { source: "/roseville-teeth-whitening/", destination: "/teeth-whitening/", permanent: true },
      { source: "/roseville-veneers/", destination: "/veneers/", permanent: true },
      { source: "/appointments/", destination: "/request-appointment/", permanent: true },
      // Conversion URL: extra segments (ads, relative links, index.html) must
      // land on the real form. :path+ requires at least one extra segment so
      // /request-appointment/ itself is not redirected. Query strings pass through.
      { source: "/request-appointment/:path+", destination: "/request-appointment/", permanent: true },
      { source: "/request-appointment/:path+/", destination: "/request-appointment/", permanent: true },
      // Same-day/CEREC crowns are not offered; traditional crowns are.
      {
        source: "/roseville-cerec-same-day-crowns/",
        destination: "/dental-crowns/",
        statusCode: 301,
      },
      // Bonding is not offered, so the retired page goes to the services hub.
      { source: "/dental-bonding/", destination: "/roseville-dental-care/", permanent: true },
      { source: "/dental-implants/", destination: "/roseville-dental-implants/", permanent: true },
      { source: "/invisalign/", destination: "/roseville-invisalign/", permanent: true },
      { source: "/meet-our-doctors/", destination: "/michael-narodovich-dmd/", permanent: true },
      { source: "/michael-narodovich-dds/", destination: "/michael-narodovich-dmd/", permanent: true },
      { source: "/privacy-policy/", destination: "/privacy-practices/", permanent: true },
      { source: "/our-practice/", destination: "/waikiki-dental-roseville/", permanent: true },
      { source: "/contact/", destination: "/contact-waikiki-dental/", permanent: true },
      { source: "/our-practice/testimonials/", destination: "/patient-testimonials/", permanent: true },
      { source: "/patient-reviews/", destination: "/patient-testimonials/", permanent: true },
      { source: "/procedures/restorations/dental-implants/", destination: "/roseville-dental-implants/", permanent: true },
      { source: "/dental-implants/full-arch-replacement/", destination: "/roseville-dental-implants/", permanent: true },
      { source: "/procedures/dental-anxiety-and-fear/", destination: "/iv-sedation/", permanent: true },
      { source: "/six-month-smiles/", destination: "/orthodontics/", permanent: true },
      { source: "/dental-blog/", destination: "/iv-sedation/", permanent: true },
      {
        source: "/dental-blog/2758117-relaxation-dentist-sedation-roseville-ca/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      {
        source: "/dental-blog/2758118-the-benefits-of-iv-sedation/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      {
        source: "/dental-blog/2758133-sedation-dentistry-in-roseville-ca/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      { source: "/dental-blog/archive-202508/", destination: "/iv-sedation/", permanent: true },
      { source: "/dental-blog/archive-202606/", destination: "/iv-sedation/", permanent: true },
      { source: "/dental-blog/archive-202607/", destination: "/iv-sedation/", permanent: true },
      {
        source: "/dental-blog/category/sedation-dentistry/",
        destination: "/iv-sedation/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
