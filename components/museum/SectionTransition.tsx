"use client";
import { useEffect, useRef, ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Color of the wipe curtain — defaults to site bg */
  curtainColor?: string;
}

/**
 * Wraps a section with a horizontal curtain-wipe reveal:
 * a block-color panel slides from left→right, then retracts right→left,
 * exposing the section content underneath. GPU-composited via clip-path.
 */
export function SectionTransition({
  children,
  id,
  style,
  className = "",
  curtainColor = "var(--bg)",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const curtain = curtainRef.current;
    if (!el || !curtain) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Phase 1: curtain slides in (left → right covers section)
          curtain.style.transition = "none";
          curtain.style.clipPath = "inset(0 100% 0 0)";
          // Force reflow
          void curtain.offsetWidth;
          curtain.style.transition = "clip-path 0.55s cubic-bezier(0.77,0,0.18,1)";
          curtain.style.clipPath = "inset(0 0% 0 0)";

          // Phase 2: curtain retracts right → left, revealing content
          setTimeout(() => {
            curtain.style.transition = "clip-path 0.65s cubic-bezier(0.77,0,0.18,1)";
            curtain.style.clipPath = "inset(0 0% 0 100%)";
          }, 520);

          observer.unobserve(el);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {children}
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: curtainColor,
          clipPath: "inset(0 100% 0 0)",
          pointerEvents: "none",
          zIndex: 20,
          willChange: "clip-path",
        }}
      />
    </div>
  );
}
