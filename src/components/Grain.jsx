/* Grano de papel.
   Además de la textura, cumple una función concreta: los degradados
   del stage sobre #000 puro producen banding visible en OLED, y el
   ruido lo rompe. Es un SVG inline — no pesa un request más. */
export default function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="voluta-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#voluta-grain)" />
    </svg>
  );
}
