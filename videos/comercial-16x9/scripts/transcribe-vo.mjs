// Transcribe tomas de voz con whisper.cpp local (palabras con tiempos).
// Uso: node scripts/transcribe-vo.mjs <carpetaWhisper> <salida.json> <audio16k.wav>...
import { downloadWhisperModel, installWhisperCpp, transcribe } from "@remotion/install-whisper-cpp";
import { writeFileSync } from "node:fs";
import path from "node:path";

const [whisperDir, outFile, ...inputs] = process.argv.slice(2);
const version = "1.5.5";
const model = "small";
await installWhisperCpp({ to: whisperDir, version, printOutput: false });
await downloadWhisperModel({ model, folder: whisperDir, printOutput: false });
const result = {};
for (const input of inputs) {
  const { transcription } = await transcribe({
    inputPath: input,
    whisperPath: whisperDir,
    whisperCppVersion: version,
    model,
    tokenLevelTimestamps: true,
    language: "es",
    splitOnWord: true,
    printOutput: false,
  });
  result[path.basename(input)] = transcription.map((t) => ({
    text: t.text,
    from: t.offsets.from / 1000,
    to: t.offsets.to / 1000,
    words: (t.tokens ?? [])
      .filter((k) => !k.text.startsWith("[_"))
      .map((k) => ({ w: k.text, t0: k.offsets.from / 1000, t1: k.offsets.to / 1000, p: +k.p.toFixed(2) })),
  }));
  console.log("ok", input);
}
writeFileSync(outFile, JSON.stringify(result, null, 1));
