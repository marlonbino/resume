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

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="grain">
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
