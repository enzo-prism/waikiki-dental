"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  HeartPulse,
  Loader2,
  Phone,
} from "lucide-react";
import { Hibiscus } from "@/components/brand";
import { ChoiceCard } from "@/components/forms/choice-card";
import { ChoiceChip } from "@/components/forms/choice-chip";
import { FormProgress } from "@/components/forms/form-progress";
import { LiveRequestSummary, type SummaryRow } from "@/components/forms/live-summary";
import { MonthCalendar } from "@/components/forms/month-calendar";
import { Honeypot, PrivacyConsent, PrivacyNote } from "@/components/forms/privacy-note";
import { RequestSuccess } from "@/components/forms/request-success";
import {
  clearAppointmentDraft,
  formatLongDate,
  formatShortDate,
  formNetworkError,
  isEmail,
  phoneDigitCount,
  readAppointmentDraft,
  submitFormspree,
  writeAppointmentDraft,
} from "@/lib/forms";
import {
  appointmentReasons,
  formPrivacy,
  patientTypes,
  site,
  soonestOption,
  timeWindows,
} from "@/lib/site";

type FormData = {
  patientType: "new" | "returning" | "";
  reason: string;
  flexible: boolean;
  date: string;
  timeOfDay: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
};

const initialData: FormData = {
  patientType: "",
  reason: "",
  flexible: false,
  date: "",
  timeOfDay: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
  consent: false,
};

const STEPS = [
  {
    title: "Who’s visiting — and why?",
    subtitle: "New or returning, then the reason for your visit.",
  },
  {
    title: "When works best?",
    subtitle:
      "Pick a preferred day, or ask for the soonest opening. We’ll confirm the exact time.",
  },
  {
    title: "How can we reach you?",
    subtitle: "We’ll follow up by phone or text to confirm.",
  },
] as const;

function isValidReason(key: string | undefined) {
  return Boolean(key && appointmentReasons.some((reason) => reason.key === key));
}

function isClientSnapshot() {
  return true;
}

function isServerSnapshot() {
  return false;
}

function subscribeNever() {
  return () => {};
}

