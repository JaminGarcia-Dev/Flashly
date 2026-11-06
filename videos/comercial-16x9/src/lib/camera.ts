// Cámara de mundo: pantalla = (mundo − C) × S + ancla.
// La escala se interpola en espacio logarítmico para que el zoom se perciba uniforme.
import { theme } from "../theme";
import { HOOK_FRAMING, PHONE_ANCHOR, PHONE_S, POS, T } from "../timeline";

export type Cam = { cx: number; cy: number; s: number; ax: number; ay: number };
type Key = Cam & { f: number; ease?: (t: number) => number };

const [labX, labY] = POS.lab;
const [cafeX, cafeY] = POS.cafe;
const [courtX, courtY] = POS.court;
const C = { ax: 960, ay: 540 };

const KEYS: Key[] = [
  { f: 0, cx: HOOK_FRAMING.cx, cy: HOOK_FRAMING.cy, s: HOOK_FRAMING.s, ...C },
  { f: T.cut - 1, cx: HOOK_FRAMING.cx, cy: HOOK_FRAMING.cy, s: HOOK_FRAMING.s, ...C },
  // Corte oculto bajo el ámbar: el visor del teléfono enmarca el laboratorio.
  { f: T.cut, cx: labX, cy: labY, s: PHONE_S, ax: PHONE_ANCHOR.x, ay: PHONE_ANCHOR.y },
  { f: T.phoneOut, cx: labX, cy: labY, s: PHONE_S, ax: PHONE_ANCHOR.x, ay: PHONE_ANCHOR.y },
  // La captura se publica: el teléfono se va con ella y la cámara retrocede.
  { f: 250, cx: labX + 120, cy: labY + 80, s: 1.0, ax: 1000, ay: 540, ease: theme.ease.out },
  // Mosaico completo, desplazado a la derecha para dejar la columna de texto.
  { f: 315, cx: 0, cy: 0, s: 0.88, ax: 1340, ay: 540, ease: theme.ease.inOut },
  { f: T.cafeZoom, cx: 0, cy: 0, s: 0.88, ax: 1340, ay: 540 },
  // Exploración: la cafetería.
  { f: 475, cx: cafeX, cy: cafeY, s: 1.9, ...C, ease: theme.ease.inOut },
  { f: T.diveStart, cx: cafeX, cy: cafeY, s: 1.95, ...C, ease: theme.ease.inOut },
  // Reconocimiento: mismo encuadre que el gancho.
  { f: T.diveEnd, cx: HOOK_FRAMING.cx, cy: HOOK_FRAMING.cy, s: HOOK_FRAMING.s, ...C, ease: theme.ease.inOut },
  { f: T.pullStart, cx: HOOK_FRAMING.cx, cy: HOOK_FRAMING.cy, s: HOOK_FRAMING.s, ...C },
  // Se alejan los bordes: era la captura de alguien más.
  { f: T.pullEnd, cx: courtX, cy: courtY, s: 2.2, ...C, ease: theme.ease.out },
  { f: T.backToAll, cx: courtX, cy: courtY, s: 2.2, ...C },
  { f: T.allEnd, cx: 0, cy: 0, s: 0.95, ...C, ease: theme.ease.inOut },
];

export const cameraAt = (frame: number): Cam => {
  if (frame <= KEYS[0].f) return KEYS[0];
  for (let i = 1; i < KEYS.length; i++) {
    const a = KEYS[i - 1];
    const b = KEYS[i];
    if (frame <= b.f) {
      const raw = (frame - a.f) / (b.f - a.f);
      const p = (b.ease ?? theme.ease.inOut)(Math.max(0, Math.min(1, raw)));
      const l = (x: number, y: number) => x + (y - x) * p;
      return {
        cx: l(a.cx, b.cx),
        cy: l(a.cy, b.cy),
        s: Math.exp(l(Math.log(a.s), Math.log(b.s))),
        ax: l(a.ax, b.ax),
        ay: l(a.ay, b.ay),
      };
    }
  }
  return KEYS[KEYS.length - 1];
};

export const toScreen = (cam: Cam, wx: number, wy: number) => ({
  x: cam.ax + (wx - cam.cx) * cam.s,
  y: cam.ay + (wy - cam.cy) * cam.s,
});
