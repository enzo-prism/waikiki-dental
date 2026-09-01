# Analytics and search operations

Last verified: September 1, 2026

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
  click IDs as custom events.

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

- removes query strings and URL fragments;
- groups appointment and contact routes as `/conversion`;
- reports testimonials as `/reviews`, practice pages as `/practice`, blog
  articles as `/education`, and treatment pages as `/services`;
- excludes `/privacy-practices`;
- clears the page referrer; and
- disables Google Signals and ad-personalization signals.

Do not add form values, names, email addresses, phone numbers, treatment or
appointment reasons, notes, UTM values, click IDs, user IDs, or custom lead
events to GA4. Formspree remains the lead source of truth.

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
