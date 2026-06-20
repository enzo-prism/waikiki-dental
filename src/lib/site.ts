import {
  BadgeCheck,
  CalendarCheck,
  HeartPulse,
  MapPin,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  WandSparkles,
} from "lucide-react";
import type { ComponentType } from "react";

export const site = {
  name: "Waikiki Dental",
  doctor: "Michael Narodovich, DMD",
  phone: "(916) 772-6248",
  phoneHref: "tel:+19167726248",
  email: "office@waikikidental.com",
  emailHref: "mailto:office@waikikidental.com",
  address: "1271 Pleasant Grove Blvd. Suite #100, Roseville, CA 95747",
  shortAddress: "1271 Pleasant Grove Blvd., Roseville, CA",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=1271%20Pleasant%20Grove%20Blvd%20Suite%20100%20Roseville%20CA%2095747",
  bookingHref:
    "https://bookit.dentrixascend.com/v1/view/organization/3061/index.html?mode=externalLink",
  baseUrl: "https://waikiki-dental.vercel.app",
  description:
    "Modern family, cosmetic, implant, and sedation dentistry in Roseville, CA with Dr. Michael Narodovich and the Waikiki Dental team.",
};

export const hours = [
  ["Monday", "9:00 AM - 5:00 PM"],
  ["Tuesday", "9:00 AM - 6:00 PM"],
  ["Wednesday", "8:00 AM - 5:00 PM"],
  ["Thursday", "9:00 AM - 6:00 PM"],
  ["Friday", "8:00 AM - 4:00 PM"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

/* ------------------------------------------------------------------ *
 * Dr. Narodovich — single source of truth for bio + credentials.
 * Previously duplicated across DoctorSpotlight and DoctorPage.
 * ------------------------------------------------------------------ */
export const doctor = {
  name: "Michael Narodovich, DMD",
  role: "Founder · Lead Dentist",
  initials: "MN",
  credentials: [
    "The Ohio State University",
    "Temple University",
    "Sedation dentistry",
    "CEREC same-day crowns",
  ],
  bio: [
    "Dr. Mike was born and raised in Cleveland, Ohio, earned his Bachelor of Science from The Ohio State University, and received his dental training from Temple University in Philadelphia before settling in Northern California.",
    "His passion for safe, comfortable treatment for even the most fearful patients led him to sedation dentistry — helping people receive the care they need with less stress and more confidence. Outside the office, he loves the beauty of Northern California and Lake Tahoe snowfall.",
  ],
};

/* Service categories — used to group the 14 services for scannability + SEO. */
export type ServiceCategoryKey =
  | "preventive"
  | "cosmetic"
  | "restorative"
  | "orthodontics"
  | "sedation"
  | "emergency";

export const serviceCategories: {
  key: ServiceCategoryKey;
  label: string;
  description: string;
}[] = [
  {
    key: "preventive",
    label: "Preventive & Family",
    description: "Cleanings, exams, and gentle care for every age.",
  },
  {
    key: "cosmetic",
    label: "Cosmetic",
    description: "Whitening, bonding, veneers, and full smile makeovers.",
  },
  {
    key: "restorative",
    label: "Restorative & Implants",
    description: "Fillings, same-day crowns, and tooth replacement.",
  },
  {
    key: "orthodontics",
    label: "Orthodontics",
    description: "Invisalign clear aligners and traditional braces.",
  },
  {
    key: "sedation",
    label: "Sedation & Comfort",
    description: "Anxiety-friendly options for relaxed visits.",
  },
  {
    key: "emergency",
    label: "Emergency",
    description: "Prompt care for pain, breaks, and urgent concerns.",
  },
];

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  category: ServiceCategoryKey;
  summary: string;
  description: string;
  highlights: string[];
  icon: ComponentType<{ className?: string }>;
  image?: string;
};

export const services: Service[] = [
  {
    title: "Cleanings & Exams",
    slug: "cleanings-exams",
    eyebrow: "Preventive care",
    category: "preventive",
    summary:
      "Thorough dental exams, cleanings, x-rays, and oral health guidance for lasting wellness.",
    description:
      "Waikiki Dental is proud to provide dental examinations and cleanings in Roseville with a prevention-first approach. Routine care helps preserve natural teeth, monitor gum health, screen for oral cancer, and catch problems early.",
    highlights: [
      "Comprehensive dental exams",
      "Diagnostic x-rays when needed",
      "Oral cancer and gum health screenings",
      "Cleanings designed around your smile",
    ],
    icon: Stethoscope,
  },
  {
    title: "Composite Fillings",
    slug: "composite-fillings",
    eyebrow: "Natural restorations",
    category: "restorative",
    summary:
      "Tooth-colored fillings that repair decay while blending naturally with your smile.",
    description:
      "Composite fillings restore strength and appearance after tooth decay or small fractures. The material is shaded to your tooth color for a clean, natural-looking result.",
    highlights: [
      "Tooth-colored repair",
      "Conservative treatment planning",
      "Comfort-focused visits",
      "Long-term oral health support",
    ],
    icon: SmilePlus,
  },
  {
    title: "Digital X-Ray",
    slug: "digital-x-ray",
    eyebrow: "Advanced diagnostics",
    category: "preventive",
    summary:
      "Modern imaging helps the team evaluate teeth, roots, bone, and restorations clearly.",
    description:
      "Digital x-rays support accurate diagnosis by helping identify decay, bone loss, root position, cysts, and other concerns that may not be visible during a visual exam.",
    highlights: [
      "Clear diagnostic images",
      "Helps catch hidden concerns",
      "Supports precise treatment planning",
      "Part of comprehensive care",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Early Dental Care",
    slug: "early-dental-care",
    eyebrow: "Family dentistry",
    category: "preventive",
    summary:
      "Gentle early visits help children build comfort, confidence, and healthy habits.",
    description:
      "Early dental care gives families a foundation for prevention, education, and confidence. Waikiki Dental supports patients with gentle guidance and age-appropriate care.",
    highlights: [
      "Friendly first visits",
      "Prevention and education",
      "Family-centered communication",
      "Healthy habits from the start",
    ],
    icon: HeartPulse,
  },
  {
    title: "Smile Makeover",
    slug: "smile-makeover",
    eyebrow: "Cosmetic planning",
    category: "cosmetic",
    summary:
      "A custom blend of cosmetic options designed to refresh your smile and confidence.",
    description:
      "A smile makeover can combine whitening, bonding, veneers, crowns, orthodontic care, or implant dentistry into one personalized plan based on your goals.",
    highlights: [
      "Personalized cosmetic roadmap",
      "Options for color, shape, and alignment",
      "Designed around your goals",
      "Confidence-focused outcomes",
    ],
    icon: Sparkles,
  },
  {
    title: "Dental Bonding",
    slug: "dental-bonding",
    eyebrow: "Cosmetic dentistry",
    category: "cosmetic",
    summary:
      "A conservative way to refine chips, small gaps, discoloration, and uneven edges.",
    description:
      "Dental bonding uses tooth-colored material to make targeted cosmetic improvements, often with a conservative and efficient visit.",
    highlights: [
      "Repairs small chips",
      "Improves uneven edges",
      "Tooth-colored finish",
      "Conservative cosmetic option",
    ],
    icon: WandSparkles,
  },
  {
    title: "Same Day Crowns",
    slug: "roseville-cerec-same-day-crowns",
    eyebrow: "CEREC technology",
    category: "restorative",
    summary:
      "CEREC same-day crowns use digital scanning and in-office milling for efficient restorations.",
    description:
      "With CEREC, Dr. Narodovich uses CAD/CAM tools and an in-house milling machine to plan, prepare, and place a strong porcelain crown in a single visit to the Roseville office.",
    highlights: [
      "Digital scanning instead of goopy impressions",
      "Porcelain crowns made in office",
      "Useful for broken, weak, or worn teeth",
      "Designed for strength and aesthetics",
    ],
    icon: CalendarCheck,
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    eyebrow: "Brighter smile",
    category: "cosmetic",
    summary:
      "Professional whitening options designed to lift stains and refresh your smile.",
    description:
      "Professional teeth whitening can brighten years of discoloration and help you feel more confident in everyday photos, work, and social moments.",
    highlights: [
      "Professional guidance",
      "Stain and discoloration support",
      "Cosmetic boost with simple planning",
      "Pairs well with smile makeovers",
    ],
    icon: Sparkles,
  },
  {
    title: "Veneers",
    slug: "veneers",
    eyebrow: "Porcelain cosmetics",
    category: "cosmetic",
    summary:
      "Natural-looking veneers can refine chipped, stained, worn, or uneven teeth.",
    description:
      "Porcelain veneers are designed to enhance the visible shape, color, and balance of your smile while keeping results polished and natural-looking.",
    highlights: [
      "Improves smile shape and color",
      "Natural-looking porcelain finish",
      "Useful for chips and uneven teeth",
      "Personalized cosmetic design",
    ],
    icon: WandSparkles,
  },
  {
    title: "Invisalign",
    slug: "roseville-invisalign",
    eyebrow: "Clear aligners",
    category: "orthodontics",
    summary:
      "Straighten teeth discreetly with removable clear aligners customized for your smile.",
    description:
      "Invisalign clear aligners apply carefully controlled forces to move teeth into a better position while remaining removable for meals, brushing, and flossing.",
    highlights: [
      "Clear, removable aligners",
      "Comfortable alternative to braces",
      "Supports easier brushing and flossing",
      "Customized digital treatment planning",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Traditional Braces",
    slug: "traditional-braces",
    eyebrow: "Orthodontics",
    category: "orthodontics",
    summary:
      "Reliable orthodontic care for alignment, bite function, and confident smiles.",
    description:
      "Traditional braces remain a trusted option for many orthodontic needs, especially when careful control is needed to improve alignment and bite function.",
    highlights: [
      "Time-tested orthodontic option",
      "Supports complex alignment needs",
      "Improves bite function",
      "Personalized treatment planning",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Dental Implants",
    slug: "roseville-dental-implants",
    eyebrow: "Tooth replacement",
    category: "restorative",
    summary:
      "Durable, natural-looking tooth replacement designed to restore comfort and function.",
    description:
      "Dental implants replace missing teeth with a titanium post, abutment, and custom crown. They can support a single tooth, multiple teeth, or more extensive restorations.",
    highlights: [
      "Permanent tooth replacement option",
      "Restores chewing confidence",
      "Designed to look and feel natural",
      "Helps protect jawbone health",
    ],
    icon: SmilePlus,
  },
  {
    title: "IV Sedation",
    slug: "iv-sedation",
    eyebrow: "Anxiety-friendly care",
    category: "sedation",
    summary:
      "Sedation dentistry helps anxious patients receive care in a calm, comfortable setting.",
    description:
      "Dr. Narodovich has focused training in sedation dentistry for patients who feel fearful, have sensitive gag reflexes, or need longer treatment completed with more comfort.",
    highlights: [
      "Helpful for dental anxiety",
      "Deep relaxation while monitored",
      "Can support longer treatment visits",
      "Designed around patient comfort",
    ],
    icon: Syringe,
  },
  {
    title: "Dental Emergencies",
    slug: "dental-emergencies",
    eyebrow: "Urgent dental care",
    category: "emergency",
    summary:
      "Prompt support for dental pain, broken teeth, injuries, and urgent concerns.",
    description:
      "When a dental emergency occurs, Waikiki Dental makes every effort to see and care for patients as quickly as possible.",
    highlights: [
      "Tooth pain and swelling",
      "Broken or fractured teeth",
      "Lost or damaged restorations",
      "Call the office for urgent guidance",
    ],
    icon: HeartPulse,
  },
];

export const featuredServices = services.filter((service) =>
  [
    "cleanings-exams",
    "roseville-cerec-same-day-crowns",
    "roseville-invisalign",
    "roseville-dental-implants",
    "iv-sedation",
    "dental-emergencies",
  ].includes(service.slug),
);

/** Services grouped by category, in `serviceCategories` order, skipping empties. */
export function servicesByCategory() {
  return serviceCategories
    .map((category) => ({
      ...category,
      items: services.filter((service) => service.category === category.key),
    }))
    .filter((group) => group.items.length > 0);
}

export const serviceAliases: Record<string, string> = {
  "roseville-family-dentist": "cleanings-exams",
  "family-dentistry": "cleanings-exams",
  "cosmetic-dentistry": "smile-makeover",
  orthodontics: "roseville-invisalign",
};

/* ------------------------------------------------------------------ *
 * Social proof. These three quotes are real public testimonials.
 * `reviewStats.count` is intentionally null — set it to the VERIFIED
 * Google review count (and update `href`) before launch so the site
 * never displays a fabricated number.
 * ------------------------------------------------------------------ */
export const reviewStats = {
  rating: 5.0,
  count: null as number | null,
  source: "Google",
  href: "https://www.google.com/maps/search/?api=1&query=Waikiki%20Dental%20Roseville%20CA",
};

export const testimonials = [
  {
    quote:
      "Always a great experience at Waikiki Dental. Professional and very friendly staff and doctor.",
    name: "Robert M.",
    location: "Roseville, CA",
  },
  {
    quote:
      "We love Waikiki Dental. The culture is warm and welcoming, and the doctor and staff are gentle and friendly. Highly recommend!",
    name: "Rosanne P.",
    location: "Roseville, CA",
  },
  {
    quote:
      "I've been looking for a dentist for awhile because I'm terrified of going. I was referred to Waikiki Dental by a friend and couldn't be happier.",
    name: "Lindsay F.",
    location: "Roseville, CA",
  },
];

export const navItems = [
  { label: "Services", href: "/roseville-dental-care/" },
  { label: "Dr. Narodovich", href: "/michael-narodovich-dmd/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Reviews", href: "/patient-testimonials/" },
  { label: "Contact", href: "/contact-waikiki-dental/" },
];

export const trustPoints = [
  "Accepting new patients",
  "Family, cosmetic, implant, and sedation dentistry",
  "CEREC same-day crowns",
  "Anxiety-friendly care",
];

/* New-patient hook — built only on facts the practice already states
   (accepting new patients, most PPO plans, CareCredit). No fabricated promos. */
export const newPatientOffer = {
  eyebrow: "Now accepting new patients",
  title: "Your first visit, made easy.",
  body: "Same-week appointments are often available. Most PPO dental insurance is welcome, and CareCredit financing helps make treatment plans manageable.",
  points: [
    "Most PPO dental insurance accepted",
    "CareCredit financing available",
    "Online forms before you arrive",
  ],
};

/* Insurance & financing trust strip. Text-based by design — only
   references the practice's stated options (CareCredit + most PPO plans). */
export const paymentOptions = {
  insuranceNote: "Most PPO dental insurance welcome",
  items: [
    "Most PPO plans",
    "CareCredit financing",
    "Visa · Mastercard · Amex",
    "Cash & check",
  ],
};

/* Emergency fast-path — surfaced in the header utility bar. */
export const emergency = {
  label: "Dental emergency?",
  cta: "Same-day care",
  href: "/dental-emergencies/",
};

/* Guided appointment-request flow (the on-site scheduler). */
export const scheduleHref = "/request-appointment/";

export type AppointmentReason = {
  key: string;
  label: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
};

export const appointmentReasons: AppointmentReason[] = [
  {
    key: "new-patient",
    label: "New patient visit",
    hint: "Exam, cleaning & X-rays",
    icon: Sparkles,
  },
  {
    key: "cleaning",
    label: "Cleaning or checkup",
    hint: "Routine preventive care",
    icon: Stethoscope,
  },
  {
    key: "cosmetic",
    label: "Cosmetic consult",
    hint: "Whitening, veneers, Invisalign",
    icon: WandSparkles,
  },
  {
    key: "restorative",
    label: "Crown, filling or implant",
    hint: "Repair or replace a tooth",
    icon: SmilePlus,
  },
  {
    key: "emergency",
    label: "Tooth pain or emergency",
    hint: "We'll prioritize urgent care",
    icon: HeartPulse,
  },
  {
    key: "other",
    label: "Something else",
    hint: "Tell us what you need",
    icon: CalendarCheck,
  },
];

export const timeWindows = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "any", label: "Any time" },
];

export const pageRoutes = [
  "",
  "michael-narodovich-dmd",
  "roseville-dental-care",
  "waikiki-dental-roseville",
  "new-patients",
  "patient-testimonials",
  "contact-waikiki-dental",
  "request-appointment",
  ...services.map((service) => service.slug),
  ...Object.keys(serviceAliases),
];

/* ------------------------------------------------------------------ *
 * Imagery — self-hosted in /public/media for fast, reliable LCP.
 * These are tasteful placeholders; swap each file with a real photo
 * of the Roseville office/team (same filename) when available.
 * `doctorPortrait` is intentionally null until a real headshot of
 * Dr. Narodovich exists — the UI shows a branded monogram instead of
 * passing a stock face off as the doctor.
 * ------------------------------------------------------------------ */
export const heroImage = "/media/office-hero.jpg";
export const careImage = "/media/care-room.jpg";
export const consultImage = "/media/consult.jpg";
export const doctorPortrait: string | null = null;

export const dentistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: `${site.name} - Roseville`,
  url: site.baseUrl,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1271 Pleasant Grove Blvd. Suite #100",
    addressLocality: "Roseville",
    addressRegion: "CA",
    postalCode: "95747",
    addressCountry: "US",
  },
  medicalSpecialty: [
    "Family Dentistry",
    "Cosmetic Dentistry",
    "Orthodontics",
    "Dental Implants",
    "Sedation Dentistry",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  areaServed: ["Roseville", "Granite Bay", "Rocklin", "Lincoln"],
};

export function findService(slug: string) {
  const normalized = serviceAliases[slug] ?? slug;
  return services.find((service) => service.slug === normalized);
}

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${normalized}`;
}

export { MapPin };
