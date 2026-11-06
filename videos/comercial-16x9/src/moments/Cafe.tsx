import { useId } from "react";
import { CARD, FRONT, theme } from "../theme";
import type { MomentDef } from "./types";

const p = {
  cream: "hsl(36 36% 88%)", light: "hsl(42 60% 96%)", wood: "hsl(20 30% 61%)",
  woodDark: "hsl(19 28% 46%)", green: "hsl(158 24% 31%)", sage: "hsl(145 17% 62%)",
  ink: "hsl(165 20% 19%)", coffee: "hsl(20 33% 24%)", skin: "hsl(19 42% 58%)",
  skinLight: "hsl(24 50% 72%)", coral: "hsl(8 47% 64%)",
};

export const Back: MomentDef["Back"] = ({ t }) => {
  const id = `cafe-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${CARD.w} ${CARD.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-window`} x2="1" y2="1"><stop stopColor={p.light}/><stop offset="1" stopColor={p.sage}/></linearGradient>
        <linearGradient id={`${id}-table`} x2="0.8" y2="1"><stop stopColor={p.cream}/><stop offset="1" stopColor={p.wood}/></linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      {/* Desde la silla: ventana lateral, banca y mesa que sale del cuadro. */}
      <path d="M0 0H320V400H0Z" fill={p.cream}/>
      <path d="M0 0H142V151L0 178Z" fill={`url(#${id}-window)`}/>
      <path d="M0 118Q28 77 52 94Q91 43 142 80V153L0 178Z" fill={p.sage} opacity="0.7"/>
      <path d="M53 0V165M0 78L143 65M140 0V154" stroke={p.light} strokeWidth="7"/>
      <path d="M159 0H320V169H159Z" fill={p.green}/>
      <path d="M172 0V155M221 0V155M272 0V155" stroke={p.ink} strokeWidth="1" opacity="0.25"/>
      <path d="M153 148Q227 125 320 145V216H152Z" fill={p.coral}/>
      <path d="M158 171Q239 154 320 169M226 143V189M294 145V187" fill="none" stroke={p.woodDark} strokeWidth="2"/>
      <path d="M219 117Q205 92 213 70Q234 83 228 106Q246 77 261 85Q256 111 233 121" fill={p.sage}/>
      <path d="M213 117H241L236 147H219Z" fill={p.cream}/>
      <path d="M-22 197L256 156L365 295L320 425H0Z" fill={p.woodDark}/>
      <path d="M-22 191L256 150L365 286L320 419H0Z" fill={`url(#${id}-table)`}/>
      <path d="M-15 248L281 181M-5 322L316 227M18 400L343 283" fill="none" stroke={p.woodDark} strokeWidth="1" opacity="0.25"/>
      <path d="M0 191L51 184L232 400H159Z" fill={p.light} opacity="0.28"/>
      <path d="M70 181L94 178L274 400H249Z" fill={p.light} opacity="0.2"/>
      <ellipse cx="109" cy="272" rx="57" ry="17" fill={p.ink} opacity="0.16" filter={`url(#${id}-soft)`}/>
      <ellipse cx="111" cy="263" rx="52" ry="20" fill={p.light}/>
      <ellipse cx="111" cy="264" rx="37" ry="12" fill={p.cream}/>
      <path d="M141 226Q170 213 167 235Q163 248 143 245" fill="none" stroke={p.light} strokeWidth="9"/>
      <path d="M77 221L82 251Q110 270 141 249L147 219Z" fill={p.green}/>
      <path d="M82 227L86 248Q96 256 103 255L99 231Z" fill={p.sage} opacity="0.4"/>
      <ellipse cx="112" cy="220" rx="35" ry="13" fill={p.light}/>
      <ellipse cx="112" cy="221" rx="29" ry="9" fill={p.coffee}/>
      <path d="M96 221Q104 215 115 220Q127 215 130 221Q116 229 105 225" fill="none" stroke={p.cream} strokeWidth="2" opacity="0.8"/>
      <g transform={`translate(${Math.sin(t * 1.2) * 1.5} ${Math.sin(t) * 1.4})`} fill="none" stroke={p.light} strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M101 200Q90 189 103 179Q114 169 105 156"/>
        <path d="M122 201Q113 192 126 181Q135 171 130 165"/>
      </g>
      {/* Apuntes sin glifos, migas, anillo de taza y mano compartiendo pan. */}
      <path d="M183 220L287 240L261 335L164 307Z" fill={p.ink} opacity="0.13" filter={`url(#${id}-soft)`}/>
      <path d="M181 211L282 236L259 325L161 299Z" fill={p.light}/>
      <path d="M188 223L255 241M183 235L264 255M180 248L235 263M176 263L245 281M173 276L223 289" stroke={p.woodDark} strokeWidth="1.6" strokeLinecap="round" opacity="0.45"/>
      <path d="M175 294L244 309" stroke={theme.colors.violet} strokeWidth="2"/>
      <path d="M264 216L245 296" stroke={p.ink} strokeWidth="5" strokeLinecap="round"/>
      <path d="M245 296L243 304L249 298" fill={p.woodDark}/>
      <ellipse cx="42" cy="348" rx="31" ry="11" fill="none" stroke={p.coffee} strokeWidth="1.5" opacity="0.14"/>
      <path d="M-12 363L60 331L91 321L110 334L89 352L35 385L14 400H0Z" fill={p.skin}/>
      <path d="M74 325L93 310L119 304Q126 308 120 313L106 320L125 319Q134 324 126 329L105 335L92 347Z" fill={p.skinLight}/>
      <path d="M88 308Q83 291 101 283Q108 271 120 283Q139 279 143 294L129 310Z" fill={p.woodDark}/>
      <path d="M92 303Q91 287 104 287Q113 277 120 287Q134 284 138 295L127 305Z" fill={p.wood}/>
      <path d="M102 287L109 299M119 286L124 300" stroke={p.cream} strokeWidth="2" opacity="0.7"/>
      <path d="M140 316l3 1M151 300l2 2M132 331l3-1M147 334l1 2" stroke={p.woodDark} strokeWidth="2" strokeLinecap="round"/>
      <path d="M0 373L22 397L13 410H0Z" fill={theme.colors.violet}/>
      <path d="M287 167L320 174V213L299 202Z" fill={p.skin}/>
      <path d="M291 166L319 154V185L298 190Z" fill={p.light}/>
    </svg>
  );
};

