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
cp .env.example .env.local   # optional until Formspree is connected
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
3. **Form delivery.** Connect the two finished frontend forms to Formspree and
   test delivery before launch. They intentionally do not claim to send while
   no endpoint is configured.

## Formspree integration (required before launch)

The contact form and guided appointment request are frontend-only today. Create
separate Formspree forms, then connect their public endpoints with environment
variables such as `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` and
`NEXT_PUBLIC_FORMSPREE_APPOINTMENT_ENDPOINT`. Never commit Formspree account
tokens or private credentials.

Until that work is complete, both forms provide an honest review state and
direct visitors to call or email; they never report that an online submission
was delivered.

Before launch, test successful delivery, validation errors, spam protection,
reply routing, accessibility, and the unavailable-service fallback. Keep both
forms limited to non-sensitive information unless the practice has explicitly
approved a compliant data-handling setup and vendor agreement.

## Key features

- **Appointment scheduler** (`/request-appointment/`) — a guided, accessible,
  mobile-first multi-step request form (`src/components/appointment-scheduler.tsx`).
  Frontend-only today and ready for a Formspree endpoint.
- **Contact form** — custom topic, reply preference, privacy confirmation, and
  an honest pre-delivery review state.
- **SEO** — per-page metadata + canonicals, `Dentist` JSON-LD, `sitemap.ts`,
  `robots.ts`, trailing-slash URLs.
- **Design system** — warm "Editorial Spa-Luxe" palette (sage = brand,
  clay = primary action, gold = ratings), Fraunces + Manrope, custom logomark,
  reduced-motion-aware scroll reveals, and a sticky mobile Book/Call bar.

## Deployment

Hosted on Vercel. The repository is intended to deploy from `main` through the
Vercel Git integration. Run both `npm run lint` and `npm run build` before
publishing, then verify the resulting production deployment and public URL.

## Notes

The site preserves Waikiki Dental's public content facts: Roseville address,
phone, online booking link, doctor bio, service menu, new-patient info, hours,
and testimonials. The live `waikikidental.com` domain is not yet connected;
this deploy ships to a Vercel URL first (`site.baseUrl`).
