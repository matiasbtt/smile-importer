import Reveal from '../components/Reveal.jsx';
import { PROCESO } from '../data/site.js';

export default function Proceso() {
  return (
    <section className="section" id="proceso">
      <div className="wrap stack">
        <Reveal as="p" className="label" i={0}>
          Proceso
        </Reveal>
        <Reveal as="h2" className="h" i={1} display>
          Cuatro tiempos.
        </Reveal>

        <div className="steps" style={{ paddingTop: 'var(--s-36)' }}>
          {PROCESO.map((p, i) => (
            <Reveal className="step" key={p.n} i={i}>
              <span className="opt-idx">{p.n}</span>
              <h3 className="h-2xs">{p.t}</h3>
              <p className="body body--muted">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
