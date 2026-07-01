"use client";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Step { heading: string; body: string }

export function StepsSection({ steps }: { steps: Step[] }) {
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
        {steps.map((step, i) => {
          const num = String(i + 1).padStart(2, '0');
          return (
          <ScrollReveal key={i} delay={i * 140}>
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
                {num}
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
                {num}
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
          );
        })}
      </div>
    </section>
  );
}
