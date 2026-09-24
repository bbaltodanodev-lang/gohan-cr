import { mkdir, copyFile } from 'node:fs/promises';

const target = new URL('../js/vendor/', import.meta.url);
await mkdir(target, { recursive: true });
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js']) {
  await copyFile(new URL('../node_modules/gsap/dist/' + file, import.meta.url), new URL(file, target));
}
console.log('GSAP y ScrollTrigger copiados a js/vendor para servirlos localmente.');
