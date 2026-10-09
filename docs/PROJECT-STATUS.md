# Project status

Last reviewed: October 7, 2026

## Current production baseline

- Production: <https://waikikidental.com/>
- Source of truth: GitHub `main`
- Current production baseline: October seasonal layer, October 7, 2026
  (PR #8 `d31ed92`)
- Earlier releases: lab-made crown copy and service-menu guard test (PR #7
  `cdc35c0`, October 6); audit fixes (`43dfcbe`, September 24); service-menu
  release (`932e7ef`, September 23)
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
- `/request-appointment/` embeds the practice’s Jarvis scheduler, with office
  phone and email beside it. The retired on-site request form is gone.
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

## Seasonal layer

October 2026: a Halloween layer (a moonlit homepage hero with the real team
and Dr. Mike as Polaroids on a string of lights, a once-per-session bat
fly-by, amber underline draw-in, pumpkin-hibiscus favicon, and a 404
ghost-tooth) switches itself on October 1–31 Pacific and off on November 1
with no redeploy. Preview with `?season=halloween`; opt out with
`?season=off`. Rules and scope are in `AGENTS.md` ("Seasonal layer").

After November 1, 2026, set `activeSeason` to `null` so the dormant head
script stops shipping. Next year needs a new `SeasonalTheme` id and dates
plus a versioned `public/seasonal/<id>/` folder.

## Verification completed

- ESLint passes.
- The Next.js production build passes and prerenders all routes as static HTML.
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

Found in a full codebase audit. Items 1–4 need the practice; item 5 is
engineering work that is intentionally deferred.

1. **Privacy notice PDF names another office.** `public/privacy-practices.pdf`
   lists the Privacy Officer and complaint contact as 916-727-6453, 4320
   Elverta Rd, Antelope, not the Roseville office. Get a Waikiki-specific
   notice from the practice and replace the file.
2. **No website privacy policy** covering GA cookies, attribution storage,
   and Formspree. Also confirm with the practice whether Formspree needs a
   BAA / HIPAA review for appointment requests.
3. **Sedation wording.** "Deep, monitored relaxation" for IV sedation should
   be checked against the doctor's sedation permit.
4. **Practice sign-offs still pending:** the clinic-approved Formspree live
   delivery test and approval of the social images (see "Remaining
   operational gates" above).
5. **Legacy URLs without a trailing slash take two redirect hops** (for
   example `/family-dentistry` → `/family-dentistry/` → `/cleanings-exams/`).
   With `trailingSlash: true`, Next unshifts its built-in trailing-slash
   redirect ahead of custom `redirects()` (`lib/load-custom-routes.js`).
   October 7, 2026: slashless twins in `vercel.json` `redirects` were tried on
   a preview deploy (PR #9) and do NOT help: Vercel's Next.js routes still
   apply the trailing-slash redirect first. The only remaining fix is
   `skipTrailingSlashRedirect` plus slash handling in a proxy, which would put
   a function in front of every request on an otherwise fully static site;
   not worth it, since search engines follow both 308s.

### Fixed in the September 24, 2026 audit pass

- Dentist JSON-LD: removed the self-serving `aggregateRating`; added `@id`,
  `image`, `geo`, and `sameAs`; `medicalSpecialty` is the schema.org
  `Dentistry` value; address and opening hours derive from `site` / `hours`.
  Service and orthodontics JSON-LD reference the Dentist by `@id`.
- Review figures on the testimonials page and its metadata derive from
  `reviewStats`; the contact meta description uses `site` phone and address.
- `/family-dentistry/` now 301s to `/cleanings-exams/` like the other
  aliases; aliases are no longer prerendered, the unreachable
  `/dental-blog/[slug]` route was removed (its legacy URL still redirects),
  and unknown slugs 404 via `dynamicParams = false`.
- Security headers in `next.config.ts` (production CSP, `X-Frame-Options`,
  `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader:
  false`) and `X-Robots-Tag: noindex` for every non-production host.
- Sitemap `lastModified` follows `siteLastUpdated` (2026-09-24).
- Testimonials topic cards use `h3` under their `h2` section.
- `vercel.json` installs with `npm ci`.
- Unused exports removed from `src/lib/site.ts`.
- The contact form survives blocked or full browser storage (`safeStorage`)
  and uses `method="post"` so a pre-hydration submit never puts contact
  details in a URL.
- GA automatic hits (e.g. `user_engagement`) now carry only the grouped
  location, fixed title, and empty referrer. The CSP allows GA4 (including
  `www.google.com/g/collect`) and Formspree; verified with zero violations
  against a production build served as `waikikidental.com`.
- `/request-appointment/` is static: Jarvis iframe plus office phone/email.
- Accessibility: visible two-tone focus outline on every control (≥3:1 on
  cream and navy, survives forced colors); per-field `aria-invalid` /
  `aria-describedby` and error/success focus management on the contact form;
  mobile menu closes on route change and at `lg`, makes the page inert while
  open; mega-menu Escape returns focus; labelled nav landmarks; new-tab cues;
  review filter `role="group"`.
- Mobile bar says **Request Appointment**; Fraunces italic is loaded (no faux
  italic); review topics read "58 mentions of “Dr. Mike”"; the navigation
  scroll manager no longer leaks its reset flag on query-only links.

## Highest-value future media upgrade

Capture a new 20–30 second horizontal office walkthrough showing arrival,
reception, a treatment room, and a natural team welcome. Obtain written website
and advertising usage approval from every recognizable person, retain the
original master outside the repo, and publish an optimized poster plus muted,
captioned web encodes rather than embedding a social-media player.
