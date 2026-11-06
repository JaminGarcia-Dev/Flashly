// Sintetiza la música y los efectos del comercial como WAV 48 kHz / 16 bit.
// Determinista (PRNG con semilla). Sin descargas. Uso: node scripts/synth-audio.mjs
// Partitura y parámetros de efectos: propuesta de ChatGPT (ronda 2), adaptada por Claude.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 48000;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "audio");
mkdirSync(OUT, { recursive: true });

// ---------- utilidades ----------
let seed = 20261104;
const rand = () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const white = () => rand() * 2 - 1;
const dB = (d) => Math.pow(10, d / 20);
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
const N = { A2: 45, C3: 48, E3: 52, F2: 41, G2: 43, A3: 57, B3: 59, C4: 60, D4: 62, E4: 64, F3: 53, G3: 55, G4: 67, A4: 69, B4: 71, C5: 72, E5: 76, G5: 79, A5: 81 };

class Biquad {
  constructor() { this.x1 = this.x2 = this.y1 = this.y2 = 0; this.set("lp", 1000, 0.707); }
  set(type, f, q) {
    const w = (2 * Math.PI * Math.min(f, SR * 0.45)) / SR;
    const c = Math.cos(w), s = Math.sin(w), a = s / (2 * q);
    let b0, b1, b2;
    if (type === "lp") { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; }
    else if (type === "hp") { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; }
    else { b0 = a; b1 = 0; b2 = -a; } // bp, ganancia 0 dB en el pico
    const a0 = 1 + a;
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0;
    this.a1 = (-2 * c) / a0; this.a2 = (1 - a) / a0;
  }
  run(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y;
    return y;
  }
}

// Envolvente ADSR-ish en ms: ataque lineal, caída exponencial a sustain, release.
const env = (tMs, { a = 5, d = 200, s = 0, hold = 0, r = 50 }) => {
  if (tMs < 0) return 0;
  if (tMs < a) return tMs / a;
  const td = tMs - a;
  const decayed = s + (1 - s) * Math.exp((-td / d) * 4.6);
  if (hold <= 0) return decayed;
  if (td < hold) return decayed;
  const tr = td - hold;
  return tr > r ? 0 : decayed * (1 - tr / r);
};

const buffer = (sec) => [new Float32Array(Math.ceil(sec * SR)), new Float32Array(Math.ceil(sec * SR))];
const addMono = (buf, start, mono, gain = 1, pan = 0) => {
  const i0 = Math.round(start * SR);
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
  const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
  for (let i = 0; i < mono.length; i++) {
    const j = i0 + i;
    if (j < 0 || j >= buf[0].length) continue;
    buf[0][j] += mono[i] * gl;
    buf[1][j] += mono[i] * gr;
  }
};
const normalizePeak = (buf, peakDb) => {
  let m = 0;
  for (const ch of buf) for (const v of ch) m = Math.max(m, Math.abs(v));
  const g = m > 0 ? dB(peakDb) / m : 1;
  for (const ch of buf) for (let i = 0; i < ch.length; i++) ch[i] *= g;
};
const writeWav = (name, buf) => {
  const n = buf[0].length, ch = buf.length;
  const data = Buffer.alloc(44 + n * ch * 2);
  data.write("RIFF", 0); data.writeUInt32LE(36 + n * ch * 2, 4); data.write("WAVE", 8);
  data.write("fmt ", 12); data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(ch, 22);
  data.writeUInt32LE(SR, 24); data.writeUInt32LE(SR * ch * 2, 28); data.writeUInt16LE(ch * 2, 32); data.writeUInt16LE(16, 34);
  data.write("data", 36); data.writeUInt32LE(n * ch * 2, 40);
  let o = 44;
  for (let i = 0; i < n; i++) for (let c = 0; c < ch; c++) {
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[c][i])) * 32767), o); o += 2;
  }
  writeFileSync(join(OUT, name), data);
  console.log("ok", name, (n / SR).toFixed(2) + "s");
};
const mono = (sec, fn) => {
  const out = new Float32Array(Math.ceil(sec * SR));
  for (let i = 0; i < out.length; i++) out[i] = fn(i / SR, i);
  return out;
};

