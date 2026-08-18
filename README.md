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

Todo lo que hay que reemplazar está en un solo archivo: `src/data/site.js`,
marcado con `// ⇦ REEMPLAZAR`.

1. **Número de WhatsApp** — `CONTACTO.whatsapp`, formato internacional, solo
   dígitos. Hoy tiene un placeholder (`595000000000`) que no lleva a ningún lado.
2. **Email de ventas** — `CONTACTO.email`.
3. **Los 4 archivos del logo** — van en `public/logo/`, con los nombres que
   detalla `public/logo/LEEME.txt`. El header y el footer usan
   `logo-white.png`; el favicon usa `logo-icon.png`. Mientras no estén, el
   header cae al wordmark tipografiado sin romper nada.
4. **Catálogo real** — nombres, referencias, precios, materiales y stock. Los 12
   productos actuales son plausibles pero inventados: sirven para ver el diseño,
   no para publicar.
5. **Fotos de producto** — van en `public/productos/` y se referencian en el
   campo `imagen` de cada producto (`'productos/archivo.webp'`). Mientras el
   campo esté en `null`, la tarjeta muestra el marco vacío con la etiqueta
   "fotografía pendiente". Formato según el manual: vertical 4:5, fondo
   `#F5F5F7`, instrumento al 55-65% del encuadre.

## Imágenes opcionales que mejoran el resultado

Ambas son opcionales: si el archivo no existe, la web cae automáticamente a la
versión vectorial y no se rompe nada.

- `public/media/smile.jpg` — primer plano de sonrisa, apaisado, fondo negro,
  luz de estudio. Si existe, el plano secuencia del inicio recorre la foto en
  vez del vector. Es la mejora de mayor impacto visual del sitio.
- `public/media/clinician.jpg` — retrato de la odontóloga trabajando (barbijo,
  gafas, lupas de magnificación), vertical 4:5.

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
  App.jsx                  secciones y rig de scroll
  styles.css               sistema visual completo (tokens, grilla, componentes)
  data/site.js             contacto + catálogo  ← el único archivo a editar
  components/
    Smile.jsx              sonrisa vectorial del plano secuencia
    Clinician.jsx          retrato clínico vectorial (fallback)
    icons.jsx              iconos SVG propios
```

## Adaptar el sitio a otro rubro

La estructura no tiene nada específico de odontología salvo el contenido:
`data/site.js` (productos y categorías) y las dos ilustraciones de
`components/`. Para equipo de rescate, relojería o cualquier otro catálogo se
cambian esos archivos y los textos de `App.jsx`; la grilla de estantería, el rig
de scroll y el flujo a WhatsApp quedan igual.
