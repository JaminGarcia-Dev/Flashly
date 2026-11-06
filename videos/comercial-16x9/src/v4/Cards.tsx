// Las seis tarjetas-momento a lo largo del v4: vida en el campus → aviso simultáneo →
// visor del teléfono → bloqueadas (desenfocadas) → desbloqueadas en el mosaico.
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { MOMENTS } from "../moments";
import type { MomentId } from "../moments/types";
import { lerp, tw } from "../lib/anim";
import { CARD, FRONT, theme } from "../theme";
import {
  F,
  GRID_ORDER,
  LABELS,
  type Place,
  PUB_ORDER,
  ROW_ORDER,
  ROW_TAGS,
  gridPlace,
  phonePlace,
  pubPlace,
  rowPlace,
} from "./timeline";

const FPS = 30;
// Escalonado no uniforme (choreograph): los primeros se separan más.
const ROW_DELAY = [0, 4, 7, 9, 11, 12];
const PUB_DELAY = [0, 4, 7, 9, 10];

export const phoneX = (f: number) => lerp(960, 560, tw(f, [F.publishIn, F.publishIn + 30], [0, 1], theme.ease.inOut));

type CardState = {
  place: Place;
  opacity: number;
  blur: number;
  front: number;
  label: number;
  notif: number;
  dim: number;
  yOffset: number;
};

const mix = (a: Place, b: Place, p: number): Place => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), w: lerp(a.w, b.w, p) });

export const cardState = (id: MomentId, f: number): CardState | null => {
  const base = { blur: 0, front: 1, label: 0, notif: 0, dim: 1, yOffset: 0 };
  // 1 · La vida en el campus (fila) y el aviso simultáneo.
  if (f < F.cut) {
    const i = ROW_ORDER.indexOf(id);
    const d = ROW_DELAY[i];
    const o = tw(f, [d, d + 16], [0, 1]);
    let place = rowPlace(id);
    let dim = 1;
    if (id === "lab") {
      place = mix(place, { ...place, w: 300 }, tw(f, [F.push, F.coverStart + 6], [0, 1], theme.ease.inOut));
    } else {
      dim = 1 - 0.6 * tw(f, [F.push, F.coverStart], [0, 1]);
    }
    return { ...base, place, opacity: o, yOffset: (1 - o) * 30, front: 0, notif: tw(f, [F.notif, F.notif + 8], [0, 1]), dim };
  }
  // 2 · Teléfono: solo el laboratorio, dentro del visor.
  if (f < F.publishIn) {
    if (id !== "lab") return null;
    return { ...base, place: phonePlace(960), opacity: 1, front: tw(f, [F.frontIn, F.frontIn + 15], [0, 1]) };
  }
  const toGrid = tw(f, [F.gridMove, F.gridMove + 45], [0, 1], theme.ease.inOut);
  const endFade = tw(f, [F.endFade, F.endFade + 20], [0, 1], theme.ease.in);
  // Atenuaciones de los rótulos «Tarde» y «24 h».
  let dim = 1;
  if (f >= F.late - 5 && f < F.dayLimit) dim = id === "plaza" ? 1 : 1 - 0.55 * tw(f, [F.late - 5, F.late + 5], [0, 1]);
  if (f >= F.dayLimit) dim = 1 - 0.7 * tw(f, [F.dayLimit, F.dayLimit + 12], [0, 1]);
  const label = tw(f, [F.labels, F.labels + 15], [0, 1]);
  if (id === "lab") {
    const from = phonePlace(phoneX(f));
    return { ...base, place: mix(from, gridPlace(id), toGrid), opacity: 1 - endFade, label, dim };
  }
  // La publicación «Tarde» crece mientras se explica.
  const grow = id === "plaza" ? tw(f, [F.late - 5, F.late + 10], [0, 1], theme.ease.out) * (1 - tw(f, [F.dayLimit - 8, F.dayLimit + 4], [0, 1], theme.ease.inOut)) : 0;
  // 3 · Bloqueadas a la derecha; se desenfocan al publicar y luego forman el mosaico.
  const i = PUB_ORDER.indexOf(id);
  const d = F.publishIn + 6 + PUB_DELAY[i];
  const o = tw(f, [d, d + 14], [0, 1]);
  const pub = pubPlace(id);
  const start = { ...pub, x: pub.x + (1 - o) * 40 };
  const placed = mix(start, gridPlace(id), toGrid);
  return {
    ...base,
    place: { ...placed, w: placed.w * (1 + 0.16 * grow) },
    opacity: o * (1 - endFade),
    blur: 22 * (1 - tw(f, [F.tap + 2, F.tap + 20], [0, 1], theme.ease.out)),
    label,
    dim,
  };
};

const momentProps = (id: MomentId, f: number) => {
  const live = Math.min(f, F.cut) / FPS; // la vida se mueve hasta que llega el aviso
  if (id === "lab") {
    return {
      t: Math.min(f, F.capture) / FPS,
      led: tw(f, [F.ledOn, F.ledOn + 8], [0, 1]),
      hand: tw(f, [F.handStart, F.handStart + 24], [0, 1], theme.ease.inOut),
    };
  }
  if (id === "court") return { t: live, ball: tw(f, [0, 48], [0, 1]) };
  return { t: live };
};

