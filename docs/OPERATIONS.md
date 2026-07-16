# Forms and release operations

This document separates the site's current production behavior from work that
is still pending. Keep those states explicit when changing forms or releasing
the site.

## Form delivery status

| Form | Current state | Delivery path |
| --- | --- | --- |
| Appointment request | Deployed; inbox delivery unverified | Browser JSON `POST` to `https://formspree.io/f/xojgjoqa` |
| General contact | Frontend review only | No request is sent; visitors are directed to call or email |

An appointment request is not a confirmed appointment. The success screen only
says the request was sent and explains that the office will confirm the final
date and time by phone or text.

## Appointment request contract

The implementation is in
`src/components/appointment-scheduler.tsx`. It sends these fields:

- `subject` and `source`
- `appointment_reason` and `patient_type`
- `preferred_date` and `preferred_time`
- `name`, `phone`, and optional `email`
- `notes` and a readable `message` summary
- `_gotcha`, Formspree's honeypot field

The client sends `Accept: application/json` and `Content-Type:
application/json`. It shows success only after an HTTP success response. That
proves Formspree accepted the request for processing, not that the clinic inbox
received it. A 429 response gets a wait-and-retry message; other service and
network failures keep the entered data available for another attempt. A
synchronous ref guard and the disabled sending state prevent duplicate
requests.

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

1. Confirm the `xojgjoqa` form is active in the correct Formspree account.
2. Confirm the intended clinic recipients and Reply-To behavior.
3. Enable the production-domain restriction and appropriate spam protection.
4. Send one clinic-approved test request with clearly synthetic, non-sensitive
   data, including a phone-only request case.
5. Verify the office notification, inbox copy, subject, Reply-To behavior, and
   duplicate/spam handling.
6. Record the result without storing the submitted contact details in this repo.

## Production release

Requirements:

- Node 24, matching `package.json` and Vercel
- Authenticated GitHub CLI and Vercel CLI
- A reviewed worktree with unrelated files excluded from the commit

Run the relevant local checks, push the intended commit to `main`, then deploy
that checkout explicitly:

```bash
npm ci
npm run lint
npm run build
git status -sb
git push origin main
vercel deploy --prod --yes
```

The release is complete only when all of the following are true:

1. `origin/main` points to the intended commit.
2. `vercel inspect <deployment-url>` reports `target: production` and `Ready`.
3. `https://waikiki-dental.vercel.app/` is listed as an alias.
4. The appointment page returns HTTP 200.
5. The production JavaScript contains `https://formspree.io/f/xojgjoqa` and the
   sent-state copy.

Do not describe a preview, successful local build, pushed commit, queued build,
or unverified alias as a completed production release.
