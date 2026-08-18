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
    "https://schedule.jarvisanalytics.com/frame/drmike-dtxa?location_id=2721782163260582",
  baseUrl: "https://waikiki-dental.vercel.app",
  description:
    "Waikiki Dental is Dr. Michael Narodovich's Roseville, CA practice — IV sedation, implants, CEREC same-day crowns, and unhurried family care for patients who want dentistry without the dread.",
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
  role: "Owner · Dentist",
  initials: "MN",
  credentials: [
    "The Ohio State University, BS",
    "Temple University, DMD",
    "Sedation-focused training",
  ],
  bio: [
    "Dr. Mike grew up in Cleveland, Ohio, earned his Bachelor of Science at The Ohio State University, and trained in dentistry at Temple University in Philadelphia before making Northern California home.",
    "Watching fearful patients put off care for years drew him to sedation dentistry — and shaped a practice built around helping people get the treatment they need with less stress and more confidence. Away from the office, you'll find him out enjoying Northern California, happiest when fresh snow lands on Lake Tahoe.",
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
    description: "Exams, cleanings, and healthy habits for every age in the house.",
  },
  {
    key: "cosmetic",
    label: "Cosmetic",
    description: "Small refinements or a whole new smile — your call.",
  },
  {
    key: "restorative",
    label: "Restorative & Implants",
    description: "Repair, rebuild, replace — often in a single visit.",
  },
  {
    key: "orthodontics",
    label: "Orthodontics",
    description: "Straighter teeth, with or without the brackets.",
  },
  {
    key: "sedation",
    label: "Sedation & Comfort",
    description: "Real relaxation for people who dread the chair.",
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
      "The unhurried checkup: a careful cleaning, a thorough exam, and straight answers about what we see.",
    description:
      "Great dentistry is mostly quiet maintenance. Routine exams and cleanings at the Roseville office help you keep your natural teeth, watch gum health closely, screen for oral cancer, and catch small problems while they're still small.",
    highlights: [
      "Comprehensive exams with honest findings",
      "Diagnostic X-rays only when needed",
      "Oral cancer and gum health screenings",
      "Cleanings paced around your comfort",
    ],
    icon: Stethoscope,
  },
  {
    title: "Composite Fillings",
    slug: "composite-fillings",
    eyebrow: "Natural-looking repair",
    category: "restorative",
    summary:
      "Tooth-colored fillings that erase decay and blend in so well you'll forget which tooth it was.",
    description:
      "When decay or a small fracture needs repair, a composite filling restores the tooth's strength with material shaded to match your enamel — conservative, comfortable, and invisible in a smile.",
    highlights: [
      "Shaded to match your natural teeth",
      "Conservative, tooth-preserving repair",
      "Comfort-first visits",
      "Durable protection for everyday chewing",
    ],
    icon: SmilePlus,
  },
  {
    title: "Digital X-Ray",
    slug: "digital-x-ray",
    eyebrow: "Sharper diagnostics",
    category: "preventive",
    summary:
      "Clear digital imaging that shows what a visual exam can't — roots, bone, and problems still hiding.",
    description:
      "Digital X-rays let the team see below the surface: early decay between teeth, bone changes, root position, cysts, and trouble brewing under older dental work. Better images mean earlier, simpler treatment.",
    highlights: [
      "Finds decay before it hurts",
      "Reveals root and bone health",
      "Supports precise treatment planning",
      "A cornerstone of every thorough exam",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Early Dental Care",
    slug: "early-dental-care",
    eyebrow: "Kids & first visits",
    category: "preventive",
    summary:
      "First visits that feel like a win — so kids grow up thinking the dentist is no big deal.",
    description:
      "The best gift you can give a young smile is a calm start. Early visits at Waikiki Dental stay gentle and pressure-free, teaching habits that stick while confidence builds one easy appointment at a time.",
    highlights: [
      "Gentle, unrushed first appointments",
      "Prevention and brushing coaching",
      "Family-centered communication",
      "Healthy habits that last a lifetime",
    ],
    icon: HeartPulse,
  },
  {
    title: "Smile Makeover",
    slug: "smile-makeover",
    eyebrow: "Cosmetic planning",
    category: "cosmetic",
    summary:
      "Whitening, veneers, bonding, alignment — combined into one plan built around the smile you actually want.",
    description:
      "A smile makeover isn't one procedure; it's a plan. Dr. Narodovich blends whitening, bonding, veneers, crowns, orthodontics, or implants into a sequence designed around your goals and your timeline.",
    highlights: [
      "One roadmap, tailored to you",
      "Addresses color, shape, and alignment",
      "Sequenced at your pace",
      "Designed for a natural result",
    ],
    icon: Sparkles,
  },
  {
    title: "Dental Bonding",
    slug: "dental-bonding",
    eyebrow: "Small fixes, big difference",
    category: "cosmetic",
    summary:
      "A chip, a small gap, a rough edge — often refined in a single conservative visit.",
    description:
      "Dental bonding uses tooth-colored material to smooth chips, close small gaps, and even out worn edges — usually while preserving healthy enamel. It's cosmetic dentistry's quickest win.",
    highlights: [
      "Repairs chips and worn edges",
      "Closes small gaps",
      "Blends invisibly with your enamel",
      "Often complete in one visit",
    ],
    icon: WandSparkles,
  },
  {
    title: "Same Day Crowns",
    slug: "roseville-cerec-same-day-crowns",
    eyebrow: "CEREC technology",
    category: "restorative",
    summary:
      "A porcelain crown designed, milled, and placed before you leave — one visit, no temporaries.",
    description:
      "With CEREC, Dr. Narodovich scans your tooth digitally, designs the crown with CAD/CAM tools, and mills it from strong porcelain right in the Roseville office. You walk out with the finished crown the same day.",
    highlights: [
      "Digital scans, no goopy impressions",
      "No temporary crown, no second visit",
      "Milled in-office from strong porcelain",
      "Built for strength and a natural look",
    ],
    icon: CalendarCheck,
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    eyebrow: "Brighter, evenly",
    category: "cosmetic",
    summary:
      "Professional whitening that lifts years of coffee, tea, and time — safely and evenly.",
    description:
      "Professional whitening reaches the deeper discoloration that drugstore strips leave behind, brightening your smile evenly with a plan matched to your teeth and your timeline.",
    highlights: [
      "Lifts deep, set-in stains",
      "Even, natural-looking brightness",
      "Professional guidance start to finish",
      "Pairs well with a smile makeover",
    ],
    icon: Sparkles,
  },
  {
    title: "Veneers",
    slug: "veneers",
    eyebrow: "Porcelain veneers",
    category: "cosmetic",
    summary:
      "Fine porcelain shells that redesign the shape, color, and balance of your smile — tooth by tooth.",
    description:
      "Veneers dress the visible surface of a tooth in polished porcelain, correcting chips, stains, wear, and unevenness in one elegant move. Done well, nobody can tell — they just notice the smile.",
    highlights: [
      "Corrects chips, stains, and wear",
      "Custom shape and shade per tooth",
      "Polished, natural-looking porcelain",
      "A long-term cosmetic upgrade",
    ],
    icon: WandSparkles,
  },
  {
    title: "Invisalign",
    slug: "roseville-invisalign",
    eyebrow: "Clear aligners",
    category: "orthodontics",
    summary:
      "Straighter teeth with clear, removable aligners — no brackets, no wires, no obvious “braces phase.”",
    description:
      "Invisalign moves teeth with a series of nearly invisible aligners you can remove for meals, brushing, and big moments. Digital treatment planning shows where your smile is headed before you begin.",
    highlights: [
      "Nearly invisible in daily life",
      "Removable for eating and brushing",
      "Digitally planned tooth movement",
      "A comfortable alternative to braces",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Traditional Braces",
    slug: "traditional-braces",
    eyebrow: "Orthodontics",
    category: "orthodontics",
    summary:
      "The workhorse of orthodontics — precise, dependable alignment for bites that need real control.",
    description:
      "Some smiles need the control only brackets and wires provide. Traditional braces remain the most dependable way to correct complex alignment and bite issues, with predictable, lasting results.",
    highlights: [
      "Handles complex alignment needs",
      "Precise control of tooth movement",
      "Improves bite function and comfort",
      "Proven, time-tested results",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Dental Implants",
    slug: "roseville-dental-implants",
    eyebrow: "Tooth replacement",
    category: "restorative",
    summary:
      "The closest thing to a new tooth: a titanium root and custom crown that look, feel, and chew like the real thing.",
    description:
      "An implant replaces the whole tooth, root included — a titanium post, an abutment, and a custom crown that behaves like it grew there. One tooth, several, or a more extensive restoration: the plan is built around you.",
    highlights: [
      "Looks and chews like a natural tooth",
      "Helps protect jawbone health",
      "Supports one tooth or several",
      "A permanent, confident fix",
    ],
    icon: SmilePlus,
  },
  {
    title: "IV Sedation",
    slug: "iv-sedation",
    eyebrow: "Anxiety-friendly care",
    category: "sedation",
    summary:
      "Deep, monitored relaxation — so years of put-off dentistry can be finished in calm, comfortable visits.",
    description:
      "This is the heart of the practice: patients who've avoided the dentist for years — fearful, or fighting a strong gag reflex — finally getting healthy in comfort. Dr. Narodovich's focused sedation training lets you rest, monitored throughout, while the work gets done.",
    highlights: [
      "Designed for dental fear and anxiety",
      "Helpful for strong gag reflexes",
      "More treatment in fewer visits",
      "Monitored continuously throughout",
    ],
    icon: Syringe,
  },
  {
    title: "Dental Emergencies",
    slug: "dental-emergencies",
    eyebrow: "Urgent care",
    category: "emergency",
    summary:
      "Tooth pain, a break, a lost crown — call now, and the team will make every effort to see you fast.",
    description:
      "Dental emergencies don't check your calendar first. If you're in pain or something broke, call the Roseville office — Waikiki Dental makes every effort to see and care for urgent cases as quickly as possible.",
    highlights: [
      "Tooth pain and swelling",
      "Chipped, cracked, or broken teeth",
      "Lost fillings, crowns, or restorations",
      "Call the office for urgent guidance",
    ],
    icon: HeartPulse,
  },
];

/** Home flagships — higher-ticket care, in visual priority order. */
export const featuredServiceSlugs = [
  "iv-sedation",
  "roseville-dental-implants",
  "roseville-cerec-same-day-crowns",
] as const;

export const featuredServices = featuredServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is Service => Boolean(service));

export const heroFacts = [
  "IV sedation for anxious patients",
  "CEREC crowns in one visit",
  "Now accepting new patients",
];

export const cerecProcess = [
  {
    title: "Scan",
    body: "A digital scan of the tooth — no goopy impressions.",
  },
  {
    title: "Design",
    body: "The crown is designed in-office with CAD/CAM tools.",
  },
  {
    title: "Mill",
    body: "Porcelain is milled in the Roseville office the same day.",
  },
  {
    title: "Place",
    body: "You leave with the finished crown — no temporary, no second visit.",
  },
];

export const implantProcess = [
  {
    title: "Plan",
    body: "The restoration is planned around the tooth — or teeth — you’re replacing.",
  },
  {
    title: "Root",
    body: "A titanium post is placed as a new root, helping protect jawbone health.",
  },
  {
    title: "Restore",
    body: "An abutment and custom crown complete a tooth that looks and chews like the real thing.",
  },
];

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
  rating: null as number | null,
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
  "Now welcoming new patients",
  "Family, cosmetic, implant & sedation dentistry",
  "CEREC crowns in a single visit",
  "Gentle with anxious patients",
];

