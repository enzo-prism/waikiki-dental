import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function AppointmentOfficeContact() {
  return (
    <aside className="rounded-2xl border border-line bg-cream p-6 sm:p-7">
      <p className="eyebrow">Prefer to reach us directly?</p>
      <p className="mt-3 text-pretty leading-7 text-ink-muted">
        Call, text, or email our Roseville front desk and we will be glad to
        help find a time that works for you.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <a href={site.phoneHref} className="btn btn-outline w-full">
          <Phone className="size-4" aria-hidden="true" />
          {site.phone}
        </a>
        <a href={site.emailHref} className="btn btn-outline w-full">
          <Mail className="size-4" aria-hidden="true" />
          {site.email}
        </a>
      </div>
    </aside>
  );
}
