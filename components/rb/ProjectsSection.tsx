"use client";

import { Reveal } from "@/components/rb/Reveal";

interface Project {
  label: string;
  client: string;
  title: string;
  desc: string;
  tags: string[];
  delay: number;
}

const projects: Project[] = [
  {
    label: "Consultancy · DNP Capstone",
    client: "State of Alaska Division of Public Health",
    title: "Tuberculosis Case Management Systems Initiative",
    desc: "Led a systems-level initiative to strengthen tuberculosis case management and public health infrastructure across Alaska. Designed and implemented frameworks to improve TB detection, treatment adherence, and cross-agency coordination within the state's Division of Public Health.",
    tags: ["Public Health Systems", "TB Case Management", "Policy Design", "Infrastructure Strengthening"],
    delay: 0,
  },
  {
    label: "Consultancy · DNP Clinical Placement",
    client: "Washington Board of Nursing (WABON)",
    title: "Nursing Workforce Development & Education Policy",
    desc: "Contributed to statewide nursing education and workforce policy through a clinical placement with the Washington Board of Nursing. Presented original research at the Council on Nursing Education in WA State (CNEWS) Conference and directly to the WABON Board. Served as a member of the Washington Center for Nursing (WCN) Technical Taskforce on Nursing Education Research.",
    tags: ["Workforce Policy", "Nursing Education", "Research & Presentation", "Taskforce Leadership"],
    delay: 120,
  },
];

export function ProjectsSection() {
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
            <Reveal key={i} direction="up" delay={project.delay}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ label, client, title, desc, tags }: Omit<Project, "delay">) {
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
