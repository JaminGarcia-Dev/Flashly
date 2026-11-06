// Android neutro a escala 0.8. Dos modos: cámara (anillo ámbar 2:00 + disparador) y publicar
// (botón «Publicar» → «Publicado»). Va pegado a la tarjeta del laboratorio (su visor).
import React from "react";
import { useCurrentFrame } from "remotion";
import { tw } from "../lib/anim";
import { theme } from "../theme";
import { phoneX } from "./Cards";
import { F, PHONE_K, PHONE_TOP } from "./timeline";

export const BODY = { w: 470, h: 960, r: 62 };
const VF = { x: 30, y: 164, w: 410, h: 512, r: 23 };
const VF_CENTER = { x: VF.x + VF.w / 2, y: VF.y + VF.h / 2 };

const timerLabel = (f: number) => {
  const secs = Math.max(0, 120 - Math.floor(Math.max(0, f - F.timerStart) / 30));
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
};

/** Pantalla -> coordenadas locales del teléfono. */
export const phoneToScreen = (f: number, lx: number, ly: number) => ({
  x: phoneX(f) + (lx - VF_CENTER.x) * PHONE_K,
  y: PHONE_TOP + ly * PHONE_K,
});

const usePhone = () => {
  const f = useCurrentFrame();
  const opacity = f < F.cut ? 0 : 1 - tw(f, [F.gridMove, F.gridMove + 15], [0, 1]);
  const left = phoneX(f) - VF_CENTER.x * PHONE_K;
  return {
    f,
    opacity,
    style: {
      position: "absolute" as const,
      left: 0,
      top: 0,
      width: BODY.w,
      height: BODY.h,
      overflow: "visible" as const,
      transformOrigin: "0 0",
      transform: `translate(${left}px, ${PHONE_TOP}px) scale(${PHONE_K})`,
      opacity,
    },
  };
};

export const PhoneBody: React.FC = () => {
  const { opacity, style } = usePhone();
  if (opacity <= 0) return null;
  return (
    <svg viewBox={`0 0 ${BODY.w} ${BODY.h}`} style={style}>
      <defs>
        <linearGradient id="p4-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A2738" />
          <stop offset="0.5" stopColor={theme.colors.phoneBody} />
          <stop offset="1" stopColor="#0F0E16" />
        </linearGradient>
        <filter id="p4-shadow" x="-30%" y="-20%" width="160%" height="140%">
          <feDropShadow dx="0" dy="26" stdDeviation="30" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      <rect x={BODY.w - 2} y={210} width={6} height={90} rx={3} fill={theme.colors.phoneEdge} />
      <rect x={BODY.w - 2} y={330} width={6} height={56} rx={3} fill={theme.colors.phoneEdge} />
      <rect width={BODY.w} height={BODY.h} rx={BODY.r} fill="url(#p4-body)" filter="url(#p4-shadow)" />
      <rect x={1.5} y={1.5} width={BODY.w - 3} height={BODY.h - 3} rx={BODY.r - 1.5} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={3} />
      <rect x={12} y={12} width={BODY.w - 24} height={BODY.h - 24} rx={BODY.r - 12} fill="#0B0A12" />
    </svg>
  );
};

