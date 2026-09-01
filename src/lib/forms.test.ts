import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  FORMSPREE_ENDPOINT,
  buildAppointmentFormspreePayload,
  buildContactFormspreePayload,
  isEmail,
  isUsPhone,
  resolveFormspreeEndpoint,
  submitFormspree,
} from "./forms.ts";

const originalFetch = globalThis.fetch;

Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: {
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
  },
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("Formspree endpoint resolution", () => {
  it("accepts only canonical Formspree form endpoints", () => {
    assert.equal(
      resolveFormspreeEndpoint(" https://formspree.io/f/abcdefgh "),
      "https://formspree.io/f/abcdefgh",
    );
    assert.equal(resolveFormspreeEndpoint(""), FORMSPREE_ENDPOINT);
    assert.equal(resolveFormspreeEndpoint("https://example.com/collect"), FORMSPREE_ENDPOINT);
    assert.equal(
      resolveFormspreeEndpoint("https://formspree.io/f/abcdefgh?redirect=evil"),
      FORMSPREE_ENDPOINT,
    );
  });
});

describe("contact validation helpers", () => {
  it("accepts a ten-digit US phone with an optional leading country code", () => {
    assert.equal(isUsPhone("(916) 555-0100"), true);
    assert.equal(isUsPhone("+1 (916) 555-0100"), true);
    assert.equal(isUsPhone("91655501000"), false);
    assert.equal(isUsPhone("call 916-555-0100"), false);
  });

  it("trims and caps email addresses", () => {
    assert.equal(isEmail(" patient@example.com "), true);
    assert.equal(isEmail("patient@"), false);
    assert.equal(isEmail(`${"a".repeat(250)}@x.com`), false);
  });
});

describe("Formspree payload contracts", () => {
  it("builds a minimal appointment payload with the notification subject field", () => {
    const payload = buildAppointmentFormspreePayload({
      patientLabel: "New patient",
      reasonLabel: "Cleaning or checkup",
      reasonKey: "cleaning",
      preferredDate: "2026-09-02",
      preferredDateLabel: "Wednesday, September 2, 2026",
      preferredTime: "Anytime",
      name: " QA Visitor ",
      phone: "(916) 555-0100",
      email: "",
      notes: "",
      gotcha: "",
    });

    assert.equal(payload.subject, "Appointment request — Waikiki Dental");
    assert.equal("_subject" in payload, false);
    assert.equal(payload.form_type, "appointment_request");
    assert.equal(payload.name, "QA Visitor");
    assert.equal("email" in payload, false);
    assert.equal(payload.privacy_check, "Yes");
    assert.match(payload.message, /APPOINTMENT REQUEST \(not confirmed\)/);
  });

  it("builds a contact payload with reply routing and no empty optional phone", () => {
    const payload = buildContactFormspreePayload({
      topicLabel: "Office question",
      topicKey: "office",
      name: "QA Visitor",
      email: "qa@example.com",
      phone: "",
      replyPreference: "Email",
      message: "Please ignore this test.",
      gotcha: "",
    });

    assert.equal(payload.subject, "Contact message — Waikiki Dental");
    assert.equal(payload.email, "qa@example.com");
    assert.equal("phone" in payload, false);
    assert.equal(payload.reply_preference, "Email");
  });
});

describe("Formspree transport", () => {
  it("posts JSON to the resolved endpoint with an abort signal", async () => {
    let observed: { url?: string; init?: RequestInit } = {};
    globalThis.fetch = async (input, init) => {
      observed = { url: String(input), init };
      return new Response(null, { status: 200 });
    };

    const response = await submitFormspree(
      { form_type: "appointment_request" },
      "https://formspree.io/f/abcdefgh",
      100,
    );

    assert.equal(response.ok, true);
    assert.equal(observed.url, "https://formspree.io/f/abcdefgh");
    assert.equal(observed.init?.method, "POST");
    assert.equal(observed.init?.headers && (observed.init.headers as Record<string, string>).Accept, "application/json");
    assert.ok(observed.init?.signal instanceof AbortSignal);
  });

  it("aborts a stalled request", async () => {
    globalThis.fetch = async (_input, init) =>
      await new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
      });

    await assert.rejects(
      submitFormspree({}, "https://formspree.io/f/abcdefgh", 5),
      (error: unknown) => error instanceof DOMException && error.name === "AbortError",
    );
  });
});
