import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanitizeVercelAnalyticsEvent } from "./analytics.ts";

describe("sanitizeVercelAnalyticsEvent", () => {
  it("removes query strings and groups service pages", () => {
    assert.deepEqual(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://waikikidental.com/iv-sedation/?utm_source=test#details",
      }),
      { type: "pageview", url: "https://waikikidental.com/services" },
    );
  });

  it("groups appointment and contact routes under a non-clinical path", () => {
    assert.deepEqual(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://waikikidental.com/request-appointment/?reason=sedation",
      }),
      { type: "pageview", url: "https://waikikidental.com/conversion" },
    );
    assert.deepEqual(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "/contact-waikiki-dental/?topic=insurance",
      }),
      { type: "pageview", url: "/conversion" },
    );
  });

  it("does not collect the privacy-practices route", () => {
    assert.equal(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://waikikidental.com/privacy-practices/",
      }),
      null,
    );
  });

  it("fails closed for malformed URLs", () => {
    assert.equal(
      sanitizeVercelAnalyticsEvent({ type: "pageview", url: "http://[" }),
      null,
    );
  });
});
