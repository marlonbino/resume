import type { Metadata } from "next";
import { MuseumNav } from "@/components/museum/MuseumNav";
import { HeroSection } from "@/components/museum/HeroSection";
import { AboutSection } from "@/components/museum/AboutSection";
import { ExpertiseSection } from "@/components/museum/ExpertiseSection";
import { ProjectsSection } from "@/components/museum/ProjectsSection";
import { ExperienceSection } from "@/components/museum/ExperienceSection";
import { ContactSection } from "@/components/museum/ContactSection";
import { SectionTransition } from "@/components/museum/SectionTransition";
import { LoadingScreen } from "@/components/museum/LoadingScreen";
import { ScrollProgressRing } from "@/components/museum/ScrollProgressRing";
import { StepsSection } from "@/components/museum/StepsSection";

const siteUrl = "https://marlonamunga.vercel.app";
const title = "Marlon Isaiah Amunga — Software Developer";
const description =
  "Backend developer at Bitz, Nairobi. I build Django and FastAPI systems, set up async pipelines, and ship ML models that actually work in production.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Marlon Amunga",
    "Marlon Isaiah Amunga",
    "Software Developer Nairobi",
    "Backend Developer Kenya",
    "Django Developer",
    "FastAPI Developer",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Marlon Amunga",
    type: "profile",
    images: [{ url: `${siteUrl}/hero-dev.jpg`, width: 2848, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/hero-dev.jpg`],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marlon Isaiah Amunga",
  jobTitle: "Software Developer",
  url: siteUrl,
  worksFor: { "@type": "Organization", name: "Bitz" },
  email: "mailto:marlon.gmx1@gmail.com",
  sameAs: ["https://github.com/marlonbino"],
};

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LoadingScreen />
      <ScrollProgressRing />
      <MuseumNav />

      {/* Hero — no wipe, it's the entry point */}
      <HeroSection />

      <SectionTransition curtainColor="var(--bg)">
        <AboutSection />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg)">
        <StepsSection />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg-2)">
        <ExpertiseSection />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg)">
        <ProjectsSection />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg-2)">
        <ExperienceSection />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg)">
        <ContactSection />
      </SectionTransition>
    </div>
  );
}
