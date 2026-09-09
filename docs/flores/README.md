# Herbario Alucinado — cómo se hace el video

`public/flores/flores-herbario.mp4` no es material grabado: se dibuja acá, cuadro
por cuadro, sobre los doce fotogramas de `planos/`.

- `motor.js` — el motor. Un shader WebGL que hace todo: cámara viva (empuje,
  retroceso, deriva), deformación de papel, aberración cromática suave, grano,
  motas flotando, y la **metamorfosis** entre planos: cada flor crece o se
  disuelve dentro de la siguiente, sin cortes de edición. No hay doce efectos
  distintos — hay un solo mecanismo (ver abajo) que se repite con un origen y
  un ruido distintos en cada uno de los doce cortes.
- `render.html` — la página que corre el motor sobre un canvas de 1280×720.
- `render.mjs` — recorre los 1800 cuadros de a uno y los mete por una tubería a
  ffmpeg. No graba en tiempo real: cada cuadro se pide por su tiempo exacto, así
  el bucle cierra perfecto.

## Cómo funciona la metamorfosis

En vez de una disolvencia pareja (todo el cuadro al mismo ritmo) o un efecto de
edición (flash, bloques, cortina), cada punto del cuadro tiene su **propio
umbral de cambio**, calculado a partir de:

1. **La distancia a un origen** — un punto distinto por corte (`hash(uTr)`
   en `motor.js`), casi siempre lejos del centro. Los puntos cercanos al
   origen cambian antes; los lejanos, después.
2. **Ruido orgánico** (dos capas de `fbm`, una de grano fino en ángulo/radio y
   otra de manchas grandes sobre todo el cuadro) que rompe cualquier forma de
   círculo perfecto — así el frente de cambio parece tejido vivo, no una
   máscara geométrica.

A medida que el tiempo del corte avanza (`uP`, de 0 a 1, con una curva suave
que frena al principio y al final), un valor global sube parejo y cada píxel
"se da vuelta" cuando ese valor supera su umbral propio. El resultado: la
flor que llega aparece primero en manchas, después se extiende, y recién
sobre el final cubre el cuadro entero — como si literalmente creciera o se
disolviera dentro de la otra. Justo en el borde de cada mancha, la imagen se
estira un poco (`dA`, `dB` en el shader) para vender el tirón del papel al
transformarse, y hay un leve resplandor del color que llega.

Es a propósito **el mismo mecanismo las doce veces**: lo que cambia corte a
corte es sólo dónde nace el origen y cómo cae el ruido, nunca el tipo de
efecto. Eso es lo que hace que el video se sienta corrido en vez de editado.

## Volver a renderizar

```bash
npm i ffmpeg-static
npx http-server -p 8099 -s .      # el WebGL no toma texturas por file://
node render.mjs                    # saca flores-herbario.mp4 (máster, pesado)
```

Después bajarlo a peso web:

```bash
ffmpeg -i flores-herbario.mp4 -vf "hqdn3d=2.0:1.6:6:6" \
  -c:v libx264 -preset slow -crf 27 -tune film -pix_fmt yuv420p \
  -movflags +faststart web.mp4
```

El denoise suave es lo que hace la diferencia: sin él, el grano lleva el archivo
de unos 8 MB a más de 150 MB sin verse mejor.

## Tocar la pieza

En `motor.js`, el array `PLANOS` tiene un objeto por plano: `c` es la cámara
(zoom inicial, zoom final, paneo x, paneo y), `w` cuánto respira el papel como
deformación, y `g` cuánta aberración de color tiene. `PLANO` (5 s) y `TRANS`
(4,5 s, cuánto de ese plano se pasa transformándose en el siguiente) fijan la
duración total: 12 × 5 = 60 s.

Dentro del shader, `refRad` (0.5) controla qué tan rápido crece el radio de
cambio respecto al origen — bajarlo hace que la metamorfosis tarde más en
alcanzar los bordes del cuadro; los pesos `0.42` y `0.62` en la fórmula de
`umbral` reparten cuánto manda la distancia al origen contra cuánto manda el
ruido (más ruido = manchas más irregulares, menos "frente" geométrico).
