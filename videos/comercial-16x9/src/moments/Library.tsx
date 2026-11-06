import { useId } from "react";
import { CARD, FRONT, theme } from "../theme";
import type { MomentDef } from "./types";

const p = {
  paper: "hsl(42 33% 90%)", light: "hsl(48 48% 97%)", wood: "hsl(26 23% 50%)",
  darkWood: "hsl(24 21% 31%)", olive: "hsl(87 16% 39%)", sage: "hsl(91 16% 63%)",
  ink: "hsl(145 15% 19%)", blue: "hsl(202 19% 45%)", rust: "hsl(13 31% 49%)",
  skin: "hsl(18 40% 51%)", skinLight: "hsl(23 47% 66%)",
};

export const Back: MomentDef["Back"] = ({ t }) => {
  const id = `library-${useId().replace(/:/g, "")}`;
  const leaf = Math.sin(t * 0.8) * 1.5;
  return (
    <svg viewBox={`0 0 ${CARD.w} ${CARD.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-room`} x2="1" y2="0.8"><stop stopColor={p.light}/><stop offset="1" stopColor={p.sage}/></linearGradient>
        <linearGradient id={`${id}-page`} x2="1" y2="0"><stop stopColor={p.paper}/><stop offset="0.83" stopColor={p.light}/><stop offset="1" stopColor={p.paper}/></linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      {/* Vista desde los apuntes; estantes profundos arriba y libro en primer plano. */}
      <path d="M0 0H320V400H0Z" fill={`url(#${id}-room)`}/>
      <path d="M0 0H235V121H0Z" fill={p.darkWood}/>
      <path d="M7 7L23 6V50H7ZM56 5H69V51H56ZM111 5H131V51H111ZM179 4H191V51H179ZM29 68H42V115H29ZM100 67H120V114H100ZM176 68H193V113H176Z" fill={p.olive}/>
      <path d="M25 4H40V50H25ZM74 9L86 6L99 48L87 51ZM137 9H153V51H137ZM201 5H220V51H201ZM7 67H23V114H7ZM58 65H76V114H58ZM128 67H141V113H128ZM199 68H217V114H199Z" fill={p.rust}/>
      <path d="M44 9H53V50H44ZM101 4H108V50H101ZM156 6H173V51H156ZM46 69H54V114H46ZM80 67H96V114H80ZM145 66H164V114H145Z" fill={p.blue}/>
      <path d="M12 15h6M29 38h8M117 14h8M141 41h8M184 16h4M14 78h4M65 98h6M105 79h10M152 96h7M205 81h6" stroke={p.paper} strokeWidth="1.3" opacity="0.55"/>
      <path d="M0 53H235V63H0ZM0 116H241V126H0Z" fill={p.wood}/>
      <path d="M229 0H240V126H229Z" fill={p.wood}/>
      <path d="M263 0H320V149H263Z" fill={p.light}/>
      <path d="M283 0V146M265 61H320" stroke={p.sage} strokeWidth="4"/>
      <path d="M281 96Q289 65 304 75Q312 54 320 62V148H282Z" fill={p.sage} opacity="0.5"/>
      <path d="M0 126L320 146V400H0Z" fill={p.wood}/>
      <path d="M253 143L320 153V400H112Z" fill={p.paper} opacity="0.25"/>
      <path d="M0 188L320 211M0 335L320 366" stroke={p.darkWood} strokeWidth="1" opacity="0.22"/>
      <path d="M185 123L275 138L256 183L171 169Z" fill={p.ink} opacity="0.2" filter={`url(#${id}-soft)`}/>
      <path d="M181 119L270 134L257 177L168 161Z" fill={p.blue}/>
      <path d="M176 126L266 141L258 169L172 155Z" fill={p.paper}/>
      <path d="M170 156L258 171L257 178L168 163Z" fill={p.olive}/>
      <path d="M182 132L256 144M180 139L257 152M177 147L256 160" stroke={p.wood} strokeWidth="0.6" opacity="0.5"/>
      {/* Libro abierto, marcadores y gafas dejadas entre páginas. */}
      <path d="M-12 252L119 215L283 252L270 382L120 363L0 399Z" fill={p.ink} opacity="0.25" filter={`url(#${id}-soft)`}/>
      <path d="M-16 236L118 204L283 247L270 372L120 353L-8 389Z" fill={p.olive}/>
      <path d="M-8 235L118 205L276 247L267 366L120 347L-7 382Z" fill={p.paper}/>
      <path d="M-9 229Q49 201 118 207L121 341Q49 333-7 374Z" fill={`url(#${id}-page)`}/>
      <path d={`M118 207Q192 ${207 + leaf} 275 241L267 360Q191 ${328 + leaf} 121 341Z`} fill={p.light}/>
      <path d="M118 209L121 341" stroke={p.wood} strokeWidth="2" opacity="0.4"/>
      <path d="M12 243L83 226M9 254L96 234M7 266L77 249M4 278L98 255M4 290L88 270M2 302L72 285M0 315L96 291M0 328L81 307M0 341L67 321M139 231L240 255M140 242L253 269M141 254L226 275M142 267L250 293M143 279L231 300M144 291L246 317M145 304L216 321" stroke={p.wood} strokeWidth="1.4" strokeLinecap="round" opacity="0.44"/>
      <path d="M37 259L76 249M161 270L207 280" stroke={theme.colors.violet} strokeWidth="5" opacity="0.22"/>
      <path d="M227 238L242 241L234 272L228 265L220 268Z" fill={theme.colors.pink} opacity="0.8"/>
      <path d="M83 331L92 333L101 389L95 383L90 391Z" fill={p.rust}/>
      <path d="M148 177Q136 167 123 175L118 191Q126 205 141 196L148 177L159 178L161 199Q176 210 188 196L184 180Q173 171 159 178M122 176L102 161M184 181L204 168" fill="none" stroke={p.ink} strokeWidth="2.1"/>
      <path d="M133 178L140 178M167 182L175 183" stroke={p.light} strokeWidth="1.2" opacity="0.7"/>
      <path d="M288 203L303 208L279 314L271 312Z" fill={p.darkWood}/>
      <path d="M273 310L277 320L280 312" fill={p.paper}/>
      {/* Mano que retiene la página, manga usada y bolso fuera de cuadro. */}
      <path d="M320 346L272 323L230 327L222 350L258 374L284 400H320Z" fill={p.skin}/>
      <path d="M270 325L246 310L218 303Q211 305 217 311L237 321L215 317Q206 319 213 326L236 333L216 330Q208 333 216 339L245 346L258 354Z" fill={p.skinLight}/>
      <path d="M239 324L247 328M237 334L246 337" stroke={p.skin} strokeWidth="1.2"/>
      <path d="M288 347L319 352V400H283L269 378Z" fill={p.olive}/>
      <path d="M281 357L295 365M280 363L292 371" stroke={p.sage} strokeWidth="2"/>
      <path d="M-9 390L41 377L62 400H-9Z" fill={p.ink}/>
    </svg>
  );
};

