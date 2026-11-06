import { useId } from "react";
import { CARD, FRONT, theme } from "../theme";
import type { MomentDef } from "./types";

const p = {
  wall: "hsl(259 19% 84%)", light: "hsl(42 38% 96%)", shadow: "hsl(248 15% 59%)",
  floor: "hsl(230 13% 68%)", teal: "hsl(174 26% 36%)", ink: "hsl(236 22% 22%)",
  skin: "hsl(18 42% 55%)", skinLight: "hsl(24 51% 70%)", denim: "hsl(215 25% 43%)",
  peach: "hsl(12 47% 73%)",
};

export const Back: MomentDef["Back"] = ({ t }) => {
  const id = `hallway-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${CARD.w} ${CARD.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0.8" y2="1"><stop stopColor={p.light}/><stop offset="1" stopColor={p.floor}/></linearGradient>
        <linearGradient id={`${id}-wall`} x2="1" y2="0.7"><stop stopColor={p.wall}/><stop offset="1" stopColor={p.light}/></linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.6"/></filter>
      </defs>
      {/* Punto de fuga alto y descentrado; el pasillo se abre a la derecha. */}
      <path d="M0 0H320V400H0Z" fill={p.light}/>
      <path d="M0 0L210 102V214L0 303Z" fill={`url(#${id}-wall)`}/>
      <path d="M320 0L244 102V214L320 283Z" fill={p.wall}/>
      <path d="M210 101H244V216H210Z" fill={p.teal}/>
      <path d="M217 108H238V207H217Z" fill={p.light}/>
      <path d="M0 300L210 213H245L320 279V400H0Z" fill={`url(#${id}-floor)`}/>
      <path d="M0 305L212 215M320 283L245 215" stroke={p.shadow} strokeWidth="4"/>
      <path d="M7 0L214 103M312 0L243 103" stroke={p.wall} strokeWidth="2"/>
      <path d="M67 0L218 102L224 102L97 0Z" fill={p.wall}/>
      <path d="M155 21L235 97M177 17L240 92" stroke={p.light} strokeWidth="4"/>
      <path d="M10 50L69 75V270L10 294Z" fill={p.shadow}/>
      <path d="M18 63L59 80V263L18 280Z" fill={p.teal}/>
      <path d="M51 172L58 170V187L51 190Z" fill={p.light}/>
      <path d="M110 94L143 108V239L110 253Z" fill={p.shadow}/>
      <path d="M116 104L138 113V236L116 244Z" fill={p.teal}/>
      <path d="M159 117L183 124V224L159 234Z" fill={p.teal}/>
      <path d="M281 57L304 28V265L281 245Z" fill={p.light}/>
      <path d="M274 83L320 26M274 144L320 124M274 205L320 223M290 66V254" stroke={p.shadow} strokeWidth="3"/>
      <path d="M96 400L220 215M267 400L237 215M0 348H320M87 270H308M157 238H273" fill="none" stroke={p.shadow} strokeWidth="0.9" opacity="0.45"/>
      <path d="M281 243L320 271L183 350L126 349ZM283 170L320 154V207L179 291L144 289Z" fill={p.light} opacity={0.48 + Math.sin(t * 0.7) * 0.025}/>
      <path d="M78 86L101 96V139L78 132Z" fill={p.light}/>
      <path d="M83 95L96 100M83 103L95 107M83 111L93 114" stroke={p.shadow} strokeWidth="1.3"/>
      {/* Dos figuras lejanas, una oculta parcialmente por el marco. */}
      <path d="M222 191Q215 186 215 177Q218 169 224 175L229 187L229 214H214L216 193Z" fill={p.shadow}/>
      <path d="M238 188Q230 181 234 173Q242 169 245 180L248 198L246 216H232Z" fill={p.denim}/>
      <ellipse cx="170" cy="331" rx="53" ry="10" fill={p.ink} opacity="0.2" filter={`url(#${id}-soft)`}/>
      {/* Amiga girándose a media marcha, cuaderno abollado y mochila abierta. */}
      <path d="M149 253L167 255L164 309L150 329L139 324L148 304Z" fill={p.denim}/>
      <path d="M172 255L189 250L197 298L183 319L172 313L179 293Z" fill={p.ink}/>
      <path d="M139 318L153 322L153 333L124 336Q120 329 139 318ZM174 308L186 312L190 323L168 327L164 322Z" fill={p.light}/>
      <path d="M142 177L163 166L187 180L200 232L190 261L148 265L135 224Z" fill={p.peach}/>
      <path d="M152 170L151 156L167 149L175 176L164 185Z" fill={p.skin}/>
      <path d="M149 129Q160 119 173 130L180 146L171 163L157 166L147 152Z" fill={p.skinLight}/>
      <path d="M146 145Q138 126 154 120Q170 115 179 133L174 144L166 132L154 140L152 150Z" fill={p.ink}/>
      <path d="M165 144l4-1M176 145l2 1M172 148l1 4M167 157l6-1" fill="none" stroke={p.ink} strokeWidth="1" strokeLinecap="round"/>
      <path d="M138 184Q116 184 119 216L128 246L151 248L159 230L150 190Z" fill={p.teal}/>
      <path d="M128 211L148 208L152 233L130 236Z" fill={p.ink} opacity="0.25"/>
      <path d="M134 180Q153 189 154 217M128 197L145 193M140 231l-3 10" fill="none" stroke={p.light} strokeWidth="2" opacity="0.65"/>
      <path d="M187 183L205 216L217 201L223 206L212 231Q207 237 200 233L180 211Z" fill={p.skin}/>
      <path d="M214 207L215 192L220 183Q224 181 224 186L222 197L229 190Q234 190 231 195L225 209Z" fill={p.skinLight}/>
      <path d="M150 216L181 204L192 241L162 252Z" fill={p.light}/>
      <path d="M154 218L179 209M158 245L186 236" stroke={theme.colors.violet} strokeWidth="2"/>
      <path d="M146 223L162 234L171 232Q177 234 172 239L160 243L139 235Z" fill={p.skinLight}/>
      {/* Hombro de quien toma la foto: oclusión cercana sin marco artificial. */}
      <path d="M-16 308Q20 282 46 321L86 400H-16Z" fill={p.denim}/>
      <path d="M-3 321Q17 309 32 329L66 400" fill="none" stroke={p.ink} strokeWidth="13"/>
      <path d="M17 349L26 347L34 362L24 366Z" fill={p.shadow}/>
      <path d="M270 361l13-3M88 316l7-1" stroke={p.shadow} strokeWidth="1.2" opacity="0.6"/>
    </svg>
  );
};

