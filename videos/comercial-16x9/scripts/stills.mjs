// Renderiza cuadros clave para inspección. Uso: node scripts/stills.mjs 20 74 180 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const frames = process.argv.slice(2).map(Number);
const out = join(root, "out", "check");
mkdirSync(out, { recursive: true });
const serveUrl = await bundle({ entryPoint: join(root, "src", "index.ts") });
const composition = await selectComposition({ serveUrl, id: "Flashly16x9" });
for (const frame of frames) {
  const output = join(out, `f${String(frame).padStart(3, "0")}.png`);
  await renderStill({ serveUrl, composition, frame, output, overwrite: true, scale: 0.5 });
  console.log("ok", output);
}
