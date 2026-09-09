export function Arrow({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Marca: un fragmento angular con la curva de voluta adentro.
   El degradado iris → verdant es el único del sistema: en los
   componentes de UI la paleta es plana. */
export function Mark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="voluta-mark" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8052ff" />
          <stop offset="1" stopColor="#15846e" />
        </linearGradient>
      </defs>
      <path d="M12 2 22 21H2L12 2Z" fill="url(#voluta-mark)" />
      <path
        d="M12 16.4c-1.6 0-2.6-1-2.6-2.3 0-1.2.9-2.1 2.1-2.1 1 0 1.7.6 1.7 1.5 0 .7-.5 1.2-1.1 1.2"
        stroke="#000"
        strokeOpacity="0.55"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
