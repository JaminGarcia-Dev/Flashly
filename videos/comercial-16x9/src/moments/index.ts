import type { MomentDef, MomentId } from "./types";
import * as court from "./Court";
import * as cafe from "./Cafe";
import * as lab from "./Lab";
import * as library from "./Library";
import * as hallway from "./Hallway";
import * as plaza from "./Plaza";

export const MOMENTS: Record<MomentId, MomentDef> = {
  court: { id: "court", Back: court.Back, Front: court.Front },
  cafe: { id: "cafe", Back: cafe.Back, Front: cafe.Front },
  lab: { id: "lab", Back: lab.Back, Front: lab.Front },
  library: { id: "library", Back: library.Back, Front: library.Front },
  hallway: { id: "hallway", Back: hallway.Back, Front: hallway.Front },
  plaza: { id: "plaza", Back: plaza.Back, Front: plaza.Front },
};
