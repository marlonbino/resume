"use client";

import { Reveal } from "@/components/rb/Reveal";

interface TimelineItem {
  period: string;
  org: string;
  role: string;
  desc: string;
  tags?: readonly string[];
}

interface ExperienceProps { items: TimelineItem[] }

export function ExperienceSection({ items }: ExperienceProps) {
  return (
    <section id="experience" style={styles.section}>
      <div style={styles.inner}>
        <Reveal direction="up">
          <div style={styles.header}>
            <span style={styles.sectionLabel}>Experience</span>
            <h2 style={styles.heading}>The path so far.</h2>
          </div>
        </Reveal>

        <div style={styles.timeline}>
          {items.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 100}>
              <TimelineEntry item={item} isLast={i === items.length - 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  return (
    <div style={{ ...styles.entry, ...(isLast ? styles.entryLast : {}) }}>
      {/* Dot */}
      <div style={styles.dot} />

      <div style={styles.entryContent}>
        <span style={styles.period}>{item.period}</span>
        <p style={styles.org}>{item.org}</p>
        <p style={styles.role}>{item.role}</p>
        <p style={styles.desc}>{item.desc}</p>
        {item.tags && (
          <div style={styles.tags}>
            {item.tags.map((tag) => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "120px 48px",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    marginBottom: 64,
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
  timeline: {
    borderLeft: "1px solid",
    borderImageSource: "linear-gradient(to bottom, var(--teal), transparent)",
    borderImageSlice: 1,
    display: "flex",
    flexDirection: "column",
    gap: 0,
    paddingLeft: 0,
    marginLeft: 4,
  },
  entry: {
    position: "relative",
    paddingLeft: 40,
    paddingBottom: 52,
  },
  entryLast: {
    paddingBottom: 0,
  },
  dot: {
    position: "absolute",
    left: -4,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--gold)",
    boxShadow: "0 0 0 2px var(--teal)",
  },
  entryContent: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  period: {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "var(--teal-light)",
    display: "block",
    marginBottom: 4,
  },
  org: {
    fontFamily: "var(--font-serif)",
    fontSize: 20,
    fontWeight: 400,
    color: "var(--text-primary)",
    margin: 0,
    lineHeight: 1.3,
  },
  role: {
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    color: "var(--gold)",
    margin: 0,
    letterSpacing: "0.03em",
  },
  desc: {
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
    margin: "8px 0 0 0",
    maxWidth: 640,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 8,
    marginTop: 14,
  },
  tag: {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--text-dim)",
    border: "1px solid var(--border)",
    padding: "4px 10px",
    background: "var(--surface)",
  },
};
