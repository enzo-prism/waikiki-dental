<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Waikiki Dental

Marketing site for Dr. Michael Narodovich's Waikiki Dental practice (Roseville, CA). Next.js 16 App Router, React 19, Tailwind v4, npm, Node 24.

This site is live at https://waikikidental.com/ in Vercel project `waikiki-dental-preview`.

Sibling practice site: `enzo-prism/sacramento-dental-medicine-redesign`. Do not mix copy, phone numbers, hours, or brand tokens between the two.

## Source of truth

- Content, hours, services, doctor bio, CTAs: `src/lib/site.ts`
- Design tokens: `src/app/globals.css`
- Header / footer / mobile Request+Call bar: `src/components/site-chrome.tsx`
- Desktop mega-menu, current-page state, mobile sheet: `src/components/site-nav.tsx`
- Wordmark, hibiscus mark, doctor portrait: `src/components/brand.tsx`
- Appointment form: `src/components/appointment-scheduler.tsx` (Formspree)
- Contact form: `src/components/contact-form.tsx`
- Shared Formspree client / endpoint: `src/lib/forms.ts` (`xeajvpnb`)
- First-touch UTM / click ID / `ad_id`: `src/lib/lead-attribution.ts`
- Form options and privacy copy: `src/lib/site.ts`
- Operations / launch checklist: `docs/OPERATIONS.md`

Service menu (confirmed by the practice in the 2026-09-23 sync): dental bonding is NOT offered, and crowns are traditional two-visit crowns only (`/dental-crowns/`). Never advertise same-day/CEREC crowns or restore bonding. Their old URLs redirect (`next.config.ts`).

Do not invent Google review counts, credentials, insurance lists, or before/after results. `reviewStats` holds Google figures verified on the date in `verifiedOn`; re-verify on the live listing before changing any number.

Scheduling (also in `AGENTS.local.md`): every appointment CTA stays on-site at `/request-appointment/`. No Jarvis or other third-party booking links. It is an appointment request; the office confirms the time by phone or text.

## Conversion chrome

Keep one coral verb. Do not add a third solid CTA.

| Intent | Control | Where it lives |
| --- | --- | --- |
| Request a visit | Coral **Request Appointment** → `/request-appointment/` | Header (`lg+`), sticky mobile bar, navy homepage appointment card, interior `BookStrip` |
| Talk to the office | Outline **Call or text** | Hero (`lg+`), mobile bar, interiors |
| General question | Contact form | Contact and office pages only — not the homepage |

Homepage `VisitPanel` must use `showForm={false}` (navy appointment card). Do not stack `BookStrip` on home; the mobile bar already covers Request/Call below `lg`. PNG wordmark (`BrandLogo`) is cream-only; navy surfaces use `WordmarkLockup`.

## Imagery

Every image is either real photography of this practice (Dr. Mike's portrait, the team, the office) or original abstract art. Never add AI-generated or stock people, patients, or treatment rooms. The "Tide" artwork (homepage hero, IV sedation hero, share card) is rendered by `scripts/generate-abstract-art.py` into `public/media/art/` and `public/social/`; play loops only through `AmbientVideo`, which keeps the poster for reduced-motion/data-saver visitors and a visible pause button. Provenance: `docs/MEDIA-PROVENANCE.md`.

## Commands

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

No local env is required to run the site. `.env.example` documents
`NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` for an optional dedicated contact form.

## Cursor Cloud specific instructions

- Install is `npm ci`. Dev server is already started in the `dev` terminal on port 3000.
- After UI or content changes, run `npm run lint` and `npm run build`. Open http://localhost:3000 and click through Home, Services, Doctor, and Request Appointment.
- Do **not** submit the live Formspree appointment form from cloud unless the user explicitly asks for a clinic-approved test. Verify the page loads and client validation works instead.
- Preserve `waikikidental.com` as the canonical production domain and verify it after every release.
- Positioning: IV sedation and higher-ticket care, not general-dentistry volume. Do not add “new patient specials” or high-volume SEO copy that fights that brief.
- Secrets belong in the Cloud Agents dashboard, not committed `.env` files. Form IDs in `NEXT_PUBLIC_*` are public; never commit Formspree account tokens.
- Verify the Git-triggered production deployment after each `main` push. If it does not start, use `npx vercel deploy --prod --yes` from an authenticated CLI. `VERCEL_TOKEN` (if used) belongs in Cloud Agent secrets, not the repo. Confirm `target: production`, `Ready`, and the public `https://waikikidental.com/` readback before calling a release complete.
