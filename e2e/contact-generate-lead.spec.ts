import { expect, test, type Page, type Route } from "@playwright/test";
import { FORM_SUBMIT_TIMEOUT_MS } from "../src/lib/forms";

const FORMSPREE_PATTERN = /formspree\.io\/f\//i;
const CONTACT_PATH = "/contact-waikiki-dental/";
const PII_OR_ATTRIBUTION = /name|email|phone|message|utm_|gclid/i;
const LEAD_PARAM_KEYS = ["form_type", "page_path"] as const;

type FormspreeMock =
  | { kind: "json"; status: number; body: unknown }
  | { kind: "abort" }
  | { kind: "hang" }
  | { kind: "stalled-body" };

type GtagCall = unknown[];

declare global {
  interface Window {
    __waikikiGtagCalls?: unknown[][];
  }
}

function isGoogleHost(hostname: string) {
  const host = hostname.toLowerCase();
  return (
    host === "google.com" ||
    host.endsWith(".google.com") ||
    host === "google-analytics.com" ||
    host.endsWith(".google-analytics.com") ||
    host === "analytics.google.com" ||
    host.endsWith(".analytics.google.com") ||
    host === "googletagmanager.com" ||
    host.endsWith(".googletagmanager.com") ||
    host === "gstatic.com" ||
    host.endsWith(".gstatic.com") ||
    host === "doubleclick.net" ||
    host.endsWith(".doubleclick.net") ||
    host === "googleadservices.com" ||
    host.endsWith(".googleadservices.com") ||
    host === "googleapis.com" ||
    host.endsWith(".googleapis.com")
  );
}

function leadEvents(calls: GtagCall[]) {
  return calls.filter(
    (call) => call[0] === "event" && call[1] === "generate_lead",
  );
}

function assertLeadParams(params: unknown) {
  expect(params).toBeTruthy();
  expect(typeof params).toBe("object");
  const record = params as Record<string, unknown>;
  expect(Object.keys(record).sort()).toEqual([...LEAD_PARAM_KEYS]);
  expect(record.form_type).toBe("contact");
  expect(record.page_path).toBe("/conversion");
  expect(JSON.stringify(record)).not.toMatch(PII_OR_ATTRIBUTION);
}

function assertNoGoogleRequests(googleRequests: string[]) {
  expect(googleRequests, googleRequests.join("\n")).toEqual([]);
}

async function gtagCalls(page: Page) {
  return page.evaluate(() => window.__waikikiGtagCalls ?? []);
}

async function fillValidContactForm(page: Page) {
  await page.locator('input[name="topic"][value="general"]').click({ force: true });
  await page.locator('textarea[name="message"]').fill("Need hours for a visit.");
  await page.locator('input[name="replyBy"][value="email"]').click({ force: true });
  await page.locator('input[name="name"]').fill("QA Visitor");
  await page.locator('input[name="email"]').fill("qa@example.com");
  await page.locator('input[type="checkbox"]').check();
}

async function mockFormspree(page: Page, mock: FormspreeMock) {
  await page.unroute(FORMSPREE_PATTERN).catch(() => undefined);
  await page.route(FORMSPREE_PATTERN, async (route: Route) => {
    if (mock.kind === "abort") {
      await route.abort("failed");
      return;
    }
    if (mock.kind === "hang" || mock.kind === "stalled-body") {
      await new Promise(() => undefined);
      return;
    }
    await route.fulfill({
      status: mock.status,
      contentType: "application/json",
      body: JSON.stringify(mock.body),
    });
  });

  if (mock.kind !== "stalled-body") return;

  await page.evaluate(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.href
            : input instanceof Request
              ? input.url
              : String(input);
      if (/formspree\.io\/f\//i.test(url)) {
        return new Response(new ReadableStream({ start() {} }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return originalFetch(input, init);
    };
  });
}

async function openContact(
  page: Page,
  options: { throwGtag?: boolean } = {},
) {
  const googleRequests: string[] = [];
  const throwGtag = Boolean(options.throwGtag);

  await page.addInitScript((shouldThrow: boolean) => {
    const calls: unknown[][] = [];
    window.__waikikiGtagCalls = calls;
    window.gtag = (...args: unknown[]) => {
      calls.push(args);
      if (shouldThrow) {
        throw new Error("gtag failed");
      }
    };
  }, throwGtag);

  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (isGoogleHost(url.hostname)) {
      googleRequests.push(route.request().url());
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });

  await page.goto(CONTACT_PATH);
  return googleRequests;
}

