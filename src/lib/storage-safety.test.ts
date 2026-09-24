import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import {
  APPOINTMENT_STORAGE_KEY,
  clearAppointmentDraft,
  readAppointmentDraft,
  safeStorage,
  writeAppointmentDraft,
} from "./forms.ts";
import {
  captureLeadAttribution,
  resetLeadAttributionForTests,
} from "./lead-attribution.ts";

type StorageMode = "ok" | "getter-throws" | "setItem-throws" | "all-throw";

function securityError() {
  return new DOMException("The operation is insecure.", "SecurityError");
}

function createStorage(mode: StorageMode) {
  const store = new Map<string, string>();
  const broken = mode === "all-throw";
  return {
    store,
    getItem(key: string) {
      if (broken) throw securityError();
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      if (broken || mode === "setItem-throws") {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      }
      store.set(key, value);
    },
    removeItem(key: string) {
      if (broken) throw securityError();
      store.delete(key);
    },
  };
}

/**
 * Installs a window whose storage getters behave like a browser with site
 * data blocked (getter throws) or a full/private-mode quota (setItem throws).
 */
function installWindow(mode: StorageMode) {
  const local = createStorage(mode);
  const session = createStorage(mode);
  const windowLike = {
    location: { search: "?utm_source=google&gclid=abc" },
    dispatchEvent() {
      return true;
    },
  };
  for (const [name, storage] of [
    ["localStorage", local],
    ["sessionStorage", session],
  ] as const) {
    const get = () => {
      if (mode === "getter-throws") throw securityError();
      return storage;
    };
    Object.defineProperty(windowLike, name, { configurable: true, get });
    Object.defineProperty(globalThis, name, { configurable: true, get });
  }
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: windowLike,
  });
  return { local, session };
}

const fallback = { step: 0, form: { name: "" } };

afterEach(() => {
  resetLeadAttributionForTests();
});

describe("safeStorage", () => {
  it("returns null instead of throwing when the storage getter throws", () => {
    installWindow("getter-throws");
    assert.equal(safeStorage("sessionStorage"), null);
    assert.equal(safeStorage("localStorage"), null);
  });
});

for (const mode of ["getter-throws", "setItem-throws", "all-throw"] as const) {
  describe(`appointment draft storage (${mode})`, () => {
    beforeEach(() => {
      installWindow(mode);
    });

    it("never throws while reading, writing, or clearing", () => {
      assert.doesNotThrow(() => writeAppointmentDraft({ step: 2, form: { name: "Ana" } }));
      assert.equal(writeAppointmentDraft({ step: 2, form: { name: "Ana" } }), false);
      assert.deepEqual(readAppointmentDraft(fallback), fallback);
      assert.doesNotThrow(() => clearAppointmentDraft());
    });
  });

  describe(`lead attribution storage (${mode})`, () => {
    beforeEach(() => {
      installWindow(mode);
    });

    it("still captures first-touch attribution in memory", () => {
      const first = captureLeadAttribution();
      assert.equal(first.utm_source, "google");
      assert.equal(first.gclid, "abc");
      const later = captureLeadAttribution({ search: "?utm_source=meta" });
      assert.equal(later.utm_source, "google");
      assert.doesNotThrow(() => resetLeadAttributionForTests());
    });
  });
}

describe("appointment draft storage (healthy)", () => {
  it("round-trips a draft and drops corrupt JSON", () => {
    const { session } = installWindow("ok");
    assert.equal(writeAppointmentDraft({ step: 1, form: { name: "Ana" } }), true);
    assert.deepEqual(readAppointmentDraft(fallback), {
      step: 1,
      form: { name: "Ana" },
    });
    session.store.set(APPOINTMENT_STORAGE_KEY, "{not json");
    assert.deepEqual(readAppointmentDraft(fallback), fallback);
    assert.equal(session.store.has(APPOINTMENT_STORAGE_KEY), false);
  });

  it("falls back to sessionStorage when localStorage setItem throws", () => {
    const { local, session } = installWindow("ok");
    local.setItem = () => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    };
    captureLeadAttribution({ search: "?utm_source=google" });
    assert.equal(session.store.size, 1);
  });
});
