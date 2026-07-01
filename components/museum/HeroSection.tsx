"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = ["/hero-dev.jpg", "/hero-dev2.jpg"];

interface HeroProps { eyebrow: string; bio: string }

export function HeroSection({ eyebrow, bio }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  const [heroImg] = useState(
    () => heroImages[Math.floor(Math.random() * heroImages.length)]
  );
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed hero image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={heroImg}
          alt="Developer workspace"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,6,4,0.55)" }} />
        {/* Vignette */}
        <div
          className="museum-vignette"
          style={{ position: "absolute", inset: 0 }}
        />
        {/* Bottom gradient fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, transparent, var(--bg))" }} />
      </div>

      {/* Hero text — anchored to bottom, top padding clears the fixed nav */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "auto",
          padding: "0 48px 80px",
          maxWidth: 720,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      >
        <p style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,170,106,0.6)",
          marginBottom: 20,
        }}>
          {eyebrow}
        </p>

        <h1 style={{
          fontFamily: "var(--font-serif), serif",
          fontWeight: 300,
          fontSize: "clamp(40px, 7vw, 88px)",
          lineHeight: 0.95,
          color: "var(--text-primary)",
          marginBottom: 32,
          letterSpacing: "-0.02em",
        }}>
          Marlon<br />
          <span style={{ fontStyle: "italic" }}>Isaiah</span><br />
          Amunga<span style={{ color: "var(--gold-light)" }}>.</span>
        </h1>

        <p style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          maxWidth: 540,
          marginBottom: 40,
        }}>
          {bio}
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 17,
              textDecoration: "underline",
              textDecorationColor: "rgba(212,170,106,0.5)",
              textUnderlineOffset: "4px",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
          >
            Walk the gallery
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: 17,
              textDecoration: "underline",
              textDecorationColor: "rgba(138,127,110,0.4)",
              textUnderlineOffset: "4px",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
          >
            Start a conversation
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: 32,
        right: 48,
        zIndex: 2,
        opacity: loaded ? 0.5 : 0,
        transition: "opacity 1s ease 1s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}>
        <div style={{
          width: 1,
          height: 48,
          background: "linear-gradient(to bottom, transparent, var(--gold))",
          animation: "subtlePulse 2s ease-in-out infinite",
        }} />
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", writingMode: "vertical-rl" }}>
          Scroll to enter
        </p>
      </div>
    </section>
  );
}
