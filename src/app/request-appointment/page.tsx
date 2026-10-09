import type { Metadata } from "next";
import { AppointmentRequest } from "@/components/appointment-scheduler";
import { JsonLd } from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Request an appointment at Waikiki Dental in Roseville — tell us who you are, a preferred day, and how to reach you. The team confirms by phone or text.";

const jarvisScheduleSrc =
  "https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000335";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Dental Appointment",
  description,
  path: "/request-appointment/",
});

// Static page: `?reason=<key>` is read on the client (see AppointmentRequest),
// so this route no longer opts into dynamic rendering via searchParams.
export default function RequestAppointmentPage() {
  return (
    <>
      <JsonLd />
      <section className="overflow-x-clip bg-surface-alt">
        <div className="wrap-wide pt-10 sm:pt-16 lg:pt-20">
          <iframe
            src={jarvisScheduleSrc}
            title="Book an appointment at Waikiki Dental"
            loading="lazy"
            className="block w-full min-h-[50rem] border-0 sm:min-h-[37.5rem]"
          />
        </div>
      </section>
      <AppointmentRequest />
    </>
  );
}
