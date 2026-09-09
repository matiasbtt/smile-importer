import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { spring } from './motion.js';

/* Scroll con inercia. Se apaga entero si el sistema pide menos
   movimiento — no se "reduce", se saca. */
export function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let lenis, id, cancelled = false;
    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        const raf = (t) => {
          lenis.raf(t);
          id = requestAnimationFrame(raf);
        };
        id = requestAnimationFrame(raf);
      })
      // Si el chunk no carga, queda el scroll nativo. Sin este catch
      // la promesa rechazada sube como error no manejado y ensucia
      // la consola por una mejora que es opcional.
      .catch(() => {});
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      lenis?.destroy();
    };
  }, [reduced]);
}

/* Paralaje de puntero, normalizado a [-1, 1] sobre la ventana.
   Va por resorte: el mouse salta de un frame a otro y sin amortiguar
   el plano 3D tiembla. */
export function usePointer() {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring.pointer);
  const y = useSpring(rawY, spring.pointer);

  useEffect(() => {
    if (reduced) return;
    // Solo con puntero fino: en touch no hay hover y el listener
    // se dispararía con cada scroll.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = null;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        rawX.set((e.clientX / window.innerWidth) * 2 - 1);
        rawY.set((e.clientY / window.innerHeight) * 2 - 1);
        frame = null;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, rawX, rawY]);

  return { x, y };
}

/* Detecta si un archivo de video existe antes de montarlo.
   Sin esto el <video> roto deja un hueco negro sin fallback:
   a diferencia de <img>, no siempre dispara onError de forma
   consistente entre navegadores. */
export function useVideoSource(src) {
  const [state, setState] = useState(src ? 'probing' : 'absent');
  const seen = useRef(null);

  useEffect(() => {
    if (!src) { setState('absent'); return; }
    if (seen.current === src) return;
    seen.current = src;
    let alive = true;
    setState('probing');
    fetch(src, { method: 'HEAD' })
      .then((r) => {
        if (!alive) return;
        const type = r.headers.get('content-type') || '';
        // Un dev server devuelve 200 + index.html para rutas que no
        // existen. Si no dice video/, no hay video.
        setState(r.ok && type.startsWith('video') ? 'ready' : 'absent');
      })
      .catch(() => alive && setState('absent'));
    return () => { alive = false; };
  }, [src]);

  return state;
}
