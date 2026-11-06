// «Ese momento también está aquí» · Flashly · 16:9, 30 s, sin locución.
// Concepto y guion: fusión Claude × ChatGPT. Escenas-momento: ChatGPT. Sistema, cámara y audio: Claude.
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { World } from "./components/World";
import { PhoneBody, PhoneUI } from "./components/Phone";
import {
  AmberCover,
  Background,
  CaptureVeil,
  EndCard,
  Grade,
  Grain,
  HeroTimer,
  Notification,
  RewardText,
  Vignette,
} from "./components/Overlays";
import { Soundtrack } from "./components/Soundtrack";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

export type CommercialProps = {
  /** Llamada a la acción del cierre. Vacío = «Primero en la UTSV». */
  cta?: string;
};

export const Commercial: React.FC<CommercialProps> = ({ cta }) => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* 1 · fondo */}
      <Background />
      {/* 2 · assets: teléfono (cuerpo) bajo el mundo, UI encima */}
      <PhoneBody />
      <World />
      <PhoneUI fontFamily={fontFamily} />
      {/* 3 · gráficos y tipografía */}
      <HeroTimer fontFamily={fontFamily} />
      <RewardText fontFamily={fontFamily} />
      <EndCard fontFamily={fontFamily} cta={cta || undefined} />
      <CaptureVeil />
      <AmberCover />
      <Notification fontFamily={fontFamily} />
      {/* 4 · grade, 5 · grano + viñeta */}
      <Grade />
      <Grain />
      <Vignette />
      <Soundtrack />
    </AbsoluteFill>
  );
};
