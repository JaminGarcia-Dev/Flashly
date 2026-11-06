// Teléfono Android neutro (sin isla, cámara perforada, barra de gestos).
// Va «pegado» al visor: su posición y escala derivan de la cámara del mundo,
// así que cuando la captura se publica el teléfono viaja con ella (Carry).
import React from "react";
import { useCurrentFrame } from "remotion";
import { tw } from "../lib/anim";
import { cameraAt, toScreen } from "../lib/camera";
import { theme } from "../theme";
import { PHONE_S, POS, T } from "../timeline";

const BODY = { w: 470, h: 960, r: 62 };
const VF = { x: 30, y: 164, w: 410, h: 512, r: 23 }; // visor, 4:5
const VF_CENTER = { x: VF.x + VF.w / 2, y: VF.y + VF.h / 2 };

export const timerLabel = (frame: number) => {
  const secs = Math.max(0, 120 - Math.floor(Math.max(0, frame - T.timerStart) / 30));
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
};

const usePhoneGeometry = () => {
  const frame = useCurrentFrame();
  const cam = cameraAt(frame);
  const c = toScreen(cam, POS.lab[0], POS.lab[1]);
  const k = cam.s / PHONE_S;
  const opacity = frame < T.cut ? 0 : 1 - tw(frame, [T.phoneOut, T.phoneOut + 15], [0, 1]);
  return {
    frame,
    opacity,
    style: {
      position: "absolute" as const,
      left: 0,
      top: 0,
      width: BODY.w,
      height: BODY.h,
      transformOrigin: "0 0",
      transform: `translate(${c.x - VF_CENTER.x * k}px, ${c.y - VF_CENTER.y * k}px) scale(${k})`,
      opacity,
    },
  };
};

export const PhoneBody: React.FC = () => {
  const { opacity, style } = usePhoneGeometry();
  if (opacity <= 0) return null;
  return (
    <svg viewBox={`0 0 ${BODY.w} ${BODY.h}`} style={{ ...style, overflow: "visible" }}>
      <defs>
        <linearGradient id="phone-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A2738" />
          <stop offset="0.5" stopColor={theme.colors.phoneBody} />
          <stop offset="1" stopColor="#0F0E16" />
        </linearGradient>
        <filter id="phone-shadow" x="-30%" y="-20%" width="160%" height="140%">
          <feDropShadow dx="0" dy="30" stdDeviation="34" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>
      {/* botones laterales (lado derecho, estilo Android) */}
      <rect x={BODY.w - 2} y={210} width={6} height={90} rx={3} fill={theme.colors.phoneEdge} />
      <rect x={BODY.w - 2} y={330} width={6} height={56} rx={3} fill={theme.colors.phoneEdge} />
      <rect width={BODY.w} height={BODY.h} rx={BODY.r} fill="url(#phone-body)" filter="url(#phone-shadow)" />
      <rect x={1.5} y={1.5} width={BODY.w - 3} height={BODY.h - 3} rx={BODY.r - 1.5} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={3} />
      <rect x={12} y={12} width={BODY.w - 24} height={BODY.h - 24} rx={BODY.r - 12} fill="#0B0A12" />
    </svg>
  );
};

