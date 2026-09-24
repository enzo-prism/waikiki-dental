import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig, { contentSecurityPolicy } from "../../next.config.ts";

function directive(policy: string, name: string) {
  return policy
    .split(";")
    .map((part) => part.trim())
    .find((part) => part === name || part.startsWith(`${name} `));
}

describe("next.config security headers", () => {
  it("builds a CSP that blocks framing and allows only GA4 and Formspree", () => {
    const policy = contentSecurityPolicy();

    assert.equal(directive(policy, "frame-ancestors"), "frame-ancestors 'none'");
    assert.equal(directive(policy, "object-src"), "object-src 'none'");
    assert.equal(directive(policy, "default-src"), "default-src 'self'");
    assert.ok(directive(policy, "upgrade-insecure-requests"));
    assert.match(directive(policy, "script-src") ?? "", /https:\/\/www\.googletagmanager\.com/);
    assert.doesNotMatch(directive(policy, "script-src") ?? "", /unsafe-eval/);
    for (const origin of [
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://www.googletagmanager.com",
      "https://www.google.com",
      "https://formspree.io",
    ]) {
      assert.ok(directive(policy, "connect-src")?.includes(origin), origin);
    }
    assert.equal(directive(policy, "form-action"), "form-action 'self' https://formspree.io");
  });

  it("sends baseline headers on every route and noindex off the production host", async () => {
    const rules = await nextConfig.headers!();
    const global = rules.find((rule) => rule.source === "/:path*" && !rule.missing);
    const keys = global?.headers.map((header) => header.key) ?? [];
    for (const key of [
      "X-Frame-Options",
      "X-Content-Type-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Content-Security-Policy",
    ]) {
      assert.ok(keys.includes(key), key);
    }
    assert.equal(
      keys.includes("Strict-Transport-Security"),
      false,
      "Vercel already sends HSTS; do not add includeSubDomains/preload here",
    );

    const noindex = rules.find((rule) =>
      rule.headers.some((header) => header.key === "X-Robots-Tag"),
    );
    assert.deepEqual(noindex?.missing, [{ type: "host", value: "waikikidental\\.com" }]);
    assert.equal(noindex?.has, undefined);
    assert.equal(nextConfig.poweredByHeader, false);
  });
});
