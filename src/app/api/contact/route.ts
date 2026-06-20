/**
 * Contact form handler.
 *
 * Sends the message as an email via Resend's REST API (no extra dependency).
 * Configure these environment variables (e.g. `vercel env add`):
 *   RESEND_API_KEY      – Resend API key (server-only; never NEXT_PUBLIC_)
 *   CONTACT_TO_EMAIL    – where appointment requests should land
 *   CONTACT_FROM_EMAIL  – optional verified sender, e.g. "Waikiki Dental <hello@waikikidental.com>"
 *
 * Until those are set, the route returns 503 with code "unconfigured" so the
 * client can gracefully fall back to opening the visitor's email app.
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // honeypot
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if ((data.company ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Please add your name, email, and message." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Waikiki Dental Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return Response.json(
      {
        ok: false,
        code: "unconfigured",
        error: "Online messaging isn't set up yet.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New website message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      return Response.json(
        {
          ok: false,
          error: "We couldn't send your message. Please call or email the office.",
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        ok: false,
        error: "We couldn't send your message. Please call or email the office.",
      },
      { status: 502 },
    );
  }
}
