"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type NavLink = { id: string; label: string };

const NAV_LINKS: NavLink[] = [
  { id: "home",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "impact",     label: "Impact"     },
  { id: "experience", label: "Experience" },
  { id: "education",  label: "Education"  },
  { id: "projects",   label: "Projects"   },
  { id: "contact",    label: "Contact"    },
];

const TICK_LABELS = NAV_LINKS.map((l) => l.label);

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressLine({ progress }: { progress: number }) {
  return (
    <div style={{
      position:   "fixed",
      top:        0,
      left:       0,
      right:      0,
      height:     2,
      zIndex:     200,
      background: "transparent",
    }}>
      <div style={{
        height:     "100%",
        width:      `${progress * 100}%`,
        background: "linear-gradient(90deg, var(--teal) 0%, var(--teal-light) 60%, var(--gold) 100%)",
        transition: "width 0.12s linear",
        boxShadow:  "0 0 8px rgba(42,157,143,0.7)",
      }} />
    </div>
  );
}

function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <span style={{
        fontFamily:  "var(--font-serif)",
        fontSize:    32,
        fontStyle:   "italic",
        fontWeight:  400,
        color:       "var(--text-primary)",
        lineHeight:  1,
        letterSpacing: "-0.02em",
      }}>R</span>
      <div style={{ width: 1, height: 22, background: "var(--border)" }} />
      <span style={{
        fontFamily:   "var(--font-sans)",
        fontSize:     12,
        fontWeight:   400,
        letterSpacing:"0.18em",
        textTransform:"uppercase" as const,
        color:        "var(--text-secondary)",
        lineHeight:   1,
      }}>Buyeka</span>
    </div>
  );
}

function DesktopLinks({ links, active, go }: { links: NavLink[]; active: string; go: (id: string) => void }) {
  return (
    <div style={{
      display:       "flex",
      alignItems:    "center",
      gap:           28,
      position:      "absolute",
      left:          "50%",
      transform:     "translateX(-50%)",
    }}
    className="hide-mobile"
    >
      {links.map((link) => {
        const isActive = link.id === active;
        return (
          <button
            key={link.id}
            onClick={() => go(link.id)}
            style={{
              fontFamily:    "var(--font-sans)",
              fontSize:      11,
              fontWeight:    500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         isActive ? "var(--teal-light)" : "var(--text-dim)",
              background:    "transparent",
              border:        "none",
              borderBottom:  isActive ? "1px solid var(--teal-light)" : "1px solid transparent",
              paddingBottom: 2,
              cursor:        "pointer",
              transition:    "color 0.2s ease, border-color 0.2s ease",
              whiteSpace:    "nowrap",
            }}
          >
            {link.label}
          </button>
        );
      })}
    </div>
  );
}

function HamburgerBtn({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        display:    "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap:        5,
        width:      32,
        height:     32,
        background: "transparent",
        border:     "none",
        cursor:     "pointer",
        padding:    4,
        flexShrink: 0,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          display:       "block",
          height:        1,
          background:    "var(--text-secondary)",
          borderRadius:  0,
          transition:    "transform 0.3s ease, opacity 0.3s ease, width 0.3s ease",
          width:         i === 1 ? (open ? "60%" : "80%") : "100%",
          transformOrigin: "center",
          transform:     open
            ? i === 0 ? "translateY(6px) rotate(45deg)"
            : i === 2 ? "translateY(-6px) rotate(-45deg)"
            : "scaleX(0)"
            : "none",
          opacity:       open && i === 1 ? 0 : 1,
        }} />
      ))}
    </button>
  );
}

function TickMarks({ activeIdx, go }: { activeIdx: number; go: (id: string) => void }) {
  return (
    <div style={{
      position:       "fixed",
      right:          20,
      top:            "50%",
      transform:      "translateY(-50%)",
      zIndex:         90,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "flex-end",
      gap:            14,
    }}>
      {TICK_LABELS.map((label, i) => {
        const isActive = i === activeIdx;
        return (
          <button
            key={label}
            onClick={() => go(NAV_LINKS[i].id)}
            title={label}
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            8,
              background:     "transparent",
              border:         "none",
              cursor:         "pointer",
              padding:        0,
            }}
          >
            {isActive && (
              <span style={{
                fontFamily:    "var(--font-sans)",
                fontSize:      9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "var(--teal-light)",
                opacity:       0.9,
                whiteSpace:    "nowrap",
                transition:    "opacity 0.3s ease",
              }}>{label}</span>
            )}
            <span style={{
              display:      "block",
              height:       1,
              width:        isActive ? 28 : 10,
              background:   isActive
                ? "linear-gradient(90deg, var(--teal), var(--teal-light))"
                : "var(--text-muted)",
              boxShadow:    isActive ? "0 0 6px var(--teal)" : "none",
              transition:   "width 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
            }} />
          </button>
        );
      })}
    </div>
  );
}

