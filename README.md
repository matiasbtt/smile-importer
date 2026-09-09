# Voluta Studios

Estudio creativo de webs y experiencias digitales con inteligencia artificial.

Sitio de una sola página. Fondo negro en todas las secciones, tipografía
monolítica y una flor de papel suspendida a la izquierda, que se re-encuadra en
tres dimensiones según se avanza y según la opción elegida.

> *Nature interpreted, reconstructed and imagined by artificial intelligence.*

La dirección de arte sigue `contexto_proyecto.json` (Drive · **Voluta Proyect**):
una IA observa flores reales, las reconstruye como esculturas de papel artesanal
y termina imaginando especies que no existen.

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

## Material — dónde va el video

El archivo va en **`public/media/voluta/`**:

```
public/media/voluta/
├─ flor-loop.mp4    <- la pieza continua
└─ flor-loop.jpg    <- opcional, primer fotograma como poster
```

No hay que tocar código: el stage verifica si el archivo existe y lo monta solo.
**Mientras no exista, dibuja la flor en vector** respetando la misma
composición, así que cuando entre el material real no se mueve nada de la
página.

### Es una sola pieza, no cuatro clips

Según el brief, el video es una sucesión larga de flores que se abren de a una,
en loop perfecto e indefinido. Elegir una capacidad **no cambia el archivo** —
cortar el video para intercambiar clips rompería el loop, que es la regla
principal de la pieza. Lo que cambia es el encuadre del plano.

### Qué espera el sitio del archivo

Esto viene del brief (`contexto_proyecto.json` en Drive) y el layout ya está
construido para recibirlo así:

- **Cuadrado (1:1).** El contenedor es cuadrado y usa `object-fit: contain`,
  para que ningún pétalo quede cortado nunca.
- **Fondo negro puro, limpio, estático.** Se compone con `mix-blend-mode:
  screen`: el negro del video se funde con el de la página y la flor queda
  flotando, no dentro de un rectángulo.
- **Flor chica dentro del cuadro**, ~20–30% de la altura, con mucho negro
  alrededor.
- **Sin audio** (va en `muted`, es lo que permite el autoplay).
- **Loop perfecto**: primer y último fotograma visualmente equivalentes.

---

## Lo que el brief prohíbe, y que por eso no está acá

`contexto_proyecto.json` es explícito sobre lo que no puede aparecer alrededor
de la flor. Vale dejarlo escrito para que no se reintroduzca sin querer:

| Prohibido | Consecuencia en el código |
|---|---|
| Partículas, humo, estrellas | No hay campo de partículas |
| Halos luminosos, gradientes visibles | No hay capa de resplandor detrás de la flor |
| Efectos atmosféricos, brillo artificial | No hay capa especular |
| Film grain, ruido analógico, fondo con textura | No hay grano sobre la página |
| Recortar la flor | `object-fit: contain`, nunca `cover` |

### La tensión con el 3D

El brief pide **cámara prácticamente estática** y prohíbe rotación y orbitación.
Eso gobierna cómo se genera el video: la flor puede tener imperfecciones, la
cámara no.

El movimiento 3D de este sitio es otra capa: gira **el plano que contiene el
video** dentro de la página, no la cámara que filmó la flor. Aun así los valores
se mantienen cortos a propósito (|ry| ≤ 8°, deriva lenta, ±3° de puntero) para
que se lea como un objeto suspendido y no como una tarjeta girando — que es el
registro contemplativo que pide el proyecto. Si se quiere más presencia, se
suben los números en `ESCENAS` y `CAPACIDADES.pose` de `src/data/site.js`.

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
│  └─ Nav.jsx
├─ sections/          Hero, Manifiesto, Capacidades, Proceso, Estudio, Contacto
└─ data/site.js       Todo el contenido y los datos pendientes
```

### El efecto 3D

No es una imagen a la que se le aplican transformaciones planas. La perspectiva
vive en el contenedor (`perspective: 1100px`) y las capas están separadas en el
eje Z de verdad:

El contenedor tiene `perspective: 1400px` y la escena `transform-style:
preserve-3d`. La flor en vector suma tres anillos de pétalos, cada uno a su
propia profundidad en Z, así que al rotar el conjunto el paralaje entre anillos
sale de la proyección en perspectiva y no de animarlos por separado.

No hay capas decorativas de profundidad detrás de la flor: el brief las prohíbe
(ver la tabla de arriba). El volumen sale del plano proyectado, no de adornos.

Tres entradas se suman sobre el mismo eje:

| Entrada | Qué aporta |
|---|---|
| **Scroll** | Deriva continua a lo largo de la página. |
| **Opción** | Salto discreto de encuadre al elegir una capacidad. Llega por resorte. |
| **Puntero** | Micro-paralaje de ±3°, solo con mouse. |

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
- [ ] El video de la flor (`public/media/voluta/flor-loop.mp4`)
- [ ] Textos definitivos de las secciones — los actuales son de trabajo
- [ ] Favicon y imagen de Open Graph
