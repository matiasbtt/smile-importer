import { useEffect, useMemo, useRef, useState } from 'react';
import { useScroll } from 'motion/react';

import Nav from './components/Nav.jsx';
import Stage from './components/Stage.jsx';

import Hero from './sections/Hero.jsx';
import Manifiesto from './sections/Manifiesto.jsx';
import Capacidades from './sections/Capacidades.jsx';
import Proceso from './sections/Proceso.jsx';
import Estudio from './sections/Estudio.jsx';
import Contacto from './sections/Contacto.jsx';

import { useSmoothScroll } from './lib/useStage.js';
import { CAPACIDADES, ESCENAS, VIDEO } from './data/site.js';

const PANELES = ['inicio', 'manifiesto', 'capacidades'];

export default function App() {
  useSmoothScroll();

  const rail = useRef(null);
  const [panel, setPanel] = useState('inicio');
  const [opcion, setOpcion] = useState(0);

  /* Un solo valor de scroll gobierna la deriva del stage: el
     avance dentro del rail, de 0 en el hero a 1 al final de
     capacidades. */
  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ['start start', 'end end'],
  });

  /* Qué panel manda. El observer es la única fuente: si además
     escucháramos scroll, los dos se pelearían por el estado. */
  useEffect(() => {
    const nodos = PANELES.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodos.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setPanel(visible.target.id);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.4, 1] },
    );
    nodos.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* En capacidades manda la opción elegida; en el resto, la
     escena del panel. Derivarlo en vez de guardarlo evita que
     volver a subir deje la flor en la pose de otra sección.

     Lo que cambia es el encuadre, nunca el archivo: el video es
     una sola pieza en loop continuo y cortarlo para intercambiar
     clips rompería lo único que el brief marca como regla
     principal. */
  const pose = useMemo(() => {
    if (panel === 'capacidades') return (CAPACIDADES[opcion] ?? CAPACIDADES[0]).pose;
    return ESCENAS[panel] ?? ESCENAS.inicio;
  }, [panel, opcion]);

  return (
    <>
      <a className="skip" href="#inicio">Ir al contenido</a>
      <Nav />

      <main>
        <div className="wrap">
          <div className="rail" ref={rail}>
            <div className="rail-visual">
              <div className="rail-sticky">
                <Stage progress={scrollYProgress} pose={pose} video={VIDEO} />
              </div>
            </div>

            <div className="rail-flow">
              <Hero />
              <Manifiesto />
              <Capacidades activa={opcion} onActivar={setOpcion} />
            </div>
          </div>
        </div>

        <Proceso />
        <Estudio />
        <Contacto />
      </main>

    </>
  );
}
