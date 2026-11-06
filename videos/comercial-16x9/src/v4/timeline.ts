// v4 «Mismo aviso. Todo tu campus.» — explicador sin voz.
// Guion: síntesis Claude × ChatGPT + investigación (rótulos ≥2 s, ~0.6 s/palabra, 3 pasos numerados,
// texto junto a la UI, mostrar la mecánica). Eventos clave en múltiplos de 15 f (negras a 120 BPM).
import type { MomentId } from "../moments/types";

export const F = {
  clockFlip: 75,
  notif: 90,
  push: 195,
  coverStart: 210,
  cut: 218,
  coverEnd: 232,
  timerStart: 225,
  frontIn: 285,
  callouts: 326,
  ledOn: 340,
  handStart: 350,
  capture: 405,
  publishIn: 420,
  tap: 510,
  gridMove: 585,
  labels: 615,
  late: 640,
  dayLimit: 705,
  endFade: 770,
  brandIn: 784,
  end: 900,
} as const;

export type Super = { from: number; to: number; text: string; step?: number };
export const SUPERS: Super[] = [
  { from: 6, to: 105, text: "Una vez al día, a una hora sorpresa…" },
  { from: 105, to: 210, text: "Todo tu campus recibe el mismo aviso.", step: 1 },
  { from: 228, to: 330, text: "Tienes 2 minutos para tu foto.", step: 2 },
  { from: 330, to: 420, text: "Trasera y frontal, en una sola foto." },
  { from: 435, to: 525, text: "Publica el tuyo…", step: 3 },
  { from: 525, to: 615, text: "…y descubre los de todo tu campus." },
  { from: 630, to: 705, text: "¿Llegas tarde? Igual puedes publicar." },
  { from: 705, to: 780, text: "Visibles solo durante 24 horas." },
];

// Disposiciones en pantalla (centro x, centro y, ancho; alto = ancho × 1.25).
export type Place = { x: number; y: number; w: number };
export const ROW_ORDER: MomentId[] = ["court", "cafe", "lab", "library", "hallway", "plaza"];
export const rowPlace = (id: MomentId): Place => ({ x: 220 + 296 * ROW_ORDER.indexOf(id), y: 500, w: 270 });

// Teléfono a escala 0.8: el visor (410 px) mide 328 px; su centro está 420×0.8 px bajo el borde superior.
export const PHONE_K = 0.8;
export const PHONE_TOP = 36;
export const VF_Y = PHONE_TOP + 420 * PHONE_K;
export const phonePlace = (x: number): Place => ({ x, y: VF_Y, w: 410 * PHONE_K });

export const PUB_ORDER: MomentId[] = ["cafe", "library", "hallway", "plaza", "court"];
const PUB: Place[] = [
  { x: 1076, y: 262, w: 250 },
  { x: 1350, y: 262, w: 250 },
  { x: 1624, y: 262, w: 250 },
  { x: 1213, y: 598, w: 250 },
  { x: 1487, y: 598, w: 250 },
];
export const pubPlace = (id: MomentId): Place => PUB[PUB_ORDER.indexOf(id)];
export const LOCK_CENTER = { x: 1350, y: 430 };

export const GRID_ORDER: MomentId[] = ["lab", "cafe", "library", "hallway", "plaza", "court"];
export const gridPlace = (id: MomentId): Place => {
  const i = GRID_ORDER.indexOf(id);
  return { x: 642 + 318 * (i % 3), y: 238 + 388 * Math.floor(i / 3), w: 290 };
};

// Lugar de cada escena antes del aviso: seis lugares del campus en el mismo instante.
export const ROW_TAGS: Record<MomentId, string> = {
  court: "Cancha",
  cafe: "Cafetería",
  lab: "Laboratorio",
  library: "Biblioteca",
  hallway: "Edificio B",
  plaza: "Explanada",
};

export const LABELS: Record<MomentId, { name: string; place: string; late?: boolean }> = {
  lab: { name: "Tú", place: "Lab. de electrónica" },
  cafe: { name: "Dani", place: "Cafetería" },
  library: { name: "Sofi", place: "Biblioteca" },
  hallway: { name: "Leo", place: "Edificio B" },
  plaza: { name: "Mar", place: "Explanada", late: true },
  court: { name: "Iker", place: "Cancha" },
};
