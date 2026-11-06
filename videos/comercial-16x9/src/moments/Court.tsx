import { useId } from "react";
import { CARD, FRONT, theme } from "../theme";
import type { MomentDef } from "./types";

const p = {
  sky: "hsl(176 25% 79%)", skyLight: "hsl(54 50% 94%)",
  trees: "hsl(164 22% 30%)", fence: "hsl(168 16% 42%)",
  floor: "hsl(9 38% 62%)", floorLight: "hsl(15 46% 73%)",
  ink: "hsl(192 25% 20%)", white: "hsl(42 34% 94%)",
  skin: "hsl(19 48% 58%)", skinLight: "hsl(22 57% 72%)",
  ball: "hsl(18 72% 54%)", ballLight: "hsl(24 80% 67%)",
};

export const Back: MomentDef["Back"] = ({ t, ball = 0 }) => {
  const id = `court-${useId().replace(/:/g, "")}`;
  const u = Math.max(0, Math.min(1, ball));
  const bx = 36 + 154 * u;
  const rimTop = 130 - 4 - 2.7 / 2;
  const by = 272 + (rimTop - 12 - 20 - 272) * u - 78 * 4 * u * (1 - u);
  return (
    <svg viewBox={`0 0 ${CARD.w} ${CARD.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-sky`} x2="0.3" y2="1"><stop stopColor={p.skyLight}/><stop offset="1" stopColor={p.sky}/></linearGradient>
        <linearGradient id={`${id}-floor`} x2="1" y2="0.8"><stop stopColor={p.floorLight}/><stop offset="1" stopColor={p.floor}/></linearGradient>
        <radialGradient id={`${id}-ball`} cx="30%" cy="25%"><stop stopColor={p.ballLight}/><stop offset="1" stopColor={p.ball}/></radialGradient>
        <filter id={`${id}-soft`} x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="2.1"/></filter>
        <clipPath id={`${id}-sphere`}><circle r="20"/></clipPath>
      </defs>
      {/* Fondo: horizonte bajo, árboles y malla detrás del tablero. */}
      <path d="M0 0H320V400H0Z" fill={`url(#${id}-sky)`}/>
      <path d="M0 157Q20 129 43 147Q65 120 85 143Q112 131 132 153L140 198H0ZM237 157Q257 134 275 146Q301 119 320 139V200H238Z" fill={p.trees}/>
      <path d="M0 170H320V194H0Z" fill={p.fence}/>
      <path d="M0 139V194M50 133V194M101 137V194M258 132V194M308 134V194M0 157H320M0 179H320" fill="none" stroke={p.ink} strokeWidth="1" opacity="0.32"/>
      <path d="M0 146L48 194M15 139L70 194M55 139L110 194M98 139L153 194M243 139L298 194M279 139L320 180M0 190L51 139M45 194L100 139M96 194L151 139M240 194L295 139M282 194L320 156" fill="none" stroke={p.skyLight} strokeWidth="0.55" opacity="0.35"/>
      <path d="M0 190H320V400H0Z" fill={`url(#${id}-floor)`}/>
      <path d="M0 259L320 229M17 400L112 190M0 341Q173 239 320 300" fill="none" stroke={p.white} strokeWidth="3" opacity="0.8"/>
      <path d="M263 192L320 291H298L248 192Z" fill={p.ink} opacity="0.12"/>
      <path d="M16 215L32 213M269 342L283 344M205 270L213 269M99 316L105 317" stroke={p.ink} strokeWidth="1.1" opacity="0.2"/>
      {/* Medio: tablero con canto, aro elíptico y red de hilos individuales. */}
      <path d="M231 115L250 187" stroke={p.ink} strokeWidth="7"/>
      <path d="M130 62L241 59V122L130 127Z" fill={p.ink}/>
      <path d="M133 64L237 62V119L133 123Z" fill={p.white}/>
      <path d="M137 68L233 66V115L137 119Z" fill={p.sky} fillOpacity="0.55" stroke={p.fence} strokeWidth="0.7"/>
      <path d="M174 95L211 94V117H174Z" fill="none" stroke={p.ink} strokeWidth="1.8"/>
      <path d="M141 73L155 72M228 70V82" stroke={p.white} strokeWidth="2"/>
      <path d="M136 68h1M234 66h1M136 119h1M234 115h1" stroke={p.ink} strokeWidth="2"/>
      <path d="M190 120V128M190 124H218" stroke={p.ink} strokeWidth="3"/>
      <ellipse cx="190" cy="132" rx="22" ry="4.5" fill={p.ink} opacity="0.45"/>
      <path d="M169 131L177 165Q190 171 203 165L211 131M174 133L183 168M182 135L188 169M191 135V170M200 134L195 169M207 133L200 168" fill="none" stroke={p.white} strokeWidth="0.9"/>
      <path d="M171 141Q190 149 209 141M174 153Q190 161 206 153M170 134L206 154M177 136L203 165M210 134L174 154M204 137L179 166" fill="none" stroke={p.white} strokeWidth="0.65" opacity="0.85"/>
      <ellipse cx="190" cy="130" rx="22" ry="4" fill="none" stroke={p.ball} strokeWidth="2.7"/>
      <path d="M170 129Q190 124 210 129" fill="none" stroke={p.ballLight} strokeWidth="0.8"/>
      <ellipse cx={bx + 5} cy="202" rx={29 - 17 * u} ry={4.5 - 2 * u} fill={p.ink} opacity={0.13 + u * 0.1} filter={`url(#${id}-soft)`}/>
      {/* A ball=1, doce unidades libres entre el balón y el borde superior del aro. */}
      <g transform={`translate(${bx} ${by}) rotate(${-22 + 38 * u})`}>
        <circle r="20" fill={`url(#${id}-ball)`}/>
        <g clipPath={`url(#${id}-sphere)`} fill="none" stroke={p.ink} strokeWidth="0.85">
          <path d="M-23 1Q0 -6 23 2M-3-22Q7 0-2 22M-20-16Q5-9-17 19M17-18Q-5-1 18 19"/>
          <path d="M-13-10h.2M-9-14h.2M-5-11h.2M4-15h.2M10-10h.2M14-6h.2M-14 5h.2M-8 9h.2M-3 14h.2M7 10h.2M12 6h.2M-9-4h.2M4 3h.2" strokeWidth="0.7" strokeLinecap="round" opacity="0.38"/>
          <path d="M-15-11Q-9-18-2-18" stroke={p.white} strokeWidth="1.4" opacity="0.35"/>
        </g>
      </g>
      {/* Primer plano: brazos asimétricos después de soltar el tiro. */}
      <path d="M-12 400L19 298L52 224L67 228L51 304L35 400Z" fill={p.skin}/>
      <path d="M52 231L52 211L59 193Q62 189 64 194L62 210L70 191Q73 187 75 192L70 215L78 202Q82 200 82 205L73 227L65 238Z" fill={p.skinLight}/>
      <path d="M214 400L183 307L108 237L116 221L204 286L254 400Z" fill={p.skin}/>
      <path d="M109 240L97 224L83 217Q78 212 83 209L99 214L88 201Q87 197 92 197L111 213L105 197Q107 191 111 196L121 220L118 234Z" fill={p.skinLight}/>
      <path d="M21 310L38 265M180 309L146 271M58 223L65 226M106 224L114 228" fill="none" stroke={p.ink} strokeWidth="1" opacity="0.22"/>
      <path d="M-8 386L38 390L36 400H-8ZM232 375L252 400H207L201 386Z" fill={theme.colors.violet}/>
      <path d="M19 300L28 303M183 306L189 300" stroke={p.white} strokeWidth="3" opacity={0.5 + Math.sin(t) * 0.03}/>
    </svg>
  );
};

