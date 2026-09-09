import { useEffect, useRef } from 'react';
import {
  motion,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';

import Flower from './Flower.jsx';
import { spring } from '../lib/motion.js';
import { usePointer, useVideoSource } from '../lib/useStage.js';

/* ═══════════════════════════════════════════════════════════
   STAGE — la flor suspendida en el espacio digital.

   El brief prohíbe explícitamente, alrededor de la flor:
   partículas, halos luminosos, gradientes visibles, efectos
   atmosféricos y brillo artificial. El negro tiene que ser
   limpio y uniforme para fundirse con el fondo de la página.
   Por eso acá no hay capa de resplandor, ni especular, ni campo
   de partículas: el volumen sale del plano proyectado en
   perspectiva y de la propia flor, no de adornos detrás.

   Tres entradas se suman sobre el mismo eje:
     scroll   deriva continua a lo largo de la página
     pose     encuadre nuevo al elegir una capacidad
     puntero  ±3°, solo con mouse

   Los valores son cortos a propósito. El registro que pide el
   proyecto es contemplativo y la pieza no debe competir con el
   texto; con rotaciones grandes esto dejaría de leerse como un
   objeto suspendido y pasaría a ser una tarjeta girando.
   ═══════════════════════════════════════════════════════════ */

export default function Stage({ progress, pose, video }) {
  const reduced = useReducedMotion();
  const pointer = usePointer();
  const videoState = useVideoSource(video?.src);

  /* Pose: destino discreto, alcanzado por resorte. */
  const poseRY = useSpring(useMotionValue(pose.ry), spring.pose);
  const poseRX = useSpring(useMotionValue(pose.rx), spring.pose);
  const poseZ = useSpring(useMotionValue(pose.z), spring.pose);
  const poseS = useSpring(useMotionValue(pose.scale), spring.pose);

  useEffect(() => {
    poseRY.set(pose.ry);
    poseRX.set(pose.rx);
    poseZ.set(pose.z);
    poseS.set(pose.scale);
  }, [pose, poseRY, poseRX, poseZ, poseS]);

  /* Scroll: deriva continua. El resorte va en el origen para
     amortiguar una sola vez y no cuatro veces en paralelo. */
  const p = useSpring(progress, spring.stage);
  const driftRY = useTransform(p, [0, 0.5, 1], [-6, 1, 7]);
  const driftRX = useTransform(p, [0, 0.5, 1], [3, -1, -3]);
  const driftZ = useTransform(p, [0, 0.5, 1], [-34, 12, -16]);

  const ry = useTransform([poseRY, driftRY, pointer.x], ([a, b, px]) => a + b + px * 3);
  const rx = useTransform([poseRX, driftRX, pointer.y], ([a, b, py]) => a + b + py * -2);
  const tz = useTransform([poseZ, driftZ], ([a, b]) => a + b);

  const transform = useMotionTemplate`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px) scale(${poseS})`;

  /* Sin movimiento: queda en la pose de la sección. Sigue estando
     en tres dimensiones — deja de derivar, no de existir. */
  const fija = `rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) translateZ(${pose.z}px) scale(${pose.scale})`;

  return (
    <div className="stage">
      <motion.div
        className="stage-scene"
        style={reduced ? { transform: fija } : { transform }}
      >
        {videoState === 'ready' ? (
          <video
            className="stage-media"
            src={video.src}
            poster={video.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <Flower />
        )}
      </motion.div>
    </div>
  );
}
