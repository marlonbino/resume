"use client";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useState } from "react";

const WHATSAPP_NUMBER = "254799979067";

// ── ContactForm ───────────────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [via, setVia] = useState<"email" | "whatsapp">("email");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    padding: "12px 0",
    fontFamily: "var(--font-serif), serif",
    fontSize: 16,
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
    caretColor: "var(--gold-light)",
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const body = name.trim() ? `Hi Marlon, I'm ${name}.\n\n${message}` : message;
    if (via === "whatsapp") {
      const encoded = encodeURIComponent(body);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    } else {
      const subject = encodeURIComponent("Message from portfolio");
      const encodedBody = encodeURIComponent(body);
      window.location.href = `mailto:marlon.gmx1@gmail.com?subject=${subject}&body=${encodedBody}`;
    }
  };

  return (
    <div style={{ border: "1px solid var(--border)", padding: "40px 36px", background: "var(--surface)" }}>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 11,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "var(--text-dim)", marginBottom: 32,
      }}>
        Send a message
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Name */}
        <div>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 6 }}>
            Your name
          </label>
          <input
            type="text"
            placeholder="What should I call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => ((e.target as HTMLElement).style.borderBottomColor = "var(--gold)")}
            onBlur={(e) => ((e.target as HTMLElement).style.borderBottomColor = "var(--border)")}
          />
        </div>

        {/* Message */}
        <div>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 6 }}>
            What&apos;s on your mind?
          </label>
          <textarea
            placeholder="Tell me about the project, role, or idea…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "none", lineHeight: 1.7 }}
            onFocus={(e) => ((e.target as HTMLElement).style.borderBottomColor = "var(--gold)")}
            onBlur={(e) => ((e.target as HTMLElement).style.borderBottomColor = "var(--border)")}
          />
        </div>

        {/* Send via toggle */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
            Send via
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {(["email", "whatsapp"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setVia(opt)}
                style={{
                  background: via === opt ? "rgba(200,164,85,0.12)" : "transparent",
                  border: `1px solid ${via === opt ? "var(--gold)" : "var(--border)"}`,
                  color: via === opt ? "var(--gold-light)" : "var(--text-dim)",
                  padding: "6px 18px",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
              >
                {opt === "whatsapp" ? "WhatsApp" : "Email"}
              </button>
            ))}
          </div>
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          style={{
            background: message.trim() ? "var(--gold)" : "transparent",
            border: `1px solid ${message.trim() ? "var(--gold)" : "var(--border)"}`,
            color: message.trim() ? "#0e0c0a" : "var(--text-muted)",
            padding: "14px 28px",
            cursor: message.trim() ? "pointer" : "not-allowed",
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            transition: "all 0.3s",
            alignSelf: "flex-start",
          }}
          onMouseEnter={(e) => {
            if (!message.trim()) return;
            (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
          }}
          onMouseLeave={(e) => {
            if (!message.trim()) return;
            (e.currentTarget as HTMLElement).style.background = "var(--gold)";
          }}
        >
          {via === "whatsapp" ? "Open WhatsApp →" : "Open Email →"}
        </button>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <ScrollReveal delay={200}>
      <div style={{
        marginTop: 96,
        paddingTop: 32,
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <p style={{
          fontFamily: "var(--font-serif), serif",
          fontStyle: "italic",
          fontSize: 15,
          color: "var(--text-dim)",
        }}>
          © 2026 Marlon Isaiah Amunga
        </p>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>
          Built by Marlon — Nairobi, KE
        </p>
      </div>
    </ScrollReveal>
  );
}

export function ContactSection() {
  return (
    <section id="contact" style={{ padding: "120px 48px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: 72, maxWidth: 600 }}>
            <p className="roman-label" style={{ marginBottom: 12 }}>V — Contact</p>
            <h2 style={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 5vw, 64px)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
            }}>
              Got something<br />
              <em>in mind?</em>
            </h2>
          </div>
        </ScrollReveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 64,
          alignItems: "start",
        }}>
          <ScrollReveal direction="left">
            <LeftPanel />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <ContactForm />
          </ScrollReveal>
        </div>

        <Footer />
      </div>
    </section>
  );
}

// ── Left panel ────────────────────────────────────────────────────────────────
function LeftPanel() {
  return (
    <div>
      <p style={{
        fontFamily: "var(--font-serif), serif",
        fontSize: "clamp(17px, 1.8vw, 20px)",
        color: "var(--text-secondary)",
        lineHeight: 1.85,
        marginBottom: 36,
      }}>
        I&apos;m at Bitz by day, but I pick up freelance work and interesting side projects when they come up. Drop me a message — I&apos;ll get back to you.
      </p>

      <a
        href="mailto:marlon.gmx1@gmail.com"
        style={{
          display: "block",
          fontFamily: "var(--font-serif), serif",
          fontStyle: "italic",
          fontSize: "clamp(17px, 2.2vw, 24px)",
          color: "var(--gold-light)",
          textDecoration: "underline",
          textDecorationColor: "rgba(212,170,106,0.35)",
          textUnderlineOffset: "4px",
          marginBottom: 32,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-light)")}
      >
        marlon.gmx1@gmail.com
      </a>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
        {[
          { label: "GitHub", href: "https://github.com/marlonbino" },
          { label: "Hugging Face", href: "https://huggingface.co/marlonbino" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--gold-light)";
              (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--gold-light)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-dim)";
              (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Availability */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 8, height: 8,
          background: "#4ade80",
          borderRadius: "50%",
          animation: "subtlePulse 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: 11,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#4ade80",
        }}>
          Open to work
        </span>
      </div>
    </div>
  );
}
