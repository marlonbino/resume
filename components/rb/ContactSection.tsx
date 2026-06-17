"use client";

import { forwardRef, useState, useRef } from "react";
import { Reveal } from "@/components/rb/Reveal";

const WHATSAPP_NUMBER = "14255245066";

// ── Styles ──────────────────────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  padding: "120px 48px 80px",
  background: "var(--bg)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--teal)",
  marginBottom: "16px",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 400,
  color: "var(--text-primary)",
  marginBottom: "12px",
  lineHeight: 1.15,
};

const subTextStyle: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "1rem",
  color: "var(--text-secondary)",
  marginBottom: "64px",
  maxWidth: "560px",
  lineHeight: 1.65,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "64px",
  alignItems: "start",
};

const infoLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: "8px",
};

const emailLinkStyle: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "1.35rem",
  color: "var(--teal)",
  textDecoration: "none",
  display: "block",
  marginBottom: "32px",
  transition: "color 0.2s ease",
};

const linkedInLinkStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "var(--teal-light)",
  textDecoration: "none",
  display: "block",
  marginBottom: "24px",
  letterSpacing: "0.04em",
  transition: "color 0.2s ease",
};

const locationStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "var(--text-dim)",
  marginBottom: "28px",
};

const availabilityRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const availabilityTextStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "var(--text-secondary)",
};

const fieldWrapStyle: React.CSSProperties = {
  marginBottom: "28px",
};

const inputBaseStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--border)",
  outline: "none",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "16px",
  color: "var(--text-primary)",
  padding: "10px 0",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
};

const sendButtonStyle: React.CSSProperties = {
  background: "var(--teal)",
  color: "#0b0f0e",
  border: "none",
  padding: "12px 28px",
  fontFamily: "Inter, sans-serif",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "background 0.2s ease",
  marginTop: "8px",
};

const viaLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: "12px",
};

const viaToggleRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
};

const hintStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  color: "#e07a5f",
  marginTop: "8px",
};

const footerStyle: React.CSSProperties = {
  marginTop: "80px",
  paddingTop: "28px",
  borderTop: "1px solid var(--border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
};

const footerCopyStyle: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "14px",
  color: "var(--text-dim)",
};

const footerTagStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontVariant: "small-caps",
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
};

// ── Pulsing dot via keyframes injected once ─────────────────────────────────
const PULSE_CSS = `
@keyframes rb-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.4); }
}
`;

function PulseDot() {
  return (
    <>
      <style>{PULSE_CSS}</style>
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#4ade80",
          animation: "rb-pulse 2s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
    </>
  );
}

// ── Field component ─────────────────────────────────────────────────────────
const Field = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  {
    as?: "input" | "textarea";
    placeholder: string;
    rows?: number;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    errorColor?: string;
  }
>(function Field(
  { as = "input", placeholder, rows, type = "text", value, onChange, errorColor },
  ref
) {
  const [focused, setFocused] = useState(false);
  const style: React.CSSProperties = {
    ...inputBaseStyle,
    borderBottomColor: errorColor ?? (focused ? "var(--teal)" : "var(--border)"),
    resize: as === "textarea" ? "vertical" : undefined,
    minHeight: as === "textarea" ? "96px" : undefined,
  };

  return (
    <div style={fieldWrapStyle}>
      {as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          placeholder={placeholder}
          rows={rows}
          style={style}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          style={style}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
});

// ── Main component ──────────────────────────────────────────────────────────
export function ContactSection() {
  const [btnHover, setBtnHover] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [via, setVia] = useState<"email" | "whatsapp">("email");
  const [showHint, setShowHint] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim()) {
      setShowHint(true);
      messageRef.current?.focus();
      return;
    }
    setShowHint(false);
    const intro = name.trim() ? `Hi Roseline, I'm ${name}.\n\n` : "";
    const replyTo = email.trim() ? `\n\nReply to: ${email}` : "";
    const body = `${intro}${message}${replyTo}`;

    if (via === "whatsapp") {
      const encoded = encodeURIComponent(body);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    } else {
      const subject = encodeURIComponent("Message from your site");
      const encodedBody = encodeURIComponent(body);
      window.location.href = `mailto:ondeche@gmail.com?subject=${subject}&body=${encodedBody}`;
    }
  };

  return (
    <section id="contact" style={sectionStyle}>
      {/* Header */}
      <Reveal>
        <p style={labelStyle}>Contact</p>
        <h2 style={headingStyle}>Let&apos;s talk.</h2>
        <p style={subTextStyle}>
          Whether it&apos;s a speaking opportunity, collaboration, or just a conversation about
          health equity — I&apos;m reachable.
        </p>
      </Reveal>

      {/* Two-column grid */}
      <div style={gridStyle}>
        {/* Left: info */}
        <Reveal delay={60}>
          <div>
            <p style={infoLabelStyle}>Email</p>
            <a
              href="mailto:ondeche@gmail.com"
              style={emailLinkStyle}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--teal-light)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--teal)")
              }
            >
              ondeche@gmail.com
            </a>

            <p style={infoLabelStyle}>LinkedIn</p>
            <a
              href="https://linkedin.com/in/roseline-buyeka"
              target="_blank"
              rel="noopener noreferrer"
              style={linkedInLinkStyle}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--teal-light)")
              }
            >
              linkedin.com/in/roseline-buyeka
            </a>

            <p style={locationStyle}>📍 Issaquah, WA</p>

            <div style={availabilityRowStyle}>
              <PulseDot />
              <span style={availabilityTextStyle}>Open to speaking, advisory &amp; leadership roles</span>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={120}>
          <div>
            <Field placeholder="Your name" value={name} onChange={setName} />
            <Field as="input" type="email" placeholder="Your email" value={email} onChange={setEmail} />
            <Field
              ref={messageRef}
              as="textarea"
              placeholder="Your message"
              rows={4}
              value={message}
              onChange={(v) => {
                setMessage(v);
                if (v.trim()) setShowHint(false);
              }}
              errorColor={showHint ? "#e07a5f" : undefined}
            />
            {showHint && <p style={hintStyle}>Write a message above first — then this button will send it.</p>}

            <p style={viaLabelStyle}>Send via</p>
            <div style={viaToggleRowStyle}>
              {(["email", "whatsapp"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setVia(opt)}
                  style={{
                    background: via === opt ? "rgba(139,92,246,0.12)" : "transparent",
                    border: `1px solid ${via === opt ? "var(--teal)" : "var(--border)"}`,
                    color: via === opt ? "var(--teal-light)" : "var(--text-dim)",
                    padding: "6px 18px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                >
                  {opt === "whatsapp" ? "WhatsApp" : "Email"}
                </button>
              ))}
            </div>

            <button
              style={{
                ...sendButtonStyle,
                background: btnHover ? "var(--teal-light)" : "var(--teal)",
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              onClick={handleSend}
              type="button"
            >
              {via === "whatsapp" ? "Send on WhatsApp" : "Send Email"}
            </button>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <span style={footerCopyStyle}>© 2026 Roseline Buyeka, DNP</span>
        <span style={footerTagStyle}>Built with care — Seattle, WA</span>
      </div>
    </section>
  );
}
