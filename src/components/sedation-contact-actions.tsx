import { MessageSquare, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function SedationContactActions({ dark = false }: { dark?: boolean }) {
  const buttonClass = dark ? "btn btn-ghost-light" : "btn btn-outline";
  return (
    <>
      <a href={site.phoneHref} className={buttonClass} aria-label={`Call ${site.phone} for a sedation consultation`}>
        <Phone className="size-4 shrink-0" aria-hidden="true" />
        Call {site.phone}
      </a>
      <a href={site.smsHref} className={buttonClass} aria-label={`Text the office at ${site.phone}`}>
        <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
        Text the office
      </a>
    </>
  );
}
