/* Sonrisa vectorial construida para soportar dos escalas:
   a 8x se lee como macro de esmalte (solo 2-3 dientes en cuadro),
   a 1x se lee como la sonrisa completa de una persona.
   Todo es vector, así que no pixela en el zoom-out. */

const MEDIA = [
  { w: 88, h: 132 }, // central
  { w: 68, h: 118 }, // lateral
  { w: 64, h: 112 }, // canino
  { w: 56, h: 92 }, // premolar 1
  { w: 50, h: 78 }, // premolar 2
  { w: 43, h: 62 }, // molar
];

const GAP = 1.2;
const CONTACT = 2.6; // sobreancho: los dientes se tocan en el punto de contacto
const CX = 600;
const GUM_Y = 236;
/* El arco: cuanto más lejos de la línea media, más alto y más corto el diente.
   Sin suficiente curvatura, el zoom-out no lee como sonrisa sino como una
   hilera recta de bloques. */
const RISE = (dx) => Math.pow(dx / 545, 2) * 172;

/* Arco: los dientes suben y se acortan hacia las comisuras. */
function buildArch() {
  const teeth = [];
  for (const dir of [-1, 1]) {
    let edge = dir * (MEDIA[0].w / 2 + GAP / 2) * 0 + (dir * GAP) / 2;
    MEDIA.forEach((t, i) => {
      const cx = edge + dir * t.w / 2;
      const dx = Math.abs(cx);
      const rise = RISE(dx);
      teeth.push({
        key: `${dir}-${i}`,
        x: CX + cx - t.w / 2,
        w: t.w,
        h: t.h,
        top: GUM_Y + rise * 0.62,
        tilt: dir * (dx / 545) * 7,
        depth: i / MEDIA.length, // los posteriores quedan más apagados
      });
      edge += dir * (t.w + GAP);
    });
  }
  return teeth;
}

const TEETH = buildArch();
const SORTED = [...TEETH].sort((a, b) => a.x - b.x);

/* La encía se construye a partir del mismo arco que los dientes, con papilas
   interdentales en los espacios. Si se dibuja como curva independiente, en el
   zoom-out se ve como una loma suelta que no calza con la fila. */
function gumPath() {
  const H = 64;
  const d = [`M${SORTED[0].x} ${SORTED[0].top}`];
  SORTED.forEach((t, i) => {
    d.push(`L${t.x} ${t.top}`, `L${t.x + t.w} ${t.top}`);
    const next = SORTED[i + 1];
    if (next) {
      const mid = (t.x + t.w + next.x) / 2;
      d.push(`Q${mid} ${t.top + 12} ${next.x} ${next.top}`);
    }
  });
  const last = SORTED[SORTED.length - 1];
  d.push(`L${last.x + last.w + 40} ${last.top - H * 0.5}`);
  [...SORTED].reverse().forEach((t) => {
    d.push(`L${t.x + t.w / 2} ${t.top - H}`);
  });
  d.push(`L${SORTED[0].x - 40} ${SORTED[0].top - H * 0.5}`, 'Z');
  return d.join(' ');
}

const GUM = gumPath();

/* Comisuras y curvas de la boca, derivadas del arco dentario:
   así los labios abrazan los dientes en cualquier escala. */
const L = SORTED[0];
const R = SORTED[SORTED.length - 1];
const LX = L.x - 62;
const LY = L.top + 30;
const RX = R.x + R.w + 62;
const RY = R.top + 30;

const CAVITY = `M${LX} ${LY} Q600 ${GUM_Y - 92} ${RX} ${RY} Q600 566 ${LX} ${LY} Z`;

/* Labio superior con arco de Cupido (el centro baja respecto de los picos). */
const LIP_TOP =
  `M${LX} ${LY} Q600 ${GUM_Y - 92} ${RX} ${RY} ` +
  `L${RX + 44} ${RY - 26} ` +
  `C820 26 700 62 660 68 C632 72 616 98 600 98 ` +
  `C584 98 568 72 540 68 C500 62 380 26 ${LX - 44} ${LY - 26} Z`;

const LIP_BOTTOM =
  `M${LX} ${LY} Q600 566 ${RX} ${RY} ` +
  `L${RX + 44} ${RY + 26} Q600 664 ${LX - 44} ${LY + 26} Z`;

function toothPath(x, top, w, h) {
  const r = w * 0.2; // radio incisal
  const rt = w * 0.13; // hombro cervical
  const b = top + h;
  const inset = w * 0.035; // leve conicidad hacia el borde incisal
  return [
    `M${x} ${top + rt}`,
    `Q${x} ${top} ${x + rt} ${top}`,
    `H${x + w - rt}`,
    `Q${x + w} ${top} ${x + w} ${top + rt}`,
    `L${x + w - inset} ${b - r}`,
    `Q${x + w - inset} ${b} ${x + w - inset - r} ${b}`,
    `H${x + inset + r}`,
    `Q${x + inset} ${b} ${x + inset} ${b - r}`,
    'Z',
  ].join(' ');
}

