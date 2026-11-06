// Máster simple de la mezcla: ganancia a un RMS objetivo + limitador suave con techo.
// Uso: node scripts/master-audio.mjs entrada.wav salida.wav [rmsObjetivo_dBFS=-16] [techo_dBFS=-1]
import { readFileSync, writeFileSync } from "node:fs";

const [inp, out, rmsT = "-16", ceilT = "-1"] = process.argv.slice(2);
const b = readFileSync(inp);
const ch = b.readUInt16LE(22);
const sr = b.readUInt32LE(24);
let o = 12;
while (b.toString("ascii", o, o + 4) !== "data") o += 8 + b.readUInt32LE(o + 4);
o += 8;
const n = (b.length - o) / 2;
const x = new Float32Array(n);
for (let i = 0; i < n; i++) x[i] = b.readInt16LE(o + i * 2) / 32768;

const dB = (d) => Math.pow(10, d / 20);
let ss = 0;
for (const v of x) ss += v * v;
const rms = Math.sqrt(ss / n);
const ceil = dB(Number(ceilT));
const gain = dB(Number(rmsT)) / rms;
// Limitador: lineal hasta el 60 % del techo, curva tanh por encima (nunca supera el techo).
const knee = ceil * 0.6;
const lim = (v) => {
  const a = Math.abs(v);
  if (a <= knee) return v;
  return Math.sign(v) * (knee + (ceil - knee) * Math.tanh((a - knee) / (ceil - knee)));
};
let pk = 0, ss2 = 0;
const y = new Int16Array(n);
for (let i = 0; i < n; i++) {
  const v = lim(x[i] * gain);
  pk = Math.max(pk, Math.abs(v));
  ss2 += v * v;
  y[i] = Math.round(v * 32767);
}
const data = Buffer.alloc(44 + n * 2);
data.write("RIFF", 0); data.writeUInt32LE(36 + n * 2, 4); data.write("WAVE", 8);
data.write("fmt ", 12); data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(ch, 22);
data.writeUInt32LE(sr, 24); data.writeUInt32LE(sr * ch * 2, 28); data.writeUInt16LE(ch * 2, 32); data.writeUInt16LE(16, 34);
data.write("data", 36); data.writeUInt32LE(n * 2, 40);
Buffer.from(y.buffer).copy(data, 44);
writeFileSync(out, data);
console.log(`${out.split(/[\\/]/).pop()}: ganancia ${(20 * Math.log10(gain)).toFixed(1)} dB · pico ${(20 * Math.log10(pk)).toFixed(1)} dBFS · RMS ${(10 * Math.log10(ss2 / n)).toFixed(1)} dBFS`);
