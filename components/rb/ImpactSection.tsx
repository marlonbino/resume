"use client";

import { Reveal } from "@/components/rb/Reveal";

interface CardData {
  num: string;
  title: string;
  desc: string;
  delay: number;
}

const cards: CardData[] = [
  {
    num: "30%",
    title: "Transition of Care scale-up",
    desc: "Scaled TOC services for high-risk patients by 30% and increased program reimbursement by 26% in 2025.",
    delay: 0,
  },
  {
    num: "33%",
    title: "Diabetes care expansion",
    desc: "Expanded Diabetes Self-Management Education by 33%, strengthening chronic disease management across 5 sites.",
    delay: 100,
  },
  {
    num: "40%+",
    title: "ED follow-up outreach",
    desc: "Implemented an ED discharge follow-up program for patients 65+, increasing outreach by over 40% within two months.",
    delay: 200,
  },
  {
    num: "100%",
    title: "Regulatory compliance",
    desc: "Achieved 100% compliance in AAAHC accreditation and the 2025 CHPW Annual Care Management Audit.",
    delay: 300,
  },
];

export function ImpactSection() {
  return (
    <section id="impact" style={styles.section}>
      <div style={styles.inner}>
        <Reveal direction="up">
          <div style={styles.header}>
            <span style={styles.sectionLabel}>Impact</span>
            <h2 style={styles.heading}>What the work has looked like.</h2>
          </div>
        </Reveal>

        <div style={styles.grid}>
          {cards.map((card) => (
            <Reveal key={card.num} direction="up" delay={card.delay}>
              <ImpactCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCard({ num, title, desc }: Omit<CardData, "delay">) {
  return (
    <div style={styles.card}>
      <span style={styles.cardNum}>{num}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{desc}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 48px",
    background: "var(--bg-2)",
    borderTop: "3px solid transparent",
    borderImage: "linear-gradient(90deg, var(--teal), var(--teal-light), transparent) 1",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    marginBottom: 56,
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
    fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
    fontWeight: 400,
    color: "var(--text-primary)",
    lineHeight: 1.2,
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  },
  card: {
    border: "1px solid var(--border)",
    padding: "32px 28px",
    background: "var(--surface)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "border-color 0.2s ease, transform 0.2s ease",
    cursor: "default",
  },
  cardNum: {
    fontFamily: "var(--font-serif)",
    fontSize: "2.5rem",
    fontWeight: 400,
    color: "var(--teal)",
    lineHeight: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: 18,
    fontWeight: 600,
    color: "var(--text-primary)",
    margin: 0,
  },
  cardDesc: {
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
    margin: 0,
  },
};
