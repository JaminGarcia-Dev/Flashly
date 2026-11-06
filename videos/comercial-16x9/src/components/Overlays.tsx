import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tw } from "../lib/anim";
import { theme } from "../theme";
import { T } from "../timeline";
import { timerLabel } from "./Phone";

const NOTIF = { x: 1200, y: 160, w: 440, h: 124 };

// Aviso heads-up de Android. Su ámbar se expande, cubre el plano (corte oculto) y se recoge.
export const Notification: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < T.notifIn || frame > T.notifOut + 12) return null;
  const drop = spring({ frame: frame - T.notifIn, fps, config: theme.spring.settle, durationInFrames: 12 });
  const leave = tw(frame, [T.notifOut, T.notifOut + 10], [0, 1], theme.ease.in);
  const y = -140 + (NOTIF.y + 140) * drop - 170 * leave;
  return (
    <div
      style={{
        position: "absolute",
        left: NOTIF.x - NOTIF.w / 2,
        top: y - NOTIF.h / 2,
        width: NOTIF.w,
        height: NOTIF.h,
        borderRadius: 30,
        background: "rgba(29,26,42,0.96)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 24px 60px -12px rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 22px",
        boxSizing: "border-box",
        fontFamily,
        opacity: 1 - leave,
        transform: `scale(${0.9 + 0.1 * drop})`,
        zIndex: 5,
      }}
    >
      <Img src={staticFile("icon.png")} style={{ width: 72, height: 72, borderRadius: 18 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: theme.colors.textDim, fontSize: 22, fontWeight: 500 }}>
          <span>Flashly</span>
          <span>ahora</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: theme.colors.text, fontSize: 42, fontWeight: 800, letterSpacing: "-0.025em" }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: theme.colors.amber, display: "inline-block" }} />
          ¡Es ahora!
        </div>
      </div>
    </div>
  );
};

export const AmberCover: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < T.coverStart || frame >= T.coverEnd) return null;
  const grow = tw(frame, [T.coverStart, T.cut], [0, 1], theme.ease.in);
  const shrink = tw(frame, [T.cut, T.coverEnd], [0, 1], theme.ease.out);
  const r = 2400 * grow * (1 - shrink);
  return (
    <AbsoluteFill
      style={{
        background: theme.colors.amber,
        clipPath: `circle(${r}px at ${NOTIF.x}px ${NOTIF.y}px)`,
        zIndex: 4,
      }}
    />
  );
};

// Velo ámbar del disparo: 0 → .10 → 0 en 6 frames.
export const CaptureVeil: React.FC = () => {
  const frame = useCurrentFrame();
  const o = 0.1 * tw(frame, [T.capture, T.capture + 2], [0, 1]) * (1 - tw(frame, [T.capture + 2, T.capture + 6], [0, 1]));
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: theme.colors.amber, opacity: o }} />;
};

// Texto 2: «2:00» monumental a la izquierda del teléfono, avanza en tiempo real.
export const HeroTimer: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < T.timerTextIn || frame > T.capture + 8) return null;
  const p = spring({ frame: frame - T.timerTextIn, fps, config: theme.spring.smooth });
  const out = tw(frame, [T.capture, T.capture + 6], [0, 1], theme.ease.in);
  return (
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 540 - 160,
        width: 760,
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        fontSize: 255,
        fontWeight: 800,
        letterSpacing: "-0.05em",
        color: theme.colors.text,
        fontVariantNumeric: "tabular-nums",
        opacity: p * (1 - out),
        transform: `translateY(${(1 - p) * 40 - out * 24}px) scale(${0.94 + 0.06 * p})`,
      }}
    >
      {timerLabel(frame)}
    </div>
  );
};

