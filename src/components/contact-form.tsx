"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, Mail, Phone, Send } from "lucide-react";
import { ChoiceChip } from "@/components/forms/choice-chip";
import { Honeypot, PrivacyConsent } from "@/components/forms/privacy-note";
import { RequestSuccess } from "@/components/forms/request-success";
import {
  buildContactFormspreePayload,
  FORMSPREE_ENDPOINT,
  formNetworkError,
  isEmail,
  isUsPhone,
  resolveFormspreeEndpoint,
  submitFormspree,
} from "@/lib/forms";
import { withLeadAttribution } from "@/lib/lead-attribution";
import { contactTopics, formPrivacy } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  replyBy: "email" | "phone" | "";
  message: string;
  consent: boolean;
};

type ErrorField = "topic" | "message" | "replyBy" | "name" | "email" | "phone" | "consent";

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  replyBy: "",
  message: "",
  consent: false,
};

const CONTACT_FORM_ENDPOINT =
  resolveFormspreeEndpoint(
    process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT,
    FORMSPREE_ENDPOINT,
  );

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  // Which control the current error belongs to (null for network errors).
  const [errorField, setErrorField] = useState<ErrorField | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const isSubmittingRef = useRef(false);
  const focusFormAfterReset = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const errorId = useId();

  // Move focus to a new error so it is announced and the visitor lands next
  // to it, matching the appointment scheduler.
  useEffect(() => {
    if (!error) return;
    errorRef.current?.focus({ preventScroll: false });
  }, [error]);

  // "Send another message" unmounts the success panel; return focus to the
  // top of the fresh form instead of dropping it to <body>.
  useEffect(() => {
    if (status !== "idle" || !focusFormAfterReset.current) return;
    focusFormAfterReset.current = false;
    formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [status]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setErrorField(null);
  }

  function showError(message: string, field: ErrorField | null = null) {
    setError(message);
    setErrorField(field);
  }

  /** aria-invalid + aria-describedby for the control the error belongs to. */
  function invalidProps(field: ErrorField) {
    const invalid = Boolean(error) && errorField === field;
    return {
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? errorId : undefined,
    } as const;
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current || status === "submitting") return;

    if (!form.topic) {
      showError("Please choose what this is about.", "topic");
      return;
    }
    if (!form.message.trim()) {
      showError("Please add a short message.", "message");
      return;
    }
    if (!form.replyBy) {
      showError("Please choose email or phone so we know how to reply.", "replyBy");
      return;
    }
    if (form.name.trim().length < 2) {
      showError("Please enter your name.", "name");
      return;
    }
    if (form.replyBy === "email" && !form.email.trim()) {
      showError("Please add your email, or choose a phone reply.", "email");
      return;
    }
    if (form.replyBy === "phone" && !form.phone.trim()) {
      showError("Please add your phone number, or choose an email reply.", "phone");
      return;
    }
    if (form.email && !isEmail(form.email)) {
      showError("That email address doesn’t look right.", "email");
      return;
    }
    if (form.phone && !isUsPhone(form.phone)) {
      showError("Enter a 10-digit US phone number (a leading +1 is okay).", "phone");
      return;
    }
    if (!form.consent) {
      showError(
        "Please confirm that this message does not include sensitive information.",
        "consent",
      );
      return;
    }

    if (company.trim()) {
      setStatus("sent");
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");
    showError("");

    const topic = contactTopics.find((item) => item.key === form.topic);

    try {
      const response = await submitFormspree(
        withLeadAttribution(
          buildContactFormspreePayload({
            topicLabel: topic?.label ?? form.topic,
            topicKey: form.topic,
            name: form.name,
            email: form.email,
            phone: form.phone,
            replyPreference: form.replyBy === "email" ? "Email" : "Phone",
            message: form.message,
            gotcha: company,
          }),
        ),
        CONTACT_FORM_ENDPOINT,
      );

      if (!response.ok) {
        isSubmittingRef.current = false;
        setStatus("idle");
        showError(formNetworkError(response.status, "contact"));
        return;
      }

      setStatus("sent");
    } catch {
      isSubmittingRef.current = false;
      setStatus("idle");
      showError(
        "We couldn’t send your message. Check your connection and try again, or call the office.",
      );
    }
  }

  function reset() {
    isSubmittingRef.current = false;
    focusFormAfterReset.current = true;
    setForm(initialState);
    setCompany("");
    showError("");
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <RequestSuccess
        title="Your message was sent."
        body={`Thanks — the team will reply by ${form.replyBy === "email" ? "email" : "phone"} during office hours. For anything urgent, please call.`}
        recap={[]}
        onReset={reset}
        resetLabel="Send another message"
      />
    );
  }

  return (
    <form
      ref={formRef}
      // POST keeps name/phone/email out of the URL if someone submits before
      // hydration; the JS handler always prevents the native submit.
      method="post"
      onSubmit={submitForm}
      className="grid gap-5"
      aria-label="Contact Waikiki Dental"
      aria-busy={status === "submitting"}
      noValidate
    >
      <fieldset {...invalidProps("topic")}>
        <legend className="text-sm font-medium text-ink">What is this about?</legend>
        <div
          className={`mt-3 grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}
        >
          {contactTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <ChoiceChip
                key={topic.key}
                name="topic"
                value={topic.key}
                checked={form.topic === topic.key}
                onChange={() => update("topic", topic.key)}
                icon={<Icon className="size-4" aria-hidden="true" />}
                label={topic.label}
                hint={topic.hint}
              />
            );
          })}
        </div>
      </fieldset>

      <label className="grid gap-2 text-sm font-medium text-ink">
        Message
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className="field min-h-36 resize-y"
          name="message"
          placeholder={formPrivacy.contactPlaceholder}
          {...invalidProps("message")}
          maxLength={2_000}
        />
      </label>

      <fieldset {...invalidProps("replyBy")}>
        <legend className="text-sm font-medium text-ink">How should we reply?</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ChoiceChip
            name="replyBy"
            value="email"
            checked={form.replyBy === "email"}
            onChange={() => update("replyBy", "email")}
            icon={<Mail className="size-4" aria-hidden="true" />}
            label="Email"
          />
          <ChoiceChip
            name="replyBy"
            value="phone"
            checked={form.replyBy === "phone"}
            onChange={() => update("replyBy", "phone")}
            icon={<Phone className="size-4" aria-hidden="true" />}
            label="Phone"
          />
        </div>
      </fieldset>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Full name
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="field"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            maxLength={120}
            {...invalidProps("name")}
          />
        </label>
        {form.replyBy === "phone" ? (
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
              maxLength={32}
              {...invalidProps("phone")}
            />
          </label>
        ) : (
          <label className="grid gap-2 text-sm font-medium text-ink">
            Email{" "}
            {form.replyBy === "email" ? null : (
              <span className="font-normal text-ink-soft">(optional)</span>
            )}
            <input
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              className="field"
              name="email"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              maxLength={254}
              {...invalidProps("email")}
            />
          </label>
        )}
      </div>

      {form.replyBy === "phone" ? (
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email <span className="font-normal text-ink-soft">(optional)</span>
          <input
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="field"
            name="email-optional"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            maxLength={254}
            {...invalidProps("email")}
          />
        </label>
      ) : form.replyBy === "email" ? (
        <label className="grid gap-2 text-sm font-medium text-ink">
          Phone <span className="font-normal text-ink-soft">(optional)</span>
          <input
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="field"
            name="phone"
            type="tel"
            placeholder="(916) …"
            autoComplete="tel"
            maxLength={32}
            {...invalidProps("phone")}
          />
        </label>
      ) : null}

      <PrivacyConsent
        checked={form.consent}
        onChange={(value) => update("consent", value)}
        invalid={Boolean(error) && errorField === "consent"}
        describedBy={errorId}
      >
        {formPrivacy.contactConsent}
      </PrivacyConsent>
      <Honeypot value={company} onChange={setCompany} />

      {error ? (
        <p
          ref={errorRef}
          id={errorId}
          tabIndex={-1}
          className="text-sm font-medium text-sunset-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        className="btn btn-primary"
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
