import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactPage,
  DoctorPage,
  NewPatientsPage,
  OfficePage,
  ServicePage,
  ServicesHubPage,
  TestimonialsPage,
} from "@/components/page-templates";
import { absoluteUrl, findService, pageRoutes, site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const staticPages: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "michael-narodovich-dmd": {
    title: "Michael Narodovich, DMD",
    description:
      "Meet Dr. Michael Narodovich, Roseville dentist focused on safe, comfortable, patient-first dental care.",
  },
  "roseville-dental-care": {
    title: "Roseville Dental Care",
    description:
      "Explore Waikiki Dental services including family dentistry, cosmetic dentistry, orthodontics, implants, same-day crowns, and sedation.",
  },
  "waikiki-dental-roseville": {
    title: "Waikiki Dental Roseville Office",
    description:
      "Learn about Waikiki Dental's Roseville office, standards of care, prevention focus, safety, and patient experience.",
  },
  "new-patients": {
    title: "New Patients",
    description:
      "New patient information for Waikiki Dental in Roseville, including insurance, payment options, CareCredit, and forms.",
  },
  "patient-testimonials": {
    title: "Patient Testimonials",
    description:
      "Read patient testimonials for Waikiki Dental, a warm and welcoming Roseville dental office.",
  },
  "contact-waikiki-dental": {
    title: "Contact Waikiki Dental",
    description:
      "Contact Waikiki Dental in Roseville, CA. Book online, call or text, view hours, and get directions.",
  },
};

export function generateStaticParams() {
  return pageRoutes.filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug];
  const service = findService(slug);

  const title = page?.title ?? service?.title ?? "Waikiki Dental";
  const description = page?.description ?? service?.summary ?? site.description;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${slug}/`),
    },
    openGraph: {
      title: `${title} | Waikiki Dental`,
      description,
      url: absoluteUrl(`/${slug}/`),
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "michael-narodovich-dmd") return <DoctorPage />;
  if (slug === "roseville-dental-care") return <ServicesHubPage />;
  if (slug === "waikiki-dental-roseville") return <OfficePage />;
  if (slug === "new-patients") return <NewPatientsPage />;
  if (slug === "patient-testimonials") return <TestimonialsPage />;
  if (slug === "contact-waikiki-dental") return <ContactPage />;

  const service = findService(slug);
  if (service) return <ServicePage service={service} />;

  notFound();
}
