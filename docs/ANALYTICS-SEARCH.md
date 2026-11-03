# Analytics and search operations

Last verified: September 1, 2026 (attribution and conversion changes:
November 3, 2026, pending account-side setup below)

This document separates code readiness from account-side enablement. A package,
resource ID, DNS token, or successful build is not proof that traffic is being
collected.

## Vercel Web Analytics

`@vercel/analytics` is installed and `SiteAnalytics` is mounted only when
`VERCEL_WEB_ANALYTICS_ENABLED=true`. The `beforeSend` boundary:

- removes query strings and URL fragments;
- groups service pages as `/services`, practice pages as `/practice`, blog
  pages as `/education`, and contact/appointment pages as `/conversion`;
- keeps the public `/reviews` aggregate;
- excludes `/privacy-practices`; and
- never sends form values, contact details, treatment reasons, UTM values, or
  click IDs as custom events;
- allowlists two named clicks, `Phone Click` and `Email Click`, with no
  properties. They fire from every `tel:` and `mailto:` link on the site
  (header, mobile bar, heroes, interiors, footer, appointment page) through
  one capture-phase listener, `ContactClickTracker`.

The Vercel project currently has an analytics resource ID, but its Web Analytics
feature is disabled. Vercel CLI classifies enabling it on this Pro team as a
paid action that requires an interactive owner confirmation. Do not set the env
flag until that feature is enabled. After approval:

```bash
vercel project web-analytics enable waikiki-dental-preview --scope enzo-design-prisms-projects
vercel env add VERCEL_WEB_ANALYTICS_ENABLED production --scope enzo-design-prisms-projects
```

Redeploy after setting the variable. Verify `/_vercel/insights/script.js` is
200, one sanitized page-view request is accepted, and the project API reports
`features.webAnalytics: true`. Verify real dashboard/API data later; an empty
new resource immediately after release is expected.

Speed Insights is a separate Vercel product. It is not enabled because Vercel
currently prices it at $10 per project per month on Pro. Do not enable it
without a separate spend approval.

## Google Analytics 4

The authorized GA4 property is `552428635`; its production web stream is
`15554484040` with measurement ID `G-BKCF5MR0YN`. The root layout initializes it
only on `waikikidental.com` and `www.waikikidental.com`, so local, preview, and
generated Vercel URLs cannot contaminate production data.

The implementation disables GA's automatic initial page view and sends a
privacy-reduced manual page view on each public route change. It:

- removes query strings and URL fragments, except that the **landing hit** of a
  page load keeps the campaign parameters GA4 needs for attribution:
  `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, and the Google Ads
  click IDs `gclid`, `gbraid`, and `wbraid` (values capped at 256 characters).
  `utm_term`, `utm_content`, `fbclid`, and every other parameter are dropped;
- groups appointment and contact routes as `/conversion`;
- reports testimonials as `/reviews`, practice pages as `/practice`, blog
  articles as `/education`, and treatment pages as `/services`;
- excludes `/privacy-practices`;
- sends the referring site's **origin only** (for example
  `https://www.google.com/`) on the landing hit, and an empty referrer on
  later route changes and for internal or `www`/apex self-referrals;
- sets the grouped `page_location`, fixed `page_title`, and an empty referrer
  in `gtag("config")` and with `gtag("set")` before every page view, so gtag's
  automatic hits (such as `user_engagement`) and custom events never carry the
  raw URL, query parameters, the landing referrer, or treatment page titles.
  The campaign parameters and referrer origin go only on the landing
  `page_view` event itself; and
- disables Google Signals and ad-personalization signals.

### Why GA4 reported almost every visit as Direct

Until November 2026 every hit, including the first one, carried an empty
`page_referrer` and a `page_location` with no query string. GA4 attributes a
session from its first hit's referrer and campaign parameters, so Google
search, Google Business Profile, ads, and referral visits were all filed under
`(direct) / (none)`. The landing-hit exception above restores attribution
while the page path stays grouped (`/services`, never the treatment page) and
the search terms stay out. Historic data cannot be re-attributed; compare
channel reports from the deploy date onward.

### Conversions

Phone and email clicks reach GA4 as `phone_click` and `email_click` (GA4
event names cannot contain spaces, so the Vercel display names are not
reused), with no parameters. They count as conversions only after they are
marked as **Key Events** in the GA4 property.

Online bookings happen inside the Jarvis iframe on
`schedule.jarvisanalytics.com`. The site cannot see a completed booking in a
cross-origin frame, and Jarvis has not documented a booking-complete
`postMessage` or confirmation redirect for this embed. Do not guess a message
format. The weekly online-booking count comes from Jarvis's own reporting until
Jarvis confirms an event the site can listen for.