// ---------- efectos (parámetros de ChatGPT) ----------
// 1. Balón: seno 155->68 Hz en 85 ms + ruido marrón LP 900 Hz (contacto).
const sfxBall = () => {
  const lp = new Biquad(); lp.set("lp", 900, 0.7);
  let brown = 0, ph = 0;
  const s = mono(0.45, (t) => {
    const f = 68 + (155 - 68) * Math.exp(-t / 0.03);
    ph += (2 * Math.PI * f) / SR;
    const body = Math.sin(ph) * env(t * 1000, { a: 1, d: 170 });
    brown = brown * 0.98 + white() * 0.1;
    const hit = lp.run(brown * 4) * env(t * 1000, { a: 0.5, d: 18 });
    return body + hit * 0.8;
  });
  const b = buffer(0.45); addMono(b, 0, s); normalizePeak(b, -12); return b;
};

// 2. Aviso: 880 Hz y luego 1318.5 Hz a 75 ms, armónico 2 a -18 dB.
const sfxNotif = () => {
  const note = (f) => mono(0.3, (t) => {
    const e = env(t * 1000, { a: 4, d: 100, s: 0.25, hold: 100, r: 50 });
    return (Math.sin(2 * Math.PI * f * t) + dB(-18) * Math.sin(2 * Math.PI * 2 * f * t) + 0.04 * Math.sin(2 * Math.PI * 3.01 * f * t)) * e;
  });
  const b = buffer(0.6);
  addMono(b, 0, note(880), 1, -0.1);
  addMono(b, 0.075, note(1318.5), 1, 0.1);
  normalizePeak(b, -13); return b;
};

// 3. Captura: ruido BP 1.8–6 kHz + seno 220->110 Hz en 35 ms, segundo clic fino a +38 ms.
const sfxShutter = () => {
  const hp = new Biquad(); hp.set("hp", 1800, 0.7);
  const lp = new Biquad(); lp.set("lp", 6000, 0.7);
  let ph = 0;
  const s = mono(0.25, (t) => {
    const n = lp.run(hp.run(white()));
    const click1 = n * env(t * 1000, { a: 1, d: 42 });
    const click2 = t > 0.038 ? n * 0.45 * env((t - 0.038) * 1000, { a: 0.5, d: 20 }) : 0;
    const f = 110 + 110 * Math.exp(-t / 0.012);
    ph += (2 * Math.PI * f) / SR;
    return click1 + click2 + Math.sin(ph) * 0.7 * env(t * 1000, { a: 1, d: 65 });
  });
  const b = buffer(0.25); addMono(b, 0, s); normalizePeak(b, -11); return b;
};

// 4. Pliegue: ruido rosa, BP 700->2800->1100 Hz, Q 1.2. Total ~212 ms.
const sfxFold = () => {
  const bp = new Biquad();
  let b0 = 0, b1 = 0, b2 = 0;
  const s = mono(0.3, (t) => {
    const w = white();
    b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913;
    const pink = (b0 + b1 + b2 + w * 0.1848) * 0.2;
    const ms = t * 1000;
    const fc = ms < 67 ? 700 + (2800 - 700) * (ms / 67) : 2800 + (1100 - 2800) * Math.min(1, (ms - 67) / 110);
    bp.set("bp", fc, 1.2);
    let e;
    if (ms < 12) e = ms / 12; else if (ms < 67) e = 1; else if (ms < 177) e = 1 - 0.6 * ((ms - 67) / 110); else e = Math.max(0, 0.4 * (1 - (ms - 177) / 35));
    return bp.run(pink) * e;
  });
  const b = buffer(0.3); addMono(b, 0, s); normalizePeak(b, -19); return b;
};

