export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeajvpnb";

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function phoneDigitCount(value: string) {
  return value.replace(/\D/g, "").length;
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
) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
