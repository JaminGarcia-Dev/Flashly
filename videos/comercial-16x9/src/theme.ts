// Única fuente de verdad: colores, curvas, springs y medidas.
// Nunca escribir un hex, una curva o un spring dentro de un componente.
import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#090811",
    bgAlt: "#12101F",
    violet: "#7C5CFF",
    magenta: "#C24FE0",
    pink: "#FF4F8B",
    // Ámbar: solo aviso activo, ventana de 2:00 y flash de captura.
    amber: "#FFC53D",
    text: "#F5F3FF",
    textDim: "#A49FBF",
    phoneBody: "#1A1824",
    phoneEdge: "#2C2939",
  },
  fonts: {
    body: "Inter",
  },
  ease: {
    // E de ChatGPT / ease-out fuerte para entradas.
    out: Easing.bezier(0.22, 1, 0.36, 1),
    // IO: movimientos de cámara y morfosis en pantalla.
    inOut: Easing.bezier(0.65, 0, 0.35, 1),
    // Solo salidas.
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    // Aviso y asentamiento de captura (overshoot recortado).
    settle: { mass: 1, stiffness: 180, damping: 24, overshootClamping: true },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
  },
} as const;

export const VIDEO = { width: 1920, height: 1080, fps: 30, frames: 900 } as const;

// Tarjeta-momento en coordenadas de mundo (4:5, como la captura trasera de la app).
export const CARD = { w: 320, h: 400, radius: 18 } as const;
// Ventana frontal dentro de la tarjeta (30 % del ancho, 3:4, esquina sup. derecha).
export const FRONT = { w: 96, h: 128, x: 212, y: 12, radius: 12 } as const;