// 5. Desbloqueo: triángulos 220 / 261.63 / 329.63 Hz, LP 500->4200 Hz, 1.05 s.
const tri = (ph) => 2 * Math.abs(2 * (ph - Math.floor(ph + 0.5))) - 1;
const sfxUnlock = () => {
  const lp = new Biquad();
  const s = mono(1.3, (t) => {
    const ms = t * 1000;
    lp.set("lp", 500 + 3700 * Math.min(1, ms / 205), 0.8);
    let e;
    if (ms < 25) e = ms / 25; else if (ms < 205) e = 1; else if (ms < 555) e = 1 - 0.5 * ((ms - 205) / 350); else e = Math.max(0, 0.5 * (1 - (ms - 555) / 500));
    const x = tri(220 * t) + tri(261.63 * t * 1.002) + tri(329.63 * t * 0.998);
    return lp.run(x / 3) * e;
  });
  const b = buffer(1.3); addMono(b, 0, s, 1, -0.15); addMono(b, 0.011, s, 0.6, 0.6); normalizePeak(b, -17); return b;
};

// ---------- música: 120 BPM, 4/4, 15 compases = 30 s, la menor ----------
const BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4, LEN = 31;
const bar = (n, beat = 0) => (n - 1) * BAR + beat * BEAT; // compás 1-indexado

const keys = (f, dur, vel = 1, bright = 2400) => {
  const lp = new Biquad(); lp.set("lp", bright, 0.7);
  return mono(dur + 0.9, (t) => {
    const e = env(t * 1000, { a: 4, d: 650, s: 0, hold: 0 });
    const mod = Math.sin(2 * Math.PI * f * 2 * t) * 1.2 * Math.exp(-t * 5);
    const x = Math.sin(2 * Math.PI * f * t + mod) + 0.25 * Math.sin(2 * Math.PI * f * 2 * t);
    return lp.run(x) * e * vel;
  });
};
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));
const pad = (freqs, dur, cutoff = 1800) => {
  const lp = new Biquad(); lp.set("lp", cutoff, 0.6);
  return mono(dur + 1.2, (t) => {
    const atk = Math.min(1, t / 0.45);
    const rel = t > dur ? Math.max(0, 1 - (t - dur) / 1.1) : 1;
    let x = 0;
    for (const f of freqs) x += saw(f * t * 1.004) + saw(f * t * 0.996) + 0.6 * tri(f * 0.5 * t);
    return lp.run(x / (freqs.length * 2.6)) * atk * rel;
  });
};
const bassNote = (f, dur) => {
  const lp = new Biquad(); lp.set("lp", 320, 0.9);
  return mono(dur + 0.15, (t) => {
    const e = t < 0.01 ? t / 0.01 : t > dur ? Math.max(0, 1 - (t - dur) / 0.12) : 0.85 + 0.15 * Math.exp(-t * 6);
    return lp.run(Math.sin(2 * Math.PI * f * t) * 0.8 + saw(f * t) * 0.5) * e;
  });
};
const kick = () => { let ph = 0; return mono(0.4, (t) => { const f = 45 + 75 * Math.exp(-t / 0.035); ph += (2 * Math.PI * f) / SR; return Math.sin(ph) * env(t * 1000, { a: 1, d: 260 }) + white() * 0.15 * env(t * 1000, { a: 0.3, d: 4 }); }); };
const hat = () => { const hp = new Biquad(); hp.set("hp", 7500, 0.7); return mono(0.08, (t) => hp.run(white()) * env(t * 1000, { a: 0.5, d: 38 })); };
const clap = () => { const bp = new Biquad(); bp.set("bp", 1500, 1.1); return mono(0.25, (t) => { const ms = t * 1000; const bursts = [0, 9, 19].reduce((a, o) => a + (ms >= o ? env(ms - o, { a: 0.5, d: o === 19 ? 120 : 10 }) : 0), 0); return bp.run(white()) * bursts * 1.6; }); };
const pulse = (f) => { const lp = new Biquad(); lp.set("lp", 420, 1.4); return mono(0.25, (t) => lp.run(saw(f * t)) * env(t * 1000, { a: 3, d: 160 })); };
const riser = (dur) => { const bp = new Biquad(); return mono(dur, (t) => { bp.set("bp", 400 + 5000 * Math.pow(t / dur, 2), 1.5); return bp.run(white()) * Math.pow(t / dur, 2); }); };

