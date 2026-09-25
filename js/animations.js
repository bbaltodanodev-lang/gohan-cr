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
        .from('.hero__media', { autoAlpha: 0, y: 28, clearProps: 'all' }, 0)
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

      const scene = document.querySelector('.hero__scene');
      const tilt = document.querySelector('.hero__tilt');
      const shine = document.querySelector('.hero__shine');
      let removePointerListeners = () => {};

      // Independent layers keep entrance, floating and pointer transforms apart.
      gsap.set(tilt, { rotationX: 3, rotationY: -6, transformOrigin: '50% 50%' });
      gsap.set(shine, { xPercent: -12, x: 0 });
      if (context.conditions.desktop) {
        const rotateX = gsap.quickTo(tilt, 'rotationX', { duration: 0.7, ease: 'power3.out' });
        const rotateY = gsap.quickTo(tilt, 'rotationY', { duration: 0.7, ease: 'power3.out' });
        const lightX = gsap.quickTo(shine, 'xPercent', { duration: 0.8, ease: 'power3.out' });
        const move = event => {
          if (event.pointerType === 'touch') return;
          const bounds = scene.getBoundingClientRect();
          const x = gsap.utils.clamp(-1, 1, (event.clientX - bounds.left) / bounds.width * 2 - 1);
          const y = gsap.utils.clamp(-1, 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
          rotateX(3 - y * 5);
          rotateY(-6 + x * 7);
          lightX(x * 14);
        };
        const leave = () => { rotateX(3); rotateY(-6); lightX(-12); };
        scene.addEventListener('pointermove', move, { passive: true });
        scene.addEventListener('pointerleave', leave);
        removePointerListeners = () => {
          scene.removeEventListener('pointermove', move);
          scene.removeEventListener('pointerleave', leave);
        };
      } else {
        // ScrollTrigger observes native scrolling; no touch or wheel interception.
        gsap.fromTo(tilt, { rotationX: 4, rotationY: -5 }, {
          rotationX: -4, rotationY: 5, ease: 'none',
          scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
        });
      }

      const floating = gsap.to(scene, {
        y: -8, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true
      });
      const scrollHint = gsap.to('.hero__scroll svg', {
        y: 4, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true
      });
      let heroVisible = false;
      const syncPlayback = () => {
        const paused = !heroVisible || document.hidden;
        floating.paused(paused);
        scrollHint.paused(paused || !context.conditions.desktop);
      };
      const visibility = ScrollTrigger.create({
        trigger: '.hero', start: 'top bottom', end: 'bottom top',
        onToggle: self => { heroVisible = self.isActive; syncPlayback(); }
      });
      heroVisible = visibility.isActive;
      syncPlayback();
      document.addEventListener('visibilitychange', syncPlayback);

      gsap.fromTo('.contact__glyph', { rotationY: -25, rotationZ: -10, yPercent: -8 }, {
        rotationY: 25, rotationZ: 8, yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      return () => {
        removePointerListeners();
        document.removeEventListener('visibilitychange', syncPlayback);
      };
    });
    viewChanged(document.querySelector('#viewProducts'), true);
    reduced.addEventListener('change', () => { menuContext?.revert(); menuContext = null; refresh(); });
    document.fonts?.ready.then(refresh);
    // Image frames already reserve their size in CSS; lazy image loads need no
    // extra refresh that could interrupt an in-progress native scroll.
    refresh();
  }

  window.GohanMotion = Object.freeze({ init, viewChanged, refresh });
})();
