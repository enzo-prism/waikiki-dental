"use client";

import { useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { site } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Appointment request from website");
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        "",
        form.message,
      ].join("\n"),
    );
    return `${site.emailHref}?subject=${subject}&body=${body}`;
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({
        kind: "error",
        message: "Please add your name, email, and message.",
      });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });

      if (res.ok) {
        setForm(initialState);
        setStatus({
          kind: "success",
          message: "Thanks! Your message is on its way — we'll be in touch shortly.",
        });
        return;
      }

      const data = (await res.json().catch(() => null)) as
        | { error?: string; code?: string }
        | null;

      // Backend not configured yet → fall back to the visitor's email app.
      if (res.status === 503 || data?.code === "unconfigured") {
        setStatus({
          kind: "success",
          message: "Opening your email app with the message ready to send.",
        });
        window.location.href = mailtoHref;
        return;
      }

      setStatus({
        kind: "error",
        message:
          data?.error ?? "We couldn't send your message. Please call or email the office.",
      });
    } catch {
      // Network failure — keep the visitor moving via email.
      setStatus({
        kind: "success",
        message: "Opening your email app with the message ready to send.",
      });
      window.location.href = mailtoHref;
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={submitForm}
      className="grid gap-4"
      aria-label="Contact Waikiki Dental"
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Name
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field"
            name="name"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="field"
            name="email"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Phone
        <input
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="field"
          name="phone"
          placeholder="(916) …"
          autoComplete="tel"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Message
        <textarea
          required
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="field min-h-32 resize-y"
          name="message"
          placeholder="How can the team help?"
        />
      </label>

      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            name="company"
          />
        </label>
      </div>

      <button className="btn btn-clay" type="submit" disabled={submitting}>
        {submitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {submitting ? "Sending…" : "Send Message"}
      </button>

      {status.kind === "success" ? (
        <p
          className="text-sm font-medium text-sage-700"
          role="status"
        >
          {status.message}
        </p>
      ) : null}
      {status.kind === "error" ? (
        <p className="text-sm font-medium text-clay-600" role="alert">
          {status.message}{" "}
          <a href={mailtoHref} className="underline underline-offset-2">
            Email us directly
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
