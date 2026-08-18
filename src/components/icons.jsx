// Logos with dark backgrounds for visibility on light backgrounds (GitHub, etc)
// SVG versions are preferred for scalability; PNG versions available as fallback
export function WhatsAppMark({ size = 17, white = false }) {
  return (
    <img
      src={white ? '/logo/whatsapp-white.png' : '/logo/whatsapp-dark.svg'}
      alt="WhatsApp"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

export function GmailMark({ size = 17 }) {
  return (
    <img
      src="/logo/gmail-dark.svg"
      alt="Gmail"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

export function Arrow({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* Marcador de foto pendiente dentro de la tarjeta de producto */
export function FrameMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#4b5a54" strokeWidth="1.2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 15.5 8.5 10l4.5 4.5L16 12l5 5" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </svg>
  );
}
