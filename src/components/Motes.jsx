/* Campo de partículas ambiental: triángulos finos, sin relleno,
   en los colores de marca. Da profundidad alrededor de la flor
   sin competir con ella — por eso la opacidad tope es 0.5 y el
   tamaño no pasa de 7px.

   Las posiciones se generan una vez con una semilla fija: si
   cambiaran en cada render, el campo "parpadearía" al re-montar. */

const COLORS = ['#8052ff', '#ffb829', '#15846e', '#6f7bff', '#b06cff'];

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = seeded(20260909);
const MOTES = Array.from({ length: 34 }, (_, i) => ({
  id: i,
  x: rand() * 100,
  y: rand() * 100,
  size: 3 + rand() * 4,
  rot: rand() * 360,
  color: COLORS[Math.floor(rand() * COLORS.length)],
  op: 0.18 + rand() * 0.32,
  drift: 12 + rand() * 16,
  delay: -rand() * 20,
}));

export default function Motes() {
  return (
    <svg className="stage-motes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {MOTES.map((m) => (
        <polygon
          key={m.id}
          points="0,-1 0.9,0.6 -0.9,0.6"
          fill="none"
          stroke={m.color}
          strokeWidth="0.16"
          opacity={m.op}
          style={{
            transform: `translate(${m.x}px, ${m.y}px) rotate(${m.rot}deg) scale(${m.size})`,
            transformOrigin: '0 0',
            animation: `voluta-drift ${m.drift}s ease-in-out ${m.delay}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}
