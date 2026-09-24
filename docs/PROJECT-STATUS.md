# Project status

Last reviewed: September 23, 2026

## Current production baseline

- Production: <https://waikikidental.com/>
- Source of truth: GitHub `main`
- Current production baseline: service-menu release, September 23, 2026
  (feature commit `932e7ef`)
- Public-domain launch baseline: `6772636` (September 1, 2026)
- Vercel project: `waikiki-dental-preview`
- Scheduling: every appointment CTA remains on-site at
  `/request-appointment/`; no legacy booking-system links are permitted

## Shipped experience

- Service menu corrected with the practice (2026-09-23 sync with Dr. Mike and
  Jessica): Dental Crowns (`/dental-crowns/`) added as traditional two-visit
  crowns, and Dental Bonding retired because it is not offered.
  `/dental-bonding/` redirects to the services hub, and the old CEREC URL
  redirects to `/dental-crowns/`. Same-day/CEREC crowns stay unpublished.
- Custom three-step appointment-request flow with an accessible weekday
  calendar, saved session draft, live summary, and Formspree delivery states.
- Searchable, filterable Google reviews page plus high-homepage rating and
  review-theme proof.
- Corrected button navigation so normal CTA clicks do not jump visitors to the
  footer.
- Updated favicon, Open Graph image, titles, descriptions, footer logo, and
  hero eyebrow brand mark.
- Upscaled Dr. Michael Narodovich portrait.
- Authentic team introduction high on the homepage using current imagery
  published by Waikiki Dental's official Facebook page.

## Media decision record

September 24, 2026: the AI-generated doctor-and-patient image was removed from
the homepage hero, the doctor page, and the share card. Imagery is now real
practice photography plus original abstract artwork ("Tide", with silent
breathing video loops on the homepage and IV sedation heroes). See
`MEDIA-PROVENANCE.md`.

The team photograph and Jessica and Nayeli staff portraits are self-hosted in
`public/media/`. Google Maps contributor images, Yelp reviewer uploads, patient
treatment imagery, and assets with unclear ownership or consent were excluded.
Older Facebook Reels were not embedded because they are dated, watermarked,
vertically framed, and would add third-party scripts and page weight.

See [`MEDIA-PROVENANCE.md`](MEDIA-PROVENANCE.md) for source links and the full
editorial boundary. The media audit and responsive screenshots are in
[`audits/2026-08-25-media-experience/`](audits/2026-08-25-media-experience/).

## Verification completed

- ESLint passes.
- The Next.js production build passes and statically generates all routes.
- The homepage was checked at 320, 390, 768, and 1440 px with no horizontal
  overflow.
- New team images load from the site's own origin and return HTTP 200.
- The team-section appointment CTA opens `/request-appointment/` at the top of
  the page.
- GA4 uses the dedicated Waikiki property and privacy-grouped production route
  tracking documented in `ANALYTICS-SEARCH.md`.
- The linked Vercel project is `waikiki-dental-preview`; production readiness must be
  re-read after every release rather than inferred from a Git push.

## Remaining operational gates

1. Obtain practice approval for continued website reuse of the three social
   images documented in `MEDIA-PROVENANCE.md`.
2. Run one clinic-approved, non-sensitive Formspree delivery test and verify the
   real inbox, recipients, Reply-To behavior, and spam/domain controls.
3. Re-run the form delivery check after any Formspree endpoint or recipient change.
4. Complete the paid Vercel Web Analytics enablement and live data readback and
   Search Console ownership in `ANALYTICS-SEARCH.md`.

## Known open issues (audit of September 23, 2026)

These were found in a full codebase audit and are not yet fixed. Items 1 and 5
need the practice. The rest are engineering work.

1. **Privacy notice PDF names another office.** `public/privacy-practices.pdf`
   lists the Privacy Officer and complaint contact as 916-727-6453, 4320
   Elverta Rd, Antelope, not the Roseville office. Get a Waikiki-specific
   notice from the practice and replace the file.
2. **Lead forms break when browser storage is blocked.**
   `src/lib/lead-attribution.ts` reads `window.localStorage` outside its
   try/catch, and the draft helpers in `src/lib/forms.ts` are unguarded, so
   submission can fail.
3. **Pre-hydration submit puts contact details in the URL.** Neither `<form>`
   sets `method`, so a native GET submit before JavaScript loads writes name,
   phone, and email into the query string.
4. **GA automatic hits are not path-sanitized.** `src/components/google-analytics.tsx`
   passes sanitized `page_location`/`page_title` only on the manual
   `page_view`, not in `config`.
5. **Structured-data rating and sedation wording.** `aggregateRating` in the
   Dentist JSON-LD reuses Google figures (self-serving review markup), and
   "Deep, monitored relaxation" for IV sedation should be checked against the
   doctor's sedation permit.
6. **No website privacy policy** covering GA cookies, attribution storage,
   and Formspree.
7. **Accessibility:** low-contrast focus rings on choice cards and buttons,
   the date picker's arrow keys don't move focus, and its grid ARIA is invalid.
8. **SEO hygiene:** legacy redirects take two hops for URLs without a trailing
   slash, `/family-dentistry/` serves a duplicate page, and the
   `/dental-blog/[slug]` route can never be reached.

## Highest-value future media upgrade

Capture a new 20–30 second horizontal office walkthrough showing arrival,
reception, a treatment room, and a natural team welcome. Obtain written website
and advertising usage approval from every recognizable person, retain the
original master outside the repo, and publish an optimized poster plus muted,
captioned web encodes rather than embedding a social-media player.
