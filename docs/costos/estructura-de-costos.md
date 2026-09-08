# Estructura de costos — Smile Importer

> Documento de trabajo interno. Todos los números marcados como **ejemplo** son
> supuestos para mostrar el método: hay que reemplazarlos por cotizaciones reales
> antes de tomar cualquier decisión o mostrárselos a alguien.
>
> La versión interactiva de este documento es `calculadora-costos.html`.

---

## 0. Para qué sirve esto

Hoy el negocio se maneja con un solo número en la cabeza: «lo compro a 890, lo
vendo a 1400, la mitad de la diferencia es nuestra». Ese número no es la
ganancia: es el **margen bruto antes de todo lo que el negocio realmente
consume**. Pasaje, transporte, empaque, publicidad, garantía, el desgaste del
equipo y las horas invertidas en la web y el catálogo no aparecen por ningún
lado, y sin embargo se pagan.

Una estructura de costos es simplemente esto: **la lista completa de todo lo que
sale, antes de decir cuánto entra**. Es lo que falta para poder pedir capital sin
que la conversación termine en «no tienen las cuentas claras».

---

## 1. Los tres niveles de costo

Un mismo endomotor tiene tres costos distintos, y confundirlos es el error más
caro:

| Nivel | Qué incluye | Para qué se usa |
|---|---|---|
| **1. Costo de adquisición** | Lo que pagás por el aparato, nada más | Negociar con el proveedor |
| **2. Costo aterrizado** *(landed cost)* | Adquisición + flete + seguro + aranceles + IVA + despachante + transporte interno + pasajes + comisión bancaria + merma | Decidir si conviene importar |
| **3. Costo puesto en la mano del cliente** | Aterrizado + entrega + empaque + comisión de cobro + publicidad + garantía + amortización de activos | **Fijar el precio de venta** |

**Regla:** el precio nunca se calcula sobre el nivel 1. Se calcula sobre el nivel 3.

---

## 2. Escenario A — modelo actual (comisión sobre mercadería del proveedor)

### 2.1 Lo que se ve

| Concepto | Bs |
|---|---:|
| Costo declarado por el proveedor | 890 |
| Precio de lista del proveedor | 1400 |
| Utilidad del equipo | 510 |
| Comisión (50%) | **255** |
| Sobreprecio propio (venta a 1450 en vez de 1400) | **50** |
| **Ingreso bruto para nosotros por unidad** | **305** |

### 2.2 Lo que no se ve — costos variables por unidad vendida

Son los que solo aparecen cuando hay una venta:

| Concepto | Cómo se calcula | Ejemplo (Bs) |
|---|---|---:|
| Entrega al cliente | Taxi / trufi / delivery, ida y vuelta | 20 |
| Empaque | Caja, bolsa, etiqueta, burbuja | 8 |
| Comisión de cobro | 0% si es QR o efectivo; 3,5–5% si es tarjeta | 0 |
| Reserva de garantía | Tasa de falla × costo de reposición (3% × 890) | 27 |
| **Total costos variables por unidad** | | **55** |

> La publicidad, el internet, la movilidad y el desgaste de los equipos **no van
> acá**: no dependen de vender una unidad más o una menos. Son costos fijos
> mensuales y se tratan en la sección 6. Meterlos en los dos lados es el error de
> cálculo más común, y hace que los números no cierren nunca.

### 2.3 Resultado real

| | Bs |
|---|---:|
| Ingreso bruto por unidad | 305 |
| (–) Costos variables por unidad | 55 |
| **Margen de contribución por unidad** | **250** |

El **margen de contribución** es lo que cada venta deja para pagar la estructura
del mes (publicidad, internet, movilidad, desgaste de equipos y activos). No es
ganancia todavía: la ganancia aparece recién cuando la suma de todas las
contribuciones del mes supera a los costos fijos.

**De los Bs 305 que parecen ganancia, Bs 55 ya se fueron antes de contar un solo
costo fijo.**

---

## 3. Escenario B — importación propia

