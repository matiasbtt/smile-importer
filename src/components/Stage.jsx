import { useEffect, useRef } from 'react';
import {
  motion,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';

import Flower from './Flower.jsx';
import Motes from './Motes.jsx';
import { spring } from '../lib/motion.js';
import { usePointer, useVideoSource } from '../lib/useStage.js';

/* ═══════════════════════════════════════════════════════════
   STAGE — la flor en tres dimensiones.

   Tres entradas se suman sobre el mismo eje, y esa suma es la
   que hace que el objeto se lea como un cuerpo real y no como
   una imagen a la que le pasan cosas:

     scroll   deriva continua mientras se recorre la página
     pose     salto discreto al cambiar de opción
     puntero  micro-paralaje, ±5°, solo con mouse

   La perspectiva vive en .stage (CSS) y el preserve-3d en
   .stage-scene, así que las capas hijas (glow a -260px, media a
   0, sheen a +90px) se proyectan de verdad: al rotar, el brillo
   de atrás y el especular de adelante se desplazan a distinta
   velocidad sin que nadie los anime por separado.
   ═══════════════════════════════════════════════════════════ */

export default function Stage({ progress, pose, source }) {
  const reduced = useReducedMotion();
  const pointer = usePointer();

  const active = pose;
  const videoState = useVideoSource(source?.src);

  /* ── Pose: destino discreto, llegado por resorte ─────────── */
  const poseRY = useSpring(useMotionValue(active.ry), spring.pose);
  const poseRX = useSpring(useMotionValue(active.rx), spring.pose);
  const poseZ = useSpring(useMotionValue(active.z), spring.pose);
  const poseS = useSpring(useMotionValue(active.scale), spring.pose);

  useEffect(() => {
    poseRY.set(active.ry);
    poseRX.set(active.rx);
    poseZ.set(active.z);
    poseS.set(active.scale);
  }, [active, poseRY, poseRX, poseZ, poseS]);

  /* ── Scroll: deriva continua ─────────────────────────────── */
  /* El resorte va antes de los useTransform para que amortigüe una
     sola vez, en el origen, y no cuatro veces en paralelo. */
  const p = useSpring(progress, spring.stage);
  const driftRY = useTransform(p, [0, 0.5, 1], [-16, 4, 22]);
  const driftRX = useTransform(p, [0, 0.5, 1], [8, -2, -9]);
  const driftZ = useTransform(p, [0, 0.5, 1], [-90, 30, -40]);

  /* ── Suma ────────────────────────────────────────────────── */
  const ry = useTransform(
    [poseRY, driftRY, pointer.x],
    ([a, b, px]) => a + b + px * 5,
  );
  const rx = useTransform(
    [poseRX, driftRX, pointer.y],
    ([a, b, py]) => a + b + py * -4,
  );
  const tz = useTransform([poseZ, driftZ], ([a, b]) => a + b);

  const transform = useMotionTemplate`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px) scale(${poseS})`;

  /* Sin movimiento: pose fija de la opción activa. La flor sigue
     estando en tres dimensiones — simplemente no deriva. */
  const staticTransform = `rotateX(${active.rx}deg) rotateY(${active.ry}deg) translateZ(${active.z}px) scale(${active.scale})`;

  return (
    <div className="stage">
      <motion.div
        className="stage-scene"
        style={reduced ? { transform: staticTransform } : { transform }}
      >
        <div className="stage-layer stage-glow" />

        <div className="stage-layer stage-media">
          {videoState === 'ready' ? (
            <StageVideo source={source} progress={p} reduced={reduced} />
          ) : (
            <Flower />
          )}
        </div>

        <div className="stage-layer stage-sheen" />
      </motion.div>

      <Motes />
    </div>
  );
}

/* ── Video ───────────────────────────────────────────────────
   Dos modos, y la diferencia importa:

   loop   (por defecto) el video corre solo y lo que se mueve en
          3D es el plano que lo contiene. Funciona con cualquier
          archivo.
   scrub  el scroll pasa los fotogramas. Da el efecto más fuerte,
          pero exige un archivo codificado para eso — con
          keyframes densos (`-g 1` en ffmpeg). Con un mp4 normal
          el seek salta entre keyframes y se ve a tirones, así
          que no puede ser el modo por defecto.
   ─────────────────────────────────────────────────────────── */
function StageVideo({ source, progress, reduced }) {
  const ref = useRef(null);
  const scrub = source.scrub && !reduced;
  const pending = useRef(null);

  useMotionValueEvent(progress, 'change', (v) => {
    if (!scrub) return;
    const el = ref.current;
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    // Un seek por frame como máximo: asignar currentTime más seguido
    // que eso encola trabajo de decodificación que nunca se muestra.
    if (pending.current) return;
    pending.current = requestAnimationFrame(() => {
      pending.current = null;
      el.currentTime = Math.min(Math.max(v, 0), 1) * el.duration;
    });
  });

  useEffect(() => () => pending.current && cancelAnimationFrame(pending.current), []);

  return (
    <video
      ref={ref}
      src={source.src}
      poster={source.poster}
      autoPlay={!scrub}
      loop={!scrub}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
