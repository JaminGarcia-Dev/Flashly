// Tres capas: cama musical con curva de volumen, impactos y sonidos táctiles de UI.
// Los efectos se disparan 1–2 frames antes de que aterrice lo visual.
import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";
import { T, UNFOLDS } from "../timeline";

const Sfx: React.FC<{ src: string; at: number; volume: number; pitch?: number }> = ({ src, at, volume, pitch = 1 }) => (
  <Sequence from={Math.max(0, at)} layout="none" name={src}>
    <Audio src={staticFile(`audio/${src}`)} volume={volume} playbackRate={pitch} />
  </Sequence>
);

// [frame, volumen]: entra cálida, se agacha bajo el aviso y la captura, crece en el desbloqueo.
const MUSIC_CURVE: [number, number][] = [
  [0, 0.55], [15, 0.8],
  [T.notifIn - 1, 0.8], [T.notifIn + 1, 0.56], [T.notifIn + 6, 0.8],
  [T.capture - 1, 0.8], [T.capture + 1, 0.56], [T.capture + 6, 0.82],
  [T.unlock, 0.85], [T.mosaicCam, 0.95],
  [T.end - 45, 0.95], [T.end, 0],
];

export const Soundtrack: React.FC = () => {
  const folds = Object.values(UNFOLDS).map((u) => u!.start);
  const pitches = [1, 0.94, 1.06, 0.97, 1.03];
  return (
    <>
      <Audio
        src={staticFile("audio/music.wav")}
        volume={(f) =>
          interpolate(f, MUSIC_CURVE.map((k) => k[0]), MUSIC_CURVE.map((k) => k[1]), {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sfx src="ball.wav" at={0} volume={1} />
      <Sfx src="notif.wav" at={T.notifIn - 1} volume={1} />
      <Sfx src="shutter.wav" at={T.capture - 1} volume={1} />
      <Sfx src="unlock.wav" at={T.unlock} volume={0.9} />
      {folds.map((f, i) => (
        <Sfx key={f} src="fold.wav" at={f - 1} volume={0.85} pitch={pitches[i % pitches.length]} />
      ))}
      {/* Regresa, muy suave, la resonancia del balón al reconocer la reta. */}
      <Sfx src="ball.wav" at={T.diveEnd - 2} volume={0.28} pitch={0.92} />
    </>
  );
};
