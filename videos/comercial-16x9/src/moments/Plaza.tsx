import { useId } from "react";
import { CARD, FRONT, theme } from "../theme";
import type { MomentDef } from "./types";

const p = {
  sky: "hsl(262 25% 58%)", rose: "hsl(9 63% 76%)", glow: "hsl(24 67% 84%)",
  far: "hsl(270 18% 43%)", building: "hsl(268 21% 32%)", ink: "hsl(262 25% 20%)",
  paving: "hsl(337 20% 54%)", pavingLight: "hsl(13 32% 69%)", leaf: "hsl(260 18% 28%)",
  skin: "hsl(15 32% 49%)", skinLight: "hsl(19 45% 66%)", shirt: "hsl(269 14% 75%)",
};

export const Back: MomentDef["Back"] = ({ t }) => {
  const id = `plaza-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${CARD.w} ${CARD.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-sky`} x2="0.15" y2="1"><stop stopColor={p.sky}/><stop offset="0.64" stopColor={p.rose}/><stop offset="1" stopColor={p.glow}/></linearGradient>
        <linearGradient id={`${id}-ground`} x2="0.5" y2="1"><stop stopColor={p.pavingLight}/><stop offset="1" stopColor={p.paving}/></linearGradient>
        <radialGradient id={`${id}-sun`}><stop stopColor={p.glow} stopOpacity="0.8"/><stop offset="1" stopColor={p.glow} stopOpacity="0"/></radialGradient>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      {/* Cámara a la altura del escalón: mucho cielo y horizonte apenas inclinado. */}
      <path d="M0 0H320V400H0Z" fill={`url(#${id}-sky)`}/>
      <circle cx="229" cy="174" r="90" fill={`url(#${id}-sun)`} opacity={0.85 + Math.sin(t * 0.6) * 0.025}/>
      <circle cx="229" cy="180" r="20" fill={p.glow}/>
      <path d="M-16 83Q49 73 105 84M151 117Q203 111 279 122M25 138Q62 133 98 137" fill="none" stroke={p.glow} strokeWidth="3" opacity="0.25" strokeLinecap="round"/>
      <path d="M0 201L57 197V163L111 165V194L157 190V177L191 178V211H0ZM255 171L320 164V219L255 216Z" fill={p.far}/>
      <path d="M0 190L78 184V235L0 243Z" fill={p.building}/>
      <path d="M8 202L66 198M8 213L66 209M8 224L66 220" stroke={p.rose} strokeWidth="2" opacity="0.4"/>
      <path d="M269 185L320 180V243L269 239Z" fill={p.building}/>
      <path d="M280 198L308 195V220L280 222Z" fill={p.rose} opacity="0.4"/>
      <path d="M0 241L320 227V400H0Z" fill={`url(#${id}-ground)`}/>
      <path d="M120 400L223 232M289 400L239 231M0 280L320 269M0 326L320 315" fill="none" stroke={p.building} strokeWidth="0.85" opacity="0.3"/>
      <path d="M217 233L227 233L190 344L165 346Z" fill={p.glow} opacity="0.16"/>
      <path d="M28 0Q45 69 31 150L21 252L34 250L45 149Q58 77 50 0Z" fill={p.leaf}/>
      <path d="M40 87L83 42L89 45L46 110M40 133L0 98V88L44 119" fill={p.leaf}/>
      <path d="M0 0H135Q125 18 104 18Q111 42 84 46Q70 69 48 50Q27 72 11 47Q-10 55-13 36Z" fill={p.leaf}/>
      <path d="M296 205L296 253M292 207L300 207" stroke={p.ink} strokeWidth="2"/>
      <path d="M292 202L300 201L301 207L292 208Z" fill={p.glow}/>
      {/* Vida al fondo: dos peatones, mochila en el suelo y sombras largas. */}
      <path d="M210 224L174 270L178 272L216 225M240 223L224 264L229 266L245 224" stroke={p.building} strokeWidth="3" opacity="0.2"/>
      <path d="M208 219L207 205Q209 201 213 204L217 218L216 233L212 233L211 223L210 234H206Z" fill={p.building}/>
      <circle cx="210" cy="199" r="3.5" fill={p.building}/>
      <path d="M239 217L236 205Q239 201 243 204L247 217L244 225H239L237 234H234Z" fill={p.far}/>
      <circle cx="239" cy="198" r="3" fill={p.far}/>
      <ellipse cx="96" cy="316" rx="55" ry="9" fill={p.ink} opacity="0.18" filter={`url(#${id}-soft)`}/>
      <path d="M0 306L320 292V318L0 337ZM0 355L320 337V361L0 385Z" fill={p.building}/>
      <path d="M0 304L320 290V301L0 319Z" fill={p.pavingLight}/>
      <path d="M0 351L320 334V345L0 367Z" fill={p.paving}/>
      <path d="M262 286Q254 265 274 258Q294 252 300 277L302 294L267 298Z" fill={p.ink}/>
      <path d="M271 263Q270 249 280 251Q289 251 289 259M267 281L296 278M274 286l1 5" fill="none" stroke={p.far} strokeWidth="2"/>
      {/* Amiga sentada de espaldas a tres cuartos, pelo encendido por el borde. */}
      <path d="M64 294L112 289L148 333L133 347L102 317L82 329L59 317Z" fill={p.ink}/>
      <path d="M76 313L64 351L83 369L95 358L85 347L100 317" fill={p.building}/>
      <path d="M132 340L147 331L163 342Q166 348 159 350L140 352ZM80 360L94 354L105 369L99 376L80 373Z" fill={p.shirt}/>
      <path d="M60 237Q75 221 95 232L112 262L112 299L61 306L51 274Z" fill={p.shirt}/>
      <path d="M66 232L70 214L89 214L95 238L82 244Z" fill={p.skin}/>
      <path d="M62 190Q68 172 86 181L98 199L90 222L74 229L62 213Z" fill={p.skin}/>
      <path d="M59 209Q48 182 65 173Q86 165 97 184L102 213L84 221L77 207L69 193L65 213Z" fill={p.ink}/>
      <path d="M86 177Q96 185 98 199L100 211M103 240L111 261" fill="none" stroke={p.rose} strokeWidth="2" opacity="0.85"/>
      <path d="M103 257L126 280L151 287L149 294L120 290L97 275Z" fill={p.skin}/>
      <path d="M147 286L160 286L167 292L151 296Z" fill={p.skinLight}/>
      <path d="M57 251L44 287L53 308L61 305L57 287L71 261" fill={p.skin}/>
      <path d="M54 302L68 310L71 315L50 314Z" fill={p.skinLight}/>
      {/* Pierna del fotógrafo y vaso abandonado cerca de la lente. */}
      <path d="M-12 400L0 361Q21 337 45 357L77 400Z" fill={p.building}/>
      <ellipse cx="225" cy="365" rx="20" ry="5" fill={p.ink} opacity="0.24" filter={`url(#${id}-soft)`}/>
      <path d="M210 333L213 361Q226 369 237 360L241 332Z" fill={p.shirt}/>
      <ellipse cx="225" cy="332" rx="17" ry="5" fill={p.ink}/>
      <path d="M209 331Q225 326 241 331" fill="none" stroke={p.glow} strokeWidth="2"/>
      <path d="M230 329L236 309" stroke={theme.colors.violet} strokeWidth="2"/>
    </svg>
  );
};

