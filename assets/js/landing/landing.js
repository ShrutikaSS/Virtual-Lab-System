/* ============================================================
   ZealVirtual Science Lab — Landing Page JavaScript
   Architecture: assets/js/landing/landing.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Reduced motion preference ---- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     SVG DRAW-ON ANIMATION (stroke-dashoffset stagger)
     ============================================================ */
  function initSvgDraw() {
    const paths = document.querySelectorAll('.draw-path');
    if (!paths.length) return;

    if (prefersReduced) {
      paths.forEach(p => {
        p.style.strokeDashoffset = '0';
        p.style.strokeDasharray = 'none';
      });
      return;
    }

    /* Measure actual path lengths so the animation is pixel-perfect */
    paths.forEach(p => {
      let len;
      try { len = p.getTotalLength(); } catch { len = 2000; }
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      /* Force a reflow so the initial state is painted */
      void p.getBoundingClientRect();
    });

    const delays = { 'stagger-1': 180, 'stagger-2': 420, 'stagger-3': 700 };
    paths.forEach(p => {
      const cls = ['stagger-1', 'stagger-2', 'stagger-3'].find(c => p.classList.contains(c));
      const delay = delays[cls] ?? 0;
      setTimeout(() => {
        p.style.transition = `stroke-dashoffset 2.2s cubic-bezier(0.22, 1, 0.36, 1)`;
        p.style.strokeDashoffset = '0';
      }, delay);
    });
  }

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ============================================================
     STICKY HEADER GLASS EFFECT
     ============================================================ */
  function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;
    const toggle = () => {
      header.classList.toggle('header-scrolled', window.scrollY > 48);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  /* ============================================================
     STAT COUNTER ANIMATION (IntersectionObserver)
     ============================================================ */
  function initStatCounters() {
    if (prefersReduced) return;
    const nums = document.querySelectorAll('.stat-num[data-target]');
    if (!nums.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        if (isNaN(target)) return;
        const duration = 1800;
        const start = performance.now();
        const tick = now => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          /* Ease-out cubic */
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    nums.forEach(n => obs.observe(n));
  }

  /* ============================================================
     SCROLL-REVEAL (IntersectionObserver)
     ============================================================ */
  function initScrollReveal() {
    if (prefersReduced) return;
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => obs.observe(el));
  }

  /* ============================================================
     TOAST NOTIFICATION
     ============================================================ */
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    const text = document.createElement('span');
    text.textContent = message;

    const close = document.createElement('button');
    close.className = 'toast-close';
    close.setAttribute('aria-label', 'Dismiss');
    close.textContent = '×';
    close.addEventListener('click', () => dismissToast(toast));

    toast.append(text, close);
    container.appendChild(toast);

    /* Animate in */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('toast-show'));
    });

    /* Auto-dismiss after 4 s */
    setTimeout(() => dismissToast(toast), 4000);
  }

  function dismissToast(toast) {
    toast.classList.remove('toast-show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }

  /* ============================================================
     INTERACTIVE CLICK HANDLERS
     ============================================================ */
  function initClickHandlers() {
    /* Login buttons */
    document.querySelectorAll('[data-action="login"]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        showToast('Securing connection — redirecting to Zeal SSO Portal…');
      });
    });

    /* Experiment card links */
    document.querySelectorAll('.exp-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const card = link.closest('.exp-card');
        const tag = card?.querySelector('.exp-tag')?.textContent || '';
        const name = card?.querySelector('h3')?.textContent || '';
        showToast(`Initializing simulation [${tag}]: "${name}"`);
      });
    });

    /* Help topic links */
    document.querySelectorAll('.help-row').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) return; /* Let anchor scroll happen */
        e.preventDefault();
        const label = link.querySelector('.help-row-text')?.textContent?.trim() || 'resource';
        showToast(`Loading: ${label}…`);
      });
    });
  }

  /* ============================================================
     HERO ILLUSTRATION — PARALLAX (RAF-based, light)
     ============================================================ */
  function initHeroParallax() {
    if (prefersReduced) return;
    const graphic = document.getElementById('hero-graphic');
    if (!graphic) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          graphic.style.transform = `translateY(${scrolled * 0.08}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initSvgDraw();
    initScrollProgress();
    initStickyHeader();
    initStatCounters();
    initScrollReveal();
    initClickHandlers();
    initHeroParallax();
  });

})();
