import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Imagery is self-hosted in /public/media, so no remote patterns are needed.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.waikikidental.com" }],
        destination: "https://waikikidental.com/:path*",
        permanent: true,
      },
      { source: "/cosmetic-dentistry/", destination: "/smile-makeover/", permanent: true },
      { source: "/roseville-family-dentist/", destination: "/cleanings-exams/", permanent: true },
      {
        source: "/dental-blog/2746154-say-goodbye-to-dental-anxiety-with-iv-sedation/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      { source: "/iv-sedation-roseville/", destination: "/iv-sedation/", permanent: true },
      { source: "/orthodontist-roseville/", destination: "/orthodontics/", permanent: true },
      { source: "/roseville-dental-emergencies/", destination: "/dental-emergencies/", permanent: true },
      { source: "/roseville-teeth-whitening/", destination: "/teeth-whitening/", permanent: true },
      { source: "/roseville-veneers/", destination: "/veneers/", permanent: true },
      { source: "/appointments/", destination: "/request-appointment/", permanent: true },
      { source: "/dental-implants/", destination: "/roseville-dental-implants/", permanent: true },
      { source: "/invisalign/", destination: "/roseville-invisalign/", permanent: true },
      { source: "/meet-our-doctors/", destination: "/michael-narodovich-dmd/", permanent: true },
      { source: "/michael-narodovich-dds/", destination: "/michael-narodovich-dmd/", permanent: true },
      { source: "/privacy-policy/", destination: "/privacy-practices/", permanent: true },
      { source: "/our-practice/", destination: "/waikiki-dental-roseville/", permanent: true },
      { source: "/contact/", destination: "/contact-waikiki-dental/", permanent: true },
      { source: "/our-practice/testimonials/", destination: "/patient-testimonials/", permanent: true },
      { source: "/patient-reviews/", destination: "/patient-testimonials/", permanent: true },
      { source: "/procedures/restorations/dental-implants/", destination: "/roseville-dental-implants/", permanent: true },
      { source: "/dental-implants/full-arch-replacement/", destination: "/roseville-dental-implants/", permanent: true },
      { source: "/procedures/dental-anxiety-and-fear/", destination: "/iv-sedation/", permanent: true },
      { source: "/six-month-smiles/", destination: "/orthodontics/", permanent: true },
      { source: "/dental-blog/", destination: "/iv-sedation/", permanent: true },
      {
        source: "/dental-blog/2758117-relaxation-dentist-sedation-roseville-ca/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      {
        source: "/dental-blog/2758118-the-benefits-of-iv-sedation/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      {
        source: "/dental-blog/2758133-sedation-dentistry-in-roseville-ca/",
        destination: "/iv-sedation/",
        permanent: true,
      },
      { source: "/dental-blog/archive-202508/", destination: "/iv-sedation/", permanent: true },
      { source: "/dental-blog/archive-202606/", destination: "/iv-sedation/", permanent: true },
      { source: "/dental-blog/archive-202607/", destination: "/iv-sedation/", permanent: true },
      {
        source: "/dental-blog/category/sedation-dentistry/",
        destination: "/iv-sedation/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
