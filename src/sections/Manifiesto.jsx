import Reveal from '../components/Reveal.jsx';

export default function Manifiesto() {
  return (
    <section className="rail-panel" id="manifiesto">
      <Reveal as="p" className="label" i={0}>
        Manifiesto
      </Reveal>

      <Reveal as="h2" className="h-lg" i={1} display>
        Nada decorativo<br />sobrevive al uso.
      </Reveal>

      <Reveal as="p" className="body" i={2}>
        Lo que se agrega para llenar un espacio se cae en la primera revisión.
        Lo que resuelve algo se queda. Diseñamos partiendo de esa diferencia:
        cada elemento de una pieza tiene que poder justificar por qué está.
      </Reveal>

      <Reveal as="p" className="body body--muted" i={3}>
        Por eso el vacío es material de trabajo y no espacio sobrante. El negro
        de esta página no es un fondo: es lo que hace que lo poco que queda
        encima tenga peso.
      </Reveal>
    </section>
  );
}
