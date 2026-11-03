import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  findService,
  hours,
  paymentOptions,
  reviewStats,
  serviceSeo,
  services,
  site,
} from "./site.ts";

/** Listings rewritten for the November 2026 search plan. */
const rewritten = [
  "dental-emergencies",
  "roseville-invisalign",
  "dental-crowns",
  "iv-sedation",
] as const;

/** The root layout's title template appends this to every page title. */
const renderedTitle = (title: string) => `${title} | ${site.name}`;

describe("service search listings", () => {
  it("only describes services that exist", () => {
    for (const slug of Object.keys(serviceSeo)) {
      assert.ok(
        services.some((service) => service.slug === slug),
        `${slug} is a live service`,
      );
    }
    for (const slug of rewritten) assert.ok(serviceSeo[slug], slug);
  });

  it("fits Google's title and description display widths", () => {
    for (const slug of rewritten) {
      const { title, description } = serviceSeo[slug];
      assert.ok(
        renderedTitle(title).length <= 60,
        `${slug} title is ${renderedTitle(title).length} chars`,
      );
      assert.ok(
        description.length <= 155,
        `${slug} description is ${description.length} chars`,
      );
    }
  });

  it("uses no dashes as punctuation", () => {
    for (const slug of rewritten) {
      const { title, description } = serviceSeo[slug];
      assert.doesNotMatch(`${title} ${description}`, /[–—]| - /, slug);
    }
  });

  it("makes no price, offer, or guarantee claims", () => {
    for (const slug of rewritten) {
      const { title, description } = serviceSeo[slug];
      assert.doesNotMatch(
        `${title} ${description}`,
        /\$|\d+\s*%|\bfree\b|guarantee|special|discount|same[-\s]?day|cerec|24\/7|walk[-\s]?in/i,
        slug,
      );
    }
  });

  it("backs every financing, rating, phone, and hours claim with site data", () => {
    const rating = `${reviewStats.rating.toFixed(1)} stars from ${reviewStats.count} Google reviews`;
    for (const slug of rewritten) {
      const { description } = serviceSeo[slug];
      if (/CareCredit/.test(description)) {
        assert.ok(
          paymentOptions.items.some((item) => item.includes("CareCredit")),
          slug,
        );
      }
      if (/Google reviews/.test(description)) {
        assert.ok(description.includes(rating), `${slug} uses reviewStats`);
      }
      if (/\(\d{3}\)/.test(description)) {
        assert.ok(description.includes(site.phone), `${slug} uses site.phone`);
      }
    }

    const emergency = serviceSeo["dental-emergencies"].description;
    assert.ok(emergency.includes(site.phone));
    assert.match(emergency, /Monday to Friday/);
    const open = hours.filter(([, range]) => range !== "Closed").map(([day]) => day);
    assert.deepEqual(open, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    assert.match(
      findService("dental-emergencies")?.description ?? "",
      /every effort to see/,
      "the speed claim mirrors the emergency page",
    );
  });

  it("keeps crowns traditional: two visits, lab-made", () => {
    const { title, description } = serviceSeo["dental-crowns"];
    assert.match(title, /Two Visits/);
    assert.match(description, /lab-made/);
    assert.match(findService("dental-crowns")?.eyebrow ?? "", /lab/i);
  });

  it("keeps each listing aimed at the query it ranks for", () => {
    assert.match(serviceSeo["dental-emergencies"].title, /^Emergency Dentist in Roseville/);
    assert.match(serviceSeo["roseville-invisalign"].title, /^Invisalign Dentist in Roseville/);
    assert.match(serviceSeo["dental-crowns"].title, /^Dental Crowns in Roseville/);
    assert.match(serviceSeo["iv-sedation"].title, /^IV Sedation Dentist in Roseville/);
  });
});
