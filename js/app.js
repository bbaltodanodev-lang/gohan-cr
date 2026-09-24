/* ============================================================
   GOHAN · Onigiri — App
   Real menu data (Uber Eats), order flow, reveal + nav logic
   Bilingual ES/EN with language switcher
   ============================================================ */

(() => {
'use strict';
const PHONE = '50687764820';
const formatPrice = (n) => '₡ ' + n.toLocaleString('es-CR');

/* ---------- I18N ---------- */
const I18N = {
  es: {
    'nav.menu': 'Menú',
    'nav.historia': 'Historia',
    'nav.ubicacion': 'Ubicación',
    'nav.contacto': 'Contacto',
    'nav.pedir': 'Pedir ahora',
    'hero.scroll': 'Deslizar',
    'hero.title1': 'El mejor',
    'hero.onigiri': 'onigiri',
    'hero.title2': 'de Costa Rica.',
    'hero.lede': 'GOHAN nace del oficio japonés del arroz: onigiris premium hechos a mano, rellenos de temporada y café recién servido, en el corazón de Plaza Mundo Escazú.',
    'hero.cta1': 'Descubrir el menú',
    'hero.cta2': 'Nuestra historia',
    'hero.metaH': 'Martes a domingo',
    'hero.metaUb': 'Ubicación',
    'hero.metaUbTxt': '2.º piso, local No. 9',
    'hero.metaTel': 'Pedidos',
    'menu.kicker': 'Pedido en tres pasos',
    'menu.title': 'Nuestro menú',
    'menu.desc': 'Elige tu onigiri del día, acompaña el pedido y confírmalo. Te lo tendremos listo para retirar o viajar por encargo.',
    'menu.step1': 'Elegir',
    'menu.step2': 'Acompañar',
    'menu.step3': 'Confirmar',
    'menu.back': 'Menú',
    'menu.desde': 'desde',
    'menu.ver': 'Ver',
    'menu.agregar': 'Agregar',
    'menu.items': 'platos',
    'extras.title': 'Acompaña tu pedido',
    'extras.desc': 'Fermentos, encurtidos, postres y sopas para completar la experiencia.',
    'extras.back': 'Volver',
    'extras.next': 'Ver resumen',
    'summary.title': 'Tu pedido',
    'summary.sub': 'Revisa, ajusta y envíalo por WhatsApp para confirmar.',
    'summary.addMore': '+ Agregar otro producto',
    'summary.delivery': 'Forma de entrega',
    'summary.delLocal': 'Retiro en local',
    'summary.delLocalTxt': 'Pásalo a dejarlo listo en Plaza Mundo Escazú.',
    'summary.delFlash': 'Por encargo',
    'summary.delFlashTxt': 'Pedido por Uber Eats o coordinación aparte.',
    'summary.total': 'Total estimado',
    'summary.back': 'Atrás',
    'summary.send': 'Confirmar por WhatsApp',
    'detail.cantidad': 'Cantidad',
    'detail.add': 'Agregar al pedido',
    'summary.acomp': 'Acompañamiento',
    'summary.onigiri': 'Onigiri',
    'summary.quitar': 'quitar',
    'story.fig': 'Hecho a mano, al momento.',
    'story.kicker': 'Nuestra historia',
    'story.title1': 'El respeto por el arroz,',
    'story.title2': 'servido con calma.',
    'story.p1': 'GOHAN —la palabra japonesa para arroz cocido— nació del deseo de traer a Costa Rica un oficio que en Japón se cuida generación tras generación: el del onigiri. No es un bocado rápido; es arroz al punto, rellenos honestos y un gesto cuidadoso en cada mano.',
    'story.p2': 'Somos pioneros en onigiris premium en el país. Cada pieza se arma al momento, con ingredientes que cambian con la temporada y café recién hecho para acompañar la pausa.',
    'story.pr1t': 'Arroz al punto',
    'story.pr1d': 'Selección y cocción que respetan el grano.',
    'story.pr2t': 'Hecho a mano',
    'story.pr2d': 'Sin atajos. Calma y oficio en cada pieza.',
    'story.pr3t': 'Sabor de temporada',
    'story.pr3d': 'Rellenos que cambian con las estaciones.',
    'visit.kicker': 'Visítanos',
    'visit.escazu': 'Escazú.',
    'visit.addr': 'Centro Comercial Plaza Mundo Escazú<br/>Segundo piso · Local No. 9',
    'visit.mVie': 'Martes — Viernes',
    'visit.sDom': 'Sábado — Domingo',
    'visit.lun': 'Lunes',
    'visit.cerrado': 'Cerrado',
    'visit.comoLlegar': 'Cómo llegar',
    'visit.escribir': 'Escribirnos',
    'contact.kicker': 'Contacto',
    'contact.title1': '¿Tienes dudas o',
    'contact.title2': 'quieres tu pedido?',
    'contact.lede': 'Pedidos por mensaje de texto o WhatsApp — respondemos rápido.',
    'contact.ig': 'Instagram',
    'contact.uber': 'Uber Eats',
    'contact.uberSub': 'GOHAN · Escazú',
    'footer.nav': 'Navegación',
    'footer.order': 'Ordenar',
    'footer.follow': 'Síguenos',
    'footer.visit': 'Visita',
    'footer.addr': 'Plaza Mundo Escazú,<br/>2.º piso · Local No. 9',
    'footer.rights': 'Todos los derechos reservados.',
    'wa.order': 'Hola GOHAN, quiero hacer un pedido:',
    'wa.deliveryLocal': 'Retiro en local',
    'wa.deliveryEncar': 'Por encargo',
    'wa.total': 'Total estimado',
    'wa.entrega': 'Entrega',
    'sec.onigiris': 'Onigiris',
    'sec.onigirisNote': 'Hechos a mano, al momento',
    'sec.acompanar': 'Acompañamientos',
    'sec.acompanarNote': 'Sopas, sándwiches y más',
    'sec.postres': 'Postres',
    'sec.postresNote': 'Para terminar con calma'
  },
  en: {
    'nav.menu': 'Menu',
    'nav.historia': 'Story',
    'nav.ubicacion': 'Location',
    'nav.contacto': 'Contact',
    'nav.pedir': 'Order now',
    'hero.scroll': 'Scroll',
    'hero.title1': 'The best',
    'hero.onigiri': 'onigiri',
    'hero.title2': 'in Costa Rica.',
    'hero.lede': 'GOHAN is born from the Japanese craft of rice: hand-made premium onigiri, seasonal fillings and freshly brewed coffee, in the heart of Plaza Mundo Escazú.',
    'hero.cta1': 'Explore the menu',
    'hero.cta2': 'Our story',
    'hero.metaH': 'Tuesday to Sunday',
    'hero.metaUb': 'Location',
    'hero.metaUbTxt': '2nd floor, unit No. 9',
    'hero.metaTel': 'Orders',
    'menu.kicker': 'Order in three steps',
    'menu.title': 'Our menu',
    'menu.desc': 'Pick your onigiri of the day, add sides and confirm. We will have it ready for pickup or delivery.',
    'menu.step1': 'Choose',
    'menu.step2': 'Add sides',
    'menu.step3': 'Confirm',
    'menu.back': 'Menu',
    'menu.desde': 'from',
    'menu.ver': 'View',
    'menu.agregar': 'Add',
    'menu.items': 'items',
    'extras.title': 'Add to your order',
    'extras.desc': 'Ferments, pickles, desserts and soups to complete the experience.',
    'extras.back': 'Back',
    'extras.next': 'See summary',
    'summary.title': 'Your order',
    'summary.sub': 'Review, adjust and send it by WhatsApp to confirm.',
    'summary.addMore': '+ Add another product',
    'summary.delivery': 'Delivery method',
    'summary.delLocal': 'Pickup in store',
    'summary.delLocalTxt': 'We will have it ready at Plaza Mundo Escazú.',
    'summary.delFlash': 'Delivery',
    'summary.delFlashTxt': 'Order via Uber Eats or arranged separately.',
    'summary.total': 'Estimated total',
    'summary.back': 'Back',
    'summary.send': 'Confirm by WhatsApp',
    'detail.cantidad': 'Quantity',
    'detail.add': 'Add to order',
    'summary.acomp': 'Side',
    'summary.onigiri': 'Onigiri',
    'summary.quitar': 'remove',
    'story.fig': 'Hand-made, to order.',
    'story.kicker': 'Our story',
    'story.title1': 'Respect for rice,',
    'story.title2': 'served with calm.',
    'story.p1': 'GOHAN —the Japanese word for cooked rice— was born of the wish to bring to Costa Rica a craft that in Japan is cared for generation after generation: the onigiri. It is not fast food; it is rice cooked just right, honest fillings and a careful touch in every hand.',
    'story.p2': 'We are pioneers in premium onigiri in the country. Each piece is assembled to order, with ingredients that change with the seasons and freshly brewed coffee to accompany the pause.',
    'story.pr1t': 'Rice cooked right',
    'story.pr1d': 'Selection and cooking that respect the grain.',
    'story.pr2t': 'Hand-made',
    'story.pr2d': 'No shortcuts. Calm and craft in every piece.',
    'story.pr3t': 'Seasonal flavor',
    'story.pr3d': 'Fillings that change with the seasons.',
    'visit.kicker': 'Visit us',
    'visit.escazu': 'Escazú.',
    'visit.addr': 'Plaza Mundo Escazú Shopping Center<br/>Second floor · Unit No. 9',
    'visit.mVie': 'Tuesday — Friday',
    'visit.sDom': 'Saturday — Sunday',
    'visit.lun': 'Monday',
    'visit.cerrado': 'Closed',
    'visit.comoLlegar': 'Get directions',
    'visit.escribir': 'Message us',
    'contact.kicker': 'Contact',
    'contact.title1': 'Have questions or',
    'contact.title2': 'want to order?',
    'contact.lede': 'Orders by text or WhatsApp — we reply fast.',
    'contact.ig': 'Instagram',
    'contact.uber': 'Uber Eats',
    'contact.uberSub': 'GOHAN · Escazú',
    'footer.nav': 'Navigation',
    'footer.order': 'Order',
    'footer.follow': 'Follow us',
    'footer.visit': 'Visit',
    'footer.addr': 'Plaza Mundo Escazú,<br/>2nd floor · Unit No. 9',
    'footer.rights': 'All rights reserved.',
    'wa.order': 'Hi GOHAN, I want to place an order:',
    'wa.deliveryLocal': 'Store pickup',
    'wa.deliveryEncar': 'Delivery',
    'wa.total': 'Estimated total',
    'wa.entrega': 'Delivery',
    'sec.onigiris': 'Onigiris',
    'sec.onigirisNote': 'Hand-made, to order',
    'sec.acompanar': 'Sides',
    'sec.acompanarNote': 'Soups, sandwiches and more',
    'sec.postres': 'Desserts',
    'sec.postresNote': 'To finish with calm'
  }
};

let lang = 'es';
try {
  const saved = localStorage.getItem('gohan-lang');
  if (saved === 'en' || saved === 'es') lang = saved;
} catch { /* The site also works when browser storage is unavailable. */ }
const t = (key) => I18N[lang][key] || I18N.es[key] || key;

/* ---------- MENU DATA ---------- */
const SECTIONS = [
  {
    id: 'onigiris', label: { es: 'Onigiris', en: 'Onigiris' }, note: { es: 'Hechos a mano, al momento', en: 'Hand-made, to order' },
    items: [
      { id: 'butakaku', name: 'Butakaku', price: 3861, tag: { es: 'Especialidad', en: 'Specialty' },
        desc: { es: 'Trocitos de cerdo suculento con cebollín fresco, envueltos en arroz al punto.', en: 'Suculent pork morsels with fresh scallion, wrapped in rice cooked just right.' },
        img: 'images/menu/onigiri-real.jpg' },
      { id: 'gyusuji', name: 'Gyusuji', price: 3861, tag: { es: 'Clásico', en: 'Classic' },
        desc: { es: 'Carne de res con cebolla caramelizada y un toque de jengibre, adobada en soya.', en: 'Beef with caramelized onion and a touch of ginger, marinated in soy.' },
        img: 'images/menu/gyusuji.jpg' },
      { id: 'tsunamayo', name: 'Spicy Tsunamayo', price: 3718, tag: { es: 'Favorito', en: 'Favorite' },
        desc: { es: 'Atún con mayonesa cremosa y un punto de sriracha. Nivel de picor 3.', en: 'Tuna with creamy mayo and a touch of sriracha. Spice level 3.' },
        img: 'images/menu/tsunamayo.jpg' },
      { id: 'nanban', name: 'Chicken Nanban', price: 3861, tag: { es: 'Caliente', en: 'Hot' },
        desc: { es: 'Pollo frito al estilo japonés glaseado con salsa nanban de huevo y mayonesa.', en: 'Japanese-style fried chicken glazed with egg and mayo nanban sauce.' },
        img: 'images/menu/nanban.jpg' }
    ]
  },
  {
    id: 'acompanar', label: { es: 'Acompañamientos', en: 'Sides' }, note: { es: 'Sopas, sándwiches y más', en: 'Soups, sandwiches and more' },
    items: [
      { id: 'katsu', name: 'Katsu Sando', price: 6530, tag: { es: 'Sándwich', en: 'Sandwich' },
        desc: { es: 'Cerdo empanizado crocante sobre pan japonés, al estilo katsu.', en: 'Crispy breaded pork on Japanese bread, katsu style.' },
        img: 'images/menu/katsu-real.jpg' },
      { id: 'miso', name: { es: 'Misodama clásico', en: 'Classic Misodama' }, price: 2175, tag: { es: 'Sopa', en: 'Soup' },
        desc: { es: 'Bolita de miso para sopa instantánea. Solo agrega agua caliente.', en: 'Miso ball for instant soup. Just add hot water.' },
        img: 'images/menu/misodama.svg' },
      { id: 'kimchi', name: 'Mini Kimchi (50 g)', price: 715, tag: { es: 'Fermento', en: 'Ferment' },
        desc: { es: 'Un mini kimchi artesanal para acompañar tus onigiris.', en: 'A small artisanal kimchi to go with your onigiri.' },
        img: 'images/menu/kimchi.jpg' },
      { id: 'namasu', name: 'Kohaku Namasu (80 g)', price: 715, tag: { es: 'Encurtido', en: 'Pickle' },
        desc: { es: 'Encurtido japonés de rábano blanco y zanahoria.', en: 'Japanese white radish and carrot pickle.' },
        img: 'images/menu/namasu.svg' }
    ]
  },
  {
    id: 'postres', label: { es: 'Postres', en: 'Desserts' }, note: { es: 'Para terminar con calma', en: 'To finish with calm' },
    items: [
      { id: 'melonpan', name: { es: 'Melonpan con crema', en: 'Melonpan with cream' }, price: 3000, tag: { es: 'Postre', en: 'Dessert' },
        desc: { es: 'Pan dulce japonés crujiente relleno de crema.', en: 'Crispy Japanese sweet bun filled with cream.' },
        img: 'images/menu/melonpan.svg' },
      { id: 'castella', name: 'Castella Simple', price: 2900, tag: { es: 'Postre', en: 'Dessert' },
        desc: { es: 'Queque súper esponjoso al estilo oriental.', en: 'Super fluffy Eastern-style cake.' },
        img: 'images/menu/castella-real.jpg' },
      { id: 'castella-matcha', name: { es: 'Castella de Matcha', en: 'Matcha Castella' }, price: 3480, tag: { es: 'Postre', en: 'Dessert' },
        desc: { es: 'Queque de matcha súper esponjoso.', en: 'Super fluffy matcha cake.' },
        img: 'images/menu/castella_matcha.jpg' }
    ]
  }
];

const EXTRA_ITEMS = [
  { id: 'kimchi', name: 'Mini Kimchi (50 g)', price: 715 },
  { id: 'namasu', name: 'Kohaku Namasu (80 g)', price: 715 },
  { id: 'miso', name: { es: 'Misodama clásico', en: 'Classic Misodama' }, price: 2175 },
  { id: 'melonpan', name: { es: 'Melonpan con crema', en: 'Melonpan with cream' }, price: 3000 },
  { id: 'castella', name: 'Castella Simple', price: 2900 }
];

const ALL_ITEMS = SECTIONS.flatMap(s => s.items);
const findItem = (id) => ALL_ITEMS.find(i => i.id === id) || EXTRA_ITEMS.find(i => i.id === id);
const itemName = (it) => (typeof it.name === 'object' ? it.name[lang] : it.name);
const itemTag = (it) => (typeof it.tag === 'object' ? it.tag[lang] : it.tag);
const itemDesc = (it) => (typeof it.desc === 'object' ? it.desc[lang] : it.desc);

/* ---------- STATE ---------- */
const state = {
  view: 'grid',      // grid | detail | extras | summary
  section: null,     // active menu section id
  currentItem: null,
  qty: 1,
  order: [],         // {id, qty}
  extras: [],        // [id]
  delivery: 'local'
};

/* ---------- DOM refs ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

/* ============================================================
   RENDER — steps
   ============================================================ */
function setStep() {
  const map = { grid: 1, detail: 1, extras: 2, summary: 3 };
  const n = map[state.view];
  $$('.step').forEach(el => {
    const k = +el.dataset.step;
    el.classList.toggle('is-active', k === n);
    el.classList.toggle('is-done', k < n && state.view !== 'grid');
    if (k === n) el.setAttribute('aria-current', 'step');
    else el.removeAttribute('aria-current');
  });
}

/* ============================================================
   RENDER — product grid
   ============================================================ */
const itemNote  = (sec) => (typeof sec.note  === 'object' ? sec.note[lang]  : sec.note);
const secLabel  = (sec) => (typeof sec.label === 'object' ? sec.label[lang] : sec.label);

function renderGrid() {
  const grid = $('#viewProducts');
  grid.innerHTML = SECTIONS.map(sec => {
    const photoItems = sec.items.filter(i => !i.img.endsWith('.svg'));
    const primary    = photoItems[0] || sec.items[0];
    const secondary  = photoItems[1] || null;
    const tertiary   = photoItems[2] || null;
    const iName = (it) => (typeof it.name === 'object' ? it.name[lang] : it.name);

    const sideCol = secondary ? `
      <div class="card__col card__col--side">
        <img src="${secondary.img}" alt="${iName(secondary)} — GOHAN" loading="lazy" decoding="async"/>
        ${tertiary ? `<img src="${tertiary.img}" alt="${iName(tertiary)} — GOHAN" loading="lazy" decoding="async"/>` : ''}
      </div>` : '';

    return `
    <div class="card card--cat" data-section="${sec.id}">
      <div class="card__media ${secondary ? 'card__media--collage' : ''}">
        <div class="card__col card__col--main">
          <img src="${primary.img}" alt="${secLabel(sec)} — GOHAN" loading="lazy" decoding="async"/>
        </div>
        ${sideCol}
      </div>
      <div class="card__body">
        <h3>${secLabel(sec)}</h3>
        <p>${itemNote(sec)}</p>
      </div>
      <div class="card__foot">
        <span class="card__price"><small>${t('menu.desde')}</small> ${formatPrice(Math.min(...sec.items.map(i => i.price)))}</span>
        <button class="add" data-section="${sec.id}" aria-label="${t('menu.ver')} ${secLabel(sec)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>`;
  }).join('');

  $$('.card--cat', grid).forEach(card => {
    card.addEventListener('click', () => {
      const sec = SECTIONS.find(s => s.id === card.dataset.section);
      showSectionGrid(sec);
    });
  });
}

/* show a section's items as cards */
function showSectionGrid(sec, options) {
  if (!sec) return;
  state.section = sec.id;
  if (!options?.renderOnly) state.view = 'grid';
  const view = $('#viewProducts');
  view.classList.add('view', 'view--grid');
  view.innerHTML = `
    <div class="subhead">
      <span class="subhead__main">
        <button class="back--grid" id="backToSections" aria-label="${t('menu.back')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>
          <span>${t('menu.back')}</span>
        </button>
        <h3>${secLabel(sec)}</h3>
        <p>${itemNote(sec)}</p>
      </span>
      <span class="subhead__count">${sec.items.length} ${t('menu.items')}</span>
    </div>
    ${sec.items.map(item => `
    <article class="card" data-id="${item.id}">
      <div class="card__media">
        <img src="${item.img}" alt="${itemName(item)} — GOHAN" loading="lazy" decoding="async"/>
      </div>
      <div class="card__body">
        <h3>${itemName(item)}</h3>
        <p>${itemDesc(item)}</p>
      </div>
      <div class="card__foot">
        <span class="card__price">${formatPrice(item.price)}</span>
        <button class="add" data-id="${item.id}" aria-label="${t('menu.agregar')} ${itemName(item)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </article>
  `).join('')}`;

  $('#backToSections').addEventListener('click', () => {
    state.section = null;
    renderGrid();
    showViews();
  });

  $$('.card', view).forEach(card => card.addEventListener('click', () => {
    state.qty = 1;
    openDetail(card.dataset.id);
  }));
  if (!options?.renderOnly) showViews(options);
}

/* ============================================================
   RENDER — detail
   ============================================================ */
function openDetail(id, options) {
  const item = findItem(id);
  if (!item) return;
  const sec = SECTIONS.find(s => s.items.some(i => i.id === id));
  state.view = 'detail';
  state.currentItem = id;
  const body = $('#detailCard');
  body.innerHTML = `
    <div class="detail__media"><img src="${item.img}" alt="${itemName(item)}" decoding="async"/></div>
    <div class="detail__body">
      <p class="kicker">${sec ? `${secLabel(sec)} · ` : ''}${itemTag(item)}</p>
      <h3>${itemName(item)}</h3>
      <p class="lead">${itemDesc(item)}</p>
      <p class="detail__price">${formatPrice(item.price)}</p>
      <div class="qty">
        <span>${t('detail.cantidad')}</span>
        <div class="qty__sep">
          <button id="qyMinus" aria-label="${lang === 'es' ? 'Reducir cantidad' : 'Decrease quantity'}">−</button>
          <output id="qtyOut" aria-live="polite">${state.qty}</output>
          <button id="qyPlus" aria-label="${lang === 'es' ? 'Aumentar cantidad' : 'Increase quantity'}">+</button>
        </div>
      </div>
      <div class="detail__actions">
        <button class="btn btn--dark" id="addBtn">${t('detail.add')}</button>
      </div>
    </div>`;
  showViews(options);

  $('#qyMinus').addEventListener('click', () => { state.qty = Math.max(1, state.qty - 1); $('#qtyOut').textContent = state.qty; });
  $('#qyPlus').addEventListener('click', () => { state.qty += 1; $('#qtyOut').textContent = state.qty; });
  $('#addBtn').addEventListener('click', () => {
    const ex = state.order.find(o => o.id === item.id);
    if (ex) ex.qty += state.qty; else state.order.push({ id: item.id, qty: state.qty });
    goExtras();
  });
}

/* ============================================================
   RENDER — extras
   ============================================================ */
function goExtras() {
  state.view = 'extras';
  renderExtras();
  showViews();
}
function renderExtras() {
  $('#extrasList').innerHTML = EXTRA_ITEMS.map(x => {
    const it = findItem(x.id);
    return `
    <button type="button" class="extra ${state.extras.includes(x.id) ? 'is-selected' : ''}" data-id="${x.id}" aria-pressed="${state.extras.includes(x.id)}">
      <img class="extra__thumb" src="${it.img}" alt="" loading="lazy" decoding="async"/>
      <span class="extra__info">
        <b>${itemName(it)}</b><span>${formatPrice(it.price)}</span>
      </span>
      <span class="extra__toggle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </span>
    </button>`;
  }).join('');

  $$('.extra', $('#extrasList')).forEach(el => el.addEventListener('click', () => {
    const id = el.dataset.id;
    const i = state.extras.indexOf(id);
    if (i >= 0) state.extras.splice(i, 1); else state.extras.push(id);
    el.classList.toggle('is-selected', state.extras.includes(id));
    el.setAttribute('aria-pressed', String(state.extras.includes(id)));
  }));
}

/* ============================================================
   RENDER — summary
   ============================================================ */
function goSummary() {
  state.view = 'summary';
  renderSummary();
  showViews();
}
function renderSummary() {
  const rows = [
    ...state.order.map(o => ({ ...findItem(o.id), qty: o.qty, extra: false })),
    ...state.extras.map(id => ({ ...findItem(id), qty: 1, extra: true }))
  ];
  const total = rows.reduce((t, r) => t + r.price * r.qty, 0);

  $('#summaryItems').innerHTML = rows.map((r, idx) => `
    <div class="s-item">
      <span class="s-item__q">×${r.qty}</span>
      <span class="s-item__body">
        <b>${itemName(r)}</b>
        <small>${r.extra ? t('summary.acomp') : t('summary.onigiri')}</small>
      </span>
      <span class="s-item__price">${formatPrice(r.price * r.qty)}</span>
      <button class="s-item__rm" data-idx="${idx}">${t('summary.quitar')}</button>
    </div>
  `).join('');

  $('#totalAmount').textContent = formatPrice(total);
  state.total = total;
  $('#summarySend').disabled = rows.length === 0;

  $$('.s-item__rm').forEach(btn => btn.addEventListener('click', () => {
    const idx = +btn.dataset.idx;
    const r = rows[idx];
    if (r.extra) {
      state.extras = state.extras.filter(x => x !== r.id);
    } else {
      const o = state.order.find(x => x.id === r.id);
      if (o) { o.qty -= r.qty; if (o.qty <= 0) state.order = state.order.filter(x => x.id !== r.id); }
    }
    renderSummary();
    const next = $$('.s-item__rm')[Math.min(idx, rows.length - 2)] || $('#addMore');
    next.focus({ preventScroll: true });
    window.GohanMotion?.refresh();
  }));
}

/* ============================================================
   VIEW SWITCHING
   ============================================================ */
function showViews({ scroll = true, animate = true } = {}) {
  $('#viewProducts').classList.toggle('hidden', state.view !== 'grid');
  $('#viewDetail').classList.toggle('hidden', state.view !== 'detail');
  $('#viewExtras').classList.toggle('hidden', state.view !== 'extras');
  $('#viewSummary').classList.toggle('hidden', state.view !== 'summary');
  setStep();
  const active = $({ grid: '#viewProducts', detail: '#viewDetail', extras: '#viewExtras', summary: '#viewSummary' }[state.view]);
  if (scroll) {
    active.setAttribute('tabindex', '-1');
    active.focus({ preventScroll: true });
    active.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  }
  if (animate) window.GohanMotion?.viewChanged(active);
  window.GohanMotion?.refresh();
}

/* confirm -> WhatsApp */
function sendOrder() {
  if (!state.order.length && !state.extras.length) return;
  const rows = [
    ...state.order.map(o => ({ ...findItem(o.id), qty: o.qty, extra: false })),
    ...state.extras.map(id => ({ ...findItem(id), qty: 1, extra: true }))
  ];
  let msg = t('wa.order') + '\n';
  rows.forEach(r => { msg += `\n• ${r.qty} × ${itemName(r)} — ${formatPrice(r.price * r.qty)}`; });
  const total = rows.reduce((t, r) => t + r.price * r.qty, 0);
  msg += `\n\n${t('wa.entrega')}: ${state.delivery === 'local' ? t('wa.deliveryLocal') : t('wa.deliveryEncar')}`;
  msg += `\n${t('wa.total')}: ${formatPrice(total)}`;
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

/* ============================================================
   I18N — apply translations to static DOM
   ============================================================ */
function applyI18n() {
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val.includes('<br') || val.includes('&nbsp;') || val.includes('&')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
}

function setLang(next) {
  if (next === lang || !I18N[next]) return;
  lang = next;
  try { localStorage.setItem('gohan-lang', lang); } catch { /* Optional preference. */ }
  updateLanguageControls();
  applyI18n();
  if (state.section) showSectionGrid(SECTIONS.find(s => s.id === state.section), { renderOnly: true });
  else renderGrid();
  if (state.view === 'detail') openDetail(state.currentItem, { scroll: false, animate: false });
  if (state.view === 'extras') renderExtras();
  if (state.view === 'summary') renderSummary();
  window.GohanMotion?.refresh();
}

/* ============================================================
   NAV + NATIVE SCROLL
   ============================================================ */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileNav = window.matchMedia('(max-width: 720px)');

const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger = $('#burger');
const navLinks = $('#navLinks');
const navBackdrop = $('#navBackdrop');
let menuOpen = false;

function updateLanguageControls() {
  document.documentElement.lang = lang;
  $$('.lang__btn').forEach(button => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  burger.setAttribute('aria-label', lang === 'es'
    ? (menuOpen ? 'Cerrar menú' : 'Abrir menú')
    : (menuOpen ? 'Close menu' : 'Open menu'));
}

function setMenu(open, restoreFocus = false) {
  menuOpen = open && mobileNav.matches;
  open = menuOpen;
  navLinks.classList.toggle('is-open', open);
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  navLinks.inert = mobileNav.matches && !open;
  navBackdrop.hidden = !open;
  $$('#main, .footer, .wa, .nav__brand, #langToggle').forEach(element => { element.inert = open; });
  document.body.style.overflow = open ? 'hidden' : '';
  updateLanguageControls();
  if (open) $('a', navLinks).focus({ preventScroll: true });
  else if (restoreFocus) burger.focus({ preventScroll: true });
}

burger.addEventListener('click', () => setMenu(!menuOpen, menuOpen));
navBackdrop.addEventListener('click', () => setMenu(false, true));
mobileNav.addEventListener('change', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (!menuOpen) return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
  if (event.key === 'Tab') {
    const controls = [...$$('a', navLinks), burger];
    const index = controls.indexOf(document.activeElement);
    const next = (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
    event.preventDefault();
    controls[next].focus();
  }
});
setMenu(false);

// Only anchor clicks are smoothed. Wheel and touch scrolling remain native.
$$('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  setMenu(false);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  history.replaceState(null, '', link.hash);
}));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $$('.nav__links a').forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
$$('main > section[id]').forEach(section => sectionObserver.observe(section));

/* language switcher */
$$('.lang__btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
updateLanguageControls();

/* year */
$('#year').textContent = new Date().getFullYear();

/* delivery radio */
$$('input[name=delivery]').forEach(r => r.addEventListener('change', (e) => { state.delivery = e.target.value; }));

/* button wiring */
$('#backToGrid').addEventListener('click', () => { state.view = 'grid'; showViews(); });
$('#extrasBack').addEventListener('click', () => { state.view = 'grid'; showViews(); });
$('#extrasNext').addEventListener('click', goSummary);
$('#summaryBack').addEventListener('click', goExtras);
$('#summarySend').addEventListener('click', sendOrder);
$('#addMore').addEventListener('click', () => { state.view = 'grid'; showViews(); });

/* ============================================================
   INIT
   ============================================================ */
applyI18n();
renderGrid();
showViews({ scroll: false, animate: false });
window.GohanMotion?.init();
})();