const music = () => {
  const b = buffer(LEN);
  const K = kick(), H = hat(), C = clap();
  const kickTimes = [];
  // Compás 1 (0–2 s): pulso filtrado + una nota amortiguada. Espacio para el balón.
  for (let i = 1; i < 8; i++) addMono(b, i * BEAT / 2, pulse(midi(N.A2)), 0.10);
  addMono(b, bar(1, 1), keys(midi(N.A4), 0.6, 0.35, 1400), 1, 0.2);
  // Compases 2–4: pulso, motivo mi–sol–la, bombo en 1 y 3.
  for (let n = 2; n <= 4; n++) {
    for (let i = 0; i < 8; i++) addMono(b, bar(n) + (i * BEAT) / 2, pulse(midi(N.A2)), 0.12);
    for (const bt of [0, 2]) { addMono(b, bar(n, bt), K, 0.55); kickTimes.push(bar(n, bt)); }
    if (n <= 3) {
      addMono(b, bar(n, 0.5), keys(midi(N.E4), 0.4, 0.45), 1, -0.25);
      addMono(b, bar(n, 1), keys(midi(N.G4), 0.4, 0.45), 1, 0);
      addMono(b, bar(n, 1.5), keys(midi(N.A4), 0.9, 0.5), 1, 0.25);
    }
  }
  // Compás 4, desde 7 s: barrido hacia el desbloqueo.
  addMono(b, 7.0, riser(1.0), 0.16);
  // Pad desde el desbloqueo (7 s) y progresión la–fa–do–sol.
  const chords = {
    Am: [N.A3, N.C4, N.E4], F: [N.F3, N.A3, N.C4], C: [N.C4, N.E4, N.G4], G: [N.G3, N.B3, N.D4],
    Am9: [N.A3, N.C4, N.E4, N.B4],
  };
  const roots = { Am: N.A2, F: N.F2, C: N.C3, G: N.G2 };
  addMono(b, 7.0, pad(chords.Am.map(midi), 1.0, 1200), 0.5, 0);
  const prog = { 5: "Am", 6: "F", 7: "C", 8: "G", 9: "Am", 10: "F", 11: "G" };
  for (let n = 5; n <= 11; n++) {
    const ch = prog[n];
    addMono(b, bar(n), pad(chords[ch].map(midi), BAR - 0.05, n >= 9 ? 2600 : 2000), 0.55, 0);
    // Bajo: negras con la raíz, octava en el último tiempo.
    for (let bt = 0; bt < 4; bt++) addMono(b, bar(n, bt), bassNote(midi(roots[ch] + (bt === 3 ? 12 : 0)), BEAT * 0.8), 0.42);
    for (const bt of [0, 1, 2, 3]) { addMono(b, bar(n, bt), K, 0.6); kickTimes.push(bar(n, bt)); }
    for (const bt of [1, 3]) addMono(b, bar(n, bt), C, 0.22, 0.1);
    // Hi-hat a corcheas; se retira durante el reconocimiento de la cancha (17–19.5 s).
    for (let i = 0; i < 8; i++) {
      const at = bar(n) + (i * BEAT) / 2;
      if (at >= 16.9 && at < 19.5) continue;
      addMono(b, at, H, i % 2 ? 0.13 : 0.08, 0.35);
    }
    // Motivo; una octava arriba desde el compás 9.
    const [m1, m2, m3] = n >= 9 ? [N.E5, N.G5, N.A5] : [N.E4, N.G4, N.A4];
    addMono(b, bar(n, 0.5), keys(midi(m1), 0.4, 0.35), 1, -0.3);
    addMono(b, bar(n, 1), keys(midi(m2), 0.4, 0.35), 1, 0);
    addMono(b, bar(n, 1.5), keys(midi(m3), 1.0, 0.4), 1, 0.3);
  }
  // Compás 12 (22–24 s): resolver en la menor con novena; bajo y bombo se retiran.
  addMono(b, bar(12), pad(chords.Am9.map(midi), BAR * 3.4, 2200), 0.6, 0);
  addMono(b, bar(12), bassNote(midi(N.A2), BAR * 0.9), 0.35);
  addMono(b, bar(12), K, 0.45);
  // Compases 13–15: pad y motivo espaciado. Último ataque a 29 s.
  addMono(b, bar(13, 0.5), keys(midi(N.E5), 0.6, 0.28), 1, -0.3);
  addMono(b, bar(13, 2), keys(midi(N.G5), 0.6, 0.26), 1, 0.1);
  addMono(b, bar(14, 0), keys(midi(N.A5), 1.4, 0.3), 1, 0.3);
  addMono(b, 29.0, keys(midi(N.A4), 1.6, 0.3, 1600), 1, 0);

  // Sidechain suave: el pad respira con el bombo.
  // (aplicado sobre todo el bus; ligero para no bombear)
  for (const kt of kickTimes) {
    const i0 = Math.round(kt * SR), len = Math.round(0.18 * SR);
    for (let i = 0; i < len; i++) {
      const j = i0 + i; if (j >= b[0].length) break;
      const g = 1 - 0.18 * Math.exp(-i / (0.06 * SR));
      b[0][j] *= g; b[1][j] *= g;
    }
  }
  // Reverb ligera tipo Schroeder (4 combs por canal) para dar aire.
  const combs = [1557, 1617, 1491, 1422];
  for (let c = 0; c < 2; c++) {
    const src = Float32Array.from(b[c]);
    const wet = new Float32Array(src.length);
    for (const [k, base] of combs.entries()) {
      const d = base + c * 23 + k * 7, buf = new Float32Array(d); let idx = 0, lpz = 0;
      for (let i = 0; i < src.length; i++) {
        const y = buf[idx]; lpz = y * 0.75 + lpz * 0.25;
        buf[idx] = src[i] + lpz * 0.78; idx = (idx + 1) % d; wet[i] += y * 0.25;
      }
    }
    for (let i = 0; i < src.length; i++) b[c][i] = src[i] + wet[i] * 0.22;
  }
  // Cola: cerrar a 30.9 s.
  const fadeStart = Math.round(29.6 * SR), fadeEnd = Math.round(30.9 * SR);
  for (let i = fadeStart; i < b[0].length; i++) {
    const g = i >= fadeEnd ? 0 : 1 - (i - fadeStart) / (fadeEnd - fadeStart);
    b[0][i] *= g; b[1][i] *= g;
  }
  // Glue: saturación suave (tanh) para subir ~3 dB de sonoridad sin pasar el techo.
  normalizePeak(b, 0);
  for (const ch of b) for (let i = 0; i < ch.length; i++) ch[i] = Math.tanh(ch[i] * 1.2) / Math.tanh(1.2);
  normalizePeak(b, -3);
  return b;
};

