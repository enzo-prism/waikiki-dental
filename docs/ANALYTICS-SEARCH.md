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

GA4 is intentionally not embedded. The connected Google identity has no
Waikiki Dental property or web stream, and the only editable dental-adjacent
account found is Roseville Dental Academy. Do not mix this practice into that
property or another client's account.

There is also a healthcare privacy gate. Google's current guidance says
HIPAA-regulated entities must not expose PHI to Google Analytics and should not
tag pages that legal/compliance determines are HIPAA-covered. These public
pages describe dental services and appointment intent, so consent alone is not
a sufficient technical safeguard. Before adding GA4, obtain:

1. the practice's written legal/compliance determination identifying pages
   permitted to use GA4;
2. an authorized, dedicated GA4 account/property and production web stream;
3. a measurement plan that strips all query strings and forbids names, email,
   phone, appointment reasons, form text, UTM values containing PII, and other
   sensitive fields; and
4. a live DebugView/Realtime test proving one page view per permitted route and
   no collection from excluded routes.

Until those gates are met, privacy-redacted Vercel page groups are the intended
traffic source.

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