/* New-patient hook — built only on facts stated on the public practice site. */
export const newPatientOffer = {
  eyebrow: "Now accepting new patients",
  title: "Your first visit, made simple.",
  body: "Most dental insurance plans are welcome, CareCredit financing keeps bigger treatment plans manageable, and your paperwork is handled online before you arrive. The team will help you confirm your benefits before any treatment begins.",
  points: [
    "Most dental insurance plans accepted",
    "CareCredit financing available",
    "Online forms before you arrive",
  ],
};

/* Insurance & financing trust strip, based on the public new-patient page. */
export const paymentOptions = {
  insuranceNote: "Most dental insurance plans welcome",
  items: [
    "Most dental insurance plans",
    "CareCredit financing",
    "Major credit & debit cards",
    "Cash & check",
  ],
};

/* Emergency fast-path — surfaced in the header utility bar. */
export const emergency = {
  label: "Dental emergency?",
  cta: "Call for urgent availability",
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
 * `logo`, `logoIcon`, `doctorPortrait`, and `doctorCandid` are the
 * practice's real brand assets and photos, sourced from the current
 * public waikikidental.com site. `careImage` remains a tasteful
 * placeholder until a real Roseville office photo is available.
 * ------------------------------------------------------------------ */
export const brandAssets = {
  /** Full "Waikiki DENTAL" wordmark with hibiscus — transparent PNG, 511×73. */
  logo: "/media/logo.png",
  logoWidth: 511,
  logoHeight: 73,
  /** The hibiscus flower alone — transparent PNG, 75×73. */
  icon: "/media/hibiscus.png",
};
export const heroImage = "/media/dr-narodovich-patient.jpg";
export const heroImageAlt =
  "Dr. Michael Narodovich talking with a smiling patient in a treatment room at Waikiki Dental";
export const careImage = "/media/office-hero.jpg";
export const doctorPortrait: string | null = "/media/dr-narodovich.jpg";
export const doctorCandid = "/media/dr-narodovich-patient.jpg";
export const doctorCandidAlt =
  "Dr. Michael Narodovich chatting with a patient at the Roseville office";

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
