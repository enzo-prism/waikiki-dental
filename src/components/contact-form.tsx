"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState("");

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

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please add your name, email, and message.");
      return;
    }

    setStatus("Opening your email app with the message ready to send.");
    window.location.href = mailtoHref;
  }

  return (
    <form
      onSubmit={submitForm}
      className="grid gap-4"
      aria-label="Contact Waikiki Dental"
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Name
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            name="name"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            name="email"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-800">
        Phone
        <input
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          name="phone"
          autoComplete="tel"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-800">
        Message
        <textarea
          required
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-32 resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          name="message"
        />
      </label>
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-100">
        <Send className="size-4" aria-hidden="true" />
        Prepare Message
      </button>
      {status ? (
        <p className="text-sm font-medium text-slate-600" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