// Texto 3: la recompensa, junto al mosaico.
export const RewardText: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < T.textIn || frame > T.textOut + 12) return null;
  const out = tw(frame, [T.textOut, T.textOut + 10], [0, 1], theme.ease.in);
  const lines: { words: string[]; gradient: boolean; delay: number }[] = [
    { words: ["Comparte", "el", "tuyo."], gradient: false, delay: 0 },
    { words: ["Descubre", "el", "de"], gradient: true, delay: 14 },
    { words: ["los", "demás."], gradient: true, delay: 19 },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 350,
        width: 720,
        fontFamily,
        fontSize: 80,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        lineHeight: 1.06,
        opacity: 1 - out,
        transform: `translateY(${-24 * out}px)`,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ display: "flex", gap: 24, marginBottom: li === 0 ? 26 : 0 }}>
          {line.words.map((w, wi) => {
            const p = spring({ frame: frame - T.textIn - line.delay - wi * 3, fps, config: theme.spring.smooth });
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 34}px)`,
                  ...(line.gradient
                    ? {
                        backgroundImage: `linear-gradient(100deg, ${theme.colors.violet}, ${theme.colors.magenta} 55%, ${theme.colors.pink})`,
                        backgroundSize: "640px 100%",
                        backgroundPosition: `-${wi * 160}px 0`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }
                    : { color: theme.colors.text }),
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const EndCard: React.FC<{ fontFamily: string; cta?: string }> = ({ fontFamily, cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < T.brandIn) return null;
  const enter = (delay: number) => {
    const p = spring({ frame: frame - T.brandIn - delay, fps, config: theme.spring.smooth });
    return { opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.95 + 0.05 * p})` };
  };
  // Respiración muy leve del halo (el resto del cierre queda quieto para leer).
  const glow = 0.3 + 0.07 * Math.sin((frame - T.brandIn) / 22);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily, flexDirection: "column" }}>
      <div style={{ position: "relative", ...enter(0) }}>
        <div
          style={{
            position: "absolute",
            inset: -60,
            borderRadius: 200,
            background: `radial-gradient(circle, ${theme.colors.magenta} 0%, transparent 65%)`,
            opacity: glow,
            filter: "blur(30px)",
          }}
        />
        <Img src={staticFile("icon.png")} style={{ position: "relative", width: 170, height: 170, borderRadius: 40, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8)" }} />
      </div>
      <div style={{ marginTop: 40, fontSize: 150, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1, color: theme.colors.text, ...enter(8) }}>
        Flashly
      </div>
      <div style={{ marginTop: 26, fontSize: 54, fontWeight: 600, letterSpacing: "-0.02em", color: theme.colors.text, ...enter(20) }}>
        Haz que tu campus{" "}
        <span
          style={{
            backgroundImage: `linear-gradient(100deg, ${theme.colors.violet}, ${theme.colors.pink})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          pase.
        </span>
      </div>
      <div
        style={{
          marginTop: 44,
          padding: "14px 30px",
          borderRadius: 999,
          border: `2px solid ${theme.colors.violet}`,
          color: theme.colors.text,
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: "0.01em",
          background: "rgba(124,92,255,0.12)",
          ...enter(32),
        }}
      >
        {cta ?? "Primero en la UTSV"}
      </div>
    </AbsoluteFill>
  );
};

// ---------- capas de acabado ----------
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 55) * 60;
  const d2 = Math.cos(frame / 70) * 50;
  return (
    <AbsoluteFill style={{ background: theme.colors.bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 1500, height: 1500, borderRadius: "50%", top: -700, left: -400 + d1, filter: "blur(60px)", background: `radial-gradient(circle, ${theme.colors.violet}38, transparent 62%)` }} />
      <div style={{ position: "absolute", width: 1200, height: 1200, borderRadius: "50%", bottom: -650, right: -300 - d2, filter: "blur(70px)", background: `radial-gradient(circle, ${theme.colors.magenta}2A, transparent 65%)` }} />
    </AbsoluteFill>
  );
};

export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill style={{ backgroundColor: theme.colors.violet, mixBlendMode: "soft-light", opacity: 0.12 }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.12), transparent 25%, transparent 75%, rgba(0,0,0,0.18))" }} />
  </AbsoluteFill>
);

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
// Grano estático y fino (ChatGPT: sin grano animado que haga vibrar los detalles).
export const Grain: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", backgroundImage: NOISE, backgroundSize: "220px", opacity: 0.06, mixBlendMode: "overlay" }} />
);

export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.32) 100%)" }} />
);
