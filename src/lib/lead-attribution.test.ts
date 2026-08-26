import assert from "node:assert/strict";
import { afterEach, before, describe, it } from "node:test";
import {
  ATTRIBUTION_STORAGE_KEY,
  captureLeadAttribution,
  mergeFirstTouch,
  parseAdIdFromUtmContent,
  parseLeadAttribution,
  resetLeadAttributionForTests,
  withLeadAttribution,
} from "./lead-attribution.ts";

function createMemoryStorage() {
  const store = new Map<string, string>();
  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
  };
}

before(() => {
  const localStorage = createMemoryStorage();
  const sessionStorage = createMemoryStorage();
  const windowLike = {
    localStorage,
    sessionStorage,
    location: { search: "" },
    dispatchEvent() {
      return true;
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: localStorage,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    value: sessionStorage,
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: windowLike,
  });
});

afterEach(() => {
  resetLeadAttributionForTests();
});

describe("parseAdIdFromUtmContent", () => {
  it("treats a bare numeric Meta ad id as ad_id", () => {
    assert.equal(parseAdIdFromUtmContent("1234567890"), "1234567890");
  });

  it("parses a trailing numeric id after a known creative prefix", () => {
    assert.equal(
      parseAdIdFromUtmContent("static_photo_120248349183900567"),
      "120248349183900567",
    );
  });

  it("does not invent an id from a creative name or leftover placeholder", () => {
    assert.equal(parseAdIdFromUtmContent("student_story"), "");
    assert.equal(parseAdIdFromUtmContent("{{ad.id}}"), "");
    assert.equal(parseAdIdFromUtmContent(""), "");
  });
});

describe("parseLeadAttribution", () => {
  it("copies first-touch tags and prefers a numeric utm_content as ad_id", () => {
    const stamp = parseLeadAttribution(
      "?utm_source=fb&utm_medium=paid&utm_campaign=sedation&utm_content=1234567890&utm_term=iv&gclid=&fbclid=abc.123&ttclid=",
    );

    assert.equal(stamp.utm_source, "fb");
    assert.equal(stamp.utm_medium, "paid");
    assert.equal(stamp.utm_campaign, "sedation");
    assert.equal(stamp.utm_content, "1234567890");
    assert.equal(stamp.utm_term, "iv");
    assert.equal(stamp.gclid, "");
    assert.equal(stamp.fbclid, "abc.123");
    assert.equal(stamp.ttclid, "");
    assert.equal(stamp.ad_id, "1234567890");
  });

  it("leaves click IDs empty when the URL has none", () => {
    const stamp = parseLeadAttribution("?utm_campaign=organic-share");
    assert.equal(stamp.gclid, "");
    assert.equal(stamp.fbclid, "");
    assert.equal(stamp.ttclid, "");
    assert.equal(stamp.ad_id, "");
  });
});

describe("mergeFirstTouch", () => {
  it("does not overwrite a stored paid touch with a later clean page view", () => {
    const first = parseLeadAttribution("?utm_content=1234567890&fbclid=first-click");
    const later = parseLeadAttribution("");
    const merged = mergeFirstTouch(first, later);

    assert.equal(merged.utm_content, "1234567890");
    assert.equal(merged.ad_id, "1234567890");
    assert.equal(merged.fbclid, "first-click");
  });

  it("fills empty first-touch gaps from a later paid click", () => {
    const first = parseLeadAttribution("");
    const later = parseLeadAttribution("?utm_content=1234567890");
    const merged = mergeFirstTouch(first, later);

    assert.equal(merged.utm_content, "1234567890");
    assert.equal(merged.ad_id, "1234567890");
  });
});

describe("captureLeadAttribution", () => {
  it("persists first-touch in localStorage across later page views", () => {
    const first = captureLeadAttribution({
      search: "?utm_content=1234567890&utm_campaign=iv-sedation",
    });
    assert.equal(first.ad_id, "1234567890");

    const later = captureLeadAttribution({
      search: "?utm_campaign=later-organic",
    });
    assert.equal(later.utm_campaign, "iv-sedation");
    assert.equal(later.utm_content, "1234567890");
    assert.equal(later.ad_id, "1234567890");

    const stored = JSON.parse(
      globalThis.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "{}",
    ) as { firstTouch?: { ad_id?: string } };
    assert.equal(stored.firstTouch?.ad_id, "1234567890");
  });
});

describe("withLeadAttribution", () => {
  it("stamps a Formspree payload with first-touch ad_id and UTMs", () => {
    captureLeadAttribution({ search: "?utm_content=1234567890" });
    const payload = withLeadAttribution({
      form_type: "appointment_request",
      name: "Test Visitor",
    });

    assert.equal(payload.form_type, "appointment_request");
    assert.equal(payload.utm_content, "1234567890");
    assert.equal(payload.ad_id, "1234567890");
    assert.equal(payload.gclid, "");
  });
});
