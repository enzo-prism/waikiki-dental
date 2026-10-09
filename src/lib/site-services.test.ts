import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  canonicalPageRoutes,
  crownProcess,
  findService,
  scheduleHref,
  services,
} from "./site.ts";

function publicServiceCopy() {
  return [
    ...services.flatMap((service) => [
      service.title,
      service.slug,
      service.eyebrow,
      service.summary,
      service.description,
      ...service.highlights,
    ]),
    ...crownProcess.flatMap((step) => [step.title, step.body]),
  ].join("\n");
}

describe("practice-confirmed service menu", () => {
  it("does not offer dental bonding", () => {
    assert.equal(findService("dental-bonding"), undefined);
    assert.equal(
      services.some((service) => service.slug === "dental-bonding"),
      false,
    );
    assert.doesNotMatch(publicServiceCopy(), /bonding/i);
    assert.equal(canonicalPageRoutes.includes("dental-bonding"), false);
  });

  it("offers traditional lab crowns without same-day or CEREC claims", () => {
    const crowns = findService("dental-crowns");
    assert.ok(crowns);
    assert.equal(crowns.title, "Dental Crowns");
    assert.match(`${crowns.eyebrow} ${crowns.description}`, /lab/i);
    assert.equal(canonicalPageRoutes.includes("dental-crowns"), true);
    assert.doesNotMatch(publicServiceCopy(), /same[-\s]?day|cerec/i);
    assert.equal(
      services.some((service) => service.slug === "roseville-cerec-same-day-crowns"),
      false,
    );
  });

  it("keeps appointment CTAs on the on-site Jarvis page", () => {
    assert.equal(scheduleHref, "/request-appointment/");
    assert.equal(canonicalPageRoutes.includes("request-appointment"), true);
  });

  it("keeps IV sedation on the public menu", () => {
    const sedation = findService("iv-sedation");
    assert.ok(sedation);
    assert.equal(sedation.category, "sedation");
  });
});
