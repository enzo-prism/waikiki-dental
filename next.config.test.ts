import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig from "./next.config.ts";

describe("next.config redirects", () => {
  it("sends any extra path under /request-appointment/ to the real form", async () => {
    const redirects = await nextConfig.redirects!();
    const nested = redirects.filter(
      (rule) =>
        rule.destination === "/request-appointment/" &&
        rule.source.startsWith("/request-appointment/:path+"),
    );

    assert.deepEqual(
      nested.map((rule) => ({
        source: rule.source,
        destination: rule.destination,
        permanent: rule.permanent,
      })),
      [
        {
          source: "/request-appointment/:path+",
          destination: "/request-appointment/",
          permanent: true,
        },
        {
          source: "/request-appointment/:path+/",
          destination: "/request-appointment/",
          permanent: true,
        },
      ],
    );

    assert.equal(
      redirects.some(
        (rule) =>
          rule.source === "/request-appointment/" ||
          rule.source === "/request-appointment/:path*" ||
          rule.source === "/request-appointment/:path*/",
      ),
      false,
      "the form URL itself must not redirect",
    );
  });

  it("keeps the /appointments/ alias pointed at the form", async () => {
    const redirects = await nextConfig.redirects!();
    const alias = redirects.find((rule) => rule.source === "/appointments/");
    assert.deepEqual(
      { destination: alias?.destination, permanent: alias?.permanent },
      { destination: "/request-appointment/", permanent: true },
    );
  });
});
