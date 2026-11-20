import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { careGuides, orthodonticsQuestions } from "./care-guides.ts";
import { mediCalNotice, newPatientQuestions, services, site } from "./site.ts";

const allText = (guide: (typeof careGuides)[string]) =>
  [
    guide.title ?? "",
    ...guide.sections.flatMap(({ heading, body }) => [heading, body]),
    ...guide.questions.flatMap(({ question, answer }) => [question, answer]),
  ].join(" ");

describe("care guides (visible answers + FAQPage markup)", () => {
  it("only exist for live services", () => {
    for (const slug of Object.keys(careGuides)) {
      assert.ok(services.some((service) => service.slug === slug), slug);
    }
  });

  it("answer enough questions to be useful and cite the ADA", () => {
    for (const [slug, guide] of Object.entries(careGuides)) {
      assert.ok(guide.sections.length >= 3, `${slug} sections`);
      assert.ok(guide.questions.length >= 4, `${slug} questions`);
      assert.match(guide.source.href, /^https:\/\/www\.mouthhealthy\.org\//, slug);
      for (const link of guide.links) assert.match(link.href, /^\/[a-z0-9-]+\/$/, `${slug} ${link.href}`);
    }
  });

  it("make no price, offer, or outcome claims", () => {
    const banned = /\$|\d+\s*%|\bfree\b|guarantee|\bspecial\b|discount|24\/7|walk[-\s]?in|painless/i;
    for (const [slug, guide] of Object.entries(careGuides)) {
      assert.doesNotMatch(allText(guide), banned, slug);
    }
    for (const { answer } of [...newPatientQuestions, ...orthodonticsQuestions]) {
      assert.doesNotMatch(answer, banned);
    }
  });

  it("never advertise retired services", () => {
    for (const [slug, guide] of Object.entries(careGuides)) {
      assert.doesNotMatch(allText(guide), /bonding/i, slug);
    }
    const crowns = careGuides["dental-crowns"];
    const sameDay = crowns.questions.find(({ question }) => /same-day/i.test(question));
    assert.ok(sameDay, "crowns answer the same-day question");
    assert.match(sameDay.answer, /^No\./);
    for (const [slug, guide] of Object.entries(careGuides)) {
      if (slug === "dental-crowns") continue;
      assert.doesNotMatch(allText(guide), /same[-\s]?day|cerec/i, slug);
    }
  });

  it("use the office phone number and Medi-Cal policy from site data", () => {
    for (const [slug, guide] of Object.entries(careGuides)) {
      for (const phone of allText(guide).match(/\(\d{3}\) \d{3}-\d{4}/g) ?? []) {
        assert.equal(phone, site.phone, slug);
      }
      if (/Medi-Cal/.test(allText(guide))) assert.match(allText(guide), /Medi-Cal is not accepted|Medi-Cal is not\./, slug);
    }
    const mediCal = newPatientQuestions.find(({ question }) => /Medi-Cal/.test(question));
    assert.ok(mediCal?.answer.startsWith("No.") && mediCal.answer.includes(mediCalNotice));
  });

  it("keep questions unique within a page", () => {
    const pages = [
      ...Object.values(careGuides).map((guide) => guide.questions),
      newPatientQuestions,
      orthodonticsQuestions,
    ];
    for (const questions of pages) {
      const names = questions.map(({ question }) => question);
      assert.equal(new Set(names).size, names.length);
    }
  });
});