export const Front: MomentDef["Front"] = ({ t }) => {
  const id = `cafe-front-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${FRONT.w} ${FRONT.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs><linearGradient id={`${id}-light`} x2="1" y2="0.5"><stop stopColor={p.light}/><stop offset="1" stopColor={p.green}/></linearGradient></defs>
      <path d="M0 0H96V128H0Z" fill={`url(#${id}-light)`}/>
      <path d="M24 0V84M0 31H35" stroke={p.cream} strokeWidth="5"/>
      <path d="M48 77H96V128H48Z" fill={p.coral}/>
      <path d="M-18 128Q-3 96 23 94Q49 92 69 128" fill={p.cream}/>
      <path d="M29 90L28 104L43 106L46 87Z" fill={p.skin}/>
      <g transform={`rotate(12 37 66) translate(0 ${Math.sin(t) * 0.3})`}>
        <path d="M9 102L11 54Q12 28 38 31Q63 32 61 57L65 101L48 109L23 102Z" fill={p.coffee}/>
        <path d="M21 51Q35 40 51 51L53 77Q46 96 35 91Q21 87 20 72Z" fill={p.skinLight}/>
        <path d="M18 58L19 44Q39 23 56 44L56 61L45 46L26 53Z" fill={p.coffee}/>
        <path d="M27 65l4-1M43 66l4 1M36 68l-1 6M30 82q8 4 14-1" fill="none" stroke={p.ink} strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M21 77l-1 5" stroke={theme.colors.pink} strokeWidth="2"/>
      </g>
      <path d="M61 112Q53 98 65 95L80 99L88 119" fill={p.skinLight}/>
      <path d="M57 94L60 116Q72 124 84 115L87 94Z" fill={p.green}/>
      <path d="M85 97Q98 93 94 105L86 109" fill="none" stroke={p.green} strokeWidth="4"/>
      <ellipse cx="72" cy="94" rx="15" ry="5" fill={p.light}/>
      <ellipse cx="72" cy="94" rx="11" ry="3" fill={p.coffee}/>
    </svg>
  );
};
