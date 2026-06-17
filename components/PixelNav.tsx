"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#hero", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#experience", label: "XP" },
  { href: "#projects", label: "WORK" },
  { href: "#contact", label: "CONTACT" },
];

export function PixelNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(10,10,15,0.95)"
          : "transparent",
        borderBottom: scrolled ? "2px solid rgba(245,200,66,0.3)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          style={{
            fontFamily: "var(--font-pixel), monospace",
            fontSize: 11,
            color: "#f5c842",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          MA.DEV
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 32,
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: 8,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active === link.href.slice(1) ? "#f5c842" : "#8a8090",
                letterSpacing: "0.1em",
                transition: "color 0.2s",
                position: "relative",
                padding: "4px 0",
              }}
            >
              {active === link.href.slice(1) && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#f5c842",
                  }}
                />
              )}
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "none",
            border: "2px solid #f5c842",
            color: "#f5c842",
            padding: "6px 10px",
            cursor: "pointer",
            fontFamily: "var(--font-pixel), monospace",
            fontSize: 8,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(10,10,15,0.98)",
            borderTop: "2px solid #f5c842",
            padding: "16px 24px",
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                fontFamily: "var(--font-pixel), monospace",
                fontSize: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active === link.href.slice(1) ? "#f5c842" : "#8a8090",
                padding: "12px 0",
                borderBottom: "1px solid rgba(245,200,66,0.1)",
              }}
            >
              &gt; {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
