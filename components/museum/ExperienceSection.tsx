"use client";
import { ScrollReveal } from "@/components/ScrollReveal";

const timeline = [
  {
    period: "2025 — Present",
    org: "Bitz IT Consulting",
    role: "Software Developer · Nairobi",
    desc: "Backend developer working across multiple health and enterprise platforms. Django, FastAPI, async task queues, PostgreSQL — building the parts that users never see but can't do without.",
    tags: ["Django", "FastAPI", "Celery", "RabbitMQ", "PostgreSQL", "Redis", "Docker"],
  },
  {
    period: "2021 — 2025",
    org: "Independent",
    role: "Freelance Developer · Remote",
    desc: "Took on client work as a Next.js developer — landing pages, dashboards, small web apps. Kept things simple and shipped on time.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    period: "2021 — 2025",
    org: "KCA University",
    role: "BSc. Software Development · Nairobi",
    desc: "Studied software development with a focus on systems and machine learning. That's where the interest in backend and ML started.",
    tags: ["Python", "ML", "Systems", "Algorithms"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" style={{ padding: "120px 48px", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: 72 }}>
            <p className="roman-label" style={{ marginBottom: 12 }}>IV — Experience</p>
            <h2 style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 4.5vw, 52px)",
              lineHeight: 1.15,
              color: "var(--text-primary)",
            }}>
              A timeline, told slowly.
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ position: "relative" }}>
          {/* Vertical hairline */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 1,
            background: "linear-gradient(to bottom, var(--gold), rgba(180,144,80,0.1))",
            opacity: 0.3,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {timeline.map((item, i) => (
              <ScrollReveal key={item.org} delay={i * 100}>
                <div style={{ paddingLeft: 40, position: "relative" }}>
                  {/* Dot */}
                  <div style={{
                    position: "absolute",
                    left: -4,
                    top: 6,
                    width: 8,
                    height: 8,
                    background: i === 0 ? "var(--gold)" : "var(--bg-2)",
                    border: "1px solid",
                    borderColor: i === 0 ? "var(--gold)" : "rgba(180,144,80,0.4)",
                  }} />

                  <p style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                    marginBottom: 10,
                  }}>
                    {item.period}
                  </p>

                  <h3 style={{
                    fontFamily: "var(--font-serif), serif",
                    fontWeight: 400,
                    fontSize: "clamp(20px, 2.5vw, 26px)",
                    color: "var(--text-primary)",
                    marginBottom: 4,
                  }}>
                    {item.org}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-serif), serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "var(--gold)",
                    marginBottom: 16,
                    opacity: 0.75,
                  }}>
                    {item.role}
                  </p>

                  <p style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: "clamp(17px, 1.7vw, 19px)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.9,
                    maxWidth: 640,
                    marginBottom: 20,
                    fontWeight: 400,
                  }}>
                    {item.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                          padding: "2px 10px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