// ---------- v4: toque de UI y música re-arreglada a los nuevos eventos ----------
const sfxTap = () => {
  const hp = new Biquad(); hp.set("hp", 3000, 0.7);
  const s = mono(0.08, (t) => hp.run(white()) * env(t * 1000, { a: 0.3, d: 7 }) * 0.6 + Math.sin(2 * Math.PI * 1750 * t) * env(t * 1000, { a: 0.5, d: 22 }) * 0.5);
  const b = buffer(0.08); addMono(b, 0, s); normalizePeak(b, -16); return b;
};

// Eventos v4 (s): aviso 3.0 · corte al teléfono 7.0 · disparo 13.5 · desbloqueo 17.0 · cierre 26.1.
const musicV4 = () => {
  const b = buffer(LEN);
  const K = kick(), H = hat(), C = clap();
  const kicks = [];
  const at = (beat) => beat * BEAT; // negra -> segundos
  const chords = {
    Am: [N.A3, N.C4, N.E4], F: [N.F3, N.A3, N.C4], C: [N.C4, N.E4, N.G4], G: [N.G3, N.B3, N.D4], Am9: [N.A3, N.C4, N.E4, N.B4],
  };
  const roots = { Am: N.A2, F: N.F2, C: N.C3, G: N.G2 };
  // Pulso filtrado todo el tiempo hasta el cierre.
  for (let e = 1; e < 52; e++) addMono(b, (e * BEAT) / 2, pulse(midi(N.A2)), e < 6 ? 0.08 : 0.11);
  addMono(b, 0.5, keys(midi(N.A4), 0.6, 0.32, 1400), 1, 0.2);
  // 3–7 s: el aviso pone el pulso en marcha (bombo a medio tiempo) y el motivo.
  for (let beat = 6; beat < 14; beat += 2) { addMono(b, at(beat), K, 0.5); kicks.push(at(beat)); }
  for (const bar0 of [6, 10]) {
    addMono(b, at(bar0 + 0.5), keys(midi(N.E4), 0.4, 0.42), 1, -0.25);
    addMono(b, at(bar0 + 1), keys(midi(N.G4), 0.4, 0.42), 1, 0);
    addMono(b, at(bar0 + 1.5), keys(midi(N.A4), 0.9, 0.46), 1, 0.25);
  }
  addMono(b, 6.0, riser(1.0), 0.14);
  // 7–13.5 s: entra el pad y el bajo (la–fa–do), bombo a negras, hats suaves.
  const sec1 = [["Am", 7.0, 9.0], ["F", 9.0, 11.0], ["C", 11.0, 13.5]];
  for (const [ch, t0, t1] of sec1) {
    addMono(b, t0, pad(chords[ch].map(midi), t1 - t0 - 0.05, 1900), 0.5);
    for (let t = t0; t < t1 - 0.01; t += BEAT) addMono(b, t, bassNote(midi(roots[ch]), BEAT * 0.8), 0.38);
  }
  for (let t = 7.0; t < 13.4; t += BEAT) { addMono(b, t, K, 0.58); kicks.push(t); }
  for (let t = 9.0; t < 13.4; t += BEAT / 2) addMono(b, t, H, 0.07, 0.35);
  // 13.5 s: disparo = medio tiempo de silencio rítmico; 14–17 s tensión en sol, redoble de hats.
  addMono(b, 14.0, pad(chords.G.map(midi), 2.95, 2200), 0.52);
  for (let t = 14.0; t < 17.0; t += BEAT) addMono(b, t, bassNote(midi(roots.G), BEAT * 0.8), 0.36);
  for (let t = 14.0; t < 16.9; t += BEAT) { addMono(b, t, K, 0.5); kicks.push(t); }
  for (let t = 15.0; t < 17.0; t += BEAT / 4) addMono(b, t, H, 0.05 + 0.06 * ((t - 15) / 2), 0.35);
  addMono(b, 16.0, riser(1.0), 0.18);
  // 17–24 s: desbloqueo = coro completo (la–fa–do–sol), clap en 2 y 4, motivo una octava arriba.
  const sec2 = [["Am", 17.0, 19.0], ["F", 19.0, 21.0], ["C", 21.0, 23.0], ["G", 23.0, 25.0]];
  for (const [ch, t0, t1] of sec2) {
    addMono(b, t0, pad(chords[ch].map(midi), t1 - t0 - 0.05, 2700), 0.56);
    for (let i = 0; i < 4; i++) addMono(b, t0 + i * BEAT, bassNote(midi(roots[ch] + (i === 3 ? 12 : 0)), BEAT * 0.8), 0.42);
    for (let i = 0; i < 4; i++) { addMono(b, t0 + i * BEAT, K, 0.62); kicks.push(t0 + i * BEAT); }
    for (const i of [1, 3]) addMono(b, t0 + i * BEAT, C, 0.22, 0.1);
    for (let i = 0; i < 8; i++) addMono(b, t0 + (i * BEAT) / 2, H, i % 2 ? 0.13 : 0.08, 0.35);
    addMono(b, t0 + 0.25, keys(midi(N.E5), 0.4, 0.33), 1, -0.3);
    addMono(b, t0 + 0.5, keys(midi(N.G5), 0.4, 0.33), 1, 0);
    addMono(b, t0 + 0.75, keys(midi(N.A5), 1.0, 0.38), 1, 0.3);
  }
  // 25–26 s: se retiran batería y bajo; 26 s resolución en la menor con novena.
  addMono(b, 25.0, pad(chords.F.map(midi), 0.95, 2000), 0.45);
  addMono(b, 26.0, pad(chords.Am9.map(midi), 3.6, 2300), 0.6);
  addMono(b, 26.0, bassNote(midi(N.A2), 1.6), 0.34);
  addMono(b, 26.0, K, 0.45);
  addMono(b, 26.5, keys(midi(N.E5), 0.6, 0.28), 1, -0.3);
  addMono(b, 27.5, keys(midi(N.G5), 0.6, 0.26), 1, 0.1);
  addMono(b, 28.5, keys(midi(N.A5), 1.4, 0.3), 1, 0.3);
  for (const kt of kicks) {
    const i0 = Math.round(kt * SR), len = Math.round(0.18 * SR);
    for (let i = 0; i < len; i++) { const j = i0 + i; if (j >= b[0].length) break; const g = 1 - 0.18 * Math.exp(-i / (0.06 * SR)); b[0][j] *= g; b[1][j] *= g; }
  }
  const combs = [1557, 1617, 1491, 1422];
  for (let c = 0; c < 2; c++) {
    const src = Float32Array.from(b[c]); const wet = new Float32Array(src.length);
    for (const [k, base] of combs.entries()) {
      const d = base + c * 23 + k * 7, buf = new Float32Array(d); let idx = 0, lpz = 0;
      for (let i = 0; i < src.length; i++) { const y = buf[idx]; lpz = y * 0.75 + lpz * 0.25; buf[idx] = src[i] + lpz * 0.78; idx = (idx + 1) % d; wet[i] += y * 0.25; }
    }
    for (let i = 0; i < src.length; i++) b[c][i] = src[i] + wet[i] * 0.22;
  }
  const fs = Math.round(29.5 * SR), fe = Math.round(30.9 * SR);
  for (let i = fs; i < b[0].length; i++) { const g = i >= fe ? 0 : 1 - (i - fs) / (fe - fs); b[0][i] *= g; b[1][i] *= g; }
  normalizePeak(b, 0);
  for (const ch of b) for (let i = 0; i < ch.length; i++) ch[i] = Math.tanh(ch[i] * 1.2) / Math.tanh(1.2);
  normalizePeak(b, -3);
  return b;
};

writeWav("tap.wav", sfxTap());
writeWav("music_v4.wav", musicV4());
writeWav("ball.wav", sfxBall());
writeWav("notif.wav", sfxNotif());
writeWav("shutter.wav", sfxShutter());
writeWav("fold.wav", sfxFold());
writeWav("unlock.wav", sfxUnlock());
writeWav("music.wav", music());