export const Front: MomentDef["Front"] = ({ t }) => {
  const id = `library-front-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${FRONT.w} ${FRONT.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs><linearGradient id={`${id}-light`} x2="1" y2="0.2"><stop stopColor={p.darkWood}/><stop offset="1" stopColor={p.sage}/></linearGradient></defs>
      <path d="M0 0H96V128H0Z" fill={`url(#${id}-light)`}/>
      <path d="M0 7H10V44H0ZM19 8H28V44H19ZM42 5H54V44H42ZM5 60H17V98H5ZM33 61H43V98H33Z" fill={p.rust}/>
      <path d="M12 9H17V44H12ZM30 6H40V44H30ZM21 61H30V98H21Z" fill={p.blue}/>
      <path d="M0 45H58V52H0M0 98H58V104H0" fill={p.wood}/>
      <path d="M71 0H96V128H71Z" fill={p.light}/>
      <path d="M8 128Q17 102 48 100L70 103L97 128" fill={p.olive}/>
      <path d="M49 88L45 106L60 115L70 101L66 88" fill={p.skin}/>
      <g transform={`rotate(-17 55 73) translate(0 ${Math.sin(t * 0.8) * 0.25})`}>
        <path d="M33 53Q39 35 58 40Q80 42 80 64L74 88Q65 103 50 95L37 82Z" fill={p.skinLight}/>
        <path d="M32 67Q22 43 43 33Q60 23 77 40Q85 46 81 62L68 49L54 46L39 58L38 70Z" fill={p.ink}/>
        <path d="M41 66l5-1M63 66l5 1M55 69l-2 7M48 86q7 2 13-1" fill="none" stroke={p.ink} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M73 53L77 70L74 82" fill="none" stroke={p.light} strokeWidth="1.5" opacity="0.65"/>
      </g>
      <path d="M17 123L47 115L59 129H17Z" fill={p.paper}/>
      <path d="M48 116L78 120L86 128H59Z" fill={p.light}/>
    </svg>
  );
};
