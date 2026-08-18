import { useState } from 'react';

/* El header va sobre fondo oscuro, así que corresponde la versión blanca del
   logo (regla de uso de marca). Si el archivo todavía no está en
   public/logo/, cae al wordmark tipografiado y el sitio no se rompe.

   Nombres esperados en public/logo/:
     logo-white.png   ← el que usa este header
     logo-color.png   SMILE verde #366956 + IMPORTER negro, para fondos claros
     logo-black.png   negro sólido, para fondos claros
     logo-icon.svg    ícono S solo — favicon / avatar, nunca reemplaza el wordmark

   El logo no se altera: ni tipografía, ni proporciones, ni color. Acá solo se
   escala en altura, manteniendo la relación de aspecto. */
export default function Logo({ height = 34 }) {
  const [file, setFile] = useState(true);

  if (file) {
    return (
      <img
        className="logo"
        src="/logo/smile_logo_white.png"
        alt="SMILE IMPORTER"
        style={{ height }}
        onError={() => setFile(false)}
      />
    );
  }

  return (
    <span className="wordmark">
      SMILE<span>IMPORTER</span>
    </span>
  );
}
