"use client";

import { Reveal } from "@/components/rb/Reveal";

interface Project {
  label: string;
  client: string;
  title: string;
  desc: string;
  tags: readonly string[];
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" style={styles.section}>
      <div style={styles.inner}>
        <Reveal direction="up">
          <div style={styles.header}>
            <span style={styles.sectionLabel}>Consultancy &amp; Projects</span>
            <h2 style={styles.heading}>Systems-level work, beyond the role.</h2>
          </div>
        </Reveal>

        <div style={styles.grid}>
          {projects.map((project, i) => (
            <Reveal key={i} direction="up" delay={i * 120}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ label, client, title, desc, tags }: Project) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <span style={styles.label}>{label}</span>
        <div style={styles.divider} />
        <p style={styles.client}>{client}</p>
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{desc}</p>
      <div style={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "120px 48px",
    borderTop: "1px solid var(--border)",
  },
  inner: {
    maxWidth: 1400,
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 28,
  },
  card: {
    border: "1px solid var(--border)",
    padding: "36px 32px",
    background: "var(--surface)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  cardTop: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "var(--gold)",
    display: "block",
  },
  divider: {
    width: 32,
    height: 1,
    background: "var(--border)",
  },
  client: {
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    letterSpacing: "0.04em",
    color: "var(--text-dim)",
    margin: 0,
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
    fontWeight: 400,
    color: "var(--text-primary)",
    margin: 0,
    lineHeight: 1.35,
  },
  desc: {
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
    margin: 0,
    flexGrow: 1,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 8,
    marginTop: 4,
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
    background: "var(--bg)",
  },
};
