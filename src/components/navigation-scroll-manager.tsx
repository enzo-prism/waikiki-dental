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

      resetOnNextRoute.current = true;
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
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