const Notif: React.FC<{ w: number; p: number; fontFamily: string }> = ({ w, p, fontFamily }) => {
  const k = w / 270;
  return (
    <div
      style={{
        position: "absolute",
        left: 10 * k,
        right: 10 * k,
        top: 10 * k,
        height: 50 * k,
        borderRadius: 14 * k,
        background: "rgba(24,21,36,0.94)",
        border: `${1.5 * k}px solid rgba(255,255,255,0.12)`,
        display: "flex",
        alignItems: "center",
        gap: 9 * k,
        padding: `0 ${10 * k}px`,
        boxSizing: "border-box",
        fontFamily,
        color: theme.colors.text,
        fontSize: 21 * k,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        opacity: p,
        transform: `translateY(${(1 - p) * -18 * k}px)`,
        boxShadow: `0 ${8 * k}px ${20 * k}px rgba(0,0,0,0.45)`,
      }}
    >
      <Img src={staticFile("icon.png")} style={{ width: 32 * k, height: 32 * k, borderRadius: 8 * k }} />
      ¡Es ahora! ⚡
    </div>
  );
};

const Label: React.FC<{ id: MomentId; w: number; p: number; fontFamily: string }> = ({ id, w, p, fontFamily }) => {
  const k = w / 290;
  const l = LABELS[id];
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 74 * k,
        padding: `0 ${14 * k}px ${12 * k}px`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 8 * k,
        background: "linear-gradient(180deg, transparent, rgba(8,7,14,0.82))",
        fontFamily,
        opacity: p,
      }}
    >
      <div style={{ color: "#fff", fontSize: 20 * k, lineHeight: 1.15, whiteSpace: "nowrap" }}>
        <span style={{ fontWeight: 800 }}>{l.name}</span>
        <span style={{ opacity: 0.8, fontWeight: 500 }}> · {l.place}</span>
      </div>
      {l.late ? (
        <div
          style={{
            padding: `${4 * k}px ${10 * k}px`,
            borderRadius: 999,
            background: "rgba(255,197,61,0.28)",
            color: theme.colors.amber,
            fontSize: 21 * k,
            fontWeight: 800,
          }}
        >
          Tarde
        </div>
      ) : null}
    </div>
  );
};

export const Cards: React.FC<{ fontFamily: string }> = ({ fontFamily }) => {
  const f = useCurrentFrame();
  // Orden de dibujo: el laboratorio encima mientras viaja.
  const order: MomentId[] = [...GRID_ORDER.filter((id) => id !== "lab" && id !== "plaza"), "plaza", "lab"];
  const tagO = tw(f, [10, 26], [0, 1]) * (1 - tw(f, [F.push, F.push + 10], [0, 1]));
  return (
    <AbsoluteFill>
      {tagO > 0
        ? ROW_ORDER.map((id) => {
            const s = cardState(id, f);
            if (!s) return null;
            const { x, y, w } = s.place;
            return (
              <div
                key={`tag-${id}`}
                style={{
                  position: "absolute", left: x - 150, width: 300, top: y + (w * 1.25) / 2 + 18 + s.yOffset, textAlign: "center",
                  fontFamily, fontSize: 28, fontWeight: 600, color: theme.colors.textDim, opacity: tagO * s.opacity,
                }}
              >
                {ROW_TAGS[id]}
              </div>
            );
          })
        : null}
      {order.map((id) => {
        const s = cardState(id, f);
        if (!s || s.opacity <= 0.001) return null;
        const { x, y, w } = s.place;
        const h = w * (CARD.h / CARD.w);
        const k = w / CARD.w;
        const { Back, Front } = MOMENTS[id];
        const mp = momentProps(id, f);
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: x - w / 2,
              top: y - h / 2 + s.yOffset,
              width: w,
              height: h,
              borderRadius: CARD.radius * k,
              overflow: "hidden",
              opacity: s.opacity * s.dim,
              boxShadow: `0 ${14 * k}px ${36 * k}px -${8 * k}px rgba(0,0,0,0.4)`,
              outline: `${1.2 * k}px solid rgba(255,255,255,0.08)`,
              outlineOffset: -1.2 * k,
              backgroundColor: theme.colors.bgAlt,
            }}
          >
            <div style={{ position: "absolute", inset: 0, filter: s.blur > 0.2 ? `blur(${s.blur}px)` : undefined, transform: s.blur > 0.2 ? "scale(1.08)" : undefined }}>
              <Back {...mp} />
              {s.front > 0 ? (
                <div
                  style={{
                    position: "absolute",
                    left: FRONT.x * k,
                    top: FRONT.y * k,
                    width: FRONT.w * k,
                    height: FRONT.h * k,
                    borderRadius: FRONT.radius * k,
                    overflow: "hidden",
                    opacity: s.front,
                    transform: `scale(${0.88 + 0.12 * s.front})`,
                    transformOrigin: "100% 0%",
                    border: `${2.2 * k}px solid rgba(255,255,255,0.92)`,
                  }}
                >
                  <Front t={mp.t} />
                </div>
              ) : null}
            </div>
            {s.blur > 0.2 ? <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", opacity: s.blur / 22 }} /> : null}
            {s.notif > 0 ? <Notif w={w} p={s.notif} fontFamily={fontFamily} /> : null}
            {s.label > 0 ? <Label id={id} w={w} p={s.label} fontFamily={fontFamily} /> : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
