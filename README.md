# Waikiki Dental

Modern Next.js site for Waikiki Dental — Dr. Michael Narodovich's family,
cosmetic, implant, and sedation practice in Roseville, CA.

## Stack

- Next.js App Router (statically generated marketing pages + a couple of API routes)
- TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- lucide-react icons
- Resend for transactional email (contact + appointment requests)
- Vercel deployment

## Local development

```bash
npm install
cp .env.example .env.local   # optional — forms work without it (email fallback)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

> Run these on Node 24 (see `engines` in `package.json`) — they match the Vercel build.

## Content & configuration

`src/lib/site.ts` is the single source of truth for site content: practice
details, hours, the service catalog (grouped by category), the doctor bio &
credentials, testimonials/review stats, the new-patient offer, payment options,
the appointment-scheduler options, and image paths. Edit content there.

### Before launch — replace the placeholders

1. **Real photos.** Imagery is self-hosted in `public/media/` as tasteful
   placeholders. Swap each file (same name) with real Roseville office/team
   photos. For the dentist, add a headshot and set `doctorPortrait` in
   `site.ts` — until then the UI shows a branded monogram instead of a stock
   face.
2. **Verified reviews.** Set `reviewStats.count` (and confirm `reviewStats.href`)
   in `site.ts` to your real Google review count. It's intentionally `null` so
   no fabricated number ships.
3. **Form delivery.** Add the environment variables below so the contact form
   and scheduler send email (otherwise they fall back to the visitor's email app).

## Environment variables

See `.env.example`. Powers `/api/contact` and `/api/schedule`:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (server-only) |
| `CONTACT_TO_EMAIL` | Inbox for messages & appointment requests |
| `CONTACT_FROM_EMAIL` | Optional verified sender |

Set them locally in `.env.local`, or for deployments via the Vercel dashboard /
`vercel env add`.

## Key features

- **Appointment scheduler** (`/request-appointment/`) — a guided, accessible,
  mobile-first multi-step request form (`src/components/appointment-scheduler.tsx`).
  Backend posts to `/api/schedule`; swap the email send for a real scheduling
  integration (e.g. Dentrix Ascend) when ready.
- **Contact form** — posts to `/api/contact`, with loading/success/error states
  and an email fallback.
- **SEO** — per-page metadata + canonicals, `Dentist` JSON-LD, `sitemap.ts`,
  `robots.ts`, trailing-slash URLs.
- **Design system** — warm "Editorial Spa-Luxe" palette (sage = brand,
  clay = primary action, gold = ratings), Fraunces + Manrope, custom logomark,
  reduced-motion-aware scroll reveals, and a sticky mobile Book/Call bar.

## Deployment

Hosted on Vercel. Pushing to `main` triggers a production deployment via the
Vercel Git integration. `next build` runs type-checking and linting; a failed
build is not promoted, so production stays on the last good deploy.

## Notes

The site preserves Waikiki Dental's public content facts: Roseville address,
phone, Dentrix booking link, doctor bio, service menu, new-patient info, hours,
and testimonials. The live `waikikidental.com` domain is not yet connected;
this deploy ships to a Vercel URL first (`site.baseUrl`).
