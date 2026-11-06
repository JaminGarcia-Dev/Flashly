// Locución v4: cada frase se corta de la toma de ElevenLabs y se coloca en su segundo del video.
// Cortes medidos por detección de silencios + Whisper (palabras con tiempos).
import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";

export type Voice = "none" | "juan" | "antonio";

const FPS = 30;
// Inicio de cada frase en el video (s). La 8 se adelanta: dura ~2.8 s y debe terminar antes del cierre.
const PLACE = [0.2, 3.4, 7.6, 11.1, 13.9, 17.5, 21.0, 23.35, 26.25];

// [inicio, fin] de habla de cada frase dentro de la toma (s).
const CUTS: Record<Exclude<Voice, "none">, [number, number][]> = {
  juan: [[0.06, 2.12], [2.42, 5.28], [5.56, 8.44], [8.64, 10.3], [10.5, 12.7], [12.9, 15.06], [15.3, 17.42], [17.6, 20.36], [20.56, 24.0]],
  antonio: [[0.06, 2.2], [2.6, 5.46], [5.78, 8.64], [8.84, 10.42], [10.76, 12.9], [13.22, 15.5], [15.8, 17.7], [17.98, 20.76], [21.04, 24.38]],
};
// Igualar sonoridad: Juan es ~1.8 dB más fuerte que Antonio.
const GAIN: Record<Exclude<Voice, "none">, number> = { juan: 0.82, antonio: 1 };
const PRE = 0.05;
const POST = 0.08;

export const voiceSegments = (voice: Voice) => {
  if (voice === "none") return [];
  return CUTS[voice].map(([a, b], i) => {
    const from = Math.max(0, a - PRE);
    const to = b + POST;
    const start = PLACE[i] - (a - from);
    return { i, from, to, startF: Math.round(start * FPS), lenF: Math.ceil((to - from) * FPS) };
  });
};

/** Multiplicador de la música: −8 dB mientras habla la voz, rampas de 5 frames (~150 ms). */
export const musicDuck = (voice: Voice, f: number) => {
  let g = 1;
  for (const s of voiceSegments(voice)) {
    const a = s.startF;
    const z = s.startF + s.lenF;
    const d = interpolate(f, [a - 5, a, z, z + 5], [1, 0.4, 0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    g = Math.min(g, d);
  }
  return g;
};

export const VoiceOver: React.FC<{ voice: Voice }> = ({ voice }) => {
  if (voice === "none") return null;
  return (
    <>
      {voiceSegments(voice).map((s) => (
        <Sequence key={s.i} from={s.startF} durationInFrames={s.lenF} layout="none" name={`VO ${s.i + 1}`}>
          <Audio
            src={staticFile(`audio/vo/${voice}.mp3`)}
            trimBefore={Math.round(s.from * FPS)}
            durationInFrames={s.lenF}
            volume={(f) => GAIN[voice] * interpolate(f, [0, 2, s.lenF - 3, s.lenF], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
        </Sequence>
      ))}
    </>
  );
};
