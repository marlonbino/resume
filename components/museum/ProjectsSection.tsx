"use client";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

// ── data ──────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    num: "01",
    period: "2025 — Present",
    role: "Backend Developer",
    title: "OPENHMIS",
    subtitle: "Open Health Management Information System",
    image: "/project-openhmis.jpg",
    desc: "Building the backend for an open-source health system used in Kenyan public facilities. Django and FastAPI handle the API layer, Celery and RabbitMQ process the async work, PostgreSQL and Redis store everything. All running in Docker.",
    linkLabel: "BITZ-IT-Consulting-LTD/OPENHMIS",
    linkHref: "https://github.com/BITZ-IT-Consulting-LTD/OPENHMIS",
    linkType: "Repository",
    tags: ["Django", "FastAPI", "Celery", "RabbitMQ", "PostgreSQL", "Redis", "Docker"],
  },
  {
    num: "02",
    period: "2024",
    role: "Full-stack",
    title: "Elyon Driving",
    subtitle: "School Management System",
    image: "/project-elyon.jpg",
    desc: "A full management system for a driving school — handles student sign-ups, instructor schedules, lesson tracking, and progress. Built to replace the WhatsApp groups and paper registers they were using before.",
    linkLabel: "elyon-driving",
    linkHref: "https://github.com/marlonbino/elyon-driving",
    linkType: "Repository",
    tags: ["Django", "PostgreSQL", "Docker", "React"],
  },
  {
    num: "03",
    period: "2025",
    role: "ML",
    title: "NER DistilBERT",
    subtitle: "Named Entity Recognition",
    image: "/project-ner2.jpg",
    desc: "Fine-tuned DistilBERT on NER tasks, tracked every experiment with MLflow, then shipped it to Hugging Face so anyone can use it. Has a FastAPI endpoint for direct integration.",
    linkLabel: "ner-distilbert",
    linkHref: "https://huggingface.co/marlonbino/ner-distilbert-base-cased",
    linkType: "Model",
    tags: ["PyTorch", "Transformers", "MLflow", "FastAPI"],
  },
  {
    num: "04",
    period: "2025",
    role: "ML",
    title: "Opus-MT SW→EN",
    subtitle: "Swahili to English Translation",
    image: "/project-translate.jpg",
    desc: "Fine-tuned a translation model that converts Swahili to English. Ran seven training iterations tracked in MLflow before publishing on Hugging Face. Meant to be useful for East African developers who need it.",
    linkLabel: "opus-mt-sw-en",
    linkHref: "https://huggingface.co/marlonbino/opus-mt-sw-en-finetuned",
    linkType: "Model",
    tags: ["PyTorch", "Opus-MT", "MLflow", "Hugging Face"],
  },
];

