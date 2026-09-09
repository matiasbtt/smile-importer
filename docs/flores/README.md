# Herbario Alucinado — cómo se hace el video

`public/flores/flores-herbario.mp4` no es material grabado: se dibuja acá, cuadro
por cuadro, sobre los doce fotogramas de `planos/`.

- `motor.js` — el motor. Un shader WebGL que hace todo: cámara viva (empuje,
  retroceso, deriva), deformación de papel, aleteo de bordes, aberración cromática,
  bandas de glitch, grano, motas flotando, y las **doce transiciones**, una por
  corte (doblez, rasgado, datamosh, separación de canales, latente, atravesar la
  flor, barrido al revés, arrugado, brote, costura de espejo, tiras, colapso).
- `render.html` — la página que corre el motor sobre un canvas de 1280×720.
- `render.mjs` — recorre los 1512 cuadros de a uno y los mete por una tubería a
  ffmpeg. No graba en tiempo real: cada cuadro se pide por su tiempo exacto, así
  el bucle cierra perfecto.

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
de 8 MB a 160 MB sin verse mejor.

## Tocar la pieza

En `motor.js`, el array `PLANOS` tiene un objeto por plano: `c` es la cámara
(zoom inicial, zoom final, paneo x, paneo y), `w` cuánto respira el papel, `g`
cuánto se rompe la imagen, y `tr` con qué transición sale. `PLANO` (4,2 s) y
`TRANS` (1 s) fijan la duración total: 12 × 4,2 = 50,4 s.
