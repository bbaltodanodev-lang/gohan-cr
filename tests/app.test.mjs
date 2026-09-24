import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM, VirtualConsole } from 'jsdom';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const app = await readFile(new URL('js/app.js', root), 'utf8');
const motion = await readFile(new URL('js/animations.js', root), 'utf8');

function setup(t, { mobile = false, reduced = false, saved = null, blockedStorage = false } = {}) {
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', error => errors.push(error));
  const dom = new JSDOM(html, { url: 'http://localhost:4060', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: console });
  const { window } = dom;
  window.matchMedia = query => ({
    matches: query.includes('max-width') ? mobile : query.includes('no-preference') ? !reduced : query.includes('reduce') ? reduced : !mobile,
    media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}
  });
  window.IntersectionObserver = class { observe() {} disconnect() {} };
  const scrolls = [];
  window.HTMLElement.prototype.scrollIntoView = function(options) { scrolls.push({ id: this.id, ...options }); };
  window.scrollTo = () => {};
  if (saved) window.localStorage.setItem('gohan-lang', saved);
  if (blockedStorage) Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  t.after(() => { window.close(); assert.deepEqual(errors, [], 'No runtime errors'); });
  const $ = selector => window.document.querySelector(selector);
  const click = selector => { assert.ok($(selector), selector); $(selector).click(); };
  return { window, $, click, scrolls, start: () => { window.eval(motion); window.eval(app); } };
}

test('el menú funciona sin GSAP y con almacenamiento bloqueado', t => {
  const ui = setup(t, { blockedStorage: true }); ui.start();
  assert.equal(ui.window.document.querySelectorAll('.card--cat').length, 3);
  ui.click('[data-section="onigiris"] .add');
  assert.equal(ui.$('.subhead h3').textContent, 'Onigiris');
  assert.equal(ui.window.document.querySelectorAll('article.card').length, 4);
  ui.click('[data-lang="en"]');
  assert.equal(ui.window.document.documentElement.lang, 'en');
  assert.ok(!ui.$('#viewProducts').textContent.includes('undefined'));
});

test('conserva producto, cantidad y categoría al cambiar ES/EN', t => {
  const ui = setup(t); ui.start();
  ui.click('[data-section="onigiris"] .add');
  ui.click('[data-id="butakaku"] .add');
  ui.click('#qyPlus'); ui.click('[data-lang="en"]');
  assert.equal(ui.$('#qtyOut').textContent, '2');
  assert.equal(ui.$('#addBtn').textContent, 'Add to order');
  assert.ok(ui.$('#viewProducts').classList.contains('hidden'));
  ui.click('#backToGrid');
  assert.ok(!ui.$('#viewProducts').classList.contains('hidden'));
  assert.equal(ui.$('.subhead h3').textContent, 'Onigiris');
  assert.match(ui.$('#viewProducts').textContent, /Hand-made, to order/);
  ui.click('#backToSections');
  assert.equal(ui.window.document.querySelectorAll('.card--cat').length, 3);
});

test('calcula cantidades, extras y total; impide enviar un pedido vacío', t => {
  const ui = setup(t); ui.start();
  ui.click('[data-section="onigiris"] .add'); ui.click('[data-id="butakaku"] .add');
  ui.click('#qyMinus'); assert.equal(ui.$('#qtyOut').textContent, '1');
  ui.click('#qyPlus'); ui.click('#addBtn');
  ui.click('.extra[data-id="kimchi"]');
  assert.equal(ui.$('.extra[data-id="kimchi"]').getAttribute('aria-pressed'), 'true');
  ui.click('#extrasNext');
  assert.equal(ui.$('#totalAmount').textContent.replace(/\s/g, ''), '₡8437');
  assert.equal(ui.$('#summarySend').disabled, false);
  ui.click('.s-item__rm'); ui.click('.s-item__rm');
  assert.equal(ui.$('#summarySend').disabled, true);
  assert.equal(ui.window.document.activeElement.id, 'addMore');
});

test('menú móvil: Escape, fondo, ancla y foco restaurado', t => {
  const ui = setup(t, { mobile: true }); ui.start();
  assert.equal(ui.$('#navLinks').inert, true);
  ui.click('#burger'); assert.equal(ui.$('#burger').getAttribute('aria-expanded'), 'true');
  assert.equal(ui.$('#main').inert, true);
  ui.window.document.dispatchEvent(new ui.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.equal(ui.$('#burger').getAttribute('aria-expanded'), 'false');
  assert.equal(ui.window.document.activeElement.id, 'burger');
  assert.equal(ui.$('#main').inert, false);
  ui.click('#burger'); ui.click('#navBackdrop');
  assert.equal(ui.$('#navBackdrop').hidden, true);
  ui.click('#burger'); ui.click('#navLinks a[href="#historia"]');
  assert.equal(ui.$('#burger').getAttribute('aria-expanded'), 'false');
  assert.equal(ui.scrolls.at(-1).id, 'historia');
});

test('movimiento reducido usa desplazamiento inmediato, sin animar la portada', async t => {
  const ui = setup(t, { reduced: true });
  for (const path of ['js/vendor/gsap.min.js', 'js/vendor/ScrollTrigger.min.js']) {
    ui.window.eval(await readFile(new URL(path, root), 'utf8'));
  }
  ui.start();
  assert.equal(ui.window.gsap.getTweensOf(ui.$('.hero__frame')).length, 0);
  assert.equal(ui.$('.hero__title').style.opacity, '');
  ui.click('.hero__cta a');
  assert.equal(ui.scrolls.at(-1).behavior, 'instant');
  ui.window.gsap.ticker.sleep();
});

test('un idioma guardado inválido no rompe el arranque', t => {
  const ui = setup(t, { saved: 'invalid' }); ui.start();
  assert.equal(ui.window.document.documentElement.lang, 'es');
  assert.equal(ui.$('[data-lang="es"]').getAttribute('aria-pressed'), 'true');
});
