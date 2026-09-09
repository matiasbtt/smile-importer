import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/icons.jsx';
import { ESTUDIO } from '../data/site.js';

export default function Hero() {
  return (
    <section className="rail-panel" id="inicio">
      <Reveal as="p" className="label" i={0}>
        {ESTUDIO.nombre} — {new Date().getFullYear()}
      </Reveal>

      <Reveal as="h1" className="display" i={1} display>
        La forma<br />tiene un<br /><span className="accent">porqué</span>.
      </Reveal>

      <Reveal as="p" className="body" i={2}>
        Somos un estudio de diseño y dirección creativa. Trabajamos sobre el
        criterio antes que sobre la pieza: cuando el principio está claro, la
        forma se vuelve una consecuencia y no una opinión.
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
