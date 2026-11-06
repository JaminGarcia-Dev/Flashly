import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tw } from "../lib/anim";
import { CARD, theme } from "../theme";
import { cardState } from "./Cards";
import { phoneToScreen } from "./Phone";
import { F, LOCK_CENTER, ROW_ORDER, SUPERS, VF_Y } from "./timeline";

const gradText = (from: string, to: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(100deg, ${from}, ${to})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

// Marca desde el primer segundo (ABCD: branding temprano y sostenido).
export const BrandBug: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const f = useCurrentFrame();
  const o = tw(f, [2, 16], [0, 1]) * (1 - tw(f, [F.endFade, F.endFade + 12], [0, 1]));
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 72, top: 48, display: "flex", alignItems: "center", gap: 14, fontFamily, opacity: o }}>
      <Img src={staticFile("icon.png")} style={{ width: 54, height: 54, borderRadius: 14 }} />
      <span style={{ color: theme.colors.text, fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em" }}>Flashly</span>
    </div>
  );
};

// Hora del campus: 13:46 → 13:47, justo antes del aviso.
export const Clock: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f > F.push + 12) return null;
  const p = spring({ frame: f - 6, fps, config: theme.spring.smooth });
  const out = tw(f, [F.push, F.push + 10], [0, 1], theme.ease.in);
  const flip = tw(f, [F.clockFlip, F.clockFlip + 8], [0, 1]);
  return (
    <div
      style={{
        position: "absolute", left: 960 - 170, top: 140, width: 340, height: 96, borderRadius: 48,
        background: "rgba(24,21,36,0.85)", border: "1.5px solid rgba(255,255,255,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
        fontFamily, color: theme.colors.text, fontSize: 56, fontWeight: 800, letterSpacing: "-0.02em",
        opacity: p * (1 - out), transform: `translateY(${(1 - p) * 20}px)`,
      }}
    >
      <svg width={40} height={40} viewBox="0 0 40 40">
        <circle cx={20} cy={20} r={16} fill="none" stroke={theme.colors.textDim} strokeWidth={3.5} />
        <path d="M20 11 V20 L26 24" fill="none" stroke={theme.colors.textDim} strokeWidth={3.5} strokeLinecap="round" />
      </svg>
      <span style={{ fontVariantNumeric: "tabular-nums", display: "inline-flex" }}>
        13:4
        <span style={{ position: "relative", display: "inline-block", width: "0.62em", height: "1.1em", overflow: "hidden" }}>
          <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${-100 * flip}%)`, opacity: 1 - flip }}>6</span>
          <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${100 * (1 - flip)}%)`, opacity: flip }}>7</span>
        </span>
      </span>
    </div>
  );
};

