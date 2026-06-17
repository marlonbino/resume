"use client";
import { useEffect, useRef, ReactNode } from "react";

export function Reveal({ children, direction = "up", delay = 0, className = "" }:
  { children: ReactNode; direction?: "up"|"left"|"right"; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); }
    }, { threshold: 0.08, rootMargin: "0px 0px -50px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>;
}
