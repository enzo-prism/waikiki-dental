import { MessageSquare, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function SedationContactActions({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  const size = compact ? "btn-sm min-h-11 min-w-0 px-2" : "";
  return (
    <>
      <a href={site.phoneHref} className={`btn btn-sunset ${size}`} aria-label={`Call ${site.phone} for a sedation consultation`}>
        <Phone className="size-4 shrink-0" aria-hidden="true" />
        {compact ? "Call for a consult" : "Call for a sedation consultation"}
      </a>
      <a href={site.smsHref} className={`btn ${dark ? "btn-ghost-light" : "btn-outline"} ${size}`} aria-label={`Text the Roseville office at ${site.phone}`}>
        <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
        Text the office
      </a>
    </>
  );
}
