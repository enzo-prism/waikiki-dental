"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Pencil,
  Phone,
} from "lucide-react";
import { appointmentReasons, site, timeWindows } from "@/lib/site";

type FormData = {
  reason: string;
  patientType: "new" | "returning" | "";
  flexible: boolean;
  date: string;
  timeOfDay: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const initialData: FormData = {
  reason: "",
  patientType: "",
  flexible: false,
  date: "",
  timeOfDay: "any",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const STEPS = [
  {
    key: "reason",
    label: "Visit",
    title: "What can we help with?",
    subtitle: "Choose the reason for your visit.",
  },
  {
    key: "timing",
    label: "Timing",
    title: "When works for you?",
    subtitle: "Pick a day and time — we'll confirm the exact slot.",
  },
  {
    key: "details",
    label: "Details",
    title: "How can we reach you?",
    subtitle: "We'll confirm your appointment by phone or text.",
  },
  {
    key: "review",
    label: "Review",
    title: "Review your request",
    subtitle: "Make sure everything looks right, then send it over.",
  },
] as const;

const STORAGE_KEY = "wd-appointment-v1";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function AppointmentScheduler() {
  const [form, setForm] = useState<FormData>(initialData);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [result, setResult] = useState<"sent" | "email">("sent");
  const [today, setToday] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [hydrated, setHydrated] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorId = useId();

  // Restore in-progress requests + set the date floor on the client only.
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setForm({ ...initialData, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form, hydrated]);

  // Move focus to the step heading on each step change for screen readers.
  useEffect(() => {
    if (status === "idle") headingRef.current?.focus();
  }, [step, status]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  const reasonLabel = appointmentReasons.find((r) => r.key === form.reason)?.label;
  const timingLabel = form.flexible
    ? "Soonest available"
    : form.date
      ? new Date(`${form.date}T00:00:00`).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : "—";
  const timeWindowLabel =
    timeWindows.find((t) => t.key === form.timeOfDay)?.label ?? "Any time";

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Appointment request from website");
    const body = encodeURIComponent(
      [
        `Reason: ${reasonLabel ?? form.reason}`,
        `Patient: ${form.patientType === "new" ? "New patient" : "Returning patient"}`,
        `Preferred date: ${form.flexible ? "Soonest available" : form.date || "Not specified"}`,
        `Time of day: ${timeWindowLabel}`,
        "",
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email || "Not provided"}`,
        "",
        `Notes: ${form.notes || "—"}`,
      ].join("\n"),
    );
    return `${site.emailHref}?subject=${subject}&body=${body}`;
  }, [form, reasonLabel, timeWindowLabel]);

  function validate(target: number): string {
    if (target === 0) {
      return form.reason ? "" : "Please choose a reason for your visit.";
    }
    if (target === 1) {
      if (!form.patientType)
        return "Let us know if you're a new or returning patient.";
      if (!form.flexible && !form.date)
        return "Pick a preferred date, or choose “Soonest available”.";
      return "";
    }
    if (target === 2) {
      if (!form.name.trim()) return "Please enter your name.";
      if (!form.phone.trim())
        return "Please add a phone number so we can confirm.";
      if (form.email && !isEmail(form.email))
        return "That email address doesn't look right.";
      return "";
    }
    return "";
  }

  function goNext() {
    const message = validate(step);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      void submit();
    }
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  function jumpTo(target: number) {
    if (target <= step) {
      setError("");
      setStep(target);
    }
  }

  async function submit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/schedule/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });
      if (res.ok) {
        setResult("sent");
        setStatus("done");
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { error?: string; code?: string }
        | null;
      if (res.status === 503 || data?.code === "unconfigured") {
        setResult("email");
        setStatus("done");
        window.location.href = mailtoHref;
        return;
      }
      setStatus("idle");
      setError(data?.error ?? "Something went wrong. Please call the office.");
    } catch {
      setResult("email");
      setStatus("done");
      window.location.href = mailtoHref;
    }
  }

  function reset() {
    setForm(initialData);
    setStep(0);
    setError("");
    setStatus("idle");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  if (status === "done") {
    return (
      <div className="card p-8 text-center shadow-soft sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-sage-50 text-sage-600">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-serif text-3xl font-medium tracking-tight text-ink">
          {result === "sent"
            ? "Request received!"
            : "Almost there — send your request"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-8 text-ink-muted">
          {result === "sent"
            ? "Thank you — our Roseville team will reach out shortly to confirm your appointment time."
            : "We've opened your email app with the details filled in. Just hit send and we'll be in touch to confirm."}
        </p>

        <dl className="mx-auto mt-8 max-w-md rounded-2xl border border-line bg-background/50 p-5 text-left text-sm">
          <div className="flex justify-between gap-4 border-b border-line/70 pb-2">
            <dt className="text-ink-muted">Visit</dt>
            <dd className="font-medium text-ink">{reasonLabel}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line/70 py-2">
            <dt className="text-ink-muted">When</dt>
            <dd className="font-medium text-ink">
              {timingLabel} · {timeWindowLabel}
            </dd>
          </div>
          <div className="flex justify-between gap-4 pt-2">
            <dt className="text-ink-muted">Name</dt>
            <dd className="font-medium text-ink">{form.name}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={site.bookingHref} className="btn btn-clay">
            <CalendarCheck className="size-4" aria-hidden="true" />
            Or book instantly online
          </a>
          <a href={site.phoneHref} className="btn btn-outline">
            <Phone className="size-4" aria-hidden="true" />
            Call {site.phone}
          </a>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-sage-700 underline-offset-2 hover:underline"
        >
          Start a new request
        </button>
      </div>
    );
  }

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="card overflow-hidden shadow-soft">
      {/* Progress */}
      <div className="border-b border-line bg-cream px-6 pt-6 sm:px-9">
        <div className="sm:hidden">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-ink">
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-ink-muted">{current.label}</span>
          </div>
          <div className="mt-2 mb-5 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-sage-600 transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <ol className="hidden items-center gap-3 pb-5 sm:flex">
          {STEPS.map((s, index) => {
            const done = index < step;
            const isCurrent = index === step;
            const reachable = index <= step;
            return (
              <li key={s.key} className="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() => jumpTo(index)}
                  disabled={!reachable}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex items-center gap-2 rounded-full ${
                    reachable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition ${
                      done
                        ? "border-sage-600 bg-sage-600 text-cream"
                        : isCurrent
                          ? "border-sage-600 text-sage-700"
                          : "border-line text-ink-soft"
                    }`}
                  >
                    {done ? <Check className="size-4" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isCurrent ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {index < STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`h-px flex-1 ${done ? "bg-sage-600" : "bg-line"}`}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Step content */}
      <div className="p-6 sm:p-9">
        <p aria-live="polite" className="sr-only">
          Step {step + 1} of {STEPS.length}: {current.title}
        </p>

        <div key={step} className="step-pane">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-serif text-2xl font-medium tracking-tight text-ink outline-none sm:text-3xl"
          >
            {current.title}
          </h2>
          <p className="mt-2 text-ink-muted">{current.subtitle}</p>

          <div className="mt-7">
            {step === 0 ? (
              <fieldset>
                <legend className="sr-only">Reason for visit</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {appointmentReasons.map((reason) => {
                    const Icon = reason.icon;
                    const selected = form.reason === reason.key;
                    return (
                      <label
                        key={reason.key}
                        className={`relative flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sage-100 ${
                          selected
                            ? "border-sage-500 bg-sage-50"
                            : "border-line bg-cream hover:border-sage-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={reason.key}
                          checked={selected}
                          onChange={() => update("reason", reason.key)}
                          className="sr-only"
                        />
                        <span
                          className={`grid size-11 shrink-0 place-items-center rounded-full transition ${
                            selected
                              ? "bg-sage-600 text-cream"
                              : "bg-sage-50 text-sage-600"
                          }`}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-serif text-lg text-ink">
                            {reason.label}
                          </span>
                          <span className="mt-0.5 block text-sm text-ink-muted">
                            {reason.hint}
                          </span>
                        </span>
                        {selected ? (
                          <Check
                            className="absolute right-4 top-4 size-5 text-sage-600"
                            aria-hidden="true"
                          />
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-7">
                <fieldset>
                  <legend className="text-sm font-medium text-ink">
                    Are you a new or returning patient?
                  </legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 rounded-full border border-line bg-background p-1">
                    {[
                      { key: "new", label: "New patient" },
                      { key: "returning", label: "Returning" },
                    ].map((option) => {
                      const selected = form.patientType === option.key;
                      return (
                        <label
                          key={option.key}
                          className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sage-300 ${
                            selected
                              ? "bg-sage-600 text-cream shadow-soft"
                              : "text-ink-muted hover:text-ink"
                          }`}
                        >
                          <input
                            type="radio"
                            name="patientType"
                            value={option.key}
                            checked={selected}
                            onChange={() =>
                              update(
                                "patientType",
                                option.key as FormData["patientType"],
                              )
                            }
                            className="sr-only"
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="appt-date"
                      className="text-sm font-medium text-ink"
                    >
                      Preferred date
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
                      <input
                        type="checkbox"
                        checked={form.flexible}
                        onChange={(event) =>
                          update("flexible", event.target.checked)
                        }
                        className="size-4 accent-sage-600"
                      />
                      Soonest available
                    </label>
                  </div>
                  <input
                    id="appt-date"
                    type="date"
                    min={today || undefined}
                    value={form.date}
                    disabled={form.flexible}
                    onChange={(event) => update("date", event.target.value)}
                    className="field disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <fieldset>
                  <legend className="text-sm font-medium text-ink">
                    Time of day
                  </legend>
                  <div className="mt-2 grid grid-cols-3 gap-2 rounded-full border border-line bg-background p-1">
                    {timeWindows.map((slot) => {
                      const selected = form.timeOfDay === slot.key;
                      return (
                        <label
                          key={slot.key}
                          className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sage-300 ${
                            selected
                              ? "bg-sage-600 text-cream shadow-soft"
                              : "text-ink-muted hover:text-ink"
                          }`}
                        >
                          <input
                            type="radio"
                            name="timeOfDay"
                            value={slot.key}
                            checked={selected}
                            onChange={() => update("timeOfDay", slot.key)}
                            className="sr-only"
                          />
                          <Clock className="mr-1.5 size-3.5" aria-hidden="true" />
                          {slot.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    Full name
                    <input
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      className="field"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    Phone
                    <input
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className="field"
                      name="phone"
                      type="tel"
                      placeholder="(916) …"
                      autoComplete="tel"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  Email <span className="font-normal text-ink-soft">(optional)</span>
                  <input
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="field"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  Anything we should know?{" "}
                  <span className="font-normal text-ink-soft">(optional)</span>
                  <textarea
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    className="field min-h-28 resize-y"
                    name="notes"
                    placeholder="Insurance, accessibility needs, the best time to call…"
                  />
                </label>

                {/* Honeypot */}
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
              </div>
            ) : null}

            {step === 3 ? (
              <dl className="rounded-2xl border border-line bg-background/40 px-5">
                <ReviewRow label="Visit" value={reasonLabel} onEdit={() => jumpTo(0)} />
                <ReviewRow
                  label="Patient"
                  value={form.patientType === "new" ? "New patient" : "Returning patient"}
                  onEdit={() => jumpTo(1)}
                />
                <ReviewRow
                  label="Preferred time"
                  value={`${timingLabel} · ${timeWindowLabel}`}
                  onEdit={() => jumpTo(1)}
                />
                <ReviewRow label="Name" value={form.name} onEdit={() => jumpTo(2)} />
                <ReviewRow label="Phone" value={form.phone} onEdit={() => jumpTo(2)} />
                {form.email ? (
                  <ReviewRow label="Email" value={form.email} onEdit={() => jumpTo(2)} />
                ) : null}
                {form.notes ? (
                  <ReviewRow label="Notes" value={form.notes} onEdit={() => jumpTo(2)} />
                ) : null}
              </dl>
            ) : null}
          </div>

          {error ? (
            <p id={errorId} role="alert" className="mt-5 text-sm font-medium text-clay-600">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-cream px-6 py-4 sm:px-9">
        <button
          type="button"
          onClick={goBack}
          className={`btn btn-outline ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={status === "submitting"}
          aria-describedby={error ? errorId : undefined}
          className="btn btn-clay"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : isLast ? (
            <>
              <CalendarCheck className="size-4" aria-hidden="true" />
              Request appointment
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value?: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/70 py-3 last:border-0">
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          {label}
        </dt>
        <dd className="mt-0.5 text-pretty text-ink">{value || "—"}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-sage-700 transition hover:text-sage-800"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        Edit
      </button>
    </div>
  );
}
