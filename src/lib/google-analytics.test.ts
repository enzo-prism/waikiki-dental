import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanitizeAnalyticsPath } from "./analytics.ts";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  aiReferrerFromReferrer,
  googleAnalyticsCampaignQuery,
  googleAnalyticsPageFields,
  googleAnalyticsReferrer,
  isGoogleAnalyticsProductionHostname,
} from "./google-analytics.ts";

describe("Google Analytics configuration", () => {
  it("uses the authorized Waikiki Dental stream", () => {
    assert.equal(GOOGLE_ANALYTICS_MEASUREMENT_ID, "G-BKCF5MR0YN");
  });

  it("runs only on the public custom domains", () => {
    assert.equal(
      isGoogleAnalyticsProductionHostname("waikikidental.com"),
      true,
    );
    assert.equal(
      isGoogleAnalyticsProductionHostname("WWW.WAIKIKIDENTAL.COM"),
      true,
    );
    assert.equal(
      isGoogleAnalyticsProductionHostname("waikiki-dental-preview.vercel.app"),
      false,
    );
    assert.equal(isGoogleAnalyticsProductionHostname("localhost"), false);
  });

  it("uses the same privacy-safe path groups as Vercel Analytics", () => {
    assert.equal(sanitizeAnalyticsPath("/request-appointment/"), "/conversion");
    assert.equal(sanitizeAnalyticsPath("/contact-waikiki-dental"), "/conversion");
    assert.equal(sanitizeAnalyticsPath("/patient-testimonials"), "/reviews");
    assert.equal(sanitizeAnalyticsPath("/michael-narodovich-dmd"), "/practice");
    assert.equal(sanitizeAnalyticsPath("/dental-blog/gentle-care"), "/education");
    assert.equal(sanitizeAnalyticsPath("/iv-sedation"), "/services");
    assert.equal(sanitizeAnalyticsPath("/privacy-practices/"), null);
  });

  it("builds route-change page fields with no query string, real title, or referrer", () => {
    const safePath = sanitizeAnalyticsPath("/request-appointment/");
    assert.ok(safePath);
    assert.deepEqual(
      googleAnalyticsPageFields("https://waikikidental.com", safePath),
      {
        page_location: "https://waikikidental.com/conversion",
        page_referrer: "",
        page_title: "Waikiki Dental",
      },
    );
  });

  it("keeps only campaign and Google Ads click parameters", () => {
    assert.equal(
      googleAnalyticsCampaignQuery(
        "?utm_source=google&utm_medium=cpc&utm_campaign=implants&utm_term=tooth+pain&utm_content=ad_1&gclid=Cj0abc&fbclid=xyz&reason=sedation&email=a%40b.com",
      ),
      "?utm_source=google&utm_medium=cpc&utm_campaign=implants&gclid=Cj0abc",
    );
    assert.equal(
      googleAnalyticsCampaignQuery("gbraid=g1&wbraid=w1&utm_id=42"),
      "?utm_id=42&gbraid=g1&wbraid=w1",
    );
    assert.equal(googleAnalyticsCampaignQuery("?topic=insurance"), "");
    assert.equal(googleAnalyticsCampaignQuery(""), "");
    assert.equal(
      googleAnalyticsCampaignQuery(`?gclid=${"x".repeat(400)}`).length,
      "?gclid=".length + 256,
    );
  });

  it("passes only the referring site's origin, never internal or self referrals", () => {
    const host = "waikikidental.com";
    assert.equal(
      googleAnalyticsReferrer("https://www.google.com/search?q=emergency+dentist", host),
      "https://www.google.com/",
    );
    assert.equal(
      googleAnalyticsReferrer("https://www.yelp.com/biz/waikiki-dental-roseville", host),
      "https://www.yelp.com/",
    );
    assert.equal(googleAnalyticsReferrer("https://waikikidental.com/iv-sedation/", host), "");
    assert.equal(googleAnalyticsReferrer("https://www.waikikidental.com/invisalign/", host), "");
    assert.equal(googleAnalyticsReferrer("", host), "");
    assert.equal(googleAnalyticsReferrer("android-app://com.google.android.gm/", host), "");
    assert.equal(googleAnalyticsReferrer("not a url", host), "");
  });

  it("gives the landing hit its campaign and referrer so GA4 does not file it as Direct", () => {
    const safePath = sanitizeAnalyticsPath("/dental-emergencies/");
    assert.ok(safePath);
    assert.deepEqual(
      googleAnalyticsPageFields("https://waikikidental.com", safePath, {
        search: "?utm_source=gbp&utm_medium=organic&utm_campaign=listing&utm_term=abscess",
        referrer: "https://www.google.com/",
        hostname: "waikikidental.com",
      }),
      {
        page_location:
          "https://waikikidental.com/services?utm_source=gbp&utm_medium=organic&utm_campaign=listing",
        page_referrer: "https://www.google.com/",
        page_title: "Waikiki Dental",
      },
    );
  });

  it("keeps the treatment page out of the landing hit", () => {
    const fields = googleAnalyticsPageFields("https://waikikidental.com", "/services", {
      search: "?gclid=abc",
      referrer: "https://www.google.com/search?q=iv+sedation+roseville",
      hostname: "waikikidental.com",
    });
    assert.doesNotMatch(JSON.stringify(fields), /sedation|dental-emergencies|search\?q/);
  });

  it("labels known AI referrer hosts without paths, queries, or credentials", () => {
    const expected: Record<string, string> = {
      "https://chatgpt.com/c/private-chat": "chatgpt.com",
      "https://www.chatgpt.com/": "chatgpt.com",
      "https://chat.openai.com/chat/private": "chatgpt.com",
      "https://www.perplexity.ai/search?q=private": "perplexity.ai",
      "https://gemini.google.com/app": "gemini.google.com",
      "https://copilot.microsoft.com/chats/private": "copilot.microsoft.com",
      "https://claude.ai/chat/private": "claude.ai",
      "https://www.you.com/search?q=private": "you.com",
    };
    for (const [referrer, label] of Object.entries(expected)) {
      assert.equal(aiReferrerFromReferrer(referrer), label);
    }
    for (const referrer of ["", "https://www.google.com/", "javascript:alert(1)", "https://user:pass@chatgpt.com/", "https://chatgpt.com.evil.com/"]) {
      assert.equal(aiReferrerFromReferrer(referrer), "");
    }
  });

  it("adds ai_referrer only on the landing hit, never on later route-change fields", () => {
    const landing = googleAnalyticsPageFields("https://waikikidental.com", "/services", {
      search: "",
      referrer: "https://claude.ai/chat/private-thread",
      hostname: "waikikidental.com",
    });
    assert.equal(landing.ai_referrer, "claude.ai");
    assert.doesNotMatch(JSON.stringify(landing), /private-thread/);
    const later = googleAnalyticsPageFields("https://waikikidental.com", "/conversion");
    assert.equal("ai_referrer" in later, false);
  });
});
