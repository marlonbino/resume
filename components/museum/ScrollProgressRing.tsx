"use client";
import { useEffect, useState } from "react";

const SIZE = 52;
const STROKE = 3;
const R = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function ScrollProgressRing() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setShow(scrollTop > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const dashOffset = CIRCUMFERENCE * (1 - progress);
  // Ring pulses slightly when near 0 or 100
  const atEdge = progress < 0.02 || progress > 0.98;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`progress-ring${show ? " visible" : ""}`}
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Track circle */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="rgba(14,12,10,0.75)"
          stroke="rgba(200,170,100,0.15)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={atEdge ? "rgba(226,185,106,0.9)" : "rgba(200,164,85,0.85)"}
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.15s linear, stroke 0.3s ease",
            filter: atEdge ? "drop-shadow(0 0 4px rgba(226,185,106,0.6))" : "none",
          }}
        />
        {/* Up arrow icon */}
        <g transform={`translate(${SIZE / 2}, ${SIZE / 2})`}>
          <line x1="0" y1="5" x2="0" y2="-5" stroke="rgba(242,230,200,0.9)" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="-4,0 0,-5 4,0" fill="none" stroke="rgba(242,230,200,0.9)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </svg>
    </button>
  );
}
