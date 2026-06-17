"use client";
import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const rooms = [
  {
    num: "01",
    title: "Backend Systems",
    desc: "Django and FastAPI services that age well — clear contracts, honest errors, observability baked in from day one.",
    tags: ["Python", "Django", "FastAPI", "REST"],
  },
  {
    num: "02",
    title: "Async & Event-Driven",
    desc: "Long-running work pushed off the request path — task queues, brokers, and idempotent workers that keep producing under load.",
    tags: ["Celery", "RabbitMQ", "Redis", "Cron"],
  },
  {
    num: "03",
    title: "Data & Storage",
    desc: "PostgreSQL as the source of truth, Redis for the hot path. Schemas designed for the questions a product will actually ask.",
    tags: ["PostgreSQL", "Redis", "SQL", "Migrations"],
  },
  {
    num: "04",
    title: "Machine Learning",
    desc: "Fine-tuned transformers shipped to Hugging Face with MLflow-tracked runs — models that live behind APIs, not in notebooks.",
    tags: ["PyTorch", "Transformers", "MLflow", "Hugging Face"],
  },
  {
    num: "05",
    title: "Cloud & DevOps",
    desc: "Dockerised services on AWS with small, reversible deployments — the boring discipline that lets the interesting work ship.",
    tags: ["AWS", "Docker", "Compose", "CI/CD"],
  },
  {
    num: "06",
    title: "Frontend Craft",
    desc: "React, Next.js and TypeScript when the backend needs a face — interfaces with the pacing of physical objects.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
];

function RoomCard({ room, delay }: { room: typeof rooms[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div
        className="exhibit-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: "1px solid",
          borderColor: hovered ? "rgba(180,144,80,0.35)" : "rgba(180,144,80,0.12)",
          padding: "32px 28px",
          background: hovered ? "rgba(180,144,80,0.04)" : "transparent",
          position: "relative",
          cursor: "default",
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        {/* Number */}
        <p style={{
          fontFamily: "var(--font-serif), serif",
          fontStyle: "italic",
          fontSize: 32,
          color: hovered ? "rgba(180,144,80,0.25)" : "rgba(180,144,80,0.12)",
          position: "absolute",
          top: 20,
          right: 24,
          lineHeight: 1,
          transition: "color 0.3s",
          userSelect: "none",
        }}>{room.num}</p>

        <h3 style={{
          fontFamily: "var(--font-serif), serif",
          fontWeight: 400,
          fontSize: "clamp(18px, 2.2vw, 22px)",
          color: "var(--text-primary)",
          marginBottom: 14,
          lineHeight: 1.3,
        }}>
          {room.title}
        </h3>

        {/* Description — hidden until hover */}
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? 120 : 0,
          opacity: hovered ? 1 : 0,
          marginBottom: hovered ? 20 : 0,
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, margin-bottom 0.3s ease",
        }}>
          <p style={{
            fontFamily: "var(--font-serif), serif",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.6vw, 18px)",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
          }}>
            {room.desc}
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {room.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                padding: "3px 10px",
                transition: "color 0.2s, border-color 0.2s",
                ...(hovered ? { color: "var(--gold)", borderColor: "rgba(180,144,80,0.3)" } : {}),
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      style={{ padding: "120px 48px", background: "var(--bg-2)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: 72 }}>
            <p className="roman-label" style={{ marginBottom: 12 }}>II — Expertise</p>
            <h2 style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 4.5vw, 52px)",
              lineHeight: 1.15,
              color: "var(--text-primary)",
            }}>
              What I actually <em>know</em>.
            </h2>
            <p style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--text-secondary)",
              marginTop: 16,
              maxWidth: 480,
              lineHeight: 1.8,
            }}>
              Things I&apos;ve used in real projects, not just listed on a CV. Hover any card to read more.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 1,
          border: "1px solid var(--border)",
        }}>
          {rooms.map((room, i) => (
            <RoomCard key={room.num} room={room} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
