"use client";

import { useEffect, useState } from "react";
import {
  ATTRIBUTION_UPDATED_EVENT,
  EMPTY_LEAD_ATTRIBUTION,
  LEAD_ATTRIBUTION_FIELDS,
  captureLeadAttribution,
  type LeadAttribution,
} from "@/lib/lead-attribution";

export function useLeadAttribution() {
  const [attribution, setAttribution] = useState<LeadAttribution>(
    EMPTY_LEAD_ATTRIBUTION,
  );

  useEffect(() => {
    function sync() {
      setAttribution(captureLeadAttribution());
    }

    sync();
    window.addEventListener(ATTRIBUTION_UPDATED_EVENT, sync);
    return () => window.removeEventListener(ATTRIBUTION_UPDATED_EVENT, sync);
  }, []);

  return attribution;
}

export function LeadAttributionHiddenFields() {
  const attribution = useLeadAttribution();

  return (
    <div hidden aria-hidden="true">
      {LEAD_ATTRIBUTION_FIELDS.map((field) => (
        <input
          key={field}
          type="hidden"
          name={field}
          value={attribution[field]}
          readOnly
        />
      ))}
    </div>
  );
}
