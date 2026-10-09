# Forms and release operations

This document separates the site's current production behavior from work that
is still pending. Keep those states explicit when changing forms or releasing
the site.

## Form delivery status

| Form | Current state | Delivery path |
| --- | --- | --- |
| Online booking | Live Jarvis embed on `/request-appointment/` | `https://schedule.jarvisanalytics.com` (CSP `frame-src`) |
| General contact | Live | Browser JSON `POST` to `https://formspree.io/f/xeajvpnb` (override with `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT`) |

The Formspree endpoint lives in `src/lib/forms.ts` as `FORMSPREE_ENDPOINT`.
Contact submissions use `subject: "Contact message — Waikiki Dental"` and
`form_type: "contact_message"`, plus a human-readable `message` banner. Set
`NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` to a dedicated Formspree form to
split contact from any leftover shared-inbox history.

`/request-appointment/` is the Jarvis scheduler plus office phone and email.
The retired on-site request form is gone. Coral **Request Appointment** CTAs
still route there.

## Contact form contract

The implementation is in `src/components/contact-form.tsx`. It sends
`subject`, `form_type` (`contact_message`), `source`, `topic`, `topic_key`,
`name`, optional `email`/`phone`, `reply_preference`, `privacy_check`, a
readable `message` that begins with `CONTACT MESSAGE`, the `_gotcha`
honeypot, and first-touch UTM / click-ID / `ad_id` fields. Topic and reply preference
are icon chips, not a select. The email or phone field becomes required to
match the visitor's chosen reply preference, and a privacy-check consent box
gates submission. A 429 gets a wait-and-retry message, other failures preserve
entered data, and success renders only after an HTTP success response.

## First-touch ad tags

The contact form stamps the first paid or tagged visit so later organic page
views do not overwrite it. The browser
keeps that record in `localStorage` (`wd_lead_attribution_v1`) for 90 days,
with `sessionStorage` fallback when durable storage is blocked. `ad_id` is
parsed from `utm_content` when that value is a bare numeric Meta `{{ad.id}}`
or a trailing numeric id after a creative prefix. Click IDs are copied from
the URL only; empty is correct for organic, call, or WhatsApp arrivals.

Do not invent review counts, click IDs, or ad identifiers in copy or
payloads.

## Privacy boundary

The contact form asks visitors not to include symptoms, medical history,
insurance IDs, payment details, or other sensitive information. Keep that
warning and the minimal-data payload unless the practice has explicitly
approved a compliant data-handling setup and vendor agreement.

Routine engineering verification must not submit the live contact form. A real
inbox delivery test creates an external message and must be deliberate, use
approved test data, and be coordinated with the clinic.

## Formspree operations checklist

Before treating inbox delivery as verified:

1. Confirm the `xeajvpnb` form is active in the correct Formspree account.
2. Confirm the intended clinic recipients and Reply-To behavior.
3. Enable the production-domain restriction and appropriate spam protection.
4. Send one clinic-approved test request with clearly synthetic, non-sensitive
   data, including a phone-only request case.
5. Verify the office notification, inbox copy, subject, Reply-To behavior, and
   duplicate/spam handling.
6. Record the result without storing the submitted contact details in this repo.

## Conversion chrome

Keep these paths intact when changing pages or CTAs. Coral is reserved for
**Request Appointment** → `/request-appointment/`. Do not add a third solid
button.

| Intent | Control | Surfaces |
| --- | --- | --- |
| Request a visit | Coral **Request Appointment** | Header (`lg+`), sticky mobile bar, navy homepage appointment card, `BookStrip` |
| Talk to the office | Outline **Call or text** | Hero (`lg+`), mobile bar, interiors |
| General question | Contact form | Contact and office pages only |

Homepage `VisitPanel` uses `showForm={false}`. Do not stack `BookStrip` on
home. PNG wordmark is cream-only; navy uses `WordmarkLockup`.

## Production topology

GitHub `main` is the source of truth. Production runs in Vercel project
`waikiki-dental-preview`, with `https://waikikidental.com/` as the public
canonical domain. Verify the Git-triggered production deployment after every
push; use an authenticated CLI deploy if it does not start:

```bash
npx vercel deploy --prod --yes
```

Cloud agents: authenticate the Vercel MCP server in Cursor, or put
`VERCEL_TOKEN` in Cloud Agent secrets (never in the repo).

## Production release

Requirements:

- Node 24, matching `package.json` and Vercel
- Authenticated Vercel CLI (`npx vercel whoami`) or authenticated Vercel MCP
- A reviewed worktree with unrelated files excluded from the commit

Run the relevant local checks, push the intended commit to `main`, then deploy
that checkout explicitly:

```bash
npm ci
npm test
npm run lint
npx tsc --noEmit
npm run build
git status -sb
git push origin main
npx vercel deploy --prod --yes
```

The release is complete only when all of the following are true:

1. `origin/main` points to the intended commit.
2. `npx vercel inspect <deployment-url>` reports `target: production` and
   `Ready`.
3. `https://waikikidental.com/` serves the intended deployment.
4. The homepage is the current Pacific design (navy appointment card, not a stacked
   contact form + coral closer) and `/request-appointment/` returns HTTP 200.
5. The production JavaScript contains `https://formspree.io/f/xeajvpnb` and the
   sent-state copy.

Do not describe a preview, successful local build, pushed commit, queued
build, or unverified alias as a completed production release. A GitHub push
alone is not a production release.

## Analytics and Search Console

Follow [`ANALYTICS-SEARCH.md`](ANALYTICS-SEARCH.md). Code readiness is not live
collection: verify the production GA script, the grouped `page_view` payload,
and then Realtime/API data. Vercel Web Analytics remains a separate paid feature
and must not be enabled without approval. Search Console is not complete until
the operating Google identity has verified access and the live sitemap can be
read back through the API.

## Current release baseline

As of September 23, 2026, the service-menu release (traditional crowns at
`/dental-crowns/`, dental bonding retired, feature commit `932e7ef`) is the
verified production baseline. The public-domain launch baseline was `6772636`
(September 1, 2026). For each release, record the exact deployed SHA in the task handoff
and repeat the production checks above; do not assume this baseline is current.
