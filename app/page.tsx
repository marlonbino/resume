import type { Metadata } from "next";
import { MuseumNav }         from "@/components/museum/MuseumNav";
import { HeroSection }       from "@/components/museum/HeroSection";
import { AboutSection }      from "@/components/museum/AboutSection";
import { ExpertiseSection }  from "@/components/museum/ExpertiseSection";
import { ProjectsSection }   from "@/components/museum/ProjectsSection";
import { ExperienceSection } from "@/components/museum/ExperienceSection";
import { ContactSection }    from "@/components/museum/ContactSection";
import { SectionTransition } from "@/components/museum/SectionTransition";
import { LoadingScreen }     from "@/components/museum/LoadingScreen";
import { ScrollProgressRing } from "@/components/museum/ScrollProgressRing";
import { StepsSection }      from "@/components/museum/StepsSection";
import { reader }            from "@/lib/keystatic-reader";

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

export default async function Home() {
  const [hero, about, contact, stepsRaw, expertiseRaw, expRaw, projRaw] = await Promise.all([
    reader.singletons.marlon_hero.read(),
    reader.singletons.marlon_about.read(),
    reader.singletons.marlon_contact.read(),
    reader.collections.marlon_steps.all(),
    reader.collections.marlon_expertise.all(),
    reader.collections.marlon_experience.all(),
    reader.collections.marlon_projects.all(),
  ]);

  const steps     = stepsRaw.sort((a, b) => a.entry.order - b.entry.order).map(s => s.entry);
  const rooms     = expertiseRaw.sort((a, b) => a.entry.order - b.entry.order).map(r => r.entry);
  const experience = expRaw.sort((a, b) => a.entry.order - b.entry.order).map(e => e.entry);
  const projects  = projRaw.sort((a, b) => a.entry.order - b.entry.order).map(p => p.entry);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LoadingScreen />
      <ScrollProgressRing />
      <MuseumNav />

      <HeroSection eyebrow={hero!.eyebrow} heroImage={hero!.heroImage ?? ''} bio={hero!.bio} />

      <SectionTransition curtainColor="var(--bg)">
        <AboutSection heading={about!.heading} aboutImage={about!.aboutImage ?? ''} bio={about!.bio} location={about!.location} />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg)">
        <StepsSection steps={steps} />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg-2)">
        <ExpertiseSection rooms={rooms} />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg)">
        <ProjectsSection projects={projects} />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg-2)">
        <ExperienceSection items={experience} />
      </SectionTransition>

      <SectionTransition curtainColor="var(--bg)">
        <ContactSection
          blurb={contact!.blurb}
          email={contact!.email}
          githubUrl={contact!.githubUrl}
          huggingfaceUrl={contact!.huggingfaceUrl}
          availability={contact!.availability}
          whatsappNumber={contact!.whatsappNumber}
        />
      </SectionTransition>
    </div>
  );
}
