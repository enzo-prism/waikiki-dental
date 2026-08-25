# Project status

Last reviewed: August 25, 2026

## Current production baseline

- Production: <https://waikiki-dental.vercel.app/>
- Source of truth: GitHub `main`
- Homepage media implementation baseline: `348f713`
- Custom domain: `waikikidental.com` is not connected to this Vercel project
- Scheduling: every appointment CTA remains on-site at
  `/request-appointment/`; no legacy booking-system links are permitted

## Shipped experience

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
- The linked Vercel project is `waikiki-dental`; production readiness must be
  re-read after every release rather than inferred from a Git push.

## Remaining launch gates

1. Obtain practice approval for continued website reuse of the three social
   images documented in `MEDIA-PROVENANCE.md`.
2. Run one clinic-approved, non-sensitive Formspree delivery test and verify the
   real inbox, recipients, Reply-To behavior, and spam/domain controls.
3. Complete stakeholder approval before connecting `waikikidental.com`.

## Highest-value future media upgrade

Capture a new 20–30 second horizontal office walkthrough showing arrival,
reception, a treatment room, and a natural team welcome. Obtain written website
and advertising usage approval from every recognizable person, retain the
original master outside the repo, and publish an optimized poster plus muted,
captioned web encodes rather than embedding a social-media player.