export const Front: MomentDef["Front"] = ({ t }) => {
  const id = `plaza-front-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${FRONT.w} ${FRONT.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs><linearGradient id={`${id}-sky`} x2="0.3" y2="1"><stop stopColor={p.sky}/><stop offset="1" stopColor={p.rose}/></linearGradient></defs>
      <path d="M0 0H96V128H0Z" fill={`url(#${id}-sky)`}/>
      <circle cx="77" cy="63" r="15" fill={p.glow}/>
      <path d="M0 99L96 88V128H0Z" fill={p.far}/>
      <path d="M-10 128Q-2 105 21 104L40 109L56 128" fill={p.building}/>
      <path d="M13 96L13 111L29 116L35 99Z" fill={p.skin}/>
      <g transform={`rotate(-12 22 73) translate(0 ${Math.sin(t * 0.7) * 0.3})`}>
        <path d="M4 55Q14 41 31 48L42 67L38 90Q28 108 14 97L3 80Z" fill={p.skin}/>
        <path d="M3 70Q-7 51 9 42Q29 32 40 48L44 63L29 53L17 56L7 74Z" fill={p.ink}/>
        <path d="M10 73l4-1M28 72l4 1M22 76l-1 6M16 91q7 3 13-1" fill="none" stroke={p.ink} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M32 49Q42 57 42 69L38 87" fill="none" stroke={p.glow} strokeWidth="1.7"/>
      </g>
      <path d="M38 128Q46 108 72 108L95 116L102 128" fill={p.shirt}/>
      <path d="M62 99L62 115L76 120L85 108L80 96" fill={p.skin}/>
      <path d="M52 69Q58 54 74 60L87 78L84 98Q73 115 60 103L51 88Z" fill={p.skin}/>
      <path d="M47 88Q39 64 56 54Q75 43 88 61L94 105L83 111L76 88L65 69L58 82L57 105L46 108Z" fill={p.ink}/>
      <path d="M60 83l4-1M76 83l3 1M70 87l-1 5M64 100q7 3 12-1" fill="none" stroke={p.ink} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M77 55Q88 62 90 82L93 102" fill="none" stroke={p.rose} strokeWidth="1.8"/>
    </svg>
  );
};
