"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "drift";
  delay?: number;
  /** When true, direct child elements get staggered delay */
  stagger?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
            // Stagger direct children
            if (stagger) {
              Array.from(el.children).forEach((child, i) => {
                setTimeout(() => {
                  (child as HTMLElement).style.opacity = "1";
                  (child as HTMLElement).style.transform = "translateY(0) scale(1)";
                }, i * 80);
              });
            }
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    // Apply stagger initial state to children
    if (stagger) {
      Array.from(el.children).forEach((child) => {
        const c = child as HTMLElement;
        c.style.opacity = "0";
        c.style.transform = "translateY(18px) scale(0.99)";
        c.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      });
    }

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
      ? "reveal-right"
      : direction === "drift"
      ? "reveal"  // reuse up, drift is handled via stagger
      : "reveal";

  return (
    <div ref={ref} className={`${dirClass} ${className}`}>
      {children}
    </div>
  );
}
