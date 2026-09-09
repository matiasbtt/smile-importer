import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* Build de archivo único, para publicar el sitio como una sola
   página autocontenida. inlineDynamicImports mete lenis dentro del
   bundle: sin eso el import dinámico apunta a /assets/lenis-*.js,
   que en ese contexto no existe. */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-single',
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
