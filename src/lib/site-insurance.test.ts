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

  it("answers Do you accept Medi-Cal? with the doctor's cash-rate wording", () => {
    const mediCalFaq = faqs.find(
      (faq) => faq.question === "Do you accept Medi-Cal?",
    );
    assert.ok(mediCalFaq);
    assert.equal(mediCalFaq.answer, insuranceAndMediCal.mediCal);
    assert.match(
      mediCalFaq.answer,
      /Unfortunately, we don't accept Medi-Cal \(Denti-Cal\), but we do offer discounted rates for patients who pay cash\./,
    );
    assert.equal(mediCalFaq.answer.includes(site.phone), true);
    assert.doesNotMatch(insuranceAndMediCal.welcome, /\bare accepted\b/i);
  });

  it("keeps the office phone and email and still lists documented CareCredit", () => {
    const copy = insurancePublicCopy();
    assert.equal(copy.includes(site.phone), true);
    assert.match(copy, /CareCredit/);
    assert.equal(site.phone, "(916) 772-6248");
    assert.equal(site.email, "office@waikikidental.com");
  });

  it("does not invent membership plans, discount percents, or extra lenders", () => {
    const copy = insurancePublicCopy();
    assert.doesNotMatch(copy, /membership/i);
    assert.doesNotMatch(copy, /\d+\s*%/);
    assert.doesNotMatch(copy, /\$\d/);
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
