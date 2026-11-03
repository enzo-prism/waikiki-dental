import { expect, test, type Page, type Request } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FORMSPREE_PATTERN = /formspree\.io\/f\//i;
const COLLECT_PATTERN = /\/g\/collect/i;
const MEASUREMENT_ID = "G-BKCF5MR0YN";
const ARTIFACT_DIR = "/opt/cursor/artifacts";

type CollectHit = {
  url: string;
  method: string;
  postData: string | null;
  eventName: string | null;
  tid: string | null;
  formType: string | null;
  pagePath: string | null;
};

function allParams(haystack: string, key: string) {
  return new URLSearchParams(haystack).getAll(key);
}

function parseCollect(request: Request): CollectHit {
  const url = request.url();
  const postData = request.postData();
  const query = url.split("?")[1] ?? "";
  const body = postData ?? "";
  const combined = `${query}&${body}`;
  const eventNames = allParams(combined, "en");

  return {
    url,
    method: request.method(),
    postData,
    eventName: eventNames.includes("generate_lead")
      ? "generate_lead"
      : (eventNames[0] ?? null),
    tid: allParams(combined, "tid")[0] ?? null,
    formType: allParams(combined, "ep.form_type")[0] ?? null,
    pagePath:
      allParams(combined, "ep.page_path")[0] ??
      allParams(combined, "dp")[0] ??
      null,
  };
}

async function fillContactForm(page: Page) {
  await page.locator('input[name="topic"][value="general"]').click({ force: true });
  await page.locator('textarea[name="message"]').fill("Need hours for a visit.");
  await page.locator('input[name="replyBy"][value="email"]').click({ force: true });
  await page.locator('input[name="name"]').fill("QA Visitor");
  await page.locator('input[name="email"]').fill("qa@example.com");
  await page.locator('input[type="checkbox"]').check();
}

async function waitForGtagScript(page: Page) {
  await page.waitForResponse(
    (response) =>
      response.url().includes("googletagmanager.com/gtag/js") && response.ok(),
  );
  await page.waitForFunction(() => typeof window.gtag === "function");
}

async function flushQueuedAnalytics(page: Page) {
  await page.evaluate(() => {
    window.dispatchEvent(new Event("pagehide"));
  });
}

test.describe("contact generate_lead", () => {
  test("fires generate_lead only after a successful Formspree response", async ({
    page,
  }) => {
    let formspreeStatus = 200;
    const collectHits: CollectHit[] = [];
    const formspreeHits: { status: number; url: string }[] = [];

    await page.route(COLLECT_PATTERN, async (route) => {
      collectHits.push(parseCollect(route.request()));
      await route.fulfill({ status: 204, body: "" });
    });

    await page.route(FORMSPREE_PATTERN, async (route) => {
      formspreeHits.push({
        status: formspreeStatus,
        url: route.request().url(),
      });
      await route.fulfill({
        status: formspreeStatus,
        contentType: "application/json",
        body: JSON.stringify({ ok: formspreeStatus === 200 }),
      });
    });

    await page.goto("/contact-waikiki-dental/?wd-ga-test-host=waikikidental.com");
    await waitForGtagScript(page);
    await fillContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("heading", { name: "Your message was sent." })).toBeVisible();
    await flushQueuedAnalytics(page);
    await expect
      .poll(() => collectHits.filter((hit) => hit.eventName === "generate_lead").length, {
        timeout: 15_000,
      })
      .toBe(1);

    const successLeads = collectHits.filter((hit) => hit.eventName === "generate_lead");
    expect(successLeads).toHaveLength(1);
    expect(successLeads[0]?.tid).toBe(MEASUREMENT_ID);
    expect(successLeads[0]?.formType).toBe("contact");
    expect(successLeads[0]?.pagePath).toBe("/conversion");
    expect(JSON.stringify(successLeads[0])).not.toMatch(
      /qa@example\.com|QA Visitor|Need hours|916/i,
    );

    await mkdir(ARTIFACT_DIR, { recursive: true });
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "contact_form_success.png"),
      fullPage: true,
    });

    const leadCountAfterSuccess = collectHits.filter(
      (hit) => hit.eventName === "generate_lead",
    ).length;
    const collectCountAfterSuccess = collectHits.length;
    formspreeStatus = 400;
    await page.goto("/contact-waikiki-dental/?wd-ga-test-host=waikikidental.com");
    await waitForGtagScript(page);
    await fillContactForm(page);
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your message was sent." })).toHaveCount(0);
    await flushQueuedAnalytics(page);
    await page.waitForTimeout(1500);

    const failureLeads = collectHits
      .slice(collectCountAfterSuccess)
      .filter((hit) => hit.eventName === "generate_lead");
    expect(failureLeads).toEqual([]);
    expect(
      collectHits.filter((hit) => hit.eventName === "generate_lead"),
    ).toHaveLength(leadCountAfterSuccess);
    expect(formspreeHits.some((hit) => hit.status === 400)).toBeTruthy();

    const log = {
      measurementId: MEASUREMENT_ID,
      formspreeHits,
      collectHits,
      generateLeadOnSuccess: successLeads,
      generateLeadOnFailure: failureLeads,
    };

    await writeFile(
      path.join(ARTIFACT_DIR, "generate_lead_collect_log.json"),
      `${JSON.stringify(log, null, 2)}\n`,
    );
  });
});
