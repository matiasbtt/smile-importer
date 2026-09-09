# Voluta Studios

Sitio de una sola página. Fondo negro en todas las secciones, tipografía
monolítica y una flor que se mantiene presente a la izquierda, girando en tres
dimensiones según se avanza y según la opción elegida.

## Correr el proyecto

```bash
npm install
npm run dev
```

Queda en http://localhost:5180

```bash
npm run build
```

Genera `dist/`, una carpeta estática que se sube tal cual a Vercel, Netlify,
Cloudflare Pages o cualquier hosting.

---

## Material — dónde van los videos

Los archivos van en **`public/media/voluta/`** con estos nombres:

```
public/media/voluta/
├─ flor-01.mp4   (+ flor-01.jpg opcional, como poster)
├─ flor-02.mp4
├─ flor-03.mp4
└─ flor-04.mp4
```

No hay que tocar código para que aparezcan: el stage verifica si el archivo
existe y lo monta solo. **Mientras no existan, dibuja la flor en vector** y el
sitio se ve terminado igual — no queda un hueco negro.

Qué archivo usa cada sección se define en `src/data/site.js`, en el campo
`video` de `ESCENAS` y de cada entrada de `CAPACIDADES`.

### Cómo conviene que estén los videos

- **Fondo negro.** El plano se compone con `mix-blend-mode: screen`, así que el
  negro del video se funde con el fondo de la página y la flor queda flotando
  en lugar de dentro de un rectángulo.
- **Vertical o cuadrado**, la columna es más alta que ancha.
- **Sin audio** (van en `muted`, es lo que permite el autoplay).
- **Cortos y en loop**, 4 a 8 segundos.

### Los dos modos

En `src/data/site.js`, cada video tiene una bandera `scrub`:

| `scrub` | Qué hace | Cuándo usarlo |
|---|---|---|
| `false` *(por defecto)* | El video corre en loop y lo que gira en 3D es el plano que lo contiene. | Siempre, salvo que el archivo esté preparado. Funciona con cualquier mp4. |
| `true` | El scroll pasa los fotogramas, cuadro por cuadro. | Solo con un archivo codificado para eso. |

El modo `scrub` da el efecto más fuerte, pero exige keyframes en todos los
cuadros. Con un mp4 normal el navegador salta de keyframe a keyframe y se ve a
tirones. Para preparar un archivo:

```bash
ffmpeg -i original.mp4 -an -g 1 -crf 24 -vf "scale=1080:-2" flor-01.mp4
```

`-g 1` es la parte importante (un keyframe por cuadro). `-an` saca el audio.
El archivo pesa bastante más — conviene solo para el video del hero.

---

## Cómo está armado

```
src/
├─ styles/
│  ├─ tokens.css      Colores, escala tipográfica, espacio, curvas
│  └─ app.css         Layout y componentes
├─ lib/
│  ├─ motion.js       Curvas, resortes y variantes de entrada
│  └─ useStage.js     Scroll suave, paralaje de puntero, detección de video
├─ components/
│  ├─ Stage.jsx       La flor en 3D — el corazón del sitio
│  ├─ Flower.jsx      La flor en vector (respaldo sin material)
│  ├─ Motes.jsx       Partículas ambientales
│  ├─ Grain.jsx       Grano de papel
│  └─ Nav.jsx
├─ sections/          Hero, Manifiesto, Capacidades, Proceso, Estudio, Contacto
└─ data/site.js       Todo el contenido y los datos pendientes
```

### El efecto 3D

No es una imagen a la que se le aplican transformaciones planas. La perspectiva
vive en el contenedor (`perspective: 1100px`) y las capas están separadas en el
eje Z de verdad:

```
resplandor   translateZ(-260px)
flor / video translateZ(0)
especular    translateZ(+90px)
```

Al rotar el conjunto, cada capa se desplaza a distinta velocidad porque así la
proyecta la perspectiva — el paralaje no está animado a mano. La flor en vector
suma tres anillos de pétalos, cada uno a su propia profundidad.

Tres entradas se suman sobre el mismo eje:

| Entrada | Qué aporta |
|---|---|
| **Scroll** | Deriva continua a lo largo de la página. |
| **Opción** | Salto discreto de encuadre al elegir una capacidad. Llega por resorte. |
| **Puntero** | Micro-paralaje de ±5°, solo con mouse. |

### Reglas de movimiento

Están escritas en `src/lib/motion.js` y las sigue todo el sitio:

1. Se anima `transform` y `opacity`. Nada que dispare layout.
2. Nunca `linear`, salvo la rotación continua de la flor.
3. Lo que responde a input directo va con resorte (interrumpible). Lo que entra
   en viewport va con duración fija.
4. La distancia decide la duración: 14px de entrada no duran lo mismo que un
   cambio de pose.
5. Con `prefers-reduced-motion` el scroll suave se desactiva entero, la flor
   queda en la pose de la sección y las rotaciones se detienen. El 3D se
   mantiene: deja de derivar, no de existir.

### Decisiones que parecen detalles y no lo son

- **`overflow-x: clip`, nunca `hidden`.** `hidden` convierte al elemento en
  contenedor de scroll y rompe `position: sticky` en todos sus descendientes:
  la flor deja de quedarse fija.
- **La columna del stage tiene que estirarse a todo el alto del rail.** Con
  `align-items: start` el item mide lo que mide su contenido y el sticky se
  queda sin recorrido.
- **La capa que contiene el video no recorta.** `overflow` + `border-radius`
  sobre un contexto `preserve-3d` lo aplanan, y los anillos de la flor
  perderían su separación en Z. El redondeo va en el `<video>`.
- **El resplandor y el especular van enmascarados en radial.** Un rectángulo
  claro sobre negro se lee como panel, y acá no hay paneles.

---

## Sistema visual

| | |
|---|---|
| Fondo | `#000000` — único fondo, en todas las secciones |
| Texto | `#ffffff` titulares · `#f2efe9` cuerpo · `#bdbdbd` terciario · `#9a9a9a` apagado |
| Acción | `#8052ff` — una sola píldora violeta por pantalla |
| Énfasis | `#ffb829` |
| Profundidad | `#15846e` |
| Tipografía | Inter 200 / 400 / 600 |
| Radio | 24px |
| Base de espacio | 6px |

Los titulares van todos en peso 400: la jerarquía es escala y tracking, no
peso. El cuerpo va en 200 — es la firma del sistema y no conviene subirlo a 400.
Sin cards, sin bordes, sin sombras: los elementos flotan sobre el negro y los
separa el espacio.

---

## Qué falta cargar

Todo esto está en `src/data/site.js` y aparece marcado como **PENDIENTE** en
pantalla, para que no se publique sin darse cuenta:

- [ ] Mail, teléfono y ciudad (`CONTACTO`)
- [ ] Links de redes (`REDES`)
- [ ] Nombres, roles y retratos del equipo (`EQUIPO`)
- [ ] Los videos de la flor (`public/media/voluta/`)
- [ ] Textos definitivos de las secciones — los actuales son de trabajo
- [ ] Favicon y imagen de Open Graph
