import { useId } from "react";
import { CARD, FRONT } from "../theme";
import type { MomentDef } from "./types";

const p = {
  wall: "hsl(183 14% 79%)", light: "hsl(167 32% 94%)", slate: "hsl(201 20% 34%)",
  table: "hsl(190 14% 55%)", ink: "hsl(207 24% 19%)", board: "hsl(45 19% 91%)",
  mint: "hsl(160 29% 61%)", red: "hsl(5 49% 56%)", blue: "hsl(207 40% 52%)",
  skin: "hsl(22 43% 62%)", skinLight: "hsl(27 49% 75%)", tape: "hsl(43 25% 78%)",
};

export const Back: MomentDef["Back"] = ({ t, led = 0, hand = 0 }) => {
  const id = `lab-${useId().replace(/:/g, "")}`;
  const power = Math.max(0, Math.min(1, led));
  const reach = Math.max(0, Math.min(1, hand)) * 18;
  return (
    <svg viewBox={`0 0 ${CARD.w} ${CARD.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-light`} x2="0.8" y2="1"><stop stopColor={p.light}/><stop offset="1" stopColor={p.table}/></linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#7DFFC4" stopOpacity="0.3"/><stop offset="1" stopColor="#7DFFC4" stopOpacity="0"/></radialGradient>
        <filter id={`${id}-soft`} x="-50%" y="-60%" width="200%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      {/* Cámara inclinada sobre el banco, instrumentos al fondo. */}
      <path d="M0 0H320V400H0Z" fill={p.wall}/>
      <path d="M0 5H320V34H0Z" fill={p.light}/>
      <path d="M0 34H320M25 0V78M247 0V68" stroke={p.slate} strokeWidth="2" opacity="0.3"/>
      <path d="M9 43L102 39L108 103L13 113Z" fill={p.slate}/>
      <path d="M18 50L79 48L82 80L21 85Z" fill={p.ink}/>
      <path d="M26 70L37 70L41 58L47 76L54 64L72 64" fill="none" stroke={p.mint} strokeWidth="1.3"/>
      <circle cx="94" cy="61" r="4" fill={p.board}/>
      <circle cx="95" cy="80" r="4" fill={p.ink}/>
      <path d="M27 94L41 92M54 91L66 90" stroke={p.board} strokeWidth="3"/>
      <path d="M230 46L295 42L303 100L231 108Z" fill={p.board}/>
      <path d="M240 55L284 52L287 75L241 79Z" fill={p.slate}/>
      <path d="M253 91h20M282 89h8" stroke={p.ink} strokeWidth="3" strokeLinecap="round"/>
      <path d="M0 115L320 83V400H0Z" fill={`url(#${id}-light)`}/>
      <path d="M0 160L320 127M0 345L320 311" stroke={p.slate} strokeWidth="1" opacity="0.2"/>
      <path d="M0 117L75 108L298 400H199Z" fill={p.light} opacity="0.17"/>
      <path d="M41 168L259 145L282 298L59 331Z" fill={p.ink} opacity="0.24" filter={`url(#${id}-soft)`}/>
      {/* Protoboard oblicua: canto, canal, dos rieles y perforaciones. */}
      <path d="M39 157L254 139L275 290L58 320L51 312Z" fill={p.slate}/>
      <path d="M39 153L254 135L272 282L56 312Z" fill={p.board}/>
      <path d="M48 163L247 146M61 299L263 272" stroke={p.red} strokeWidth="1.1"/>
      <path d="M50 170L248 153M60 292L262 265" stroke={p.blue} strokeWidth="1.1"/>
      <path d="M52 227L258 205L259 214L53 237Z" fill={p.slate} opacity="0.28"/>
      <path d="M58 183L241 167M60 193L243 177M61 204L244 188M63 214L245 198M65 247L250 225M67 258L251 236M68 269L253 247M70 280L254 258" stroke={p.ink} strokeWidth="2" strokeDasharray="0.1 8" strokeLinecap="round" opacity="0.55"/>
      <path d="M56 161l2 0M244 141l2 0M62 304l2 0M263 277l2 0" stroke={p.light} strokeWidth="3"/>
      <path d="M126 209L176 204L179 236L130 242Z" fill={p.ink}/>
      <path d="M131 210l-1-9M141 209l-1-9M152 208l-1-9M163 206l-1-9M174 205l-1-9M134 241l1 10M145 240l1 10M156 238l1 10M167 237l1 10M177 236l1 10" stroke={p.slate} strokeWidth="2"/>
      <path d="M95 195L100 246M104 194L110 245" stroke={p.slate} strokeWidth="1.3"/>
      <path d="M95 207L105 206L109 228L99 230Z" fill={p.tape}/>
      <path d="M98 213l8-1M100 223l8-1" stroke={p.red} strokeWidth="2"/>
      {/* Tres recorridos continuos de cable con sombra de contacto. */}
      <path d="M78 188C27 143 111 111 185 179M87 265C17 301 30 347 195 264M215 179C292 109 309 213 223 253" fill="none" stroke={p.ink} strokeWidth="5" opacity="0.14" transform="translate(1 3)"/>
      <path d="M78 185C27 140 111 108 185 176" fill="none" stroke={p.red} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M87 262C17 298 30 344 195 261" fill="none" stroke={p.blue} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M215 176C292 106 309 210 223 250" fill="none" stroke={p.mint} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M77 185l1 10M185 176l1 10M87 262l1 9M195 261l1 9M215 176l1 9M223 250l1 9" stroke={p.ink} strokeWidth="2"/>
      {/* LED verde frío: el ámbar queda reservado para aviso, ventana y flash. */}
      <circle cx="207" cy="198" r={29 + Math.sin(t * 1.5) * 0.6} fill={`url(#${id}-halo)`} opacity={power}/>
      <path d="M203 200L204 217M211 199L212 216" stroke={p.slate} strokeWidth="1.4"/>
      <path d="M199 198L198 189Q198 180 205 179Q213 179 215 188L216 196Q208 202 199 198Z" fill={p.slate}/>
      <path d="M199 198L198 189Q198 180 205 179Q213 179 215 188L216 196Q208 202 199 198Z" fill="#9DFFD2" opacity={power}/>
      <path d="M202 188Q202 184 205 184" fill="none" stroke={p.light} strokeWidth="2" strokeLinecap="round" opacity={0.3 + 0.6 * power}/>
      <path d="M10 233L37 224L47 242L20 252L22 247L15 246L16 239Z" fill={p.tape} opacity="0.9"/>
      <path d="M263 318L280 310L332 377L318 393Z" fill={p.ink}/>
      <path d="M270 313L257 292L260 288L277 309" fill={p.slate}/>
      <path d="M279 327L309 364" stroke={p.mint} strokeWidth="4"/>
      {/* La mano y el cable que sostiene avanzan juntos exactamente 18 px. */}
      <g transform={`translate(0 ${-reach})`}>
        <path d="M110 408L123 345L158 306L191 300L211 319L174 354L172 408Z" fill={p.ink} opacity="0.16" filter={`url(#${id}-soft)`}/>
        <path d="M103 410L118 343L148 306L177 295Q187 295 191 303L173 318L185 313Q196 313 195 320L172 337L159 360L160 410Z" fill={p.skin}/>
        <path d="M148 306L174 286Q183 280 186 288L172 304L191 293Q201 293 197 301L178 315L169 324" fill={p.skinLight}/>
        <path d="M180 298L193 287L195 275" fill="none" stroke={p.ink} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M195 275L194 267" stroke={p.board} strokeWidth="1.2"/>
        <path d="M122 350L133 354M160 328L170 333" stroke={p.slate} strokeWidth="1" opacity="0.35"/>
        <path d="M101 390L162 399L162 416H96Z" fill={p.light}/>
      </g>
    </svg>
  );
};

