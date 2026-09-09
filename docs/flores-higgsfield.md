# Herbario Alucinado — kit de rodaje (Higgsfield)

Guion de rodaje de la pieza de flores de papel, cuadrado contra
**«Motion Picture Soundtrack»** (Radiohead, *Kid A*, 2000). Los tiempos son
aproximados: ajustalos contra tu copia del tema.

La pieza ya montada está en `/flores/` (`public/flores/flores-herbario.mp4`,
50 s en bucle) y el motor que la dibuja, en `docs/flores/`. Este guion es para
volver a filmarla en alta resolución, plano por plano.

## Ancla de estilo — va al principio de todos los prompts

```
Cut-paper flower diorama, hand-drawn on top: matte cardstock petals with deckled torn
edges, visible fold creases, pencil contour lines slightly off-register from the flat
color fill (2–3 px risograph misregistration), hard offset paper shadows on a deep
ink-blue void. Botanical-plate composition, single flower centered, shallow depth.
Palette: cream paper #EDE6D8, faded sage and ochre, one burnt vermilion #E2513A accent,
ink-blue background #0B1418. Deliberately synthetic: petal counts that do not resolve,
one ghosted duplicate petal, a shadow falling the wrong way, faint latent-noise blocks at
the edges of frame, tiny monospace annotation marks. 35mm grain, no photorealism, no
glossy render, no text logos.
```

## Los ocho planos

| # | Entra en | Dura | Plano | Cámara |
|---|---|---|---|---|
| 01 | 00:00 armonio solo | 22 s · 3 tomas | La semilla en la mesa | Dolly In lenta |
| 02 | 00:22 entra la voz | 22 s · 2 tomas | Brote — margarita | Tilt Up / Crane Up |
| 03 | 00:44 estrofa | 21 s · 2 tomas | Apertura — girasol | Orbit / Arc Left 10–15° |
| 04 | 01:05 segunda estrofa | 20 s · 3 tomas | La duda — rosa que era amapola | Crash Zoom In |
| 05 | 01:25 estrofa baja | 20 s · 2 tomas | Marchitar — tulipán y clavel | Estática |
| 06 | 01:45 arpas y coro | 20 s · 1 toma | El campo entero | Dolly Out largo |
| 07 | 02:05 casi silencio | 30 s · 2 tomas | Latente | Estática |
| 08 | 02:35 coda | 44 s · 3 tomas | Ascenso — el papel sube | Tilt Up + Crane Up |

Los prompts completos de imagen y animación de cada plano están en la página,
listos para copiar de a uno.

## Montaje

- **Formato**: 16:9 para la web y una pasada aparte en 9:16 para redes. No recortes
  el 16:9 — los planos están compuestos al centro y se rompen.
- **Stills primero**: generá las 8 imágenes ancla antes de animar. Fijá la semilla de
  la que más te guste y reusala en las otras siete, así el papel es el mismo papel.
- **Encadenado**: el último cuadro de cada plano entra como imagen inicial del
  siguiente; el corte deja de notarse y parece una sola flor transformándose.
- **Velocidad**: rendereá y después bajá todo a 80–85 % en el editor. El tema respira
  a ~52 pulsaciones por minuto y los modelos animan de más.
- **Transiciones**: corte seco en 01:05 y 02:35; el resto, disolvencias de 1,5 s.
- **Música**: el tema sirve de guía de montaje, pero publicar el video con él requiere
  licencia. Para la web: mudo, o una pieza propia con la misma estructura
  (armonio, arpa, coro).
