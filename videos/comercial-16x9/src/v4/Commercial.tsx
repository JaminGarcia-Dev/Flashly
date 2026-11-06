// v4 · «Mismo aviso. Todo tu campus.» · Flashly · 16:9, 30 s, se entiende sin voz.
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Background, Grade, Grain, Vignette } from "../components/Overlays";
import { Cards } from "./Cards";
import { PhoneBody, PhoneUI } from "./Phone";
import { AmberCover, BrandBug, Callouts, CaptureVeil, Clock, DayBadge, EndCard, LockCard, NotifPulses, Supers, Tap } from "./Overlays";
import { F } from "./timeline";
import { type Voice, VoiceOver, musicDuck } from "./VoiceOver";

const { fontFamily } = loadFont("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin"] });

const Sfx: React.FC<{ src: string; at: number; volume: number; pitch?: number }> = ({ src, at, volume, pitch = 1 }) => (
  <Sequence from={Math.max(0, at)} layout="none" name={`${src}@${at}`}>
    <Audio src={staticFile(`audio/${src}`)} volume={volume} playbackRate={pitch} />
  </Sequence>
);

const MUSIC: [number, number][] = [
  [0, 0.6], [15, 0.85],
  [F.notif - 1, 0.85], [F.notif + 1, 0.6], [F.notif + 8, 0.85],
  [F.capture - 1, 0.85], [F.capture + 1, 0.6], [F.capture + 6, 0.85],
  [F.tap, 0.85], [F.tap + 10, 0.95],
  [F.end - 40, 0.95], [F.end, 0],
];

const Soundtrack: React.FC<{ voice: Voice }> = ({ voice }) => (
  <>
    <Audio
      src={staticFile("audio/music_v4.wav")}
      volume={(f) =>
        musicDuck(voice, f) * interpolate(f, MUSIC.map((k) => k[0]), MUSIC.map((k) => k[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      }
    />
    <VoiceOver voice={voice} />
    {/* El mismo aviso en muchos teléfonos: tres voces casi al unísono. */}
    <Sfx src="notif.wav" at={F.notif - 1} volume={1} />
    <Sfx src="notif.wav" at={F.notif} volume={0.5} pitch={0.985} />
    <Sfx src="notif.wav" at={F.notif + 1} volume={0.4} pitch={1.02} />
    <Sfx src="fold.wav" at={F.coverStart - 2} volume={0.9} pitch={0.9} />
    <Sfx src="shutter.wav" at={F.capture - 1} volume={1} />
    <Sfx src="tap.wav" at={F.tap - 1} volume={0.9} />
    <Sfx src="unlock.wav" at={F.tap + 1} volume={0.95} />
    <Sfx src="fold.wav" at={F.gridMove - 1} volume={0.7} pitch={1.05} />
  </>
);

export type CommercialV4Props = { cta?: string; voice?: Voice };

export const CommercialV4: React.FC<CommercialV4Props> = ({ cta, voice = "none" }) => (
  <AbsoluteFill style={{ fontFamily }}>
    <Background />
    <PhoneBody />
    <Cards fontFamily={fontFamily} />
    <PhoneUI fontFamily={fontFamily} />
    <NotifPulses />
    <Clock fontFamily={fontFamily} />
    <Callouts fontFamily={fontFamily} />
    <LockCard fontFamily={fontFamily} />
    <Tap />
    <DayBadge fontFamily={fontFamily} />
    <EndCard fontFamily={fontFamily} cta={cta || undefined} />
    <CaptureVeil />
    <AmberCover />
    <Supers fontFamily={fontFamily} />
    <BrandBug fontFamily={fontFamily} />
    <Grade />
    <Grain />
    <Vignette />
    <Soundtrack voice={voice} />
  </AbsoluteFill>
);
