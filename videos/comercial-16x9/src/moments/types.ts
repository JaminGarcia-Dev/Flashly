// Contrato entre el sistema de cámara (Claude) y las escenas-momento (ChatGPT).
//
// Cada momento exporta dos componentes SVG puros:
//   Back  -> cámara trasera, viewBox "0 0 320 400" (4:5), llena el 100 % de su contenedor.
//   Front -> cámara frontal, viewBox "0 0 96 128" (3:4), llena el 100 % de su contenedor.
// Reglas: deterministas (sin Math.random, sin Date), sin texto ni glifos, sin assets externos,
// ids de gradientes/clipPaths únicos por instancia con React.useId().
import type React from "react";

export type MomentProps = {
  /** Segundos desde el inicio del video. Solo para micro-movimiento sutil (respirar, vapor, hojas). */
  t: number;
};

export type CourtBackProps = MomentProps & {
  /** 0 -> balón entra por abajo a la izquierda; 1 -> balón congelado a 12 px del aro. Trayectoria parabólica. */
  ball: number;
};

export type LabBackProps = MomentProps & {
  /** 0 -> LED apagado; 1 -> LED ámbar encendido con halo. */
  led: number;
  /** 0 -> mano en reposo; 1 -> mano acercó el cable 18 px hacia la protoboard. */
  hand: number;
};

export type MomentId = "lab" | "cafe" | "library" | "hallway" | "plaza" | "court";

export type MomentDef = {
  id: MomentId;
  Back: React.FC<MomentProps & Partial<CourtBackProps> & Partial<LabBackProps>>;
  Front: React.FC<MomentProps>;
};
