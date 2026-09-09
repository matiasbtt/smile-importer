import Reveal from '../components/Reveal.jsx';

export default function Manifiesto() {
  return (
    <section className="rail-panel" id="manifiesto">
      <Reveal as="p" className="label" i={0}>
        Manifiesto
      </Reveal>

      <Reveal as="h2" className="h-lg" i={1} display>
        Observar, recons&shy;truir,<br />imaginar.
      </Reveal>

      <Reveal as="p" className="body" i={2}>
        Una inteligencia artificial mira una flor, intenta rehacerla en papel y
        termina inventando especies que nunca existieron. Ese es el proceso, y
        también es la forma en que trabajamos: entender algo real, reconstruirlo
        con las manos, y recién ahí permitirse imaginar.
      </Reveal>

      <Reveal as="p" className="body body--muted" i={3}>
        Lo artificial está en el material, no en el gesto. Por eso el vacío es
        material de trabajo y no espacio sobrante: el negro de esta página no es
        un fondo, es lo que hace que lo poco que queda encima tenga peso.
      </Reveal>
    </section>
  );
}
