"use client";

import { Reveal } from "@/components/rb/Reveal";

interface EducationCard {
  accentColor: string;
  period: string;
  degree: string;
  focus: string;
  school: string;
  note?: string;
}

const sectionStyle: React.CSSProperties = {
  padding: "120px 48px",
  background: "var(--bg-2)",
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
  marginBottom: "64px",
  lineHeight: 1.15,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "28px",
};

function cardStyle(accent: string): React.CSSProperties {
  return {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderTop: `3px solid ${accent}`,
    padding: "32px 28px",
    borderRadius: "2px",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
  };
}

const periodStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--text-dim)",
  marginBottom: "18px",
};

const degreeStyle: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "1.15rem",
  fontWeight: 400,
  color: "var(--text-primary)",
  lineHeight: 1.35,
  marginBottom: "10px",
};

const focusStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  color: "var(--text-secondary)",
  marginBottom: "14px",
  lineHeight: 1.5,
};

const schoolStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "var(--teal-light)",
  textTransform: "uppercase",
  marginBottom: "0",
};

const noteStyle: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "12.5px",
  color: "var(--gold)",
  marginTop: "18px",
  paddingTop: "16px",
  borderTop: "1px solid var(--border)",
  lineHeight: 1.55,
};

export function EducationSection({ cards }: { cards: EducationCard[] }) {
  return (
    <section id="education" style={sectionStyle}>
      <Reveal>
        <p style={labelStyle}>Education</p>
        <h2 style={headingStyle}>Built over decades.</h2>
      </Reveal>

      <div style={gridStyle}>
        {cards.map((card, i) => (
          <Reveal key={i} delay={i * 120}>
            <div
              style={cardStyle(card.accentColor)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 40px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <p style={periodStyle}>{card.period}</p>
              <p style={degreeStyle}>{card.degree}</p>
              <p style={focusStyle}>{card.focus}</p>
              <p style={schoolStyle}>{card.school}</p>
              {card.note && <p style={noteStyle}>{card.note}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
