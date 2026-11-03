import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanitizeAnalyticsPath } from "./analytics.ts";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  googleAnalyticsPageFields,
  isGoogleAnalyticsProductionHostname,
  shouldCollectGoogleAnalytics,
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

  it("keeps collection off localhost unless a test-only host list or query is set", () => {
    const previous = process.env.NEXT_PUBLIC_GA_TEST_HOSTNAMES;
    delete process.env.NEXT_PUBLIC_GA_TEST_HOSTNAMES;

    try {
      assert.equal(shouldCollectGoogleAnalytics("localhost"), false);
      assert.equal(shouldCollectGoogleAnalytics("waikikidental.com"), true);
      assert.equal(
        shouldCollectGoogleAnalytics(
          "localhost",
          "?wd-ga-test-host=waikikidental.com",
        ),
        true,
      );
      assert.equal(
        shouldCollectGoogleAnalytics(
          "waikiki-dental-preview.vercel.app",
          "?wd-ga-test-host=waikikidental.com",
        ),
        false,
      );

      process.env.NEXT_PUBLIC_GA_TEST_HOSTNAMES =
        "localhost,127.0.0.1,waikiki-dental-preview.vercel.app";
      assert.equal(shouldCollectGoogleAnalytics("localhost"), true);
      assert.equal(shouldCollectGoogleAnalytics("127.0.0.1"), true);
      assert.equal(
        shouldCollectGoogleAnalytics("waikiki-dental-preview.vercel.app"),
        true,
      );
      assert.equal(isGoogleAnalyticsProductionHostname("localhost"), false);
      assert.equal(
        isGoogleAnalyticsProductionHostname("waikiki-dental-preview.vercel.app"),
        false,
      );
    } finally {
      if (previous === undefined) {
        delete process.env.NEXT_PUBLIC_GA_TEST_HOSTNAMES;
      } else {
        process.env.NEXT_PUBLIC_GA_TEST_HOSTNAMES = previous;
      }
    }
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

  it("builds page fields with no query string, real title, or referrer", () => {
    const safePath = sanitizeAnalyticsPath("/request-appointment/");
    assert.ok(safePath);
    assert.deepEqual(
      googleAnalyticsPageFields("https://waikikidental.com", safePath),
      {
        page_location: "https://waikikidental.com/conversion",
        page_referrer: "",
        page_title: "Waikiki Dental",
      },
    );
  });
});
