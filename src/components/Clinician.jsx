/* Retrato clínico vectorial: primer plano de odontóloga trabajando —
   barbijo, gafas de protección, lupas de magnificación con luz frontal.
   Las lupas van abatidas sobre el arco superior de la gafa: si se dibujan
   frente a la pupila (posición de trabajo real) tapan los ojos y se pierde
   la mirada, que es lo que sostiene el retrato.

   Es el marcador de posición estructural. Cuando llegue la fotografía real
   se guarda en /public/media/clinician.jpg y este SVG queda como fallback
   automático (ver Portrait en App.jsx). */

export default function Clinician() {
  return (
    <svg viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#141a18" />
          <stop offset="100%" stopColor="#0c221b" />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#f3d6bd" />
          <stop offset="55%" stopColor="#e5bd9d" />
          <stop offset="100%" stopColor="#b98d6f" />
        </linearGradient>
        <linearGradient id="neck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c99b7c" />
          <stop offset="70%" stopColor="#b0836a" />
          <stop offset="100%" stopColor="#8f6653" />
        </linearGradient>
        <linearGradient id="hairBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a3123" />
          <stop offset="60%" stopColor="#332117" />
          <stop offset="100%" stopColor="#231710" />
        </linearGradient>
        <linearGradient id="hairFront" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#7d5638" />
          <stop offset="45%" stopColor="#5a3c28" />
          <stop offset="100%" stopColor="#38251a" />
        </linearGradient>
        <linearGradient id="mask" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="62%" stopColor="#e9ebea" />
          <stop offset="100%" stopColor="#b9bebb" />
        </linearGradient>
        <linearGradient id="scrub" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2c6b58" />
          <stop offset="62%" stopColor="#1d4c3e" />
          <stop offset="100%" stopColor="#102a22" />
        </linearGradient>
        <linearGradient id="barrel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#48524e" />
          <stop offset="34%" stopColor="#1d2322" />
          <stop offset="100%" stopColor="#0b0e0d" />
        </linearGradient>
        <radialGradient id="iris" cx="0.4" cy="0.34" r="0.75">
          <stop offset="0%" stopColor="#a9cfa8" />
          <stop offset="45%" stopColor="#63976f" />
          <stop offset="82%" stopColor="#3a6149" />
          <stop offset="100%" stopColor="#223a2c" />
        </radialGradient>
        <radialGradient id="led" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f2fff9" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#c8ead9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c8ead9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rimLight" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d6e9de" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#d6e9de" stopOpacity="0" />
        </radialGradient>
        <filter id="b18" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="b7" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="b3" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        {/* Grano fino: quita el acabado de vector plano */}
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="800" height="1000" fill="url(#cbg)" />
      <ellipse cx="176" cy="200" rx="290" ry="290" fill="url(#rimLight)" />

      {/* Cabello, masa posterior */}
      <path
        d="M400 88 Q604 92 630 306 Q648 470 616 640 Q596 520 574 470 Q560 250 400 250 Q240 250 226 470 Q204 520 184 640 Q152 470 170 306 Q196 92 400 88 Z"
        fill="url(#hairBack)"
      />

      {/* Ambo quirúrgico */}
      <path d="M96 1000 Q132 800 268 742 L340 716 L460 716 L532 742 Q668 800 704 1000 Z" fill="url(#scrub)" />
      {/* Escote en V */}
      <path d="M340 716 L400 826 L460 716 L432 708 L400 762 L368 708 Z" fill="#0c211b" />
      {/* Costuras de hombro */}
      <path d="M250 782 Q330 748 400 746" stroke="#3a7d68" strokeOpacity="0.35" strokeWidth="3" fill="none" />
      <path d="M550 782 Q470 748 400 746" stroke="#3a7d68" strokeOpacity="0.25" strokeWidth="3" fill="none" />

      {/* Cuello */}
      <path d="M338 596 L462 596 L478 726 Q400 756 322 726 Z" fill="url(#neck)" />
      <path d="M338 596 L462 596 L458 634 Q400 656 342 634 Z" fill="#8f6653" opacity="0.5" filter="url(#b7)" />

      {/* Rostro */}
      <path
        d="M400 166 Q562 166 568 352 Q568 452 528 528 Q476 610 400 610 Q324 610 272 528 Q232 452 232 352 Q238 166 400 166 Z"
        fill="url(#skin)"
      />
      {/* Modelado: pómulos y sien */}
      <ellipse cx="286" cy="404" rx="52" ry="40" fill="#c68f6e" opacity="0.3" filter="url(#b18)" />
      <ellipse cx="514" cy="404" rx="52" ry="40" fill="#a97a5e" opacity="0.35" filter="url(#b18)" />
      <ellipse cx="352" cy="286" rx="70" ry="44" fill="#ffe6d0" opacity="0.35" filter="url(#b18)" />

      {/* Cejas */}
      <path d="M286 330 Q330 308 374 328" stroke="#4b3222" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M426 328 Q470 308 514 330" stroke="#4b3222" strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* Ojos */}
      {[336, 464].map((cx, i) => (
        <g key={cx}>
          <path
            d={`M${cx - 42} 388 Q${cx} 350 ${cx + 42} 388 Q${cx} 428 ${cx - 42} 388 Z`}
            fill="#f7f1ea"
          />
          <ellipse cx={cx} cy={388} rx="20" ry="20" fill="url(#iris)" />
          <circle cx={cx} cy={388} r="8.5" fill="#141b18" />
          <circle cx={cx - 7} cy={380} r="5" fill="#ffffff" opacity="0.95" />
          <circle cx={cx + 8} cy={396} r="2.6" fill="#ffffff" opacity="0.45" />
          {/* párpado y pestañas */}
          <path
            d={`M${cx - 44} 388 Q${cx} 348 ${cx + 44} 388`}
            stroke="#3d2a1e"
            strokeWidth="6.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${cx - 40} 392 Q${cx} 424 ${cx + 40} 392`}
            stroke="#6b4c38"
            strokeOpacity="0.7"
            strokeWidth="3"
            fill="none"
          />
          {/* sombra orbital */}
          <path
            d={`M${cx - 46} 380 Q${cx} 342 ${cx + 46} 380`}
            stroke="#b98d6f"
            strokeOpacity="0.45"
            strokeWidth="10"
            fill="none"
            filter="url(#b7)"
          />
          {i === 0 && null}
        </g>
      ))}

      {/* Nariz: solo por sombra */}
      <path d="M400 402 Q392 452 380 470 Q398 480 420 470" stroke="#b0836a" strokeOpacity="0.45" strokeWidth="7" fill="none" filter="url(#b3)" />

      {/* Barbijo */}
      <path
        d="M258 452 Q400 420 542 452 Q552 556 470 622 Q400 662 330 622 Q248 556 258 452 Z"
        fill="url(#mask)"
      />
      {/* Clip nasal */}
      <path d="M282 462 Q400 434 518 462" stroke="#9ba09d" strokeWidth="7" fill="none" opacity="0.9" />
      {/* Pliegues */}
      <path d="M266 500 Q400 470 534 500" stroke="#a9aeab" strokeWidth="3" fill="none" opacity="0.75" />
      <path d="M272 540 Q400 510 528 540" stroke="#a9aeab" strokeWidth="3" fill="none" opacity="0.65" />
      <path d="M282 580 Q400 552 518 580" stroke="#a9aeab" strokeWidth="3" fill="none" opacity="0.5" />
      {/* Sombra bajo el barbijo */}
      <path d="M258 452 Q400 420 542 452 L540 470 Q400 440 260 470 Z" fill="#8e9491" opacity="0.35" filter="url(#b3)" />
      {/* Tiras */}
      <path d="M258 462 Q206 448 186 412" stroke="#e4e7e5" strokeWidth="6" fill="none" />
      <path d="M542 462 Q594 448 614 412" stroke="#d3d7d5" strokeWidth="6" fill="none" />

      {/* Gafas de protección */}
      <path d="M228 322 Q400 298 572 322 L576 386 Q400 412 224 386 Z" fill="#dff0e8" opacity="0.1" />
      <path
        d="M228 322 Q400 298 572 322 L576 386 Q400 412 224 386 Z"
        fill="none"
        stroke="#98a29e"
        strokeWidth="5"
      />
      <path d="M226 336 Q190 350 180 404" stroke="#98a29e" strokeWidth="6" fill="none" />
      <path d="M574 336 Q610 350 620 404" stroke="#98a29e" strokeWidth="6" fill="none" />
      {/* Reflejo en el lente */}
      <path d="M262 330 L318 330 L286 402 L246 402 Z" fill="#ffffff" opacity="0.12" />

      {/* Lupas abatidas sobre el arco superior */}
      {[334, 466].map((cx) => (
        <g key={`loupe-${cx}`} transform={`rotate(${cx < 400 ? -14 : 14} ${cx} 300)`}>
          <rect x={cx - 30} y={268} width="60" height="20" rx="7" fill="#242b29" />
          <path
            d={`M${cx - 27} 224 L${cx + 27} 224 L${cx + 22} 274 Q${cx} 288 ${cx - 22} 274 Z`}
            fill="url(#barrel)"
          />
          <ellipse cx={cx} cy={224} rx="27" ry="10" fill="#0c100f" />
          <ellipse cx={cx} cy={223} rx="19" ry="6.5" fill="#63976f" opacity="0.5" />
          <ellipse cx={cx - 7} cy={221} rx="6" ry="2.6" fill="#e6f4ec" opacity="0.55" />
          <path d={`M${cx - 26} 244 L${cx + 26} 244`} stroke="#525b58" strokeWidth="3" opacity="0.85" />
        </g>
      ))}

      {/* Luz frontal LED y haz de trabajo */}
      <rect x="380" y="286" width="40" height="22" rx="7" fill="#1a201f" />
      <circle cx="400" cy="297" r="7" fill="#f2fff9" />
      <circle cx="400" cy="297" r="58" fill="url(#led)" />
      <path d="M400 306 L250 1000 L550 1000 Z" fill="#dff0e8" opacity="0.05" filter="url(#b18)" />

      {/* Cabello, mechones frontales con raya lateral */}
      <path d="M400 166 Q292 172 250 286 Q248 214 306 186 Q356 162 400 166 Z" fill="url(#hairFront)" />
      <path d="M400 166 Q510 172 552 286 Q548 210 486 184 Q440 162 400 166 Z" fill="#432c1e" />
      <path d="M344 172 Q292 208 268 274" stroke="#8a5f3d" strokeOpacity="0.5" strokeWidth="5" fill="none" />
      <path d="M448 172 Q504 206 532 268" stroke="#6b4830" strokeOpacity="0.45" strokeWidth="5" fill="none" />

      {/* Luz de contra sobre el cabello */}
      <path d="M170 306 Q196 92 400 88" stroke="#cfe4d9" strokeOpacity="0.3" strokeWidth="12" fill="none" filter="url(#b7)" />

      {/* Base oscura para integrar con la sección */}
      <rect y="830" width="800" height="170" fill="#0a0a0a" opacity="0.4" filter="url(#b18)" />

      {/* Grano */}
      <rect width="800" height="1000" filter="url(#grain)" opacity="0.055" style={{ mixBlendMode: 'overlay' }} />
    </svg>
  );
}
