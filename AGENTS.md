<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Waikiki Dental

Marketing site for Dr. Michael Narodovich's Waikiki Dental practice (Roseville, CA). Next.js 16 App Router, React 19, Tailwind v4, npm, Node 24.

This is a **new site** (not live on `waikikidental.com` yet). Production preview: https://waikiki-dental.vercel.app/

Sibling practice site: `enzo-prism/sacramento-dental-medicine-redesign`. Do not mix copy, phone numbers, hours, or brand tokens between the two.

## Source of truth

- Content, hours, services, doctor bio, CTAs: `src/lib/site.ts`
- Design tokens: `src/app/globals.css`
- Appointment form: `src/components/appointment-scheduler.tsx` (Formspree)
- Contact form: `src/components/contact-form.tsx`
- Operations / launch checklist: `docs/OPERATIONS.md`

Do not invent Google review counts, credentials, insurance lists, or before/after results. `reviewStats.count` is `null` on purpose until a real count is confirmed.

## Commands

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

No local env is required to run the site. `.env.example` only reserves `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT`.

## Cursor Cloud specific instructions

- Install is `npm ci`. Dev server is already started in the `dev` terminal on port 3000.
- After UI or content changes, run `npm run lint` and `npm run build`. Open http://localhost:3000 and click through Home, Services, Doctor, and Request Appointment.
- Do **not** submit the live Formspree appointment form from cloud unless the user explicitly asks for a clinic-approved test. Verify the page loads and client validation works instead.
- Do not attach or cut over `waikikidental.com`. Preview URL only until the practice signs off.
- Positioning: IV sedation and higher-ticket care, not general-dentistry volume. Do not add “new patient specials” or high-volume SEO copy that fights that brief.
- Secrets belong in the Cloud Agents dashboard, not committed `.env` files. Form IDs in `NEXT_PUBLIC_*` are public; never commit Formspree account tokens.
