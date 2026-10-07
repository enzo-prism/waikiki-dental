import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig from "../../next.config.ts";

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

  it("301s the unpublished CEREC page to traditional crowns", async () => {
    const redirects = await nextConfig.redirects!();
    const cerec = redirects.find(
      (rule) => rule.source === "/roseville-cerec-same-day-crowns/",
    );
    assert.deepEqual(
      {
        destination: cerec?.destination,
        statusCode: "statusCode" in (cerec ?? {}) ? cerec?.statusCode : undefined,
        permanent: "permanent" in (cerec ?? {}) ? cerec?.permanent : undefined,
      },
      { destination: "/dental-crowns/", statusCode: 301, permanent: undefined },
    );
  });

  it("sends the retired bonding page to the services hub", async () => {
    const redirects = await nextConfig.redirects!();
    const bonding = redirects.find((rule) => rule.source === "/dental-bonding/");
    assert.deepEqual(
      { destination: bonding?.destination, permanent: bonding?.permanent },
      { destination: "/roseville-dental-care/", permanent: true },
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

  it("301s every legacy service alias instead of serving a duplicate page", async () => {
    const redirects = await nextConfig.redirects!();
    const aliases = {
      "/family-dentistry/": "/cleanings-exams/",
      "/roseville-family-dentist/": "/cleanings-exams/",
      "/cosmetic-dentistry/": "/smile-makeover/",
    };
    for (const [source, destination] of Object.entries(aliases)) {
      const rule = redirects.find((candidate) => candidate.source === source);
      assert.deepEqual(
        { destination: rule?.destination, permanent: rule?.permanent },
        { destination, permanent: true },
        source,
      );
    }
  });

  it("keeps the legacy sedation article redirected to IV sedation", async () => {
    const redirects = await nextConfig.redirects!();
    const article = redirects.find(
      (rule) =>
        rule.source === "/dental-blog/2746154-say-goodbye-to-dental-anxiety-with-iv-sedation/",
    );
    assert.equal(article?.destination, "/iv-sedation/");
  });
});
