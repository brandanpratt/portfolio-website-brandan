import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  // Deterministic node field for the background.
  const nodes = Array.from({ length: 26 }, (_, i) => ({
    x: 640 + Math.cos(i * 2.399) * (120 + (i * 37) % 260),
    y: 315 + Math.sin(i * 2.399) * (90 + (i * 53) % 200),
    r: i % 6 === 0 ? 7 : 4,
  }));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 75% 40%, #0b3a46 0%, #05070a 60%)",
          color: "#eef3f8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {nodes.map((n, i) => {
            const m = nodes[(i * 7 + 3) % nodes.length];
            return <line key={`l${i}`} x1={n.x + 200} y1={n.y} x2={m.x + 200} y2={m.y} stroke="#22e1ff" strokeOpacity="0.18" />;
          })}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x + 200} cy={n.y} r={n.r} fill={i % 6 === 0 ? "#2de2b6" : "#22e1ff"} fillOpacity="0.8" />
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#22e1ff", letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#2de2b6" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 56 : 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8b97a8" }}>
          <span>Brandan Pratt</span>
          <span>{footer ?? "AI Consultant & Software Engineer · Bahamas → Worldwide"}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
