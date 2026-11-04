import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  ANALYTICS_EVENTS,
  GENERATE_LEAD_FORM_TYPES,
  GOOGLE_ANALYTICS_EVENT_NAMES,
  contactLinkEvent,
  isAllowedAnalyticsEvent,
  sanitizeVercelAnalyticsEvent,
  trackAllowedEvent,
  trackContactLinkClick,
  trackGenerateLead,
} from "./analytics.ts";
import { site } from "./site.ts";

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

describe("phone and email conversion events", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  function captureGtag() {
    const calls: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        gtag: (...args: unknown[]) => {
          calls.push(args);
        },
      },
    });
    return calls;
  }

  /** A clicked element inside a link, shaped like the DOM API we use. */
  function clickInside(href: string | null) {
    return {
      closest: (selector: string) =>
        selector === "a[href]" && href !== null
          ? { getAttribute: (name: string) => (name === "href" ? href : null) }
          : null,
    } as unknown as EventTarget;
  }

  it("allowlists phone and email clicks without PII", () => {
    assert.equal(isAllowedAnalyticsEvent(ANALYTICS_EVENTS.phoneClick), true);
    assert.equal(isAllowedAnalyticsEvent(ANALYTICS_EVENTS.emailClick), true);
    assert.equal(ANALYTICS_EVENTS.phoneClick, "Phone Click");
    assert.equal(ANALYTICS_EVENTS.emailClick, "Email Click");
    for (const name of [
      ...Object.values(ANALYTICS_EVENTS),
      ...Object.values(GOOGLE_ANALYTICS_EVENT_NAMES),
    ]) {
      assert.doesNotMatch(name, /916|@|tel:|mailto:/i);
    }
    assert.equal(isAllowedAnalyticsEvent("User Email"), false);
  });

  it("uses GA4-valid event names", () => {
    assert.deepEqual(GOOGLE_ANALYTICS_EVENT_NAMES, {
      "Phone Click": "phone_click",
      "Email Click": "email_click",
      generate_lead: "generate_lead",
      scheduler_link_click: "scheduler_link_click",
      jarvis_booking_start: "jarvis_booking_start",
    });
    for (const name of Object.values(GOOGLE_ANALYTICS_EVENT_NAMES)) {
      assert.match(name, /^[a-z][a-z0-9_]{0,39}$/);
    }
  });

  it("forwards allowlisted names to gtag with the event name only", () => {
    const calls = captureGtag();
    assert.equal(trackAllowedEvent(ANALYTICS_EVENTS.phoneClick), true);
    assert.equal(trackAllowedEvent("User Email"), false);
    assert.deepEqual(calls, [["event", "phone_click"]]);
  });

  it("maps the site's tel: and mailto: links to conversions", () => {
    assert.equal(contactLinkEvent(site.phoneHref), ANALYTICS_EVENTS.phoneClick);
    assert.equal(contactLinkEvent(site.emailHref), ANALYTICS_EVENTS.emailClick);
    assert.equal(contactLinkEvent(" TEL:+19167726248"), ANALYTICS_EVENTS.phoneClick);
    assert.equal(contactLinkEvent("/request-appointment/"), null);
    assert.equal(contactLinkEvent("https://www.google.com/maps"), null);
    assert.equal(contactLinkEvent(null), null);
  });

  it("counts a click anywhere inside a phone or email link, once", () => {
    const calls = captureGtag();
    assert.equal(trackContactLinkClick(clickInside(site.phoneHref)), "Phone Click");
    assert.equal(trackContactLinkClick(clickInside(site.emailHref)), "Email Click");
    assert.equal(trackContactLinkClick(clickInside("/request-appointment/")), null);
    assert.equal(trackContactLinkClick(clickInside(null)), null);
    assert.equal(trackContactLinkClick(null), null);
    assert.equal(trackContactLinkClick({} as EventTarget), null);
    assert.deepEqual(calls, [
      ["event", "phone_click"],
      ["event", "email_click"],
    ]);
  });
});

describe("generate_lead", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("allowlists the GA4 lead event without PII in the name", () => {
    assert.equal(ANALYTICS_EVENTS.generateLead, "generate_lead");
    assert.equal(GENERATE_LEAD_FORM_TYPES.contact, "contact");
    assert.equal(isAllowedAnalyticsEvent(ANALYTICS_EVENTS.generateLead), true);
    assert.doesNotMatch(ANALYTICS_EVENTS.generateLead, /name|email|phone|message|@/i);
  });

  it("sends form_type and grouped page_path only after a successful contact submit helper call", () => {
    const calls: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        location: { pathname: "/contact-waikiki-dental/" },
        gtag: (...args: unknown[]) => {
          calls.push(args);
        },
      },
    });

    assert.equal(trackGenerateLead("contact"), true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0]?.[0], "event");
    assert.equal(calls[0]?.[1], "generate_lead");

    const params = calls[0]?.[2];
    assert.deepEqual(params, {
      form_type: "contact",
      page_path: "/conversion",
    });
    assert.deepEqual(Object.keys(params as object).sort(), ["form_type", "page_path"]);
    assert.doesNotMatch(JSON.stringify(params), /utm_|gclid|email|phone|message/i);
  });

  it("does not send a lead event on privacy-excluded paths", () => {
    const calls: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        location: { pathname: "/privacy-practices" },
        gtag: (...args: unknown[]) => {
          calls.push(args);
        },
      },
    });

    assert.equal(trackGenerateLead("contact"), false);
    assert.deepEqual(calls, []);
  });

  it("does not send a lead event for an unknown form type", () => {
    const calls: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        location: { pathname: "/contact-waikiki-dental/" },
        gtag: (...args: unknown[]) => {
          calls.push(args);
        },
      },
    });

    assert.equal(trackGenerateLead("newsletter" as never), false);
    assert.deepEqual(calls, []);
  });
});
