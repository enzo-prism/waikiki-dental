import { defineConfig } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? 3010);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "off",
  },
  webServer: {
    command: `npx next start -p ${port}`,
    url: `http://127.0.0.1:${port}/contact-waikiki-dental/`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
