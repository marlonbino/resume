"use client";
import { ScrollReveal } from "@/components/ScrollReveal";

const steps = [
  {
    num: "01",
    heading: "The backend first",
    body: "I start with the API and work outward. Django or FastAPI depending on what the project needs — not on what's trendy.",
  },
  {
    num: "02",
    heading: "Async when it matters",
    body: "If a task shouldn't block a request, it doesn't. Celery, RabbitMQ, Redis — I've set these up enough times to know where they break.",
  },
  {
    num: "03",
    heading: "ML when it's useful",
    body: "Not every problem needs a model. When one actually helps, I'll fine-tune it, track the runs, and put it behind an endpoint that works.",
  },
];

export function StepsSection() {
  return (
    <section
      style={{
        padding: "100px 48px",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 0,
        }}
      >
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 140}>
            <div
              className="step-card"
              style={{
                padding: "48px 40px",
                borderRight: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Giant background number */}
              <span
                className="step-number"
                style={{ position: "absolute", top: 12, right: 20 }}
              >
                {step.num}
              </span>

              {/* Small label */}
              <p
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 20,
                  opacity: 0.85,
                }}
              >
                {step.num}
              </p>

              {/* Heading */}
              <h3
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontWeight: 400,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  lineHeight: 1.25,
                  color: "var(--text-primary)",
                  marginBottom: 16,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {step.heading}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontStyle: "italic",
                  fontSize: "clamp(17px, 1.7vw, 19px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  position: "relative",
                  zIndex: 1,
                  maxWidth: 320,
                }}
              >
                {step.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
