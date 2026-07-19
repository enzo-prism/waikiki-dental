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
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The current app does not require local environment variables. `.env.example`
reserves a future contact-form setting, but that variable is not consumed yet.

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

- `logo.png` — the real hibiscus + "Waikiki DENTAL" wordmark (header, footer)
- `hibiscus.png` — the flower alone (favicon/app icons, accents)
- `dr-narodovich.jpg` — Dr. Narodovich's real headshot (doctor page, avatar)
- `dr-narodovich-patient.jpg` — real in-office photo of Dr. Narodovich with a
  patient (home hero, doctor spotlight)
- `office-hero.jpg` — a tasteful treatment-room placeholder; swap with a real
  Roseville office photo when available (same filename)

### Before the public custom-domain launch

1. **Verified reviews.** Set `reviewStats.count` (and confirm `reviewStats.href`)
   in `site.ts` to your real Google review count. It's intentionally `null` so
   no fabricated number ships.
2. **Form inbox verification.** Both forms are connected to Formspree; run the
   clinic-approved inbox delivery checklist in `docs/OPERATIONS.md`.

## Formspree integration

The guided appointment request is configured and deployed to submit JSON to the
public Formspree endpoint `https://formspree.io/f/xojgjoqa`, configured in
`src/components/appointment-scheduler.tsx`. A successful HTTP response means
Formspree accepted the request for processing; it does not prove clinic inbox
delivery or mean an appointment has been confirmed. The office confirms the
final date and time by phone or text.

The scheduler validates required fields, prevents duplicate submissions, uses
Formspree's `_gotcha` honeypot, disables navigation while sending, and preserves
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

## Key features

- **Appointment scheduler** (`/request-appointment/`) — a guided, accessible,
  mobile-first multi-step request form (`src/components/appointment-scheduler.tsx`)
  that is deployed to post appointment requests to Formspree. Inbox delivery
  remains pending a clinic-approved end-to-end test.
- **Contact form** — custom topic, reply preference, privacy confirmation,
  honeypot, and live Formspree delivery with honest success/error states.
- **SEO** — per-page metadata + canonicals, `Dentist` JSON-LD, `sitemap.ts`,
  `robots.ts`, trailing-slash URLs.
- **Design system** — "Pacific Premium" palette anchored to the real brand
  (royal Pacific blue `#0051ae` from the logo, hibiscus coral CTAs, porcelain
  canvas, navy dark sections, gold ratings), Fraunces + Manrope, the practice's
  real logo and photos, reduced-motion-aware scroll reveals, and a sticky
  mobile Book/Call bar.

## Deployment

Hosted on Vercel. `main` is the repository source of truth, but a push is not
treated as a completed release until an explicit production deployment is
`Ready` and the public alias has been verified.

```bash
npm run lint
npm run build
git push origin main
vercel deploy --prod --yes
vercel inspect <deployment-url>
```

After deployment, verify that
`https://waikiki-dental.vercel.app/request-appointment/` returns HTTP 200 and
that the production bundle contains the configured Formspree endpoint. Routine
release verification must not create a real appointment request; inbox delivery
testing requires a deliberate, clinic-approved test submission.

## Notes

The site preserves Waikiki Dental's public content facts: Roseville address,
phone, online booking link, doctor bio, service menu, new-patient info, hours,
and testimonials. The live `waikikidental.com` domain is not yet connected;
this deploy ships to a Vercel URL first (`site.baseUrl`).