export const Front: MomentDef["Front"] = ({ t }) => {
  const id = `lab-front-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${FRONT.w} ${FRONT.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs><linearGradient id={`${id}-light`} x2="0.6" y2="1"><stop stopColor={p.light}/><stop offset="1" stopColor={p.wall}/></linearGradient></defs>
      <path d="M0 0H96V128H0Z" fill={`url(#${id}-light)`}/>
      <path d="M-8 17L96 7M0 24L96 14" stroke={p.light} strokeWidth="4"/>
      <path d="M0 75H96V128H0Z" fill={p.slate}/>
      <path d="M-12 128Q-8 99 15 91L32 94Q47 105 50 128" fill={p.board}/>
      <path d="M13 82L12 99L26 103L31 87" fill={p.skin}/>
      <path d="M-1 50Q8 34 26 40Q44 48 37 71L30 86Q20 96 8 85L0 69Z" fill={p.skinLight}/>
      <path d="M-3 64Q-10 37 15 34Q35 32 42 52L26 49L17 44L8 52L5 66Z" fill={p.ink}/>
      <path d="M2 61L17 59L19 70L5 72ZM22 59L36 61L32 72L21 70ZM17 63L22 63" fill="none" stroke={p.slate} strokeWidth="1.5"/>
      <path d="M10 65h2M26 65h2M18 70l-1 5M12 80q7 4 13-1" fill="none" stroke={p.ink} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M41 128Q44 101 65 98L88 104L107 128" fill={p.mint}/>
      <path d="M65 87L63 103L78 111L84 91" fill={p.skin}/>
      <g transform={`rotate(9 75 71) translate(0 ${Math.sin(t) * 0.35})`}>
        <path d="M56 52Q70 39 86 50L94 76L85 94Q72 105 60 89L54 71Z" fill={p.skin}/>
        <path d="M54 66Q44 50 56 42Q67 32 78 42Q94 36 98 54L91 68L80 55L66 56L59 70Z" fill={p.ink}/>
        <path d="M63 71l4-1M80 73l4 1M73 75l-2 5M66 88q8 4 14-1" fill="none" stroke={p.ink} strokeWidth="1.3" strokeLinecap="round"/>
      </g>
      <path d="M5 110L12 128M35 111L30 128" stroke={p.slate} strokeWidth="1"/>
    </svg>
  );
};
