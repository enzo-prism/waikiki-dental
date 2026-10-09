import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  ANALYTICS_EVENTS,
  isAllowedAnalyticsEvent,
  sanitizeVercelAnalyticsEvent,
  trackAllowedEvent,
} from "./analytics.ts";

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

describe("appointment click events", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("allowlists phone and email clicks without PII", () => {
    assert.equal(
      isAllowedAnalyticsEvent(ANALYTICS_EVENTS.appointmentPhoneClick),
      true,
    );
    assert.equal(
      isAllowedAnalyticsEvent(ANALYTICS_EVENTS.appointmentEmailClick),
      true,
    );
    assert.equal(ANALYTICS_EVENTS.appointmentPhoneClick, "Appointment Phone Click");
    assert.equal(ANALYTICS_EVENTS.appointmentEmailClick, "Appointment Email Click");
    assert.doesNotMatch(ANALYTICS_EVENTS.appointmentPhoneClick, /916|@|tel:|mailto:/i);
    assert.doesNotMatch(ANALYTICS_EVENTS.appointmentEmailClick, /916|@|tel:|mailto:/i);
    assert.equal(isAllowedAnalyticsEvent("User Email"), false);
  });

  it("forwards allowlisted names to gtag with the event name only", () => {
    const calls: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        gtag: (...args: unknown[]) => {
          calls.push(args);
        },
      },
    });

    assert.equal(trackAllowedEvent(ANALYTICS_EVENTS.appointmentPhoneClick), true);
    assert.equal(trackAllowedEvent("User Email"), false);
    assert.deepEqual(calls, [["event", "Appointment Phone Click"]]);
  });
});
