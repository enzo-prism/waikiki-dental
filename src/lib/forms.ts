export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeajvpnb";
export const FORM_SUBMIT_TIMEOUT_MS = 8_000;

const FORMSPREE_PATH_RE = /^\/f\/[a-z0-9]+$/i;
const PHONE_ALLOWED_CHARACTERS = /^\s*\+?[\d\s().-]+\s*$/;

export function resolveFormspreeEndpoint(
  candidate: string | undefined,
  fallback = FORMSPREE_ENDPOINT,
) {
  const value = candidate?.trim();
  if (!value) return fallback;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "formspree.io" ||
      url.search ||
      url.hash ||
      !FORMSPREE_PATH_RE.test(url.pathname)
    ) {
      return fallback;
    }
    return url.toString();
  } catch {
    return fallback;
  }
}

export const APPOINTMENT_STORAGE_KEY = "wd-appt-request-v1";

export type AppointmentDraft<T> = {
  step: number;
  form: T;
};

export function readAppointmentDraft<T>(fallback: AppointmentDraft<T>) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem(APPOINTMENT_STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<AppointmentDraft<T>>;
    return {
      step:
        typeof saved.step === "number"
          ? Math.min(2, Math.max(0, saved.step))
          : fallback.step,
      form: { ...fallback.form, ...saved.form },
    };
  } catch {
    sessionStorage.removeItem(APPOINTMENT_STORAGE_KEY);
    return fallback;
  }
}

export function writeAppointmentDraft<T>(draft: AppointmentDraft<T>) {
  sessionStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(draft));
}

export function clearAppointmentDraft() {
  sessionStorage.removeItem(APPOINTMENT_STORAGE_KEY);
}

export function toLocalIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalIso(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function formatLongDate(iso: string) {
  return parseLocalIso(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(iso: string) {
  return parseLocalIso(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isEmail(value: string) {
  const normalized = value.trim();
  return normalized.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export function normalizeUsPhoneDigits(value: string): string | null {
  if (!PHONE_ALLOWED_CHARACTERS.test(value)) return null;
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

export function isUsPhone(value: string) {
  return normalizeUsPhoneDigits(value) !== null;
}

type AppointmentPayloadInput = {
  patientLabel: string;
  reasonLabel: string;
  reasonKey: string;
  preferredDate: string;
  preferredDateLabel: string;
  preferredTime: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  gotcha: string;
};

export function buildAppointmentFormspreePayload(input: AppointmentPayloadInput) {
  const notes = input.notes.trim() || "None";
  return {
    subject: "Appointment request — Waikiki Dental",
    form_type: "appointment_request",
    source: "Waikiki Dental appointment request",
    patient_type: input.patientLabel,
    appointment_reason: input.reasonLabel,
    appointment_reason_key: input.reasonKey,
    preferred_date: input.preferredDate,
    preferred_date_label: input.preferredDateLabel,
    preferred_time: input.preferredTime,
    name: input.name.trim(),
    phone: input.phone.trim(),
    ...(input.email.trim() ? { email: input.email.trim() } : {}),
    notes,
    privacy_check: "Yes",
    message: [
      "APPOINTMENT REQUEST (not confirmed)",
      "",
      `Patient: ${input.patientLabel}`,
      `Visit: ${input.reasonLabel}`,
      `Preferred date: ${input.preferredDateLabel}`,
      `Preferred time: ${input.preferredTime}`,
      `Name: ${input.name.trim()}`,
      `Phone: ${input.phone.trim()}`,
      `Email: ${input.email.trim() || "Not provided"}`,
      `Notes: ${notes}`,
    ].join("\n"),
    _gotcha: input.gotcha,
  };
}

type ContactPayloadInput = {
  topicLabel: string;
  topicKey: string;
  name: string;
  email: string;
  phone: string;
  replyPreference: "Email" | "Phone";
  message: string;
  gotcha: string;
};

export function buildContactFormspreePayload(input: ContactPayloadInput) {
  return {
    subject: "Contact message — Waikiki Dental",
    form_type: "contact_message",
    source: "Waikiki Dental contact form",
    topic: input.topicLabel,
    topic_key: input.topicKey,
    name: input.name.trim(),
    ...(input.email.trim() ? { email: input.email.trim() } : {}),
    ...(input.phone.trim() ? { phone: input.phone.trim() } : {}),
    reply_preference: input.replyPreference,
    privacy_check: "Yes",
    message: [
      "CONTACT MESSAGE",
      "",
      `Topic: ${input.topicLabel}`,
      `Name: ${input.name.trim()}`,
      `Email: ${input.email.trim() || "Not provided"}`,
      `Phone: ${input.phone.trim() || "Not provided"}`,
      `Preferred reply: ${input.replyPreference}`,
      "",
      input.message.trim(),
    ].join("\n"),
    _gotcha: input.gotcha,
  };
}

export function formNetworkError(status: number, kind: "appointment" | "contact") {
  if (status === 429) {
    return kind === "appointment"
      ? "Too many requests were sent. Please wait a moment and try again, or call the office."
      : "Too many messages were sent just now. Please wait a moment and try again, or call the office.";
  }
  return kind === "appointment"
    ? "We couldn’t send your request. Try again, or call the office."
    : "We couldn’t send your message. Please try again, or call or email the office directly.";
}

export async function submitFormspree(
  payload: Record<string, unknown>,
  endpoint = FORMSPREE_ENDPOINT,
  timeoutMs = FORM_SUBMIT_TIMEOUT_MS,
) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(resolveFormspreeEndpoint(endpoint), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
}
