/**
 * Appointment-request handler (the on-site scheduler).
 *
 * Sends the request as an email via Resend's REST API, reusing the same
 * environment variables as the contact form:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 *
 * Until those are set it returns 503 with code "unconfigured" so the client
 * can fall back to the visitor's email app. Swap the email send for a real
 * scheduling integration (e.g. Dentrix Ascend API) when ready.
 */

type Payload = {
  reason?: string;
  patientType?: string;
  flexible?: boolean;
  date?: string;
  timeOfDay?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
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

  if ((data.company ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const email = (data.email ?? "").trim();

  if (!name || !phone) {
    return Response.json(
      { ok: false, error: "Please include your name and a phone number." },
      { status: 422 },
    );
  }
  if (email && !isEmail(email)) {
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
        error: "Online scheduling isn't set up yet.",
      },
      { status: 503 },
    );
  }

  const preferredDate = data.flexible
    ? "Soonest available"
    : (data.date ?? "").trim() || "Not specified";

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
        reply_to: email || undefined,
        subject: `Appointment request — ${name}`,
        text: [
          `Reason: ${data.reason ?? "Not specified"}`,
          `Patient: ${data.patientType === "new" ? "New patient" : "Returning patient"}`,
          `Preferred date: ${preferredDate}`,
          `Time of day: ${data.timeOfDay ?? "Any time"}`,
          "",
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email || "Not provided"}`,
          "",
          `Notes: ${(data.notes ?? "").trim() || "—"}`,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      return Response.json(
        {
          ok: false,
          error: "We couldn't send your request. Please call or email the office.",
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        ok: false,
        error: "We couldn't send your request. Please call or email the office.",
      },
      { status: 502 },
    );
  }
}
