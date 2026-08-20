# Waikiki Dental

Modern Next.js site for Waikiki Dental — Dr. Michael Narodovich's family,
cosmetic, implant, and sedation practice in Roseville, CA.

## Stack

- Next.js App Router with statically generated marketing pages
- TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- lucide-react icons
- Custom accessible contact and appointment-request forms
- Vercel deployment

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No local env is required. Both forms post to `https://formspree.io/f/xeajvpnb`
via `src/lib/forms.ts`. `.env.example` documents
`NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` if you want a dedicated Formspree form
for contact messages.

## Checks

```bash
npm run lint
npm run build
```

> Run these on Node 24 (see `engines` in `package.json`) — they match the Vercel build.

## Current environments

- **Production:** [waikiki-dental.vercel.app](https://waikiki-dental.vercel.app/)
- **Source of truth:** the `main` branch in GitHub
- **Custom domain:** `waikikidental.com` is not connected to this deployment yet

## Content & configuration

`src/lib/site.ts` is the single source of truth for site content: practice
details, hours, the service catalog (grouped by category), the doctor bio &
credentials, testimonials/review stats, the new-patient offer, payment options,
the appointment-scheduler options, and image paths. Edit content there.

### Brand assets & imagery

The site uses the practice's real brand assets, sourced from the current
public waikikidental.com site and self-hosted in `public/media/`:

- `logo.png` — full-color hibiscus + "Waikiki DENTAL" wordmark. Cream surfaces
  only (`BrandLogo` in the header). Navy uses `WordmarkLockup` (SVG hibiscus +
  type), never this PNG.
- `hibiscus.png` — the flower alone (legacy asset; UI hibiscus is the SVG in
  `src/components/brand.tsx`)
- `dr-narodovich.jpg` — studio portrait (275×412). Keep frames near that size.
- `dr-narodovich-patient.jpg` — in-office candid (home hero, doctor page)
- `office-hero.jpg` — stock operatory placeholder. **Not rendered.** Replace
  with a real Roseville office photo before using it.

### Before the public custom-domain launch

1. **Verified reviews.** Set `reviewStats.count` (and confirm `reviewStats.href`)
   in `site.ts` to your real Google review count. It's intentionally `null` so
   no fabricated number ships.
2. **Form inbox verification.** Both forms are connected to Formspree; run the
   clinic-approved inbox delivery checklist in `docs/OPERATIONS.md`.

## Formspree integration

The guided appointment request is a 3-step Visit / When / Reach flow with a
custom weekday calendar, live summary, and hibiscus success state. It submits
JSON to the public Formspree endpoint `https://formspree.io/f/xeajvpnb`,
configured in `src/lib/forms.ts`. A successful HTTP response means Formspree
accepted the request for processing; it does not prove clinic inbox delivery or
mean an appointment has been confirmed. The office confirms the final date and
time by phone or text.

The scheduler validates required fields, prevents duplicate submissions, uses
Formspree's `_gotcha` honeypot, keeps a session draft until send, and preserves
entered data when a network or service error allows a retry.

The contact form (`src/components/contact-form.tsx`) submits to the same
Formspree form by default, labeled via `_subject`/`source` so the office can
tell contact messages from appointment requests. Set
`NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` to a dedicated Formspree form to
separate them. Never commit Formspree account tokens or private credentials.

Before the public custom-domain launch, use an approved synthetic request to
verify Formspree inbox receipt, intended office notification, Reply-To behavior,
phone-only requests, spam and domain controls, accessibility, and the
unavailable-service fallback. Keep both forms limited to non-sensitive
information unless the practice has explicitly approved a compliant
data-handling setup and vendor agreement.

See [Forms and release operations](docs/OPERATIONS.md) for payload details,
privacy boundaries, the delivery checklist, and the production release process.

## Conversion chrome

One coral verb. Do not add a third solid button.

- **Book Online** (coral) → Jarvis scheduler. Header at `lg+`, sticky mobile
  bar, navy homepage book card, interior `BookStrip`.
- **Call or text** (outline) → `tel:` the Roseville office.
- **Request an appointment** (text) → `/request-appointment/`.
- **Contact form** → Contact and office pages only. Homepage uses
  `VisitPanel showForm={false}`.

Skip-to-content, current-page underline, and a discreet Emergency link (xl+)
live in `src/components/site-chrome.tsx` and `src/components/site-nav.tsx`.

## Key features

- **Appointment scheduler** (`/request-appointment/`) — a guided 3-step request
  (Visit / When / Reach) with a weekday calendar, live summary, and modern
  choice cards (`src/components/appointment-scheduler.tsx`). Posts to Formspree.
  Inbox delivery remains pending a clinic-approved end-to-end test.
- **Contact form** — topic and reply chips, privacy confirmation, honeypot, and
  live Formspree delivery with honest success/error states.
- **SEO** — per-page metadata + canonicals, `Dentist` JSON-LD, `sitemap.ts`,
  `robots.ts`, trailing-slash URLs.
- **Design system** — "Pacific Premium" palette anchored to the real brand
  (royal Pacific blue `#0051ae` from the logo, hibiscus coral CTAs, porcelain
  canvas, navy dark sections, gold ratings), Fraunces + Manrope, the practice's
  real logo and photos, reduced-motion-aware scroll reveals, and a sticky
  mobile Book/Call bar.

## Deployment

Hosted on Vercel. `main` is the GitHub source of truth. **This repo is not
wired to Vercel Git integration** — `git push origin main` does not update
[waikiki-dental.vercel.app](https://waikiki-dental.vercel.app/). Production
requires an authenticated `vercel deploy --prod --yes` (or Vercel MCP deploy).
Do not attach `waikikidental.com` until the practice signs off.

```bash
npm ci
npm run lint
npm run build
git push origin main
npx vercel deploy --prod --yes
npx vercel inspect <deployment-url>
```

The release is complete only when `origin/main` is the intended commit, the
deployment reports `target: production` and `Ready`, and
`https://waikiki-dental.vercel.app/` is listed as an alias. Then confirm the
appointment page returns HTTP 200. Routine verification must not submit the
live Formspree form.

## Notes

The site preserves Waikiki Dental's public content facts: Roseville address,
phone, online booking link, doctor bio, service menu, new-patient info, hours,
and testimonials. The live `waikikidental.com` domain is not yet connected;
this deploy ships to a Vercel URL first (`site.baseUrl`).
