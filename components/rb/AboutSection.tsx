"use client";

import Image from "next/image";
import { Reveal } from "@/components/rb/Reveal";

export function AboutSection() {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.inner}>
        {/* Left: Image */}
        <Reveal direction="left">
          <div style={styles.imageCol}>
            <div style={styles.imageWrapper}>
              <Image
                src="/about-ros2.jpeg"
                alt="Roseline Buyeka"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <p style={styles.caption}>Healthcare leader · Seattle, WA</p>
          </div>
        </Reveal>

        {/* Right: Text */}
        <Reveal direction="right" delay={150}>
          <div style={styles.textCol}>
            <span style={styles.sectionLabel}>About</span>
            <h2 style={styles.heading}>Healthcare leader. 18 years in.</h2>
            <div style={styles.hairline} />
            <p style={styles.paragraph}>
              I lead clinical services at ICHS in Seattle — a federally qualified community health center serving 32,000+ patients across 5 sites. My work sits at the intersection of clinical operations, population health, and health equity. I've spent my career building systems that actually reach the people who need them most.
            </p>
            <p style={styles.paragraph}>
              I'm appointed to the WA Maternal Mortality Review Panel, sit on the board of Mother Africa, and hold a DNP from the University of Washington.
            </p>
            <p style={styles.location}>↳ Seattle, WA · linkedin.com/in/roseline-buyeka</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "120px 48px",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 64,
    alignItems: "center",
  },
  imageCol: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  imageWrapper: {
    position: "relative",
    aspectRatio: "4 / 5",
    maxWidth: 420,
    width: "100%",
    overflow: "hidden",
  },
  caption: {
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    fontStyle: "italic",
    color: "var(--text-dim)",
    letterSpacing: "0.04em",
    marginTop: 8,
  },
  textCol: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  sectionLabel: {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--teal)",
    marginBottom: 16,
    display: "block",
  },
  heading: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(2rem, 4vw, 2.75rem)",
    fontWeight: 400,
    color: "var(--text-primary)",
    lineHeight: 1.15,
    margin: "0 0 24px 0",
  },
  hairline: {
    width: 48,
    height: 2,
    background: "linear-gradient(90deg, var(--teal), transparent)",
    marginBottom: 28,
  },
  paragraph: {
    fontFamily: "var(--font-sans)",
    fontSize: 16,
    lineHeight: 1.8,
    color: "var(--text-secondary)",
    margin: "0 0 20px 0",
  },
  location: {
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    color: "var(--text-dim)",
    letterSpacing: "0.05em",
    marginTop: 12,
  },
};