export const Front: MomentDef["Front"] = ({ t }) => {
  const id = `hallway-front-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${FRONT.w} ${FRONT.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs><linearGradient id={`${id}-light`} x2="1" y2="1"><stop stopColor={p.wall}/><stop offset="1" stopColor={p.light}/></linearGradient></defs>
      <path d="M0 0H96V128H0Z" fill={`url(#${id}-light)`}/>
      <path d="M0 12L96 49M0 82L96 64" stroke={p.shadow} strokeWidth="2"/>
      <path d="M68 0L78 44L85 44L80 0" fill={p.light}/>
      <path d="M26 128Q32 98 58 97L79 103L104 128" fill={p.peach}/>
      <path d="M56 89L54 104L69 110L75 96L70 84" fill={p.skin}/>
      <g transform={`rotate(13 62 69) translate(${Math.sin(t) * 0.3} 0)`}>
        <path d="M43 49Q58 35 74 47L83 69L76 89Q63 105 48 90L40 70Z" fill={p.skinLight}/>
        <path d="M42 63Q31 43 49 33Q69 26 80 44L82 62L68 48L54 50L45 68Z" fill={p.ink}/>
        <path d="M49 67l4-1M67 67l4 1M60 71l-1 5M53 85q8 4 14-1" fill="none" stroke={p.ink} strokeWidth="1.4" strokeLinecap="round"/>
      </g>
      <path d="M34 105L44 106L56 128H43Z" fill={p.teal}/>
      {/* La segunda persona entra muy cerca por el borde izquierdo. */}
      <path d="M-14 128L-2 97L15 97L33 128Z" fill={p.denim}/>
      <path d="M-9 90L-3 107L12 110L18 93Z" fill={p.skin}/>
      <path d="M-17 42Q-3 32 13 46L23 69L18 91Q8 106-6 96L-19 76Z" fill={p.skin}/>
      <path d="M-18 56Q-22 30 1 30Q21 29 25 50L12 51L3 45L-7 58Z" fill={p.ink}/>
      <path d="M-3 66l4-1M12 68l3 1M5 72l-1 5M0 87q7 4 12-1" fill="none" stroke={p.ink} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};