// El mismo aviso llega a todos a la vez: un pulso ámbar idéntico en cada escena.
export const NotifPulses: React.FC = () => {
  const f = useCurrentFrame();
  if (f < F.notif || f > F.notif + 24) return null;
  const p = tw(f, [F.notif, F.notif + 24], [0, 1]);
  return (
    <AbsoluteFill>
      {ROW_ORDER.map((id) => {
        const s = cardState(id, f);
        if (!s) return null;
        const { x, y, w } = s.place;
        const h = w * (CARD.h / CARD.w);
        return (
          <div
            key={id}
            style={{
              position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
              borderRadius: CARD.radius * (w / CARD.w), border: `4px solid ${theme.colors.amber}`,
              opacity: 0.95 * (1 - p), transform: `scale(${1 + 0.07 * p})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// El ámbar del aviso del laboratorio cubre el plano (corte oculto) y abre el teléfono.
export const AmberCover: React.FC = () => {
  const f = useCurrentFrame();
  if (f < F.coverStart || f >= F.coverEnd) return null;
  const s = cardState("lab", F.coverStart)!;
  const k = s.place.w / 270;
  const ox = s.place.x;
  const oy = s.place.y - (s.place.w * 1.25) / 2 + 35 * k;
  const grow = tw(f, [F.coverStart, F.cut], [0, 1], theme.ease.in);
  const shrink = tw(f, [F.cut, F.coverEnd], [0, 1], theme.ease.out);
  const r = 2300 * grow * (1 - shrink);
  const cx = f < F.cut ? ox : phoneToScreen(f, 235, 115).x;
  const cy = f < F.cut ? oy : phoneToScreen(f, 235, 115).y;
  return <AbsoluteFill style={{ background: theme.colors.amber, clipPath: `circle(${r}px at ${cx}px ${cy}px)` }} />;
};

export const CaptureVeil: React.FC = () => {
  const f = useCurrentFrame();
  const o = 0.1 * tw(f, [F.capture, F.capture + 2], [0, 1]) * (1 - tw(f, [F.capture + 2, F.capture + 6], [0, 1]));
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: theme.colors.amber, opacity: o }} />;
};

// Etiquetas pegadas a la UI: qué es cada cámara.
const Callout: React.FC<{ text: string; pill: { x: number; y: number; align: "left" | "right" }; to: { x: number; y: number }; delay: number; fontFamily: string }> = ({ text, pill, to, delay, fontFamily }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - F.callouts - delay, fps, config: theme.spring.smooth });
  const out = tw(f, [F.publishIn - 4, F.publishIn + 6], [0, 1], theme.ease.in);
  if (p <= 0.001 || out >= 1) return null;
  const pillW = text.length * 24 + 56;
  const pillLeft = pill.align === "right" ? pill.x - pillW : pill.x;
  const lineStart = pill.align === "right" ? pill.x + 10 : pill.x - 10;
  const lineLen = Math.abs(to.x - lineStart);
  const draw = tw(f, [F.callouts + delay + 4, F.callouts + delay + 18], [0, 1]);
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <line x1={lineStart} y1={pill.y} x2={to.x} y2={to.y} stroke="#fff" strokeWidth={3} strokeDasharray={lineLen} strokeDashoffset={lineLen * (1 - draw)} />
        <circle cx={to.x} cy={to.y} r={9 * draw} fill="#fff" />
        <circle cx={to.x} cy={to.y} r={18 * draw} fill="none" stroke="#fff" strokeWidth={2} opacity={0.6} />
      </svg>
      <div
        style={{
          position: "absolute", left: pillLeft, top: pill.y - 34, height: 68, padding: "0 28px", borderRadius: 34,
          display: "flex", alignItems: "center", fontFamily, fontSize: 40, fontWeight: 800, color: theme.colors.text,
          background: "rgba(124,92,255,0.22)", border: `2.5px solid ${theme.colors.violet}`, boxSizing: "border-box",
          opacity: p, transform: `translateX(${(1 - p) * (pill.align === "right" ? -16 : 16)}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Callouts: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  // Visor a x=960: ventana frontal ≈ (1013–1112, 179–310); zona trasera libre ≈ (850, 470).
  return (
    <>
      <Callout text="Trasera" pill={{ x: 690, y: VF_Y + 100, align: "right" }} to={{ x: 860, y: VF_Y + 100 }} delay={0} fontFamily={fontFamily} />
      <Callout text="Frontal" pill={{ x: 1240, y: 245, align: "left" }} to={{ x: 1112, y: 245 }} delay={8} fontFamily={fontFamily} />
    </>
  );
};

// Estado real de la app: feed desenfocado con «Publica para ver».
export const LockCard: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < F.publishIn + 18 || f > F.tap + 16) return null;
  const p = spring({ frame: f - F.publishIn - 18, fps, config: theme.spring.smooth });
  const pop = tw(f, [F.tap + 2, F.tap + 14], [0, 1], theme.ease.out);
  return (
    <div
      style={{
        position: "absolute", left: LOCK_CENTER.x - 250, top: LOCK_CENTER.y - 120, width: 500, height: 240, borderRadius: 32,
        background: "rgba(22,19,34,0.92)", border: "1.5px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, fontFamily,
        opacity: p * (1 - pop), transform: `translateY(${(1 - p) * 24}px) scale(${(0.96 + 0.04 * p) * (1 + 0.12 * pop)})`,
      }}
    >
      <div style={{ width: 84, height: 84, borderRadius: 42, background: `linear-gradient(135deg, ${theme.colors.violet}, ${theme.colors.magenta})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <rect x={4} y={11} width={16} height={10} rx={2.5} />
          <path d={`M8 11 V7.5 a4 4 0 0 1 8 0 V${11 - 3 * pop}`} />
        </svg>
      </div>
      <div style={{ color: theme.colors.text, fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em" }}>Publica para ver</div>
    </div>
  );
};

export const Tap: React.FC = () => {
  const f = useCurrentFrame();
  if (f < F.tap - 6 || f > F.tap + 16) return null;
  const { x, y } = phoneToScreen(F.tap, 235, 790);
  const inP = tw(f, [F.tap - 6, F.tap], [0, 1]);
  const ring = tw(f, [F.tap, F.tap + 16], [0, 1]);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <circle cx={x + 40} cy={y + 6} r={30 * (1.2 - 0.2 * inP)} fill="rgba(255,255,255,0.85)" opacity={inP * (1 - ring)} />
      <circle cx={x + 40} cy={y + 6} r={30 + 40 * ring} fill="none" stroke="#fff" strokeWidth={3} opacity={0.8 * (1 - ring)} />
    </svg>
  );
};

// Rótulos: franja fija abajo, una idea por rótulo, número de paso.
export const Supers: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = SUPERS.find((x) => f >= x.from && f < x.to);
  if (!s) return null;
  const p = spring({ frame: f - s.from, fps, config: theme.spring.smooth, durationInFrames: 14 });
  const out = tw(f, [s.to - 7, s.to], [0, 1], theme.ease.in);
  return (
    <div
      style={{
        position: "absolute", left: 96, right: 96, top: 868, height: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 26,
        fontFamily, opacity: p * (1 - out), transform: `translateY(${(1 - p) * 18 - out * 10}px)`,
      }}
    >
      {s.step ? (
        <div
          style={{
            width: 76, height: 76, borderRadius: 38, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(135deg, ${theme.colors.violet}, ${theme.colors.pink})`, color: "#fff", fontSize: 44, fontWeight: 800,
          }}
        >
          {s.step}
        </div>
      ) : null}
      <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", color: theme.colors.text, whiteSpace: "nowrap", textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
        {s.text}
      </div>
    </div>
  );
};

// «24 h»: los momentos de hoy dejan de mostrarse.
export const DayBadge: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < F.dayLimit || f > F.endFade + 20) return null;
  const p = spring({ frame: f - F.dayLimit, fps, config: theme.spring.smooth });
  const out = tw(f, [F.endFade, F.endFade + 16], [0, 1], theme.ease.in);
  const R = 150;
  const L = 2 * Math.PI * R;
  const left = 1 - 0.22 * tw(f, [F.dayLimit + 10, F.endFade], [0, 1], theme.ease.inOut);
  return (
    <div style={{ position: "absolute", left: 960 - 190, top: 432 - 190, width: 380, height: 380, opacity: p * (1 - out), transform: `scale(${0.92 + 0.08 * p})` }}>
      <svg width={380} height={380} viewBox="-190 -190 380 380" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="day-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={theme.colors.violet} />
            <stop offset="1" stopColor={theme.colors.pink} />
          </linearGradient>
        </defs>
        <circle r={R + 22} fill="rgba(14,12,24,0.88)" />
        <circle r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={14} />
        <circle r={R} fill="none" stroke="url(#day-ring)" strokeWidth={14} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - left)} transform="rotate(-90)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily, fontSize: 124, fontWeight: 800, letterSpacing: "-0.04em", color: theme.colors.text }}>
        24 h
      </div>
    </div>
  );
};

