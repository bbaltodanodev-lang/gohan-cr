/* GOHAN motion: progressive enhancement; content stays visible without GSAP. */
(() => {
  'use strict';
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const media = gsap.matchMedia();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ready = false;
  let menuContext;
  let refreshFrame;

  function refresh() {
    if (!ready) return;
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  function viewChanged(view, onScroll = false) {
    menuContext?.revert();
    menuContext = null;
    if (!ready || reduced.matches) return;
    menuContext = gsap.context(() => {
      const cards = view.querySelectorAll('.card, .extra');
      const targets = cards.length ? cards : view.children;
      gsap.from(targets, {
        opacity: 0, y: 24, duration: 0.65,
        stagger: { each: 0.07, amount: Math.min(0.28, targets.length * 0.07) },
        ease: 'power2.out', clearProps: 'opacity,visibility,transform',
        ...(onScroll ? { scrollTrigger: { trigger: view, start: 'top 90%', once: true } } : {})
      });
    }, view);
  }

  function init() {
    if (ready) return;
    ready = true;
    media.add({
      desktop: '(min-width: 981px) and (hover: hover) and (pointer: fine)',
      reduce: '(prefers-reduced-motion: reduce)',
      animate: '(prefers-reduced-motion: no-preference)'
    }, context => {
      if (context.conditions.reduce) return;

      // A single entrance sequence, without splitting text or hiding the page.
      gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } })
        .from('.hero__frame', { autoAlpha: 0, y: 28, clearProps: 'all' }, 0)
        .from('.hero__eyebrow, .hero__title, .hero__lede, .hero__cta, .hero__meta', {
          autoAlpha: 0, y: 20, stagger: 0.09, clearProps: 'opacity,visibility,transform'
        }, 0.12)
        .from('.hero__seal', { autoAlpha: 0, scale: 0.8, rotation: -18, clearProps: 'all' }, 0.45)
        .from('.hero__caption', { autoAlpha: 0, y: 8, clearProps: 'all' }, 0.45);

      gsap.utils.toArray('[data-reveal]').forEach(element => {
        gsap.from(element, {
          opacity: 0, y: 28, duration: 0.8, ease: 'power2.out',
          clearProps: 'opacity,visibility,transform',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true }
        });
      });
      gsap.from('.craft-strip p', {
        opacity: 0, y: 14, stagger: 0.12, duration: 0.65,
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: { trigger: '.craft-strip', start: 'top 92%', once: true }
      });

      // No scrub/parallax on touch screens, where native scrolling takes priority.
      if (context.conditions.desktop) {
        gsap.fromTo('.hero__frame > img', { yPercent: -3, scale: 1.08 }, {
          yPercent: 3, scale: 1.08, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
        });
      }
    });
    viewChanged(document.querySelector('#viewProducts'), true);
    reduced.addEventListener('change', () => { menuContext?.revert(); menuContext = null; refresh(); });
    document.fonts?.ready.then(refresh);
    document.addEventListener('load', event => {
      if (event.target instanceof HTMLImageElement) refresh();
    }, true);
    refresh();
  }

  window.GohanMotion = Object.freeze({ init, viewChanged, refresh });
})();
