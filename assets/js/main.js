/**
 * Portfolio Site — client-side interactions
 *   1. Scroll-triggered reveal animations (IntersectionObserver)
 *   2. Nav background on scroll
 *   3. Active section highlighting
 *   4. Mobile menu toggle
 *   5. Smooth close of mobile menu on link click
 */

(() => {
  'use strict';

  /* ── 0. Always land at the top on refresh ────────────── */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  const nav = document.getElementById('nav');
  const navToggle = nav?.querySelector('.nav-toggle');
  const navLinks = nav?.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');
  const appStoreButton = document.querySelector('.app-store-coming-soon');
  const appStoreToast = document.querySelector('.app-store-toast');
  let appStoreToastTimer;

  appStoreButton?.addEventListener('click', () => {
    appStoreToast?.classList.add('is-visible');
    window.clearTimeout(appStoreToastTimer);
    appStoreToastTimer = window.setTimeout(() => {
      appStoreToast?.classList.remove('is-visible');
    }, 3000);
  });

  /* ── 1. Reveal on scroll ─────────────────────────────── */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── 2. Nav shrink / background on scroll ────────────── */
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 3. Active section highlight ─────────────────────── */
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks?.forEach((link) => {
            const isMatch = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', isMatch);
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ── 4. Mobile menu toggle ───────────────────────────── */
  navToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ── 5. Close mobile menu on link click ──────────────── */
  navLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav?.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ── 6. Close mobile menu when clicking outside ──────── */
  document.addEventListener('click', (event) => {
    if (!nav?.classList.contains('is-open')) return;
    if (nav.contains(event.target)) return;
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
})();