export const EndCard: React.FC<{ fontFamily: string; cta?: string }> = ({ fontFamily, cta }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < F.brandIn) return null;
  const enter = (delay: number) => {
    const p = spring({ frame: f - F.brandIn - delay, fps, config: theme.spring.smooth });
    return { opacity: p, transform: `translateY(${(1 - p) * 36}px) scale(${0.95 + 0.05 * p})` };
  };
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily, flexDirection: "column" }}>
      <div style={{ position: "relative", ...enter(0) }}>
        <div style={{ position: "absolute", inset: -50, borderRadius: 200, background: `radial-gradient(circle, ${theme.colors.magenta} 0%, transparent 65%)`, opacity: 0.3 + 0.06 * Math.sin((f - F.brandIn) / 22), filter: "blur(30px)" }} />
        <Img src={staticFile("icon.png")} style={{ position: "relative", width: 168, height: 168, borderRadius: 40 }} />
      </div>
      <div style={{ marginTop: 36, fontSize: 150, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1, color: theme.colors.text, ...enter(7) }}>Flashly</div>
      <div style={{ marginTop: 24, fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em", color: theme.colors.text, ...enter(16) }}>
        Haz que tu campus <span style={gradText(theme.colors.violet, theme.colors.pink)}>pase.</span>
      </div>
      <div style={{ marginTop: 22, fontSize: 36, fontWeight: 600, color: theme.colors.textDim, letterSpacing: "-0.01em", ...enter(24) }}>
        Un aviso al día · 2 minutos · todo tu campus
      </div>
      <div style={{ marginTop: 36, padding: "14px 32px", borderRadius: 999, border: `2px solid ${theme.colors.violet}`, background: "rgba(124,92,255,0.12)", color: theme.colors.text, fontSize: 34, fontWeight: 600, ...enter(32) }}>
        {cta ?? "Primero en la UTSV · Android"}
      </div>
    </AbsoluteFill>
  );
};
