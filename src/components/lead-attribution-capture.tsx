"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureLeadAttribution } from "@/lib/lead-attribution";

export function LeadAttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureLeadAttribution();
  }, [pathname]);

  return null;
}
