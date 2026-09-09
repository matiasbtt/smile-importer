import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/icons.jsx';
import { ESTUDIO } from '../data/site.js';

export default function Hero() {
  return (
    <section className="rail-panel" id="inicio">
      <Reveal as="p" className="label" i={0}>
        {ESTUDIO.nombre} — {new Date().getFullYear()}
      </Reveal>

      {/* h-lg y no display: la columna es media pantalla y a 113px
          una frase real no entra sin partirse mal. La jerarquía la
          sigue dando la escala — 78px sobre medio ancho pesa lo
          mismo que 113px sobre el ancho completo. */}
      <Reveal as="h1" className="h-lg" i={1} display>
        Naturaleza<br />reconstruida<br />por una <span className="accent">IA</span>.
      </Reveal>

      <Reveal as="p" className="body" i={2}>
        Construimos sitios y experiencias digitales con inteligencia artificial.
        No como argumento de venta: como material de trabajo, del mismo modo en
        que alguien elige el papel con el que va a construir una flor.
      </Reveal>

      <Reveal className="row" i={3}>
        <a className="btn btn--primary" href="#capacidades">
          Ver capacidades
        </a>
        <a className="btn btn--ghost" href="#manifiesto">
          Manifiesto <Arrow />
        </a>
      </Reveal>

      <div className="hint" aria-hidden="true">
        <span className="caption">Desplazar</span>
        <span className="hint-line" />
      </div>
    </section>
  );
}
