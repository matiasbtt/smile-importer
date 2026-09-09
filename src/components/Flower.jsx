/* ═══════════════════════════════════════════════════════════
   La flor, en vector — el respaldo mientras no esté el material.

   No busca imitar la flor de papel: busca ocupar exactamente su
   lugar. Respeta la composición que pide el brief para el video,
   así que cuando entre el archivo real no se mueve nada:

     cuadro 1:1 · flor centrada · ~28% de la altura del cuadro
     silueta completa, sin tocar los bordes · mucho negro alrededor

   La paleta es la del proyecto: marfil, rosa empolvado, lavanda,
   verde musgo. Apagada y desaturada, nunca neón.

   Los anillos de pétalos viven a distinta profundidad en Z, así
   que al rotar el stage el paralaje entre ellos sale de la
   proyección en perspectiva y no de animarlos por separado.
   ═══════════════════════════════════════════════════════════ */

const RINGS = [
  { n: 11, len: 100, w: 31, z: -30, color: '#9d8fa3', op: 0.75, spin: 150, dir: 1, phase: 0 },
  { n: 8,  len: 78,  w: 27, z: 0,   color: '#c8b8bd', op: 0.85, spin: 118, dir: -1, phase: 22 },
  { n: 6,  len: 54,  w: 22, z: 26,  color: '#efe6da', op: 0.95, spin: 96,  dir: 1, phase: 30 },
];

/* Pétalo: sale del centro, se abre y cierra en punta. El control
   lateral le da la panza de voluta. */
const petal = (len, w) =>
  `M 0 0 C ${w} ${-len * 0.3} ${w * 1.15} ${-len * 0.66} 0 ${-len} C ${-w * 1.15} ${-len * 0.66} ${-w} ${-len * 0.3} 0 0 Z`;

function Ring({ n, len, w, color, op, spin, dir, phase }) {
  const d = petal(len, w);
  return (
    <g
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
        animation: `voluta-spin ${spin}s linear infinite ${dir < 0 ? 'reverse' : 'normal'}`,
      }}
      opacity={op}
    >
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={d}
          transform={`rotate(${(360 / n) * i + phase})`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

/* El corazón: la espiral logarítmica que le da el nombre al estudio. */
function Volute() {
  const pts = [];
  for (let t = 0; t <= Math.PI * 5.2; t += 0.12) {
    const r = 1.6 * Math.exp(0.19 * t);
    pts.push(`${(r * Math.cos(t)).toFixed(2)},${(r * Math.sin(t)).toFixed(2)}`);
  }
  return (
    <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'voluta-spin 70s linear infinite' }}>
      <polyline points={pts.join(' ')} fill="none" stroke="#b6bfa6" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export default function Flower() {
  return (
    <div className="flower" aria-hidden="true">
      {RINGS.map((r, i) => (
        <svg key={i} className="flower-ring" viewBox="-130 -130 260 260" style={{ transform: `translateZ(${r.z}px)` }}>
          <Ring {...r} />
        </svg>
      ))}
      <svg className="flower-ring" viewBox="-130 -130 260 260" style={{ transform: 'translateZ(44px)' }}>
        <Volute />
      </svg>
    </div>
  );
}
