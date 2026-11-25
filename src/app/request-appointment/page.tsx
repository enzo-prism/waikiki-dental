import { SedationContactActions } from "@/components/sedation-contact-actions";
import { sedationContactId } from "@/lib/site";
import type { Metadata } from "next";
import { AppointmentOfficeContact } from "@/components/appointment-office-contact";
import { JarvisBookingTracker } from "@/components/jarvis-booking-tracker";
import { JsonLd } from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Schedule your dental visit online at Waikiki Dental in Roseville, CA, or call, text, or email our front desk directly.";

const jarvisScheduleSrc =
  "https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000335";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Dental Appointment",
  description,
  path: "/request-appointment/",
});

export default function RequestAppointmentPage() {
  return (
    <>
      <JsonLd />
      <JarvisBookingTracker />
      <section className="overflow-x-clip bg-surface-alt">
        <h1 className="sr-only">Request a dental appointment</h1>
        <section id={sedationContactId} tabIndex={-1} aria-labelledby="consultation-heading" className="wrap-wide hidden scroll-mt-24 py-10 target:block">
          <h2 id="consultation-heading" className="font-serif text-3xl text-ink">Arrange an IV sedation consultation</h2>
          <p className="mt-4 max-w-xl leading-7 text-ink-muted">
            Call or text our Roseville front desk and let us know you would like
            an IV sedation consultation. We will answer your questions and find
            a calm time to come in.
          </p>
          <div className="mt-6 flex flex-wrap gap-3"><SedationContactActions /></div>
          <a href="#routine-booking" className="mt-5 inline-block underline underline-offset-4">Book a routine visit online</a>
        </section>
        <div id="routine-booking" className="wrap-wide scroll-mt-24 grid gap-8 py-10 sm:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:items-start lg:gap-10 lg:py-20">
          <iframe
            data-jarvis-scheduler
            src={jarvisScheduleSrc}
            title="Book an appointment at Waikiki Dental"
            loading="lazy"
            className="block w-full min-h-[50rem] border-0 sm:min-h-[37.5rem]"
          />
          <AppointmentOfficeContact />
        </div>
      </section>
    </>
  );
}