### 3.1 La fórmula completa del costo aterrizado

```
FOB total          = precio unitario en origen × unidades del lote
+ Flete internacional
+ Seguro                        (≈ 1–2% del FOB)
─────────────────────────────
= Valor CIF                     ← base de cálculo de los impuestos

+ Gravamen Arancelario (GA)     = CIF × tasa de la partida arancelaria
+ IVA de importación            = (CIF + GA) × 14,94%
+ Honorarios de despachante y gastos de despacho
+ Transporte interno hasta la ciudad
+ Pasajes y viáticos            (si alguien viaja a comprar o retirar)
+ Almacenaje
+ Comisión bancaria y costo de conseguir los dólares
─────────────────────────────
= Costo total del lote (USD)

÷ unidades vendibles            (unidades del lote − merma estimada)
× tipo de cambio EFECTIVO
─────────────────────────────
= COSTO ATERRIZADO POR UNIDAD (Bs)
```

> **A confirmar antes de usar esto en serio:** la partida arancelaria del
> endomotor y su tasa de GA (los dispositivos médicos no todos pagan lo mismo),
> el umbral a partir del cual es obligatorio contratar agencia despachante, y si
> conviene régimen courier o importación formal. Un despachante de aduana da las
> tres respuestas en una consulta y suele no cobrarla.

### 3.2 Ejemplo con un lote de 20 endomotores

*(supuestos, no cotizaciones reales)*

| Concepto | USD |
|---|---:|
| FOB — 20 unidades × USD 60 | 1.200 |
| Flete internacional (aéreo, lote completo) | 300 |
| Seguro (2% del FOB) | 24 |
| **Valor CIF** | **1.524** |
| Gravamen Arancelario (10% del CIF) | 152 |
| IVA de importación (14,94% sobre CIF + GA) | 250 |
| Despachante y gastos de despacho | 160 |
| Transporte interno | 60 |
| Comisión bancaria y cambio (3%) | 36 |
| **Costo total del lote** | **2.183** |

| | |
|---|---:|
| Unidades del lote | 20 |
| Merma y garantía estimada (3%) | 0,6 |
| Unidades vendibles | 19,4 |
| Costo por unidad vendible | USD 112,5 |
| **Costo aterrizado a Bs 6,96/USD** | **Bs 783** |
| **Capital necesario para el lote** | **Bs 15.193** |

### 3.3 El resultado, comparado

| | Escenario A (hoy) | Escenario B (lote de 20) |
|---|---:|---:|
| Precio de venta | 1.450 | 1.450 |
| Costo de la mercadería | — (se cobra comisión) | 783 |
| Ingreso bruto por unidad | 305 | 667 |
| (–) Costos variables | 55 | 52 |
| **Margen de contribución por unidad** | **250** | **615** |

**Importar propio multiplica por 2,5 lo que deja cada venta.**

> **Ojo con una comparación tentadora y equivocada:** «si lo importo a Bs 783 y
> él me lo cobra a Bs 890, gano Bs 107». No. En el modelo actual el costo de
> Bs 890 no lo pagás vos: lo paga él, y a vos te toca una comisión. La
> comparación correcta no es *costo contra costo*, sino **cuánto deja cada venta
> en cada modelo**: Bs 250 contra Bs 615.

---

## 4. La variable que decide todo: el tipo de cambio

El costo en dólares es estable. Lo que no es estable es **a cuánto conseguís los
dólares**. Ese es el número que hace o rompe este negocio, y no el precio de
China.

| Tipo de cambio efectivo | Costo aterrizado (Bs) | Margen de contribución (Bs) |
|---:|---:|---:|
| 6,96 (oficial) | 783 | **615** |
| 8,00 | 900 | 495 |
| 9,50 | 1.069 | 321 |
| **10,11** | 1.138 | **250 ← igual que el modelo actual** |
| 11,00 | 1.238 | 147 |

