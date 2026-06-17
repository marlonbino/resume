"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#home",       label: "Home",       short: "01" },
  { href: "#about",      label: "About",      short: "02" },
  { href: "#expertise",  label: "Expertise",  short: "03" },
  { href: "#projects",   label: "Projects",   short: "04" },
  { href: "#experience", label: "Experience", short: "05" },
  { href: "#contact",    label: "Contact",    short: "06" },
];

export function MuseumNav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("home");
  const [open,      setOpen]      = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy  = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(sy > 60);
      setScrollPct(docH > 0 ? sy / docH : 0);
      const ids = links.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeLink = links.find((l) => l.href.slice(1) === active);

  return (
    <>
      {/* ── Top progress bar ─────────────────────────────────────────────── */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 110,
        height: 2, width: `${scrollPct * 100}%`,
        background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
        transition: "width 0.12s linear",
        pointerEvents: "none",
      }} />

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px",
        background: scrolled ? "rgba(12,10,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,164,85,0.1)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}>

        {/* Wordmark */}
        <button onClick={() => go("#home")} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            fontFamily: "var(--font-serif), serif",
            fontStyle: "italic",
            fontSize: 20,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}>M</span>
          <span style={{
            width: 1, height: 16,
            background: "rgba(200,164,85,0.4)",
          }} />
          <span style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            lineHeight: 1,
          }}>Amunga</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{
          display: "flex", alignItems: "center", gap: 2,
        }}>
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <NavLink key={l.href} label={l.label} href={l.href}
                isActive={isActive} onClick={() => go(l.href)} />
            );
          })}

          <button onClick={() => go("#contact")}
            style={{
              marginLeft: 16,
              background: "var(--gold)",
              border: "none",
              color: "#0e0c0a",
              padding: "8px 20px",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 10, fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Hire me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden"
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <line x1="0" y1="1"  x2={open ? "16" : "22"} y2="1"
              stroke="var(--gold-light)" strokeWidth="1.5"
              style={{ transition: "all 0.3s ease",
                transform: open ? "rotate(45deg) translate(5px,5px)" : "none",
                transformOrigin: "left center" }} />
            <line x1="0" y1="8"  x2="22" y2="8"
              stroke="var(--gold-light)" strokeWidth="1.5"
              style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }} />
            <line x1="0" y1="15" x2={open ? "16" : "22"} y2="15"
              stroke="var(--gold-light)" strokeWidth="1.5"
              style={{ transition: "all 0.3s ease",
                transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none",
                transformOrigin: "left center" }} />
          </svg>
        </button>
      </nav>

      {/* ── Mobile full-screen menu ───────────────────────────────────────── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 98,
        background: "rgba(10,8,6,0.97)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 0.35s ease",
      }} className="md:hidden">
        {links.map((l, i) => (
          <button key={l.href} onClick={() => go(l.href)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "baseline", gap: 20,
            padding: "18px 0",
            borderBottom: "1px solid rgba(200,164,85,0.07)",
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(-16px)",
            transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
          }}>
            <span style={{
              fontFamily: "var(--font-serif), serif", fontStyle: "italic",
              fontSize: 12, color: "var(--gold)", opacity: 0.5, minWidth: 24,
            }}>{l.short}</span>
            <span style={{
              fontFamily: "var(--font-serif), serif", fontWeight: 300,
              fontSize: "clamp(28px, 8vw, 48px)",
              color: active === l.href.slice(1) ? "var(--gold-light)" : "var(--text-primary)",
              letterSpacing: "-0.02em",
              transition: "color 0.2s",
            }}>{l.label}</span>
          </button>
        ))}
      </div>

      {/* ── Right side — current section label ───────────────────────────── */}
      <div className="hidden md:flex" style={{
        position: "fixed", right: 0, top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 0,
        paddingRight: 20,
      }}>
        {links.map((l) => {
          const isActive = active === l.href.slice(1);
          return (
            <button key={l.href} onClick={() => go(l.href)}
              title={l.label}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 0",
              }}
            >
              {/* Label — only visible on active */}
              <span style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 9, letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                opacity: isActive ? 0.8 : 0,
                transform: isActive ? "translateX(0)" : "translateX(8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                whiteSpace: "nowrap",
              }}>{l.label}</span>
              {/* Tick mark */}
              <span style={{
                display: "block",
                width: isActive ? 20 : 8,
                height: 1,
                background: isActive ? "var(--gold-light)" : "rgba(200,164,85,0.25)",
                transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
                boxShadow: isActive ? "0 0 6px rgba(226,185,106,0.5)" : "none",
              }} />
            </button>
          );
        })}

        {/* Scroll percentage */}
        <span style={{
          fontFamily: "var(--font-serif), serif", fontStyle: "italic",
          fontSize: 10, color: "var(--text-muted)",
          marginTop: 12, paddingRight: 2,
          opacity: scrolled ? 0.6 : 0,
          transition: "opacity 0.4s ease",
        }}>
          {Math.round(scrollPct * 100)}%
        </span>
      </div>
    </>
  );
}

// ── NavLink ────────────────────────────────────────────────────────────────────
function NavLink({ label, href, isActive, onClick }: {
  label: string; href: string; isActive: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "6px 14px",
        fontFamily: "var(--font-sans), sans-serif",
        fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: isActive ? "var(--text-primary)" : hov ? "var(--text-secondary)" : "var(--text-muted)",
        transition: "color 0.2s",
        position: "relative",
      }}
    >
      {label}
      {/* Active underline */}
      <span style={{
        position: "absolute", bottom: 2, left: "50%",
        transform: "translateX(-50%)",
        height: 1,
        width: isActive ? "60%" : hov ? "30%" : "0%",
        background: isActive ? "var(--gold)" : "rgba(200,164,85,0.4)",
        transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
        display: "block",
      }} />
    </button>
  );
}
