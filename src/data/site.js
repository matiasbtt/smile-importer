/* ────────────────────────────────────────────────────────────────
   ÚNICO ARCHIVO QUE NECESITÁS EDITAR PARA CAMBIAR EL CATÁLOGO
   Los 13 productos salen del Excel de referencias (COD / DESCRIPCIÓN /
   PRECIO/U) y las fotos de la carpeta de Drive «Fotografías de producto».

   NUNCA publicar acá: el precio de mercado de referencia, los links de
   compra del proveedor, ni el cálculo de costos del Excel.
   ──────────────────────────────────────────────────────────────── */

export const CONTACTO = {
  // Números en formato internacional, solo dígitos (sin +, sin espacios, sin guiones).
  whatsapp: '59157703748', // línea comercial — todos los botones del sitio
  whatsappAlterno: '59171777847', // línea personal — solo en el footer
  nombreComercial: 'SMILE IMPORTER',
  email: 'matias.bellott@gmail.com',
  // Mensaje que aparece pre-escrito cuando el cliente abre el chat.
  mensajeBase: 'Hola, escribo desde el catálogo web de SMILE IMPORTER.',
};

/* Formatea el número para mostrarlo en pantalla: 59157703748 → +591 57703748 */
export function mostrarNumero(n) {
  return `+${n.slice(0, 3)} ${n.slice(3)}`;
}

/* Arma el link de WhatsApp. Si se pasa un producto, incluye nombre y referencia
   para que el pedido llegue identificado y no haya que preguntar qué quiere. */
export function linkWhatsApp(producto, numero = CONTACTO.whatsapp) {
  const texto = producto
    ? `${CONTACTO.mensajeBase} Consulta por: ${producto.nombre} (REF ${producto.ref}).`
    : CONTACTO.mensajeBase;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

/* ────────────────────────────────────────────────────────────────
   CATÁLOGO
   `imagen`: ruta dentro de /public. Las fotos ya vienen normalizadas al
   fondo de marca #F5F5F7 y recortadas 4:5, según el manual de fotografía.
   Dejar en null si todavía no hay foto: la tarjeta muestra el marco de
   «fotografía pendiente» sola.
   `precio`: número en bolivianos, por unidad. null = a consultar.
   `caja`: solo si la referencia tiene precio por caja cerrada.
   ──────────────────────────────────────────────────────────────── */

export const MONEDA = 'Bs';

export const CATEGORIAS = [
  'Rotatorios',
  'Diagnóstico',
  'Operatoria',
  'Cirugía',
  'Prótesis',
];

export const PRODUCTOS = [
  {
    ref: 'E-01',
    nombre: 'Motor de endodoncia inalámbrico Y-SMART',
    categoria: 'Rotatorios',
    precio: 1500,
    stock: true,
    imagen: 'productos/e-01.webp',
    detalle:
      'Mango recto con contraángulo reductor, pantalla de torque y velocidad, base de carga y estuche. Incluye cargador, cable y llaves.',
  },
  {
    ref: 'E-02',
    nombre:
      'Unidad de cirugía e implantología con bomba de irrigación y contraángulo 1:5',
    categoria: 'Rotatorios',
    precio: 6000,
    stock: true,
    imagen: 'productos/e-02.webp',
    detalle:
      'Consola con bomba peristáltica, depósito graduado de 1000 ml, contraángulo multiplicador 1:5, pedal y manguera de irrigación.',
  },
  {
    ref: 'E-03',
    nombre: 'Colorímetro dental · escala clásica 16 tonos',
    categoria: 'Diagnóstico',
    precio: 250,
    stock: true,
    imagen: 'productos/e-03.webp',
    detalle:
      'Guía de color con 16 muestras A1–D4 sobre riel extraíble, con estuche e instructivo. Muestras autoclavables.',
  },
  {
    ref: 'E-04',
    nombre: 'Espejos intraorales de rodio',
    categoria: 'Diagnóstico',
    precio: 35,
    caja: { precio: 300, unidades: 10 },
    stock: true,
    imagen: 'productos/e-04.webp',
    detalle:
      'Superficie rodiada de reflexión sin distorsión, mango texturado antideslizante. Seis colores para codificar el instrumental por gabinete.',
  },
  {
    ref: 'E-05',
    nombre: 'Calentador de resina compuesta',
    categoria: 'Operatoria',
    precio: 1500,
    stock: true,
    imagen: 'productos/e-05.webp',
    detalle:
      'Base calefactora inclinable con ocho alojamientos para compules y jeringas, espejo frontal y soporte con recorte anatómico.',
  },
  {
    ref: 'E-06',
    nombre: 'Turbina de alta velocidad angulada',
    categoria: 'Rotatorios',
    precio: 650,
    stock: true,
    imagen: 'productos/e-06.webp',
    detalle:
      'Pieza de mano de alta velocidad con cabezal angulado y cuerpo estriado. Incluye llave de cabezal y perno de repuesto.',
  },
  {
    ref: 'E-07',
    nombre: 'Set de espátulas de resina · 6 piezas',
    categoria: 'Operatoria',
    precio: 370,
    stock: true,
    imagen: 'productos/e-07.webp',
    detalle:
      'Seis instrumentos de doble punta con recubrimiento antiadherente de titanio y mango estriado macizo, en blíster individual.',
  },
  {
    ref: 'E-08',
    nombre: 'Set de pinceles de resina',
    categoria: 'Operatoria',
    precio: 70,
    stock: true,
    imagen: null, // ⇦ pendiente: la carpeta E-08 de Drive todavía no tiene foto
    detalle:
      'Pinceles para modelado y estratificación de composite. Ficha técnica a completar cuando llegue la fotografía.',
  },
  {
    ref: 'E-09',
    nombre: 'Set de elevadores atraumáticos · 7 piezas',
    categoria: 'Cirugía',
    precio: 850,
    stock: true,
    imagen: 'productos/e-09.webp',
    detalle:
      'Siete periotomos de hoja fina con recubrimiento de titanio, mango estriado y anillo de color en el extremo para identificar cada curvatura.',
  },
  {
    ref: 'E-10',
    nombre: 'Cámara intraoral WiFi HD',
    categoria: 'Diagnóstico',
    precio: 760,
    stock: true,
    imagen: 'productos/e-10.webp',
    detalle:
      'Cámara inalámbrica con base de carga y transmisión WiFi a pantalla o móvil. Incluye estuche y manual. Modelo i401.',
  },
  {
    ref: 'E-11',
    nombre: 'Lupas de magnificación 3.5x',
    categoria: 'Diagnóstico',
    precio: 1450,
    stock: true,
    imagen: 'productos/e-11.webp',
    detalle:
      'Lupas binoculares 3.5x con distancia de trabajo de 500 mm, montadas sobre gafa de protección con puente y patillas ajustables.',
  },
  {
    ref: 'E-12',
    nombre: 'Elevadores de seno · 4 piezas',
    categoria: 'Cirugía',
    precio: 750,
    stock: true,
    imagen: 'productos/e-12.webp',
    detalle:
      'Cuatro instrumentos de doble punta con recubrimiento de nitruro de titanio y cuatro curvaturas, para elevación atraumática de membrana sinusal.',
  },
  {
    ref: 'E-13',
    nombre: 'Cubetas de impresión perforadas',
    categoria: 'Prótesis',
    precio: 90,
    stock: true,
    imagen: 'productos/e-13.webp',
    detalle:
      'Juego de cubetas superior e inferior perforadas, con mango y tope. Disponibles en tres colores.',
  },
];