export const PhoneUI: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const { f, opacity, style } = usePhone();
  if (opacity <= 0) return null;

  const ringR = 52;
  const ringLen = 2 * Math.PI * ringR;
  const ringDraw = tw(f, [F.timerStart, F.timerStart + 24], [0, 1]);
  const ringShown = Math.max(0, ringDraw - Math.max(0, f - F.timerStart) / 30 / 120);
  const press = 1 - 0.14 * tw(f, [F.capture - 3, F.capture], [0, 1]) * (1 - tw(f, [F.capture, F.capture + 6], [0, 1]));
  const pulse = tw(f, [F.capture, F.capture + 4], [0, 1]) * (1 - tw(f, [F.capture + 4, F.capture + 12], [0, 1]));
  const contourOpacity = tw(f, [F.capture, F.capture + 2], [0, 1]) * (1 - tw(f, [F.capture + 20, F.publishIn + 10], [0, 1]));
  const pillIn = tw(f, [F.timerStart, F.timerStart + 12], [0, 1]);

  // Cámara -> publicar.
  const camRow = 1 - tw(f, [F.publishIn, F.publishIn + 10], [0, 1]);
  const pubRow = tw(f, [F.publishIn + 6, F.publishIn + 18], [0, 1]);
  const btnPress = 1 - 0.05 * tw(f, [F.tap - 3, F.tap], [0, 1]) * (1 - tw(f, [F.tap, F.tap + 6], [0, 1]));
  const done = tw(f, [F.tap + 3, F.tap + 10], [0, 1]);

  return (
    <svg viewBox={`0 0 ${BODY.w} ${BODY.h}`} style={style}>
      <defs>
        <linearGradient id="p4-btn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={theme.colors.violet} />
          <stop offset="1" stopColor={theme.colors.magenta} />
        </linearGradient>
        <linearGradient id="p4-thumb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#77708D" />
          <stop offset="0.65" stopColor="#E9AD85" />
          <stop offset="0.66" stopColor="#A56D59" />
          <stop offset="1" stopColor="#7E5246" />
        </linearGradient>
        <clipPath id="p4-thumb-clip"><rect x={70} y={762} width={56} height={56} rx={14} /></clipPath>
      </defs>
      <text x={46} y={50} fill="#fff" fontFamily={fontFamily} fontSize={21} fontWeight={600}>13:47</text>
      <circle cx={BODY.w / 2} cy={42} r={9} fill="#000" stroke="#1f1d29" strokeWidth={2} />
      <g transform="translate(352 34)" fill="#fff">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 6} y={12 - i * 4} width={4} height={4 + i * 4} rx={1} opacity={i < 3 ? 1 : 0.4} />
        ))}
        <rect x={34} y={0} width={34} height={16} rx={4} fill="none" stroke="#fff" strokeWidth={2} opacity={0.9} />
        <rect x={37} y={3} width={22} height={10} rx={2} />
      </g>

      {/* píldora del temporizador */}
      <g opacity={pillIn} transform={`translate(0 ${(1 - pillIn) * -8})`}>
        <rect x={BODY.w / 2 - 84} y={88} width={168} height={54} rx={27} fill="rgba(255,197,61,0.14)" stroke={theme.colors.amber} strokeWidth={2.5} />
        <circle cx={BODY.w / 2 - 52} cy={115} r={8} fill={theme.colors.amber} />
        <text x={BODY.w / 2 - 34} y={127} fill="#fff" fontFamily={fontFamily} fontSize={34} fontWeight={800} style={{ fontVariantNumeric: "tabular-nums" }}>
          {timerLabel(f)}
        </text>
      </g>

      <rect x={VF.x} y={VF.y} width={VF.w} height={VF.h} rx={VF.r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={2} />
      {contourOpacity > 0 ? (
        <rect
          x={VF.x} y={VF.y} width={VF.w} height={VF.h} rx={VF.r} fill="none" stroke={theme.colors.amber} strokeWidth={5} opacity={contourOpacity}
          style={{ transformOrigin: `${VF_CENTER.x}px ${VF_CENTER.y}px`, transform: `scale(${1 + 0.025 * pulse})` }}
        />
      ) : null}

      {/* modo cámara */}
      {camRow > 0 ? (
        <g opacity={camRow}>
          <g clipPath="url(#p4-thumb-clip)">
            <rect x={70} y={762} width={56} height={56} fill="url(#p4-thumb)" />
            <circle cx={102} cy={796} r={8} fill="#F6D9B8" opacity={0.9} />
            <path d="M80 818 q3 -16 9 -16 q6 0 8 16 z" fill="#3B2B3A" />
          </g>
          <rect x={70} y={762} width={56} height={56} rx={14} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
          <g transform={`translate(${BODY.w / 2} 790)`}>
            <circle r={ringR} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={6} />
            <circle r={ringR} fill="none" stroke={theme.colors.amber} strokeWidth={6} strokeLinecap="round" strokeDasharray={ringLen} strokeDashoffset={ringLen * (1 - ringShown)} transform="rotate(-90)" />
            <circle r={40} fill="#fff" transform={`scale(${press})`} />
          </g>
          <g transform="translate(375 790)">
            <circle r={28} fill="rgba(255,255,255,0.12)" />
            <path d="M -12 -3 A 13 13 0 0 1 11 -7 M 12 3 A 13 13 0 0 1 -11 7" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
        </g>
      ) : null}

      {/* modo publicar (texto real de la app) */}
      {pubRow > 0 ? (
        <g opacity={pubRow} transform={`translate(${BODY.w / 2} 790) scale(${btnPress})`}>
          <rect x={-170} y={-44} width={340} height={88} rx={44} fill="url(#p4-btn)" />
          <text x={0} y={14} textAnchor="middle" fill="#fff" fontFamily={fontFamily} fontSize={38} fontWeight={800} opacity={1 - done}>
            Publicar
          </text>
          <g opacity={done}>
            <path d="M -118 0 L -104 14 L -80 -12" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
            <text x={-60} y={14} textAnchor="start" fill="#fff" fontFamily={fontFamily} fontSize={38} fontWeight={800}>Publicado</text>
          </g>
        </g>
      ) : null}
      <rect x={BODY.w / 2 - 66} y={922} width={132} height={6} rx={3} fill="rgba(255,255,255,0.35)" />
    </svg>
  );
};
