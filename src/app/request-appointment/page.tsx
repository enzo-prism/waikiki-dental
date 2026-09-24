import type { Metadata } from "next";
import { AppointmentRequest } from "@/components/appointment-scheduler";
import { JsonLd } from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Request an appointment at Waikiki Dental in Roseville — tell us who you are, a preferred day, and how to reach you. The team confirms by phone or text.";

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
      <AppointmentRequest />
    </>
  );
}
