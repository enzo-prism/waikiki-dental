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

/**
 * Returns the requested Web Storage area, or null when it is unavailable.
 * Blocked cookies/site data make the `window.sessionStorage` getter itself
 * throw a SecurityError, so the property access must sit inside the try.
 */
export function safeStorage(kind: "localStorage" | "sessionStorage"): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window[kind] ?? null;
  } catch {
    return null;
  }
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

export function formNetworkError(status: number) {
  if (status === 429) {
    return "Too many messages were sent just now. Please wait a moment and try again, or call the office.";
  }
  return "We couldn’t send your message. Please try again, or call or email the office directly.";
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