### Account-side steps (owner only, not done in code)

1. GA4 Admin > Events: once `phone_click` and `email_click` appear (after the
   release and a test click), mark both as Key Events.
2. GA4 Admin > Data streams > Configure tag settings > List unwanted
   referrals: add `schedule.jarvisanalytics.com` and any financing domain
   (for example CareCredit) in case they ever send a visitor back to the
   site, so a return trip is not counted as a new referral session. The site
   already drops `waikikidental.com` and `www.waikikidental.com` referrers.
3. If Google Ads is used: link the GA4 property to the Ads account, keep
   auto-tagging on, and import the two Key Events as conversion actions (or
   use Google forwarding numbers for real call counts).
4. Tag Google Business Profile links with `utm_source=google`,
   `utm_medium=organic`, `utm_campaign=gbp` so map listing visits are
   separable from web search.
5. Pull the weekly online-booking count from Jarvis reporting, and ask Jarvis
   support whether the scheduler embed can emit a booking-complete
   `postMessage` the site could forward as a GA4 event.

The production Content-Security-Policy in `next.config.ts` allows GA4 script
and collection origins (`www.googletagmanager.com`, `*.google-analytics.com`,
`*.analytics.google.com`, and `www.google.com`, which GA4 also beacons to).
If GA or Formspree endpoints change, update the CSP and
`src/lib/next-config-headers.test.ts` together, then confirm there are no
CSP violations in the browser console on `waikikidental.com`.

Do not add form values, names, email addresses, phone numbers, treatment or
appointment reasons, notes, `utm_term`/`utm_content`, other query parameters,
or user IDs to GA4, and do not send campaign parameters on any hit but the
landing hit. The only custom events besides grouped page views are
`phone_click` and `email_click` from `trackAllowedEvent` in
`src/lib/analytics.ts` (event name only, no properties), and `generate_lead`
from `trackGenerateLead` after a successful contact Formspree response
(`form_type: "contact"` and the grouped `page_path` only). Formspree remains
the contact-form source of truth.

The stream's Enhanced Measurement settings were verified on September 1, 2026.
**Page views** is the only active measurement, and **Page changes based on
browser history events** is off. Scrolls, outbound clicks, site search, form
interactions, video engagement, and file downloads are off. The application
owns route-change page views; this avoids double-counting and prevents automatic
events from bypassing the redaction boundary. Use Realtime or DebugView to
confirm one grouped page view per navigation and no event on
`/privacy-practices`.

The Analytics Data API identity does not currently have access to the new
property, so automated dashboard readback requires Viewer access to be granted
on that property. Site-side collection does not depend on that API permission.

## Google Search Console

The domain property `sc-domain:waikikidental.com` exists, and the public DNS
zone contains a Google verification TXT record. The connected
`enzo@design-prism.com` identity is nevertheless `siteUnverifiedUser`; sitemap
and URL Inspection API calls return 403. Preserve the existing TXT record.

An owner must verify this Google identity (or grant it Owner/Full access) before
submitting `https://waikikidental.com/sitemap.xml`. After access is confirmed,
submit the sitemap and inspect the canonical homepage, practice, services,
reviews, contact, and appointment routes. The public code already provides
route canonicals, an indexable `robots.txt`, and sitemap while preview deploys
remain noindex.

## Old www addresses

The pre-redesign site lived on `www.waikikidental.com`, and Search Console
still credits some clicks to those URLs. `siteRedirects()` in `next.config.ts`
sends every www URL to its final page on `https://waikikidental.com` in one
hop: each legacy path has a www twin that points at the legacy rule's final
destination, and every other www page keeps its path and gains the trailing
slash in the same hop. `src/lib/next-config-redirects.test.ts` checks this,
and that no legacy rule points at another redirect.

These rules only run if Vercel lets the request reach the deployment. If the
project's Domains settings redirect `www.waikikidental.com` to the apex, that
domain-level redirect runs first and keeps the old path, so an old www URL
still takes two hops (www to apex, then apex legacy rule). To get one hop, the
www domain must be connected to Production **without** a redirect. That is an
account setting; change it only with the owner's approval and then verify:

```bash
curl -sI https://www.waikikidental.com/invisalign/   # 308 -> https://waikikidental.com/roseville-invisalign/
curl -sI https://www.waikikidental.com/dental-crowns/ # 308 -> https://waikikidental.com/dental-crowns/
```

Two hops remain by design: `http://` requests get Vercel's HTTPS upgrade
first, and a slashless URL gets Next's trailing-slash redirect before any
custom rule (see `PROJECT-STATUS.md`, known issue 5).

