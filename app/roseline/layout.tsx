import type { ReactNode } from "react";

export default function RoselineLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      // Roseline's colour system — purple palette
      ["--bg" as string]:             "#0d0b12",
      ["--bg-2" as string]:           "#110e18",
      ["--surface" as string]:        "#181420",
      ["--border" as string]:         "rgba(160,120,220,0.18)",
      ["--teal" as string]:           "#8b5cf6",
      ["--teal-light" as string]:     "#a78bfa",
      ["--gold" as string]:           "#e9c46a",
      ["--text-primary" as string]:   "#f2eeff",
      ["--text-secondary" as string]: "#c4b8d8",
      ["--text-dim" as string]:       "#7c6a96",
      ["--text-muted" as string]:     "#3d2f55",
    }}>
      {children}
    </div>
  );
}
