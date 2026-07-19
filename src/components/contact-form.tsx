"use client";

import { useId, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";
import { site } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  replyBy: "email" | "phone";
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "General question",
  replyBy: "email",
  message: "",
  consent: false,
};

/**
 * Formspree endpoint for the contact form. Shares the practice's form
 * with the appointment scheduler by default (submissions are labeled by
 * `_subject`/`source`); override with a dedicated form via
 * NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT when one exists.
 */
const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT ??
  "https://formspree.io/f/xojgjoqa";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [company, setCompany] = useState(""); // Formspree honeypot
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const errorId = useId();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    if (!form.name.trim() || !form.message.trim()) {
      setError("Please complete your name and message.");
      return;
    }
    if (form.replyBy === "email" && !form.email.trim()) {
      setError("Please add your email, or switch the reply preference to phone.");
      return;
    }
    if (form.replyBy === "phone" && !form.phone.trim()) {
      setError("Please add your phone number, or switch the reply preference to email.");
      return;
    }
    if (!form.consent) {
      setError(
        "Please confirm that this message does not include sensitive information.",
      );
      return;
    }

    // Quietly accept honeypot submissions without sending them to Formspree.
    if (company.trim()) {
      setStatus("sent");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: "New contact message — Waikiki Dental website",
          source: "Waikiki Dental contact form",
          topic: form.topic,
          name: form.name.trim(),
          ...(form.email.trim() ? { email: form.email.trim() } : {}),
          ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
          reply_preference: form.replyBy === "email" ? "Email" : "Phone",
          message: [
            `Topic: ${form.topic}`,
            `Name: ${form.name.trim()}`,
            `Email: ${form.email.trim() || "Not provided"}`,
            `Phone: ${form.phone.trim() || "Not provided"}`,
            `Preferred reply: ${form.replyBy === "email" ? "Email" : "Phone"}`,
            "",
            form.message.trim(),
          ].join("\n"),
          _gotcha: company,
        }),
      });

      if (!response.ok) {
        setStatus("idle");
        setError(
          response.status === 429
            ? "Too many messages were sent just now. Please wait a moment and try again, or call the office."
            : "We couldn't send your message. Please try again, or call or email the office directly.",
        );
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("idle");
      setError(
        "We couldn't send your message. Check your connection and try again, or call the office.",
      );
    }
  }

  function reset() {
    setForm(initialState);
    setCompany("");
    setError("");
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-3xl border border-ocean-200 bg-ocean-50 p-6 text-center sm:p-8"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-ocean-600 text-cream">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-serif text-2xl text-ink">
          Your message was sent.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
          Thanks, {form.name.trim() || "friend"} — the Waikiki Dental team will
          reply by {form.replyBy === "email" ? "email" : "phone"} during office
          hours. For anything urgent, please call.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn btn-sunset btn-sm">
            <Phone className="size-4" aria-hidden="true" /> Call {site.phone}
          </a>
          <a href={site.emailHref} className="btn btn-outline btn-sm">
            <Mail className="size-4" aria-hidden="true" /> Email the office
          </a>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-5 text-sm font-semibold text-ocean-700 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitForm}
      className="grid gap-5"
      aria-label="Contact Waikiki Dental"
      aria-busy={status === "submitting"}
      noValidate
    >
      <div className="flex gap-3 rounded-2xl border border-ocean-100 bg-ocean-50/70 p-4">
        <MessageSquareText
          className="mt-0.5 size-5 shrink-0 text-ocean-700"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold text-ink">Send a general message</p>
          <p className="mt-0.5 text-xs leading-5 text-ink-muted">
            For urgent dental needs, please call the office.
          </p>
        </div>
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Full name" required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="field"
            name="name"
            placeholder="Your name"
            autoComplete="name"
          />
        </FormField>
        <FormField label="Email" hint={form.replyBy === "email" ? undefined : "Optional"} required={form.replyBy === "email"}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="field"
            name="email"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </FormField>
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Phone" hint={form.replyBy === "phone" ? undefined : "Optional"} required={form.replyBy === "phone"}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="field"
            name="phone"
            placeholder="(916) 555-0123"
            autoComplete="tel"
          />
        </FormField>
        <FormField label="What can we help with?">
          <select
            value={form.topic}
            onChange={(e) => update("topic", e.target.value)}
            className="field"
            name="topic"
          >
            <option>General question</option>
            <option>New patient information</option>
            <option>Insurance or payment question</option>
            <option>Existing appointment</option>
            <option>Website feedback</option>
          </select>
        </FormField>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          How should we reply?
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-full border border-line bg-background p-1">
          {(["email", "phone"] as const).map((method) => (
            <label
              key={method}
              className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold capitalize transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ocean-300 ${
                form.replyBy === method
                  ? "bg-ocean-600 text-cream"
                  : "text-ink-muted"
              }`}
            >
              <input
                type="radio"
                name="replyBy"
                value={method}
                checked={form.replyBy === method}
                onChange={() => update("replyBy", method)}
                className="sr-only"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <FormField label="Message" required hint="Please keep this general">
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="field min-h-36 resize-y"
          name="message"
          placeholder="How can the Waikiki Dental team help?"
        />
      </FormField>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream p-4 text-sm leading-6 text-ink-muted">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-ocean-600"
        />
        <span>
          <strong className="text-ink">Privacy check:</strong> I have not
          included medical history, insurance IDs, payment details, or other
          sensitive information.
        </span>
      </label>

      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            name="_gotcha"
          />
        </label>
      </div>

      {error ? (
        <p
          id={errorId}
          className="text-sm font-medium text-sunset-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        className="btn btn-sunset"
        type="submit"
        disabled={status === "submitting"}
        aria-describedby={error ? errorId : undefined}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" /> Send message
          </>
        )}
      </button>
      <p className="text-center text-xs leading-5 text-ink-soft">
        The team replies during office hours — usually within one business day.
      </p>
    </form>
  );
}

function FormField({
  label,
  hint,
  required = false,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      <span>
        {label}
        {required ? <span className="text-sunset-600"> *</span> : null}
        {hint ? (
          <span className="ml-2 font-normal text-ink-soft">{hint}</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
