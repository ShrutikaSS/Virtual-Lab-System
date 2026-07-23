/* ============================================================
   HERO IMPACT LOGIC (hero-impact.js)
   ============================================================ */

(function () {
  'use strict';

  // 1. Recursive Word Stagger Splitter
  document.addEventListener("DOMContentLoaded", () => {
    const headline = document.querySelector('.word-stagger');
    if (headline) {
      const state = { index: 0 };
      
      // Recursive function to wrap text nodes in spans while keeping elements intact
      function wrapWords(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.nodeValue;
          // Split by whitespace, preserving whitespace tokens
          const tokens = text.split(/(\s+)/);
          const fragment = document.createDocumentFragment();

          tokens.forEach(token => {
            if (token.trim().length === 0) {
              fragment.appendChild(document.createTextNode(token));
            } else {
              const span = document.createElement('span');
              span.className = 'word-reveal';
              // Stagger delay incrementing per word
              span.style.animationDelay = `${state.index * 0.08}s`;
              span.textContent = token;
              fragment.appendChild(span);
              state.index++;
            }
          });
          return fragment;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const clone = node.cloneNode(false); // shallow clone
          Array.from(node.childNodes).forEach(child => {
            clone.appendChild(wrapWords(child));
          });
          return clone;
        }
        return node.cloneNode(true);
      }

      // Process and replace the content
      const originalChildren = Array.from(headline.childNodes);
      const processedFragment = document.createDocumentFragment();
      originalChildren.forEach(child => {
        processedFragment.appendChild(wrapWords(child));
      });
      
      headline.innerHTML = '';
      headline.appendChild(processedFragment);
    }

    // 2. Scroll Cue behavior: Scroll past hero on click
    const scrollCue = document.querySelector('.scroll-cue');
    const heroSection = document.getElementById('hero-section');
    if (scrollCue && heroSection) {
      scrollCue.addEventListener('click', () => {
        const offset = heroSection.offsetHeight;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      });
    }
  });

  // 3. Interactive Molecule Particle Network Canvas
  window.addEventListener('load', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Track resize
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Particle settings
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 110;
    const mouseRadius = 160;

    const mouse = {
      x: null,
      y: null,
      active: false
    };

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.5 + 1.5
      });
    }

    // Global mouse tracking across the entire landing page
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    }, { passive: true });

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and Draw Particles
      particles.forEach(p => {
        // Drifts
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep inside canvas bounds
        if (p.x < 0) p.x = 0;
        if (p.x > width) p.x = width;
        if (p.y < 0) p.y = 0;
        if (p.y > height) p.y = height;

        // Interactive mouse push/pull effect (repulsion)
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 90) {
            const force = (90 - dist) / 90;
            const angle = Math.atan2(dy, dx);
            // Push away
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(55, 183, 160, 0.45)'; // Chemistry Teal tint
        ctx.fill();
      });

      // 2. Draw Network connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            // Stronger line the closer they are
            const alpha = (connectionDistance - dist) / connectionDistance * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(55, 183, 160, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connection to Mouse
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const alpha = (mouseRadius - dist) / mouseRadius * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(240, 179, 62, ${alpha})`; // Amber Electrical link to mouse
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
})();
