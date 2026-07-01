"use client";

import { Reveal } from "@/components/rb/Reveal";

interface CardData {
  displayNum: string;
  title: string;
  desc: string;
}

interface ImpactProps { cards: CardData[] }

export function ImpactSection({ cards }: ImpactProps) {
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
          {cards.map((card, i) => (
            <Reveal key={card.displayNum} direction="up" delay={i * 100}>
              <ImpactCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCard({ displayNum, title, desc }: CardData) {
  return (
    <div style={styles.card}>
      <span style={styles.cardNum}>{displayNum}</span>
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
