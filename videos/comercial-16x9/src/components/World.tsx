// El mundo: seis tarjetas-momento colocadas en coordenadas de mundo y dibujadas
// a su tamaño real en pantalla (el SVG se rasteriza nítido incluso con zoom 6×).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MOMENTS } from "../moments";
import type { MomentId } from "../moments/types";
import { tw, lerp } from "../lib/anim";
import { cameraAt, toScreen } from "../lib/camera";
import { CARD, FRONT, theme } from "../theme";
import { DRAW_ORDER, POS, T, UNFOLD_ANGLE, UNFOLDS } from "../timeline";

const FPS = 30;

// Las fotos ya publicadas están congeladas; solo el visor del laboratorio vive antes de la captura.
const momentTime = (id: MomentId, frame: number) => {
  if (id === "lab") return Math.min(frame, T.capture) / FPS;
  return 1.2;
};

const visible = (id: MomentId, frame: number) => {
  if (id === "court") return frame < T.cut || frame >= (UNFOLDS.court?.start ?? 0);
  if (id === "lab") return frame >= T.cut;
  const u = UNFOLDS[id];
  return u ? frame >= u.start : true;
};

const frontState = (id: MomentId, frame: number) => {
  if (id === "lab") {
    const o = tw(frame, [T.frontIn, T.frontIn + 18], [0, 1]);
    return { opacity: o, scale: lerp(0.88, 1, o) };
  }
  if (id === "court") {
    const o = tw(frame, [T.courtFrontIn, T.courtFrontIn + 16], [0, 1]);
    return { opacity: o, scale: lerp(0.9, 1, o) };
  }
  return { opacity: 1, scale: 1 };
};

export const World: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = cameraAt(frame);

  // Al cerrar, el mosaico se aparta y deja paso a la marca.
  const recede = tw(frame, [T.allEnd, T.allEnd + 50], [0, 1], theme.ease.inOut);
  const groupOpacity = 1 - tw(frame, [T.allEnd + 10, T.allEnd + 50], [0, 1], theme.ease.out);
  if (groupOpacity <= 0.001) return null;

  return (
    <AbsoluteFill
      style={{
        opacity: groupOpacity,
        transform: `translateY(${-70 * recede}px) scale(${1 - 0.1 * recede})`,
      }}
    >
      {DRAW_ORDER.filter((id) => visible(id, frame)).map((id) => {
        const u = UNFOLDS[id];
        let [wx, wy] = POS[id];
        let rot = "";
        let origin = "50% 50%";
        let opacity = 1;
        if (u && !(id === "court" && frame < T.cut)) {
          // Rota sobre la bisagra en 24 f y viaja a su lugar en 42 f, desde detrás del padre.
          const turn = tw(frame, [u.start, u.start + 24], [0, 1]);
          const move = tw(frame, [u.start, u.start + 42], [0, 1]);
          const [px, py] = POS[u.parent];
          wx = lerp(px, wx, move);
          wy = lerp(py, wy, move);
          opacity = tw(frame, [u.start, u.start + 6], [0, 1]);
          if (u.hinge === "left") {
            rot = `rotateY(${UNFOLD_ANGLE * (1 - turn)}deg) scale(${0.96 + 0.04 * turn})`;
            origin = "0% 50%";
          } else {
            rot = `rotateX(${-UNFOLD_ANGLE * (1 - turn)}deg) scale(${0.96 + 0.04 * turn})`;
            origin = "50% 0%";
          }
        }
        const c = toScreen(cam, wx, wy);
        const w = CARD.w * cam.s;
        const h = CARD.h * cam.s;
        const fs = frontState(id, frame);
        const { Back, Front } = MOMENTS[id];
        const t = momentTime(id, frame);
        const extra =
          id === "court"
            ? { ball: tw(frame, [0, T.ballEnd], [0, 1], theme.ease.out) }
            : id === "lab"
              ? {
                  led: tw(frame, [T.ledOn, T.ledOn + 8], [0, 1]),
                  hand: tw(frame, [T.handStart, T.handStart + 24], [0, 1], theme.ease.inOut),
                }
              : {};
        // Fuera de pantalla: no dibujar.
        if (c.x + w / 2 < -50 || c.x - w / 2 > 1970 || c.y + h / 2 < -50 || c.y - h / 2 > 1130) return null;
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: c.x - w / 2,
              top: c.y - h / 2,
              width: w,
              height: h,
              borderRadius: CARD.radius * cam.s,
              overflow: "hidden",
              opacity,
              transform: rot ? `perspective(${1400 * cam.s}px) ${rot}` : undefined,
              transformOrigin: origin,
              boxShadow: `0 ${16 * cam.s}px ${40 * cam.s}px -${10 * cam.s}px rgba(0,0,0,0.38)`,
              outline: `${1.2 * cam.s}px solid rgba(255,255,255,0.08)`,
              outlineOffset: -1.2 * cam.s,
              backgroundColor: theme.colors.bgAlt,
            }}
          >
            <Back t={t} {...extra} />
            {fs.opacity > 0 ? (
              <div
                style={{
                  position: "absolute",
                  left: FRONT.x * cam.s,
                  top: FRONT.y * cam.s,
                  width: FRONT.w * cam.s,
                  height: FRONT.h * cam.s,
                  borderRadius: FRONT.radius * cam.s,
                  overflow: "hidden",
                  opacity: fs.opacity,
                  transform: `scale(${fs.scale})`,
                  transformOrigin: "100% 0%",
                  border: `${2.2 * cam.s}px solid rgba(255,255,255,0.92)`,
                  boxShadow: `0 ${6 * cam.s}px ${16 * cam.s}px rgba(0,0,0,0.45)`,
                }}
              >
                <Front t={t} />
              </div>
            ) : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
