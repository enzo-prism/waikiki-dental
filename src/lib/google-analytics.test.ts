import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanitizeAnalyticsPath } from "./analytics.ts";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  isGoogleAnalyticsProductionHostname,
} from "./google-analytics.ts";

describe("Google Analytics configuration", () => {
  it("uses the authorized Waikiki Dental stream", () => {
    assert.equal(GOOGLE_ANALYTICS_MEASUREMENT_ID, "G-BKCF5MR0YN");
  });

  it("runs only on the public custom domains", () => {
    assert.equal(
      isGoogleAnalyticsProductionHostname("waikikidental.com"),
      true,
    );
    assert.equal(
      isGoogleAnalyticsProductionHostname("WWW.WAIKIKIDENTAL.COM"),
      true,
    );
    assert.equal(
      isGoogleAnalyticsProductionHostname("waikiki-dental-preview.vercel.app"),
      false,
    );
    assert.equal(isGoogleAnalyticsProductionHostname("localhost"), false);
  });

  it("uses the same privacy-safe path groups as Vercel Analytics", () => {
    assert.equal(sanitizeAnalyticsPath("/request-appointment/"), "/conversion");
    assert.equal(sanitizeAnalyticsPath("/contact-waikiki-dental"), "/conversion");
    assert.equal(sanitizeAnalyticsPath("/patient-testimonials"), "/reviews");
    assert.equal(sanitizeAnalyticsPath("/michael-narodovich-dmd"), "/practice");
    assert.equal(sanitizeAnalyticsPath("/dental-blog/gentle-care"), "/education");
    assert.equal(sanitizeAnalyticsPath("/iv-sedation"), "/services");
    assert.equal(sanitizeAnalyticsPath("/privacy-practices/"), null);
  });
});