export const PhoneUI: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const { frame, opacity, style } = usePhoneGeometry();
  if (opacity <= 0) return null;

  // Anillo ámbar de la ventana activa alrededor del disparador: se dibuja en 24 f.
  const ringR = 52;
  const ringLen = 2 * Math.PI * ringR;
  const ringDraw = tw(frame, [T.timerStart, T.timerStart + 24], [0, 1]);
  const ringElapsed = Math.max(0, frame - T.timerStart) / 30 / 120; // se consume en tiempo real
  const ringShown = Math.max(0, ringDraw - ringElapsed);

  // Retroalimentación del disparador (≈150 ms) y contorno ámbar de la captura.
  const press = 1 - 0.14 * tw(frame, [T.capture - 3, T.capture], [0, 1]) * (1 - tw(frame, [T.capture, T.capture + 6], [0, 1]));
  const pulse = tw(frame, [T.capture, T.capture + 4], [0, 1]) * (1 - tw(frame, [T.capture + 4, T.capture + 12], [0, 1]));
  const contour = 1 + 0.025 * pulse;
  const contourOpacity = tw(frame, [T.capture, T.capture + 2], [0, 1]) * (1 - tw(frame, [T.capture + 18, T.phoneOut], [0, 1]));

  const published = tw(frame, [T.published, T.published + 8], [0, 1]);
  const label = timerLabel(frame);
  const pillIn = tw(frame, [T.timerStart, T.timerStart + 12], [0, 1]);

  return (
    <svg viewBox={`0 0 ${BODY.w} ${BODY.h}`} style={{ ...style, overflow: "visible" }}>
      {/* barra de estado */}
      <text x={46} y={50} fill="#fff" fontFamily={fontFamily} fontSize={21} fontWeight={600}>13:47</text>
      <circle cx={BODY.w / 2} cy={42} r={9} fill="#000" stroke="#1f1d29" strokeWidth={2} />
      <g transform="translate(352 34)" fill="#fff">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 6} y={12 - i * 4} width={4} height={4 + i * 4} rx={1} opacity={i < 3 ? 1 : 0.4} />
        ))}
        <rect x={34} y={0} width={34} height={16} rx={4} fill="none" stroke="#fff" strokeWidth={2} opacity={0.9} />
        <rect x={37} y={3} width={22} height={10} rx={2} />
        <rect x={69} y={5} width={3} height={6} rx={1} opacity={0.9} />
      </g>

      {/* píldora del temporizador */}
      <g opacity={pillIn} transform={`translate(0 ${(1 - pillIn) * -8})`}>
        <rect x={BODY.w / 2 - 74} y={92} width={148} height={46} rx={23} fill="rgba(255,197,61,0.14)" stroke={theme.colors.amber} strokeWidth={2} />
        <circle cx={BODY.w / 2 - 46} cy={115} r={7} fill={theme.colors.amber} />
        <text x={BODY.w / 2 - 30} y={125} fill="#fff" fontFamily={fontFamily} fontSize={28} fontWeight={700} style={{ fontVariantNumeric: "tabular-nums" }}>
          {label}
        </text>
      </g>

      {/* marco del visor y contorno de captura */}
      <rect x={VF.x} y={VF.y} width={VF.w} height={VF.h} rx={VF.r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={2} />
      {contourOpacity > 0 ? (
        <rect
          x={VF.x} y={VF.y} width={VF.w} height={VF.h} rx={VF.r}
          fill="none" stroke={theme.colors.amber} strokeWidth={5} opacity={contourOpacity}
          style={{ transformOrigin: `${VF_CENTER.x}px ${VF_CENTER.y}px`, transform: `scale(${contour})` }}
        />
      ) : null}

      {/* fila inferior: galería, disparador con anillo ámbar, girar cámara */}
      {/* miniatura de galería: el momento de ayer (atardecer), no un bloque de color */}
      <defs>
        <linearGradient id="thumb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#77708D" />
          <stop offset="0.65" stopColor="#E9AD85" />
          <stop offset="0.66" stopColor="#A56D59" />
          <stop offset="1" stopColor="#7E5246" />
        </linearGradient>
        <clipPath id="thumb-clip"><rect x={70} y={762} width={56} height={56} rx={14} /></clipPath>
      </defs>
      <g clipPath="url(#thumb-clip)">
        <rect x={70} y={762} width={56} height={56} fill="url(#thumb-sky)" />
        <circle cx={102} cy={796} r={8} fill="#F6D9B8" opacity={0.9} />
        <rect x={70} y={798} width={56} height={4} fill="#5E3F3A" opacity={0.6} />
        <path d="M80 818 q3 -16 9 -16 q6 0 8 16 z" fill="#3B2B3A" />
      </g>
      <rect x={70} y={762} width={56} height={56} rx={14} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
      <g transform={`translate(${BODY.w / 2} 790)`}>
        <circle r={ringR} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={6} />
        <circle
          r={ringR} fill="none" stroke={theme.colors.amber} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={ringLen} strokeDashoffset={ringLen * (1 - ringShown)} transform="rotate(-90)"
        />
        <circle r={40} fill="#fff" transform={`scale(${press})`} />
      </g>
      <g transform="translate(375 790)">
        <circle r={28} fill="rgba(255,255,255,0.12)" />
        <path d="M -12 -3 A 13 13 0 0 1 11 -7 M 12 3 A 13 13 0 0 1 -11 7" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d="M 11 -7 l 1 -7 M 11 -7 l -7 -1 M -11 7 l -1 7 M -11 7 l 7 1" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      </g>
      {/* señal de publicado: distingue «capturar» de «publicar» (sin texto) */}
      {published > 0 ? (
        <g transform={`translate(${VF_CENTER.x} ${VF.y + VF.h - 64}) scale(${0.85 + 0.15 * published})`} opacity={published}>
          <circle r={34} fill={theme.colors.violet} />
          <circle r={34} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
          <path d="M -13 1 L -4 10 L 14 -9" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
      <rect x={BODY.w / 2 - 66} y={922} width={132} height={6} rx={3} fill="rgba(255,255,255,0.35)" />
    </svg>
  );
};
