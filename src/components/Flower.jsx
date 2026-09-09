/* ═══════════════════════════════════════════════════════════
   La flor, en vector.
   Es el respaldo mientras no haya material cargado, y el sitio
   tiene que verse terminado igual. No es un placeholder gris.

   Voluta = la espiral del capitel jónico. Cada pétalo es una
   voluta, y los tres anillos viven a distinta profundidad en Z:
   cuando el stage rota, el paralaje entre anillos sale solo de
   la proyección en perspectiva. Es 3D real, no capas a distinta
   velocidad simulando serlo.
   ═══════════════════════════════════════════════════════════ */

const RINGS = [
  { n: 13, len: 98, w: 30, z: -70, color: 'var(--iris)',    op: 0.55, spin: 96,  dir: 1,  phase: 0 },
  { n: 9,  len: 76, w: 26, z: 0,   color: 'var(--verdant)', op: 0.85, spin: 68,  dir: -1, phase: 20 },
  { n: 6,  len: 52, w: 22, z: 54,  color: 'var(--saffron)', op: 0.9,  spin: 48,  dir: 1,  phase: 30 },
];

/* Pétalo: sale del centro, se abre y cierra en punta. El control
   lateral es el que le da la panza de voluta. */
function petalPath(len, w) {
  return `M 0 0 C ${w} ${-len * 0.3} ${w * 1.15} ${-len * 0.66} 0 ${-len} C ${-w * 1.15} ${-len * 0.66} ${-w} ${-len * 0.3} 0 0 Z`;
}

function Ring({ n, len, w, color, op, spin, dir, phase }) {
  const d = petalPath(len, w);
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
          strokeWidth="1.1"
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
    <g
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
        animation: 'voluta-spin 34s linear infinite',
      }}
    >
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="var(--saffron)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  );
}

export default function Flower() {
  return (
    <div className="flower" aria-hidden="true">
      {RINGS.map((r, i) => (
        <svg
          key={i}
          className="flower-ring"
          viewBox="-130 -130 260 260"
          style={{ transform: `translateZ(${r.z}px)` }}
        >
          <Ring {...r} />
        </svg>
      ))}
      <svg className="flower-ring" viewBox="-130 -130 260 260" style={{ transform: 'translateZ(84px)' }}>
        <Volute />
      </svg>
    </div>
  );
}
