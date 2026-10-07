import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  faqJsonLd,
  faqs,
  insuranceAndMediCal,
  paymentOptions,
  site,
} from "./site.ts";

function insurancePublicCopy() {
  return [
    insuranceAndMediCal.heading,
    insuranceAndMediCal.welcome,
    insuranceAndMediCal.mediCal,
    paymentOptions.insuranceNote,
    ...paymentOptions.items,
    ...faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join("\n");
}

describe("Medi-Cal and self-pay copy", () => {
  it("uses the shared Insurance & Medi-Cal heading", () => {
    assert.equal(insuranceAndMediCal.heading, "Insurance & Medi-Cal");
  });

  it("answers Do you accept Medi-Cal? without accepting Denti-Cal", () => {
    const mediCalFaq = faqs.find(
      (faq) => faq.question === "Do you accept Medi-Cal?",
    );
    assert.ok(mediCalFaq);
    assert.match(mediCalFaq.answer, /No\./);
    assert.match(mediCalFaq.answer, /do not accept Medi-Cal \(Denti-Cal\)/);
    assert.match(insuranceAndMediCal.mediCal, /do not accept Medi-Cal \(Denti-Cal\)/);
    assert.doesNotMatch(insuranceAndMediCal.welcome, /\bare accepted\b/i);
  });

  it("points self-pay visitors to documented options and the office phone", () => {
    const copy = insurancePublicCopy();
    assert.match(insuranceAndMediCal.mediCal, /self-pay patients/);
    assert.match(insuranceAndMediCal.mediCal, /cash-pay options/);
    assert.equal(copy.includes(site.phone), true);
    assert.match(copy, /CareCredit/);
    assert.equal(site.phone, "(916) 772-6248");
    assert.equal(site.email, "office@waikikidental.com");
  });

  it("does not invent membership plans, discount percents, or extra lenders", () => {
    const copy = insurancePublicCopy();
    assert.doesNotMatch(copy, /membership/i);
    assert.doesNotMatch(copy, /\d+\s*%/);
    assert.doesNotMatch(copy, /sunbit|lendingclub|cherry|proceed finance/i);
    assert.deepEqual(paymentOptions.items, [
      "CareCredit financing",
      "Major credit & debit cards",
      "Cash & check",
    ]);
  });

  it("keeps FAQ JSON-LD identical to the visible FAQ text", () => {
    assert.equal(faqJsonLd["@type"], "FAQPage");
    assert.equal(faqJsonLd.mainEntity.length, faqs.length);
    for (const [index, faq] of faqs.entries()) {
      const entity = faqJsonLd.mainEntity[index];
      assert.equal(entity["@type"], "Question");
      assert.equal(entity.name, faq.question);
      assert.equal(entity.acceptedAnswer["@type"], "Answer");
      assert.equal(entity.acceptedAnswer.text, faq.answer);
    }
  });
});
