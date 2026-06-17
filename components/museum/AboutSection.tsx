"use client";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 48px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Portrait image */}
        <ScrollReveal direction="left">
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                overflow: "hidden",
                maxWidth: 420,
              }}
              className="img-spotlight"
            >
              <Image
                src="/portrait-figure.jpg"
                alt="Self-portrait"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
            {/* Caption plaque */}
            <div
              style={{
                marginTop: 16,
                borderLeft: "1px solid var(--border)",
                paddingLeft: 16,
              }}
            >
              <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 16, color: "var(--text-muted)" }}>
                Self-portrait · 2026
              </p>
              <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 16, color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.7 }}>
                &ldquo;The medium is code; the subject is people.&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal direction="right" delay={150}>
          <div>
            <p style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 20,
            }}>
              Current focus
            </p>

            <h2 style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 1.25,
              color: "var(--text-primary)",
              marginBottom: 28,
            }}>
              Full-stack leaning backend — Django, FastAPI, React. I take the work wherever it needs to go.
            </h2>

            <div className="hairline" style={{ marginBottom: 28 }} />

            <p style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "clamp(18px, 1.9vw, 21px)",
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              marginBottom: 32,
              fontWeight: 400,
            }}>
              I&apos;ve been writing code since 2021 and I still enjoy it. I like backends that are boring in the best way — clear, honest, easy to hand off. The ML side is something I picked up along the way and kept because it&apos;s actually useful.
            </p>

            <p style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 13,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}>
              ↳ Nairobi · Kenya
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
