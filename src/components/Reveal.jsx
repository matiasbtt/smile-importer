import { motion } from 'motion/react';
import { reveal, revealDisplay, viewportOnce } from '../lib/motion.js';

/* Entrada en viewport. `once` es deliberado: repetir la animación
   al volver a subir convierte el scroll en un show y cansa. */
export default function Reveal({ children, i = 0, as = 'div', display = false, ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      variants={display ? revealDisplay : reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </M>
  );
}
