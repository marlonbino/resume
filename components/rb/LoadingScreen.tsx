"use client";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Animate loading bar 0 → 100 over ~1.4s
    let raf: number;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setBarWidth(eased * 100);
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief pause then wipe out
        setTimeout(() => setPhase("exit"), 200);
        setTimeout(() => setPhase("done"), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`loading-screen${phase === "exit" ? " exit" : ""}`}>
      {/* Wordmark */}
      <p
        style={{
          fontFamily: "var(--font-serif), serif",
          fontStyle: "italic",
          fontSize: "clamp(22px, 3.6vw, 34px)",
          color: "var(--teal-light)",
          letterSpacing: "0.06em",
          opacity: phase === "exit" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        Roseline Buyeka
      </p>

      {/* Loading bar track */}
      <div
        style={{
          width: "clamp(200px, 30vw, 360px)",
          height: 1,
          background: "rgba(139,92,246,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${barWidth}%`,
            background: "var(--teal-light)",
            transition: "none",
            boxShadow: "0 0 8px rgba(167,139,250,0.6)",
          }}
        />
      </div>

      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginTop: 4,
        }}
      >
        Loading
      </p>
    </div>
  );
}
