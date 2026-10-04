import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');

test('la portada presenta una bienvenida directa antes del catálogo', () => {
  assert.match(app, /function Bienvenida\(\)/);
  assert.match(app, /Bienvenido al catálogo de\s*<strong>SMILE IMPORTER<\/strong>/);
  assert.match(app, /Desliza para conocer nuestros productos/);
  assert.match(app, /<Bienvenida\s*\/>[\s\S]*<Catalogo\s*\/>[\s\S]*<Cierre\s*\/>/);
});

test('la sonrisa y la doctora dejan de formar parte de la experiencia', () => {
  assert.doesNotMatch(app, /function Sequence\(\)/);
  assert.doesNotMatch(app, /function ClinicSection\(\)/);
  assert.doesNotMatch(app, /components\/Smile/);
  assert.doesNotMatch(app, /components\/Clinician/);
  assert.doesNotMatch(app, /href="#criterio"/);
});

test('los estilos sustituyen la escena y el retrato por una bienvenida responsiva', () => {
  assert.match(styles, /\.welcome\s*\{/);
  assert.match(styles, /\.welcome-content\s*\{/);
  assert.doesNotMatch(styles, /\.scene\s*\{/);
  assert.doesNotMatch(styles, /\.portrait\s*\{/);
});

test('el contacto flotante se activa solo después de comenzar a desplazarse', () => {
  assert.match(app, /window\.scrollY\s*>\s*64/);
  assert.match(app, /window\.addEventListener\('scroll',\s*onScroll/);
  assert.doesNotMatch(app, /new IntersectionObserver/);
});
