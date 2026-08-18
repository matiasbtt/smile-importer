import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import Lenis from 'lenis';

import Logo from './components/Logo.jsx';
import Smile from './components/Smile.jsx';
import Clinician from './components/Clinician.jsx';
import { WhatsAppMark, GmailMark, Arrow, FrameMark } from './components/icons.jsx';
import {
  CONTACTO,
  linkWhatsApp,
  mostrarNumero,
  PRODUCTOS,
  CATEGORIAS,
  MONEDA,
} from './data/site.js';

/* ── Scroll con inercia ───────────────────────────────────── */
function useSmoothScroll(disabled) {
  useEffect(() => {
    if (disabled) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [disabled]);
}

/* ── Revelado de entrada, discreto y en cascada ───────────── */
const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Reveal({ children, i = 0, as = 'div', ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      variants={reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* ═══════════════════════════════════════════════════════════
   PLANO SECUENCIA: macro de esmalte → sonrisa completa
   Un solo valor de scroll gobierna escala, piel, viñeta y texto.
   ═══════════════════════════════════════════════════════════ */
function Sequence() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // El retroceso de cámara: de 3 dientes en cuadro a la sonrisa entera.
  // El origen está descentrado a propósito (41% 69% en .scene-layer): el
  // encuadre de apertura cae sobre el cuerpo/borde incisal del diente, sin
  // encía en cuadro. Centrado en la línea media solo se vería la ranura del medio.
  const scale = useTransform(p, [0, 0.62, 1], [3.2, 1.2, 0.94]);
  const y = useTransform(p, [0, 0.62, 1], ['5%', '1%', '0%']);
  const skin = useTransform(p, [0.34, 0.78], [0, 1]);
  const vignette = useTransform(p, [0, 0.5], [0.25, 1]);
  const hint = useTransform(p, [0, 0.08], [1, 0]);

  const c1 = useTransform(p, [0, 0.1, 0.26, 0.34], [1, 1, 1, 0]);
  const c2 = useTransform(p, [0.34, 0.44, 0.62, 0.7], [0, 1, 1, 0]);
  const c3 = useTransform(p, [0.7, 0.8, 1, 1], [0, 1, 1, 1]);

  if (reduced) {
    return (
      <section className="scene" ref={ref}>
        <div className="scene-stage">
          <div className="scene-layer" style={{ transform: 'scale(0.94)' }}>
            <Smile />
          </div>
          <div className="scene-vignette" />
          <div className="scene-scrim" />
          <div className="scene-copy">
            <div className="stack-sm">
              <p className="mono">SMILE IMPORTER · Importación directa</p>
              <h1 className="display">
                Titanio que no<br />discute.
              </h1>
              <div className="row" style={{ paddingTop: 8 }}>
                <a className="btn btn-ghost" href="#catalogo">
                  Ver catálogo <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="scene" ref={ref} id="inicio">
      <div className="scene-stage">
        <motion.div className="scene-layer" style={{ scale, y }}>
          <HeroLayer skinOpacity={skin} />
        </motion.div>

        <motion.div className="scene-vignette" style={{ opacity: vignette }} />
        <div className="scene-scrim" />

        <div className="scene-copy">
          <div style={{ position: 'relative', minHeight: '30vh', width: '100%' }}>
            <motion.div className="stack-sm" style={{ opacity: c1, position: 'absolute', bottom: 0 }}>
              <p className="mono">Esmalte · 20x</p>
              <h1 className="display">
                Usted trabaja a<br />esta escala.
              </h1>
            </motion.div>

            <motion.div className="stack-sm" style={{ opacity: c2, position: 'absolute', bottom: 0 }}>
              <p className="mono">Tolerancia · 0,02 mm</p>
              <h2 className="display">
                El instrumento<br />tiene que estar<br />a la altura.
              </h2>
            </motion.div>

            <motion.div
              className="between"
              style={{ opacity: c3, position: 'absolute', bottom: 0, width: '100%' }}
            >
              <div className="stack-sm">
                <p className="mono">SMILE IMPORTER · Importación directa</p>
                <h2 className="display">
                  Titanio que no<br />discute.
                </h2>
              </div>
              <div className="row">
                <a className="btn btn-ghost" href="#catalogo">
                  Ver catálogo <Arrow />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="scene-hint" style={{ opacity: hint }}>
          <p className="mono" style={{ textAlign: 'center' }}>Desplazar</p>
          <div className="scene-hint-line" />
        </motion.div>
      </div>
    </section>
  );
}

/* Capa del plano secuencia.
   Si existe /public/media/smile.jpg (primer plano de sonrisa, apaisado,
   fondo negro), se usa esa foto y el mismo retroceso de cámara la recorre.
   Si no existe, cae al vector — no hay que tocar nada más. */
function HeroLayer({ skinOpacity }) {
  const [photo, setPhoto] = useState(true);
  if (photo) {
    return (
      <img
        className="scene-photo"
        src="/media/smile.jpg"
        alt=""
        onError={() => setPhoto(false)}
      />
    );
  }
  return <SmileWithSkin skinOpacity={skinOpacity} />;
}

/* La piel se revela sobre el final del retroceso: primero es solo esmalte
   sobre negro, después se entiende que era el rostro de una persona. */
function SmileWithSkin({ skinOpacity }) {
  const ref = useRef(null);
  useMotionValueEvent(skinOpacity, 'change', (v) => {
    const g = ref.current?.querySelector('#smile-skin');
    if (g) g.style.opacity = v;
  });
  useEffect(() => {
    const g = ref.current?.querySelector('#smile-skin');
    if (g) g.style.opacity = 0;
  }, []);
  return (
    <div ref={ref} style={{ display: 'grid', placeItems: 'center', width: '100%' }}>
      <Smile />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Retrato clínico — foto real si existe, vector como fallback
   ═══════════════════════════════════════════════════════════ */
function Portrait() {
  const [hasPhoto, setHasPhoto] = useState(true);
  return (
    <div className="portrait">
      {hasPhoto ? (
        <img
          src="/media/clinician.jpg"
          alt="Odontóloga trabajando con lupas de magnificación"
          onError={() => setHasPhoto(false)}
        />
      ) : (
        <Clinician />
      )}
      <div className="portrait-caption">
        <p className="mono">Campo operatorio · magnificación 4,5x</p>
      </div>
    </div>
  );
}

function ClinicSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section className="pad" id="criterio" ref={ref}>
      <div className="shell split">
        <motion.div style={{ y }}>
          <Reveal>
            <Portrait />
          </Reveal>
        </motion.div>

        <div className="stack">
          <Reveal i={0}>
            <p className="mono">Criterio de selección</p>
          </Reveal>
          <Reveal i={1}>
            <h2 className="h2">
              A 4,5 aumentos,
              <br />
              un borde mal terminado
              <br />
              se ve.
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lead">
              Importamos directo de fábrica y revisamos pieza por pieza antes de que
              entre a stock: alineación de bocado, holgura de bisagra, templado del
              filo y acabado del acero. Lo que no pasa, no se vende.
            </p>
          </Reveal>
          <Reveal i={3}>
            <div className="specs">
              {[
                ['AISI 304 / 420', 'Acero quirúrgico certificado por lote'],
                ['Clase B', 'Compatible con ciclo de autoclave'],
                ['Sin intermediarios', 'Importación directa de fábrica'],
              ].map(([v, d]) => (
                <div className="spec" key={v}>
                  <div className="spec-value">{v}</div>
                  <p className="mono" style={{ letterSpacing: '0.08em' }}>{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Catálogo en estantería
   ═══════════════════════════════════════════════════════════ */
function precio(n) {
  if (n == null) return 'A consultar';
  return n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Item({ p, i }) {
  return (
    <motion.article
      className="item"
      variants={reveal}
      custom={i % 6}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      <div className="item-frame">
        {p.imagen ? (
          <img src={p.imagen} alt={p.nombre} loading="lazy" />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <FrameMark />
            <span className="item-pending">Fotografía pendiente</span>
          </div>
        )}
      </div>

      <h3 className="item-name">{p.nombre}</h3>
      <p className="item-detail">{p.detalle}</p>

      <div className="item-meta">
        <div>
          <div className="item-price">
            {p.precio != null && <small>{MONEDA}</small>}
            {precio(p.precio)}
          </div>
          <div className="item-ref">REF {p.ref}</div>
        </div>
        {!p.stock && <span className="tag-out">A pedido</span>}
      </div>

      {p.caja && (
        <div className="item-caja">
          Caja de {p.caja.unidades} · {MONEDA} {precio(p.caja.precio)}
          <span> ({MONEDA} {precio(p.caja.precio / p.caja.unidades)} c/u)</span>
        </div>
      )}

      <a className="item-ask" href={linkWhatsApp(p)} target="_blank" rel="noreferrer">
        <WhatsAppMark size={26} white /> Consultar
      </a>
    </motion.article>
  );
}

function Catalogo() {
  const [filtro, setFiltro] = useState('Todo');
  const lista =
    filtro === 'Todo' ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === filtro);

  return (
    <section className="pad" id="catalogo" style={{ paddingTop: 0 }}>
      <div className="shell stack-lg">
        <div className="between">
          <div className="stack-sm">
            <Reveal>
              <p className="mono">Catálogo · {PRODUCTOS.length} referencias</p>
            </Reveal>
            <Reveal i={1}>
              <h2 className="h2">Estantería</h2>
            </Reveal>
          </div>
          <Reveal i={2}>
            <p className="lead" style={{ maxWidth: '34ch', fontSize: '0.875rem' }}>
              Precios en bolivianos, por unidad. Consultá por precio de caja
              cerrada y por pedidos de volumen.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="filters">
            {['Todo', ...CATEGORIAS].map((c) => (
              <button
                key={c}
                className="chip"
                data-on={filtro === c}
                onClick={() => setFiltro(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="shelf-grid">
          {lista.map((p, i) => (
            <Item key={p.ref} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════ */
function Cierre() {
  return (
    <section className="pad close" id="contacto">
      <div className="shell stack">
        <Reveal>
          <p className="mono">Cierre de pedido</p>
        </Reveal>
        <Reveal i={1}>
          <h2 className="h2" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
            El pedido se coordina por WhatsApp.
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="lead" style={{ textAlign: 'center' }}>
            Escríbanos con las referencias que le interesan. Confirmamos stock,
            precio por volumen y plazo de entrega en el mismo chat.
          </p>
        </Reveal>
        <Reveal i={3}>
          <div className="row" style={{ justifyContent: 'center' }}>
            <a
              className="btn btn-primary"
              href={linkWhatsApp()}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppMark /> Abrir WhatsApp
            </a>
            <a className="btn btn-ghost" href={`mailto:${CONTACTO.email}`}>
              <GmailMark /> {CONTACTO.email}
            </a>
          </div>
        </Reveal>
        <Reveal i={4}>
          <p className="mono" style={{ textAlign: 'center' }}>
            Línea comercial · {mostrarNumero(CONTACTO.whatsapp)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  useSmoothScroll(reduced);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setSolid(!e.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px' }
    );
    const sentinel = document.getElementById('top-sentinel');
    if (sentinel) io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div id="top-sentinel" style={{ position: 'absolute', top: 0, height: 1, width: 1 }} />

      <header className="nav" data-solid={solid}>
        <a href="#inicio" aria-label="SMILE IMPORTER — inicio">
          <Logo height={68} />
        </a>
        <nav className="nav-links">
          <a className="mono" href="#criterio">Criterio</a>
          <a className="mono" href="#catalogo">Catálogo</a>
          <a
            className="btn btn-ghost"
            style={{ padding: '9px 16px', fontSize: '0.75rem' }}
            href={linkWhatsApp()}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppMark size={28} white /> Consultar
          </a>
        </nav>
      </header>

      <main>
        <Sequence />
        <ClinicSection />
        <Catalogo />
        <Cierre />
      </main>

      <footer className="footer">
        <div className="row" style={{ gap: 20 }}>
          <Logo height={52} />
          <p className="mono">Instrumental odontológico de importación</p>
        </div>
        <div className="row" style={{ gap: 24 }}>
          <a
            className="mono footer-link"
            href={linkWhatsApp(null, CONTACTO.whatsappAlterno)}
            target="_blank"
            rel="noreferrer"
          >
            Línea alternativa · {mostrarNumero(CONTACTO.whatsappAlterno)}
          </a>
          <p className="mono">Catálogo informativo · Precios sujetos a cambio</p>
        </div>
      </footer>

      <motion.a
        className="float"
        href={linkWhatsApp()}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileTap={{ scale: 0.97 }}
      >
        <WhatsAppMark size={36} />
        <span>Consultar por WhatsApp</span>
      </motion.a>
    </>
  );
}
