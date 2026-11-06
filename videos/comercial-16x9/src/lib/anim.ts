import { interpolate } from "remotion";
import { theme } from "../theme";

type Ease = (t: number) => number;

/** interpolate con curva y clamp en ambos extremos. Nunca lineal por omisión. */
export const tw = (
  frame: number,
  range: [number, number],
  out: [number, number],
  ease: Ease = theme.ease.out,
) =>
  interpolate(frame, range, out, {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
