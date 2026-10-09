import type { Metadata } from "next";
import { AppointmentOfficeContact } from "@/components/appointment-office-contact";
import { JsonLd } from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Book an appointment at Waikiki Dental in Roseville, or call, text, or email the office.";

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
      <section className="overflow-x-clip bg-surface-alt">
        <div className="wrap-wide grid gap-8 py-10 sm:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] lg:items-start lg:gap-10 lg:py-20">
          <iframe
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
