import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactPage,
  DoctorPage,
  NewPatientsPage,
  OfficePage,
  OrthodonticsPage,
  ServicePage,
  ServicesHubPage,
  TestimonialsPage,
} from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";
import {
  findService,
  pageRoutes,
  serviceAliases,
  site,
} from "@/lib/site";

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
    title: "Meet Michael Narodovich, DMD",
    description:
      "Meet Dr. Michael Narodovich, DMD — a Roseville dentist who leads with listening, with focused training in sedation dentistry for anxious patients.",
  },
  "roseville-dental-care": {
    title: "Dental Services in Roseville, CA",
    description:
      "Explore Waikiki Dental's full menu of Roseville dental care: cleanings, cosmetic dentistry, Invisalign, implants, CEREC same-day crowns, and IV sedation.",
  },
  "waikiki-dental-roseville": {
    title: "Our Roseville Dental Office",
    description:
      "Get to know Waikiki Dental's Roseville office — high standards, prevention-first care, uncompromising safety, and a genuinely relaxed patient experience.",
  },
  "new-patients": {
    title: "New Dental Patients in Roseville",
    description:
      "New to Waikiki Dental? Insurance, payment options, CareCredit financing, and online forms — everything sorted before your first Roseville visit.",
  },
  "patient-testimonials": {
    title: "4.9-Star Google Reviews",
    description:
      "Explore Waikiki Dental's 4.9-star Google rating, 426 patient reviews, recurring themes, and verified review highlights from Roseville patients.",
  },
  "contact-waikiki-dental": {
    title: "Contact Our Roseville Dental Office",
    description:
      "Contact Waikiki Dental in Roseville, CA — request an appointment online, call or text (916) 772-6248, send a message, or stop by 1271 Pleasant Grove Blvd.",
  },
  orthodontics: {
    title: "Orthodontics & Invisalign in Roseville, CA",
    description:
      "Compare Invisalign clear aligners and traditional braces at Waikiki Dental in Roseville, with a plan built around your smile, bite, and daily routine.",
  },
};

const aliasPages: Record<string, { title: string; description: string }> = {
  "roseville-family-dentist": {
    title: "Family Dentist in Roseville, CA",
    description:
      "Choose unhurried family dentistry in Roseville, with preventive exams, careful cleanings, honest guidance, and comfort-focused care at Waikiki Dental.",
  },
  "family-dentistry": {
    title: "Family Dentistry in Roseville, CA",
    description:
      "Explore gentle family dentistry in Roseville for children and adults, including preventive exams, cleanings, digital X-rays, and personalized treatment planning.",
  },
  "cosmetic-dentistry": {
    title: "Cosmetic Dentistry in Roseville, CA",
    description:
      "Explore cosmetic dentistry in Roseville, including whitening, bonding, veneers, Invisalign, and personalized smile makeover planning with Dr. Narodovich.",
  },
};

const serviceMetadata: Record<string, { title: string; description: string }> = {
  "roseville-invisalign": {
    title: "Invisalign in Roseville, CA",
    description:
      "Explore clear, removable Invisalign aligners in Roseville. See whether aligners fit your smile and bite, and request a consultation at Waikiki Dental.",
  },
  "iv-sedation": {
    title: "IV Sedation Dentistry in Roseville, CA",
    description:
      "Ask about monitored IV sedation dentistry in Roseville for dental anxiety, a strong gag reflex, or longer treatment visits at Waikiki Dental.",
  },
  "dental-emergencies": {
    title: "Emergency Dentist in Roseville, CA",
    description:
      "Call Waikiki Dental for urgent tooth pain, swelling, a broken tooth, or a lost filling or crown. The Roseville team will guide your next step.",
  },
  "digital-x-ray": {
    title: "Dental X-Rays in Roseville, CA",
    description:
      "Digital dental X-rays in Roseville help identify decay, root concerns, and bone changes that a visual exam cannot show. Learn what to expect.",
  },
  "roseville-cerec-same-day-crowns": {
    title: "CEREC Same-Day Crowns in Roseville, CA",
    description:
      "Restore a damaged tooth with a CEREC porcelain crown designed, milled, and placed at Waikiki Dental in one Roseville visit when appropriate.",
  },
  "teeth-whitening": {
    title: "Professional Teeth Whitening in Roseville, CA",
    description:
      "Brighten deep, set-in stains with professional teeth whitening planned around your smile, sensitivity, and goals at Waikiki Dental in Roseville.",
  },
  "roseville-dental-implants": {
    title: "Dental Implants in Roseville, CA",
    description:
      "Explore dental implants in Roseville for replacing one or more missing teeth with a stable, natural-looking restoration at Waikiki Dental.",
  },
};

// Routes that have their own dedicated folder (e.g. /request-appointment/)
// must be excluded here so the catch-all doesn't claim the same path.
const reservedRoutes = new Set(["request-appointment"]);

export function generateStaticParams() {
  return pageRoutes
    .filter((slug) => slug && !reservedRoutes.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug];
  const aliasPage = aliasPages[slug];
  const service = findService(slug);
  const serviceSeo = serviceMetadata[slug];

  const title =
    page?.title ??
    aliasPage?.title ??
    serviceSeo?.title ??
    (service ? `${service.title} in Roseville, CA` : "Roseville Dental Care");
  const description =
    page?.description ??
    aliasPage?.description ??
    serviceSeo?.description ??
    (service
      ? `${service.summary} Care is available at Waikiki Dental in Roseville, CA.`
      : site.description);
  const canonicalSlug = serviceAliases[slug] ?? slug;

  return createPageMetadata({
    title,
    description,
    path: `/${canonicalSlug}/`,
  });
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "michael-narodovich-dmd") return <DoctorPage />;
  if (slug === "roseville-dental-care") return <ServicesHubPage />;
  if (slug === "waikiki-dental-roseville") return <OfficePage />;
  if (slug === "new-patients") return <NewPatientsPage />;
  if (slug === "patient-testimonials") return <TestimonialsPage />;
  if (slug === "contact-waikiki-dental") return <ContactPage />;
  if (slug === "orthodontics") return <OrthodonticsPage />;

  const service = findService(slug);
  if (service) return <ServicePage service={service} />;

  notFound();
}
