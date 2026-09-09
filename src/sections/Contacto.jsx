import Reveal from '../components/Reveal.jsx';
import { CONTACTO, ESTUDIO, REDES } from '../data/site.js';

/* Los datos que todavía no existen se muestran marcados, no
   inventados ni ocultos: así no se publica un teléfono falso
   ni se entrega un footer con huecos silenciosos. */
function Dato({ valor, href, children }) {
  if (!valor) return <span className="foot-link tbd">{children}</span>;
  return (
    <a className="foot-link" href={href}>
      {valor}
    </a>
  );
}

export default function Contacto() {
  return (
    <section className="section" id="contacto">
      <div className="wrap stack">
        <Reveal as="p" className="label" i={0}>
          Contacto
        </Reveal>
        <Reveal as="h2" className="h-lg" i={1} display>
          Contanos qué<br />hay que resolver.
        </Reveal>
        <Reveal as="p" className="body" i={2}>
          Escribinos con el problema, no con el pedido de pieza. De ahí sale
          una conversación más corta y un presupuesto más honesto.
        </Reveal>
        <Reveal className="row" i={3}>
          <a className="btn btn--primary" href={CONTACTO.mail ? `mailto:${CONTACTO.mail}` : '#contacto'}>
            Escribinos
          </a>
        </Reveal>

        <footer className="foot" style={{ width: '100%' }}>
          <div className="foot-rows">
            <div className="foot-col">
              <span className="caption">Directo</span>
              <Dato valor={CONTACTO.mail} href={`mailto:${CONTACTO.mail}`}>Mail</Dato>
              <Dato valor={CONTACTO.telefono} href={`tel:${CONTACTO.telefono}`}>Teléfono</Dato>
              <Dato valor={CONTACTO.ciudad}>Ciudad</Dato>
            </div>

            <div className="foot-col">
              <span className="caption">Redes</span>
              {REDES.map((r) => (
                <Dato key={r.nombre} valor={r.url ? r.nombre : null} href={r.url}>
                  {r.nombre}
                </Dato>
              ))}
            </div>
          </div>

          <div className="foot-base">
            <span className="caption">
              © {new Date().getFullYear()} {ESTUDIO.nombre}
            </span>
            <span className="caption">{ESTUDIO.claim}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
