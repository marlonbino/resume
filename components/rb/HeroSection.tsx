"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// ─── Style constants ──────────────────────────────────────────────────────────
const sectionStyle: React.CSSProperties = {
  position:      "relative",
  width:         "100%",
  height:        "100dvh",
  minHeight:     640,
  overflow:      "hidden",
  display:       "flex",
  alignItems:    "flex-end",
};

const darkOverlayStyle: React.CSSProperties = {
  position:   "absolute",
  inset:      0,
  background: "rgba(8,12,11,0.58)",
  zIndex:     1,
};

const bottomFadeStyle: React.CSSProperties = {
  position:   "absolute",
  bottom:     0,
  left:       0,
  right:      0,
  height:     "45%",
  background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
  zIndex:     2,
};

const vignetteStyle: React.CSSProperties = {
  position:   "absolute",
  inset:      0,
  background: "radial-gradient(ellipse at center, transparent 35%, rgba(4,7,7,0.72) 100%)",
  zIndex:     2,
};

// ─── HeroSection ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      style={sectionStyle}
      aria-label="Hero — Roseline Buyeka"
    >
      {/* ── Background image ── */}
      <Image
        src="/hero-ros2.png"
        alt="Roseline Buyeka"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "35% top", zIndex: 0 }}
      />

      {/* ── Dark overlay ── */}
      <div style={darkOverlayStyle} />

      {/* ── Bottom gradient fade ── */}
      <div style={bottomFadeStyle} />

      {/* ── Vignette ── */}
      <div style={vignetteStyle} />

      {/* ── Hero content ── */}
      <HeroContent loaded={loaded} />

      {/* ── Scroll hint ── */}
      <ScrollHint />
    </section>
  );
}

// ─── HeroContent ─────────────────────────────────────────────────────────────
function HeroContent({ loaded }: { loaded: boolean }) {
  const base: React.CSSProperties = {
    opacity:    loaded ? 1 : 0,
    transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
  };

  const rise = (delay: number): React.CSSProperties => ({
    ...base,
    transform:        loaded ? "translateY(0)" : "translateY(28px)",
    transitionDelay:  `${delay}s`,
  });

  return (
    <div style={{
      position:   "relative",
      zIndex:     10,
      padding:    "0 clamp(24px, 6vw, 72px) clamp(48px, 7vh, 88px)",
      maxWidth:   680,
    }}>
      {/* Eyebrow */}
      <p className="section-label" style={{ ...rise(0.05), marginBottom: 20 }}>
        DNP · MPH · MSN · BSN · RN — Seattle, WA
      </p>

      {/* Name block */}
      <h1 style={{
        ...rise(0.15),
        fontFamily:    "var(--font-serif)",
        fontWeight:    300,
        lineHeight:    1.0,
        letterSpacing: "-0.02em",
        color:         "var(--text-primary)",
        fontSize:      "clamp(52px, 9vw, 110px)",
        margin:        0,
      }}>
        <span style={{ fontStyle: "italic" }}>Roseline</span><br />
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
          Buyeka
          <span style={{
            display:      "inline-block",
            width:        10,
            height:       10,
            borderRadius: "50%",
            background:   "var(--teal)",
            boxShadow:    "0 0 12px var(--teal)",
            marginBottom: 4,
            flexShrink:   0,
          }} />
        </span>
      </h1>

      {/* Hairline */}
      <div className="hairline" style={{ ...rise(0.25), margin: "24px 0", maxWidth: 320 }} />

      {/* Bio */}
      <p style={{
        ...rise(0.32),
        fontFamily:   "var(--font-sans)",
        fontSize:     15,
        lineHeight:   1.75,
        color:        "var(--text-secondary)",
        maxWidth:     480,
        marginBottom: 36,
      }}>
        18 years in healthcare. Right now I&rsquo;m Director of Clinical Services at ICHS
        in Seattle, working on what equitable care actually looks like in practice.
      </p>

      {/* CTA row */}
      <div style={{ ...rise(0.42), display: "flex", alignItems: "center", gap: 32 }}>
        <button
          onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
          style={ctaPrimaryStyle}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--teal-light)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
        >
          See my work
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={ctaSecondaryStyle}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)"; }}
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}

const ctaPrimaryStyle: React.CSSProperties = {
  fontFamily:      "var(--font-serif)",
  fontSize:        18,
  fontStyle:       "italic",
  fontWeight:      400,
  color:           "var(--text-primary)",
  background:      "transparent",
  border:          "none",
  borderBottom:    "1px solid var(--text-primary)",
  paddingBottom:   2,
  cursor:          "pointer",
  letterSpacing:   "0.01em",
  transition:      "color 0.25s ease, border-color 0.25s ease",
};

const ctaSecondaryStyle: React.CSSProperties = {
  fontFamily:      "var(--font-serif)",
  fontSize:        18,
  fontStyle:       "italic",
  fontWeight:      400,
  color:           "var(--text-dim)",
  background:      "transparent",
  border:          "none",
  borderBottom:    "1px solid var(--text-muted)",
  paddingBottom:   2,
  cursor:          "pointer",
  letterSpacing:   "0.01em",
  transition:      "color 0.25s ease",
};

// ─── ScrollHint ───────────────────────────────────────────────────────────────
function ScrollHint() {
  return (
    <div style={{
      position:       "absolute",
      bottom:         clamp(32),
      right:          clamp(40),
      zIndex:         10,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      gap:            10,
    }}>
      {/* Vertical line */}
      <div style={{
        width:      1,
        height:     40,
        background: "linear-gradient(to bottom, transparent, var(--text-dim))",
        animation:  "pulse 2.2s ease-in-out infinite",
      }} />
      {/* "Scroll" rotated */}
      <span style={{
        fontFamily:    "var(--font-sans)",
        fontSize:      9,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color:         "var(--text-dim)",
        writingMode:   "vertical-rl",
        transform:     "rotate(180deg)",
      }}>Scroll</span>
    </div>
  );
}

function clamp(px: number) { return px; }
