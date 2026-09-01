import type { Metadata } from "next";
import { ArrowUpRight, FileText } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";

const baseMetadata = createPageMetadata({
  title: "Notice of Privacy Practices",
  description:
    "Read or download the Notice of Privacy Practices linked by the practice.",
  path: "/privacy-practices/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  robots: { index: false, follow: true },
};

export default function PrivacyPracticesPage() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="wrap">
        <div className="rounded-[2rem] border border-deep/10 bg-white p-7 shadow-sm sm:p-10">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-700">
            <FileText aria-hidden="true" className="size-6" />
          </div>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-ocean-700">
            Patient privacy
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-deep sm:text-5xl">
            Notice of Privacy Practices
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/75">
            This notice explains how medical information may be used and
            disclosed, and how patients can access that information. The PDF
            below is the exact notice that was linked by the practice before
            this website transition. Contact the office if you need to confirm
            which notice applies to your care.
          </p>
          <a
            href="/privacy-practices.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-sm font-semibold text-cream transition hover:bg-deep/90"
          >
            Open privacy notice (PDF)
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