interface Project {
  num: string;
  period: string;
  role: string;
  title: string;
  subtitle: string;
  image: string;
  desc: string;
  linkLabel: string;
  linkHref: string;
  linkType: string;
  tags: string[];
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
function SectionHeader() {
  return (
    <div style={{ marginBottom: 64 }}>
      <p className="roman-label" style={{ marginBottom: 12 }}>III — Projects</p>
      <h2 style={{
        fontFamily: "var(--font-serif), serif",
        fontWeight: 300,
        fontSize: "clamp(28px, 4.5vw, 52px)",
        lineHeight: 1.15,
        color: "var(--text-primary)",
        marginBottom: 12,
      }}>
        Things I&apos;ve actually <em>shipped</em>.
      </h2>
      <p style={{
        fontFamily: "var(--font-serif), serif",
        fontStyle: "italic",
        fontSize: 16,
        color: "var(--text-secondary)",
        maxWidth: 440,
        lineHeight: 1.7,
      }}>
        Click a number to stop on a project. Let go to keep moving.
      </p>
    </div>
  );
}

// ── SlideArea ─────────────────────────────────────────────────────────────────
interface SlideAreaProps {
  current: Project;
  active: number;
  paused: boolean;
  total: number;
  onDotClick: (i: number) => void;
  onTogglePause: () => void;
}

function SlideArea({ current, active, paused, total, onDotClick, onTogglePause }: SlideAreaProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Main slide */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          border: "1px solid",
          borderColor: hovered ? "rgba(200,164,85,0.45)" : "var(--border)",
          overflow: "hidden",
          background: "var(--surface)",
          minHeight: 460,
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
          boxShadow: hovered
            ? "0 0 0 1px rgba(200,164,85,0.2), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(200,164,85,0.08)"
            : "none",
        }}
      >
        {/* Image pane */}
        <div style={{ position: "relative", minHeight: 320 }}>
          <Image
            key={current.image}
            src={current.image}
            alt={current.title}
            fill
            style={{
              objectFit: "cover",
              animation: "fadeIn 0.6s ease",
              filter: hovered ? "brightness(0.92) saturate(1.05)" : "brightness(0.75) saturate(0.85)",
              transition: "filter 0.4s ease",
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: hovered
              ? "linear-gradient(to right, rgba(8,6,4,0.15), transparent)"
              : "linear-gradient(to right, rgba(8,6,4,0.4), transparent)",
            transition: "background 0.4s ease",
          }} />
          {/* Big ghost number */}
          <span style={{
            position: "absolute",
            bottom: 16,
            left: 20,
            fontFamily: "var(--font-serif), serif",
            fontStyle: "italic",
            fontSize: "clamp(72px, 14vw, 140px)",
            color: "rgba(245,240,232,0.08)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}>
            {current.num}
          </span>
        </div>

        {/* Content pane */}
        <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)" }}>{current.period}</span>
              <span style={{ color: "var(--border)", fontSize: 12 }}>·</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-dim)" }}>{current.role}</span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 3.2vw, 36px)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: 6,
              animation: "fadeIn 0.5s ease",
            }}>
              {current.title}
            </h3>
            <p style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--gold)",
              marginBottom: 20,
              opacity: 0.8,
              animation: "fadeIn 0.5s ease",
            }}>
              {current.subtitle}
            </p>
            <p style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: "clamp(16px, 1.6vw, 18px)",
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: 24,
              animation: "fadeIn 0.6s ease",
            }}>
              {current.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {current.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  border: "1px solid var(--border)",
                  padding: "3px 10px",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href={current.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--gold-light)",
              textDecoration: "underline",
              textDecorationColor: "rgba(212,170,106,0.4)",
              textUnderlineOffset: "3px",
              transition: "color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-light)")}
          >
            {current.linkType} → {current.linkLabel}
          </a>
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        flexWrap: "wrap",
        gap: 16,
      }}>
        {/* Numbered dots */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {projects.map((p, i) => (
            <button
              key={p.num}
              onClick={() => onDotClick(i)}
              aria-label={`Go to project ${p.num}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 0",
                opacity: i === active ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}
            >
              <span style={{
                display: "block",
                width: i === active ? 28 : 8,
                height: 2,
                background: i === active ? "var(--gold-light)" : "var(--text-dim)",
                transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s",
              }} />
              <span style={{
                fontFamily: "var(--font-serif), serif",
                fontStyle: "italic",
                fontSize: 12,
                color: i === active ? "var(--gold-light)" : "var(--text-dim)",
                transition: "color 0.2s",
              }}>
                {p.num}
              </span>
            </button>
          ))}
        </div>

        {/* Pause / play */}
        <button
          onClick={onTogglePause}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "6px 16px",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
            (e.currentTarget as HTMLElement).style.color = "var(--gold-light)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % projects.length);
  }, []);

  useEffect(() => {
    if (paused || projects.length === 0) return;
    timerRef.current = setInterval(advance, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance]);

  if (projects.length === 0) return null;

  const current = projects[active];

  return (
    <section id="projects" style={{ padding: "120px 48px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <SectionHeader />
        </ScrollReveal>
        <SlideArea
          current={current}
          active={active}
          paused={paused}
          total={projects.length}
          onDotClick={(i) => { setActive(i); setPaused(true); }}
          onTogglePause={() => setPaused((p) => !p)}
        />
      </div>
    </section>
  );
}
