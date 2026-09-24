import { readFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { parse } from 'css-tree';

const root = new URL('../', import.meta.url);
const errors = [];
parse(await readFile(new URL('css/styles.css', root), 'utf8'), {
  positions: true,
  onParseError: error => errors.push(error.formattedMessage)
});
const dom = new JSDOM(await readFile(new URL('index.html', root), 'utf8'));
const ids = new Set();
for (const element of dom.window.document.querySelectorAll('[id]')) {
  if (ids.has(element.id)) errors.push(`ID duplicado: ${element.id}`);
  ids.add(element.id);
}
for (const element of dom.window.document.querySelectorAll('[src], link[href]')) {
  const source = element.getAttribute('src') || element.getAttribute('href');
  if (/^(https?:|data:|#)/.test(source)) continue;
  try { await access(new URL(source.split('?')[0], root)); }
  catch { errors.push(`Recurso local no encontrado: ${source}`); }
}
for (const element of dom.window.document.querySelectorAll('a[href^="#"]')) {
  if (!ids.has(element.hash.slice(1))) errors.push(`Ancla inexistente: ${element.hash}`);
}
dom.window.close();
if (errors.length) throw new Error(errors.join('\n'));
console.log('CSS, IDs, anclas y recursos estáticos: correctos.');