test.describe("contact generate_lead", () => {
  test("fires exactly one generate_lead on Formspree 200 {ok:true}", async ({
    page,
  }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "json", status: 200, body: { ok: true } });
    await fillValidContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible();

    const leads = leadEvents(await gtagCalls(page));
    expect(leads).toHaveLength(1);
    assertLeadParams(leads[0]?.[2]);
    assertNoGoogleRequests(googleRequests);
  });

  test("stays at one generate_lead after a double-click or re-render", async ({
    page,
  }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "json", status: 200, body: { ok: true } });
    await fillValidContactForm(page);
    await page.evaluate(() => {
      const button = document.querySelector<HTMLButtonElement>('button[type="submit"]');
      button?.click();
      button?.click();
    });
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible();
    await page.evaluate(() => window.dispatchEvent(new Event("resize")));
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible();

    expect(leadEvents(await gtagCalls(page))).toHaveLength(1);
    assertNoGoogleRequests(googleRequests);
  });

  test("does not fire generate_lead on Formspree HTTP errors", async ({
    context,
  }) => {
    for (const status of [400, 403, 422, 429, 500, 503]) {
      const page = await context.newPage();
      const googleRequests = await openContact(page);
      await mockFormspree(page, { kind: "json", status, body: { ok: false } });
      await fillValidContactForm(page);
      await page.getByRole("button", { name: "Send message" }).click();
      const error =
        status === 429
          ? "Too many messages were sent just now"
          : "Please try again, or call or email the office directly";
      await expect(page.getByText(error)).toBeVisible();
      await expect(page.getByRole("heading", { name: "Your message was sent." })).toHaveCount(0);
      expect(leadEvents(await gtagCalls(page)), `status ${status}`).toHaveLength(0);
      assertNoGoogleRequests(googleRequests);
      await page.close();
    }
  });

  test("does not fire generate_lead on a network abort", async ({ page }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "abort" });
    await fillValidContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Check your connection")).toBeVisible();
    expect(leadEvents(await gtagCalls(page))).toHaveLength(0);
    assertNoGoogleRequests(googleRequests);
  });

  test("does not fire generate_lead on a submit timeout", async ({ page }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "hang" });
    await fillValidContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Check your connection")).toBeVisible({
      timeout: FORM_SUBMIT_TIMEOUT_MS + 4_000,
    });
    expect(leadEvents(await gtagCalls(page))).toHaveLength(0);
    assertNoGoogleRequests(googleRequests);
  });

  test("does not fire generate_lead on a validation failure", async ({ page }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "json", status: 200, body: { ok: true } });
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please choose what this is about.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toHaveCount(0);
    expect(leadEvents(await gtagCalls(page))).toHaveLength(0);
    assertNoGoogleRequests(googleRequests);
  });

  test("does not fire generate_lead on a honeypot hit", async ({ page }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "json", status: 200, body: { ok: true } });
    await fillValidContactForm(page);
    await page.locator('input[name="_gotcha"]').evaluate((element) => {
      const input = element as HTMLInputElement;
      const descriptor = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      );
      descriptor?.set?.call(input, "bot-company");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible();
    expect(leadEvents(await gtagCalls(page))).toHaveLength(0);
    assertNoGoogleRequests(googleRequests);
  });

  test("does not fire generate_lead on HTTP 200 {ok:false}", async ({ page }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "json", status: 200, body: { ok: false } });
    await fillValidContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByText("Please try again, or call or email the office directly"),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toHaveCount(0);
    expect(leadEvents(await gtagCalls(page))).toHaveLength(0);
    assertNoGoogleRequests(googleRequests);
  });

  test("reaches sent on a stalled-body 200 within the submit timeout", async ({
    page,
  }) => {
    const googleRequests = await openContact(page);
    await mockFormspree(page, { kind: "stalled-body" });
    await fillValidContactForm(page);
    const started = Date.now();
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible({
      timeout: FORM_SUBMIT_TIMEOUT_MS + 1_500,
    });
    expect(Date.now() - started).toBeLessThan(FORM_SUBMIT_TIMEOUT_MS + 1_500);

    const leads = leadEvents(await gtagCalls(page));
    expect(leads).toHaveLength(1);
    assertLeadParams(leads[0]?.[2]);
    assertNoGoogleRequests(googleRequests);
  });

  test("keeps the sent confirmation when gtag throws", async ({ page }) => {
    const googleRequests = await openContact(page, { throwGtag: true });
    await mockFormspree(page, { kind: "json", status: 200, body: { ok: true } });
    await fillValidContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible();
    await expect(page.getByText("Check your connection")).toHaveCount(0);
    await expect(
      page.getByText("Please try again, or call or email the office directly"),
    ).toHaveCount(0);

    const leads = leadEvents(await gtagCalls(page));
    expect(leads).toHaveLength(1);
    assertLeadParams(leads[0]?.[2]);
    assertNoGoogleRequests(googleRequests);
  });
});
