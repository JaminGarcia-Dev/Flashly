import React from "react";
import { Composition } from "remotion";
import { Commercial, type CommercialProps } from "./Commercial";
import { CommercialV4, type CommercialV4Props } from "./v4/Commercial";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* v4: explicador sin voz (actual). */}
      <Composition
        id="Flashly16x9"
        component={CommercialV4}
        durationInFrames={VIDEO.frames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ cta: "", voice: "none" } satisfies CommercialV4Props}
      />
      {/* v4 con locución (tomas de ElevenLabs). */}
      <Composition
        id="Flashly16x9Juan"
        component={CommercialV4}
        durationInFrames={VIDEO.frames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ cta: "", voice: "juan" } satisfies CommercialV4Props}
      />
      <Composition
        id="Flashly16x9Antonio"
        component={CommercialV4}
        durationInFrames={VIDEO.frames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ cta: "", voice: "antonio" } satisfies CommercialV4Props}
      />
      {/* v3: «Ese momento también está aquí» (referencia). */}
      <Composition
        id="Flashly16x9V3"
        component={Commercial}
        durationInFrames={VIDEO.frames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
        defaultProps={{ cta: "" } satisfies CommercialProps}
      />
    </>
  );
};
