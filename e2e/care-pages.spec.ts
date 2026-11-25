import { expect, test } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`flagship care is readable and connected at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.route(/https:\/\/(?:[^/]*\.)?(?:google-analytics\.com|googletagmanager\.com)\//, (route) => route.abort());
    for (const path of ["/iv-sedation/", "/roseville-dental-implants/"]) {
      await page.goto(path);
      await expect(page.locator("main h1")).toHaveCount(1);
      if (path === "/iv-sedation/") {
        const hero = page.locator("main section").first();
        await expect(hero.getByRole("link", { name: /Call .* for a sedation consultation/ })).toHaveAttribute("href", "tel:+19167726248");
        await expect(hero.getByRole("link", { name: /Text the office at/ })).toHaveAttribute("href", "sms:+19167726248");
        await expect(page.getByRole("link", { name: "Book a routine dental visit online" })).toHaveAttribute("href", "/request-appointment/");
        const request = width < 1024
          ? page.locator(".fixed.inset-x-0.bottom-0").getByRole("link", { name: "Request Appointment" })
          : hero.getByRole("link", { name: "Request Appointment" });
        await request.click();
        const consult = page.getByRole("region", { name: "Arrange an IV sedation consultation" });
        await expect(consult).toBeInViewport();
        await expect(consult.getByRole("link", { name: /Text the office at/ })).toHaveAttribute("href", "sms:+19167726248");
        await expect(consult.getByRole("link", { name: /Call .* for a sedation consultation/ })).toHaveAttribute("href", "tel:+19167726248");
        await consult.getByRole("link", { name: "Book a routine visit online" }).click();
        await expect(consult).toBeHidden();
        await expect(page.locator("iframe[data-jarvis-scheduler]")).toBeInViewport();
        await page.goto(path);
      }
      await expect(page.getByRole("heading", { name: "Answers before you choose your care." })).toBeVisible();
      const question = page.locator("details").first();
      await question.locator("summary").click();
      await expect(question.locator("p")).toBeVisible();
      await expect(page.locator("main a[href='/michael-narodovich-dmd/']")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.locator("main a[href='/michael-narodovich-dmd/']").click();
    await expect(page).toHaveURL(/\/michael-narodovich-dmd\/$/);
    await expect(page.getByRole("link", { name: "the Roseville office" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Verified licensing records" }).getByRole("link", { name: "Moderate Sedation Permit #44", exact: true })).toHaveAttribute("href", "https://search.dca.ca.gov/profile/440/4417/44/MS");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}

test("essential care answers and professional identity are available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/iv-sedation/");
  await expect(page.getByText("Start with a conversation about dental anxiety", { exact: true })).toBeVisible();
  await page.locator("details").first().locator("summary").click();
  await expect(page.locator("details").first().locator("p")).toBeVisible();
  const response = await page.request.get("/michael-narodovich-dmd/");
  const html = await response.text();
  expect(html).toContain('"@type":"ProfilePage"');
  expect(html).toContain('"@type":"Person"');
  await context.close();
});

test("urgent visits lead with a phone call and show the Roseville day", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  // Already Wednesday in UTC, still Tuesday at the practice.
  await page.clock.install({ time: new Date("2026-11-25T04:00:00Z") });
  await page.goto("/dental-emergencies/");
  const hero = page.locator("main section").first();
  await expect(hero.getByRole("link", { name: "Call (916) 772-6248" })).toHaveAttribute("href", "tel:+19167726248");
  const hours = hero.locator("summary");
  await expect(hours).toContainText("Regular Tuesday hours in Roseville: 9:00 AM - 6:00 PM");
  await hours.click();
  await expect(hero.getByText("Saturday", { exact: true })).toBeVisible();
  const bar = page.locator(".fixed.inset-x-0.bottom-0");
  await expect(bar.getByRole("link").first()).toHaveAttribute("href", "tel:+19167726248");
  await expect(bar.getByRole("link", { name: "Routine visit" })).toHaveAttribute("href", "/request-appointment/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
