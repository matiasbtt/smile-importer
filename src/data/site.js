/* ═══════════════════════════════════════════════════════════
   Contenido del sitio.
   Todo lo que dice PENDIENTE es estructura esperando el dato
   real (redes, teléfono, mail, nombres del equipo, cifras).
   Los textos de sección son de trabajo: sirven para ver la
   composición tipográfica en su medida real, no son la copy
   final.
   ═══════════════════════════════════════════════════════════ */

export const ESTUDIO = {
  nombre: 'Voluta Studios',
  claim: 'Estudio de diseño y dirección creativa.',
};

/* ── Material audiovisual ────────────────────────────────────
   Los archivos van en public/media/voluta/ con estos nombres.
   Mientras no existan, el stage dibuja la flor en vector y el
   sitio se ve completo igual — no hay que tocar nada acá para
   que funcione, y no hay que tocar nada para que aparezca el
   video: alcanza con dejar el archivo en su lugar.

   scrub: true solo si el archivo está codificado con keyframes
   densos. Ver README, sección "Material".
   ─────────────────────────────────────────────────────────── */
export const VIDEOS = [
  { src: '/media/voluta/flor-01.mp4', poster: '/media/voluta/flor-01.jpg', scrub: false },
  { src: '/media/voluta/flor-02.mp4', poster: '/media/voluta/flor-02.jpg', scrub: false },
  { src: '/media/voluta/flor-03.mp4', poster: '/media/voluta/flor-03.jpg', scrub: false },
  { src: '/media/voluta/flor-04.mp4', poster: '/media/voluta/flor-04.jpg', scrub: false },
];

/* ── Escenas del stage ──────────────────────────────────────
   Cada panel y cada capacidad tiene su propio encuadre de la
   misma flor: giro, inclinación, distancia y el archivo que se
   muestra. No son estados de una animación — son posiciones de
   cámara, y por eso se llega a ellas por resorte y no por
   interpolación lineal.

   |ry| se mantiene por debajo de 30°: de ahí para arriba un
   plano con perspectiva 1100px se deforma y deja de leerse
   como volumen.
   ─────────────────────────────────────────────────────────── */
export const ESCENAS = {
  inicio:     { pose: { ry: -14, rx: 6, z: 0, scale: 1 }, video: 0 },
  manifiesto: { pose: { ry: 16, rx: -5, z: 60, scale: 1.05 }, video: 0 },
};

/* ── Capacidades: la lista que mueve la flor ────────────────*/
export const CAPACIDADES = [
  {
    id: 'direccion',
    nombre: 'Dirección de arte',
    texto:
      'Definimos el criterio visual antes que la pieza. Qué entra, qué no, y por qué — de ahí sale todo lo demás.',
    pose: { ry: -22, rx: 9, z: -60, scale: 0.94 },
    video: 0,
  },
  {
    id: 'identidad',
    nombre: 'Identidad',
    texto:
      'Sistemas de marca que aguantan el uso diario: no un logo, sino las reglas que hacen que todo lo que salga se reconozca.',
    pose: { ry: 20, rx: -6, z: 70, scale: 1.07 },
    video: 1,
  },
  {
    id: 'motion',
    nombre: 'Motion y 3D',
    texto:
      'Movimiento con intención. Cada transición explica algo del objeto — de dónde viene, hacia dónde va, qué tan pesado es.',
    pose: { ry: -8, rx: -11, z: 30, scale: 1.02 },
    video: 2,
  },
  {
    id: 'digital',
    nombre: 'Sitios y producto',
    texto:
      'Diseño e implementación en el mismo lugar. Lo que se dibuja se puede construir, porque lo construye quien lo dibujó.',
    pose: { ry: 25, rx: 4, z: -30, scale: 0.97 },
    video: 3,
  },
  {
    id: 'film',
    nombre: 'Film',
    texto:
      'Dirección y post. Piezas cortas pensadas para vivir en pantalla chica sin perder el encuadre.',
    pose: { ry: -18, rx: -3, z: 85, scale: 1.1 },
    video: 0,
  },
];

export const PROCESO = [
  { n: '01', t: 'Lectura', d: 'Entender el problema antes de proponer una forma. Nadie diseña sobre un brief que no cierra.' },
  { n: '02', t: 'Criterio', d: 'Un principio rector, escrito. Si no se puede defender en una frase, todavía no está.' },
  { n: '03', t: 'Construcción', d: 'Piezas reales, en su medio real, lo antes posible. El PDF miente; la pantalla no.' },
  { n: '04', t: 'Entrega', d: 'Sistema, archivos y las reglas para seguir usándolo sin nosotros.' },
];

/* ── Equipo ─────────────────────────────────────────────────*/
export const EQUIPO = [
  { rol: 'PENDIENTE', nombre: 'PENDIENTE', foto: null },
  { rol: 'PENDIENTE', nombre: 'PENDIENTE', foto: null },
  { rol: 'PENDIENTE', nombre: 'PENDIENTE', foto: null },
];

/* ── Datos de contacto ──────────────────────────────────────
   Vacío a propósito. El componente marca visualmente cada campo
   sin cargar, así que no hay forma de publicar sin darse cuenta.
   ─────────────────────────────────────────────────────────── */
export const CONTACTO = {
  mail: null,
  telefono: null,
  ciudad: null,
};

export const REDES = [
  { nombre: 'Instagram', url: null },
  { nombre: 'Behance', url: null },
  { nombre: 'LinkedIn', url: null },
  { nombre: 'Vimeo', url: null },
];

export const NAV = [
  { id: 'manifiesto', label: 'Manifiesto' },
  { id: 'capacidades', label: 'Capacidades' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'estudio', label: 'Estudio' },
];
