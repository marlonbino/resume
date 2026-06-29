import type { Metadata } from "next";
import { LoadingScreen }     from "@/components/rb/LoadingScreen";
import { Nav }               from "@/components/rb/Nav";
import { HeroSection }       from "@/components/rb/HeroSection";
import { AboutSection }      from "@/components/rb/AboutSection";
import { ImpactSection }     from "@/components/rb/ImpactSection";
import { ExperienceSection } from "@/components/rb/ExperienceSection";
import { EducationSection }  from "@/components/rb/EducationSection";
import { ProjectsSection }   from "@/components/rb/ProjectsSection";
import { ContactSection }    from "@/components/rb/ContactSection";

// Update this once roselineondeche.co.ke is live and set as the primary domain.
const siteUrl = "https://roselineondeche.vercel.app";
const title = "Roseline Buyeka, DNP, MPH, MSN, BSN, RN — Nurse Executive & Healthcare Leader";
const description =
  "Nurse executive with 18+ years in healthcare. Director of Clinical Services at ICHS, Seattle. DNP holder from the University of Washington.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Roseline Buyeka",
    "Roseline Ondeche",
    "Roseline Ondeche Buyeka",
    "Ondeche",
    "Nurse Executive Seattle",
    "Healthcare Leader",
    "Director of Clinical Services ICHS",
    "DNP University of Washington",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Roseline Buyeka",
    type: "profile",
    images: [{ url: `${siteUrl}/og-roseline.jpg`, width: 1000, height: 1000 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og-roseline.jpg`],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Roseline Buyeka",
  alternateName: ["Roseline Ondeche", "Roseline Ondeche Buyeka", "Ondeche"],
  jobTitle: "Director of Clinical Services",
  url: siteUrl,
  worksFor: { "@type": "Organization", name: "ICHS" },
  email: "mailto:ondeche@gmail.com",
  sameAs: ["https://linkedin.com/in/roseline-buyeka"],
};

export default function RoselinePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LoadingScreen />
      <Nav />
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
