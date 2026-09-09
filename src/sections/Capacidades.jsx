import { AnimatePresence, motion } from 'motion/react';
import Reveal from '../components/Reveal.jsx';
import { dur, easeOut, easeInOut } from '../lib/motion.js';
import { CAPACIDADES } from '../data/site.js';

/* ═══════════════════════════════════════════════════════════
   Las opciones que mueven la flor.
   Elegir una acá le cambia el encuadre al stage — es el mismo
   objeto visto desde otro lado, no otra imagen.

   El texto activo vive en un bloque de altura reservada y se
   cruza en opacity + y. Animar `height: auto` habría sido más
   directo, pero eso anima layout: cada frame recalcula el flujo
   de la columna y arrastra al sticky de al lado.
   ═══════════════════════════════════════════════════════════ */

export default function Capacidades({ activa, onActivar }) {
  return (
    <section className="rail-panel" id="capacidades">
      <Reveal as="p" className="label" i={0}>
        Capacidades
      </Reveal>

      <Reveal as="h2" className="h" i={1} display>
        Qué hacemos.
      </Reveal>

      <div className="opts" role="listbox" aria-label="Capacidades del estudio">
        {CAPACIDADES.map((c, i) => {
          const sel = i === activa;
          return (
            <button
              key={c.id}
              className="opt"
              role="option"
              aria-selected={sel}
              onClick={() => onActivar(i)}
              onMouseEnter={() => onActivar(i)}
              onFocus={() => onActivar(i)}
            >
              <span className="opt-idx">{String(i + 1).padStart(2, '0')}</span>
              <motion.span
                className="opt-name"
                animate={{ x: sel ? 6 : 0 }}
                transition={{ duration: dur.mid, ease: easeOut }}
              >
                {c.nombre}
              </motion.span>
              <motion.span
                className="opt-rule"
                aria-hidden="true"
                animate={{ scaleX: sel ? 1 : 0.999, opacity: sel ? 1 : 0.4 }}
                transition={{ duration: dur.mid, ease: easeInOut }}
              />
            </button>
          );
        })}
      </div>

      {/* Altura reservada: el bloque no empuja nada al cambiar. */}
      <div className="opt-body" style={{ minHeight: '5.5em' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={CAPACIDADES[activa].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: dur.mid, ease: easeOut }}
          >
            {CAPACIDADES[activa].texto}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