**Por encima de aproximadamente Bs 10,11 por dólar, importar por cuenta propia
deja de convenir frente a seguir comprándole al proveedor actual** (a este precio
de venta y con un lote de 20). Antes de comprometer capital hay que saber a qué
tipo de cambio real se consiguen los dólares, y ponerlo en la calculadora — no
el oficial.

Ese dato también explica algo importante: el precio de Bs 890 del proveedor
puede no ser tan abusivo como parece. Si él consigue dólares más baratos, trae
volúmenes grandes o comparte flete con otra mercadería, su costo real puede ser
bajo sin que haya nada raro.

---

## 5. El volumen manda

Los costos fijos de una importación (despachante, transporte interno, la parte
fija del flete, el viaje) son casi los mismos para 5 unidades que para 30, y se
reparten entre las unidades del lote. **El tamaño del lote define el costo
unitario:**

| Unidades del lote | Costo aterrizado por unidad (Bs) | Contribución por unidad (Bs) | Capital necesario (Bs) |
|---:|---:|---:|---:|
| 5 | 1.102 | 287 | 5.343 |
| 10 | 889 | 506 | 8.626 |
| 15 | 819 | 579 | 11.909 |
| **20** | **783** | **615** | **15.193** |
| 30 | 748 | 652 | 21.759 |

*(calculado con flete de USD 60 fijos + USD 12 por unidad; con la cotización real
del flete la curva cambia, pero la forma es la misma)*

Un lote de 5 unidades deja Bs 287 por venta contra Bs 250 del modelo actual:
**casi lo mismo, con todo el riesgo y el capital encima**. Recién a partir de
10–15 unidades la diferencia justifica el esfuerzo. **El lote mínimo razonable
está en 15–20 unidades**, y ese, y no otro, es el monto de capital que hay que
pedir.

---

## 6. Costos fijos mensuales y punto de equilibrio

Los costos fijos existen aunque no vendas nada en el mes.

| Concepto | Bs/mes (ejemplo) |
|---|---:|
| Publicidad | 300 |
| Internet y datos | 100 |
| Dominio y hosting (anual ÷ 12) | 30 |
| Movilidad y visitas | 150 |
| Depreciación de activos fijos | 100 |
| Amortización de activos digitales | 500 |
| **Total** | **1.180** |

```
Punto de equilibrio = costos fijos ÷ margen de contribución por unidad
Utilidad del mes    = (contribución × unidades vendidas) − costos fijos
```

| | Escenario A | Escenario B (lote de 20) |
|---|---:|---:|
| Margen de contribución por unidad | 250 | 615 |
| **Punto de equilibrio (unidades/mes)** | **5** | **2** |
| Utilidad del mes vendiendo 6 unidades | 322 | 2.512 |
| Por socio | 161 | 1.256 |

Este es el número más incómodo y el más importante del documento: **con el
modelo actual, vendiendo 6 endomotores al mes, el negocio deja Bs 322 en total —
Bs 161 por socio.** No porque las ventas sean malas, sino porque la comisión es
chica y la estructura, aunque barata, existe: se está trabajando casi al costo,
y la mayor parte de lo que se produce se lo lleva el desgaste de lo que ya
construyeron.

Con mercadería propia, el mismo esfuerzo comercial y las mismas 6 ventas dejan
**Bs 2.512 al mes**. Esa diferencia es todo el argumento del pedido de capital.

Y **recuperación del capital**: con un lote de 20 unidades a Bs 15.193, se
recupera todo lo invertido al vender **11 unidades**; las 9 restantes son
utilidad casi entera.

---

## 7. Activos: cómo se valoran y por qué importan

Este es el punto que trabó la conversación en casa, y tiene una respuesta
técnica.

### 7.1 Activos fijos

Todo bien que dura más de un año y se usa para el negocio: celular, laptop,
impresora, vitrina, herramientas, equipo de fotografía.

```
Depreciación mensual = valor del bien ÷ vida útil en meses
```

Si la laptop vale Bs 6.000 y dura 48 meses, el negocio consume **Bs 125 por mes**
de laptop. Eso es costo, aunque no salga plata del bolsillo ese mes.

