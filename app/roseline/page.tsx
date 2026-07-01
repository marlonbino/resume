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
import { reader }            from "@/lib/keystatic-reader";

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
    images: [{ url: `${siteUrl}/about-ros2.jpeg`, width: 1041, height: 1151 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/about-ros2.jpeg`],
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

export default async function RoselinePage() {
  const [hero, about, contact, impactRaw, expRaw, eduRaw, projRaw] = await Promise.all([
    reader.singletons.roseline_hero.read(),
    reader.singletons.roseline_about.read(),
    reader.singletons.roseline_contact.read(),
    reader.collections.roseline_impact.all(),
    reader.collections.roseline_experience.all(),
    reader.collections.roseline_education.all(),
    reader.collections.roseline_projects.all(),
  ]);

  const impact     = impactRaw.sort((a, b) => a.entry.order - b.entry.order).map(i => i.entry);
  const experience = expRaw.sort((a, b) => a.entry.order - b.entry.order).map(e => e.entry);
  const education  = eduRaw.sort((a, b) => a.entry.order - b.entry.order).map(e => e.entry);
  const projects   = projRaw.sort((a, b) => a.entry.order - b.entry.order).map(p => p.entry);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LoadingScreen />
      <Nav />
      <HeroSection eyebrow={hero!.eyebrow} bio={hero!.bio} />
      <AboutSection
        heading={about!.heading}
        paragraph1={about!.paragraph1}
        paragraph2={about!.paragraph2}
        location={about!.location}
      />
      <ImpactSection cards={impact} />
      <ExperienceSection items={experience} />
      <EducationSection cards={education} />
      <ProjectsSection projects={projects} />
      <ContactSection
        email={contact!.email}
        linkedinUrl={contact!.linkedinUrl}
        location={contact!.location}
        availability={contact!.availability}
        whatsappNumber={contact!.whatsappNumber}
        introParagraph={contact!.introParagraph}
      />
    </div>
  );
}
