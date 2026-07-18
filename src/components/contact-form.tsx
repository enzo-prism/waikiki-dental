"use client";

import { useId, useState } from "react";
import { CheckCircle2, Mail, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
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

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [previewed, setPreviewed] = useState(false);
  const errorId = useId();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setPreviewed(false);
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please complete your name, email, and message.");
      return;
    }
    if (!form.consent) {
      setError("Please confirm that this message does not include sensitive information.");
      return;
    }
    setPreviewed(true);
  }

  if (previewed) {
    return (
      <div className="rounded-3xl border border-ocean-200 bg-ocean-50 p-6 text-center sm:p-8" role="status">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-ocean-600 text-cream">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-serif text-2xl text-ink">Your form looks ready.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
          Online delivery is being connected before launch, so this message has not been sent yet.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn btn-sunset btn-sm">
            <Phone className="size-4" aria-hidden="true" /> Call {site.phone}
          </a>
          <a href={site.emailHref} className="btn btn-outline btn-sm">
            <Mail className="size-4" aria-hidden="true" /> Email the office
          </a>
        </div>
        <button type="button" onClick={() => setPreviewed(false)} className="mt-5 text-sm font-semibold text-ocean-700 hover:underline">
          Edit message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submitForm} className="grid gap-5" aria-label="Contact Waikiki Dental">
      <div className="flex gap-3 rounded-2xl border border-ocean-100 bg-ocean-50/70 p-4">
        <MessageSquareText className="mt-0.5 size-5 shrink-0 text-ocean-700" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-ink">Send a general message</p>
          <p className="mt-0.5 text-xs leading-5 text-ink-muted">For urgent dental needs, please call the office.</p>
        </div>
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Full name" required>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="field" name="name" placeholder="Your name" autoComplete="name" />
        </FormField>
        <FormField label="Email" required>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="field" name="email" placeholder="you@email.com" autoComplete="email" />
        </FormField>
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Phone" hint="Optional">
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="field" name="phone" placeholder="(916) 555-0123" autoComplete="tel" />
        </FormField>
        <FormField label="What can we help with?">
          <select value={form.topic} onChange={(e) => update("topic", e.target.value)} className="field" name="topic">
            <option>General question</option>
            <option>New patient information</option>
            <option>Insurance or payment question</option>
            <option>Existing appointment</option>
            <option>Website feedback</option>
          </select>
        </FormField>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">How should we reply?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-full border border-line bg-background p-1">
          {(["email", "phone"] as const).map((method) => (
            <label key={method} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold capitalize transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ocean-300 ${form.replyBy === method ? "bg-ocean-600 text-cream" : "text-ink-muted"}`}>
              <input type="radio" name="replyBy" value={method} checked={form.replyBy === method} onChange={() => update("replyBy", method)} className="sr-only" />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <FormField label="Message" required hint="Please keep this general">
        <textarea required value={form.message} onChange={(e) => update("message", e.target.value)} className="field min-h-36 resize-y" name="message" placeholder="How can the Waikiki Dental team help?" />
      </FormField>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream p-4 text-sm leading-6 text-ink-muted">
        <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 size-4 shrink-0 accent-ocean-600" />
        <span><strong className="text-ink">Privacy check:</strong> I have not included medical history, insurance IDs, payment details, or other sensitive information.</span>
      </label>

      <div aria-hidden="true" className="hidden"><label>Company<input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} name="company" /></label></div>

      {error ? <p id={errorId} className="text-sm font-medium text-sunset-600" role="alert">{error}</p> : null}
      <button className="btn btn-sunset" type="submit" aria-describedby={error ? errorId : undefined}>
        <ShieldCheck className="size-4" aria-hidden="true" /> Review message
      </button>
      <p className="text-center text-xs leading-5 text-ink-soft">Online delivery will be connected before public launch.</p>
    </form>
  );
}

function FormField({ label, hint, required = false, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium text-ink"><span>{label}{required ? <span className="text-sunset-600"> *</span> : null}{hint ? <span className="ml-2 font-normal text-ink-soft">{hint}</span> : null}</span>{children}</label>;
}
