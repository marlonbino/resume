import { Nav }               from "@/components/rb/Nav";
import { HeroSection }       from "@/components/rb/HeroSection";
import { AboutSection }      from "@/components/rb/AboutSection";
import { ImpactSection }     from "@/components/rb/ImpactSection";
import { ExperienceSection } from "@/components/rb/ExperienceSection";
import { EducationSection }  from "@/components/rb/EducationSection";
import { ContactSection }    from "@/components/rb/ContactSection";

export const metadata = {
  title: "Roseline Buyeka, DNP, MPH, RN — Nurse Executive & Healthcare Leader",
  description:
    "Nurse executive with 18+ years in healthcare. Director of Clinical Services at ICHS, Seattle. DNP candidate at University of Washington.",
};

export default function RoselinePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }} className="grain">
      <Nav />
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