export function AppointmentScheduler({
  initialReason,
}: {
  initialReason?: string;
} = {}) {
  const isClient = useSyncExternalStore(
    subscribeNever,
    isClientSnapshot,
    isServerSnapshot,
  );
  const seeded = {
    ...initialData,
    reason: isValidReason(initialReason) ? initialReason! : "",
  };
  const [form, setForm] = useState<FormData>(seeded);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [gotcha, setGotcha] = useState("");
  const [ready, setReady] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isSubmittingRef = useRef(false);
  const skipInitialFocus = useRef(true);
  const errorId = useId();

  if (isClient && !ready) {
    const draft = readAppointmentDraft({ step: 0, form: seeded });
    setForm({
      ...draft.form,
      reason: seeded.reason || (isValidReason(draft.form.reason) ? draft.form.reason : ""),
    });
    setStep(draft.step);
    setReady(true);
  }

  useEffect(() => {
    if (!ready || status === "done") return;
    writeAppointmentDraft({ step, form });
  }, [form, step, ready, status]);

  useEffect(() => {
    if (status !== "idle") return;
    if (skipInitialFocus.current) {
      skipInitialFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  const reason = appointmentReasons.find((item) => item.key === form.reason);
  const patient = patientTypes.find((item) => item.key === form.patientType);
  const time = timeWindows.find((item) => item.key === form.timeOfDay);
  const whenLabel = form.flexible
    ? "Soonest available"
    : form.date
      ? formatLongDate(form.date)
      : "";
  const whenShort = form.flexible
    ? "Soonest available"
    : form.date
      ? formatShortDate(form.date)
      : "";

  const summaryRows: SummaryRow[] = [
    {
      label: "Patient",
      value: patient?.label ?? "",
      empty: !patient,
      step: 0,
    },
    {
      label: "Visit",
      value: reason?.label ?? "",
      empty: !reason,
      step: 0,
    },
    {
      label: "When",
      value: [whenShort, time?.label].filter(Boolean).join(" · "),
      empty: !whenShort && !time,
      step: 1,
    },
    {
      label: "Reach",
      value: [form.name, form.phone].filter(Boolean).join(" · "),
      empty: !form.name && !form.phone,
      step: 2,
    },
  ];

  function validate(target: number): string {
    if (target === 0) {
      if (!form.patientType) return "Please choose first visit or welcome back.";
      if (!form.reason) return "Please choose a reason for your visit.";
      return "";
    }
    if (target === 1) {
      if (!form.flexible && !form.date)
        return "Pick a preferred day, or choose soonest available.";
      if (!form.timeOfDay)
        return "Please choose morning, afternoon, or anytime.";
      return "";
    }
    if (target === 2) {
      if (form.name.trim().length < 2) return "Please enter your name.";
      if (!form.phone.trim())
        return "Please add a phone number so we can confirm.";
      if (phoneDigitCount(form.phone) < 10)
        return "That phone number looks incomplete.";
      if (form.email && !isEmail(form.email))
        return "That email address doesn’t look right.";
      if (!form.consent)
        return "Please confirm this request doesn’t include sensitive details.";
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
    if (step < 2) setStep((value) => value + 1);
    else void submit();
  }

  function goBack() {
    if (status === "submitting") return;
    setError("");
    setStep((value) => Math.max(0, value - 1));
  }

  function jumpTo(target: number) {
    if (status === "submitting" || target > step) return;
    setError("");
    setStep(target);
  }

  async function submit() {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setStatus("submitting");
    setError("");

    if (gotcha.trim()) {
      setStatus("done");
      clearAppointmentDraft();
      return;
    }

    const patientLabel =
      form.patientType === "new" ? "New patient" : "Returning patient";
    const dateLabel = form.flexible
      ? "Soonest available"
      : formatLongDate(form.date);
    const timeLabel = time?.label ?? "Anytime";

    try {
      const response = await submitFormspree({
        _subject: "Appointment request — Waikiki Dental",
        form_type: "appointment_request",
        source: "Waikiki Dental appointment request",
        patient_type: patientLabel,
        appointment_reason: reason?.label ?? form.reason,
        appointment_reason_key: form.reason,
        preferred_date: form.flexible ? "Soonest available" : form.date,
        preferred_date_label: dateLabel,
        preferred_time: timeLabel,
        name: form.name.trim(),
        phone: form.phone.trim(),
        ...(form.email.trim() ? { email: form.email.trim() } : {}),
        notes: form.notes.trim() || "None",
        message: [
          "APPOINTMENT REQUEST (not confirmed)",
          "",
          `Patient: ${patientLabel}`,
          `Visit: ${reason?.label ?? form.reason}`,
          `Preferred date: ${dateLabel}`,
          `Preferred time: ${timeLabel}`,
          `Name: ${form.name.trim()}`,
          `Phone: ${form.phone.trim()}`,
          `Email: ${form.email.trim() || "Not provided"}`,
          `Notes: ${form.notes.trim() || "None"}`,
        ].join("\n"),
        _gotcha: gotcha,
      });

      if (!response.ok) {
        isSubmittingRef.current = false;
        setStatus("idle");
        setError(formNetworkError(response.status, "appointment"));
        return;
      }

      clearAppointmentDraft();
      setStatus("done");
    } catch {
      isSubmittingRef.current = false;
      setStatus("idle");
      setError(
        "We couldn’t send your request. Check your connection and try again, or call the office.",
      );
    }
  }

  function reset() {
    isSubmittingRef.current = false;
    setForm({
      ...initialData,
      reason: isValidReason(initialReason) ? initialReason! : "",
    });
    setStep(0);
    setError("");
    setGotcha("");
    setStatus("idle");
    clearAppointmentDraft();
  }

  const current = STEPS[step];
  const SoonestIcon = soonestOption.icon;

  const actions = (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={goBack}
        disabled={status === "submitting"}
        className={`btn btn-outline ${step === 0 ? "invisible" : ""}`}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
      </button>
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-describedby={error ? errorId : undefined}
        className="btn btn-primary min-w-40"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : step === 2 ? (
          "Send request"
        ) : (
          <>
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );

  if (status === "done") {
    return (
      <section className="bg-surface-alt">
        <div className="wrap-wide py-12 sm:py-20">
          <RequestSuccess
            title="Your request is on its way."
            body="This isn’t a confirmed appointment yet. The Waikiki Dental team will follow up by phone or text to lock the time."
            recap={[
              { label: "Visit", value: reason?.label ?? "" },
              {
                label: "When",
                value: `${whenLabel}${time ? ` · ${time.label}` : ""}`,
              },
              { label: "Name", value: form.name },
            ]}
            onReset={reset}
            resetLabel="Start a new request"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-alt">
      <div className="wrap-wide grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14 lg:py-20">
        <div className="lg:sticky lg:top-20">
          <p className="eyebrow text-ocean-600">Request an appointment</p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:leading-[1.07]">
            Request a time with the team.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-8 text-ink-muted">
            Tell us who you are, a preferred day, and how to reach you. This is
            a request — the Roseville office confirms the final time by phone or
            text.
          </p>

          <div className="mt-8 hidden lg:block">
            <LiveRequestSummary
              rows={summaryRows}
              currentStep={step}
              onJump={jumpTo}
            />
          </div>

          <div className="mt-8 hidden rounded-2xl border border-line bg-cream p-5 lg:block">
            <p className="text-sm font-semibold text-ink">Prefer to talk it through?</p>
            <p className="mt-1 text-sm text-ink-muted">
              Call or text the Roseville office and a team member can help.
            </p>
            <a
              href={site.phoneHref}
              className="btn btn-outline btn-sm mt-3"
              aria-label={`Call or text ${site.phone}`}
            >
              Call or text
            </a>
          </div>
        </div>

        <form
          aria-label="Request an appointment"
          aria-busy={status === "submitting"}
          className="mb-32 lg:mb-0"
          onSubmit={(event) => {
            event.preventDefault();
            goNext();
          }}
          noValidate
        >
          <div className="card shadow-soft">
          <FormProgress step={step} onJump={jumpTo} />

          <div className="border-b border-line px-6 py-3 lg:hidden">
            <LiveRequestSummary
              rows={summaryRows}
              currentStep={step}
              onJump={jumpTo}
              variant="compact"
            />
          </div>

          <div className="p-6 sm:p-8">
            <p aria-live="polite" className="sr-only">
              Step {step + 1} of 3: {current.title}
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
                  <div className="grid gap-8">
                    <fieldset>
                      <legend className="text-sm font-medium text-ink">
                        Are you new to Waikiki Dental?
                      </legend>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {patientTypes.map((type) => (
                          <ChoiceCard
                            key={type.key}
                            name="patientType"
                            value={type.key}
                            checked={form.patientType === type.key}
                            onChange={() => update("patientType", type.key)}
                            accent={type.key === "new" ? "sunset" : "ocean"}
                            icon={
                              type.key === "new" ? (
                                <Hibiscus
                                  size={20}
                                  className={
                                    form.patientType === "new"
                                      ? "text-current"
                                      : "text-sunset-600"
                                  }
                                />
                              ) : (
                                <BadgeCheck className="size-5" aria-hidden="true" />
                              )
                            }
                            label={type.label}
                            hint={type.hint}
                          />
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-sm font-medium text-ink">
                        What can we help with?
                      </legend>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {appointmentReasons.map((item) => {
                          const Icon = item.icon;
                          return (
                            <ChoiceCard
                              key={item.key}
                              name="reason"
                              value={item.key}
                              checked={form.reason === item.key}
                              onChange={() => update("reason", item.key)}
                              icon={<Icon className="size-5" aria-hidden="true" />}
                              label={item.label}
                              hint={item.hint}
                            />
                          );
                        })}
                      </div>
                    </fieldset>

                    {form.reason === "emergency" ? (
                      <div className="flex gap-3 rounded-2xl border border-ocean-200 bg-ocean-50/70 p-4">
                        <HeartPulse
                          className="mt-0.5 size-5 shrink-0 text-ocean-700"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            Need to be seen today?
                          </p>
                          <p className="mt-1 text-sm leading-6 text-ink-muted">
                            If you’re in pain, calling the office is the fastest
                            path. You can still send a request.
                          </p>
                          <a
                            href={site.phoneHref}
                            className="btn btn-outline btn-sm mt-3"
                            aria-label={`Call or text ${site.phone}`}
                          >
                            <Phone className="size-4" aria-hidden="true" />
                            Call or text
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="grid gap-7">
                    <fieldset>
                      <legend className="text-sm font-medium text-ink">
                        Preferred day
                      </legend>
                      <div className="mt-3">
                        <label
                          className={`relative flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ocean-100 ${
                            form.flexible
                              ? "border-ocean-500 bg-ocean-50"
                              : "border-line bg-cream hover:border-ocean-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.flexible}
                            onChange={(event) => {
                              update("flexible", event.target.checked);
                              if (event.target.checked) update("date", "");
                            }}
                            className="sr-only"
                          />
                          <span
                            className={`grid size-11 shrink-0 place-items-center rounded-full ${
                              form.flexible
                                ? "bg-ocean-600 text-cream"
                                : "bg-ocean-50 text-ocean-600"
                            }`}
                          >
                            <SoonestIcon className="size-5" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-serif text-lg text-ink">
                              {soonestOption.label}
                            </span>
                            <span className="mt-0.5 block text-sm text-ink-muted">
                              {soonestOption.hint}
                            </span>
                          </span>
                        </label>
                      </div>
                      <div className="mt-4">
                        <MonthCalendar
                          value={form.date}
                          disabled={form.flexible}
                          onChange={(iso) => {
                            update("date", iso);
                            update("flexible", false);
                          }}
                        />
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-sm font-medium text-ink">
                        Time of day
                      </legend>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        {timeWindows.map((slot) => {
                          const Icon = slot.icon;
                          return (
                            <ChoiceChip
                              key={slot.key}
                              name="timeOfDay"
                              value={slot.key}
                              checked={form.timeOfDay === slot.key}
                              onChange={() => update("timeOfDay", slot.key)}
                              icon={<Icon className="size-4" aria-hidden="true" />}
                              label={slot.label}
                              hint={slot.hint}
                            />
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="grid gap-4">
                    <PrivacyNote>{formPrivacy.requestLine}</PrivacyNote>
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
                          aria-invalid={
                            error.toLowerCase().includes("name") || undefined
                          }
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
                          aria-invalid={
                            error.toLowerCase().includes("phone") || undefined
                          }
                        />
                      </label>
                    </div>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Email{" "}
                      <span className="font-normal text-ink-soft">(optional)</span>
                      <input
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        className="field"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                        aria-invalid={
                          error.toLowerCase().includes("email") || undefined
                        }
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Anything the team should know?{" "}
                      <span className="font-normal text-ink-soft">(optional)</span>
                      <textarea
                        value={form.notes}
                        onChange={(event) =>
                          update("notes", event.target.value.slice(0, 500))
                        }
                        className="field min-h-28 resize-y"
                        name="notes"
                        placeholder={formPrivacy.notesPlaceholder}
                      />
                    </label>
                    <PrivacyConsent
                      checked={form.consent}
                      onChange={(value) => update("consent", value)}
                    >
                      {formPrivacy.requestConsent}
                    </PrivacyConsent>
                    <Honeypot value={gotcha} onChange={setGotcha} />
                  </div>
                ) : null}
              </div>

              {error ? (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-5 text-sm font-medium text-sunset-600"
                >
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="fixed inset-x-0 z-40 border-t border-line bg-cream/95 px-4 py-2.5 backdrop-blur-xl lg:static lg:z-auto lg:rounded-b-2xl lg:bg-cream lg:px-8 lg:py-4 lg:backdrop-blur-none"
            style={{
              bottom: "calc(4.25rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {actions}
          </div>
          </div>
        </form>
      </div>
    </section>
  );
}
