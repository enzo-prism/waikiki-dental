# Forms and release operations

This document separates the site's current production behavior from work that
is still pending. Keep those states explicit when changing forms or releasing
the site.

## Form delivery status

| Form | Current state | Delivery path |
| --- | --- | --- |
| Appointment request | Deployed; inbox delivery unverified | Browser JSON `POST` to `https://formspree.io/f/xeajvpnb` |
| General contact | Deployed; shares the appointment form's endpoint | Browser JSON `POST` to `https://formspree.io/f/xeajvpnb` (override with `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT`) |

The shared endpoint lives in `src/lib/forms.ts` as `FORMSPREE_ENDPOINT`.
Contact submissions use `_subject: "Contact message — Waikiki Dental"` and
`form_type: "contact_message"`. Appointment requests use `_subject:
"Appointment request — Waikiki Dental"` and `form_type: "appointment_request"`.
Both also send a human-readable `message` banner so the office can tell them
apart in a shared inbox. To split them into separate Formspree forms later,
create a new form and set `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` in the
Vercel project.

An appointment request is not a confirmed appointment. The success screen only
says the request was sent and explains that the office will confirm the final
date and time by phone or text.

## Appointment request contract

The implementation is a 3-step flow (Visit / When / Reach) in
`src/components/appointment-scheduler.tsx`, with copy and options in
`src/lib/site.ts`. A live summary sits beside the form on desktop and in a
compact strip on mobile. There is no review step. Preferred dates use a custom
weekday calendar (weekends and past days disabled) or **Soonest available**.
`/request-appointment/?reason=sedation` (or another reason key) prefills the
visit reason. A draft is stored in `sessionStorage` under `wd-appt-request-v1`
until a successful send.

It sends these fields:

- `_subject` and `form_type` (`appointment_request`)
- `source`
- `patient_type`, `appointment_reason`, `appointment_reason_key`
- `preferred_date`, `preferred_date_label`, `preferred_time`
- `name`, `phone`, and optional `email`
- `notes` and a readable `message` summary that begins with
  `APPOINTMENT REQUEST (not confirmed)`
- `_gotcha`, Formspree's honeypot field

The client sends `Accept: application/json` and `Content-Type:
application/json`. It shows success only after an HTTP success response. That
proves Formspree accepted the request for processing, not that the clinic inbox
received it. A 429 response gets a wait-and-retry message; other service and
network failures keep the entered data available for another attempt. A
synchronous ref guard and the disabled sending state prevent duplicate
requests. Continue / Send uses the ocean primary button. Coral stays reserved
for the site-native appointment CTA.

## Contact form contract

The implementation is in `src/components/contact-form.tsx`. It sends
`_subject`, `form_type` (`contact_message`), `source`, `topic`, `topic_key`,
`name`, optional `email`/`phone`, `reply_preference`, `privacy_check`, a
readable `message` that begins with `CONTACT MESSAGE`, and the `_gotcha`
honeypot. Topic and reply preference are icon chips, not a select. The email
or phone field becomes required to match the visitor's chosen reply
preference, and a privacy-check consent box gates submission. Error handling
mirrors the appointment form: 429 gets a wait-and-retry message, other
failures preserve entered data, and success renders only after an HTTP
success response.

## Privacy boundary

The appointment form asks visitors not to include symptoms, medical history,
insurance IDs, payment details, or other sensitive information. Keep that
warning and the minimal-data payload unless the practice has explicitly
approved a compliant data-handling setup and vendor agreement.

Routine engineering verification must not submit the live form. A real inbox
delivery test creates an external message and must be deliberate, use approved
test data, and be coordinated with the clinic.

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

Keep these paths intact when changing pages or CTAs. Coral is reserved for the
site-native appointment form. Do not add a third solid button.

| Intent | Control | Surfaces |
| --- | --- | --- |
| Request a visit | Coral **Request Appointment** | Header (`lg+`), sticky mobile bar, navy homepage appointment card, `BookStrip` |
| Talk to the office | Outline **Call or text** | Hero (`lg+`), mobile bar, interiors |
| General question | Contact form | Contact and office pages only |

Homepage `VisitPanel` uses `showForm={false}`. Do not stack `BookStrip` on
home. PNG wordmark is cream-only; navy uses `WordmarkLockup`.

## Production topology

GitHub `main` is the source of truth. **Vercel Git integration is not
connected to this repository.** `git push origin main` does not update
https://waikiki-dental.vercel.app/. Production requires an authenticated
CLI or MCP deploy:

```bash
npx vercel deploy --prod --yes
```

Cloud agents: authenticate the Vercel MCP server in Cursor, or put
`VERCEL_TOKEN` in Cloud Agent secrets (never in the repo). Do not attach
`waikikidental.com`.

Connecting the GitHub repo in the Vercel project would make `main` pushes
create production deployments automatically. Until that is done, treat every
release as an explicit `vercel deploy --prod`.

## Production release

Requirements:

- Node 24, matching `package.json` and Vercel
- Authenticated Vercel CLI (`npx vercel whoami`) or authenticated Vercel MCP
- A reviewed worktree with unrelated files excluded from the commit

Run the relevant local checks, push the intended commit to `main`, then deploy
that checkout explicitly:

```bash
npm ci
npm run lint
npm run build
git status -sb
git push origin main
npx vercel deploy --prod --yes
```

The release is complete only when all of the following are true:

1. `origin/main` points to the intended commit.
2. `npx vercel inspect <deployment-url>` reports `target: production` and
   `Ready`.
3. `https://waikiki-dental.vercel.app/` is listed as an alias.
4. The homepage is the current Pacific design (navy appointment card, not a stacked
   contact form + coral closer) and `/request-appointment/` returns HTTP 200.
5. The production JavaScript contains `https://formspree.io/f/xeajvpnb` and the
   sent-state copy.

Do not describe a preview, successful local build, pushed commit, queued
build, or unverified alias as a completed production release. A GitHub push
alone is not a production release.