export default function Smile() {
  return (
    <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="enamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="46%" stopColor="#f2f5f4" />
          <stop offset="82%" stopColor="#dde3e1" />
          <stop offset="100%" stopColor="#c3cdc9" />
        </linearGradient>

        {/* Sombreado cilíndrico: hace que cada diente lea como convexo
            y no como una tarjeta plana cuando el zoom está al máximo. */}
        <linearGradient id="convex" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a3f3a" stopOpacity="0.34" />
          <stop offset="18%" stopColor="#4a3f3a" stopOpacity="0.07" />
          <stop offset="46%" stopColor="#4a3f3a" stopOpacity="0" />
          <stop offset="80%" stopColor="#4a3f3a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b322e" stopOpacity="0.38" />
        </linearGradient>

        <linearGradient id="cervical" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6f63" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8a6f63" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="incisal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fb3ac" stopOpacity="0" />
          <stop offset="100%" stopColor="#7d938c" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1d1c" />
          <stop offset="100%" stopColor="#4b2f2c" />
        </linearGradient>

        <linearGradient id="lipTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="70%" stopColor="#241a19" />
          <stop offset="100%" stopColor="#33211f" />
        </linearGradient>

        <linearGradient id="lipBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2624" />
          <stop offset="55%" stopColor="#201615" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>

        <radialGradient id="cavity" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#140f0f" />
          <stop offset="100%" stopColor="#050404" />
        </radialGradient>

        <radialGradient id="skinLight" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#7a625a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7a625a" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="key" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="soft2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>

        {/* Límite real de la cavidad bucal: recorta los dientes inferiores
            para que nunca sobresalgan del labio, aunque el diente sea ancho
            cerca de la comisura. */}
        <clipPath id="cavityClip">
          <path d={CAVITY} />
        </clipPath>
      </defs>

      {/* Piel: modelado por luz suave, no por línea. Se revela en el zoom-out. */}
      <g id="smile-skin">
        <ellipse cx="600" cy="150" rx="330" ry="150" fill="url(#skinLight)" filter="url(#soft)" />
        <ellipse cx="245" cy="360" rx="215" ry="255" fill="url(#skinLight)" filter="url(#soft)" opacity="0.85" />
        <ellipse cx="955" cy="360" rx="215" ry="255" fill="url(#skinLight)" filter="url(#soft)" opacity="0.85" />
        <ellipse cx="600" cy="600" rx="270" ry="150" fill="url(#skinLight)" filter="url(#soft)" opacity="0.7" />
        {/* filtrum */}
        <path
          d="M575 60 Q600 130 625 60"
          stroke="#8a6f65"
          strokeOpacity="0.28"
          strokeWidth="14"
          fill="none"
          filter="url(#soft2)"
        />
      </g>

      {/* Cavidad oral */}
      <path d={CAVITY} fill="url(#cavity)" />

      {/* Encía superior, siguiendo el arco */}
      <path d={GUM} fill="url(#gum)" />

      {/* Dientes inferiores, en penumbra. Recortados a la cavidad real:
          cerca de las comisuras el labio inferior sube y, sin el recorte,
          el diente se dibujaba por debajo de ese límite. */}
      <g opacity="0.2" clipPath="url(#cavityClip)">
        {TEETH.map((t) => (
          <path
            key={`low-${t.key}`}
            d={toothPath(t.x + 6, 396 + (t.top - GUM_Y) * 0.34, t.w * 0.84, t.h * 0.3)}
            fill="url(#enamel)"
            transform={`rotate(${-t.tilt} ${t.x + t.w / 2} 396)`}
          />
        ))}
      </g>

      {/* Dientes superiores */}
      <g id="smile-teeth">
        {TEETH.map((t) => {
          const w = t.w + CONTACT;
          const x = t.x - CONTACT / 2;
          const cx = t.x + t.w / 2;
          const body = toothPath(x, t.top, w, t.h);
          return (
            <g key={t.key} transform={`rotate(${t.tilt} ${cx} ${t.top})`}>
              <path d={body} fill="url(#enamel)" opacity={1 - t.depth * 0.34} />
              {/* volumen: laterales en sombra, centro en luz */}
              <path d={body} fill="url(#convex)" />
              {/* penumbra cervical, junto a la encía */}
              <path d={toothPath(x, t.top, w, t.h * 0.3)} fill="url(#cervical)" />
              {/* banda incisal translúcida */}
              <path
                d={toothPath(x, t.top + t.h * 0.74, w, t.h * 0.26)}
                fill="url(#incisal)"
                opacity={0.8 - t.depth * 0.4}
              />
              {/* reflejo especular vertical */}
              <ellipse
                cx={cx - t.w * 0.16}
                cy={t.top + t.h * 0.34}
                rx={t.w * 0.11}
                ry={t.h * 0.22}
                fill="#ffffff"
                opacity={0.3 - t.depth * 0.18}
                filter="url(#soft2)"
              />
            </g>
          );
        })}
      </g>

      {/* Labios */}
      <path d={LIP_TOP} fill="url(#lipTop)" />
      <path d={LIP_BOTTOM} fill="url(#lipBottom)" />
      {/* Filo húmedo del labio inferior */}
      <path
        d={`M${LX + 34} ${LY + 12} Q600 552 ${RX - 34} ${RY + 12}`}
        stroke="#a58a80"
        strokeOpacity="0.24"
        strokeWidth="9"
        fill="none"
        filter="url(#soft2)"
      />

      {/* Luz principal */}
      <ellipse cx="600" cy="300" rx="440" ry="260" fill="url(#key)" />
    </svg>
  );
}
