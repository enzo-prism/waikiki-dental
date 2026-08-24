import type { Metadata } from "next";
import { AppointmentScheduler } from "@/components/appointment-scheduler";
import { JsonLd } from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";

const description =
  "Request an appointment at Waikiki Dental in Roseville — tell us who you are, a preferred day, and how to reach you. The team confirms by phone or text.";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Dental Appointment",
  description,
  path: "/request-appointment/",
});

type Props = {
  searchParams: Promise<{ reason?: string | string[] }>;
};

export default async function RequestAppointmentPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.reason;
  const initialReason = Array.isArray(raw) ? raw[0] : raw;

  return (
    <>
      <JsonLd />
      <AppointmentScheduler initialReason={initialReason} />
    </>
  );
}
