"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Next.js preserves scroll position for some client-side navigations. That is
 * useful for browser history, but surprising for a deliberate link click from
 * deep in a long marketing page: a shorter destination can inherit a position
 * near its footer. Reset only click-initiated route changes, while leaving
 * Back/Forward scroll restoration intact.
 */
function samePath(a: string, b: string) {
  const strip = (path: string) =>
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return strip(a) === strip(b);
}

export function NavigationScrollManager() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const resetOnNextRoute = useRef(false);

  useEffect(() => {
    function focusMain() {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.hash
      ) {
        return;
      }

      const current = new URL(window.location.href);
      const sameDestination =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (sameDestination) {
        event.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        focusMain();
        return;
      }

      // Only a pathname change clears the flag below. A query-only link on the
      // same page never changes the pathname, so flagging it would leak the
      // reset into the next Back/Forward navigation.
      if (samePath(destination.pathname, current.pathname)) return;

      resetOnNextRoute.current = true;
    }

    // Back/Forward is never click-initiated: drop any stale flag (e.g. from a
    // click whose navigation was cancelled) so history restoration is kept.
    function handlePopState() {
      resetOnNextRoute.current = false;
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    if (!resetOnNextRoute.current) return;
    resetOnNextRoute.current = false;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  }, [pathname]);

  return null;
}
