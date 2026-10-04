# SMILE IMPORTER — sitio catálogo

Catálogo informativo de una sola página. No hay checkout ni cuentas: todo el
cierre de pedido sale por WhatsApp, con el producto y la referencia ya escritos
en el mensaje.

## Correr el proyecto

```bash
npm install
```

```bash
npm run dev
```

Queda en http://localhost:5178

```bash
npm run build
```

Genera `dist/`, que es una carpeta estática — se sube tal cual a Vercel,
Netlify, Cloudflare Pages o cualquier hosting.

## Stack

- **React + Vite** — base.
- **motion** (la evolución de framer-motion, `motion/react`) — todo el scroll
  ligado a animación: `useScroll` + `useTransform` + `useSpring`.
- **lenis** — scroll con inercia. Se desactiva solo si el sistema pide
  `prefers-reduced-motion`.

No se usó Three.js: el efecto pedido es un retroceso de cámara en 2D
(escala + traslación), y resolverlo con WebGL agregaría ~600 KB y problemas de
rendimiento en móvil sin mejorar el resultado.

## Qué falta cargar

1. **Fotos de producto** — van en `public/productos/` y se referencian en
   `src/data/site.js`. E-05 y E-02 tienen texto agregado por IA grabado sobre
   el instrumento (viola regla de marca), requieren refotografiar. E-08 sin foto.
   Formato: vertical 4:5, fondo `#F5F5F7`, instrumento 55-65% del encuadre.

2. **Logo icon oficial** — `public/logo/logo-icon.png` hoy es placeholder
   (copia de smile_logo_white.png). Reemplazar cuando llegue ícono S solo,
   máximo 2 colores, sin rasgos faciales.

3. **Imagen de preview** — `public/media/og-cover.jpg` (1200×630) para Open Graph.
   Hoy es placeholder (logo copiado). Reemplazar con foto real del hero o producto.

## Paleta

Se usa la **paleta del sistema digital** (Premium Bio-Tech Dark) del
`contexto_proyecto.json`, no la paleta física de marca:

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#0A0A0A` | fondo general |
| `--forest` | `#0F2E23` | primario, cierre y footer |
| `--emerald` | `#27604F` | secundario, único acento (botones) |
| `--mist` | `#C4C7C5` | terciario, líneas y texto secundario |
| `--clinical` | `#F5F5F7` | excepción documentada: interior de la tarjeta de producto |

Tipografía: Manrope (titulares y cuerpo) + JetBrains Mono (etiquetas técnicas,
precios y referencias).

## Estructura

```
src/
  App.jsx                  bienvenida, catálogo y contacto
  styles.css               sistema visual completo (tokens, grilla, componentes)
  data/site.js             contacto + catálogo  ← el único archivo a editar
  components/
    icons.jsx              iconos SVG propios
```

## Adaptar el sitio a otro rubro

La estructura no tiene nada específico de odontología salvo el contenido:
`data/site.js` (productos y categorías). Para equipo de rescate, relojería o
cualquier otro catálogo se cambian ese archivo y los textos de `App.jsx`; la
grilla de estantería y el flujo a WhatsApp quedan igual.
