import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Lenis from 'lenis';

import Logo from './components/Logo.jsx';
import { WhatsAppMark, GmailMark, Arrow, FrameMark } from './components/icons.jsx';
import {
  CONTACTO,
  linkWhatsApp,
  mostrarNumero,
  PRODUCTOS,
  COMBOS,
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

/* ── Bienvenida directa al catálogo ─────────────────────── */
function Bienvenida() {
  const reduced = useReducedMotion();
  const enter = (delay) => ({
    initial: reduced
      ? false
      : { opacity: 0, transform: 'translateY(18px)', filter: 'blur(5px)' },
    animate: { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' },
    transition: { duration: 0.68, delay, ease: [0.23, 1, 0.32, 1] },
  });

  return (
    <section className="welcome" id="bienvenida" aria-labelledby="welcome-title">
      <div className="shell welcome-content">
        <div className="welcome-copy">
          <motion.h1 id="welcome-title" className="welcome-title" {...enter(0.08)}>
            Bienvenidos al catálogo de <strong>SMILE IMPORTER</strong>.
          </motion.h1>
          <motion.p className="welcome-lead" {...enter(0.18)}>
            Desliza para conocer nuestros productos. Consulta stock, precio por volumen
            y entrega directamente por WhatsApp.
          </motion.p>
          <motion.div className="welcome-actions" {...enter(0.28)}>
            <a className="btn btn-primary welcome-cta" href="#catalogo">
              Ver productos <Arrow />
            </a>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="welcome-rule"
        aria-hidden="true"
        initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
      />
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
  const [imagenFallida, setImagenFallida] = useState(false);
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
        {p.imagen && !imagenFallida ? (
          <img
            src={`${import.meta.env.BASE_URL}${p.imagen}`}
            className={p.imagenEnfoque === 'localizador' ? 'item-photo-focus' : undefined}
            alt={p.nombre}
            loading="lazy"
            decoding="async"
            onError={() => setImagenFallida(true)}
          />
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
        {p.stock === null && <span className="tag-out">Consultar stock</span>}
        {p.stock === false && <span className="tag-out">A pedido</span>}
      </div>

      {p.caja && (
        <div className="item-caja">
          Caja de {p.caja.unidades} · {MONEDA} {precio(p.caja.precio)}
          <span> ({MONEDA} {precio(p.caja.precio / p.caja.unidades)} c/u)</span>
        </div>
      )}

      <a
        className="item-ask"
        href={linkWhatsApp(p)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Consultar por ${p.nombre} en WhatsApp`}
      >
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
    <section className="pad catalog" id="catalogo">
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
                type="button"
                className="chip"
                data-on={filtro === c}
                aria-pressed={filtro === c}
                onClick={() => setFiltro(c)}
              >
                {c}
              </button>
            ))}
            <a className="chip" href="#combos">Ver combos</a>
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

function Combos() {
  return (
    <section className="pad" id="combos" aria-labelledby="combos-title">
      <div className="shell stack-lg">
        <div className="between">
          <h2 className="h2" id="combos-title">Combos de endodoncia</h2>
          <p className="lead" style={{ maxWidth: '38ch', fontSize: '0.875rem' }}>
            Cada combo incluye un endomotor y un localizador de ápice independiente.
            El localizador es el mismo en ambas opciones.
          </p>
        </div>
        <div className="shelf-grid combo-grid">
          {COMBOS.map((p, i) => <Item key={p.ref} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════ */
function Certificaciones() {
  return (
    <section className="pad certifications" id="certificaciones" aria-labelledby="certifications-title">
      <div className="shell certifications-layout">
        <div className="stack">
          <p className="mono">Conformidad y control de calidad</p>
          <h2 className="h2" id="certifications-title">Certificaciones</h2>
          <p className="lead certifications-lead">
            Todos nuestros productos cuentan con certificación de conformidad
            europea y rigurosos tests realizados por la importadora.
          </p>
        </div>
        <dl className="certification-specs">
          {[
            ['AISI 304 / 420', 'Acero quirúrgico certificado por lote'],
            ['Clase B', 'Compatible con ciclo de autoclave'],
            ['Sin intermediarios', 'Importación directa de fábrica'],
          ].map(([value, description]) => (
            <div className="certification-spec" key={value}>
              <dt>{value}</dt>
              <dd className="mono">{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

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
              <GmailMark white /> {CONTACTO.email}
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
    const onScroll = () => setSolid(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="nav" data-solid={solid}>
        <a href="#bienvenida" aria-label="SMILE IMPORTER — bienvenida al catálogo">
          <Logo height={68} />
        </a>
        <nav className="nav-links">
          <a className="mono" href="#catalogo">Catálogo</a>
          <a className="mono" href="#combos">Combos</a>
          <a className="mono" href="#certificaciones">Certificaciones</a>
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
        <Bienvenida />
        <Catalogo />
        <Combos />
        <Certificaciones />
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
        aria-hidden={!solid}
        tabIndex={solid ? 0 : -1}
        initial={false}
        animate={
          solid
            ? { opacity: 1, transform: 'translateY(0)', pointerEvents: 'auto' }
            : { opacity: 0, transform: 'translateY(16px)', pointerEvents: 'none' }
        }
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        whileTap={{ transform: 'scale(0.97)' }}
      >
        <WhatsAppMark size={36} />
        <span>Consultar por WhatsApp</span>
      </motion.a>
    </>
  );
}
