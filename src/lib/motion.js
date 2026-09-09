/* ═══════════════════════════════════════════════════════════
   Movimiento — un solo lugar donde viven curvas y resortes.
   Reglas que sigue todo el sitio:
     1. Se anima transform y opacity. Nada que dispare layout
        (width, top, margin) ni filter en bucle de scroll.
     2. Nunca `linear` salvo rotación continua.
     3. Lo que reacciona a input directo va con resorte —
        es interrumpible a mitad de camino. Lo que entra en
        viewport va con duración fija: no hay nada que interrumpir.
     4. La distancia decide la duración, no al revés: 14px de
        entrada no pueden durar lo mismo que un cambio de pose.
   ═══════════════════════════════════════════════════════════ */

/* Salida fuerte: arranca rápido y frena largo. Es la curva de todo
   lo que aparece. */
export const easeOut = [0.16, 1, 0.3, 1];

/* Simétrica, para ir de un estado a otro (el índice activo). */
export const easeInOut = [0.65, 0, 0.35, 1];

export const dur = { fast: 0.16, mid: 0.28, slow: 0.62 };

/* Resortes.
   stage  — la masa alta hace que la flor se sienta pesada y sigua
            al scroll con un retardo mínimo, no pegada al pixel.
   pose   — cambio de opción: llega firme, sin rebote perceptible.
   pointer— paralaje de mouse: blando y muy amortiguado, si no marea. */
export const spring = {
  stage:   { stiffness: 80,  damping: 26, mass: 0.9 },
  pose:    { stiffness: 140, damping: 22, mass: 0.6 },
  pointer: { stiffness: 60,  damping: 20, mass: 0.7 },
};

/* Entrada en viewport. El desplazamiento es corto a propósito:
   14px leen como "estaba ahí" y no como un carrusel. */
export const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, delay: i * 0.06, ease: easeOut },
  }),
};

/* Titulares grandes: recorren más distancia, así que duran más.
   Mismo criterio, no un valor suelto. */
export const revealDisplay = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.86, delay: i * 0.06, ease: easeOut },
  }),
};

export const viewportOnce = { once: true, margin: '-12% 0px' };
