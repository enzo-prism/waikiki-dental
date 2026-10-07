import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";
import { runInNewContext } from "node:vm";
import {
  SEASON_ATTRIBUTE,
  SEASON_OPT_OUT_KEY,
  SEASON_PREVIEW_KEY,
  activeSeason,
  buildSeasonScript,
  halloween2026,
  harvestTide,
  isSeasonInRange,
} from "./seasonal.ts";

// Pacific Daylight Time is UTC-7 throughout October 2026.
const SEP_30_LAST_MINUTE = "2026-10-01T06:59:00Z";
const OCT_1_MIDNIGHT = "2026-10-01T07:00:00Z";
const OCT_31_LAST_MINUTE = "2026-11-01T06:59:00Z";
const NOV_1_MIDNIGHT = "2026-11-01T07:00:00Z";

describe("isSeasonInRange", () => {
  it("follows the practice's Pacific calendar day, not UTC", () => {
    assert.equal(isSeasonInRange(halloween2026, new Date(SEP_30_LAST_MINUTE)), false);
    assert.equal(isSeasonInRange(halloween2026, new Date(OCT_1_MIDNIGHT)), true);
    assert.equal(isSeasonInRange(halloween2026, new Date(OCT_31_LAST_MINUTE)), true);
    assert.equal(isSeasonInRange(halloween2026, new Date(NOV_1_MIDNIGHT)), false);
  });
});

type Storage = Map<string, string> | "throws";

function storageArea(store: Storage) {
  if (store === "throws") return undefined;
  return {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
  };
}

/** Runs the real inline script against a fake browser. */
function runScript({
  now,
  search = "",
  pathname = "/",
  local = new Map<string, string>(),
  session = new Map<string, string>(),
}: {
  now: string;
  search?: string;
  pathname?: string;
  local?: Storage;
  session?: Storage;
}) {
  const attributes = new Map<string, string>();
  const appended: { rel: string; as: string; href: string }[] = [];
  const fixed = new Date(now).getTime();
  class FixedDate extends Date {
    constructor(...args: unknown[]) {
      if (args.length === 0) super(fixed);
      else super(...(args as [string]));
    }
  }
  const window: Record<string, unknown> = {
    location: { search, pathname },
  };
  for (const [name, store] of [
    ["localStorage", local],
    ["sessionStorage", session],
  ] as const) {
    Object.defineProperty(window, name, {
      get() {
        if (store === "throws") {
          throw new Error("SecurityError: storage is blocked");
        }
        return storageArea(store);
      },
    });
  }
  const document = {
    documentElement: {
      setAttribute: (name: string, value: string) => void attributes.set(name, value),
    },
    createElement: () => ({ rel: "", as: "", href: "" }),
    head: { appendChild: (node: { rel: string; as: string; href: string }) => void appended.push(node) },
  };

  runInNewContext(buildSeasonScript(halloween2026), {
    window,
    document,
    Date: FixedDate,
    Intl,
    URLSearchParams,
  });

  return { season: attributes.get(SEASON_ATTRIBUTE) ?? null, appended, local, session };
}

describe("buildSeasonScript", () => {
  it("turns the season on only inside the date range", () => {
    assert.equal(runScript({ now: SEP_30_LAST_MINUTE }).season, null);
    assert.equal(runScript({ now: OCT_1_MIDNIGHT }).season, "halloween");
    assert.equal(runScript({ now: OCT_31_LAST_MINUTE }).season, "halloween");
    assert.equal(runScript({ now: NOV_1_MIDNIGHT }).season, null);
  });

  it("preloads the seasonal hero poster on the homepage only", () => {
    const home = runScript({ now: OCT_1_MIDNIGHT });
    assert.deepEqual(home.appended, [
      { rel: "preload", as: "image", href: harvestTide.poster },
    ]);
    assert.deepEqual(runScript({ now: OCT_1_MIDNIGHT, pathname: "/iv-sedation/" }).appended, []);
    assert.deepEqual(runScript({ now: NOV_1_MIDNIGHT }).appended, []);
  });

  it("previews out of season with ?season=halloween for the rest of the session", () => {
    const session = new Map<string, string>();
    assert.equal(
      runScript({ now: NOV_1_MIDNIGHT, search: "?season=halloween", session }).season,
      "halloween",
    );
    assert.equal(session.get(SEASON_PREVIEW_KEY), "1");
    assert.equal(runScript({ now: NOV_1_MIDNIGHT, session }).season, "halloween");
  });

  it("opts a browser out with ?season=off and resets with ?season=auto", () => {
    const local = new Map<string, string>();
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, search: "?season=off", local }).season, null);
    assert.equal(local.get(SEASON_OPT_OUT_KEY), "off");
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, local }).season, null);
    assert.equal(
      runScript({ now: OCT_1_MIDNIGHT, search: "?season=auto", local }).season,
      "halloween",
    );
    assert.equal(local.has(SEASON_OPT_OUT_KEY), false);
  });

  it("an explicit ?season=off wins over an active preview", () => {
    const session = new Map([[SEASON_PREVIEW_KEY, "1"]]);
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, search: "?season=off", session }).season, null);
    assert.equal(session.has(SEASON_PREVIEW_KEY), false);
  });

  it("still follows the calendar (and honors ?season=) when storage is blocked", () => {
    assert.equal(
      runScript({ now: OCT_1_MIDNIGHT, local: "throws", session: "throws" }).season,
      "halloween",
    );
    assert.equal(
      runScript({ now: NOV_1_MIDNIGHT, local: "throws", session: "throws" }).season,
      null,
    );
    assert.equal(
      runScript({
        now: NOV_1_MIDNIGHT,
        search: "?season=halloween",
        local: "throws",
        session: "throws",
      }).season,
      "halloween",
    );
  });

  it("escapes markup in the inlined config", () => {
    assert.doesNotMatch(buildSeasonScript(halloween2026), /<\/?script/i);
  });
});

describe("seasonal assets", () => {
  it("ship every file the active season references", () => {
    assert.ok(activeSeason);
    assert.ok(activeSeason.startsOn <= activeSeason.endsOn);
    const files = [
      activeSeason.heroPoster,
      activeSeason.icon,
      harvestTide.poster,
      harvestTide.webm,
      harvestTide.mp4,
    ];
    for (const file of files) {
      assert.ok(existsSync(new URL(`../../public${file}`, import.meta.url)), `${file} is missing`);
    }
  });
});
