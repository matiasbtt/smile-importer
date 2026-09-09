import Reveal from '../components/Reveal.jsx';
import { EQUIPO } from '../data/site.js';

/* Retratos sin marco, sin sombra y sin fondo de card: flotan
   sobre el vacío y los separa el espacio, nada más.
   Mientras no haya foto, el hueco queda con el resplandor de
   marca — se lee como pendiente, no como error. */
export default function Estudio() {
  return (
    <section className="section" id="estudio">
      <div className="wrap stack">
        <Reveal as="p" className="label" i={0}>
          Estudio
        </Reveal>
        <Reveal as="h2" className="h" i={1} display>
          Quiénes.
        </Reveal>
        <Reveal as="p" className="body" i={2}>
          Un equipo chico y estable. La misma gente que define el criterio es la
          que después lo ejecuta — y la que decide qué de todo lo que la máquina
          propone merece existir.
        </Reveal>

        <div className="people" style={{ paddingTop: 'var(--s-36)', width: '100%' }}>
          {EQUIPO.map((p, i) => (
            <Reveal className="person" key={i} i={i}>
              <div className="person-portrait">
                {p.foto && <img src={p.foto} alt={p.nombre} loading="lazy" />}
              </div>
              <span className="opt-idx">{p.rol === 'PENDIENTE' ? 'Rol' : p.rol}</span>
              <h3 className="h-2xs">
                {p.nombre === 'PENDIENTE' ? <span className="tbd">Nombre</span> : p.nombre}
              </h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
