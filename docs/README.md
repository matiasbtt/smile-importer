# Documentos del negocio

Material de gestión de Smile Importer, separado del código del sitio.

| Documento | Qué es | Para quién |
|---|---|---|
| [`asociacion/acuerdo-asociacion-accidental.html`](asociacion/acuerdo-asociacion-accidental.html) · [PDF](asociacion/acuerdo-asociacion-accidental.pdf) | Acuerdo de asociación accidental entre los dos socios, con roles, reparto, salida, prohibición de sabotaje y tres anexos | Para imprimir y firmar |
| [`costos/estructura-de-costos.md`](costos/estructura-de-costos.md) | El modelo de costos explicado: comisión actual contra importación propia, punto de equilibrio, activos y precios | Interno, y para mostrar |
| [`costos/calculadora-costos.html`](costos/calculadora-costos.html) | La misma estructura, interactiva: se cambian los números y todo se recalcula | Uso diario |
| [`plan/hoja-de-ruta.md`](plan/hoja-de-ruta.md) | Qué falta para que esto sea una empresa: marca, credibilidad, legal, capital, operación | Interno |

## El acuerdo

Se imprime el PDF, se llenan a mano los espacios en blanco, se firma en dos
ejemplares —uno para cada socio— y conviene hacer reconocimiento de firmas ante
notario. Los anexos A (acta de retiro), B (objetivos del mes) y C (aportes,
activos y accesos) son parte del acuerdo: el C hay que llenarlo el mismo día de
la firma.

Para regenerar el PDF después de editar el HTML:

```bash
chromium --headless --no-pdf-header-footer \
  --print-to-pdf=docs/asociacion/acuerdo-asociacion-accidental.pdf \
  file://$PWD/docs/asociacion/acuerdo-asociacion-accidental.html
```

## La calculadora

Se abre el HTML en cualquier navegador. Guarda lo último que se escribió, así que
no hay que volver a cargar los datos cada vez.

Los valores que trae cargados son **un ejemplo** para mostrar cómo funciona el
modelo. Los tres que hay que reemplazar primero, porque son los que más mueven el
resultado:

1. **Tipo de cambio** al que realmente se consiguen los dólares.
2. **Precio FOB** real, cotizado al proveedor chino.
3. **Honorarios del despachante y flete**, cotizados a una agencia de aduana.