function MobileOverlay({ vis, links, active, go, onClose }: {
  vis:     boolean;
  links:   NavLink[];
  active:  string;
  go:      (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div style={{
      position:   "fixed",
      inset:      0,
      zIndex:     150,
      background: "rgba(11,15,14,0.97)",
      backdropFilter: "blur(20px)",
      display:    "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      padding:    "0 40px",
      opacity:    vis ? 1 : 0,
      transition: "opacity 0.35s ease",
    }}>
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position:   "absolute",
          top:        20,
          right:      20,
          background: "transparent",
          border:     "none",
          color:      "var(--text-dim)",
          fontSize:   24,
          cursor:     "pointer",
          lineHeight: 1,
        }}
        aria-label="Close menu"
      >✕</button>

      {/* Links staggered */}
      {links.map((link, i) => {
        const isActive = link.id === active;
        return (
          <button
            key={link.id}
            onClick={() => go(link.id)}
            style={{
              fontFamily:    "var(--font-serif)",
              fontSize:      "clamp(36px, 8vw, 56px)",
              fontWeight:    300,
              fontStyle:     isActive ? "italic" : "normal",
              color:         isActive ? "var(--teal-light)" : "var(--text-primary)",
              background:    "transparent",
              border:        "none",
              cursor:        "pointer",
              lineHeight:    1.15,
              padding:       "8px 0",
              letterSpacing: "-0.02em",
              opacity:       vis ? 1 : 0,
              transform:     vis ? "translateY(0)" : "translateY(24px)",
              transition:    `opacity 0.5s ease ${i * 0.07 + 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07 + 0.1}s`,
            }}
          >
            {link.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Inline style helpers ─────────────────────────────────────────────────────
const navStyle = (scrolled: boolean): React.CSSProperties => ({
  position:        "fixed",
  top:             0,
  left:            0,
  right:           0,
  zIndex:          100,
  display:         "flex",
  alignItems:      "center",
  justifyContent:  "space-between",
  padding:         "0 40px",
  height:          64,
  background:      scrolled ? "rgba(11,15,14,0.90)" : "transparent",
  backdropFilter:  scrolled ? "blur(16px)" : "none",
  WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
  borderBottom:    scrolled ? "1px solid var(--border)" : "1px solid transparent",
  transition:      "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
});

const connectBtnStyle: React.CSSProperties = {
  fontFamily:      "var(--font-sans)",
  fontSize:        11,
  fontWeight:      500,
  letterSpacing:   "0.12em",
  textTransform:   "uppercase",
  color:           "var(--bg)",
  background:      "var(--teal)",
  border:          "none",
  padding:         "8px 18px",
  cursor:          "pointer",
  transition:      "background 0.25s ease",
  whiteSpace:      "nowrap",
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
export function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [active,    setActive]    = useState("home");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [menuVis,   setMenuVis]   = useState(false);   // stagger trigger
  const rafRef = useRef<number>(0);

  // ── scroll handler ──────────────────────────────────────────────────────
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setProgress(total > 0 ? Math.min(scrollY / total, 1) : 0);

      // active section via offsets
      let current = "home";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 100) current = link.id;
      }
      setActive(current);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafRef.current); };
  }, [onScroll]);

  // ── smooth scroll ────────────────────────────────────────────────────────
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setTimeout(() => setMenuVis(false), 450);
  };

  // ── mobile menu ──────────────────────────────────────────────────────────
  const openMenu = () => { setMenuOpen(true); setTimeout(() => setMenuVis(true), 20); };
  const closeMenu = () => { setMenuVis(false); setTimeout(() => setMenuOpen(false), 420); };
  const activeIdx = NAV_LINKS.findIndex((l) => l.id === active);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Top progress line ── */}
      <ProgressLine progress={progress} />

      {/* ── Main nav bar ── */}
      <nav style={navStyle(scrolled)} aria-label="Primary navigation">
        {/* Wordmark */}
        <Wordmark />

        {/* Desktop centre links */}
        <DesktopLinks links={NAV_LINKS} active={active} go={go} />

        {/* Connect button + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => go("contact")}
            style={connectBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--teal-light)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--teal)"; }}
          >
            Connect
          </button>
          <HamburgerBtn open={menuOpen} onClick={menuOpen ? closeMenu : openMenu} />
        </div>
      </nav>

      {/* ── Right-side tick marks (desktop) ── */}
      <TickMarks activeIdx={activeIdx} go={go} />

      {/* ── Mobile overlay ── */}
      {menuOpen && (
        <MobileOverlay vis={menuVis} links={NAV_LINKS} active={active} go={go} onClose={closeMenu} />
      )}
    </>
  );
}
