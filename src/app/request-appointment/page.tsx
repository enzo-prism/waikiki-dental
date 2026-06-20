import type { Metadata } from "next";
import { Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { AppointmentScheduler } from "@/components/appointment-scheduler";
import { JsonLd } from "@/components/page-templates";
import { Eyebrow } from "@/components/sections";
import { absoluteUrl, site } from "@/lib/site";

const description =
  "Request a dental appointment at Waikiki Dental in Roseville, CA in a few quick steps. Choose your visit, pick a time, and our team confirms by phone or text.";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description,
  alternates: { canonical: absoluteUrl("/request-appointment/") },
  openGraph: {
    title: "Request an Appointment | Waikiki Dental",
    description,
    url: absoluteUrl("/request-appointment/"),
  },
};

const reassurance = [
  {
    icon: ShieldCheck,
    title: "No account needed",
    body: "Just a few quick steps — your progress is saved as you go.",
  },
  {
    icon: Clock,
    title: "Flexible timing",
    body: "Pick a date that suits you, or simply choose “soonest available.”",
  },
  {
    icon: MessageSquare,
    title: "A real person follows up",
    body: "The Roseville team confirms your exact time by phone or text.",
  },
];

export default function RequestAppointmentPage() {
  return (
    <>
      <JsonLd />
      <section className="bg-surface-alt">
        <div className="wrap-wide grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14 lg:py-20">
          <div className="lg:sticky lg:top-28">
            <Eyebrow className="text-clay-600">Request an appointment</Eyebrow>
            <h1 className="mt-4 text-balance font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:leading-[1.07]">
              Let’s find a time that works for you.
            </h1>
            <p className="mt-5 max-w-md text-pretty text-lg leading-8 text-ink-muted">
              Tell us a little about your visit and the Waikiki Dental team will
              confirm your appointment — often the same day.
            </p>

            <ul className="mt-8 grid gap-4">
              {reassurance.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage-50 text-sage-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-lg font-medium text-ink">
                        {item.title}
                      </h2>
                      <p className="mt-0.5 text-sm leading-7 text-ink-muted">
                        {item.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-2xl border border-line bg-cream p-5">
              <p className="text-sm text-ink-muted">
                Prefer to talk now, or need urgent care?
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a href={site.bookingHref} className="btn btn-clay btn-sm">
                  Book instantly online
                </a>
                <a href={site.phoneHref} className="btn btn-outline btn-sm">
                  Call {site.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <AppointmentScheduler />
          </div>
        </div>
      </section>
    </>
  );
}
