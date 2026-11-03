import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig, {
  canonicalOrigin,
  legacyRedirects,
  legacyWwwHost,
} from "../../next.config.ts";
import { canonicalPageRoutes } from "./site.ts";

/** Rules that apply on the canonical host (no host condition). */
async function apexRedirects() {
  const redirects = await nextConfig.redirects!();
  return redirects.filter((rule) => !rule.has);
}

/** Rules that only apply to the old www host. */
async function wwwRedirects() {
  const redirects = await nextConfig.redirects!();
  return redirects.filter((rule) =>
    rule.has?.some((condition) => condition.type === "host"),
  );
}

function matchesHost(pattern: string, host: string) {
  return new RegExp(`^${pattern}$`).test(host);
}

describe("next.config redirects", () => {
  it("sends any extra path under /request-appointment/ to the real form", async () => {
    const redirects = await apexRedirects();
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
    const redirects = await apexRedirects();
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
    const redirects = await apexRedirects();
    const bonding = redirects.find((rule) => rule.source === "/dental-bonding/");
    assert.deepEqual(
      { destination: bonding?.destination, permanent: bonding?.permanent },
      { destination: "/roseville-dental-care/", permanent: true },
    );
  });

  it("keeps the /appointments/ alias pointed at the form", async () => {
    const redirects = await apexRedirects();
    const alias = redirects.find((rule) => rule.source === "/appointments/");
    assert.deepEqual(
      { destination: alias?.destination, permanent: alias?.permanent },
      { destination: "/request-appointment/", permanent: true },
    );
  });

  it("301s every legacy service alias instead of serving a duplicate page", async () => {
    const redirects = await apexRedirects();
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
    const redirects = await apexRedirects();
    const article = redirects.find(
      (rule) =>
        rule.source === "/dental-blog/2746154-say-goodbye-to-dental-anxiety-with-iv-sedation/",
    );
    assert.equal(article?.destination, "/iv-sedation/");
  });
});

describe("old www addresses", () => {
  it("sends every legacy www URL to its final canonical page in one hop", async () => {
    const www = await wwwRedirects();
    for (const legacy of legacyRedirects) {
      const twin = www.find((rule) => rule.source === legacy.source);
      assert.ok(twin, `missing www twin for ${legacy.source}`);
      assert.equal(twin.destination, `${canonicalOrigin}${legacy.destination}`);
      assert.equal(
        "statusCode" in twin ? twin.statusCode : undefined,
        "statusCode" in legacy ? legacy.statusCode : undefined,
      );
      assert.equal(
        "permanent" in twin ? twin.permanent : undefined,
        "permanent" in legacy ? legacy.permanent : undefined,
      );
    }
  });

  it("matches only the www host, with escaped dots", async () => {
    const www = await wwwRedirects();
    for (const rule of www) {
      const host = rule.has?.find((condition) => condition.type === "host");
      assert.ok(host?.value);
      assert.equal(matchesHost(host.value, legacyWwwHost), true);
      assert.equal(matchesHost(host.value, "waikikidental.com"), false);
      assert.equal(matchesHost(host.value, "wwwXwaikikidental.com"), false);
    }
  });

  it("keeps the path for every other www URL, adding the page slash in the same hop", async () => {
    const redirects = await nextConfig.redirects!();
    const catchAlls = redirects
      .map((rule, index) => ({ rule, index }))
      .filter(
        ({ rule }) =>
          rule.has &&
          !legacyRedirects.some((legacy) => legacy.source === rule.source),
      );
    assert.deepEqual(
      catchAlls.map(({ rule }) => [rule.source, rule.destination, rule.permanent]),
      [
        ["/.well-known/:path*", `${canonicalOrigin}/.well-known/:path*`, true],
        ["/:file((?:[^/]+/)*[^/]+\\.\\w+)", `${canonicalOrigin}/:file`, true],
        // Pages always land on the slash form the apex serves.
        ["/:path+", `${canonicalOrigin}/:path+/`, true],
        ["/", `${canonicalOrigin}/`, true],
      ],
    );

    const fileRule = new RegExp("^/((?:[^/]+/)*[^/]+\\.\\w+)$");
    assert.equal(fileRule.test("/robots.txt"), true);
    assert.equal(fileRule.test("/media/art/tide-poster.jpg"), true);
    assert.equal(fileRule.test("/iv-sedation"), false);

    const firstCatchAll = catchAlls[0].index;
    const lastSpecific = redirects.findLastIndex(
      (rule) =>
        rule.has && legacyRedirects.some((legacy) => legacy.source === rule.source),
    );
    assert.ok(lastSpecific < firstCatchAll, "specific www rules come first");
    const firstApex = redirects.findIndex((rule) => !rule.has);
    assert.ok(catchAlls.at(-1)!.index < firstApex, "www rules run before apex rules");
  });

  it("never points a legacy URL at another redirect", async () => {
    const sources = new Set(legacyRedirects.map((rule) => rule.source));
    const livePages = new Set(
      canonicalPageRoutes.map((slug) => (slug ? `/${slug}/` : "/")),
    );
    livePages.add("/privacy-practices/");
    for (const rule of legacyRedirects) {
      assert.equal(sources.has(rule.destination), false, rule.destination);
      assert.ok(livePages.has(rule.destination), `${rule.destination} is a live page`);
    }
  });
});
