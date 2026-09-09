/* ═══════════════════════════════════════════════════════════
   Contenido del sitio.
   Alineado con contexto_proyecto.json (Drive · Voluta Proyect).

   Voluta es un estudio creativo que desarrolla webs y
   experiencias digitales con inteligencia artificial. La idea
   que lo ordena todo: una IA observa la naturaleza, la
   reconstruye en papel y termina imaginando especies nuevas.

   Lo que dice PENDIENTE es estructura esperando el dato real.
   ═══════════════════════════════════════════════════════════ */

export const ESTUDIO = {
  nombre: 'Voluta Studios',
  claim: 'Estudio creativo de webs y experiencias con inteligencia artificial.',
  concepto: 'Nature interpreted, reconstructed and imagined by artificial intelligence.',
};

/* ── El video ────────────────────────────────────────────────
   Una sola pieza continua, en loop indefinido: muchas flores de
   papel que se abren de a una, en escenas independientes, sobre
   negro limpio. No son cuatro clips que se intercambian —
   cambiar de video al elegir una opción cortaría el loop y
   rompería lo único que el brief marca como regla principal.

   Lo que cambia al elegir una opción es el encuadre del plano,
   no el material.

   Archivo: public/media/voluta/flor-loop.mp4
   ─────────────────────────────────────────────────────────── */
export const VIDEO = {
  src: '/media/voluta/flor-loop.mp4',
  poster: '/media/voluta/flor-loop.jpg',
};

/* ── Encuadres ───────────────────────────────────────────────
   Deliberadamente cortos. El brief pide cámara estable, registro
   contemplativo y que la pieza no compita con el contenido; una
   rotación grande la convertiría en una tarjeta girando. Con
   |ry| <= 8° el plano se lee como un objeto suspendido que
   respira, que es lo que se buscaba.
   ─────────────────────────────────────────────────────────── */
export const ESCENAS = {
  inicio:     { ry: -5, rx: 2, z: 0, scale: 1 },
  manifiesto: { ry: 6, rx: -2, z: 26, scale: 1.03 },
};

export const CAPACIDADES = [
  {
    id: 'sitios',
    nombre: 'Sitios y experiencias',
    texto:
      'Webs que no parecen plantillas. Diseño y desarrollo en el mismo lugar, con IA en el proceso y no como argumento de venta.',
    pose: { ry: -8, rx: 3, z: -22, scale: 0.97 },
  },
  {
    id: 'identidad',
    nombre: 'Identidad generativa',
    texto:
      'Sistemas de marca que producen piezas nuevas sin perder la mano. Las reglas se escriben una vez y después generan.',
    pose: { ry: 7, rx: -3, z: 34, scale: 1.04 },
  },
  {
    id: 'direccion',
    nombre: 'Dirección de arte',
    texto:
      'El criterio antes que la pieza. La IA propone mucho; lo que define el resultado es qué se descarta.',
    pose: { ry: -3, rx: -4, z: 14, scale: 1.01 },
  },
  {
    id: 'imagen',
    nombre: 'Imagen y motion',
    texto:
      'Piezas visuales generadas y dirigidas: material propio, coherente entre sí, hecho para vivir dentro de una interfaz.',
    pose: { ry: 8, rx: 2, z: -12, scale: 0.99 },
  },
];

export const PROCESO = [
  { n: '01', t: 'Observar', d: 'Entender el problema antes de proponer una forma. Nadie diseña sobre un brief que no cierra.' },
  { n: '02', t: 'Reconstruir', d: 'Un principio rector, escrito. Si no se puede defender en una frase, todavía no está.' },
  { n: '03', t: 'Imaginar', d: 'La IA abre el campo de lo posible. El oficio decide qué de eso merece existir.' },
  { n: '04', t: 'Entregar', d: 'Sistema, archivos y las reglas para seguir usándolo sin nosotros.' },
];

export const EQUIPO = [
  { rol: 'PENDIENTE', nombre: 'PENDIENTE', foto: null },
  { rol: 'PENDIENTE', nombre: 'PENDIENTE', foto: null },
  { rol: 'PENDIENTE', nombre: 'PENDIENTE', foto: null },
];

/* Vacío a propósito: el componente marca cada campo sin cargar,
   así no hay forma de publicar un dato inventado sin verlo. */
export const CONTACTO = { mail: null, telefono: null, ciudad: null };

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
