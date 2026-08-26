export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const CLICK_ID_FIELDS = ["gclid", "fbclid", "ttclid"] as const;

export const LEAD_ATTRIBUTION_FIELDS = [
  ...UTM_FIELDS,
  ...CLICK_ID_FIELDS,
  "ad_id",
] as const;

export type UtmField = (typeof UTM_FIELDS)[number];
export type ClickIdField = (typeof CLICK_ID_FIELDS)[number];
export type LeadAttributionField = (typeof LEAD_ATTRIBUTION_FIELDS)[number];

export type LeadAttribution = Record<LeadAttributionField, string>;

export const ATTRIBUTION_STORAGE_KEY = "wd_lead_attribution_v1";
export const ATTRIBUTION_SESSION_KEY = "wd_lead_attribution_session_v1";
export const ATTRIBUTION_UPDATED_EVENT = "wd:lead-attribution-updated";
export const ATTRIBUTION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1_000;
export const ATTRIBUTION_MAX_VALUE_LENGTH = 512;

type StoredAttributionRecord = {
  expiresAt: string;
  firstTouch: LeadAttribution;
  version: 1;
};

export const EMPTY_LEAD_ATTRIBUTION: LeadAttribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
  fbclid: "",
  ttclid: "",
  ad_id: "",
};

let memoryRecord = "";

export function compactAttributionValue(value: string | null | undefined) {
  return value?.trim().slice(0, ATTRIBUTION_MAX_VALUE_LENGTH) ?? "";
}

export function parseAdIdFromUtmContent(utmContent: string | null | undefined) {
  const value = compactAttributionValue(utmContent);
  if (!value) return "";
  if (/^\d{5,40}$/u.test(value)) return value;
  return value.match(/_(\d{5,40})$/u)?.[1] ?? "";
}

export function emptyLeadAttribution(): LeadAttribution {
  return { ...EMPTY_LEAD_ATTRIBUTION };
}

function getQueryValue(params: URLSearchParams, names: readonly string[]) {
  for (const name of names) {
    const exact = params.get(name);
    if (exact) return compactAttributionValue(exact);
  }

  const normalized = new Set(names.map((name) => name.toLowerCase()));
  for (const [name, value] of params.entries()) {
    if (normalized.has(name.toLowerCase())) {
      return compactAttributionValue(value);
    }
  }

  return "";
}

export function parseLeadAttribution(search: string): LeadAttribution {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const utm_content = getQueryValue(params, ["utm_content"]);
  const parsedAdId = parseAdIdFromUtmContent(utm_content);

  return {
    utm_source: getQueryValue(params, ["utm_source"]),
    utm_medium: getQueryValue(params, ["utm_medium"]),
    utm_campaign: getQueryValue(params, ["utm_campaign"]),
    utm_content,
    utm_term: getQueryValue(params, ["utm_term"]),
    gclid: getQueryValue(params, ["gclid"]),
    fbclid: getQueryValue(params, ["fbclid"]),
    ttclid: getQueryValue(params, ["ttclid"]),
    ad_id: parsedAdId || getQueryValue(params, ["ad_id"]),
  };
}

export function mergeFirstTouch(
  stored: LeadAttribution,
  current: LeadAttribution,
): LeadAttribution {
  const next = emptyLeadAttribution();
  for (const field of LEAD_ATTRIBUTION_FIELDS) {
    next[field] = stored[field] || current[field];
  }
  next.ad_id =
    next.ad_id || parseAdIdFromUtmContent(next.utm_content) || current.ad_id;
  return next;
}

function normalizeAttribution(
  value: Partial<LeadAttribution> | undefined,
): LeadAttribution {
  const next = emptyLeadAttribution();
  for (const field of LEAD_ATTRIBUTION_FIELDS) {
    next[field] = compactAttributionValue(value?.[field]);
  }
  next.ad_id ||= parseAdIdFromUtmContent(next.utm_content);
  return next;
}

function readStorage(storage: Storage | undefined, key: string) {
  try {
    return storage?.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeStorage(storage: Storage | undefined, key: string, value: string) {
  try {
    storage?.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function isPrivacyRestricted() {
  if (typeof navigator === "undefined") return false;
  const navigatorWithPrivacy = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };
  return (
    navigatorWithPrivacy.globalPrivacyControl === true ||
    navigator.doNotTrack === "1" ||
    (typeof window !== "undefined" &&
      (window as Window & { doNotTrack?: string }).doNotTrack === "1")
  );
}

function readStoredRaw() {
  if (typeof window === "undefined") return memoryRecord;
  if (isPrivacyRestricted()) {
    return readStorage(window.sessionStorage, ATTRIBUTION_SESSION_KEY) || memoryRecord;
  }
  return (
    readStorage(window.localStorage, ATTRIBUTION_STORAGE_KEY) ||
    readStorage(window.sessionStorage, ATTRIBUTION_SESSION_KEY) ||
    memoryRecord
  );
}

function parseStoredRecord(
  raw: string,
  now: Date,
): StoredAttributionRecord | null {
  try {
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredAttributionRecord>;
    if (parsed.version !== 1 || !parsed.firstTouch || !parsed.expiresAt) {
      return null;
    }
    if (Date.parse(parsed.expiresAt) <= now.getTime()) return null;
    return {
      expiresAt: parsed.expiresAt,
      firstTouch: normalizeAttribution(parsed.firstTouch),
      version: 1,
    };
  } catch {
    return null;
  }
}

function persistRecord(record: StoredAttributionRecord) {
  const serialized = JSON.stringify(record);
  const previous = memoryRecord;
  memoryRecord = serialized;

  if (typeof window === "undefined") return;

  if (isPrivacyRestricted()) {
    writeStorage(window.sessionStorage, ATTRIBUTION_SESSION_KEY, serialized);
  } else if (!writeStorage(window.localStorage, ATTRIBUTION_STORAGE_KEY, serialized)) {
    writeStorage(window.sessionStorage, ATTRIBUTION_SESSION_KEY, serialized);
  }

  if (previous !== serialized) {
    window.dispatchEvent(new Event(ATTRIBUTION_UPDATED_EVENT));
  }
}

export function captureLeadAttribution(input?: {
  now?: Date;
  search?: string;
}): LeadAttribution {
  if (typeof window === "undefined" && !input) {
    return emptyLeadAttribution();
  }

  const now = input?.now ?? new Date();
  const current = parseLeadAttribution(
    input?.search ??
      (typeof window !== "undefined" ? (window.location?.search ?? "") : ""),
  );
  const stored = parseStoredRecord(readStoredRaw(), now);
  const firstTouch = stored
    ? mergeFirstTouch(stored.firstTouch, current)
    : current;
  const expiresAt = stored?.expiresAt
    ? stored.expiresAt
    : new Date(now.getTime() + ATTRIBUTION_MAX_AGE_MS).toISOString();

  persistRecord({
    expiresAt,
    firstTouch,
    version: 1,
  });

  return { ...firstTouch };
}

export function getLeadAttributionFields(input?: {
  now?: Date;
  search?: string;
}): LeadAttribution {
  return captureLeadAttribution(input);
}

export function withLeadAttribution<T extends Record<string, unknown>>(
  payload: T,
  attribution = getLeadAttributionFields(),
): T & LeadAttribution {
  return { ...payload, ...attribution };
}

export function resetLeadAttributionForTests() {
  memoryRecord = "";
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
    window.sessionStorage.removeItem(ATTRIBUTION_SESSION_KEY);
  } catch {
    // Tests may run without storage.
  }
}