export const Front: MomentDef["Front"] = ({ t }) => {
  const id = `court-front-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${FRONT.w} ${FRONT.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
      <defs><linearGradient id={`${id}-light`} x2="0.9" y2="1"><stop stopColor={p.skyLight}/><stop offset="1" stopColor={p.sky}/></linearGradient></defs>
      <path d="M0 0H96V128H0Z" fill={`url(#${id}-light)`}/>
      <path d="M76 0L83 74M58 16L96 10V39L62 42Z" fill={p.white} stroke={p.fence} strokeWidth="2"/>
      <path d="M0 81L96 74V128H0Z" fill={p.trees}/>
      <path d="M-14 128Q-9 94 16 91L37 88Q65 95 75 128" fill={theme.colors.violet}/>
      <path d="M18 87L18 100Q32 109 39 96L34 78Z" fill={p.skin}/>
      <g transform={`rotate(-11 28 64) translate(0 ${Math.sin(t) * 0.4})`}>
        <path d="M9 48Q9 26 31 31Q49 34 47 55L43 75Q37 91 24 87L12 74Z" fill={p.skinLight}/>
        <path d="M8 57Q1 28 26 27Q47 26 50 46L37 43L30 38L18 46L16 58Z" fill={p.ink}/>
        <path d="M23 59l5-1M37 57l4 1M29 63l-1 6M25 76q7 4 12-2" fill="none" stroke={p.ink} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M43 49l2 6M15 68l1 4" stroke={p.white} strokeWidth="1.3" opacity="0.8"/>
      </g>
      <path d="M65 128Q58 108 76 101L96 98V128Z" fill={p.white}/>
      <path d="M77 101L78 86L95 81L98 105" fill={p.skin}/>
      <path d="M76 58Q89 45 103 58L105 84Q95 103 84 93L74 78Z" fill={p.skinLight}/>
      <path d="M73 70Q68 49 90 47Q104 46 108 61L91 60L79 68Z" fill={p.ink}/>
      <path d="M82 74l4-1M95 72l3 1M87 79l1 4M85 88q6 2 10-2" fill="none" stroke={p.ink} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
};
