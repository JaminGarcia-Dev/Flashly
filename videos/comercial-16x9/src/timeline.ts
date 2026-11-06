// Línea de tiempo en frames (30 fps). Música a 120 BPM: 15 frames por negra, 60 por compás.
// Guion base: ChatGPT (fusión «Ese momento también está aquí»), adaptado a 16:9 por Claude.
// v2: tiempos revisados con la crítica de cuadros de ChatGPT (ronda 4).
import type { MomentId } from "./moments/types";

export const T = {
  // Gancho: la reta, balón suspendido antes del aro (pausa corta antes del aviso).
  ballEnd: 52,
  // Aviso: 24 f de lectura asentado antes de que su ámbar cubra el plano.
  notifIn: 60,
  coverStart: 84,
  cut: 88, // corte oculto bajo el ámbar
  coverEnd: 100,
  notifOut: 116,
  // Ventana activa: 2:00.
  timerStart: 100,
  timerTextIn: 104,
  frontIn: 108,
  handStart: 140,
  ledOn: 160,
  capture: 180,
  published: 188,
  // Publicación y despliegue.
  phoneOut: 210,
  unlock: 210,
  mosaicCam: 300, // marcador musical
  textIn: 330,
  textOut: 430,
  cafeZoom: 430,
  // Reconocimiento: la reta era un momento compartido.
  diveStart: 510,
  diveEnd: 550,
  pullStart: 578,
  pullEnd: 612,
  courtFrontIn: 590,
  backToAll: 650,
  allEnd: 690,
  // Cierre.
  brandIn: 704,
  end: 900,
} as const;

// Posiciones de mundo (centro de cada tarjeta). Rejilla 3×2, separación 40.
export const POS: Record<MomentId, [number, number]> = {
  lab: [-360, -220],
  cafe: [0, -220],
  library: [360, -220],
  hallway: [-360, 220],
  plaza: [0, 220],
  court: [360, 220],
};

// Cómo se despliega cada tarjeta: desde detrás de su «padre», girando sobre una bisagra.
export type Unfold = { parent: MomentId; start: number; hinge: "left" | "top" };
export const UNFOLDS: Partial<Record<MomentId, Unfold>> = {
  cafe: { parent: "lab", start: 222, hinge: "left" },
  hallway: { parent: "lab", start: 234, hinge: "top" },
  library: { parent: "cafe", start: 256, hinge: "left" },
  plaza: { parent: "cafe", start: 266, hinge: "top" },
  court: { parent: "plaza", start: 278, hinge: "left" },
};
export const UNFOLD_ANGLE = 38;

// Orden de dibujo: el padre siempre encima del hijo que sale de detrás.
export const DRAW_ORDER: MomentId[] = ["court", "plaza", "library", "hallway", "cafe", "lab"];

// Encuadre del gancho dentro de la tarjeta de la cancha (aro + balón), bajado para ver las manos.
// s mínimo = 1920 / 320 = 6: con menos, la tarjeta no cubre el ancho 16:9.
export const HOOK_FRAMING = { cx: 360, cy: 150, s: 6.02 } as const;
// Teléfono: el visor mide 410 px de ancho -> escala de cámara 410 / 320.
export const PHONE_S = 410 / 320;
export const PHONE_ANCHOR = { x: 1200, y: 480 } as const;
