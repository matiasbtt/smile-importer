import { useEffect, useState } from 'react';
import { Mark } from './icons.jsx';
import { ESTUDIO, NAV } from '../data/site.js';

export default function Nav() {
  const [activo, setActivo] = useState(null);
  const [pasoElHero, setPasoElHero] = useState(false);

  /* La sección activa se resuelve con IntersectionObserver, no
     escuchando scroll: el observer no corre en el hilo principal
     en cada frame. */
  useEffect(() => {
    const secciones = NAV
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!secciones.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActivo(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] },
    );
    secciones.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Una sola píldora violeta por pantalla. Hero y contacto tienen
     la suya, así que mientras alguna de las dos está a la vista la
     del nav baja a texto; en el medio, el nav toma el relevo.
     Dos píldoras iguales al mismo tiempo dejarían la acción
     primaria sin jerarquía. */
  useEffect(() => {
    const propias = ['inicio', 'contacto']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!propias.length) return;

    const visibles = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visibles.add(e.target.id);
          else visibles.delete(e.target.id);
        });
        setPasoElHero(visibles.size === 0);
      },
      /* Banda central, no un ratio: una sección más alta que la
         ventana nunca llega a un threshold de 0.3, porque el ratio
         se mide contra el tamaño del target. Con rootMargin el
         disparo depende de dónde está la sección en pantalla y no
         de cuánto mide. */
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 },
    );
    propias.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="#inicio" aria-label={`${ESTUDIO.nombre} — inicio`}>
          <Mark />
          <span className="logo-word">{ESTUDIO.nombre}</span>
        </a>

        <nav className="nav-links" aria-label="Secciones">
          {NAV.map(({ id, label }) => (
            <a
              key={id}
              className="nav-link"
              href={`#${id}`}
              aria-current={activo === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          className={`btn ${pasoElHero ? 'btn--primary' : 'btn--ghost'}`}
          href="#contacto"
        >
          Escribinos
        </a>
      </div>
    </header>
  );
}
