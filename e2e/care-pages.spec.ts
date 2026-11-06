import { expect, test } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`flagship care is readable and connected at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.route(/https:\/\/(?:[^/]*\.)?(?:google-analytics\.com|googletagmanager\.com)\//, (route) => route.abort());
    for (const path of ["/iv-sedation/", "/roseville-dental-implants/"]) {
      await page.goto(path);
      await expect(page.locator("main h1")).toHaveCount(1);
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