### 7.2 Activos digitales

El sitio web, el catálogo, el portafolio, el CRM, la fotografía de producto y la
identidad visual **sí son activos**, y tu papá tiene razón en eso. El argumento
de «lo hice para aprender» no cambia el hecho: son bienes que el negocio usa
todos los días y que, si desaparecieran, habría que pagarlos.

Se valoran a **costo de reposición**: lo que costaría encargar hoy ese mismo
trabajo a un tercero.

| Activo | Rango de mercado referencial (Bs) |
|---|---:|
| Sitio web catálogo con animación y flujo a WhatsApp | 3.500 – 9.000 |
| Sistema interno de registro de clientes (CRM) | 4.000 – 12.000 |
| Identidad visual: logo, paleta, tipografía, manual básico | 1.200 – 4.000 |
| Fotografía de producto, 15 referencias editadas | 900 – 2.500 |
| Catálogo comercial y portafolio | 800 – 2.500 |
| **Total referencial** | **10.400 – 30.000** |

> Estos rangos son referenciales. **Pedí dos cotizaciones reales** a freelancers o
> estudios por el mismo alcance y guardalas: eso convierte el número en un dato
> respaldado, y no en una estimación propia sobre el propio trabajo. Es
> exactamente el tipo de evidencia que cambia una conversación con quien te va a
> prestar plata.

Tomando un valor conservador de **Bs 18.000** amortizado en 36 meses, el negocio
consume **Bs 500 por mes** de activos digitales. Ese número entra en los costos
fijos de la sección 6 — y es la razón por la que el punto de equilibrio actual
es de 5 unidades y no de 3.

### 7.3 Por qué esto conviene declararlo

Contar los activos digitales como aporte tiene tres efectos concretos:

1. **Sube el aporte de capital de quien los hizo** — figura en el Anexo C del
   acuerdo de asociación y respalda el reparto de utilidades.
2. **Hace honesto el precio.** Si no se amortizan, los precios están
   subsidiados por trabajo no pagado y el negocio parece más rentable de lo que es.
3. **Cambia el pedido de capital.** No es «préstennos plata para probar»: es
   «ya hay Bs 18.000 invertidos en activos que funcionan, falta el capital de
   mercadería».

---

## 8. Política de precios

Con la estructura armada, el precio deja de ser una corazonada:

```
Precio mínimo    = costo puesto en la mano del cliente × 1,25   (piso, no se baja de acá)
Precio de lista  = costo puesto en la mano del cliente × 1,80   (precio publicado)
Precio con descuento por volumen  = lista − hasta 10%, nunca por debajo del mínimo
```

Reglas prácticas:

- El precio de lista se revisa **cada vez que cambia el tipo de cambio más de
  un 5%**, o cuando cambia el precio del proveedor.
- Los descuentos los autoriza quien maneja los costos, no quien cierra la venta:
  el vendedor trabaja con un piso conocido y con margen de maniobra hasta ese piso.
- Nunca se compite por precio contra un importador grande. Se compite por
  entrega, garantía escrita y respuesta rápida — que son las tres cosas que a un
  odontólogo le cuestan más caro que Bs 100 de diferencia.

---

## 9. Qué medir todos los meses

Seis números, en una planilla, el último día del mes:

| Indicador | Cómo se calcula | Para qué sirve |
|---|---|---|
| Unidades vendidas | Conteo | Contra el punto de equilibrio |
| Ingreso y utilidad neta | Planilla de ventas | Saber si el mes cerró en verde |
| Leads atendidos | Conteo en WhatsApp | Mide el trabajo comercial real |
| Tasa de cierre | Ventas ÷ leads | Si baja, el problema es el precio o la respuesta |
| Costo de adquisición de cliente | Publicidad ÷ ventas | Cuánto cuesta cada venta |
| Rotación de inventario | Unidades vendidas ÷ stock promedio | Plata dormida en mercadería |

Sin estos seis números, cualquier decisión sobre precios, capital o reparto es
una opinión.
